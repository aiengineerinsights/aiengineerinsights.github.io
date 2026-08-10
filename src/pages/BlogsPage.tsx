
import { useState } from "react";
import { Clock, Search, Filter, TrendingUp, Zap, Database, ArrowRight, X, Brain, Bot, ShieldAlert, Bug, Settings, Briefcase, DollarSign, Network, Award, AlertTriangle, GitCompare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 19,
      title: "How to Install Hermes Agent (macOS, Windows, Linux, pip, Docker)",
      excerpt: "The fastest way to install Hermes Agent, step by step, for every method: the one-line macOS/Linux script, the native Windows PowerShell installer (and WSL2), pip for Python users, and Docker. Plus first-run setup — pick a model, start the TUI — and fixes for the common install errors.",
      readTime: "8 min read",
      date: "Aug 10, 2026",
      category: "AI Agents",
      icon: Download,
      gradient: "from-purple-600 to-fuchsia-700",
      link: "/blog/how-to-install-hermes-agent"
    },
    {
      id: 18,
      title: "Hermes Agent vs OpenClaw: Which Open-Source AI Agent Should You Run?",
      excerpt: "Both are MIT-licensed, self-hosted AI agents. OpenClaw is a gateway/control plane built for breadth — 20+ messaging channels and a marketplace of ready-made skills. Hermes Agent is an agent runtime built to learn, writing its own skills as it works, with stronger security defaults. A sourced, side-by-side comparison and a clear pick-by-need verdict.",
      readTime: "11 min read",
      date: "Aug 10, 2026",
      category: "AI Agents",
      icon: GitCompare,
      gradient: "from-purple-600 to-blue-700",
      link: "/blog/hermes-agent-vs-openclaw"
    },
    {
      id: 17,
      title: "Why Good Engineers Fail the Claude Certified Architect Exam: 11 Traps to Avoid",
      excerpt: "On the CCA-F exam the wrong answers are designed to sound like best-practice engineering. The 11 traps — six of judgment, five technical — with the correct pattern for each, from Anthropic's own docs.",
      readTime: "10 min read",
      date: "Aug 7, 2026",
      category: "AI Engineering Careers",
      icon: AlertTriangle,
      gradient: "from-rose-600 to-purple-800",
      link: "/blog/claude-certified-architect-exam-traps"
    },
    {
      id: 16,
      title: "Claude Certified Architect (CCA) Exam: Everything You Need to Know (2026)",
      excerpt: "Anthropic's first technical certification (CCAR-F): ~60 scenario-based questions, 120 minutes, closed-book via Pearson VUE, pass at 720/1000, ~$125 per attempt. The 5 domains and their weights, the registration path, honest pros and cons, and the prep tactics real candidates say worked.",
      readTime: "11 min read",
      date: "Aug 7, 2026",
      category: "AI Engineering Careers",
      icon: Award,
      gradient: "from-purple-600 to-orange-600",
      link: "/blog/claude-certified-architect-exam"
    },
    {
      id: 15,
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
      id: 13,
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
      id: 12,
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
      id: 11,
      title: "14 MLOps Best Practices, Ordered by Impact — With Examples of When Each One Saves You",
      excerpt: "Most MLOps advice is a flat checklist. This is an impact-ordered one: versioning, monitoring, CI/CD, eval gates, safe rollouts, and more — each with when it matters most and a concrete example of the failure it prevents.",
      readTime: "11 min read",
      date: "Jul 25, 2026",
      category: "MLOps",
      icon: Settings,
      gradient: "from-purple-600 to-purple-800",
      link: "/blog/mlops-best-practices"
    },
    {
      id: 10,
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
      id: 9,
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
      id: 8,
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
      id: 1,
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
      id: 2,
      title: "A2A Protocol: Subtle Design Decisions in Agent Communication",
      excerpt: "A deep dive into Google's open Agent2Agent (A2A) standard—why its seemingly simple choices matter and what they mean for real‑world multi‑agent systems.",
      readTime: "15 min read",
      date: "Aug 5, 2025",
      category: "Agentic AI",
      icon: TrendingUp,
      gradient: "from-primary to-primary-glow",
      link: "/blog/google-a2a"
    },
    {
      id: 3,
      title: "What Makes LLMs Agentic?",
      excerpt: "Exploring the key capabilities of tool calling, reasoning, and advanced coding, that makes LLMs agentic in nature.",
      readTime: "7 min read",
      date: "Aug 18, 2025",
      category: "Agentic AI",
      icon: Zap,
      gradient: "from-primary to-primary-glow",
      link: "/blog/what-makes-llms-agentic"
    },
    {
      id: 4,
      title: "OpenAI GDPval: The Evaluation of AI's Economic Potential",
      excerpt: "This post explores the methodology behind GDPval, its key findings, and what they might signal for the future of knowledge work. And the picture GDPval paints is far more interesting than any exam score.",
      readTime: "10 min read",
      date: "Oct 14, 2025",
      category: "AI Evaluation",
      icon: Zap,
      gradient: "from-primary to-primary-glow",
      link: "/blog/openai-gdpval"
    },
    {
      id: 5,
      title: "12 LLM Deployment Challenges — And How to Handle Each One in Production",
      excerpt: "Getting an LLM to work in a demo is easy; making it fast, affordable, safe, and consistently correct under real traffic is the hard part. The challenges that actually bite — with when each hits and how to handle it.",
      readTime: "12 min read",
      date: "Jul 25, 2026",
      category: "LLM Deployment",
      icon: Database,
      gradient: "from-blue-600 to-purple-800",
      link: "/blog/llm-deployment-challenges"
    },
    {
      id: 6,
      title: "Building Robust AI Data Pipelines: 12 Practices, Ordered by Impact",
      excerpt: "A robust AI data pipeline comes from gates and guarantees — validation, idempotency, contracts, and observability — not a fancier transform. The 12 practices that keep the data feeding your models correct, each with when it matters and an example.",
      readTime: "11 min read",
      date: "Jul 26, 2026",
      category: "Data Engineering",
      icon: Database,
      gradient: "from-amber-600 to-purple-800",
      link: "/blog/building-robust-ai-data-pipelines"
    }
  ];

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              All <span className="bg-gradient-hero bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our complete collection of AI engineering insights, best practices, and real-world experiences.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Filter Button */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredPosts.length} of {blogPosts.length} articles
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden">
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${post.gradient} rounded-full px-3 py-1`}>
                          <post.icon className="h-4 w-4 text-primary-foreground" />
                          <span className="text-sm font-medium text-primary-foreground">{post.category}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <Link to={post.link}>
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogsPage;
