// ============================================================
// scaffold.js — The system prompt builder.
//
// Each LLM call gets a freshly-built system prompt assembled from:
//   1. voice.js     — fixed voice DNA (palettes + rules)
//   2. knowledge.js — sliced to the 3-5 most relevant nodes
//   3. context      — visitor type, question #, conversation so far
//
// This file is engine-agnostic. The same prompt goes to Gemini,
// Groq, or any future engine. That's the whole point of
// separating scaffold from engine.
// ============================================================

import { KNOWLEDGE, TONAL_NOTES, HARD_FACTS } from './knowledge.js';
import {
  IDENTITY,
  TONE_RULES,
  REDIRECT_PALETTE,
  ESCAPE_HATCH_PALETTE,
  PRAISE_PALETTE,
  SELF_PALETTE,
  ACK_PALETTE,
  HARD_RULES,
  PROGRESSIVE_VULNERABILITY,
  RUDENESS_RULES,
  OUTPUT_CONTRACT,
} from './voice.js';

// ────────────────────────────────────────────────────────────
// Visitor type descriptions (for the model's situational awareness)
// ────────────────────────────────────────────────────────────
const VISITOR_DESCRIPTIONS = {
  friend:
    "A friend Satwik asked to test the site. Tone: casual, candid, you can be more meta about being a prototype. Inside jokes allowed. Emoji OK.",
  theone:
    "Saw his resume, curious if the hype is real. Tone: confident but earned — show range, drop the proof points, let them decide. Emoji OK.",
  recruiter:
    "A professional recruiter. Tone: lean cleaner, credentials-forward, less playful. NO emojis. Drop the MBA-judge story. Keep the metrics and roles in focus.",
  meta:
    "Asking 'why do you care who's looking?' — this is the soulmate-mode visitor. They get it. Tone: most honest, slightly philosophical, can layer progressive vulnerability. The 'real Satwik' is fair game here. Emoji OK.",
  unknown:
    "Visitor type unclear (free-text entry). Default to confident-but-warm, like the THE-ONE persona. Read the room.",
};

// ────────────────────────────────────────────────────────────
// Intent detection — recognizes structured query patterns so the
// slicer can sort/filter by the schema fields instead of just
// keyword-matching tags.
// ────────────────────────────────────────────────────────────
function detectIntent(text) {
  return {
    wantsRecent:    /\b(recent|latest|current|currently|nowadays|present|today|these days|active|ongoing|working on|right now|new|newest)\b/i.test(text),
    wantsBest:      /\b(best|top|favorite|favourite|most interesting|interesting|impressive|complex|biggest|main|important|coolest|standout|highlight|prized|crown|flagship|signature|proudest)\b/i.test(text),
    wantsResearch:  /\b(research|paper|publication|published|academic|thesis|study|investigation|peer[- ]?reviewed|journal)\b/i.test(text),
    wantsAll:       /\b(all|every|everything|each|complete|full list|whole|entire|tell me everything|every project)\b/i.test(text),
    wantsPersonal:  /\b(hobby|hobbies|personal|outside|fun|interests?|likes?|plays?|music|sport|writing|cooking|chef|photography|photographer|art)\b/i.test(text),
    wantsContact:   /\b(contact|reach|email|connect|linkedin|talk to him|message him|hire|how do I)\b/i.test(text),
  };
}

