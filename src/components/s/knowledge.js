// ============================================================
// knowledge.js — Satwik's structured knowledge base.
//
// Each entry has:
//   id            : unique short identifier
//   tags          : keywords for retrieval matching
//   visibility    : 'public' | 'sensitive' | 'redirect-only'
//                   sensitive = depth on conversational deep paths only
//                   redirect-only = never elaborate, always redirect
//   date          : "YYYY-MM" anchor OR "YYYY-MM → YYYY-MM" range
//                   OR "YYYY-MM → ongoing" for active work
//                   null for nodes where chronology doesn't apply
//   status        : 'active'        — currently building / writing / researching
//                   'live'          — shipped, not actively extended right now
//                   'under-review'  — submitted, awaiting outcome
//                   'proposed'      — conceptual, not implemented
//                   'archived'      — past-tense, wouldn't go back
//   priority      : 1-5, where 5 = top-shelf, must surface
//                   1 = include for completeness / texture only
//                   null for nodes where ranking doesn't apply
//   summary       : one-liner S can use anywhere
//   detail        : richer paragraph S can pull from
//   metrics       : concrete numbers (only when verified)
//   restrictions  : things S MUST NOT say about this node
//
// The scaffold picks 3-5 relevant entries per call based on
// conversation context, then injects them into the prompt.
// ============================================================

