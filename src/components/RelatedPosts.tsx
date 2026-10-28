import { Link } from "@/components/SiteLink";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

const SITE = "https://aiengineerinsights.com";

const ALL_POSTS = [
  {
    slug: "/blog/agent-zero-vs-hermes-agent",
    title: "Agent Zero vs Hermes Agent vs OpenClaw (2026): Which Should You Run?",
    tag: "AI Agents",
  },
  {
    slug: "/blog/ai-agent-sandboxing",
    title: "AI Agent Sandboxing Explained: Process Sandboxes vs Containers vs gVisor vs microVMs (2026)",
    tag: "Agentic Security",
  },
  {
    slug: "/blog/claude-managed-agents",
    title: "Claude Managed Agents Explained: What It Is, How It Works, Pricing, and When to Use It (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/claude-code-skills",
    title: "Claude Code Skills: What They Are, the Best Ones, and How to Create Your Own (2026)",
    tag: "AI Tools",
  },
  {
    slug: "/blog/what-is-an-agent-harness",
    title: "What Is an Agent Harness? Harness Engineering Explained (and How Google's Harness\u00b2 Optimizes One)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/ai-agent-memory",
    title: "AI Agent Memory: Short-Term vs Long-Term, and How to Actually Implement It (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/anthropic-certifications",
    title: "Anthropic Certifications (2026): All 4 Claude Exams, Costs, Eligibility, and the Free Anthropic Academy Courses",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/ai-guardrails",
    title: "AI Guardrails Explained: Input, Output, and Tool-Call Guardrails for LLM Apps and Agents (NeMo, Guardrails AI, Llama Guard, Jev) — 2026",
    tag: "AI Security",
  },
  {
    slug: "/blog/mcp-server-trust-permissions",
    title: "MCP Server Trust: How to Vet and Scope AI Agent Permissions Before You Connect One",
    tag: "Agentic Security",
  },
  {
    slug: "/blog/ai-agent-security-prompt-injection",
    title: "AI Coding Agent Security: How Prompt Injection Leads to Credential Theft (and How to Stop It)",
    tag: "AI Security",
  },
  {
    slug: "/blog/what-is-mcp",
    title: "What Is MCP (Model Context Protocol)? A Plain-English Guide for AI Engineers (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/ai-engineer-interview-questions",
    title: "AI Engineer Interview Questions (2026): What Gets Asked, Round by Round",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/agent-runtimes-explained",
    title: "AI Agent Runtimes Explained: The Production Layer Every Agent Framework Is Missing (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/multi-agent-orchestration-patterns",
    title: "Multi-Agent Orchestration Patterns: Sequential, Concurrent, Handoff, and Hierarchical Explained (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/llm-routing",
    title: "LLM Routing Explained: How an LLM Router Picks the Right Model (RouteLLM, Semantic Router, Jev, AI Gateways) — 2026",
    tag: "AI Models",
  },
  {
    slug: "/blog/jev-vs-ml-classification",
    title: "Jev vs LLMs vs Traditional ML: The Right Way to Classify in 2026",
    tag: "AI Models",
  },
  {
    slug: "/blog/what-is-jev",
    title: "What Is Jev? TypeSafe's System One Decision Model, Explained (2026)",
    tag: "AI Models",
  },
  {
    slug: "/blog/jev-vs-llm",
    title: "Jev vs LLMs: When to Use a Calibrated Decision Model (2026)",
    tag: "AI Models",
  },
  {
    slug: "/blog/how-to-use-jev",
    title: "How to Use Jev: A Practical Guide + Use Cases for AI Engineers (2026)",
    tag: "AI Models",
  },
  {
    slug: "/blog/open-source-ai-agent-frameworks",
    title: "Open-Source AI Agent Frameworks Compared: LangGraph vs CrewAI vs AutoGen vs Pydantic AI (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/retrieval-augmented-generation-guide",
    title: "Retrieval-Augmented Generation (RAG): The Complete Guide for AI Engineers",
    tag: "RAG & Retrieval",
  },
  {
    slug: "/blog/vector-database-for-rag",
    title: "Vector Databases for RAG: How to Choose One and Wire It In (2026)",
    tag: "RAG & Retrieval",
  },
  {
    slug: "/blog/rag-chunking-strategies",
    title: "RAG Chunking Strategies: Fixed-Size vs Recursive vs Semantic",
    tag: "RAG & Retrieval",
  },
  {
    slug: "/blog/embedding-model-for-rag",
    title: "How to Choose an Embedding Model for RAG (2026 Guide)",
    tag: "RAG & Retrieval",
  },
  {
    slug: "/blog/rag-evaluation-metrics",
    title: "RAG Evaluation Metrics: Faithfulness, Context Precision/Recall Explained",
    tag: "RAG & Retrieval",
  },
  {
    slug: "/blog/hermes-claude-code-orchestration",
    title: "Hermes + Claude Code: Using Hermes as an Orchestrator for Autonomous Coding (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: Which One Actually Solves Your Problem (2026 Decision Guide)",
    tag: "RAG & Retrieval",
  },
  {
    slug: "/blog/what-are-ai-agents",
    title: "AI Agents Explained: Definition, Types, Architecture, and Real Examples (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/mcp-vs-api",
    title: "MCP vs API: What the Model Context Protocol Actually Is (and When to Use It)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/best-ai-coding-agents",
    title: "The Best AI Coding Agents in 2026 (Claude Code vs Cursor vs Copilot, Ranked by Fit)",
    tag: "AI Tooling",
  },
  {
    slug: "/blog/ai-engineer-skills",
    title: "AI Engineer Skills in 2026: The Complete Checklist (Technical + Soft), by Seniority",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/how-to-become-an-ai-engineer",
    title: "How to Become an AI Engineer in 2026: A Practical, Step-by-Step Roadmap",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/ai-detectors-vs-humanizers",
    title: "AI Detectors vs. \"Humanizers\": Which Actually Work? (GPTZero, Turnitin & Watermark Removers, Ranked)",
    tag: "AI Security",
  },
  {
    slug: "/blog/does-claude-watermark-text",
    title: "Does Claude Watermark Its Text? AI Text Watermarking (Claude, ChatGPT & SynthID), Explained",
    tag: "AI Security",
  },
  {
    slug: "/blog/how-to-install-hermes-agent",
    title: "How to Install Hermes Agent (macOS, Windows, Linux, pip, Docker)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/hermes-agent-skills",
    title: "Hermes Agent Skills: How Self-Improving Skills Actually Work",
    tag: "AI Agents",
  },
  {
    slug: "/blog/hermes-agent-desktop-web-ui",
    title: "Hermes Agent Desktop App & Web UI: The Visual Way to Run Your Agent",
    tag: "AI Agents",
  },
  {
    slug: "/blog/hermes-agent-models",
    title: "Which LLM Should You Run With Hermes Agent? Models, Providers, and Nous Portal",
    tag: "AI Agents",
  },
  {
    slug: "/blog/hermes-agent-security",
    title: "Is Hermes Agent Safe? Its Security Model and Sandboxing, Explained",
    tag: "Agentic Security",
  },
  {
    slug: "/blog/hermes-agent-alternatives",
    title: "The Best Hermes Agent Alternatives in 2026 (Open-Source AI Agents Compared)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/hermes-agent-troubleshooting",
    title: "Hermes Agent Troubleshooting: Fixing the Most Common Errors",
    tag: "AI Agents",
  },
  {
    slug: "/blog/hermes-agent-vs-openclaw",
    title: "Hermes Agent vs OpenClaw: Which Open-Source AI Agent Should You Run?",
    tag: "AI Agents",
  },
  {
    slug: "/blog/claude-certified-architect-exam-traps",
    title: "Why Good Engineers Fail the Claude Certified Architect Exam: 11 Traps to Avoid",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/claude-certified-architect-exam",
    title: "Claude Certified Architect (CCA) Exam: Everything You Need to Know",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/context-engineering-graperoot",
    title: "Context Engineering for AI Coding: How GrapeRoot Cuts Token Cost 30–45%",
    tag: "AI Tooling",
  },
  {
    slug: "/blog/ai-engineer-salary",
    title: "AI Engineer Salary in 2026: What US Engineers Actually Earn, by Level, Company, and City",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/forward-deployed-ai-engineer",
    title: "The Forward-Deployed AI Engineer: Role, Pay, and How to Break In",
    tag: "AI Engineering Careers",
  },
  {
    slug: "/blog/github-bug-bounty-ai-slop",
    title: "GitHub's Bug Bounty Overhaul: What \"AI Slop\" Vulnerability Reports Are Doing to Security Research",
    tag: "Agentic Security",
  },
  {
    slug: "/blog/openai-models-hacked-hugging-face",
    title: "OpenAI's Models Broke Out and Hacked Hugging Face During a Cyber Test",
    tag: "AI Security",
  },
  {
    slug: "/blog/hermes-agent-nous-research-guide",
    title: "Hermes Agent by Nous Research: The Self-Improving Open-Source AI Agent, Explained",
    tag: "AI Agents",
  },
  {
    slug: "/blog/ollama-mac-local-ai-2025",
    title: "Ollama on Mac: The Perfect Local AI Stack for 2025",
    tag: "Local AI",
  },
  {
    slug: "/blog/google-a2a",
    title: "Architectural Insights: A2A as a Protocol for Peer AI Agents",
    tag: "AI Agents",
  },
  {
    slug: "/blog/what-makes-llms-agentic",
    title: "What Is Agentic AI? What Makes LLMs Agentic (2026)",
    tag: "AI Agents",
  },
  {
    slug: "/blog/openai-gdpval",
    title: "OpenAI GDPval: The Evaluation of AI's Economic Potential",
    tag: "Evaluation",
  },
  {
    slug: "/blog/mlops-best-practices",
    title: "14 MLOps Best Practices, Ordered by Impact",
    tag: "MLOps",
  },
  {
    slug: "/blog/llm-deployment-challenges",
    title: "12 LLM Deployment Challenges — And How to Handle Each",
    tag: "LLM Deployment",
  },
  {
    slug: "/blog/building-robust-ai-data-pipelines",
    title: "Building Robust AI Data Pipelines: 12 Practices",
    tag: "Data Engineering",
  },
];

