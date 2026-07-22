import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ALL_POSTS = [
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
    title: "MLOps Best Practices: From Prototype to Production",
    tag: "MLOps",
  },
  {
    slug: "/blog/llm-deployment-challenges",
    title: "LLM Deployment Challenges and Solutions",
    tag: "MLOps",
  },
  {
    slug: "/blog/building-robust-ai-data-pipelines",
    title: "Building Robust AI Data Pipelines",
    tag: "Data Engineering",
  },
];

const RelatedPosts = ({ current }: { current: string }) => {
  const others = ALL_POSTS.filter((p) => p.slug !== current);
  // Same-tag posts first, then the rest, capped at three
  const currentTag = ALL_POSTS.find((p) => p.slug === current)?.tag;
  const related = [
    ...others.filter((p) => p.tag === currentTag),
    ...others.filter((p) => p.tag !== currentTag),
  ].slice(0, 3);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
