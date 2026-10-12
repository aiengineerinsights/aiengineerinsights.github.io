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
