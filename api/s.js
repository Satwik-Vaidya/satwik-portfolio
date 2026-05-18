// ============================================================
// api/s.js — Multi-key round-robin Vercel serverless function.
//
// Tier 1 (alternating round-robin): Gemini AND Groq
//   - Each request alternates between Gemini and Groq pools
//   - Within each pool, rotate through available keys
//
// Tier 2 (fallback): Cerebras
//   - Round-robin between its keys when both Tier 1 engines exhausted
//
// Tier 3 (final): Mock with broke-genius pitch
//
// Quota tracking is in-memory (per Vercel function instance).
// Cold starts reset state — that's fine, costs ~1 burned attempt.
// ============================================================

import 'dotenv/config';
import { buildMessages } from '../src/components/s/scaffold.js';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const CEREBRAS_MODEL = 'gpt-oss-120b';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const CEREBRAS_URL = 'https://api.cerebras.ai/v1/chat/completions';

const MAX_TOKENS = 600;
const TEMPERATURE = 0.85;

const COOLDOWN_MS = {
  RPM:           2 * 60 * 1000,
  NETWORK_ERR:   5 * 60 * 1000,
  INVALID_KEY:   Infinity,
};

function nextMidnightPT() {
  const now = new Date();
  const ptOffset = -8 * 60 * 60 * 1000;
  const nowPT = new Date(now.getTime() + ptOffset);
  const tomorrowPT = new Date(nowPT);
  tomorrowPT.setUTCHours(24, 0, 0, 0);
  return tomorrowPT.getTime() - ptOffset - now.getTime();
}

function nextMidnightUTC() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(24, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

// Persist on globalThis so state survives Vite dev module re-eval
// and Vercel function warm reuses. Cold starts still clear it (fine).
let POOLS = globalThis.__S_POOLS__ || null;

function initPools() {
  if (POOLS) return POOLS;

  const collect = (prefix) => {
    const keys = [];
    // Original (plain) key first — keeps pre-existing GEMINI_API_KEY etc.
    const plain = process.env[prefix];
    if (plain && plain.trim()) keys.push(plain.trim());
    // Then numbered additional keys (_1 through _10)
    for (let i = 1; i <= 10; i++) {
      const k = process.env[`${prefix}_${i}`];
      if (k && k.trim()) keys.push(k.trim());
    }
    return keys;
  };

  POOLS = {
    gemini:   { keys: collect('GEMINI_API_KEY'),   pointer: 0, deadUntil: {} },
    groq:     { keys: collect('GROQ_API_KEY'),     pointer: 0, deadUntil: {} },
    cerebras: { keys: collect('CEREBRAS_API_KEY'), pointer: 0, deadUntil: {} },
  };
  globalThis.__S_POOLS__ = POOLS;

  console.log(
    `[s] pools initialized: gemini=${POOLS.gemini.keys.length} groq=${POOLS.groq.keys.length} cerebras=${POOLS.cerebras.keys.length}`
  );
  return POOLS;
}

let TOP_TIER_COUNTER = globalThis.__S_TOP_TIER_COUNTER__ ?? 0;

function getNextLiveKey(engine) {
  const pool = POOLS[engine];
  if (!pool || pool.keys.length === 0) return null;
  const now = Date.now();
  const n = pool.keys.length;
  for (let i = 0; i < n; i++) {
    const idx = (pool.pointer + i) % n;
    const deadUntil = pool.deadUntil[idx] || 0;
    if (deadUntil <= now) {
      pool.pointer = (idx + 1) % n;
      return { key: pool.keys[idx], index: idx };
    }
  }
  return null;
}

function markKeyDead(engine, index, cooldownMs, reason) {
  const pool = POOLS[engine];
  if (!pool) return;
  const until = cooldownMs === Infinity ? Infinity : Date.now() + cooldownMs;
  pool.deadUntil[index] = until;
  const untilLabel = until === Infinity ? 'forever' : `${Math.round(cooldownMs / 1000)}s`;
  console.log(`[s] ${engine}[${index}] marked dead for ${untilLabel} (${reason})`);
}

function classify429(engine, errorBody, retryAfterHeader) {
  const body = (errorBody || '').toLowerCase();
  if (retryAfterHeader) {
    const seconds = parseInt(retryAfterHeader, 10);
    if (!isNaN(seconds) && seconds > 0 && seconds < 86400) {
      return { ms: seconds * 1000, label: `retry-after ${seconds}s` };
    }
  }
  const isRPD =
    body.includes('rpd') ||
    body.includes('per day') ||
    body.includes('tpd') ||
    body.includes('tokens per day') ||
    body.includes('quota');
  if (isRPD) {
    if (engine === 'gemini') return { ms: nextMidnightPT(), label: 'until midnight PT' };
    return { ms: nextMidnightUTC(), label: 'until midnight UTC' };
  }
  return { ms: COOLDOWN_MS.RPM, label: '2min (RPM)' };
}

function parseStructuredOutput(text) {
  if (!text || typeof text !== 'string') return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^[\uFEFF\u200B]+/, '');
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  cleaned = cleaned.replace(/^\s*```(?:json|JSON)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```\s*$/i, '');
  cleaned = cleaned.trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) return null;
  cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  const tryParse = (s) => {
    try { return JSON.parse(s); }
    catch {
      const repaired = s
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'");
      try { return JSON.parse(repaired); } catch { return null; }
    }
  };
  const parsed = tryParse(cleaned);
  if (!parsed || typeof parsed.response !== 'string') return null;
  if (!Array.isArray(parsed.next_chips)) parsed.next_chips = [];
  parsed.next_chips = parsed.next_chips
    .filter((c) => c && typeof c.label === 'string')
    .map((c, i) => ({ id: c.id || `auto-${i + 1}`, label: c.label }))
    .slice(0, 3);
  return parsed;
}