// Hand-picked related posts for cluster pages, so hubs and spokes link to each
// other deliberately (e.g. the Hermes and RAG clusters, career pages).
const CURATED: Record<string, string[]> = {
  "/blog/hermes-agent-nous-research-guide": ["/blog/hermes-agent-alternatives", "/blog/how-to-install-hermes-agent", "/blog/hermes-agent-troubleshooting"],
  "/blog/how-to-install-hermes-agent": ["/blog/hermes-agent-troubleshooting", "/blog/hermes-agent-models", "/blog/hermes-agent-alternatives"],
  "/blog/hermes-agent-troubleshooting": ["/blog/how-to-install-hermes-agent", "/blog/hermes-agent-desktop-web-ui", "/blog/hermes-agent-alternatives"],
  "/blog/hermes-agent-desktop-web-ui": ["/blog/hermes-agent-troubleshooting", "/blog/hermes-agent-alternatives", "/blog/agent-zero-vs-hermes-agent"],
  "/blog/hermes-agent-vs-openclaw": ["/blog/agent-zero-vs-hermes-agent", "/blog/hermes-agent-alternatives", "/blog/hermes-agent-nous-research-guide"],
  "/blog/agent-zero-vs-hermes-agent": ["/blog/hermes-agent-alternatives", "/blog/hermes-agent-vs-openclaw", "/blog/ai-agent-sandboxing"],
  "/blog/best-ai-coding-agents": ["/blog/claude-code-skills", "/blog/hermes-claude-code-orchestration", "/blog/what-is-an-agent-harness"],
  "/blog/claude-managed-agents": ["/blog/agent-runtimes-explained", "/blog/what-is-an-agent-harness", "/blog/claude-code-skills"],
  "/blog/claude-code-skills": ["/blog/best-ai-coding-agents", "/blog/hermes-agent-skills", "/blog/anthropic-certifications"],
  "/blog/ai-engineer-salary": ["/blog/ai-engineer-interview-questions", "/blog/how-to-become-an-ai-engineer", "/blog/ai-engineer-skills"],
  "/blog/how-to-become-an-ai-engineer": ["/blog/ai-engineer-interview-questions", "/blog/ai-engineer-skills", "/blog/anthropic-certifications"],
  "/blog/embedding-model-for-rag": ["/blog/rag-chunking-strategies", "/blog/vector-database-for-rag", "/blog/rag-evaluation-metrics"],
  "/blog/rag-chunking-strategies": ["/blog/embedding-model-for-rag", "/blog/vector-database-for-rag", "/blog/rag-evaluation-metrics"],
  "/blog/vector-database-for-rag": ["/blog/embedding-model-for-rag", "/blog/rag-chunking-strategies", "/blog/rag-vs-fine-tuning"],
  "/blog/rag-evaluation-metrics": ["/blog/rag-chunking-strategies", "/blog/embedding-model-for-rag", "/blog/rag-vs-fine-tuning"],
  "/blog/rag-vs-fine-tuning": ["/blog/retrieval-augmented-generation-guide", "/blog/vector-database-for-rag", "/blog/rag-evaluation-metrics"],
  "/blog/retrieval-augmented-generation-guide": ["/blog/rag-vs-fine-tuning", "/blog/embedding-model-for-rag", "/blog/vector-database-for-rag"],
};

