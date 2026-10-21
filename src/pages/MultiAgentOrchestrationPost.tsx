import { ArrowLeft, Clock, User, Calendar, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import MultiAgentOrchestrationHeroDiagram from "@/components/MultiAgentOrchestrationHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const patternsTable = [
  { pattern: "Sequential", how: "Agents run one after another in a fixed order; each consumes the previous agent's output.", bestFor: "Pipelines with a known, linear order of steps (draft → review → format)" },
  { pattern: "Concurrent", how: "The same task fans out to several agents in parallel, then results are merged (fan-out/fan-in).", bestFor: "Independent sub-tasks or getting several perspectives on one input" },
  { pattern: "Handoff", how: "One agent transfers control to another mid-conversation based on context, without a fixed script.", bestFor: "Support/triage flows where the right specialist isn't known up front" },
  { pattern: "Group chat", how: "Several agents share one conversation and decide amongst themselves who responds next.", bestFor: "Debate, brainstorming, or peer-review style collaboration" },
  { pattern: "Hierarchical (orchestrator-worker)", how: "A manager agent plans and dispatches tasks to specialized workers, then assembles their results.", bestFor: "Complex tasks that decompose into distinct sub-tasks of unknown shape ahead of time" },
];

const frameworkTable = [
  { fw: "LangGraph", model: "Graph-based state machine", notes: "Explicit nodes/edges give the most control over routing and retries; steepest learning curve." },
  { fw: "Microsoft Agent Framework", model: "Built-in sequential, concurrent, handoff, group chat, Magentic orchestrations", notes: "Successor to AutoGen + Semantic Kernel; deep Microsoft 365/Copilot Studio integration." },
  { fw: "CrewAI", model: "Role-based crews", notes: "Fastest to a working prototype — a handful of lines for a basic multi-agent workflow." },
  { fw: "Google ADK", model: "Hierarchical agent trees", notes: "Google's agent development kit; integrates with Gemini tooling and A2A for cross-vendor agents." },

];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is multi-agent orchestration?",
    a: "Multi-agent orchestration is the layer that coordinates two or more AI agents working on the same overall task — deciding which agent runs when, what each one sees, and how their outputs combine. It sits above a single agent's own reasoning loop: each agent still plans, uses tools, and observes results, but the orchestration layer controls the handoffs, parallelism, and aggregation between agents.",
  },
  {
    q: "What are the main multi-agent orchestration patterns?",
    a: "Microsoft's Agent Framework documentation names five built-in orchestrations: sequential (agents run in a fixed pipeline order), concurrent (the same task fans out to multiple agents and results fan back in), handoff (control transfers between agents based on context), group chat (agents share one conversation and take turns), and Magentic/hierarchical (a manager agent plans and dispatches to workers). Most production systems combine two or more of these rather than picking just one.",
  },
  {
    q: "What's the difference between orchestration and a single agent's tool loop?",
    a: "A single agent's loop (reason, act, observe, repeat) happens inside one agent working with one set of tools. Orchestration is the layer above that: it decides which of several agents runs next, routes context between them, and merges their separate outputs. You can have a sophisticated single-agent loop with no orchestration at all, or simple agents coordinated by rich orchestration — they're independent concerns.",
  },
  {
    q: "Which framework should I use for multi-agent orchestration?",
    a: "Pick by how much control you need versus how fast you want to ship. LangGraph gives the most explicit control via a graph of nodes and edges, at the cost of more setup. CrewAI gets a role-based multi-agent workflow running in the least code. Microsoft Agent Framework (the successor to AutoGen and Semantic Kernel) ships sequential, concurrent, handoff, group-chat, and Magentic orchestrations out of the box. Google's Agent Development Kit (ADK) favors hierarchical agent trees and pairs with the A2A protocol for cross-vendor agent calls.",
  },
  {
    q: "When should I use hierarchical orchestration instead of a single bigger agent?",
    a: "Use hierarchical orchestration — an orchestrator planning and dispatching to specialized workers — when a task decomposes into sub-tasks whose shape you don't know ahead of time, or when different sub-tasks need different tools, context, or models. Anthropic's own multi-agent research system uses an orchestrator-worker pattern for exactly this: a lead agent plans and spins up subagents to search in parallel, then synthesizes their findings. For tasks with a known, fixed sequence of steps, a plain sequential pipeline is simpler and cheaper to run.",
  },
  {
    q: "What goes wrong in multi-agent systems?",
    a: "The common failure modes are context loss at handoffs (the next agent doesn't see what mattered from the previous step), runaway cost and latency from agents calling each other in loops, and non-deterministic routing that makes debugging hard. Microsoft's own guidance recommends starting with the simplest pattern (sequential) that solves the problem and adding concurrency, handoff, or hierarchy only once a single agent or a fixed pipeline demonstrably can't handle the task.",
  },
];

