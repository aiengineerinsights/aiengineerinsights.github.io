// Site-wide editorial structure: the seven reader-facing topics, the two
// reading paths, and the hand-picked reader favourites. Post data itself stays
// in LatestInsights.tsx / BlogsPage.tsx / RelatedPosts.tsx.

export const TOPMATE_URL = "https://topmate.io/poorna_prudhvi_gurram";
export const ROADMAP_PATH = "/ai-engineering-roadmap";

export interface Topic {
  name: string;
  desc: string;
  /** Post `category` values (as written in the post data) that roll up here. */
  categories: string[];
}

// Posts carry 17 fine-grained categories, nine of which hold a single post.
// Readers browse by these seven instead.
export const TOPICS: Topic[] = [
  { name: "AI agents", desc: "Harnesses, orchestration, frameworks, runtimes", categories: ["AI Agents", "Agentic AI"] },
  { name: "Security and guardrails", desc: "Prompt injection, sandboxing, guardrails", categories: ["AI Security", "Agentic Security"] },
  { name: "Careers", desc: "Roadmap, salary, FDE, interviews, certifications", categories: ["AI Engineering Careers"] },
  { name: "Models and deployment", desc: "Routing, small models, local AI, production", categories: ["AI Models", "Local AI", "LLM Deployment"] },
  { name: "RAG and retrieval", desc: "Chunking, embeddings, vector databases, evals", categories: ["RAG & Retrieval"] },
  { name: "Engineering practice", desc: "Architecture, evaluation, MLOps, data", categories: ["AI Engineering", "AI Architecture", "AI Evaluation", "Evaluation", "MLOps", "Data Engineering"] },
  { name: "Tools", desc: "Claude Code, Cursor, skills, MCP", categories: ["AI Tools", "AI Tooling", "AI Coding"] },
];

/** Topic for a post category; unknown categories fall into Engineering practice. */
export const topicFor = (category: string): string =>
  TOPICS.find((t) => t.categories.includes(category))?.name ?? "Engineering practice";

export interface PathStep {
  to: string;
  title: string;
  note: string;
}

export interface ReadingPath {
  id: "career" | "build";
  letter: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  steps: PathStep[];
}

export const PATHS: ReadingPath[] = [
  {
    id: "career",
    letter: "A",
    tag: "Path A · Career",
    title: "Become an AI engineer",
    desc: "For students and engineers switching in. What the role is, what it pays, and the order to learn things in.",
    cta: "Start the career path",
    steps: [
      { to: ROADMAP_PATH, title: "AI engineer roadmap", note: "Roadmap + PDF" },
      { to: "/blog/ai-engineer-salary", title: "AI engineer salary", note: "By level, company, city" },
      { to: "/blog/forward-deployed-ai-engineer", title: "Forward deployed engineer (FDE)", note: "Role, pay, jobs" },
      { to: "/blog/ai-engineer-interview-questions", title: "AI engineer interview questions", note: "With answers" },
      { to: "/blog/anthropic-certifications", title: "Anthropic certifications", note: "Which one to take" },
    ],
  },
  {
    id: "build",
    letter: "B",
    tag: "Path B · Build",
    title: "Ship AI systems that hold up",
    desc: "For engineers already building. Architecture, evaluation, security and the tools worth your time.",
    cta: "Start the build path",
    steps: [
      { to: "/blog/what-are-ai-agents", title: "What are AI agents?", note: "Start here" },
      { to: "/blog/retrieval-augmented-generation-guide", title: "RAG: the complete guide", note: "Retrieval" },
      { to: "/blog/ai-agent-observability", title: "Agent observability and evals", note: "Tracing, metrics" },
      { to: "/blog/ai-guardrails", title: "AI guardrails", note: "Security" },
      { to: "/blog/fallacies-of-llm-systems", title: "The fallacies of LLM systems", note: "Design review" },
    ],
  },
];

/** The step after `current` in whichever path contains it, if any. */
export const nextInPath = (current: string): { path: ReadingPath; step: PathStep; index: number } | null => {
  for (const path of PATHS) {
    const i = path.steps.findIndex((s) => s.to === current);
    if (i >= 0 && i < path.steps.length - 1) return { path, step: path.steps[i + 1], index: i + 1 };
  }
  return null;
};

// Editorial picks shown as "Reader favourites". Hand-maintained.
export const FAVOURITES: { to: string; title: string; sum: string; meta: string }[] = [
  {
    to: "/blog/forward-deployed-ai-engineer",
    title: "Forward Deployed Engineer (FDE): What the Role Is, Salary, and How to Get Hired",
    sum: "The role, pay from live postings, and where to apply.",
    meta: "Careers",
  },
  {
    to: ROADMAP_PATH,
    title: "AI Engineer Roadmap",
    sum: "Six stages from fundamentals to production, with the best resource for each.",
    meta: "Careers · Free PDF",
  },
  {
    to: "/blog/claude-code-vs-cursor",
    title: "Claude Code vs Cursor (2026): Which AI Coding Tool Should You Use?",
    sum: "Side-by-side table, pricing, and how to run one inside the other.",
    meta: "Tools",
  },
];

export const FREE_PDFS: { kind: string; title: string; desc: string }[] = [
  { kind: "Roadmap · PDF", title: "The AI Engineer Roadmap", desc: "Six stages, with the best resource for each." },
  { kind: "Cheat sheet · 1 page", title: "Fallacies of LLM Systems", desc: "Eight false assumptions and the fix for each." },
  { kind: "Cheat sheet · 1 page", title: "Conway's Law for AI", desc: "Who owns what in an AI system, by company size." },
  { kind: "Cheat sheet · 1 page", title: "Hermes Agent", desc: "Commands and setup on one page." },
];

// Posts whose social preview image (public/og-<slug>.png) doesn't exist yet.
// Gallery cards fall back to a text card for these.
const NO_OG = new Set([
  "jev-vs-ml-classification",
  "openai-models-hacked-hugging-face",
  "hermes-agent-nous-research-guide",
  "ollama-mac-local-ai-2025",
  "google-a2a",
  "what-makes-llms-agentic",
  "openai-gdpval",
]);

/** Infographic image for a post path like "/blog/foo", or null if it has none. */
export const infographicFor = (path: string): string | null => {
  const slug = path.split("/").filter(Boolean).pop() ?? "";
  if (!path.startsWith("/blog/") || NO_OG.has(slug)) return null;
  return `/og-${slug}.png`;
};

// Infographics shown drifting on the home page wall, two rows.
export const WALL_ROWS: string[][] = [
  ["/blog/fallacies-of-llm-systems", "/blog/ai-engineer-salary", "/blog/ai-agent-observability", "/blog/claude-code-vs-cursor", "/blog/rag-chunking-strategies", "/blog/what-is-an-agent-harness"],
  ["/blog/conways-law-ai", "/blog/forward-deployed-ai-engineer", "/blog/ai-guardrails", "/blog/openclaw-alternatives", "/blog/llm-routing", "/blog/ai-agent-sandboxing"],
];
