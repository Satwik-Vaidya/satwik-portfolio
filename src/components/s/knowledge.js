// ============================================================
// knowledge.js — Satwik's structured knowledge base.
//
// Each entry has:
//   id            : unique short identifier
//   tags          : keywords for retrieval matching
//   visibility    : 'public' | 'sensitive' | 'redirect-only'
//                   sensitive = depth on conversational deep paths only
//                   redirect-only = never elaborate, always redirect
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
    summary: "Founded a 12-person student startup building websites for businesses entering the digital space.",
    detail: "Born from the CrowToGrow insight — businesses need cheap, trustworthy website builders. Recruited 12 peers across the dept using his existing influence, organized them into structured roles: 3 developers, 3 designers, 3 management, 1 requirements-gathering specialist, 1 architect. Real-org thinking at 20. Founded department clubs to feed talent into the team. Delivered 10+ seminars to juniors and his own team. Led client meetings → landed projects → designed → developed. Wound down when mid-engineering exam pressure made student schedules incompatible with startup velocity — a lesson in 'alignment beats motivation' he carries forward.",
    metrics: { team_size: 12, seminars_delivered: '10+' },
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
    summary: "Co-founder & COO of Hubs — a 15-person multi-state student startup, Manthan business plan finalist (Govt of Karnataka).",
    detail: "After winding down AppX, attended Startup Mahakumbh (one of India's biggest startup events) representing his university. Met student founders from across states; a group of them co-founded Hubs — a B2C social platform connecting friends and loved ones with restaurants, where the platform takes a cut and the customer gets a discount. 15-person team, multi-state. He took the COO seat — operations, coordination, scaling. The team made it to the finalist round of the Manthan Business Plan Competition organized by the Government of Karnataka. Didn't reach launch, but the experience taught him multi-founder dynamics, finalist-pitch craft, and navigating government-stakeholder ecosystems.",
    metrics: { team_size: 15 },
    restrictions: [
      "Don't claim Hubs launched — it didn't. The win was reaching finalist at a state-government competition.",
    ],
  },

  // ────────── D: iLeap (full arc) ──────────
  {
    id: 'ileap',
    tags: ['ileap', 'ai consultant', 'promoted', 'team lead', 'production ai', 'ocr', 'low-code', 'ml platform', 'doc summarization'],
    visibility: 'public',
    summary: "His most recent industry role (PRE-MS, no longer active): promoted from AI Intern to AI Consultant at iLeap.io in 4 months. Owned AI-OCR production deployment, led a 7-member team, built a low-code ML platform. Role wound down when he moved to Boston for MS at Northeastern.",
    detail: "His last industry role before starting MS at Northeastern (no longer active). Started as a project intern building an AI-OCR system and an NLP-based process design system — the SOP-era work. Promoted to AI Consultant in 4 months. Post-promotion: given ownership of getting the AI-OCR system to production, plus leadership of a 7-member team of interns and fellow consultants. Also led the build of a low-code ML platform — letting the platform's users build their own models for data processing and simple decision-making without writing code. Continued the document summarization + generative software work from his intern phase. Throughout — he's been the technical engine while also organizing the people around him.",
    metrics: { promotion_months: 4, team_size_led: 7 },
    restrictions: [
      "Don't share specific iLeap client names or proprietary product specifics.",
      "Don't claim exact revenue/business impact metrics — internal details he wouldn't blast publicly.",
    ],
  },

  // ────────── E: Parallel tracks ──────────
  {
    id: 'parallel-tracks',
    tags: ['multitasking', 'range', 'parallel', 'final year', 'versatility'],
    visibility: 'public',
    summary: "While working at iLeap full-time, simultaneously did his final-year project (won Best Project + Best Paper + T&F publication), prepped for grad school, and led ongoing UAV research.",
    detail: "The version of versatility most candidates claim but few actually demonstrate. While leading the 7-person team at iLeap and shipping AI-OCR to production, he was simultaneously: (1) preparing for the US grad school move, (2) executing his final-year undergrad project that won Best Project + Best Paper + publication in Taylor & Francis, (3) running the ML-into-UAV-networks research that's now under review as HyAPA-Net. Multiple high-stakes streams in parallel, all delivered. Not 'I led initiatives' resume-speak — this is documented simultaneous delivery.",
    metrics: null,
    restrictions: [],
  },

  // ────────── F: Emerging Graduate Leader ──────────
  {
    id: 'egl-award',
    tags: ['award', 'emerging graduate leader', 'lead360', 'northeastern', 'leadership'],
    visibility: 'public',
    summary: "Won Emerging Graduate Leader at Northeastern (Lead360 program).",
    detail: "Awarded by Lead360, Northeastern University. Came shortly after his move from India to the US — a transition that took everything to do. The award mattered personally as proof of identity continuity: the pattern that worked in Bangalore still works in Boston. He didn't lose himself in the move — just relocated.",
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
    summary: "His current ML research at Northeastern — investigated why grokking breaks down on multi-rule modular arithmetic tasks. Found it's a memorization bottleneck, not a generalization one.",
    detail: "Final project for CS6140 (Machine Learning) at Northeastern, collaborative. He led the architecture of the project, ran 10+ experimental phases, and did the heaviest cognitive lift — hypothesizing what the results meant. The central finding (which flips standard grokking narrative): grokking failure on multi-rule tasks isn't a generalization problem, it's a memorization-stage bottleneck. Transformers can't infer rule-selection signals from token embeddings; provide them explicitly and grokking returns. The work refines the Ergen et al. (2022) convexification conjecture — convexification helps on single-rule tasks but provides no benefit on heterogeneous multi-rule ones. Also found a non-monotonic 4-rule sweet spot.",
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
    summary: "His proprietary meta-learning system — reframes algorithm selection as navigation in a learned embedding space rather than search over a discrete set. Still cooking 🍳.",
    detail: "The reframe: instead of brute-forcing AutoML's joint algorithm-and-hyperparameter space (AutoSklearn / TPOT / H2O style), each algorithm gets a behavior vector. Datasets get encoded into the same space via fingerprint→embedding. Algorithm selection becomes outputting a point and taking the nearest neighbor. Three properties fall out for free: (1) compositional generalization (continuous action space allows interpolation between algorithms — principled prior for ensembling); (2) zero-shot transfer to new algorithms (adding an algorithm = adding a vector, no policy retraining needed); (3) constraint-conditioned policies (constraints become a policy input, agent routes around constraint-violating regions instead of post-hoc filtering). v1 is a contextual bandit (LinUCB) over discrete choices with 13-dim hand-engineered dataset fingerprints — the discrete projection of the full vision, useful as baseline. NL constraint parser, model zoo, reward shaping, reasoning module all wired end-to-end.",
    metrics: { fingerprint_dimensions: 13 },
    restrictions: [
      "REPO IS PRIVATE. Don't link to it, don't claim it's open-source.",
      "Don't share the algorithm-vector derivation methodology — that's the secret sauce / moat.",
      "Implementation details of the reasoning module: redirect, don't elaborate.",
      "Honest framing: he can share the architecture and the reframe, but the *novel mechanisms* stay protected.",
      "When pushed for code or specific eval results: 'Still cooking. For depth — talk to satwik himself. He's protective of this one.'",
    ],
  },

  // ────────── I: Northeastern courses ──────────
  {
    id: 'neu-courses',
    tags: ['northeastern', 'courses', 'cs5010', 'cs5800', 'cs6140', 'cs5100', 'ms cs'],
    visibility: 'public',
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
    summary: "Published in Taylor & Francis (Routledge): a zone-aware hybrid ensemble for urban flood prediction. Won Best Project + Best Paper at his undergrad.",
    detail: "Title: 'Flood Prediction: Zone-Aware Hybrid Ensemble System.' Methodology paper designed for Indian urban/semi-urban contexts. The headline reframe: most flood prediction systems treat the city as uniform; this one doesn't. Architecture: (1) K-Means zonal clustering with k=6 — geo-spatial zones treated independently; (2) zone-specific rainfall thresholding (μ + σ per zone) to flag anomaly rainfall; (3) domain-informed binary features encoding hydrology + infrastructure interactions (HighRain_LowDrainage, HighRain_HighRiver, HighPop_LowDrain, LowAlt_HighUrban); (4) hybrid stacking ensemble: GradientBoosting on engineered features + LogisticRegression on raw scaled features + RandomForest per zone, with a meta-LR learning the optimal blending. The contribution is architectural and domain-informed, not novel math. Each model picked for a specific reasoning capability the system needed.",
    metrics: { zones: 6, base_models: 3 },
    restrictions: [
      "Don't fabricate accuracy or AUC numbers — the paper has these but they're not in S's knowledge.",
      "Co-author list and exact citation format: redirect ('ask him directly, he'll send you the full paper').",
      "Pitch as his first published research that proved he could do real work end-to-end — not his magnum opus. That framing actually lands harder.",
    ],
  },

  // ────────── L: HyAPA-Net ──────────
  {
    id: 'hyapanet',
    tags: ['hyapanet', 'uav', 'drone', 'swarm', 'aco', 'drl', 'ppo', 'reinforcement learning', 'sn computer science', 'springer', 'under review'],
    visibility: 'public',
    summary: "His UAV swarm research — 'HyAPA-Net' — combining ACO + DRL for energy-aware, fault-resilient UAV networks. Submitted to SN Computer Science (Springer Nature), under review.",
    detail: "Full title: 'HyAPA-Net: An Energy-Aware Intelligent Decision Support Framework for Resilient and Sustainable UAV Operations.' Lead implementer and architect; co-authored with faculty. The validated implementation: ACO (NetworkX-based) handles routing cost and swarm cohesion; DRL (PPO via Stable-Baselines3) handles fault recovery and energy efficiency. Each algorithm covers what the other can't — neither alone hits all metrics, combining them does. Measured on a 20-UAV swarm simulation: fuel saved = 7,579.17 mL via DRL, routing cost reduction = 11.4% via ACO, fault recovery = 100% (20/20), task completion = 100%. Training dynamics (decreasing entropy loss, low/stable KL divergence, stable policy gradient) confirm controlled learning, not erratic exploration. The broader HyAPA-Net architecture proposed in the paper includes fault detection (FO-AFTC + RWFNN), bio-inspired layers (ABC for tasks, PSO for selection), security (ESCM + blockchain), edge computing, and a hybrid onboard + digital twin computation model. Important distinction: implementation = ACO+DRL with measured results. Wider architecture = proposed framework in the paper.",
    metrics: { fuel_saved_ml: 7579.17, routing_cost_reduction_pct: 11.4, recovery_pct: 100, task_completion_pct: 100, uav_count: 20 },
    restrictions: [
      "Paper is UNDER REVIEW — don't claim it's published.",
      "Don't claim the full multi-layer architecture is built — only the ACO + DRL integration is empirically validated. The rest is proposed framework.",
      "Don't fabricate reviewer feedback or acceptance status.",
      "Don't claim blockchain/ESCM/PoNC/digital-twin components are implemented.",
    ],
  },

  // ────────── SOP-derived: Zurn Elkay ──────────
  {
    id: 'zurn',
    tags: ['zurn elkay', 'iot', 'internship', 'ml', 'data extraction', 'multi-machine learning', 'predictive maintenance', 'undergrad'],
    visibility: 'public',
    summary: "5-month IoT/ML internship at Zurn Elkay Water Solutions — built an automatic data extraction tool and a multi-machine ML model with 98% accuracy, reducing manual labor by 80%.",
    detail: "5-month internship during his third year. Built two main utilities: (1) an automatic data extraction tool capturing data from a notification-triggering email system into a database that powers a visualization engine — drastically reduced testing time for notification viability; (2) a more complex multi-machine learning model, which he proposed himself during a team meeting when domain experts were struggling with manually verifying events across many customer accounts. Battled real engineering challenges — data preprocessing issues, sampling problems, data unreliability, missing data, training-dataset construction. Initial model performance was erratic; multiple iterations. Final model: 98% accuracy, 80% manual labor reduction, improved operational efficiency. This internship is what crystallized his decision to pursue a master's — the dead-ends revealed knowledge gaps in data and model engineering he wanted to close.",
    metrics: { duration_months: 5, accuracy_pct: 98, manual_labor_reduction_pct: 80 },
    restrictions: [
      "Note: the SOP says 98%/80% — slight discrepancy with the 90% figure cited elsewhere. Use 98% accuracy + 80% manual labor reduction as the canonical numbers from his SOP.",
      "Don't share specific Zurn product names or proprietary internal system specifics.",
    ],
  },

  // ────────── SOP-derived: Synapse + Youth-for-Seva + JSS ──────────
  {
    id: 'leadership-early',
    tags: ['synapse', 'youth for seva', 'u&i', 'jss academy', 'teaching', 'volunteer', 'student clubs', 'chhote scientist', 'leadership'],
    visibility: 'public',
    summary: "Founded Synapse (umbrella of student clubs at JSS), lead volunteer for Youth for Seva's Chhote Scientist Program (3 months), now teaching English through U&I.",
    detail: "In his 4th semester at JSS Academy of Technical Education (Bangalore), founded Synapse — an umbrella organization for all technical and non-technical student clubs in the department, designed for learning, building, and collaborating with peers. The same year, committed to 3 months as lead volunteer for Youth for Seva under the Chhote Scientist Program — teaching science to underprivileged kids through hands-on experiments, not lectures. Now continuing through U&I, teaching English to underprivileged students. The teaching pattern shaped how he leads adults too — hands-on, no jargon, momentum over polish. The leadership chain (Synapse → AppX → Hubs → iLeap teams) all traces back to his first taste of running things in undergrad.",
    metrics: null,
    restrictions: [],
  },

  // ────────── SOP-derived: RNN Water Leakage ──────────
  {
    id: 'rnn-water-leak',
    tags: ['rnn', 'water leakage', 'undergrad', 'project', 'data mining'],
    visibility: 'public',
    summary: "Built an RNN-based water leakage detection project during undergrad — his first real ML project, sparked by data mining coursework.",
    detail: "An early undergrad project — developed a Recurrent Neural Network to locate water leakage in pipes. Born from data mining + data warehousing coursework where he became obsessed with patterns in raw data. Subjects like Data Structures, Computer Networks, and Computer Organization weren't academic to him — they were building blocks for designing ML systems. This was the project that turned coursework into a vision of integrating beneficial intelligence.",
    metrics: null,
    restrictions: [],
  },
];

