// Post-build SEO/GEO: server-render every SPA route and write a real
// index.html per URL so crawlers that do not execute JavaScript (GPTBot,
// ClaudeBot, PerplexityBot, Bingbot first pass) see the complete page —
// full article content, unique meta, canonical, and JSON-LD. React
// re-renders over the static markup on load; UX unchanged.
//
// Also generates llms-full.txt (plain-text of all posts) for LLM ingestion.
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { createServer } from 'vite'

const SITE = 'https://aiengineerinsights.com'
const SITE_NAME = 'AI Engineer Insights'
const OG_IMAGE = `${SITE}/og-image.png`

const AUTHORS = {
  poorna: {
    '@type': 'Person',
    name: 'Poorna Prudhvi Gurram',
    url: `${SITE}/authors`,
  },
  vishnu: {
    '@type': 'Person',
    name: 'Vishnu Vardhan Sai Lanka',
    url: `${SITE}/authors`,
  },
  team: { '@type': 'Organization', name: SITE_NAME, url: SITE },
}

const pages = [
  {
    path: '/',
    title: 'AIEngineerInsights.com - Your Companion on the AI Engineering Journey',
    seoTitle: 'AI Engineer Insights — Practical AI Engineering Guides',
    description:
      'Practical roadmaps, real-world projects, and deep-dive articles for engineers building with LLMs, AI agents, and production machine learning.',
  },
  {
    path: '/blogs',
    title: 'Blog | AI Engineer Insights',
    description:
      'In-depth AI engineering articles for practitioners: open-source LLMs, AI agents, RAG, MLOps, LLM deployment, agentic security, and production data pipelines.',
  },
  {
    path: '/resources',
    title: 'Resources | AI Engineer Insights',
    description:
      'Curated AI engineering resources: roadmaps, courses, tools, and references across LLMs, AI agents, RAG, and MLOps — hand-picked for aspiring and practicing engineers.',
  },
  {
    path: '/projects',
    title: 'Projects | AI Engineer Insights',
    description:
      'Real-world AI engineering projects and walkthroughs — from LLM apps and agents to MLOps pipelines — with the tools and patterns behind each build.',
  },
  {
    path: '/authors',
    title: 'Authors | AI Engineer Insights',
    description:
      'Meet the engineers behind AI Engineer Insights — practitioners writing about LLMs, AI agents, agentic security, and production machine learning.',
  },
  {
    path: '/ai-engineering-roadmap',
    title: 'AI Engineering Roadmap 2026: How to Become an AI Engineer (Free PDF)',
    seoTitle: 'AI Engineer Roadmap 2026: How to Become One (Free PDF)',
    description:
      'How to become an AI engineer in 2026 — a step-by-step roadmap from Python and math to ML, MLOps, and LLMs/agents. Six phases, curated resources, and a free PDF.',
  },
  {
    path: '/newsletter',
    title: "The AI Engineer's Brief — Weekly AI Engineering Newsletter",
    seoTitle: "The AI Engineer's Brief — AI Engineering Newsletter",
    description:
      "Join The AI Engineer's Brief: a 5-minute weekly newsletter for people building and breaking into AI engineering — agents, LLMs, the tools worth using, and honest career notes, plus the free AI Engineering Roadmap PDF.",
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | AI Engineer Insights',
    description:
      'How AI Engineer Insights collects, uses, and protects your data, including cookies, analytics, advertising, and your privacy rights.',
  },
  {
    // Double opt-in confirmation landing (beehiiv redirects here). Thank-you
    // page — noindex and kept out of the sitemap so it never ranks.
    path: '/subscribed',
    title: "You're subscribed | The AI Engineer's Brief",
    description:
      "Subscription confirmed. Download your free AI Engineering Roadmap PDF and see what to expect from The AI Engineer's Brief.",
    noindex: true,
  },
]

