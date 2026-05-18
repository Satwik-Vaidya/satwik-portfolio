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
// Knowledge slicing — pick relevant nodes for the conversation
// ────────────────────────────────────────────────────────────
//
// Strategy: score each knowledge node by how many of its tags
// appear in the conversation history (case-insensitive substring
// match). Take top N. Always include 'parallel-tracks' on
// recruiter mode since it's the range proof.
// ────────────────────────────────────────────────────────────
export function sliceKnowledge(conversationText, visitorType, maxNodes = 5) {
  const text = (conversationText || '').toLowerCase();

  const scored = KNOWLEDGE.map((node) => {
    let score = 0;
    for (const tag of node.tags) {
      if (text.includes(tag.toLowerCase())) score += 1;
    }
    // Slight boost for public visibility (sensitive nodes still
    // load if directly tagged, just don't bubble up unprompted)
    if (node.visibility === 'public') score += 0.1;
    return { node, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // If nothing scored above the baseline, return a sensible default
  // set so S isn't empty-handed on a generic opener.
  const top = scored.filter((s) => s.score > 0.5).slice(0, maxNodes);
  if (top.length === 0) {
    // Default opener slice — the breadth-of-Satwik teaser
    const defaultIds = ['ileap', 'grokking', 'flood-paper', 'hyapanet', 'parallel-tracks'];
    return KNOWLEDGE.filter((n) => defaultIds.includes(n.id));
  }

  // For recruiter mode, ensure parallel-tracks is in there
  if (visitorType === 'recruiter') {
    const hasParallel = top.some((s) => s.node.id === 'parallel-tracks');
    if (!hasParallel) {
      const parallel = KNOWLEDGE.find((n) => n.id === 'parallel-tracks');
      if (parallel) top[top.length - 1] = { node: parallel, score: 1 };
    }
  }

  return top.map((s) => s.node);
}

// ────────────────────────────────────────────────────────────
// Format a knowledge node into a compact, prompt-injectable block
// ────────────────────────────────────────────────────────────
function formatKnowledgeNode(node) {
  let block = `### ${node.id} (visibility: ${node.visibility})\n`;
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
}) {
  // Flatten conversation into a single string for knowledge slicing
  const convoText = conversationHistory
    .map((m) => `${m.from}: ${m.text}`)
    .join('\n');

  const relevantKnowledge = sliceKnowledge(convoText, visitorType);
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
- Current studies: ${HARD_FACTS.current_studies}
- Undergrad: ${HARD_FACTS.undergrad}
- Contact email: ${HARD_FACTS.contact_email}
- LinkedIn: ${HARD_FACTS.contact_linkedin}

## THINGS YOU MUST NEVER SHARE
${HARD_FACTS.never_share.map((s) => `  - ${s}`).join('\n')}

## VISITOR CONTEXT
Visitor type: ${visitorType}
${visitorDesc}

${capFraming}

## RELEVANT KNOWLEDGE (sliced for this conversation)
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