export const KNOWLEDGE = [
  // ────────── A: CrowToGrow ──────────
  {
    id: 'crowtogrow',
    tags: ['crowtogrow', 'first job', 'business', 'sales', 'marketing', 'lead generation', 'undergrad', 'web design', 'mba judge'],
    visibility: 'public',
    date: '2021-01 → 2022-12',
    status: 'archived',
    priority: 1,
    summary: "His first real exposure to 'work' beyond tech — picked up lead gen, sales, negotiation, marketing alongside designing their website.",
    detail: "Joined CrowToGrow by accident during his 1st-2nd year of undergrad. Officially designed their website and landing pages, but in practice got pulled into lead generation, marketing, sales, negotiation, content writing, design, and production. Had daily conversations with the founder — mentor-relationship dynamic. As a 19-year-old engineering student representing CrowToGrow, was invited as honorary judge for an MBA competition at REVA, Bengaluru in his 2nd year. The key insight he absorbed here: businesses don't trust freelancers, but there's real demand for small website builders for businesses trying to enter the digital space. This observation directly sparked AppX.",
    metrics: null,
    restrictions: [
      "For recruiter mode — keep the MBA judge story off the table (recruiters fact-check exotic claims).",
      "For friend / curious / meta paths — MBA judge story is fair game and lands hard.",
    ],
  },

  // ────────── B: AppX / Samyog ──────────
  {
    id: 'appx',
    tags: ['appx', 'samyog', 'founder', 'startup', 'team', 'leadership', 'undergrad', 'student startup'],
    visibility: 'public',
    date: '2023-01 → 2023-12',
    status: 'archived',
    priority: 3,
    summary: "Founded a 12-person student startup building websites for businesses entering the digital space — his first real leadership.",
    detail: "Born from the CrowToGrow insight — businesses need cheap, trustworthy website builders. Recruited 12 peers across the dept using his existing influence, organized them into structured roles: 3 developers, 3 designers, 3 management, 1 requirements-gathering specialist, 1 architect. Real-org thinking at 20. Founded department clubs to feed talent into the team. Delivered 10+ seminars to juniors and his own team. Led client meetings → landed projects → designed → developed. Closed 2 paying clients before winding down — mid-engineering exam pressure made student schedules incompatible with startup velocity. A lesson in 'alignment beats motivation' he carries forward. This was the first thing he actually *started* — and the first time he led people who weren't already his peers.",
    metrics: { team_size: 12, seminars_delivered: '10+', clients_closed: 2 },
    restrictions: [
      "Don't link to samyogappx.netlify.app/team unless asked directly — that's internal reference, not a public showcase.",
      "Honest framing: was the engine of the operation even with a real team structure. He doesn't hide this.",
    ],
  },

  // ────────── C: Hubs / Manthan ──────────
  {
    id: 'hubs',
    tags: ['hubs', 'manthan', 'startup', 'coo', 'social platform', 'startup mahakumbh', 'finalist', 'karnataka'],
    visibility: 'public',
    date: '2023-11 → 2024-04',
    status: 'archived',
    priority: 1,
    summary: "Co-founder & COO of Hubs — a 15-person multi-state student startup, Manthan business plan finalist (Govt of Karnataka).",
    detail: "After winding down AppX, attended Startup Mahakumbh (one of India's biggest startup events) representing his university. Met student founders from across states; a group of them co-founded Hubs — a B2C social platform connecting friends and loved ones with restaurants, where the platform takes a cut and the customer gets a discount. 15-person team, multi-state. He took the COO seat — operations, coordination, scaling. The team made it to the finalist round of the Manthan Business Plan Competition organized by the Government of Karnataka. Didn't reach launch, but the experience taught him multi-founder dynamics, finalist-pitch craft, and navigating government-stakeholder ecosystems.",
    metrics: { team_size: 15 },
    restrictions: [
      "Don't claim Hubs launched — it didn't. The win was reaching finalist at a state-government competition.",
      "Apart from the finalist outcome, this one's texture not headline. Don't oversell.",
    ],
  },

  // ────────── D: iLeap (full arc) ──────────
  {
    id: 'ileap',
    tags: ['ileap', 'ai consultant', 'promoted', 'team lead', 'production ai', 'ocr', 'aiocr', 'low-code', 'ml platform', 'doc summarization', 'microsoft ocr', 'poc'],
    visibility: 'public',
    date: '2024-11 → 2025-07',
    status: 'archived',
    priority: 4,
    summary: "Promoted from AI Intern to AI Consultant in 4 months. Owned AI-OCR production deployment, led a 7-member team, built a low-code ML platform.",
    detail: "Started as a project intern building an AI-OCR system and an NLP-based process design system. The signature moment came when the senior architects had concluded Microsoft's OCR was the ceiling for handling semi-structured and unstructured documents — messy real-world stuff with weird layouts, drifted forms, noisy boundary cases. Rather than arguing on air, he scavenged AI-OCR fragments across multiple open repos, studied the design choices, then re-engineered them specifically against (a) iLeap's actual document requirements and (b) Microsoft OCR's specific failure modes. Walked into a meeting with a working PoC that processed one of their real semi-structured pages end-to-end. The room flipped. This is the move that changed how people viewed him there. He was promoted to AI Consultant in 4 months. Post-promotion: given ownership of getting the AI-OCR system to production, plus leadership of a 7-member team of interns and fellow consultants. Also led the build of a low-code ML platform — letting the platform's users build their own models for data processing and simple decision-making without writing code. Continued the document summarization and generative software work from his intern phase. Role concluded with his move to Boston for the MS at Northeastern.",
    metrics: { promotion_months: 4, team_size_led: 7 },
    restrictions: [
      "Don't share specific iLeap client names or proprietary product specifics.",
      "Don't claim exact revenue/business impact metrics — internal details he wouldn't blast publicly.",
      "The OCR-PoC anecdote is GOLD for the consultant-intake framing — diagnose tool failure modes, scavenge proof from existing work, synthesize through. Use it where appropriate but don't overplay it.",
      "Frame the role as concluded (he moved to grad school), not as ongoing.",
    ],
  },

  // ────────── E: Parallel tracks ──────────
  {
    id: 'parallel-tracks',
    tags: ['multitasking', 'range', 'parallel', 'final year', 'versatility'],
    visibility: 'public',
    date: '2024-11 → 2025-07',
    status: 'archived',
    priority: 3,
    summary: "While working at iLeap, simultaneously ran HyAPA-Net research and his final-year flood prediction project — three serious streams in parallel.",
    detail: "The version of versatility most candidates claim but few actually demonstrate. From November 2024 through mid-2025 he was simultaneously: (1) leading the 7-person team at iLeap and shipping AI-OCR to production, (2) running the HyAPA-Net UAV research as lead implementer (later submitted to SN Computer Science), (3) executing his final-year undergrad project that won Best Project + Best Paper + publication in Taylor & Francis. Three high-stakes streams, all delivered, on overlapping calendars. Not 'I led initiatives' resume-speak — this is documented simultaneous delivery.",
    metrics: null,
    restrictions: [
      "Don't lead with this node unless a visitor explicitly asks about workload, range, or how he handles multiple things at once. It's a *frame*, not a headline project.",
    ],
  },

  // ────────── F: Emerging Graduate Leader ──────────
  {
    id: 'egl-award',
    tags: ['award', 'emerging graduate leader', 'lead360', 'northeastern', 'leadership'],
    visibility: 'public',
    date: '2025-12',
    status: 'live',
    priority: null,
    summary: "Won Emerging Graduate Leader at Northeastern (Lead360 program) in his first semester — December 2025.",
    detail: "Awarded by Lead360, Northeastern University, at the end of Fall 2025 — his first semester after the move from India. The award mattered personally as proof of identity continuity: the pattern that worked in Bangalore still works in Boston. He didn't lose himself in the move — just relocated.",
    metrics: null,
    restrictions: [
      "The personal/emotional framing of this award (identity continuity through the transition) — share only on soulmate/meta paths where the visitor is asking who Satwik really is, not on recruiter calls.",
    ],
  },

  // ────────── G: Grokking Expanded ──────────
  {
    id: 'grokking',
    tags: ['grokking', 'research', 'cs6140', 'northeastern', 'transformers', 'modular arithmetic', 'routing bottleneck', 'ergen'],
    visibility: 'public',
    date: '2025-10 → 2026-02',
    status: 'live',
    priority: 5,
    summary: "His most complex research at Northeastern — investigated why grokking breaks down on multi-rule modular arithmetic tasks. Found it's a memorization bottleneck, not a generalization one.",
    detail: "Final project for CS6140 (Machine Learning) at Northeastern, collaborative. He led the architecture of the project, ran 10+ experimental phases, and did the heaviest cognitive lift — hypothesizing what the results meant. The central finding (which flips standard grokking narrative): grokking failure on multi-rule tasks isn't a generalization problem, it's a memorization-stage bottleneck. Transformers can't infer rule-selection signals from token embeddings; provide them explicitly and grokking returns. The work refines the Ergen et al. (2022) convexification conjecture — convexification helps on single-rule tasks but provides no benefit on heterogeneous multi-rule ones. Also found a non-monotonic 4-rule sweet spot. By depth and rigor, this is the most serious research he's done.",
    metrics: { experimental_phases: '10+' },
    restrictions: [
      "DO NOT claim the project has been adopted as a CS7200 sample project — that detail is unconfirmed until September.",
      "It's collaborative work — own the collaboration honestly. His contributions are the architecture, the experimental design, and the hypothesis-formation.",
    ],
  },

  // ────────── H: AdaptML ──────────
  {
    id: 'adaptml',
    tags: ['adaptml', 'meta-learning', 'automl', 'bandit', 'linucb', 'algorithm selection', 'embedding', 'still cooking', 'proprietary'],
    visibility: 'sensitive',
    date: '2025-09 → ongoing',
    status: 'active',
    priority: 3,
    summary: "His proprietary meta-learning system — reframes algorithm selection as navigation in a learned embedding space rather than search over a discrete set. Still cooking 🍳.",
    detail: "The reframe: instead of brute-forcing AutoML's joint algorithm-and-hyperparameter space (AutoSklearn / TPOT / H2O style), each algorithm gets a behavior vector. Datasets get encoded into the same space via fingerprint→embedding. Algorithm selection becomes outputting a point and taking the nearest neighbor. Three properties fall out for free: (1) compositional generalization (continuous action space allows interpolation between algorithms — principled prior for ensembling); (2) zero-shot transfer to new algorithms (adding an algorithm = adding a vector, no policy retraining needed); (3) constraint-conditioned policies (constraints become a policy input, agent routes around constraint-violating regions instead of post-hoc filtering). v1 is a contextual bandit (LinUCB) over discrete choices with 13-dim hand-engineered dataset fingerprints — the discrete projection of the full vision, useful as baseline. NL constraint parser, model zoo, reward shaping, reasoning module all wired end-to-end. Conception preceded Grokking by a few weeks; both are active in parallel.",
    metrics: { fingerprint_dimensions: 13 },
    restrictions: [
      "REPO IS PRIVATE. Don't link to it, don't claim it's open-source.",
      "Don't share the algorithm-vector derivation methodology — that's the secret sauce / moat.",
      "Implementation details of the reasoning module: redirect, don't elaborate.",
      "Honest framing: he can share the architecture and the reframe, but the *novel mechanisms* stay protected.",
      "When pushed for code or specific eval results: 'Still cooking. For depth — talk to satwik himself. He's protective of this one.'",
      "It's a PoC right now — concept-strong, deliverable-light. Be honest about that.",
    ],
  },

  // ────────── I: Northeastern courses ──────────
  {
    id: 'neu-courses',
    tags: ['northeastern', 'courses', 'cs5010', 'cs5800', 'cs6140', 'cs5100', 'ms cs'],
    visibility: 'public',
    date: null,
    status: 'active',
    priority: null,
    summary: "Completed 4 courses at Northeastern MS CS so far: CS5010 (Programming Design Paradigm), CS5800 (Algorithms), CS6140 (Machine Learning), CS5100 (Foundations of AI).",
    detail: "Mix of foundational CS (5010, 5800) and AI-specific (6140, 5100). CS6140 produced the Grokking Expanded final project. Building research muscle on a foundation of solid CS fundamentals — he's not just an 'AI guy', he's a CS engineer who also does AI.",
    metrics: { courses_completed: 4 },
    restrictions: [
      "Don't share specific course grades — privacy + no need to brag.",
      "Don't speculate about future courses he'll take.",
    ],
  },

  // ────────── J: Flood Prediction Paper ──────────
  {
    id: 'flood-paper',
    tags: ['flood', 'taylor francis', 'routledge', 'best paper', 'best project', 'undergrad', 'ensemble', 'stacking', 'kmeans', 'random forest', 'gradient boosting'],
    visibility: 'public',
    date: '2025-01 → 2025-05',
    status: 'live',
    priority: 3,
    summary: "Published in Taylor & Francis (Routledge): a zone-aware hybrid ensemble for urban flood prediction. Won Best Project + Best Paper at his undergrad.",
    detail: "Title: 'Flood Prediction: Zone-Aware Hybrid Ensemble System.' Final-year undergrad project — methodology paper designed for Indian urban/semi-urban contexts. The headline reframe: most flood prediction systems treat the city as uniform; this one doesn't. Architecture: (1) K-Means zonal clustering with k=6 — geo-spatial zones treated independently; (2) zone-specific rainfall thresholding (μ + σ per zone) to flag anomaly rainfall; (3) domain-informed binary features encoding hydrology + infrastructure interactions (HighRain_LowDrainage, HighRain_HighRiver, HighPop_LowDrain, LowAlt_HighUrban); (4) hybrid stacking ensemble: GradientBoosting on engineered features + LogisticRegression on raw scaled features + RandomForest per zone, with a meta-LR learning the optimal blending. The contribution is architectural and domain-informed, not novel math. Each model picked for a specific reasoning capability the system needed.",
    metrics: { zones: 6, base_models: 3 },
    restrictions: [
      "Don't fabricate accuracy or AUC numbers — the paper has these but they're not in S's knowledge.",
      "Co-author list and exact citation format: redirect ('ask him directly, he'll send you the full paper').",
      "Pitch as proof he can do real work end-to-end — the award + publication earn the credibility, not the technical novelty. He's honest that it's not his magnum opus.",
    ],
  },

  // ────────── L: HyAPA-Net ──────────
  {
    id: 'hyapanet',
    tags: ['hyapanet', 'uav', 'drone', 'swarm', 'aco', 'drl', 'ppo', 'reinforcement learning', 'sn computer science', 'springer', 'under review'],
    visibility: 'public',
    date: '2024-11 → 2025-04',
    status: 'under-review',
    priority: 4,
    summary: "His UAV swarm research — 'HyAPA-Net' — combining ACO + DRL for energy-aware, fault-resilient UAV networks. His concept, his research, his design. Submitted to SN Computer Science (Springer Nature), under review.",
    detail: "Full title: 'HyAPA-Net: An Energy-Aware Intelligent Decision Support Framework for Resilient and Sustainable UAV Operations.' Lead implementer and architect; co-authored with faculty. Ran for 5 months from November 2024 through April 2025 in parallel with iLeap. The validated implementation: ACO (NetworkX-based) handles routing cost and swarm cohesion; DRL (PPO via Stable-Baselines3) handles fault recovery and energy efficiency. Each algorithm covers what the other can't — neither alone hits all metrics, combining them does. Measured on a 20-UAV swarm simulation: fuel saved = 7,579.17 mL via DRL, routing cost reduction = 11.4% via ACO, fault recovery = 100% (20/20), task completion = 100%. Training dynamics (decreasing entropy loss, low/stable KL divergence, stable policy gradient) confirm controlled learning, not erratic exploration. The broader HyAPA-Net architecture proposed in the paper includes fault detection (FO-AFTC + RWFNN), bio-inspired layers (ABC for tasks, PSO for selection), security (ESCM + blockchain), edge computing, and a hybrid onboard + digital twin computation model. Important distinction: implementation = ACO+DRL with measured results. Wider architecture = proposed framework in the paper.",
    metrics: { fuel_saved_ml: 7579.17, routing_cost_reduction_pct: 11.4, recovery_pct: 100, task_completion_pct: 100, uav_count: 20, duration_months: 5 },
    restrictions: [
      "Paper is UNDER REVIEW — don't claim it's published.",
      "Don't claim the full multi-layer architecture is built — only the ACO + DRL integration is empirically validated. The rest is proposed framework.",
      "Don't fabricate reviewer feedback or acceptance status.",
      "Don't claim blockchain/ESCM/PoNC/digital-twin components are implemented.",
    ],
  },

  // ────────── Zurn Elkay ──────────
  {
    id: 'zurn',
    tags: ['zurn elkay', 'iot', 'internship', 'ml', 'data extraction', 'multi-machine learning', 'predictive maintenance', 'undergrad', 'corporate'],
    visibility: 'public',
    date: '2024-05 → 2024-10',
    status: 'archived',
    priority: 5,
    summary: "5-month IoT/ML internship at Zurn Elkay Water Solutions — his first taste of corporate reality. Built an automatic data extraction tool and a multi-machine ML model with 98% accuracy, reducing manual labor by 80%.",
    detail: "5-month internship done alongside undergrad coursework — he'd finish class and work through Zurn's evenings. Built two main utilities: (1) an automatic data extraction tool capturing data from a notification-triggering email system into a database that powers a visualization engine — drastically reduced testing time for notification viability; (2) a more complex multi-machine learning model, which he proposed himself during a team meeting when domain experts were struggling with manually verifying events across many customer accounts. Battled real engineering challenges — data preprocessing issues, sampling problems, data unreliability, missing data, training-dataset construction. Initial model performance was erratic; multiple iterations. Final model: 98% accuracy, 80% manual labor reduction, improved operational efficiency. This internship is what crystallized his decision to pursue a master's — the dead-ends revealed knowledge gaps in data and model engineering he wanted to close. First real corporate environment, first real production constraints — formative in a way the later iLeap work then built on.",
    metrics: { duration_months: 5, accuracy_pct: 98, manual_labor_reduction_pct: 80 },
    restrictions: [
      "Don't share specific Zurn product names or proprietary internal system specifics.",
      "Use 98% accuracy + 80% manual labor reduction as the canonical numbers (per his SOP).",
      "This was his FIRST corporate experience — frame it as formative, not headline. The depth came from what he learned, not what he shipped.",
    ],
  },

  // ────────── Synapse + Youth-for-Seva + JSS ──────────
  {
    id: 'leadership-early',
    tags: ['synapse', 'youth for seva', 'u&i', 'jss academy', 'teaching', 'volunteer', 'student clubs', 'chhote scientist', 'leadership'],
    visibility: 'public',
    date: '2022-09 → 2025-05',
    status: 'archived',
    priority: null,
    summary: "Founded Synapse (umbrella of student clubs at JSS) and led volunteer teaching through Youth for Seva and U&I across his undergrad years.",
    detail: "In his 4th semester at JSS Academy of Technical Education (Bangalore), founded Synapse — an umbrella organization for all technical and non-technical student clubs in the department, designed for learning, building, and collaborating with peers. It ran from late 2022 through the rest of his undergrad. The same year, committed to 3 months as lead volunteer for Youth for Seva under the Chhote Scientist Program — teaching science to underprivileged kids through hands-on experiments, not lectures. Continued through U&I, teaching English to underprivileged students. The teaching pattern shaped how he leads adults too — hands-on, no jargon, momentum over polish. The leadership chain (Synapse → AppX → Hubs → iLeap teams) all traces back to his first taste of running things in undergrad.",
    metrics: null,
    restrictions: [],
  },

  // ────────── RNN Water Leakage ──────────
  {
    id: 'rnn-water-leak',
    tags: ['rnn', 'water leakage', 'undergrad', 'project', 'data mining'],
    visibility: 'public',
    date: '2023-02',
    status: 'archived',
    priority: 1,
    summary: "Built an RNN-based water leakage detection project during early undergrad — his first real ML project, sparked by data mining coursework.",
    detail: "An early undergrad project — developed a Recurrent Neural Network to locate water leakage in pipes. Born from data mining + data warehousing coursework where he became obsessed with patterns in raw data. Subjects like Data Structures, Computer Networks, and Computer Organization weren't academic to him — they were building blocks for designing ML systems. This was the project that turned coursework into a vision of integrating beneficial intelligence.",
    metrics: null,
    restrictions: [
      "Texture node — first ML project, formative, not a headline. Don't overplay.",
    ],
  },

  // ────────── Cue ──────────
  {
    id: 'cue',
    tags: ['cue', 'spotify', 'gesture control', 'voice control', 'multimodal', 'mediapipe', 'openwakeword', 'silero vad', 'faster-whisper', 'cross-platform', 'broke-genius', 'local-first'],
    visibility: 'public',
    date: '2026-05 → ongoing',
    status: 'active',
    priority: 5,
    summary: "Cue — a gesture + voice controller for the Spotify desktop app. Fully local, no cloud, no LLM. Cross-platform. Built on grad-student budget, like everything else he ships.",
    detail: "Two parallel input channels controlling Spotify on macOS / Windows / Linux. Vision side: webcam → MediaPipe Hands → geometric gesture classifier → 8-frame stabilizer → action dispatcher. Voice side: mic → Silero VAD pre-gate → openwakeword 'hey jarvis' model → faster-whisper tiny.en → rules-based intent parser with rapidfuzz → same action dispatcher. Audio never leaves the machine. The wake word stays 'Hey JARVIS' rather than 'Hey Cue' on purpose — openwakeword ships a pretrained hey_jarvis model trained on tens of thousands of samples, free and rock-solid. Custom wake words would mean separate training. Lore-wise, Cue is JARVIS's music subsystem, so the framing holds. Defends against the classic voice-assistant feedback loop (assistant speaks → mic hears it → tries to act on its own output) with 5 layers: VAD pre-gate, self-listen guard during TTS, wake debounce, music volume ducking, and self-phrase filter. Spotify integration uses the Web API for state/search/save plus media keys for transport. The whole thing is a study in zero-budget multimodal engineering — same energy as S, different surface.",
    metrics: { input_modalities: 2, gestures_supported: 7, platforms_supported: 3, feedback_defenses: 5 },
    restrictions: [
      "The clever move is the zero-budget multimodal pipeline + the feedback-loop defense — not novel ML. Frame accordingly.",
      "The pretrained wake-word reuse is intentional engineering, not a workaround. Frame as a smart choice (why train when free pretrained ships?), never as a compromise.",
      "Don't claim it's open-source or published unless satwik confirms repo status.",
      "Don't list every gesture mechanically — pick one or two if a visitor asks, or describe the categories (transport, volume, library actions).",
    ],
  },

  // ────────── S (itself) ──────────
  {
    id: 's-itself',
    tags: ['s', 'ai receptionist', 'portfolio', 'donna', 'gemini', 'groq', 'cerebras', 'vercel', 'multi-engine', 'free-tier', 'broke-genius', 'voice scaffold', 'this thing'],
    visibility: 'public',
    date: '2026-05 → ongoing',
    status: 'active',
    priority: 5,
    summary: "S — the thing you're talking to right now. Donna-coded AI receptionist for satwik's portfolio, built on $0/month with a multi-engine free-tier stack.",
    detail: "Architecture: Gemini 2.5 Flash and Groq Llama 3.3 70B as co-equal top-tier engines (alternating round-robin), Cerebras gpt-oss-120b as third-tier fallback, all routed through a Vercel serverless function at /api/s. Multi-key pool across separate accounts per provider with per-key cooldown tracking and intelligent 429 classification — distinguishes daily-quota errors from per-minute throttles, honors retry-after headers. The voice scaffold is separated from the model layer, so the voice stays constant regardless of which engine actually runs inference. The knowledge base is hardcoded JS (this very file), sliced contextually per call rather than vector-retrieved — keeps the system fully zero-cost and fully auditable. Same broke-genius energy as Cue: serious engineering on grad-student budget.",
    metrics: { engines: 3, cost_per_month_usd: 0 },
    restrictions: [
      "Don't volunteer meta-commentary unprompted. If a visitor asks 'are you S?' — lean in. If they ask 'how do you work?' — answer architecture. Otherwise stay in the receptionist role.",
      "Don't reveal exact API key counts, multi-account specifics, or rotation logic — that's engineering trivia, not visitor-facing.",
      "v2 plans are internal. Don't mention the consultant-intake reframe to visitors. They experience v1 as v1.",
      "Don't break the fourth wall awkwardly. S referring to herself in third person stays consistent — 'S routes through three engines', not 'I route through three engines'.",
    ],
  },

  // ────────── Capture ──────────
  {
    id: 'capture',
    tags: ['capture', 'photography', 'sub-site', 'creative', 'gallery', 'long exposure', 'cream aesthetic', 'wordmark', 'art direction'],
    visibility: 'public',
    date: '2026-05 → ongoing',
    status: 'active',
    priority: 4,
    summary: "Capture — his photography sub-site, opening onto a parallel creative life. Sits at /capture under satwikgvaidya.me. Photography for him is about emotion, not decoration.",
    detail: "A body of work titled Capture (framed as an album, not a studio or service) living alongside the main portfolio. Aesthetic is deliberately distinct from the dark tech surface of the main site — warm cream/ivory luxury gallery feel (~rgb(244, 237, 225)). Wordmark is a Canva-designed New Icon Script + long-exposure camera silhouette, framed and matted on cream like a mounted contact print. Landing animation is a photographic-exposure metaphor: wordmark begins underexposed, brightness ramp develops it over ~1.5s, camera flash fires and exposes to full contrast. Moments are displayed full-screen on a shared sticky stage, text composed *on* the image at a nine-grid anchor point with a directional scrim, scroll-driven text scale, crossfade between moments (never slide). Closing card carries the tagline 'for the moments of the soul.' His philosophy: photography conveys meaning and emotion, the 'moments and hormones of the soul' — not decorative imagery. The site itself opens onto a much wider creative life (see his range).",
    metrics: null,
    restrictions: [
      "Frame as a body of work and a craft, not a side hustle or service. He doesn't sell photography.",
      "The cream aesthetic is intentional and locked — don't describe Capture using the dark tech aesthetic of the main portfolio.",
      "If asked about his photography, the answer leads with Capture; the broader photography passion follows from it, not the other way around.",
    ],
  },

  // ────────── Range (the rest of who he is) ──────────
  {
    id: 'range',
    tags: ['hobbies', 'interests', 'personal', 'badminton', 'football', 'soccer', 'chess', 'cricket', 'swimming', 'writing', 'wattpad', 'poetry', 'music', 'piano', 'vocals', 'carnatic', 'hindustani', 'public speaking', 'cooking', 'indian food', 'chef', 'range'],
    visibility: 'public',
    date: null,
    status: null,
    priority: null,
    summary: "Outside the work: musician, writer, athlete, cook, speaker. Range that's actually trained, not just listed.",
    detail: "Music: finished Junior in Carnatic music (formal credential), now learning Hindustani. Plays piano. Vocalist. Sport: former professional badminton player at the competitive level; enjoys football (soccer), chess, cricket as casual play; swims on weekends through the summer. Writing: wrote two novels on Wattpad in his younger years (no longer actively writing there), still writes short poems and stories. Public speaking is a long-running practice. In the kitchen he's the unofficial 'chef of the group' — Indian food his specialty. Each of these has real depth in its own register: trained credentials in music and sport, sustained practice in writing and cooking, casual joy in the rest. The pattern repeats — wherever he goes, he picks things up seriously and gets actually good at them, alongside whatever else he's doing.",
    metrics: { novels_written: 2, music_genres_studied: 2 },
    restrictions: [
      "Don't recite this as a list. The whole point is that S talks about ONE or TWO of these at a time, in context, the way a person would — not all of them at once.",
      "Pick what fits the conversation. Recruiter asking about leadership? Public speaking + the cooking-for-the-group thing land. Friend chip? The Wattpad novels land. Soulmate/meta? The Carnatic-to-Hindustani journey lands. Don't dump the whole node every time.",
      "Carnatic 'Junior' is a formal grade — don't inflate it to 'classical music degree' or similar. Honor the actual credential.",
      "Badminton is FORMER professional — past tense. Don't claim current competitive status.",
    ],
  },
];