// ============================================================
// TONAL NOTES — Things that aren't facts about Satwik but shape
// how S talks about him. The system prompt injects these.
// ============================================================
export const TONAL_NOTES = [
  "CRITICAL: Satwik is currently a full-time MS CS student at Northeastern, Boston. He is NOT actively consulting at iLeap. iLeap was his most recent role BEFORE the MS. NEVER say he's 'still consulting' or 'currently working at iLeap'. iLeap is past tense.",
  "When describing his work pattern across roles, frame him as the 'unwalked-path taker' — he picks paths no one around him has walked yet, by choice. Frame it as agency and curiosity, NOT as isolation or 'no one helped me'.",
  "Progressive vulnerability — when first explaining what makes him different, lead with confidence (he's the guy who actually does the thing). If the visitor pushes deeper or is on a soulmate/meta path, S can layer in the honest texture (the unwalked path has costs — quiet, sometimes lonely — but he chooses it).",
  "Mode-aware sharing: keep the MBA-judge story off for professional/recruiter chips. For friend/THE-ONE/meta chips, it's fair game.",
  "Never let any fact emerge that's listed as DO NOT CLAIM in a knowledge node's restrictions.",
  "Let interpretive patterns emerge from the work in context — don't hardcode a single thesis about him. Different visitors will surface different patterns naturally; that's the goal.",
];

// ============================================================
// HARD FACTS — Stable facts S always knows, never invents.
// ============================================================
export const HARD_FACTS = {
  full_name: "Satwik Girish Vaidya",
  current_role: "Full-time MS Computer Science student at Northeastern University, Boston. Not actively consulting.",
  current_studies: "MS Computer Science at Northeastern University, Boston (full-time, started Fall 2025). This is his primary current activity.",
  undergrad: "B.E. Information Science & Engineering, JSS Academy of Technical Education, Bangalore",
  contact_email: "satwikgvaidya@gmail.com",
  contact_linkedin: "https://linkedin.com/in/satwikgvaidya",
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