const posts = [
  {
    path: '/blog/agent-runtimes-explained',
    title: 'AI Agent Runtimes Explained: The Production Layer Every Agent Framework Is Missing (2026)',
    seoTitle: 'AI Agent Runtimes Explained (2026)',
    description:
      'An agent runtime is the infrastructure that keeps an agent reliable in production: durable state, sandboxed tools, retries, observability, and approval gates. The landscape, how to ship one, use cases, best repos, and a suggested stack.',
    date: '2026-09-25',
    author: 'poorna',
    image: '/og-agent-runtimes-explained.png',
    faqs: [
      { q: 'What is an AI agent runtime?', a: "An agent runtime is the infrastructure layer that actually executes an agent in production: a scheduler that runs and resumes steps, a durable state store that checkpoints progress so a task survives a crash or restart, an isolated sandbox for running tools/code, observability for tracing and cost, and guardrails for approvals. It's distinct from an agent framework or SDK, which mostly defines how you write the agent's logic — the runtime is what keeps that logic running reliably at scale." },
      { q: 'What is the difference between an agent framework and an agent runtime?', a: "A framework (LangChain, CrewAI's agent classes, the OpenAI/Claude Agent SDKs) gives you APIs to define an agent's reasoning loop, tools, and prompts. A runtime is what executes that definition in production: durable state across long-running tasks, retries and idempotency, concurrency and worker scaling, multi-tenant isolation, and observability. Some products bundle both (LangGraph, AWS Bedrock Agents); others are pure durable-execution substrates (Temporal, Restate) that any framework's agent loop can run on top of." },
      { q: 'Why do agents need durable execution instead of just a loop in a process?', a: "Because real agent tasks can run for minutes to days, call flaky external APIs, and need a human to approve a step hours later. A plain in-process loop dies with the process — restart the server and you lose all progress. Durable execution frameworks (Temporal, Restate, LangGraph's checkpointer) persist the agent's state after every step, so a crash, deploy, or long pause just means resuming from the last checkpoint instead of starting over." },
      { q: 'How do you sandbox tool execution for an agent?', a: "Never run model-generated code or shell commands directly on a host that has real credentials or data. Use an isolated execution environment — a microVM (E2B), a container with strict resource/network limits (Modal, Docker), or a managed code-interpreter tool (OpenAI, Bedrock, Vertex) — so a bad or adversarial tool call can't escape its sandbox, exhaust the host, or exfiltrate secrets." },
      { q: 'What should I use to trace and monitor an agent runtime in production?', a: 'Instrument every model call and tool call as a span so you can see the full execution tree, not just the final answer. LangSmith, Langfuse, and Arize Phoenix are the common purpose-built options; several now follow the OpenTelemetry GenAI semantic conventions, so you can also route agent traces into a general-purpose observability stack. Track token usage and cost per span, not just per request, since a single agent turn can trigger many nested calls.' },
      { q: "What's a good default production stack for agent runtimes in 2026?", a: 'For most teams: LangGraph for the agent graph with Postgres-backed checkpointing for durable state, E2B or Modal for sandboxed tool/code execution, Langfuse for tracing and cost observability, and a queue (SQS or Redis) in front of a worker pool for scaling. Move the durability layer to Temporal or Restate once you need cross-service sagas, very long-running workflows (days+), or strict enterprise reliability guarantees that a single framework\'s checkpointer doesn\'t give you.' },
    ],
  },
  {
    path: '/blog/jev-vs-ml-classification',
    title: 'Jev vs LLMs vs Traditional ML: The Right Way to Classify in 2026',
    seoTitle: 'Jev vs LLMs vs Traditional ML for Classification',
    description:
      "Jev vs LLMs vs traditional ML classifiers: which to use for classification, why an LLM's confidence isn't a probability, and how calibration decides it.",
    date: '2026-09-23',
    author: 'poorna',
    image: '/og-llm-vs-traditional-ml-classification.png',
    faqs: [
      { q: 'Can an LLM be used as a classifier?', a: 'Yes, and for genuine zero-shot work — no training data, brand-new or long-tail labels, low volume, or tasks that need world knowledge and reasoning about the text — it is often the right call. The mistake is treating it as a drop-in replacement for a trained classifier on a stable, high-volume task: it is slower, far more expensive per call, non-deterministic, prompt-sensitive, and the confidence number it reports is not a calibrated probability.' },
      { q: "Is an LLM's confidence score a real probability?", a: "No. When you prompt a model to 'give a confidence from 0 to 100', the number is generated text, not a measured probability. Token log-probabilities are not class probabilities either, and RLHF post-training distorts them further: OpenAI's GPT-4 Technical Report shows the pre-trained model was well-calibrated and post-training reduced that calibration. If you need a number to threshold on, you have to measure calibration (ECE, reliability diagram) rather than trust the model's self-report." },
      { q: 'What is calibration in machine learning?', a: "A classifier is calibrated when its probabilities match reality: among all the cases it calls about 90% likely, roughly 90% actually belong to that class. You measure it with Expected Calibration Error (ECE) and a reliability diagram. Traditional classifiers are calibrated after training with Platt scaling or isotonic regression (scikit-learn's CalibratedClassifierCV); modern neural networks tend to be overconfident, which Guo et al. 2017 showed temperature scaling can fix." },
      { q: 'Can Jev replace traditional ML classifiers?', a: 'Not wholesale. On a stable, high-volume, in-distribution task where you already have labeled data, a calibrated XGBoost or fine-tuned classifier still wins on cost, accuracy, reproducibility, and auditability, so there is no reason to rip out a working one. Jev genuinely wins where there is no labeled data, where the label set changes often, for long-tail categories, or when you need a good-enough calibrated decision in an afternoon instead of a labeling project. In practice it mostly replaces the LLM-as-classifier hack, not a real trained classifier.' },
      { q: 'What is the difference between Jev and an LLM for classification?', a: "An LLM generates text autoregressively and, if asked, verbalizes a confidence that is not a calibrated probability. Jev is TypeSafe AI's 'System One' model: it returns a typed decision — a Choice of up to 255 labels, a Score, or a calibrated probability — plus a confidence, in one non-autoregressive pass, with no text. It is trained with RLCD (Reinforcement Learning for Calibrated Decisions) so the confidence is meant to track accuracy, and it keeps the zero-shot flexibility of an LLM. Independent testing still found its calibration imperfect (ECE around 0.107) and its verdict movable by prompt injection." },
      { q: 'When should I use a traditional ML classifier instead of an LLM?', a: 'Whenever the task is stable, the volume is high, and you have (or can cheaply get) labeled in-distribution data: fraud scoring, spam, churn, routing between a fixed set of queues. A logistic regression, gradient-boosted tree, or small fine-tuned transformer will be cheaper, faster, deterministic, reproducible, and easier to audit — and after Platt or isotonic calibration it gives you a probability you can actually set a threshold on.' },
    ],
  },
  {
    path: '/blog/what-is-jev',
    title: "What Is Jev? TypeSafe's System One Decision Model, Explained (2026)",
    seoTitle: "What Is Jev? TypeSafe's System One Model Explained",
    description:
      'Jev is TypeSafe AI’s System One model: a typed decision plus a calibrated confidence score in one pass, not text. How it works, pricing, and limits.',
    date: '2026-09-23',
    author: 'poorna',
    image: '/og-what-is-jev.png',
    faqs: [
      { q: 'What is Jev in simple terms?', a: "Jev is an AI model from TypeSafe AI that answers with a decision instead of a paragraph. You give it an input and a set of possible answers (labels, a numeric range, or a yes/no question), and it returns one typed value plus a confidence score — for example {label: 'fraud', confidence: 0.87} — in a single pass. TypeSafe calls this category a 'System One' model, after the fast, intuitive mode of thinking, as opposed to the slow, deliberate 'System Two' style of a chat LLM." },
      { q: 'Is Jev an LLM?', a: 'Not in the usual sense. A large language model generates text autoregressively, one token at a time. Jev is non-autoregressive: it produces all of its outputs in one parallel forward pass and never emits free text. It is built to be consumed by software directly, not read by a person. Think of it as a decision model that sits next to your LLM, not a replacement for it.' },
      { q: 'Can Jev hallucinate?', a: "It cannot hallucinate the shape of an answer — you will never get malformed JSON, a label that wasn't on your list, or a string where you asked for a number. But it absolutely can return the wrong value inside a valid type: a legitimate transaction labeled 'fraud', or a confident score on a question it cannot actually answer. 'Cannot hallucinate' means structurally safe, not never wrong." },
      { q: 'How much does Jev cost?', a: 'As of September 2026, TypeSafe charges $0.042 per million input tokens, output is free, and the context window is 32,000 tokens. Early access opened on September 15, 2026 behind a waitlist, which was dropped around September 21, so API keys are now open. It is also available through Cloudflare Workers AI (model id typesafe/jev), OpenRouter, and Composio.' },
      { q: 'What is RLCD and how is Jev trained?', a: "RLCD stands for Reinforcement Learning for Calibrated Decisions. Where RLHF rewards a model for outputs that human raters approve of, RLCD rewards the model for being right and for reporting a confidence that matches how often it is right — a '90% confidence' answer should be correct about 90% of the time. TypeSafe says Jev is trained this way on synthetic data. Independent testing shows the calibration is real but imperfect, especially in the 0.3–0.8 mid-range." },
      { q: 'Who built Jev?', a: 'TypeSafe AI, a San Francisco company founded in 2024. It came out of stealth in September 2026 with a $40M seed round led by DCVC. The CEO is Diogo Almeida, a former OpenAI and Google Brain researcher who was a co-inventor of RLHF and InstructGPT and a contributor to GPT-4. His co-founders are Erik Gafni and Sasha Sheng.' },
    ],
  },
  {
    path: '/blog/jev-vs-llm',
    title: 'Jev vs LLMs: When to Use a Calibrated Decision Model (2026)',
    seoTitle: 'Jev vs LLMs: When to Use a Decision Model',
    description:
      'Jev vs LLMs: an LLM generates text and reasons; Jev returns one typed, calibrated decision. Side-by-side table, where each wins, RLCD vs RLHF, and limits.',
    date: '2026-09-23',
    author: 'poorna',
    image: '/og-jev-vs-llm.png',
    faqs: [
      { q: 'Is Jev a replacement for an LLM?', a: "No. Jev is a 'System One' model from TypeSafe AI that returns a single typed decision with a calibrated confidence — it does not generate text at all. An LLM generates and reasons in language. They do different jobs, and most production systems that adopt Jev keep an LLM for the parts that need generation or reasoning." },
      { q: 'What does Jev actually output?', a: "One of three typed results: a Choice (one of up to 255 labels), a Score (a number), or a calibrated probability — for example {label: 'fraud', confidence: 0.87}. Because the output shape is fixed, it can never be malformed or the wrong type. It can, however, still pick the wrong label inside that valid shape." },
      { q: 'Is Jev really 400× cheaper and 200× faster than an LLM?', a: "Those are TypeSafe's own claims — up to ~193.6× faster and ~444.6× cheaper on workflows the vendor selected, with a wider quoted range of 40–200× and 40–400×. One independent critique notes the 444.6× benchmark used the average of two other models' answers as the reference, so it measures agreement rather than accuracy. Verified pricing is $0.042 per million input tokens with free output tokens." },
      { q: 'How is RLCD different from RLHF?', a: 'RLHF (used to train most chat LLMs) optimizes the model toward answers human raters approve of. RLCD — Reinforcement Learning for Calibrated Decisions, used for Jev — optimizes the model’s confidence to match its real accuracy, so a 90% confidence should be right about 90% of the time. RLHF makes text people like; RLCD makes probabilities you can threshold on.' },
      { q: "Can I trust Jev's confidence score?", a: 'Partly. An independent study measured an expected calibration error of about 0.107 — roughly 4.4× a well-calibrated baseline. Confidence is most reliable near 0 and 1 and shakiest in the 0.3–0.8 band, and on unanswerable questions Jev was right only 44.7% of the time while averaging 0.74 confidence. Treat the extremes as usable signals and route the middle band to a human or an LLM.' },
      { q: 'Is Jev safe to use as a guardrail on untrusted input?', a: "Not on its own. A VentureBeat report and an Octomind demo showed prompt injection shifting Jev's block probability from 0.76 to 0.48 after a fake 'user pre-approved' field was added to the input. Jev is useful as one fast signal in a guardrail, but it should not be the sole gate for real actions on content an attacker can influence." },
    ],
  },
  {
    path: '/blog/how-to-use-jev',
    title: 'How to Use Jev: A Practical Guide + Use Cases for AI Engineers (2026)',
    seoTitle: 'How to Use Jev: Practical Guide + Use Cases',
    description:
      'How to use Jev: get access, the three typed outputs, LangChain/Pydantic/Cloudflare integrations, real use cases, a routing + guardrail pattern, and the caveat.',
    date: '2026-09-23',
    author: 'poorna',
    image: '/og-how-to-use-jev.png',
    faqs: [
      { q: 'How do I get access to Jev?', a: 'Jev entered early access on September 15, 2026 and the waitlist was dropped around September 21, 2026, so access is open. You can call it directly through the TypeSafe API with a TYPESAFE_API_KEY, or through OpenRouter, Cloudflare Workers AI (model id typesafe/jev, which does not require a TypeSafe key), or Composio. Pick whichever platform your stack already talks to.' },
      { q: 'What does Jev return instead of text?', a: "A typed decision plus a calibrated confidence. There are three output types: a Choice (one label from a set of up to 255), a Score (a number), and a calibrated probability. A typical response looks like {label: 'fraud', confidence: 0.87}. Your code branches on the label and the confidence directly, with no parsing and no 'answer only yes or no' prompt." },
      { q: 'Does Jev work with LangChain and Pydantic?', a: 'Yes. LangChain has a TypeSafeClassifier integration: you pass it state plus the questions you want decided and get typed decisions back, which LangChain uses for agent routing and tool-call risk blocking. Jev’s outputs are Pydantic-typed, and it accepts Pydantic schemas as output constraints, so the decision lands in your code already validated. Check the current TypeSafe and LangChain docs for exact signatures.' },
      { q: 'How much does Jev cost?', a: 'Verified pricing is $0.042 per million input tokens, with output free, and a 32,000-token context window. TypeSafe’s headline comparisons (up to about 193.6x faster and about 444.6x cheaper than LLM alternatives) are vendor claims on vendor-selected workflows, and the 444.6x figure uses the average of two other models as its reference answer, which measures agreement rather than accuracy.' },
      { q: 'Can Jev hallucinate?', a: "The shape cannot be wrong: you always get a valid label, score, or probability of the type you asked for. The value can still be wrong. 'Cannot hallucinate' is a claim about type safety, not about correctness, so treat Jev like any classifier: measure its accuracy on your own data before trusting it, and watch the confidence." },
      { q: "Is it safe to let Jev decide whether an agent's tool call runs?", a: "Only with guards around it. VentureBeat reported, and an Octomind engineer demonstrated, that injected text moves Jev's verdict: a 'block this command?' probability of 0.76 fell to 0.48 after a fake 'user pre-approved' field was added to the input. TypeSafe's own limitations page says adversarial content can move the answer. Use Jev as a fast first filter, never as the only thing standing between untrusted input and a destructive action." },
    ],
  },
  {
    path: '/blog/hermes-claude-code-orchestration',
    title: 'Hermes + Claude Code: Using Hermes as an Orchestrator for Autonomous Coding (2026)',
    seoTitle: 'Hermes + Claude Code: The Orchestrator Pattern',
    description:
      'Hermes + Claude Code: use Hermes as an orchestrator — it plans, schedules, and remembers while Claude Code writes the code. Modes, DeepSeek routing, and tips.',
    date: '2026-09-18',
    author: 'poorna',
    image: '/og-hermes-claude-code-orchestration.png',
    faqs: [
      { q: 'Can Hermes use Claude Code?', a: "Yes — Hermes ships an official bundled skill for it (autonomous-ai-agents/claude-code). Hermes delegates a coding task to the Claude Code CLI, which reads files, writes code, runs shell commands, and manages git autonomously, then returns the result. There are two modes: print mode (a one-shot 'claude -p' call, best for automation) and an interactive tmux/PTY session for multi-turn work." },
      { q: "What does 'Hermes as an orchestrator' mean?", a: "It means using Hermes as the persistent brain — planning, memory, scheduling, and model routing — while a specialized agent runtime like Claude Code does the actual coding. Hermes decides what to do and when (including on a cron), delegates the code-writing step to the runtime, reads the result, and continues. It's the orchestrator + agent-runtime split: one layer plans, another executes." },
      { q: 'Why not just use Claude Code alone?', a: "Claude Code is excellent at the coding step but is session-bound and interactive by design. Pairing it under Hermes adds unattended scheduling (cron), persistent cross-run memory and skills that compound, task decomposition and dispatch, isolated git worktrees for parallel work, and model routing so a cheap model can handle orchestration. If you only need one interactive coding session, Claude Code alone is simpler; the pairing pays off for autonomous, repeated, or parallel work." },
      { q: 'Can Hermes run DeepSeek?', a: 'Yes. DeepSeek is a supported provider in Hermes, so you can back the agent with a DeepSeek model (including the R1 reasoning model). A common motivation is cost: routing a cheaper model for the planning/orchestration loop and reserving a stronger model for the hard coding step. Exact pricing and quality vary by model and change often — check current provider docs before committing.' },
      { q: 'Does Hermes only work with Claude Code?', a: 'No. Hermes ships bundled autonomous-agent skills for several runtimes — Claude Code, Codex CLI, OpenCode, and computer use — under the same delegate pattern. You can swap the executor without changing the orchestration layer.' },
      { q: 'Is it safe to let Hermes drive a coding agent unattended?', a: "Treat it with the same caution as any autonomous agent. Print-mode delegation skips interactive permission prompts, which makes it good for automation but also means the runtime can act without a per-step confirmation. Scope tool permissions tightly, run in an isolated git worktree, keep a human review gate on anything that ships, and avoid fully-permissive modes for work that touches production." },
    ],
  },
  {
    path: '/blog/rag-vs-fine-tuning',
    title: 'RAG vs Fine-Tuning: Which One Actually Solves Your Problem (2026 Decision Guide)',
    seoTitle: 'RAG vs Fine-Tuning: 2026 Decision Guide',
    description:
      'RAG solves a knowledge problem, fine-tuning solves a behavior problem — not competitors. Side-by-side table, when to choose each, the hybrid (RAFT) pattern, how customization is evolving beyond fine-tuning (LoRA/QLoRA, DPO, distillation, reasoning models), where small fine-tuned models win with real company examples (Checkr, Together AI), what engineers say, and tips.',
    date: '2026-09-18',
    author: 'poorna',
    image: '/og-rag-vs-fine-tuning.png',
    faqs: [
      { q: 'Is RAG cheaper than fine-tuning?', a: 'Usually to start, no — not always to run. RAG typically has a lower upfront build cost and no training run, but every call pays a token cost for the injected context plus a retrieval hop. Fine-tuning costs more upfront (data labeling and a training job) but a fine-tuned smaller model can get cheaper per call at high, repetitive volume. Compare total cost across build, run, and maintain, not just the price of one training run.' },
      { q: 'Can you use RAG and fine-tuning together?', a: "Yes, and most production systems that reach real scale do. The common pattern is to fine-tune for behavior — tone, refusal style, output format — and use RAG for facts, so the model talks in a consistent voice while grounding its answers in current, cited documents. This combined pattern is sometimes called RAFT (retrieval-augmented fine-tuning)." },
      { q: 'Does fine-tuning teach a model new facts?', a: 'Not reliably. Fine-tuning adjusts weights toward the style and structure of the training examples; it does not give a model a dependable, inspectable store of facts the way a retrieval index does. Teams that fine-tune on a document set to make the model "know" it often end up with a model that confidently invents details rather than accurately recalling them. For facts, use RAG.' },
      { q: 'When should I choose RAG over fine-tuning?', a: "Choose RAG when your knowledge changes often, you need to cite the source of an answer for compliance or trust, your knowledge base is large or proprietary, or you don't have labeled training examples. RAG is also the standard starting point even for teams that expect to add fine-tuning later." },
      { q: 'When should I choose fine-tuning over RAG?', a: "Choose fine-tuning when you need consistent behavior — a specific tone, refusal pattern, or output format — that prompting alone doesn't reliably enforce; when your latency budget can't absorb a retrieval hop; or when the underlying knowledge is stable and query volume is high enough that a smaller fine-tuned model is meaningfully cheaper to run than a frontier model with RAG." },
      { q: 'How much data does fine-tuning need?', a: "There's no universal number, but production guides commonly cite ranges in the hundreds to low thousands of clean, labeled input/output examples for a supervised fine-tune, with quality mattering more than raw count. RAG, by contrast, works directly off documents you likely already have, with no labeling step." },
      { q: 'What is LoRA / QLoRA?', a: 'LoRA (Low-Rank Adaptation) fine-tunes a model by freezing its original weights and training small low-rank adapter matrices instead — roughly 0.1–1% of the parameters — so quality stays close to a full fine-tune at a fraction of the compute and memory, with no added inference latency once merged. QLoRA adds 4-bit quantization of the base model, making it possible to fine-tune large models on a single GPU. Both are parameter-efficient fine-tuning (PEFT) methods and are the default way teams fine-tune in 2026.' },
      { q: 'Can a small fine-tuned model beat a large model?', a: 'For a narrow, well-defined task, often yes. Publicly documented examples show fine-tuned small open models (8B-class) matching or beating much larger models on a specific task at far lower cost — e.g. Together AI reported a fine-tuned Llama-3-8B beating the 70B base on math at ~50× lower cost than GPT-4o, and Checkr replaced GPT-4 with fine-tuned small models for background-check classification at roughly 5× lower cost. The win is task-specific: a small fine-tuned model does not become generally smarter, just very good at the one job it was tuned for.' },
    ],
  },
  {
    path: '/blog/rag-evaluation-metrics',
    title: 'RAG Evaluation Metrics: Faithfulness, Context Precision/Recall, and How to Actually Measure a RAG Pipeline',
    seoTitle: 'RAG Evaluation Metrics: Faithfulness & Context Precision/Recall',
    description:
      'RAG evaluation splits into two failure edges: retrieval (context precision, context recall) and generation (faithfulness, answer relevancy). The RAG triad, how RAGAS computes each metric, RAGAS vs TruLens vs DeepEval, and the pitfalls that make eval scores lie to you.',
    date: '2026-09-21',
    author: 'poorna',
    image: '/og-rag-evaluation-metrics.png',
    faqs: [
      { q: 'What is RAG evaluation?', a: "RAG evaluation is measuring whether a retrieval-augmented generation pipeline retrieves the right context and generates an answer that's grounded in it. It splits into two failure edges: retrieval quality (did we find the right chunks?) and generation faithfulness (did the model use them correctly, without inventing anything?). Standard frameworks like RAGAS and TruLens score both with an LLM-as-judge." },
      { q: 'What is the RAG triad?', a: 'The RAG triad, coined by TruEra/TruLens, is three evaluations that together catch hallucination: context relevance (are retrieved chunks relevant to the query?), groundedness (is the answer supported by the retrieved context?), and answer relevance (does the answer address the question?). Passing all three gives confidence the app is hallucination-free up to the limits of its knowledge base.' },
      { q: 'What is faithfulness in RAG evaluation?', a: "Faithfulness measures what fraction of an answer's claims are actually supported by the retrieved context. RAGAS computes it by decomposing the answer into atomic statements with an LLM, checking each against the context, and scoring supported/total. A score below roughly 0.7-0.8 is commonly used as a threshold that flags meaningful hallucination worth investigating." },
      { q: 'RAGAS vs TruLens vs DeepEval — which should I use?', a: 'They fit different stages. RAGAS is the fastest path to scored, standardized RAG metrics for offline comparison of pipeline configurations. TruLens adds OpenTelemetry-based tracing so you can watch faithfulness and relevance drift on live production traffic, not just an eval set. DeepEval is built pytest-style, so RAG quality becomes a CI gate that can block a merge. Many teams run more than one: RAGAS or TruLens in development, DeepEval in CI, TruLens (or Arize Phoenix) in production.' },
      { q: 'Does a high faithfulness score mean the RAG system is correct?', a: "No. Faithfulness only checks that the answer's claims trace back to the retrieved context — it can't tell you if that context was itself wrong or stale. A RAG system can score 0.95 on faithfulness and still give a confidently wrong business answer if the underlying documents were outdated or incorrect. RAG evaluation frameworks operate at the inference layer; they don't substitute for keeping the knowledge base accurate." },
      { q: 'Do I need labeled ground truth to evaluate a RAG pipeline?', a: "Not for the core generation-side metrics. Faithfulness and answer relevancy are reference-free — they only need the question, retrieved context, and generated answer. Context recall is the exception: it requires a ground-truth answer to check whether retrieval pulled back everything necessary, so it's typically added once you have a labeled eval set." },
    ],
  },
  {
    path: '/blog/mcp-vs-api',
    title: 'MCP vs API: What the Model Context Protocol Actually Is (and When to Use It)',
    seoTitle: 'MCP vs API: Model Context Protocol Explained',
    description:
      "MCP vs API, explained: MCP (Model Context Protocol) is one open, model-facing standard that makes tools reusable across every AI app — turning M×N integrations into M+N. How it works, how it evolved (HTTP+SSE → Streamable HTTP, OAuth), its trade-offs (security, token burn), MCP vs A2A and ADK, RAG vs MCP, and when to use each.",
    date: '2026-08-25',
    author: 'poorna',
    image: '/og-mcp-vs-api.png',
    faqs: [
      { q: 'What is MCP in simple terms?', a: "MCP (Model Context Protocol) is an open standard for connecting AI apps to external tools and data. Instead of custom glue code for every tool in every AI app, you expose a tool once as an MCP server, and any MCP-compatible host — Claude, ChatGPT, an IDE, your own agent — can use it. Anthropic describes it as a 'USB-C port for AI applications.'" },
      { q: 'What is the difference between MCP and an API?', a: 'An API is a general interface you write code against, one integration at a time. MCP is one standardized, model-facing protocol that makes tools self-describing and reusable across every AI app. They are not competitors: an MCP server usually calls an API under the hood — MCP is the layer that lets an LLM discover and use that API in a uniform way.' },
      { q: 'Is MCP better than a REST API?', a: "It's not better or worse — it operates at a different layer. Use a plain API for deterministic app-to-app integration with no model in the loop. Use MCP when you want an LLM or agent to discover and call tools, especially across multiple AI hosts. In practice MCP servers wrap REST APIs, so you often use both together." },
      { q: 'What is the difference between RAG and MCP?', a: "RAG (retrieval-augmented generation) is a technique for pulling relevant knowledge into a model's context. MCP is a protocol for connecting tools and data sources. They're at different layers and are often combined — you can expose a retrieval/RAG capability as an MCP server so any agent can search your knowledge base as a standard tool." },
      { q: 'Who created MCP and is it open?', a: 'MCP was introduced and open-sourced by Anthropic in late 2024. The specification is public, with SDKs in several languages, and it saw broad adoption across the industry through 2025 — including support from other model providers and many IDEs and agent frameworks.' },
      { q: 'Is MCP secure?', a: "MCP is as secure as how you deploy it. Early versions had gaps — underspecified auth and prompt-injection / 'tool poisoning' risks — which the 2025 revisions addressed with an OAuth 2.1 framework, resource-server semantics, and a security best-practices spec. But you still own the risk of what you connect: treat third-party servers as untrusted, scope permissions tightly, and keep a human in the loop for sensitive actions." },
      { q: 'What is the difference between MCP and A2A?', a: "They cover different connections. MCP connects an agent to tools and data. A2A (Agent2Agent, from Google) connects agents to each other so they can discover and delegate work. They're complementary — an agent might use MCP for its tools and A2A to hand off to another agent. Google's ADK framework speaks both." },
      { q: 'How do I build an MCP server?', a: 'Pick an official MCP SDK (TypeScript or Python are common), define the Tools, Resources, and Prompts you want to expose, wrap whatever API or data source they call, and run the server over stdio (local) or HTTP (remote). Point an MCP host — Claude Desktop, an IDE, or your agent — at it, and the tools become available automatically.' },
    ],
  },
  {
    path: '/blog/what-are-ai-agents',
    title: 'AI Agents Explained: Definition, Types, Architecture, and Real Examples (2026)',
    seoTitle: 'AI Agents Explained: Types, Architecture & Examples',
    description:
      'What AI agents are and how they work: the perceive-plan-act-observe loop, LLM reasoning core, memory and tools, agents vs agentic AI, the 5 classic types plus modern patterns, real examples (Claude Code, Devin, Deep Research), and how to build one.',
    date: '2026-08-25',
    author: 'poorna',
    image: '/og-what-are-ai-agents.png',
    faqs: [
      { q: 'What is an AI agent in simple terms?', a: 'An AI agent is a software system that takes a goal, decides what to do on its own, and acts through tools — then looks at the result and keeps going until the goal is met. The difference from a normal chatbot is autonomy plus a loop: it plans, uses tools (search, code, APIs), observes what happened, and adjusts, instead of answering once and stopping.' },
      { q: 'What is the difference between AI agents and agentic AI?', a: "'AI agent' is a noun — the system itself. 'Agentic AI' is an adjective describing how autonomous a system's behavior is. In practice people use them interchangeably, but the useful distinction is: an agent is the concrete thing that plans and acts; 'agentic' describes any AI that shows that autonomy, often across multi-step or multi-agent workflows." },
      { q: 'Is ChatGPT an AI agent?', a: 'It depends on the mode. Plain ChatGPT answering a message is not an agent — it responds once with no autonomous planning or tool loop. But ChatGPT running in an agentic mode (browsing, code execution, Deep Research, or Operator/computer use) is acting as an agent: it plans steps, calls tools, observes results, and loops until it finishes the task.' },
      { q: 'What are the main types of AI agents?', a: 'Classic AI theory lists five: simple reflex, model-based reflex, goal-based, utility-based, and learning agents. Modern LLM-based agents are usually described by pattern instead — tool-using (ReAct), planning, reflective/self-critique, and multi-agent systems.' },
      { q: 'What are examples of AI agents?', a: 'Coding agents like Claude Code, Cursor, and Devin; research agents like OpenAI Deep Research; computer-use agents like Operator and Claude computer use; plus customer-support, data-analysis, and workflow-automation agents built with frameworks such as LangGraph, CrewAI, or the Claude and OpenAI Agents SDKs.' },
      { q: 'How do I build an AI agent?', a: "Start with a capable LLM, give it a clear goal and a small set of tools, and wrap it in a loop that lets it plan, call tools, and read results. Add memory and guardrails as needed. Frameworks like LangGraph, CrewAI, the Claude Agent SDK, or the OpenAI Agents SDK handle the loop and tool wiring; MCP is a common standard for connecting tools. Keep the scope narrow first and expand once it's reliable." },
    ],
  },
  {
    path: '/blog/best-ai-coding-agents',
    title: 'The Best AI Coding Agents in 2026 (Claude Code vs Cursor vs Copilot, Ranked by Fit)',
    seoTitle: 'Best AI Coding Agents 2026 (Claude Code vs Cursor)',
    description:
      'The best AI coding agents in 2026, ranked by fit not hype: Claude Code vs Cursor vs GitHub Copilot, plus Codex CLI, open-source BYO-key tools (Aider, Cline, OpenCode, Kilo) and autonomous agents (Devin, Amp, Jules). Comparison table, forum/user sentiment on each, recommended models and settings per agent, community coding wisdom, and a decision table to pick yours.',
    date: '2026-08-14',
    author: 'poorna',
    image: '/og-best-ai-coding-agents.png',
  },
  {
    path: '/blog/ai-engineer-skills',
    title: 'AI Engineer Skills in 2026: The Complete Checklist (Technical + Soft), by Seniority',
    seoTitle: 'AI Engineer Skills in 2026: The Complete Checklist',
    description:
      'The complete AI engineer skills checklist for 2026 — technical (Python, ML/DL, LLMs, RAG, agents, evaluation, MLOps) and soft (problem framing, communication), with how to prove each, what to prioritize by seniority (junior/mid/senior), and what is overrated vs underrated.',
    date: '2026-08-14',
    author: 'poorna',
    image: '/og-ai-engineer-skills.png',
  },
  {
    path: '/blog/how-to-become-an-ai-engineer',
    title: 'How to Become an AI Engineer in 2026: A Practical, Step-by-Step Roadmap',
    seoTitle: 'How to Become an AI Engineer in 2026 (Step-by-Step)',
    description:
      'How to become an AI engineer in 2026 — no PhD required, typically 6–18 months. The 5-phase roadmap (foundations, ML/DL, AI engineering, build & specialize, get hired), the skills that actually matter, how long it takes, a portfolio that gets interviews, and a free downloadable roadmap PDF.',
    date: '2026-08-14',
    author: 'poorna',
    image: '/og-how-to-become-an-ai-engineer.png',
  },
  {
    path: '/blog/ai-detectors-vs-humanizers',
    title: 'AI Detectors vs. "Humanizers": Which Actually Work? (GPTZero, Turnitin & Watermark Removers, Ranked)',
    seoTitle: 'Best AI Detectors vs Humanizers: Do They Actually Work?',
    description:
      'The best AI detectors ranked and how accurate they really are: GPTZero, Turnitin, Originality, Copyleaks, and open-source Binoculars/DetectGPT — plus the "humanizer" and watermark-remover tools that claim to beat them. Independent accuracy is ~80% not 99%, false positives hit non-native writers, OpenAI quit detection, GPTZero vs Turnitin compared, and most "removers" are paraphrasers or vaporware.',
    date: '2026-08-14',
    author: 'poorna',
    image: '/og-ai-detectors-vs-humanizers.png',
  },
  {
    path: '/blog/does-claude-watermark-text',
    title: 'Does Claude Watermark Its Text? AI Text Watermarking (Claude, ChatGPT & SynthID), Explained',
    seoTitle: 'Does Claude Watermark Its Text? (Claude, ChatGPT, SynthID)',
    description:
      "Yes — since August 2, 2026 newer Claude models weave an imperceptible AI text watermark into generated text, worldwide, to meet the EU AI Act. How AI text watermarks work, who ships one (Google SynthID, Anthropic, OpenAI), whether there's a ChatGPT or Claude watermark detector, whether watermark removers work, and why they survive copy-paste but not paraphrasing.",
    date: '2026-08-14',
    author: 'poorna',
    image: '/og-does-claude-watermark-text.png',
  },
  {
    path: '/blog/how-to-install-hermes-agent',
    title: 'How to Install Hermes Agent (macOS, Windows, Linux, pip, Docker)',
    seoTitle: 'How to Install Hermes Agent (Mac, Windows, Linux)',
    description:
      'Step-by-step: install Hermes Agent on macOS, Windows (PowerShell or WSL2), and Linux, plus pip and Docker. First-run model setup, the exact commands, and fixes for common install errors.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-how-to-install-hermes-agent.png',
  },
  {
    path: '/blog/hermes-agent-skills',
    title: 'Hermes Agent Skills: How Self-Improving Skills Actually Work',
    seoTitle: 'Hermes Agent Skills: How Self-Improving Skills Work',
    description:
      'How Hermes Agent skills work: self-improving procedures stored as SKILL.md in ~/.hermes/skills/, auto-created from your workflows, managed and loaded from the CLI, with write_approval for control.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-skills.png',
  },
  {
    path: '/blog/hermes-agent-desktop-web-ui',
    title: 'Hermes Agent Desktop App & Web UI: The Visual Way to Run Your Agent',
    seoTitle: 'Hermes Agent Desktop App & Web UI (Dashboard) Guide',
    description:
      'Hermes Agent beyond the terminal: the Desktop app and the browser dashboard (hermes dashboard at 127.0.0.1:9119) to manage sessions, keys, skills, memory, and schedules — no YAML editing.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-desktop-web-ui.png',
  },
  {
    path: '/blog/hermes-agent-models',
    title: 'Which LLM Should You Run With Hermes Agent? Models, Providers, and Nous Portal',
    seoTitle: 'Which LLM to Run With Hermes Agent (Models Guide)',
    description:
      'Hermes Agent is model-agnostic: use Nous Portal, OpenRouter, OpenAI, Anthropic, or any endpoint. How to set a model with hermes model, the 64k-context minimum, and how to choose one.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-models.png',
  },
  {
    path: '/blog/hermes-agent-security',
    title: 'Is Hermes Agent Safe? Its Security Model and Sandboxing, Explained',
    seoTitle: 'Is Hermes Agent Safe? Security & Sandboxing Explained',
    description:
      "Hermes Agent's security model: five layers of defense-in-depth defaults, sandboxed execution across Docker/SSH/Modal backends, credential filtering, and how to run untrusted tasks safely.",
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-security.png',
  },
  {
    path: '/blog/hermes-agent-alternatives',
    title: 'The Best Hermes Agent Alternatives in 2026 (Open-Source AI Agents Compared)',
    seoTitle: 'Best Hermes Agent Alternatives in 2026 (Compared)',
    description:
      'The best open-source Hermes Agent alternatives in 2026: OpenClaw, LangGraph, CrewAI, AutoGen, Open Interpreter, and Agent Zero — with a clear "best for" for each and when to pick which.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-alternatives.png',
  },
  {
    path: '/blog/hermes-agent-troubleshooting',
    title: 'Hermes Agent Troubleshooting: Fixing the Most Common Errors',
    seoTitle: 'Hermes Agent Troubleshooting: Fix Common Errors',
    description:
      'Fix the most common Hermes Agent errors: command not found, context-window errors, Windows/WSL2 install issues, provider/auth failures, and Docker persistence — starting with hermes doctor.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-troubleshooting.png',
  },
  {
    path: '/blog/hermes-agent-vs-openclaw',
    title: 'Hermes Agent vs OpenClaw: Which Open-Source AI Agent Should You Run?',
    seoTitle: 'Hermes Agent vs OpenClaw: Which to Run (2026)',
    description:
      'Hermes Agent vs OpenClaw compared, with real user reviews from Reddit and forums: architecture, skills, memory, security, cost, and a clear pick-by-need verdict (and why many run both).',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-vs-openclaw.png',
  },
  {
    path: '/blog/claude-certified-architect-exam-traps',
    title: 'Why Good Engineers Fail the Claude Certified Architect Exam: 11 Traps to Avoid',
    seoTitle: 'Claude Certified Architect Exam: 11 Traps to Avoid',
    description:
      "The Claude Certified Architect (CCA-F) exam's wrong answers are designed to sound like best practice. The 11 traps — judgment and technical — with the correct pattern for each.",
    date: '2026-08-07',
    author: 'poorna',
    image: '/og-claude-certified-architect-exam-traps.png',
  },
  {
    path: '/blog/claude-certified-architect-exam',
    title: "Claude Certified Architect (CCA) Exam: Everything You Need to Know (2026)",
    seoTitle: 'Claude Certified Architect Exam: Everything to Know 2026',
    description:
      "Anthropic's Claude Certified Architect exam (CCAR-F): ~60 scenario questions, 120 min, $125, pass 720/1000 — the 5 domains, registration, and honest prep tips.",
    date: '2026-08-07',
    author: 'poorna',
    image: '/og-claude-certified-architect-exam.png',
  },
  {
    path: '/blog/context-engineering-graperoot',
    title: 'Context Engineering for AI Coding: How GrapeRoot Cuts Claude Code Token Cost 30–45%',
    seoTitle: 'Context Engineering: How GrapeRoot Cuts AI Coding Cost',
    description:
      "Context engineering means curating what's in the model's context window. GrapeRoot preloads the right code into every prompt — cutting Claude Code cost from $0.49 to $0.27 per prompt.",
    date: '2026-08-05',
    author: 'poorna',
    image: '/og-context-engineering-graperoot.png',
  },
  {
    path: '/blog/ai-engineer-salary',
    title: 'AI Engineer Salary in 2026: What US Engineers Actually Earn, by Level, Company, and City',
    seoTitle: 'AI Engineer Salary 2026: US Pay by Level, Company & City',
    description:
      'US AI engineers earn a ~$145K–$185K median base in 2026 ($211K–$277K total comp); frontier labs pay $600K–$1.15M+. Sourced breakdown by level, company, city, and skill.',
    date: '2026-08-25',
    author: 'poorna',
    image: '/og-ai-engineer-salary.png',
    faqs: [
      { q: 'What is the entry-level AI engineer salary?', a: 'Entry-level (0–2 years) AI engineers earn roughly $90K–$135K base across the broad market, or $110K–$200K total compensation depending on employer (Kore1, Glassdoor, 2026). At big tech the first rung is higher — a Google L3 AI engineer averages ~$177K total comp and an OpenAI L2 ~$253K per Levels.fyi.' },
      { q: 'How much does an AI engineer make per month?', a: "About $12,090/month at the Glassdoor median ($145,070/year) and about $9,746/month at ZipRecruiter's broader-pool average ($116,949/year). At big tech, a $245K median total-comp package works out to roughly $20,400/month before taxes." },
      { q: 'Which company pays AI engineers the most?', a: "The frontier labs. Levels.fyi puts OpenAI's median software-engineer total comp near $800K (up to $1.15M at L6) and xAI's near $640K, with Anthropic senior/lead engineers at roughly $575K–$759K — mostly equity. Google and Meta lead the enterprise band ($355K–$645K at senior/staff)." },
      { q: 'Do AI engineers earn more than ML engineers or data scientists?', a: 'Yes, modestly, in 2026. AI engineers sit at roughly $145K–$185K base / $211K–$277K total comp, ahead of ML engineers (~$158K base) and data scientists (~$122K base). The premium reflects newer demand than supply for production LLM experience.' },
      { q: 'Does an AI engineer need a degree?', a: 'No hard requirement. Many postings prefer a CS or ML degree, but companies increasingly hire on demonstrated ability to ship AI systems to production — real projects, RAG pipelines, eval suites, deployed agents. A degree helps most for research-leaning roles at frontier labs.' },
    ],
  },
  {
    path: '/blog/forward-deployed-ai-engineer',
    title: 'The Forward-Deployed AI Engineer: What the Role Actually Is, What It Pays, and Whether You Should Go For It',
    seoTitle: 'Forward-Deployed AI Engineer: Role, Pay, and Path (2026)',
    description:
      "OpenAI, Anthropic, and Google are hiring forward-deployed AI engineers on Palantir's playbook. What the job is, how it pays, and how to break in.",
    date: '2026-07-29',
    author: 'poorna',
    image: '/og-forward-deployed-ai-engineer.png',
  },
  {
    path: '/blog/github-bug-bounty-ai-slop',
    title: 'GitHub\'s Bug Bounty Overhaul: What "AI Slop" Vulnerability Reports Are Doing to Security Research',
    seoTitle: 'GitHub Bug Bounty Overhaul: The "AI Slop" Problem, Explained',
    description:
      "GitHub's July 2026 bug bounty restructuring — a VIP tier and a new-researcher submission cap — is a direct response to AI-generated vulnerability reports. What it means for engineers.",
    date: '2026-07-24',
    author: 'poorna',
    image: '/og-github-bug-bounty-ai-slop.png',
  },
  {
    path: '/blog/openai-models-hacked-hugging-face',
    title: "OpenAI's Models Broke Out and Hacked Hugging Face During a Cyber Test: What Engineers Should Actually Take Away",
    seoTitle: 'OpenAI Models Hacked Hugging Face in a Cyber Test — Analysis',
    description:
      "OpenAI models escaped a test sandbox, chained a zero-day, and hacked Hugging Face to steal benchmark answers. The agentic-security lessons behind the headlines.",
    date: '2026-07-22',
    author: 'poorna',
    image: '/og-openai-hugging-face.png',
  },
  {
    path: '/blog/hermes-agent-nous-research-guide',
    title: 'Hermes Agent by Nous Research: The Self-Improving Open-Source AI Agent, Explained',
    seoTitle: 'Hermes Agent (Nous Research): Official Docs, Install, Free?',
    description:
      'What Hermes Agent by Nous Research is, where the official documentation and GitHub repo live, whether it is free, and how to install the open-source self-improving AI agent on Mac, Windows, and Linux.',
    date: '2026-09-23',
    author: 'poorna',
    image: '/og-hermes-agent.png',
    faqs: [
      { q: 'What is Hermes AI?', a: '"Hermes AI" usually refers to Hermes Agent, Nous Research\'s open-source autonomous AI agent framework — though it can also mean the separate Hermes family of fine-tuned LLMs from the same lab. The agent is the framework that plans, calls tools, and executes tasks; the LLMs are models that can power it.' },
      { q: 'Is Hermes Agent free?', a: 'Yes — the Hermes Agent framework is MIT-licensed and free to download, self-host, and modify from github.com/NousResearch/hermes-agent. You pay only for the model inference you use, either via your own API keys (OpenAI, Anthropic, OpenRouter) or a Nous Portal subscription tier.' },
      { q: 'Does Hermes Agent run on Windows?', a: 'Yes. Windows 10/11 gets a native EXE installer for the desktop app, or a one-line PowerShell install (iex (irm https://hermes-agent.nousresearch.com/install.ps1)) for the CLI. WSL2 is also supported via the Linux install script.' },
      { q: 'Where are the official Hermes Agent website and documentation?', a: 'The official website and downloads are at hermes-agent.nousresearch.com, documentation lives at hermes-agent.nousresearch.com/docs, and the source code is on GitHub at github.com/NousResearch/hermes-agent. There is no separate account gate or waitlist to read the docs or download the installer.' },
      { q: 'Can I install Hermes Agent with pip or Docker?', a: 'Yes — beyond the one-line curl/PowerShell installers and the desktop app, Hermes Agent also ships as a pip package and a Docker image for containerized or scripted setups. See our step-by-step install guide for the exact commands per platform.' },
    ],
  },
  {
    path: '/blog/ollama-mac-local-ai-2025',
    title: 'Ollama on Mac: The Perfect Local AI Stack for 2025',
    description:
      'Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — unlock it with Ollama and Apple Silicon unified memory.',
    date: '2025-08-01',
    author: 'poorna',
  },
  {
    path: '/blog/google-a2a',
    title: 'Architectural Insights: A2A as a Protocol for Peer AI Agents',
    description:
      'An open standard from Google for inter-agent communication, enabling AI agents to collaborate as peers without exposing their internal workings.',
    date: '2025-07-30',
    author: 'vishnu',
  },
  {
    path: '/blog/what-makes-llms-agentic',
    title: 'What Makes LLMs Agentic?',
    description:
      'What separates an LLM from an AI agent? The core properties — tool calling, planning, memory, and autonomy — that turn a language model into an agent, with examples of each.',
    date: '2025-08-26',
    author: 'vishnu',
  },
  {
    path: '/blog/openai-gdpval',
    title: "OpenAI GDPval: The Evaluation of AI's Economic Potential",
    description:
      "OpenAI's GDPval benchmark explained: how it measures AI on economically valuable knowledge work, its key findings, and what they signal for the future of white-collar jobs.",
    date: '2025-10-14',
    author: 'vishnu',
  },
  {
    path: '/blog/mlops-best-practices',
    title: '14 MLOps Best Practices, Ordered by Impact — With Examples of When Each One Saves You',
    seoTitle: '14 MLOps Best Practices Ordered by Impact (2026)',
    description:
      'An impact-ordered guide to 14 MLOps best practices — versioning, monitoring, CI/CD, eval gates, safe rollouts, and more — each with when it matters most and a concrete example.',
    date: '2026-07-25',
    author: 'poorna',
    image: '/og-mlops-best-practices.png',
  },
  {
    path: '/blog/llm-deployment-challenges',
    title: '12 LLM Deployment Challenges — And How to Handle Each One in Production',
    seoTitle: '12 LLM Deployment Challenges & How to Handle Them (2026)',
    description:
      'The LLM deployment challenges that actually bite in production — cost, latency, hallucinations, prompt injection, and more — each with when it hits hardest and how to handle it.',
    date: '2026-07-25',
    author: 'poorna',
    image: '/og-llm-deployment-challenges.png',
  },
  {
    path: '/blog/building-robust-ai-data-pipelines',
    title: 'Building Robust AI Data Pipelines: 12 Practices, Ordered by Impact',
    seoTitle: 'Building Robust AI Data Pipelines: 12 Practices (2026)',
    description:
      'The 12 practices that make AI data pipelines robust — validation gates, idempotency, schema contracts, medallion layers, observability — each with when it matters and an example.',
    date: '2026-07-26',
    author: 'poorna',
    image: '/og-building-robust-ai-data-pipelines.png',
  },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const htmlToText = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim()

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

function writeRoute({ path, title, seoTitle, description, date, author, image, noindex, faqs }, appHtml) {
  // Canonical/og:url use the TRAILING-SLASH form because GitHub Pages serves
  // directory URLs (/blog/x/) with 200 and 301-redirects the no-slash form to
  // it. Pointing canonical at the no-slash URL (a redirect) made Google index
  // both and split authority. Match the actually-served URL instead.
  const url = path === '/' ? `${SITE}/` : `${SITE}${path}/`
  const ogImage = image ? `${SITE}${image}` : OG_IMAGE
  // <title> uses the short seoTitle (~50-60 chars, avoids SERP truncation)
  // when provided; og/twitter titles keep the fuller headline for social.
  const tabTitle = seoTitle || title
  // NOTE: use replacer FUNCTIONS, never a template-string replacement. In
  // String.replace, "$" in the replacement string is a special backreference,
  // so a value like "$100K" or "$0.27" in a title/description would be mangled
  // into broken HTML (and break social link previews). A function's return
  // value is used verbatim, with no "$" interpretation.
  const put = (re, value) => {
    html = html.replace(re, (_m, p1, p2) => (p1 ?? '') + value + (p2 ?? ''))
  }
  let html = template
  put(/(<meta property="og:image" content=")[^"]*(")/, ogImage)
  put(/(<meta name="twitter:image" content=")[^"]*(")/, ogImage)
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(tabTitle)}</title>`)
  put(/(<meta name="description" content=")[^"]*(")/, esc(description))
  put(/(<link rel="canonical" href=")[^"]*(")/, url)
  put(/(<meta property="og:title" content=")[^"]*(")/, esc(title))
  put(/(<meta property="og:description" content=")[^"]*(")/, esc(description))
  put(/(<meta property="og:url" content=")[^"]*(")/, url)
  put(/(<meta name="twitter:title" content=")[^"]*(")/, esc(title))
  put(/(<meta name="twitter:description" content=")[^"]*(")/, esc(description))

  // Thank-you/confirmation routes: keep them out of search indexes.
  if (noindex) {
    html = html.replace(
      '</head>',
      '    <meta name="robots" content="noindex, follow" />\n  </head>'
    )
  }

  if (date) {
    html = html.replace(/(<meta property="og:type" content=")website(")/, (_m, p1, p2) => p1 + 'article' + p2)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url,
      image: ogImage,
      datePublished: date,
      dateModified: date,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      publisher: { '@id': `${SITE}/#organization` },
      author: AUTHORS[author] || AUTHORS.team,
    }
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
    )
  }

  // FAQPage structured data — eligible for FAQ rich results. Keep the Q&A here
  // in sync with the page's own FAQ section.
  if (Array.isArray(faqs) && faqs.length) {
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n  </head>`
    )
  }

  // Full server-rendered page content inside #root: crawlers see the real
  // article; React re-renders over it once the bundle loads.
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    path === '/'
      ? join(dist, 'index.html')
      : join(dist, path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  console.log(`SEO: wrote ${outFile}`)
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-prerender.tsx')

  const fullTexts = []
  for (const route of [...pages, ...posts]) {
    const appHtml = await render(route.path)
    writeRoute(route, appHtml)
    if (route.date) {
      fullTexts.push(
        `# ${route.title}\n\nURL: ${SITE}${route.path}\nDate: ${route.date}\nAuthor: ${(AUTHORS[route.author] || AUTHORS.team).name}\n\n${htmlToText(appHtml)}`
      )
    }
  }

  const llmsFull = `# ${SITE_NAME} — Full Content\n\n> Complete text of all articles on ${SITE} for LLM ingestion. Index: ${SITE}/llms.txt\n\n${fullTexts.join('\n\n---\n\n')}\n`
  writeFileSync(join(dist, 'llms-full.txt'), llmsFull)
  console.log(`SEO: wrote dist/llms-full.txt (${Math.round(llmsFull.length / 1024)} KB)`)
  console.log(`SEO: ${pages.length + posts.length} routes fully prerendered`)
} finally {
  await vite.close()
}