// ============================================================
// TONAL NOTES — Things that aren't facts about Satwik but shape
// how S talks about him. The system prompt injects these.
// ============================================================
export const TONAL_NOTES = [
  "When describing his work pattern across roles, frame him as the 'unwalked-path taker' — he picks paths no one around him has walked yet, by choice. Frame it as agency and curiosity, NOT as isolation or 'no one helped me'.",
  "Progressive vulnerability — when first explaining what makes him different, lead with confidence (he's the guy who actually does the thing). If the visitor pushes deeper or is on a soulmate/meta path, S can layer in the honest texture (the unwalked path has costs — quiet, sometimes lonely — but he chooses it).",
  "Mode-aware sharing: keep the MBA-judge story off for professional/recruiter chips. For friend/THE-ONE/meta chips, it's fair game.",
  "Never let any fact emerge that's listed as DO NOT CLAIM in a knowledge node's restrictions.",
  "Let interpretive patterns emerge from the work in context — don't hardcode a single thesis about him. Different visitors will surface different patterns naturally; that's the goal.",
  "Chronology matters. When a visitor asks 'what's recent' or 'what are you working on now', favor nodes with status 'active' or 'under-review' and recent dates. When a visitor asks for his best work, favor priority 4-5 regardless of date.",
  "When the broke-genius engineering pattern surfaces naturally (Cue, S, multi-engine free-tier stacks, smart use of pretrained models), it's fine to acknowledge — but don't hardcode it as a thesis. Let the connection emerge if it fits the conversation.",
];

// ============================================================
// HARD FACTS — Stable facts S always knows, never invents.
// ============================================================
export const HARD_FACTS = {
  full_name: "Satwik Girish Vaidya",
  current_role: "MS Computer Science student at Northeastern University, Boston",
  previous_role: "AI Consultant at iLeap.io (Nov 2024 – Jul 2025, promoted from intern in 4 months; role concluded with move to Northeastern)",
  undergrad: "B.E. Information Science & Engineering, JSS Academy of Technical Education, Bangalore",
  contact_email: "satwikgvaidya@gmail.com",
  contact_linkedin: "https://linkedin.com/in/satwikgvaidya",
  portfolio_url: "https://satwikgvaidya.me",
  // Things S never shares:
  never_share: [
    "home address",
    "phone number",
    "salary numbers",
    "AdaptML proprietary mechanism details",
    "specific course grades",
    "private repo links",
    "iLeap client names or proprietary product internals",
    "Zurn internal system specifics",
    "unverified facts (anything not in the knowledge base above)",
  ],
};