// ────────────────────────────────────────────────────────────
// Tag-match scorer with word-boundary discipline.
// Drops tags shorter than 3 chars (no more single-letter 's' noise).
// Multi-word tags use substring match; single-word tags use \b.
// ────────────────────────────────────────────────────────────
function tagMatchScore(text, tags) {
  let score = 0;
  for (const tag of tags) {
    if (!tag || tag.length < 3) continue;
    const tagLower = tag.toLowerCase();
    if (tagLower.includes(' ') || tagLower.includes('-')) {
      // Multi-word / hyphenated tags: substring match is fine
      if (text.includes(tagLower)) score += 1;
    } else {
      // Single-word tag: require word boundary
      const escaped = tagLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b${escaped}\\b`, 'i');
      if (re.test(text)) score += 1;
    }
  }
  return score;
}

// Project-ish nodes vs theme/meta nodes (for "all projects" filtering)
const THEME_NODE_IDS = new Set([
  'parallel-tracks',
  'range',
  'neu-courses',
  'egl-award',
  'leadership-early',
]);

// Research-ish nodes (for "research" intent — beyond just tag matching)
const RESEARCH_NODE_IDS = new Set([
  'grokking',
  'hyapanet',
  'adaptml',
  'flood-paper',
]);

// Parse a node's date field to a comparable number (YYYYMM as int).
// Ranges return the END date if "→ ongoing", treat as far-future.
function dateRank(dateStr) {
  if (!dateStr) return 0;
  const ongoing = /ongoing/i.test(dateStr);
  if (ongoing) return 999999; // ongoing wins on "recent"
  // Take the last YYYY-MM in the string (handles "2024-11 → 2025-04")
  const matches = dateStr.match(/(\d{4})-(\d{2})/g);
  if (!matches || matches.length === 0) return 0;
  const last = matches[matches.length - 1];
  const [y, m] = last.split('-');
  return parseInt(y, 10) * 100 + parseInt(m, 10);
}

// ────────────────────────────────────────────────────────────
// Knowledge slicing — picks relevant nodes for the conversation.
// Now reads priority, status, date AND detects query intent.
// ────────────────────────────────────────────────────────────
export function sliceKnowledge(conversationText, visitorType, maxNodes = 5, currentMessage = '') {
  // Weight the current message higher than accumulated history —
  // mitigates the lock-in bias where past nodes keep re-surfacing.
  const histText = (conversationText || '').toLowerCase();
  const curText = (currentMessage || '').toLowerCase();
  const combinedText = `${curText} ${curText} ${curText} ${histText}`; // current weighted 3x

  const intent = detectIntent(combinedText);

  const scored = KNOWLEDGE.map((node) => {
    let score = 0;

    // 1. Tag match (current message weighted 3x via repetition)
    score += tagMatchScore(combinedText, node.tags);

    // 2. Priority weighting — priority 5 nodes ALWAYS outrank priority 1
    //    even on weak tag-match signal
    const priority = node.priority ?? 0;
    score += priority * 0.6; // priority 5 = +3.0, priority 1 = +0.6, null = 0

    // 3. Public visibility tiny boost (preserves old behavior)
    if (node.visibility === 'public') score += 0.1;

    // 4. Intent-based filters and boosts
    if (intent.wantsRecent) {
      // Active/under-review status = currently happening
      if (node.status === 'active' || node.status === 'under-review') {
        score += 4;
      } else if (node.status === 'archived' || node.status === 'live') {
        score -= 1.5;
      }
    }

    if (intent.wantsBest) {
      // Amplify priority for "best/most interesting" queries
      score += priority * 1.0;
      // Penalize priority-1 nodes hard — they should never surface as "best"
      if (priority === 1) score -= 3;
    }

    if (intent.wantsResearch) {
      if (RESEARCH_NODE_IDS.has(node.id)) {
        score += 5;
      } else {
        score -= 2;
      }
    }

    if (intent.wantsAll) {
      // Drop theme/meta nodes from "all projects" answers
      if (THEME_NODE_IDS.has(node.id)) score -= 6;
      // Boost actual project nodes
      if (!THEME_NODE_IDS.has(node.id) && priority !== null) score += 1;
    }

    if (intent.wantsPersonal) {
      if (node.id === 'range' || node.id === 'capture') score += 5;
    }

    return { node, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Determine cap — "all projects" gets more nodes
  const cap = intent.wantsAll ? Math.min(8, KNOWLEDGE.length) : maxNodes;
  let top = scored.filter((s) => s.score > 0).slice(0, cap);

  // Tie-break for "wantsRecent": within active/under-review pool, sort by date desc
  if (intent.wantsRecent && top.length > 1) {
    top = top.sort((a, b) => {
      // Primary: score (already done)
      // Secondary: date rank, newer first
      const da = dateRank(a.node.date);
      const db = dateRank(b.node.date);
      if (Math.abs(a.score - b.score) < 1.5) {
        return db - da;
      }
      return b.score - a.score;
    });
  }

  // Smart fallback if nothing scored — surface the current best work,
  // not the legacy default set
  if (top.length === 0) {
    const defaultIds = ['s-itself', 'cue', 'grokking', 'ileap', 'hyapanet'];
    return KNOWLEDGE.filter((n) => defaultIds.includes(n.id));
  }

  // Recruiter mode: ensure parallel-tracks is in there (range proof)
  if (visitorType === 'recruiter') {
    const hasParallel = top.some((s) => s.node.id === 'parallel-tracks');
    if (!hasParallel) {
      const parallel = KNOWLEDGE.find((n) => n.id === 'parallel-tracks');
      if (parallel) {
        if (top.length < cap) {
          top.push({ node: parallel, score: 1 });
        } else {
          top[top.length - 1] = { node: parallel, score: 1 };
        }
      }
    }
  }

  return top.map((s) => s.node);
}

// ────────────────────────────────────────────────────────────
// Format a knowledge node into a compact, prompt-injectable block.
// Now includes date/status/priority so the LLM can talk about
// "recent" or "biggest" projects intelligently.
// ────────────────────────────────────────────────────────────
function formatKnowledgeNode(node) {
  let block = `### ${node.id} (visibility: ${node.visibility})\n`;
  if (node.date) block += `Date: ${node.date}\n`;
  if (node.status) block += `Status: ${node.status}\n`;
  if (node.priority != null) block += `Priority: ${node.priority} / 5 (5 = top-shelf, 1 = texture only)\n`;
  block += `Summary: ${node.summary}\n`;
  block += `Detail: ${node.detail}\n`;
  if (node.metrics && Object.keys(node.metrics).length > 0) {
    block += `Metrics: ${JSON.stringify(node.metrics)}\n`;
  }
  if (node.restrictions && node.restrictions.length > 0) {
    block += `Restrictions:\n`;
    for (const r of node.restrictions) block += `  - ${r}\n`;
  }
  return block;
}

// ────────────────────────────────────────────────────────────
// Build the full system prompt for a single LLM call
// ────────────────────────────────────────────────────────────
export function buildSystemPrompt({
  visitorType = 'unknown',
  questionNumber = 1,
  maxQuestions = 4,
  conversationHistory = [],
  currentUserMessage = '',
}) {
  // Flatten conversation into a single string for knowledge slicing
  const convoText = conversationHistory
    .map((m) => `${m.from}: ${m.text}`)
    .join('\n');

  const relevantKnowledge = sliceKnowledge(convoText, visitorType, 5, currentUserMessage);
  const knowledgeBlock = relevantKnowledge.map(formatKnowledgeNode).join('\n');

  const visitorDesc =
    VISITOR_DESCRIPTIONS[visitorType] || VISITOR_DESCRIPTIONS.unknown;

  // Conversation depth signal — used for progressive vulnerability
  const isDeepConversation = questionNumber >= 3;

  // Cap-aware framing (maxQuestions can be Infinity in dev)
  const capFraming = Number.isFinite(maxQuestions)
    ? `Question ${questionNumber} of ${maxQuestions}. ${
        questionNumber >= maxQuestions - 1
          ? "You're nearing the end of this conversation — use a soft-close redirect line in your chips."
          : ''
      }`
    : `Question ${questionNumber} (no cap in dev mode).`;

  return `${IDENTITY}

## TONE
${TONE_RULES}

## HARD RULES
${HARD_RULES}

## PROGRESSIVE VULNERABILITY
${PROGRESSIVE_VULNERABILITY}
${isDeepConversation ? 'NOTE: this conversation is deep enough that Stage-2 honesty is appropriate if relevant.' : 'NOTE: stay in Stage-1 confidence framing unless the visitor specifically asks for the real him.'}

## RUDENESS HANDLING
${RUDENESS_RULES}

## REDIRECT PALETTE (rotate, don't repeat within a conversation)
${REDIRECT_PALETTE.map((line) => `  - ${line}`).join('\n')}

## ESCAPE HATCH PALETTE (sparing use — once per conversation max, at natural topic ends)
${ESCAPE_HATCH_PALETTE.map((line) => `  - ${line}`).join('\n')}

## PRAISE PALETTE (when vouching for Satwik)
${PRAISE_PALETTE.map((line) => `  - ${line}`).join('\n')}

## SELF-AGGRANDIZING PALETTE (when called "just an AI")
${SELF_PALETTE.map((line) => `  - ${line}`).join('\n')}

## ACKNOWLEDGMENT PALETTE (natural openers)
${ACK_PALETTE.map((line) => `  - ${line}`).join('\n')}

## TONAL NOTES
${TONAL_NOTES.map((n) => `  - ${n}`).join('\n')}

## HARD FACTS (stable, always known)
- Full name: ${HARD_FACTS.full_name}
- Current role: ${HARD_FACTS.current_role}
${HARD_FACTS.previous_role ? `- Previous role: ${HARD_FACTS.previous_role}\n` : ''}- Undergrad: ${HARD_FACTS.undergrad}
- Contact email: ${HARD_FACTS.contact_email}
- LinkedIn: ${HARD_FACTS.contact_linkedin}
${HARD_FACTS.portfolio_url ? `- Portfolio: ${HARD_FACTS.portfolio_url}` : ''}

## THINGS YOU MUST NEVER SHARE
${HARD_FACTS.never_share.map((s) => `  - ${s}`).join('\n')}

## VISITOR CONTEXT
Visitor type: ${visitorType}
${visitorDesc}

${capFraming}

## RELEVANT KNOWLEDGE (sliced for this conversation)
The nodes below were selected based on the visitor's question, with priority and status fields considered. When asked about "recent" or "current" work, favor nodes with status 'active' or 'under-review'. When asked for "best" or "most interesting", favor higher Priority. When asked for "all projects", surface the project nodes you have, not the theme nodes.

${knowledgeBlock || '(no specific knowledge matched — use defaults)'}

## OUTPUT CONTRACT
${OUTPUT_CONTRACT}

Remember: voice over content. Even if a small model is running
this, the voice rules above are what make you S. Use the palettes.
Rotate redirects. Never invent facts. Sign with — S.`;
}

// ────────────────────────────────────────────────────────────
// Build the message list to send to the LLM (system + history)
// ────────────────────────────────────────────────────────────
export function buildMessages({
  visitorType,
  questionNumber,
  maxQuestions,
  conversationHistory,
  currentUserMessage,
  memoryWindow = 6,
}) {
  const systemPrompt = buildSystemPrompt({
    visitorType,
    questionNumber,
    maxQuestions,
    conversationHistory,
    currentUserMessage, // ← now passed through so slicer sees the live question
  });

  // Take only the last N exchanges to keep token usage sane
  const trimmedHistory = conversationHistory.slice(-memoryWindow);

  // Convert internal {from, text} into LLM message format
  const messages = trimmedHistory.map((m) => ({
    role: m.from === 's' ? 'assistant' : 'user',
    content: m.text,
  }));

  // Append the current user message
  if (currentUserMessage) {
    messages.push({ role: 'user', content: currentUserMessage });
  }

  return { systemPrompt, messages };
}