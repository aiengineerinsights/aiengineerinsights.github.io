// "Explore with AI" CTA — per-post follow-up questions (see docs/adr/0001-explore-with-ai-cta.md).
//
// Each question is something readers of that post actually search next (Search
// Console queries for the page + the post's FAQ). `askFor` names what the
// assistant should ask the reader before answering, so the answer is applied to
// their situation instead of being a generic re-summary.
//
// Adding a post: add an entry keyed by its path (no trailing slash), 3–4
// questions, then render <ExploreWithAI path="..." variant="strip" /> before
// <article> and <ExploreWithAI path="..." variant="questions" /> before the FAQ.

export interface ExploreQuestion {
  /** Shown to the reader and sent as their question. Phrase it the way they'd type it. */
  q: string;
  /** What the assistant should ask the reader first, e.g. "my traffic mix and model prices". */
  askFor: string;
}

export interface ExploreConfig {
  /** Short topic noun used in headings: "LLM routing", "Hermes Agent". */
  topic: string;
  questions: ExploreQuestion[];
}

export const EXPLORE_WITH_AI: Record<string, ExploreConfig> = {
  "/blog/multi-agent-orchestration-patterns": {
    topic: "multi-agent orchestration",
    questions: [
      { q: "Which orchestration pattern fits my use case?", askFor: "what my task looks like — a fixed sequence of steps, independent sub-tasks, or something I can't decompose ahead of time" },
      { q: "Should I use LangGraph, CrewAI, or Microsoft Agent Framework?", askFor: "my stack, how much control I need over routing, and how fast I need a prototype" },
      { q: "How do I stop context from getting lost at agent handoffs?", askFor: "what data each of my agents needs to see from prior steps" },
      { q: "Is my multi-agent design over-engineered?", askFor: "a description of my current agent setup and what problem it's solving" },
    ],
  },
  "/blog/ai-agent-memory": {
    topic: "AI agent memory",
    questions: [
      { q: "Should my agent use Mem0, Letta, or Zep for memory?", askFor: "what my agent does, whether I'm already on LangGraph, and whether relationships between facts matter" },
      { q: "Do I need long-term memory or is RAG enough for my use case?", askFor: "whether my agent needs to persist facts across sessions or just retrieve from a static knowledge base" },
      { q: "How do I build a basic memory layer myself without a third-party tool?", askFor: "my stack (Python/JS), which vector store I already use, and roughly how many users" },
      { q: "How should I handle facts that change over time in agent memory?", askFor: "how often the underlying facts change and whether I need to query past states" },
    ],
  },
  "/blog/hermes-agent-alternatives": {
    topic: "Hermes Agent alternatives",
    questions: [
      { q: "Which Hermes Agent alternative fits what I want to automate?", askFor: "what I want the agent to do, where it should run, and whether I code" },
      { q: "Agent Zero vs Hermes Agent: which should I pick?", askFor: "my use case, hardware, and how much setup I'm willing to do" },
      { q: "Should I use a personal agent or build with a framework like LangGraph or CrewAI?", askFor: "whether I'm automating my own work or building a product" },
      { q: "What's the safest way to self-host one of these agents?", askFor: "my OS, what data and accounts the agent will touch, and my threat model" },
    ],
  },
  "/blog/hermes-agent-vs-openclaw": {
    topic: "Hermes vs OpenClaw",
    questions: [
      { q: "Hermes Agent or OpenClaw: which should I run for my setup?", askFor: "which messaging channels I use, my hardware, and whether I want skills built for me or by the agent" },
      { q: "How do Hermes and OpenClaw compare for hosting and running costs?", askFor: "where I plan to host it and which model provider I'll use" },
      { q: "How do I migrate from OpenClaw to Hermes Agent (or back)?", askFor: "which one I run today and what config, skills, and memory I need to keep" },
      { q: "Which one is safer by default, and what should I harden?", askFor: "what the agent will have access to on my machine and accounts" },
    ],
  },
  "/blog/hermes-agent-troubleshooting": {
    topic: "Hermes Agent errors",
    questions: [
      { q: "What does hermes doctor --fix change, and is it safe to run?", askFor: "my OS and the output of hermes doctor" },
      { q: "Why does Hermes say provider authentication failed?", askFor: "which provider I use and how I set the API key" },
      { q: "\"hermes: command not found\" after install — how do I fix it?", askFor: "my OS, shell, and how I installed Hermes" },
      { q: "hermes update failed — how do I recover without losing my setup?", askFor: "the exact error message and how I installed Hermes" },
    ],
  },
  "/blog/hermes-agent-nous-research-guide": {
    topic: "Hermes Agent",
    questions: [
      { q: "Is Hermes Agent the right agent for what I want to do?", askFor: "what I want to automate and what I've tried before" },
      { q: "How do I install Hermes Agent and get my first useful session?", askFor: "my OS and which model provider I want to use" },
      { q: "Which model should I run Hermes Agent with?", askFor: "my budget, whether I need it local, and my main tasks" },
      { q: "How does Hermes Agent's self-improving skills loop actually work?", askFor: "how technical I am, so the explanation fits" },
    ],
  },
  "/blog/jev-vs-ml-classification": {
    topic: "LLM vs ML classification",
    questions: [
      { q: "Should I use an LLM, a trained classifier, or Jev for my classification task?", askFor: "my labels, how much labeled data I have, volume per day, and latency budget" },
      { q: "How do I calibrate my classifier's confidence scores?", askFor: "which model I use and what a wrong prediction costs me" },
      { q: "Can I go from zero labels to a production classifier?", askFor: "my task, my label set, and how often it changes" },
      { q: "How do I set a confidence threshold for auto-accept vs human review?", askFor: "my error costs and how many items a human can review per day" },
    ],
  },
  "/blog/ai-engineer-salary": {
    topic: "AI engineer salary",
    questions: [
      { q: "What should I expect to earn as an AI engineer?", askFor: "my country or city, years of experience, and current role" },
      { q: "How do I negotiate an AI engineer offer?", askFor: "the offer I have (or expect), my location, and competing options" },
      { q: "Which skills raise AI engineer pay the most?", askFor: "my current skills and the role I'm targeting" },
      { q: "Is moving from software engineering to AI engineering worth it financially?", askFor: "my current role, salary range, and location" },
    ],
  },
  "/blog/forward-deployed-ai-engineer": {
    topic: "the forward-deployed AI engineer role",
    questions: [
      { q: "Am I a good fit for a forward-deployed AI engineer role?", askFor: "my background, what I enjoy about my current work, and how I feel about customer-facing work" },
      { q: "Build me a 90-day plan to become FDE-ready", askFor: "my current skills, hours per week, and target companies" },
      { q: "How should I prepare for an FDE interview loop?", askFor: "which company I'm interviewing with and my strongest and weakest areas" },
      { q: "Which portfolio project would best show FDE readiness?", askFor: "my experience and the industry I want to work with" },
    ],
  },
  "/blog/llm-routing": {
    topic: "LLM routing",
    questions: [
      { q: "How do I pick the confidence threshold for my LLM router?", askFor: "my traffic, my two model tiers, and what a wrong cheap-model answer costs me" },
      { q: "Would routing actually save money on my traffic?", askFor: "my request mix, my model prices, and current monthly spend" },
      { q: "RouteLLM vs Semantic Router vs Jev: which fits my stack?", askFor: "my stack, latency budget, and whether I have labeled routing data" },
      { q: "How do I measure my router's accuracy before trusting it?", askFor: "what logs I keep and how I judge a good answer today" },
    ],
  },
  "/blog/anthropic-certifications": {
    topic: "Anthropic certifications",
    questions: [
      { q: "Which Claude certification fits my role and experience?", askFor: "my job, how I use Claude today, and whether I write code" },
      { q: "Can I get a Claude certification if my company isn't an Anthropic partner?", askFor: "where I work and whether we build on Claude for clients" },
      { q: "Build me a study plan for the Claude Developer or Architect exam", askFor: "which exam, my experience with the Claude API and agents, and my weekly hours" },
      { q: "Is a Claude certification worth it for my AI career?", askFor: "my current role, target role, and what I've already built" },
    ],
  },
  "/blog/what-makes-llms-agentic": {
    topic: "agentic AI",
    questions: [
      { q: "Does my use case need an AI agent or just a single LLM call?", askFor: "what I'm trying to automate and how predictable the steps are" },
      { q: "Agentic AI vs AI agents vs workflows: which am I building?", askFor: "what my system does today and who decides each step" },
      { q: "Which model and framework should I use to build an agent?", askFor: "my task, language, budget, and whether I need to self-host" },
      { q: "How do I keep an agentic system safe in production?", askFor: "which tools and data my agent can touch" },
    ],
  },
  "/blog/what-is-an-agent-harness": {
    topic: "agent harnesses",
    questions: [
      { q: "Which harness changes would most improve my agent?", askFor: "what my agent does, how it fails today, and which model it uses" },
      { q: "Do I need a better harness, a better model, or a runtime?", askFor: "my agent's failure modes and whether it runs in production" },
      { q: "Write an AGENTS.md / CLAUDE.md for my project", askFor: "my repo's stack, build and test commands, and what done means" },
      { q: "Is Google Harness² worth trying for my use case?", askFor: "how many similar tasks my agent runs and my budget for extra runs" },
    ],
  },
  "/blog/claude-code-skills": {
    topic: "Claude Code skills",
    questions: [
      { q: "Which Claude Code skills should I install for my workflow?", askFor: "my stack and the tasks I repeat most" },
      { q: "Write a SKILL.md for a task I repeat", askFor: "the task, the steps, and an example of good output" },
      { q: "Should this be a skill, a hook, a subagent, or an MCP server?", askFor: "what I want Claude to do and whether it must always happen" },
      { q: "Is this third-party skill or plugin safe to install?", askFor: "the skill or plugin repo and what it says it does" },
    ],
  },
  "/blog/ai-agent-sandboxing": {
    topic: "AI agent sandboxing",
    questions: [
      { q: "Which sandbox should I use for my agent's tool calls?", askFor: "what my agent runs (shell, code, browser), my stack (local, cloud, Kubernetes), and how often it spins up a sandbox" },
      { q: "gVisor vs Firecracker: which fits my workload?", askFor: "whether my agent's code is predictable or arbitrary, and whether I have hardware virtualization available" },
      { q: "How do I lock down a Docker container for an untrusted agent?", askFor: "what the agent needs to do and whether it needs network access" },
      { q: "Does my current setup actually sandbox the agent or just the tool call?", askFor: "a description of how my agent currently runs" },
    ],
  },
  "/blog/claude-managed-agents": {
    topic: "Claude Managed Agents",
    questions: [
      { q: "Should I use Claude Managed Agents or the Agent SDK?", askFor: "where my agent must run, my data rules, and whether I use other model providers" },
      { q: "Estimate my Claude Managed Agents cost", askFor: "model, session length, and tokens per session" },
      { q: "Design a Managed Agents setup for my use case", askFor: "the task, tools it needs, and how long it runs" },
      { q: "How do I keep a hosted agent safe and on budget?", askFor: "which tools and data the agent can touch" },
    ],
  },
  "/blog/ai-guardrails": {
    topic: "AI guardrails",
    questions: [
      { q: "Which guardrails does my LLM app or agent actually need?", askFor: "what my app does, its inputs, and which tools or data it can touch" },
      { q: "NeMo Guardrails vs Guardrails AI vs Llama Guard: which should I use?", askFor: "my stack, latency budget, and what I need to block" },
      { q: "How do I protect my agent's tool calls from prompt injection?", askFor: "which tools my agent calls and where untrusted text enters" },
      { q: "How do I test my guardrails for false positives and misses?", askFor: "my traffic and what a wrong block versus a missed attack costs me" },
    ],
  },
  "/ai-engineering-roadmap": {
    topic: "the AI engineer roadmap",
    questions: [
      { q: "Turn this roadmap into a week-by-week plan for me", askFor: "my background, Python level, hours per week, target role, and deadline" },
      { q: "Which phases can I skip or speed through?", askFor: "what I already know and have built" },
      { q: "Which portfolio projects would get me hired as an AI engineer?", askFor: "my experience and the kind of company I'm targeting" },
      { q: "How long will it realistically take me to become an AI engineer?", askFor: "my starting point and weekly hours" },
    ],
  },
};
