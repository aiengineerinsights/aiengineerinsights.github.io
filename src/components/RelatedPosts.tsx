import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

const SITE = "https://aiengineerinsights.com";

const ALL_POSTS = [
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
    title: "What Makes LLMs Agentic?",
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

const RelatedPosts = ({ current }: { current: string }) => {
  const currentPost = ALL_POSTS.find((p) => p.slug === current);
  const others = ALL_POSTS.filter((p) => p.slug !== current);
  // Same-tag posts first, then the rest, capped at three
  const currentTag = currentPost?.tag;
  const related = [
    ...others.filter((p) => p.tag === currentTag),
    ...others.filter((p) => p.tag !== currentTag),
  ].slice(0, 3);

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
