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
    seoTitle: 'Hermes Agent: What It Is, How to Install It, Free?',
    description:
      'What Hermes Agent by Nous Research is, whether it is free, and how to install the open-source self-improving AI agent on Mac, Windows, and Linux (desktop app + one-line terminal install).',
    date: '2026-07-22',
    author: 'poorna',
    image: '/og-hermes-agent.png',
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
