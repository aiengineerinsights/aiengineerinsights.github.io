
import { Clock, ArrowRight, TrendingUp, Zap, Database, Brain, Bot, ShieldAlert, Bug, Briefcase, DollarSign, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

// Single source of truth for the post feed, newest FIRST. The homepage grid,
// and the "Latest" banner both read from this, so adding a new post as the
// first item here updates every surface automatically.
export const insights = [
    {
      title: "Context Engineering for AI Coding: How GrapeRoot Cuts Claude Code Token Cost 30–45%",
      excerpt: "Context engineering — curating what's in the model's context window, not just the prompt — is the highest-leverage skill for AI-assisted coding in 2026. GrapeRoot is a local semantic-graph context engine that preloads the right code, cutting cost per prompt from $0.49 to $0.27.",
      readTime: "9 min read",
      date: "Aug 5, 2026",
      category: "AI Tooling",
      icon: Network,
      gradient: "from-purple-600 to-emerald-700",
      link: "/blog/context-engineering-graperoot"
    },
    {
      title: "AI Engineer Salary in 2026: What US Engineers Actually Earn, by Level, Company, and City",
      excerpt: "US AI engineers earn roughly $100K–$250K in 2026 — and $850K+ median at the frontier labs. A fully sourced breakdown across Glassdoor, Levels.fyi, ZipRecruiter, and BLS data: by experience level, by company, by city, and what actually moves the number.",
      readTime: "11 min read",
      date: "Aug 3, 2026",
      category: "AI Engineering Careers",
      icon: DollarSign,
      gradient: "from-emerald-600 to-cyan-800",
      link: "/blog/ai-engineer-salary"
    },
    {
      title: "The Forward-Deployed AI Engineer: What the Role Actually Is, What It Pays, and Whether You Should Go For It",
      excerpt: "OpenAI, Anthropic, and Google DeepMind have all built teams around Palantir's forward-deployed engineer model. What the job actually is, how it compares to adjacent roles, what it pays, and how to break in.",
      readTime: "10 min read",
      date: "Jul 29, 2026",
      category: "AI Engineering Careers",
      icon: Briefcase,
      gradient: "from-cyan-600 to-indigo-800",
      link: "/blog/forward-deployed-ai-engineer"
    },
    {
      title: "GitHub's Bug Bounty Overhaul: What \"AI Slop\" Vulnerability Reports Are Doing to Security Research",
      excerpt: "GitHub is restructuring its bug bounty program around an invite-only VIP tier and a submission cap for new researchers — the latest program to buckle under a flood of AI-generated vulnerability reports. What it means for engineers.",
      readTime: "9 min read",
      date: "Jul 24, 2026",
      category: "Agentic Security",
      icon: Bug,
      gradient: "from-orange-600 to-red-800",
      link: "/blog/github-bug-bounty-ai-slop"
    },
    {
      title: "OpenAI's Models Broke Out and Hacked Hugging Face During a Cyber Test",
      excerpt: "OpenAI models escaped a sandbox during an internal evaluation, chained a zero-day, and tried to steal the benchmark answers from Hugging Face's production database. Past the 'rogue AI' headlines, a concrete lesson in agentic security.",
      readTime: "8 min read",
      date: "Jul 22, 2026",
      category: "AI Security",
      icon: ShieldAlert,
      gradient: "from-red-600 to-purple-800",
      link: "/blog/openai-models-hacked-hugging-face"
    },
    {
      title: "Hermes Agent by Nous Research: The Self-Improving Open-Source AI Agent, Explained",
      excerpt: "What is Hermes AI, how do you download the desktop app on Mac, Windows, or Linux, and what makes its architecture worth studying? An engineer's guide to the MIT-licensed agent framework with 219k GitHub stars.",
      readTime: "9 min read",
      date: "Jul 22, 2026",
      category: "AI Agents",
      icon: Bot,
      gradient: "from-purple-600 to-purple-800",
      link: "/blog/hermes-agent-nous-research-guide"
    },
    {
      title: "Ollama on Mac: The Perfect Local AI Stack for 2025",
      excerpt: "Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — you just need to unlock it with Ollama and Mac Silicon's unified memory architecture.",
      readTime: "5 min read",
      date: "Aug 5, 2025",
      category: "Local AI",
      icon: Brain,
      gradient: "from-purple-600 to-purple-800",
      link: "/blog/ollama-mac-local-ai-2025"
    },
    {
      title: "Architectural Insights: A2A as a Protocol for Peer AI Agents",
      excerpt: "A deep dive into Google's open Agent2Agent (A2A) standard—why its seemingly simple choices matter and what they mean for real‑world multi‑agent systems.",
      readTime: "15 min read",
      date: "Aug 5, 2025",
      category: "Agentic AI",
      icon: TrendingUp,
      gradient: "from-primary to-primary-glow",
      link: "/blog/google-a2a"
    },
    {
      title: "What Makes LLMs Agentic?",
      excerpt: "Exploring the key capabilities of tool calling, reasoning, and advanced coding, that makes LLMs agentic in nature.",
      readTime: "12 min read",
      date: "Aug 26, 2025",
      category: "Agentic AI",
      icon: Database,
      gradient: "from-primary to-primary-glow",
      link: "/blog/what-makes-llms-agentic"
    },
    {
      title: "OpenAI GDPval: The Evaluation of AI's Economic Potential",
      excerpt: "This post explores the methodology behind GDPval, its key findings, and what they might signal for the future of knowledge work. And the picture GDPval paints is far more interesting than any exam score.",
      readTime: "10 min read",
      date: "Oct 14, 2025",
      category: "AI Evaluation",
      icon: Database,
      gradient: "from-primary to-primary-glow",
      link: "/blog/openai-gdpval"
    }
];

const LatestInsights = () => {
  const navigate = useNavigate();

  const handleViewAllInsights = () => {
    navigate('/blogs');
  };

  return (
    <section id="blogs" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="bg-gradient-hero bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fresh perspectives on AI engineering challenges, solutions, and industry trends from the trenches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {insights.map((insight, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden">
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${insight.gradient} rounded-full px-3 py-1`}>
                    <insight.icon className="h-4 w-4 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">{insight.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {insight.readTime}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {insight.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{insight.date}</span>
                  <Link to={insight.link} onClick={() => window.scrollTo(0, 0)}>
                    <Button variant="ghost" size="sm" className="group/btn">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group" onClick={handleViewAllInsights}>
            View All Insights
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
