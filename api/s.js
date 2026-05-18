import 'dotenv/config';
/* eslint-env node */
/* global process */
// ============================================================
// api/s.js — Vercel serverless function. The brain's switchboard.
//
// Receives POST requests from the browser with conversation context.
// Builds the system prompt via scaffold.js. Calls Gemini Flash
// (primary) or Groq (fallback) based on routing rules. Returns
// strict JSON: { response, next_chips, engine_used }.
//
// NO STREAMING — buffered only. Protects Vercel free CPU budget.
// (Browser fakes the typewriter effect for UX.)
// ============================================================

import { buildMessages } from '../src/components/s/scaffold.js';

// ────────────────────────────────────────────────────────────
// Engine configuration
// ────────────────────────────────────────────────────────────
const GEMINI_MODEL = 'gemini-2.5-flash';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const MAX_TOKENS = 400; // Cap output — S's responses are short
const TEMPERATURE = 0.85; // Slightly creative for voice variation

// ────────────────────────────────────────────────────────────
// Router — decide which engine to use for this call
// ────────────────────────────────────────────────────────────
function pickPrimaryEngine({ questionNumber, isFreetext }) {
  // Question 1 (chip click → persona pick): Groq for speed.
  // The response is mostly templated, voice just needs matching.
  if (questionNumber === 1 && !isFreetext) return 'groq';

  // Everything else: Gemini Flash. Best free quality.
  return 'gemini';
}

// ────────────────────────────────────────────────────────────
// Strip JSON-fence artifacts and parse defensively
// ────────────────────────────────────────────────────────────
function parseStructuredOutput(text) {
  if (!text || typeof text !== 'string') return null;

  // Strip common code-fence wrappers
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
  cleaned = cleaned.replace(/^```\s*/i, '').replace(/```\s*$/i, '');
  cleaned = cleaned.trim();

  // Find the first { and last } in case there's any extra text
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) return null;
  cleaned = cleaned.slice(firstBrace, lastBrace + 1);

  try {
    const parsed = JSON.parse(cleaned);
    if (typeof parsed.response !== 'string') return null;
    if (!Array.isArray(parsed.next_chips)) parsed.next_chips = [];
    // Normalize chips
    parsed.next_chips = parsed.next_chips
      .filter((c) => c && typeof c.label === 'string')
      .map((c, i) => ({
        id: c.id || `auto-${i + 1}`,
        label: c.label,
      }))
      .slice(0, 3);
    return parsed;
  } catch {
    return null;
  }
}

// ────────────────────────────────────────────────────────────
// Engine: Gemini 2.5 Flash via Google AI Studio
// ────────────────────────────────────────────────────────────
async function callGemini({ systemPrompt, messages, apiKey }) {
  // Gemini wants system + user-turn separation. We collapse the
  // assistant/user history into a single rolling string then have
  // the *final* user message be the actual prompt.
  const lastUser = messages.findLast?.((m) => m.role === 'user');
  const historyText = messages
    .slice(0, -1)
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'S'}: ${m.content}`)
    .join('\n');

  const composedPrompt =
    (historyText ? `Conversation so far:\n${historyText}\n\n` : '') +
    `Visitor says: ${lastUser ? lastUser.content : '(opener)'}\n\n` +
    `Respond as S, following all rules. JSON only.`;

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts: [{ text: composedPrompt }] }],
    generationConfig: {
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_TOKENS,
      responseMimeType: 'application/json',
    },
  };

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned no text');
  return text;
}

// ────────────────────────────────────────────────────────────
// Engine: Groq Llama 3.3 70B (OpenAI-compatible API)
// ────────────────────────────────────────────────────────────
async function callGroq({ systemPrompt, messages, apiKey }) {
  const body = {
    model: GROQ_MODEL,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
    response_format: { type: 'json_object' },
  };

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Groq ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq returned no text');
  return text;
}

// ────────────────────────────────────────────────────────────
// Main handler
// ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS for local dev (vite serves from 5173, this runs on 3000-ish)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const {
      visitorType = 'unknown',
      questionNumber = 1,
      maxQuestions = 4,
      conversationHistory = [],
      currentUserMessage = '',
      isFreetext = false,
    } = req.body || {};

    // Build the prompt + message list (same input for any engine)
    const { systemPrompt, messages } = buildMessages({
      visitorType,
      questionNumber,
      maxQuestions,
      conversationHistory,
      currentUserMessage,
    });

    // Route + fallback cascade
    const primary = pickPrimaryEngine({ questionNumber, isFreetext });
    const order = primary === 'gemini' ? ['gemini', 'groq'] : ['groq', 'gemini'];

    let result = null;
    let engineUsed = null;
    let lastError = null;

    for (const engine of order) {
      try {
        const apiKey =
          engine === 'gemini'
            ? process.env.GEMINI_API_KEY
            : process.env.GROQ_API_KEY;

        if (!apiKey) {
          console.warn(`[s] ${engine.toUpperCase()} key missing, skipping`);
          continue;
        }

        const rawText =
          engine === 'gemini'
            ? await callGemini({ systemPrompt, messages, apiKey })
            : await callGroq({ systemPrompt, messages, apiKey });

        const parsed = parseStructuredOutput(rawText);
        if (!parsed) {
          throw new Error(`${engine}: failed to parse JSON output`);
        }

        result = parsed;
        engineUsed = engine;
        break;
      } catch (err) {
        lastError = err;
        console.warn(`[s] ${engine} failed:`, err.message);
        // continue to next engine
      }
    }

    const elapsed = Date.now() - startTime;

    if (!result) {
      console.error('[s] all engines failed:', lastError?.message);
      return res.status(503).json({
        error: 'all_engines_failed',
        message: lastError?.message || 'unknown',
        elapsed_ms: elapsed,
      });
    }

    // Log shape only, not contents (privacy)
    console.log(
      `[s] ok engine=${engineUsed} q=${questionNumber} type=${visitorType} elapsed=${elapsed}ms`
    );

    return res.status(200).json({
      ...result,
      engine_used: engineUsed,
      elapsed_ms: elapsed,
    });
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error('[s] handler error:', err);
    return res.status(500).json({
      error: 'handler_error',
      message: err.message,
      elapsed_ms: elapsed,
    });
  }
}