async function callGemini({ systemPrompt, messages, apiKey }) {
  const lastUser = messages.findLast?.((m) => m.role === 'user');
  const historyText = messages
    .slice(0, -1)
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'S'}: ${m.content}`)
    .join('\n');
  const composedPrompt =
    (historyText ? `Conversation so far:\n${historyText}\n\n` : '') +
    `Visitor says: ${lastUser ? lastUser.content : '(opener)'}\n\nRespond as S, following all rules. JSON only.`;

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: composedPrompt }] }],
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_TOKENS,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    const e = new Error(`Gemini ${res.status}: ${errText.slice(0, 200)}`);
    e.status = res.status;
    e.body = errText;
    e.retryAfter = res.headers.get('retry-after');
    throw e;
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned no text');
  return text;
}

async function callOpenAICompat({ systemPrompt, messages, apiKey, url, model }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    const e = new Error(`${res.status}: ${errText.slice(0, 200)}`);
    e.status = res.status;
    e.body = errText;
    e.retryAfter = res.headers.get('retry-after');
    throw e;
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('No text returned');
  return text;
}

const callGroq = (args) => callOpenAICompat({ ...args, url: GROQ_URL, model: GROQ_MODEL });
const callCerebras = (args) => callOpenAICompat({ ...args, url: CEREBRAS_URL, model: CEREBRAS_MODEL });

const ENGINE_FNS = { gemini: callGemini, groq: callGroq, cerebras: callCerebras };

async function tryEngine(engine, { systemPrompt, messages }) {
  const fn = ENGINE_FNS[engine];
  const pool = POOLS[engine];
  if (!fn || !pool || pool.keys.length === 0) return null;

  const maxAttempts = pool.keys.length;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const live = getNextLiveKey(engine);
    if (!live) return null;
    try {
      const rawText = await fn({ systemPrompt, messages, apiKey: live.key });
      const parsed = parseStructuredOutput(rawText);
      if (!parsed) {
        console.warn(`[s] ${engine} parse failed on key[${live.index}], trying next`);
        continue;
      }
      return { result: parsed, keyIndex: live.index };
    } catch (err) {
      const status = err.status;
      if (status === 429) {
        const { ms, label } = classify429(engine, err.body, err.retryAfter);
        markKeyDead(engine, live.index, ms, `429 ${label}`);
        continue;
      }
      if (status === 401 || status === 403) {
        markKeyDead(engine, live.index, COOLDOWN_MS.INVALID_KEY, `${status} invalid key`);
        continue;
      }
      markKeyDead(engine, live.index, COOLDOWN_MS.NETWORK_ERR, `${status || 'network'} transient`);
      continue;
    }
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  initPools();
  const startTime = Date.now();

  try {
    const {
      visitorType = 'unknown',
      questionNumber = 1,
      maxQuestions = 4,
      conversationHistory = [],
      currentUserMessage = '',
    } = req.body || {};

    const { systemPrompt, messages } = buildMessages({
      visitorType,
      questionNumber,
      maxQuestions,
      conversationHistory,
      currentUserMessage,
    });

    const topPick = TOP_TIER_COUNTER++ % 2 === 0 ? 'gemini' : 'groq';
    globalThis.__S_TOP_TIER_COUNTER__ = TOP_TIER_COUNTER;
    const topOther = topPick === 'gemini' ? 'groq' : 'gemini';
    const cascade = [topPick, topOther, 'cerebras'];

    let result = null;
    let engineUsed = null;
    for (const engine of cascade) {
      const attempt = await tryEngine(engine, { systemPrompt, messages });
      if (attempt) {
        result = attempt.result;
        engineUsed = engine;
        console.log(
          `[s] ok engine=${engine} key[${attempt.keyIndex}] q=${questionNumber} type=${visitorType} elapsed=${Date.now() - startTime}ms`
        );
        break;
      } else {
        console.warn(`[s] ${engine} pool exhausted, cascading`);
      }
    }

    if (!result) {
      const elapsed = Date.now() - startTime;
      console.error(`[s] all pools exhausted, elapsed=${elapsed}ms`);
      return res.status(503).json({
        error: 'all_engines_failed',
        message: 'all keys in all pools are exhausted or unreachable',
        elapsed_ms: elapsed,
      });
    }

    return res.status(200).json({
      ...result,
      engine_used: engineUsed,
      elapsed_ms: Date.now() - startTime,
    });
  } catch (err) {
    console.error('[s] handler error:', err);
    return res.status(500).json({
      error: 'handler_error',
      message: err.message,
      elapsed_ms: Date.now() - startTime,
    });
  }
}
