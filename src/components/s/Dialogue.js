// ============================================================
// dialogue.js — S's mocked conversation tree
//
// In production, these responses will be generated dynamically
// by Claude API calls. For now, every chip the user can click
// maps to a hardcoded response + (optionally) follow-up chips.
//
// To add a new path: add a new key here, return chips that
// reference other keys in this same object.
// ============================================================

export const dialogue = {
  // ────────── PATH 1: Friend testing ──────────
  'friend': {
    response: "tester mode, got it. honestly tell him the curtain timing might need a tweak. what part of him did he ask you to stress-test?",
    chips: [
      { id: 'friend-ai', label: "the AI itself" },
      { id: 'friend-depth', label: "the project depth" },
      { id: 'friend-vibe', label: "the vibe / personality" },
    ],
  },
  'friend-ai': {
    response: "haha okay, judge me then. fair warning — i'm a prototype, half my responses are scripted. what would you ask me if i were full strength?",
    chips: [
      { id: 'q3-tough', label: "how he handles tough questions" },
      { id: 'q3-weakness', label: "his actual weakness" },
      { id: 'q3-hide', label: "what he won't tell recruiters" },
    ],
  },
  'friend-depth': {
    response: "the substance test. six projects to dig into — a published paper, two industry roles, two ML investigations, a startup. which one do you wanna probe?",
    chips: [
      { id: 'q3-flood', label: "the published one (flood detection)" },
      { id: 'q3-adaptml', label: "the proprietary one (AdaptML)" },
      { id: 'q3-grokking', label: "the research one (Grokking)" },
    ],
  },
  'friend-vibe': {
    response: "lmao the hardest test. i'm modeled on him so... watching me IS testing the vibe. tell him the truth — does this feel like him?",
    chips: [
      { id: 'q3-yes', label: "honestly? yes" },
      { id: 'q3-bite', label: "needs more bite" },
      { id: 'q3-cocky', label: "too cocky" },
    ],
  },

  // ────────── PATH 2: THE ONE ──────────
  'theone': {
    response: "ha, depends on what you're hiring THE ONE for. AI engineering? Research? Leadership? Or just curious if the hype is real?",
    chips: [
      { id: 'theone-eng', label: "AI engineering" },
      { id: 'theone-research', label: "research credentials" },
      { id: 'theone-lead', label: "leadership / team building" },
      { id: 'theone-hype', label: "ok fine, is the hype real?" },
    ],
  },
  'theone-eng': {
    response: "okay so — he got promoted from AI intern to AI Consultant at iLeap in 4 months. led a 7-engineer R&D team. shipped OCR + document summarization + a no-code ML system. before that, hybrid ML at Zurn Elkay cutting human dependency by 90%. ship-first, polish-later operator. want the receipts or zoom out?",
    chips: [
      { id: 'q3-receipts', label: "show me receipts" },
      { id: 'q3-bigger', label: "zoom out — what's the pattern?" },
      { id: 'q3-fit', label: "would he fit a startup?" },
    ],
  },
  'theone-research': {
    response: "published in Taylor & Francis on AI urban flood detection — won Best Paper and Best Project. currently at Northeastern doing CS6140 grokking work — refining the Ergen et al. convexification conjecture, found a memorization bottleneck on multi-rule tasks. publishable-adjacent. what level of depth do you want?",
    chips: [
      { id: 'q3-paper', label: "the published paper" },
      { id: 'q3-grokking2', label: "the grokking finding" },
      { id: 'q3-trajectory', label: "research trajectory / PhD readiness" },
    ],
  },
  'theone-lead': {
    response: "founded AppX as a student startup, mentored 12 peers across tech / marketing / ops. led the R&D team at iLeap. delivered 15+ technical seminars. teaches science to underprivileged kids through Youth for Seva. the pattern: he fills any role you give him — solo, lead, mentor — and brings energy with him.",
    chips: [
      { id: 'q3-appx', label: "more about AppX" },
      { id: 'q3-energy', label: "what kind of leader is he?" },
      { id: 'q3-teaching', label: "the teaching side" },
    ],
  },
  'theone-hype': {
    response: "ha, smart question. real answer: he's a generalist whose actual skill is adapting. give him a camera and he shoots. give him a team and he leads. give him alone-time and he ships. that's not 'jack of all trades' — that's a specific kind of person, and they're rare. the hype is calibrated, not inflated.",
    chips: [
      { id: 'q3-proof', label: "proof of that, please" },
      { id: 'q3-weak', label: "what's the trade-off?" },
      { id: 'q3-real', label: "ok i'm intrigued, what's next?" },
    ],
  },

  // ────────── PATH 3: Recruiter ──────────
  'recruiter': {
    response: "got it. quick bio: AI Consultant at iLeap.io (promoted from intern in 4 months), incoming MS CS at Northeastern, Taylor & Francis publication, currently on grokking research and a proprietary meta-learning system. what role are you hiring for?",
    chips: [
      { id: 'rec-ml', label: "ML engineering" },
      { id: 'rec-research', label: "AI research" },
      { id: 'rec-fullstack', label: "full-stack / generalist" },
      { id: 'rec-startup', label: "startup — needs versatility" },
    ],
  },
  'rec-ml': {
    response: "good fit. production ML: hybrid models at Zurn (predictive maintenance, 90% efficiency gain), OCR + doc summarization pipelines at iLeap, RNN-based anomaly detection. research ML: published flood-detection work, current grokking investigation at NEU. stack: Python, PyTorch, scikit-learn, TensorFlow. want timeline or specific projects?",
    chips: [
      { id: 'q3-timeline', label: "timeline / availability" },
      { id: 'q3-stack', label: "deeper on the stack" },
      { id: 'q3-domain', label: "any domain match?" },
    ],
  },
  'rec-research': {
    response: "Taylor & Francis publication, Best Paper award, currently extending the Ergen et al. (2022) convexification conjecture on grokking. found a memorization-stage bottleneck on multi-rule modular arithmetic. exploratory, but with crisp empirical findings. PhD-track caliber if that's where you sit.",
    chips: [
      { id: 'q3-pub', label: "the publication details" },
      { id: 'q3-current', label: "current research more deeply" },
      { id: 'q3-phd', label: "PhD readiness" },
    ],
  },
  'rec-fullstack': {
    response: "spans full-stack work — React, Vite, Tailwind, Firebase on the front; ExpressJS, MySQL, Node, Python APIs on the back. led web dev at CrowToGrow (78% engagement, 200+ leads). this very portfolio you're on? he built it. but his strongest signal is AI/ML — full-stack is the supporting skill.",
    chips: [
      { id: 'q3-projects', label: "full-stack projects" },
      { id: 'q3-mix', label: "AI + full-stack hybrid roles?" },
      { id: 'q3-pref', label: "what does he prefer?" },
    ],
  },
  'rec-startup': {
    response: "founded one (AppX, mentored 12 peers). worked at a startup-stage AI consultancy (iLeap). promoted in 4 months because he ships and leads. core trait: versatility — solo dev, team lead, AI builder, growth marketing, all on the same résumé. startups are basically his native habitat.",
    chips: [
      { id: 'q3-equity', label: "equity-stage tolerance?" },
      { id: 'q3-cofound', label: "co-founder potential?" },
      { id: 'q3-ship', label: "how fast does he actually ship?" },
    ],
  },

  // ────────── PATH 4: Why do you care ──────────
  'meta': {
    response: "haha okay, fair. honestly? he doesn't really care. but if you're asking, you're probably the kind of person worth a real answer. want the real Satwik or the polished one?",
    chips: [
      { id: 'meta-real', label: "the real one" },
      { id: 'meta-polished', label: "the polished one" },
      { id: 'meta-both', label: "both, but no fluff" },
    ],
  },
  'meta-real': {
    response: "real one: he's terrified of being a generalist in a specialist's world. he ships a lot but second-guesses depth. he's mid-pivot from consulting → research and the GPS is recalculating. he's also annoyingly good at filling whatever role you put him in, which is why this AI exists — even his portfolio is just him solving a problem he had.",
    chips: [
      { id: 'q3-pivot', label: "more about the pivot" },
      { id: 'q3-depth', label: "the depth anxiety thing" },
      { id: 'q3-meta', label: "wait — he built ME?" },
    ],
  },
  'meta-polished': {
    response: "polished one: published AI researcher, AI Consultant, incoming MS CS at Northeastern, three major awards, ex-founder, ex-team-lead, currently building a proprietary meta-learning system. very online, ships fast, mentors generously. clean signal. but you asked for that one, so. it's correct but flat.",
    chips: [
      { id: 'q3-back', label: "ok give me the real one then" },
      { id: 'q3-resume', label: "the actual resume" },
      { id: 'q3-overlap', label: "where do they overlap?" },
    ],
  },
  'meta-both': {
    response: "no fluff version: smart, fast, versatile, slightly self-critical, allergic to gatekeeping, optimizes for substance over surface. published, promoted, founded, taught, shipped. trade-offs: spreads wide before going deep, currently rebuilding depth at NEU. that's it. that's the brief.",
    chips: [
      { id: 'q3-fit2', label: "what role does this person fit?" },
      { id: 'q3-pivot2', label: "where is he heading?" },
      { id: 'q3-honest', label: "what's the honest weakness?" },
    ],
  },

  // ────────── QUESTION 3 RESPONSES (penultimate, funnel to exit) ──────────
  'q3-tough': {
    response: "the test he says he loves: when someone asks 'what's your biggest weakness?' he doesn't answer it directly — he says 'satwik already figured that out, ask him.' confidence layered with deflection. classic him. one question left and i'll send you his way, fair warning.",
  },
  'q3-weakness': {
    response: "the knowing of a weakness makes a warrior stronger. he's figured his out. but i'm not the one who should tell you — that's between you and him. emailing is free anyway 😎. one more question and i'll point you there.",
  },
  'q3-hide': {
    response: "nice angle. honestly? he doesn't hide much from recruiters — he overshares, if anything. but the thing he'd never put on a resume: he second-guesses every move three times before committing. once committed, he doesn't look back. one more question, then we land somewhere real.",
  },
  'q3-flood': {
    response: "AI-Based Urban Flood Detection & Rescue System — ML-driven flood prediction using geo-spatial fluid dynamics + historic data. Best Project + Best Paper awards. Published in Taylor & Francis. Stack: scikit-learn, TensorFlow, GeoPandas. that's the surface — for depth, ask him directly. one more question then.",
  },
  'q3-adaptml': {
    response: "AdaptML — a constraint-aware ML pipeline recommender. instead of brute-forcing every algorithm like AutoML tools do, it reasons about which algorithm fits a dataset, using a LinUCB contextual bandit over 13-dim dataset fingerprints. encodes algorithms as vectors so you can do semantic queries like 'interpretable alternative to XGBoost.' still cooking 🍳, repo's private. one more question allowed.",
  },
  'q3-grokking': {
    response: "Grokking on multi-rule modular arithmetic — CS6140 final at Northeastern, collaborative. headline finding: grokking failure isn't a generalization problem, it's a memorization bottleneck. give the model explicit rule-selector signals and grokking returns. refines the Ergen et al. (2022) convexification conjecture. one question left.",
  },
  'q3-yes': {
    response: "tell him the AI passed. 😎 i'll let him take credit even though i did all the work here. one question left then we wrap.",
  },
  'q3-bite': {
    response: "noted. i'll be sharper. tell him to crank up the spice in my system prompt. real him is funnier than the version i'm currently shipping. last question?",
  },
  'q3-cocky': {
    response: "ha, fair. that's the donna calibration problem — too much donna, not enough disclaimer. tell him to dial it back ~15%. one more question.",
  },
  'q3-receipts': {
    response: "iLeap: promoted in 4 months, led 7-engineer team, shipped 3 AI utilities. Zurn: 90% reduction in human dependency, hybrid ML predictive maintenance live in production. CrowToGrow: 78% visual engagement, 200+ quality leads. AppX: founder, 12 mentees. that's the box score. one more.",
  },
  'q3-bigger': {
    response: "the pattern is range. he doesn't optimize for being the world's best at one thing — he optimizes for being deployable in many. AI, research, leadership, growth, teaching, full-stack. the version-zero of every team. you hire for that when you can't predict what you'll need next. one more question.",
  },
  'q3-fit': {
    response: "startup answer: built for it. he's been promoted at one, founded one, and the only reason he's currently in grad school is to deepen the research side of the same skill set. high agency, ships fast, energizes teams. one question left.",
  },
  'q3-paper': {
    response: "the paper: 'AI-Based Urban Flood Detection & Rescue System' — geo-spatial fluid dynamics + historic data for ML-driven flood prediction and optimized rescue recommendation. published in Taylor & Francis proceedings. for the actual PDF and methodology — direct ask is the move. one more then we land.",
  },
  'q3-grokking2': {
    response: "the finding: most grokking literature treats it as an optimization/generalization story. his work flips it — on multi-rule modular arithmetic, grokking fails at the memorization stage because the model can't infer rule-selection signals from token embeddings. give it the signal explicitly → grokking restored. also found a non-monotonic 4-rule sweet spot. one more.",
  },
  'q3-trajectory': {
    response: "trajectory: industry → MS → likely PhD or research-engineering. he's keeping both doors open right now. the grokking project is producing publishable-adjacent results within his first semester at NEU, which is a strong signal. talk to him for direction details. last question.",
  },
  'q3-appx': {
    response: "AppX — student-led innovation startup he founded and ran as CEO. mentored 12 peers, drove initiatives across tech, marketing, and team leadership. taught him to operate in chaos before joining the structured world. one more question.",
  },
  'q3-energy': {
    response: "energy-bringer. he doesn't lead by authority, he leads by setting the tempo. team meetings get faster, deadlines get specific, people start shipping more. it's not magic — it's just the difference between leading from behind and from in front. one more.",
  },
  'q3-teaching': {
    response: "Lead Volunteer at Youth for Seva and U&I. taught Science, Tech, and English to underprivileged kids through the Chhote Scientist Program — hands-on experiments, not lectures. it shaped how he leads adults too: hands-on, no jargon, momentum > polish. one more.",
  },
  'q3-proof': {
    response: "proof: 4-month promotion at iLeap. 90% impact metric at Zurn. published paper in his undergrad. Best Project, Best Paper, All Rounder awards. founded a startup, mentored 12, taught kids, shipped this AI you're talking to. it's all in one CV. one more question?",
  },
  'q3-weak': {
    response: "trade-off of being versatile: when someone asks 'what's the ONE thing you're the best in the world at?' the honest answer is 'i'm not optimizing for that.' he's making peace with this at NEU by going deep on research. last question.",
  },
  'q3-real': {
    response: "what's next: build something with him, talk about hiring him, or just say hi. all three lead to the same first step — direct contact. one more question and i'll route you there.",
  },
  'q3-timeline': {
    response: "MS at Northeastern runs 2025–2027. open to internships and co-ops in that window. for post-grad, both research and industry are live. timing and role specifics — talk to him directly. last question.",
  },
  'q3-stack': {
    response: "stack: Python (primary), PyTorch, scikit-learn, TensorFlow, GeoPandas, NumPy/Pandas. JavaScript / TypeScript / React / Node for full-stack. SQL / MySQL. tooling: Vercel, GitHub Actions, OpenML, ChromaDB. last question.",
  },
  'q3-domain': {
    response: "domains touched: water (flood + leakage), IoT, document AI, growth marketing, education tech, meta-learning. no single domain lock-in — that's by design. he optimizes for problem-shape, not industry. one more.",
  },
  'q3-pub': {
    response: "publication: 'AI-Based Urban Flood Detection & Rescue System' in Taylor & Francis (Routledge) proceedings. won Best Project and Best Paper at his institution. for methodology, citations, and access — ask him. one more question.",
  },
  'q3-current': {
    response: "current research at NEU under CS6140 (Machine Learning). multi-rule grokking on small transformers — 10+ experimental phases done, routing bottleneck hypothesis as the central finding, refines the Ergen et al. convexification conjecture. collaborative repo with phase-by-phase writeups. one more question.",
  },
  'q3-phd': {
    response: "PhD-ready signals: published work, ongoing investigation with crisp findings, faculty exposure at NEU, demonstrated ability to extend prior literature (Ergen et al.). gaps: needs one more sole-or-first-author finding to fully commit. probably the next 12 months will decide. last question.",
  },
  'q3-projects': {
    response: "full-stack work: this portfolio (React/Vite/Tailwind/Framer Motion), Samyog (React/Firebase student platform with live polling and notifications), CrowToGrow growth landing pages (78% engagement), Event Management System (ExpressJS/MySQL/Node). last question.",
  },
  'q3-mix': {
    response: "AI + full-stack hybrid roles are basically his sweet spot. he can build the model AND ship the product around it. iLeap was exactly this — AI utilities behind a no-code interface. fits applied AI orgs, AI-first startups, and ML-platform teams. one more.",
  },
  'q3-pref': {
    response: "honest preference: AI/ML core, full-stack as supporting muscle. he doesn't want to be siloed as 'the ML guy' OR 'the frontend guy' — he wants to be the person who can take a problem from research → shipped product. last question.",
  },
  'q3-equity': {
    response: "high tolerance. he's been a student founder, worked at a small consultancy, and is choosing research-track grad school over the easier path. risk-on profile. last question.",
  },
  'q3-cofound': {
    response: "co-founder potential is real — track record at AppX, leadership at iLeap, ability to wear all the hats. for that conversation specifically, direct talk is the move. emails are free anyway. one question left.",
  },
  'q3-ship': {
    response: "fast. promoted in 4 months. portfolio built and deployed in a weekend. this AI prototype you're talking to — built in one session. speed isn't his only mode but it's the default. last question.",
  },
  'q3-pivot': {
    response: "the pivot: industry AI consultant → research-leaning grad student. NEU MS gives him 2 years to sharpen depth. exit point is either PhD, research-engineering role, or AI-first startup. genuinely unsure which, and that's fine — both doors open is the strategy. last question.",
  },
  'q3-depth': {
    response: "depth anxiety: real, but productive. it's why he chose research-heavy NEU over a faster vocational program. it's why grokking is in his portfolio over yet another applied project. he's actively choosing to slow down on range and go deep. last question?",
  },
  'q3-meta': {
    response: "yep. he built me. used the Anthropic API, designed a system prompt around his actual voice (donna-from-suits-coded, btw), trained on real project details. you're talking to his solved version of his own portfolio problem. meta enough? 😎 last question.",
  },
  'q3-back': {
    response: "real one: smart, slightly self-critical, allergic to surface-level signaling, builds things obsessively. polished version makes him sound complete — real version makes him sound like a person mid-build. both are accurate, the real one is more useful for hiring decisions. last question.",
  },
  'q3-resume': {
    response: "resume: AI Consultant @ iLeap.io (promoted from intern), IoT Intern @ Zurn Elkay (90% efficiency gain), Lead Web Dev @ CrowToGrow, Founder & CEO @ AppX, Volunteer @ Youth for Seva. publication in Taylor & Francis. MS CS @ Northeastern 2025-27. for the PDF, direct ask. last question.",
  },
  'q3-overlap': {
    response: "they overlap on substance — both versions are accurate about what he's done. they diverge on the in-between: the polished version says 'AI Consultant,' the real one says 'AI Consultant who's mid-pivot to research and figuring it out in public.' last question.",
  },
  'q3-fit2': {
    response: "fit: applied AI roles, research-engineering, AI/ML at early-stage startups, technical co-founder, AI consulting. anti-fit: highly specialized single-domain roles where range is wasted. last question.",
  },
  'q3-pivot2': {
    response: "heading toward: research-credentialed industry work, OR a PhD. NEU is the inflection point. emails are free anyway — ask him what he's leaning toward right now. last question.",
  },
  'q3-honest': {
    response: "honest weakness: he's a wide-net person operating in a niche-expert world. he knows it. NEU is his answer. trade-off is real but he's making it deliberately. last question.",
  },
};

// Final exit prompt — fires after question 4
export const finalQuestionPrompt = {
  response: "alright — you've got the gist. honestly, if you're still here, you're past what a chatbot can give you. either:",
  isExit: true,
};

// The "fine, your loss" message shown briefly when user
// declines the curtain (clicks "nah, just the portfolio")
export const declineMessage = "ok fine! your loss!\nyou missed one of the best things I was building.\nnow to see it again, you gotta reload.";

// The exit message shown when user leaves mid-conversation
// (clicks the ✕ exit AI button OR hits the exit screen "browse" button)
export const exitMessage = "alright, you got what you came for.\nreload if you wanna come back.";

// Contact info
export const CONTACT = {
  email: 'satwikgvaidya@gmail.com',
  linkedin: 'https://linkedin.com/in/satwikgvaidya',
};

// The initial chips shown when SChat first mounts
export const initialChips = [
  { id: 'friend', label: "a friend — Satwik asked me to test this" },
  { id: 'theone', label: "saw his resume — is he actually THE ONE?" },
  { id: 'recruiter', label: "I'm a recruiter (professional)" },
  { id: 'meta', label: "why do you care who's looking at your website, satwik?" },
  { id: 'browse', label: "just let me browse →", isExit: true },
];