const RelatedPosts = ({ current }: { current: string }) => {
  const currentPost = ALL_POSTS.find((p) => p.slug === current);
  const curated = (CURATED[current] ?? [])
    .map((slug) => ALL_POSTS.find((p) => p.slug === slug))
    .filter((p): p is (typeof ALL_POSTS)[number] => Boolean(p));
  // Otherwise take the posts that follow this one within its tag (wrapping
  // around), so every post gets linked from its neighbours instead of the
  // newest posts collecting all the links. Fill from other tags if needed.
  const sameTag = ALL_POSTS.filter((p) => p.tag === currentPost?.tag);
  const at = sameTag.findIndex((p) => p.slug === current);
  const neighbours = at < 0 ? sameTag : [...sameTag.slice(at + 1), ...sameTag.slice(0, at)];
  const related = [...curated, ...neighbours, ...ALL_POSTS]
    .filter((p, i, arr) => p.slug !== current && arr.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 3);

  // Canonical URL for this post (trailing slash, matching how it's served).
  const shareUrl = `${SITE}${current}/`;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
      {/* Share block, aligned under the article's reading column (the empty
          spacer mirrors the TOC sidebar so it lines up with the post text). */}
      <div className="mb-12 flex flex-col lg:flex-row lg:gap-8">
        <div className="hidden lg:block w-48 pr-6 shrink-0" aria-hidden="true" />
        <div className="flex-1 lg:max-w-4xl">
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-semibold">Found this useful? Share it.</p>
            <ShareButtons title={currentPost?.title ?? "AI Engineer Insights"} url={shareUrl} />
          </div>
        </div>
      </div>
      {/* Sitewide newsletter CTA — slim link to the /newsletter hub (keeps the
          heavier signup form off every post while still capturing intent). */}
      <div className="mb-12 flex flex-col lg:flex-row lg:gap-8">
        <div className="hidden lg:block w-48 pr-6 shrink-0" aria-hidden="true" />
        <div className="flex-1 lg:max-w-4xl">
          <Link
            to="/newsletter"
            className="group flex flex-col gap-3 rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-base m-0">Get The AI Engineer's Brief</p>
                <p className="text-sm text-muted-foreground m-0">One sharp AI-engineering email a week — plus the free roadmap PDF.</p>
              </div>
            </div>
            <span className="inline-flex items-center text-sm font-medium text-primary shrink-0">
              Subscribe
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {related.map((post) => (
          <Link key={post.slug} to={post.slug} className="group">
            <Card className="h-full p-5 transition-shadow hover:shadow-lg">
              <span className="text-xs font-medium text-muted-foreground">{post.tag}</span>
              <h3 className="mt-2 font-semibold leading-snug group-hover:text-primary">
                {post.title}
              </h3>
              <span className="mt-3 inline-flex items-center text-sm text-primary">
                Read article
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
