// ============================================================
// llmClient.js — Browser → /api/s caller.
//
// One function: askS(). Takes conversation state, returns
// { response, next_chips, engine_used } or throws on failure.
//
// SChat.jsx calls this. Falls back to mocked dialogue.js if
// this throws (so chat never breaks).
// ============================================================

// Endpoint resolution:
// - In dev (vite at :5173): /api/s is proxied or hits the same
//   origin if you run `vercel dev`. We hit the relative path
//   either way.
// - In prod (Vercel): /api/s is served by the serverless function.
const ENDPOINT = '/api/s';

// Timeout the request after this many ms.
// LLM calls usually return in 1-3s; cap at 15s to avoid hung UIs.
const TIMEOUT_MS = 15000;

// ────────────────────────────────────────────────────────────
// askS — main entry point
// ────────────────────────────────────────────────────────────
//
// Args:
//   visitorType         : 'friend' | 'theone' | 'recruiter' | 'meta' | 'unknown'
//   questionNumber      : 1, 2, 3, ...
//   maxQuestions        : 4 in prod, Infinity in dev
//   conversationHistory : [{ from: 's'|'user', text: '...' }, ...]
//   currentUserMessage  : string — what the user just said/clicked
//   isFreetext          : boolean — true if user typed, false if chip
//
// Returns:
//   { response: string, next_chips: [{id, label}], engine_used: string }
//
// Throws on any failure — caller catches and falls back to mock.
// ────────────────────────────────────────────────────────────
export async function askS({
  visitorType = 'unknown',
  questionNumber = 1,
  maxQuestions = 4,
  conversationHistory = [],
  currentUserMessage = '',
  isFreetext = false,
}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorType,
        questionNumber,
        // JSON can't serialize Infinity — send null and let the
        // server treat null as "no cap".
        maxQuestions: Number.isFinite(maxQuestions) ? maxQuestions : null,
        conversationHistory,
        currentUserMessage,
        isFreetext,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(
        `API ${res.status}: ${errBody.error || 'unknown'} - ${errBody.message || ''}`
      );
    }

    const data = await res.json();

    if (!data || typeof data.response !== 'string') {
      throw new Error('API returned malformed response');
    }

    return {
      response: data.response,
      next_chips: Array.isArray(data.next_chips) ? data.next_chips : [],
      engine_used: data.engine_used || 'unknown',
      elapsed_ms: data.elapsed_ms || 0,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${TIMEOUT_MS}ms`);
    }
    throw err;
  }
}

// ────────────────────────────────────────────────────────────
// resolveMaxQuestions — env-aware question cap
// Dev = no cap (so we can stress-test S)
// Prod = 4 questions
// ────────────────────────────────────────────────────────────
export function resolveMaxQuestions() {
  // Vite exposes import.meta.env.DEV as true during `npm run dev`
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    return Infinity;
  }
  // Prod cap — generous enough for real exploration, low enough to protect free-tier quotas
  return 10;
}