const MultiAgentOrchestrationPost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />

          <div className="flex-1 w-full max-w-none lg:max-w-4xl">
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 sm:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Insights</span>
              </Button>
            </Link>

            <header className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-800 rounded-full px-3 py-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Multi-Agent Orchestration Patterns: Sequential, Concurrent, Handoff, and Hierarchical Explained (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Multi-agent orchestration</strong> is the layer that decides which agent runs when, what context
                it sees, and how multiple agents' outputs combine — separate from any single agent's own plan-act-observe
                loop. This guide covers the five patterns in production use in 2026 (sequential, concurrent, handoff,
                group chat, and hierarchical/orchestrator-worker), when to reach for each one, how the major frameworks
                implement them, and the failure modes to watch for.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Technical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 19, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <MultiAgentOrchestrationHeroDiagram />

            <div className="bg-muted/50 border border-border rounded-lg p-4 sm:p-6 mb-8 sm:mb-12">
              <p className="font-semibold mb-2 text-sm sm:text-base">TL;DR</p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Multi-agent orchestration ≠ a single agent's tool loop — it's the coordination layer above it. Five
                patterns cover almost everything shipped in 2026: sequential (fixed pipeline), concurrent (fan-out/fan-in),
                handoff (context-based transfer), group chat (shared turn-taking), and hierarchical (an orchestrator
                dispatching to workers). Start with the simplest pattern that solves the problem — most teams over-reach
                for hierarchy before they need it.
              </p>
            </div>

            <ExploreWithAI variant="strip" path="/blog/multi-agent-orchestration-patterns" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is multi-agent orchestration?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A single agent already runs a loop — reason, act, observe, repeat — using one model and one set of
                  tools. <strong>Multi-agent orchestration is what you add once more than one agent works on the same
                  overall task:</strong> a layer that decides which agent runs next, what each one sees of the shared
                  task state, and how their separate outputs get combined into one result. Microsoft's Azure
                  Architecture Center frames it as addressing "the unique challenges of coordinating autonomous
                  components in AI-driven workloads" — distinct from classic distributed-systems patterns because the
                  components reason and can produce nondeterministic outputs (
                  <RefLink href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns">Microsoft — AI Agent Orchestration Patterns</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you haven't read the basics of a single agent's loop yet, start with our{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agents explained guide</Link>{" "}
                  — orchestration builds on top of that loop, it doesn't replace it. For how agents remember things
                  across steps and sessions, see our guide to{" "}
                  <Link to="/blog/ai-agent-memory" className="text-primary hover:underline">AI agent memory</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="patterns" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The five orchestration patterns</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Microsoft's Agent Framework documentation and Azure Architecture Center both converge on the same
                  core set, and the research literature on event-driven multi-agent systems describes the same handful
                  of coordination topologies under slightly different names (
                  <RefLink href="https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations">Microsoft Learn — Workflow Orchestrations in Agent Framework</RefLink>,{" "}
                  <RefLink href="https://arxiv.org/pdf/2606.20058">arXiv — Autonomous Event-Driven Multi-Agent Orchestration for Enterprise AI</RefLink>):
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Pattern</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How it works</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {patternsTable.map((r) => (
                            <TableRow key={r.pattern}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.pattern}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.how}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.bestFor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The sequential pattern is also called a pipeline or prompt-chaining; concurrent is also called
                  fan-out/fan-in, parallel, or scatter-gather; and hierarchical is the same shape Anthropic calls the{" "}
                  <RefLink href="https://www.anthropic.com/engineering/building-effective-agents">orchestrator-workers workflow</RefLink>{" "}
                  in <em>Building Effective Agents</em> — a central agent dynamically breaks down a task and delegates
                  pieces to worker agents it calls in parallel.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, RAG, LLMs, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="which-pattern" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which pattern should you pick?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Both Microsoft's guidance and Anthropic's engineering writeup land on the same advice from different
                  angles: start with the simplest pattern that solves the problem, and only add parallelism or
                  hierarchy once a single agent or a fixed pipeline demonstrably can't handle the task. A few concrete
                  rules of thumb:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Known, linear steps</strong> (draft → fact-check → format) → sequential. No coordination overhead, easy to debug.</li>
                    <li>• <strong>Independent sub-tasks or you want several takes</strong> (research five competitors, or get three model opinions) → concurrent fan-out/fan-in.</li>
                    <li>• <strong>You don't know which specialist should handle a request until you see it</strong> (support triage: billing vs. technical vs. sales) → handoff.</li>
                    <li>• <strong>You want agents to critique or build on each other's output before converging</strong> → group chat.</li>
                    <li>• <strong>The task decomposes into sub-tasks whose shape isn't known ahead of time</strong>, and sub-tasks need different tools or context → hierarchical (orchestrator-worker). Anthropic's own multi-agent research system uses exactly this shape: a lead agent plans and spins up subagents to search in parallel, then synthesizes what they found.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="frameworks" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How the major frameworks implement orchestration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You rarely hand-roll orchestration logic from scratch — the mainstream frameworks bake these patterns
                  in:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Framework</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Orchestration model</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {frameworkTable.map((r) => (
                            <TableRow key={r.fw}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.fw}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.model}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  See our rundown of{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source AI agent frameworks</Link>{" "}
                  for a broader comparison beyond orchestration specifically. When the agents you're coordinating come
                  from different vendors rather than one framework, that's the problem Google's{" "}
                  <Link to="/blog/google-a2a" className="text-primary hover:underline">A2A protocol</Link>{" "}
                  targets — a transport standard for cross-vendor agent-to-agent calls, which pairs naturally with ADK's
                  hierarchical orchestration model. For a concrete worked example of two specific tools handing off
                  work to each other, see our piece on{" "}
                  <Link to="/blog/hermes-claude-code-orchestration" className="text-primary hover:underline">Hermes and Claude Code orchestration</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="failure-modes" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What goes wrong in multi-agent systems</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Adding agents adds failure surface, not just capability. The recurring problems, per Microsoft's own
                  framework guidance and the enterprise orchestration research:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Context loss at handoffs.</strong> The next agent doesn't see what actually mattered from the previous step unless the orchestration layer explicitly carries it forward.</li>
                    <li>• <strong>Runaway cost and latency.</strong> Agents calling agents multiplies model calls fast; concurrent fan-out especially needs a hard cap on breadth.</li>
                    <li>• <strong>Non-deterministic routing.</strong> Handoff and group-chat patterns let the system itself decide who acts next, which makes reproducing a bug harder than in a fixed pipeline.</li>
                    <li>• <strong>Over-engineering.</strong> Reaching for hierarchy or group chat when a sequential pipeline would do — the single most common mistake per Microsoft's own guidance, which explicitly recommends starting simple.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most of the production reliability work — durable state across steps, retries, sandboxed tool
                  execution, observability — lives one layer below orchestration, in what each agent runs on. Our guide
                  to{" "}
                  <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">AI agent runtimes</Link>{" "}
                  covers that infrastructure layer in depth.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <TopmateCTA />
              </section>

              <ExploreWithAI variant="questions" path="/blog/multi-agent-orchestration-patterns" />

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns">Microsoft — AI Agent Orchestration Patterns (Azure Architecture Center)</RefLink></li>
                  <li>• <RefLink href="https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations">Microsoft Learn — Workflow Orchestrations in Agent Framework</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic — Building Effective Agents (orchestrator-workers workflow)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/pdf/2606.20058">arXiv — Autonomous Event-Driven Multi-Agent Orchestration for Enterprise AI at Scale (2026)</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/multi-agent-orchestration-patterns" />
      <Footer />
    </div>
  );
};

export default MultiAgentOrchestrationPost;
