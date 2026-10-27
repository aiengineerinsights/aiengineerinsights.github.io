import { ArrowLeft, Clock, User, Calendar, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentHarnessHeroDiagram from "@/components/AgentHarnessHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

// The eight editable components are the list in the Harness² README.
const components = [
  { part: "System prompt", does: "Role, rules, and the definition of done the model reads on every turn", more: null },
  { part: "Tool guidance", does: "Which tools exist, when to use each, and how to read their output", more: { to: "/blog/what-is-mcp", label: "What is MCP?" } },
  { part: "Guardrails", does: "Checks on inputs, tool calls, and outputs that the model can't talk its way past", more: { to: "/blog/ai-guardrails", label: "AI guardrails explained" } },
  { part: "Memory", does: "What carries over between steps and sessions: progress notes, facts, user preferences", more: { to: "/blog/ai-agent-memory", label: "AI agent memory" } },
  { part: "Subagents", does: "Specialist agents the main agent delegates to, each with its own context", more: { to: "/blog/multi-agent-orchestration-patterns", label: "Multi-agent orchestration patterns" } },
  { part: "Skills", does: "Reusable, loadable instructions for a recurring kind of task", more: { to: "/blog/hermes-agent-skills", label: "How agent skills work (Hermes)" } },
  { part: "Scripts", does: "Deterministic code the agent can run instead of reasoning step by step: setup, tests, checks", more: null },
  { part: "Plugins", does: "Packaged extensions that add tools, commands, or hooks to the agent", more: null },
];

const comparison = [
  { thing: "Agent harness", is: "Everything around the model that lets it act: prompts, tools, guardrails, memory, skills, orchestration", example: "Claude Code, Codex, OpenCode, Hermes Agent", question: "Does the agent do the task well?" },
  { thing: "Agent runtime", is: "The production layer that keeps a harness running reliably", example: "Durable execution, sandboxes, retries, tracing, approval gates", question: "Does the agent keep working at scale, safely?" },
  { thing: "Agent framework", is: "A library you use to build your own harness", example: "LangGraph, CrewAI, OpenAI Agents SDK, Google ADK, Claude Agent SDK", question: "How do I build my own agent?" },
  { thing: "Eval harness", is: "A test rig that runs a model or agent against a benchmark and scores it", example: "lm-evaluation-harness, Inspect", question: "How good is it, measurably?" },
  { thing: "Harness optimizer", is: "A system that improves a harness automatically", example: "Google Harness², Meta-Harness", question: "Can the harness improve itself?" },
];

const agents = [
  { tool: "Google Harness²", category: "Research optimizer for agent harnesses", who: "Researchers and AI engineers", use: "Automatically improving the prompts, skills, memory, and guardrails around a frozen model", license: "Apache-2.0" },
  { tool: "Claude Code", category: "Coding agent (a ready-made harness)", who: "Developers", use: "Doing software tasks in your repo", license: "Commercial" },
  { tool: "Hermes Agent", category: "Self-hosted personal agent", who: "Individuals", use: "Everyday assistant that turns solved tasks into skills", license: "MIT" },
  { tool: "OpenClaw", category: "Self-hosted assistant gateway", who: "Individuals", use: "Assistant across 20+ messaging channels", license: "MIT" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is an agent harness?",
    a: "An agent harness is everything around a language model that lets it act as an agent: the system prompt, the tools and the guidance on using them, guardrails, memory, skills, subagents, scripts, plugins, and the loop that runs them. Google's Harness² README defines it as the system around a model that enables it to act as an agent. The model supplies the reasoning; the harness decides what it sees, what it can do, and how its work is checked. Claude Code, Codex, OpenCode, and Hermes Agent are all harnesses.",
  },
  {
    q: "What is harness engineering?",
    a: "Harness engineering is the work of designing that system so an agent does reliable work: writing the instructions and docs it reads, encoding rules as linters and tests it can run, giving it ways to record and recover progress, and adding review loops. OpenAI used the term in February 2026 for how a team shipped a product whose code was written by Codex, and Anthropic's guidance on long-running agents describes the same practice: a feature list, a progress file, an init script, and clean git commits so each new session knows where things stand.",
  },
  {
    q: "What is the difference between an agent harness and an agent runtime?",
    a: "The harness decides how well the agent does a task: prompts, tools, memory, skills, guardrails. The runtime decides whether the agent keeps running safely in production: durable state, sandboxed tool execution, retries, tracing, and human approval gates. You can swap a better harness onto the same runtime, or run the same harness on a sturdier runtime. Google's Harness² is a harness optimizer, not a runtime; its README notes it runs executors with unrestricted network access and, for Codex, with the sandbox disabled.",
  },
  {
    q: "What is Google Harness²?",
    a: "Harness² (google-research/harness2, Apache-2.0, released October 2026 with the paper Harness²: Recursive Agent Harnessing for an Open World) is a research framework that improves an agent's harness automatically while keeping the model weights frozen. For each task it proposes harness edits, probes them on that task, and composes a refined harness from the differences in behaviour, without ground-truth feedback. It also keeps a persistent store of adopted harnesses and lessons that guides later tasks. The paper reports gains of up to 11.5 points on WorkBuddy-Bench and 11.8 percentage points on LAB.",
  },
  {
    q: "Is Harness² for personal use or enterprise?",
    a: "Neither. It is research code for AI engineers and researchers: the README says it is not an officially supported Google product, it runs agents through OpenCode or Codex from the command line on Linux, and it is built for benchmark runs, not for chatting with. For a personal agent, use something like Hermes Agent or OpenClaw; for production, put your harness on a proper agent runtime.",
  },
  {
    q: "Do I need a harness optimizer like Harness²?",
    a: "Probably not yet. Most teams get more from hand-built harness engineering first: clear instructions, runnable tests, a progress log, and guardrails on tool calls. A harness optimizer becomes worth trying when you already run an agent on many similar tasks, have a way to compare runs, and can afford the extra rollouts each round of optimization costs.",
  },
];

const AgentHarnessPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-700 rounded-full px-3 py-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                What Is an Agent Harness? Harness Engineering Explained (and How Google's Harness² Optimizes One)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>The same model can be a great agent or a useless one. The difference is the harness.</strong>{" "}
                This guide explains what an agent harness is, its eight parts, how it differs from an agent runtime, a
                framework, and an eval harness, what "harness engineering" means in practice, and what Google's new
                Harness² does when it tries to improve a harness automatically.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
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
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentHarnessHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> An agent harness is everything around a language model that lets it act as an
                agent: system prompt, tool guidance, guardrails, memory, subagents, skills, scripts, plugins, and the
                loop that runs them. Claude Code, Codex, and Hermes Agent are harnesses. Harness engineering is the craft
                of building one so the agent works reliably. A harness is not a runtime (the production layer underneath)
                or a framework (the library you build one with). Google's Harness², released in October 2026, is a
                research tool that improves a harness automatically while leaving the model untouched.
              </p>
            </div>

            <ExploreWithAI path="/blog/what-is-an-agent-harness" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-an-agent-harness" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is an agent harness?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>An agent harness is the system around a model that enables it to act as an agent.</strong>{" "}
                  That is the definition in Google Research's{" "}
                  <RefLink href="https://github.com/google-research/harness2">Harness² README</RefLink>, which lists
                  "prompts, tools, memory, skills, orchestration, and more." The model reasons; the harness decides what
                  it sees, what it is allowed to do, and how its work gets checked.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You already use harnesses. Anthropic describes its Agent SDK as "the agent harness that powers Claude
                  Code," built around a simple loop:{" "}
                  <RefLink href="https://claude.com/blog/building-agents-with-the-claude-agent-sdk">"gather context → take action → verify work → repeat"</RefLink>.
                  Codex, OpenCode, Cursor's agent mode, and self-hosted agents like{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes Agent</Link>{" "}
                  are all harnesses wrapped around someone's model.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Why the term caught on in 2026: as models got good enough to run for hours, the gap between a strong
                  and a weak agent stopped being mostly the model. Two agents on the same model can differ widely
                  depending on what instructions they read, what tools they get, how they recover after their context
                  window fills, and whether anything checks their work. That surrounding system is the harness, and it
                  is the part you control.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="harness-components" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What goes into an agent harness? The eight parts</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Harness² treats eight components as editable. It is a useful checklist for any harness, whether you
                  build it by hand or buy it:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Component</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Go deeper</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {components.map((c) => (
                            <TableRow key={c.part}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{c.part}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.does}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">
                                {c.more ? <Link to={c.more.to} className="text-primary hover:underline">{c.more.label}</Link> : "—"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Add the control loop that ties them together (plan, act, observe, repeat) and the context management
                  that decides what fits in the window each turn. Our{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">agentic AI guide</Link>{" "}
                  covers the loop from the model's side.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="harness-vs-runtime" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Agent harness vs agent runtime vs framework vs eval harness</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  "Harness" is overloaded, and that causes most of the confusion. Five things get called by similar
                  names; each answers a different question:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Term</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it is</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Examples</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Question it answers</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {comparison.map((r) => (
                            <TableRow key={r.thing}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.thing}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.is}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.example}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.question}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The distinction that matters most in practice is <strong>harness vs runtime</strong>. The harness
                  determines how good the agent is at the task. The{" "}
                  <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">agent runtime</Link>{" "}
                  determines whether it keeps working in production: it persists state so a crash doesn't lose an
                  hour of work, sandboxes tools, retries failures, traces every step, and pauses for human approval.
                  A clever harness on no runtime is a demo; a solid runtime with a weak harness is a reliable way to do
                  the wrong thing. Frameworks such as LangGraph, CrewAI, or the Claude Agent SDK sit between the two:
                  they are what you use to build your own harness, compared in our{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source agent frameworks guide</Link>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two concrete examples of harness pieces you can study today: <Link to="/blog/claude-code-skills" className="text-primary hover:underline">Claude Code skills</Link>, which load instructions into context only when needed, and <Link to="/blog/claude-managed-agents" className="text-primary hover:underline">Claude Managed Agents</Link>, where Anthropic hosts the whole harness and sandbox for you.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="harness-engineering" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is harness engineering?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Harness engineering is designing the harness so the agent does reliable work without a person
                  steering every step. OpenAI popularised the term in February 2026 with{" "}
                  <RefLink href="https://openai.com/index/harness-engineering/">Harness engineering: leveraging Codex in an agent-first world</RefLink>,
                  about a team that shipped an internal product whose code was written by Codex, summed up as "Humans
                  steer. Agents execute." The work shifts from writing code to writing the environment the agent
                  writes code in.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's{" "}
                  <RefLink href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents">Effective harnesses for long-running agents</RefLink>{" "}
                  (November 2025) is the most concrete public recipe. It found agents tried to build everything at once,
                  declared victory early, marked features done without testing them end to end, and lost track of state
                  when a new context window started. The fix was a harness, not a better model: an initializer agent
                  sets up a feature list (200+ features marked passing or failing), a progress file, an{" "}
                  <code>init.sh</code> script, and a git history; every later session reads them first, works on one
                  feature, tests it, and leaves a clean commit. In Anthropic's words, "the key insight here was finding
                  a way for agents to quickly understand the state of work when starting with a fresh context window."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The practices that keep showing up:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Write instructions for the agent, not for humans.</strong> An <code>AGENTS.md</code> or <code>CLAUDE.md</code> with how to build, test, and what "done" means.</li>
                    <li>• <strong>Turn rules into checks the agent can run.</strong> Linters, type checks, and tests give feedback the model can't argue with.</li>
                    <li>• <strong>Make state survive the context window.</strong> A progress log, a task list, and small commits are the agent's only memory between sessions; see <Link to="/blog/ai-agent-memory" className="text-primary hover:underline">AI agent memory</Link>.</li>
                    <li>• <strong>One unit of work per session.</strong> Incremental beats ambitious for long-running agents.</li>
                    <li>• <strong>Guard the actions, not just the text.</strong> Put checks on tool calls; see <Link to="/blog/ai-guardrails" className="text-primary hover:underline">AI guardrails</Link>.</li>
                    <li>• <strong>Add a reviewer.</strong> A second agent or a human pass that checks work against the spec before it counts.</li>
                  </ul>
                </div>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agent harnesses, runtimes, memory, and the tools worth using: one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="harness2" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is Google Harness², and how does it optimize a harness?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://github.com/google-research/harness2">Harness²</RefLink> (pronounced "harness
                  squared") is a research framework from Google, released in October 2026 with the paper{" "}
                  <RefLink href="https://arxiv.org/abs/2610.14224">Harness²: Recursive Agent Harnessing for an Open World</RefLink>.
                  Its starting point is the paper's first line: "LLM agents' capabilities depend not only on their
                  underlying models but also on their execution harnesses." Instead of a person doing harness
                  engineering, Harness² does it automatically, and it keeps the model's weights frozen.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It works at two levels, which is where the "²" comes from:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Task level: Propose → Probe → Compose.</strong> For a new task it proposes edits to the harness, probes them by running the agent on that same task, and composes a refined harness from the differences in behaviour between runs, without needing ground-truth answers.</li>
                    <li>• <strong>Harnessing level: learning to improve.</strong> It keeps a persistent "improvement harness" of adopted harnesses and evidence-backed lessons, so each task makes the next refinement better.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It can probe several candidate harnesses in parallel or refine one sequentially. Tasks run on an
                  existing coding agent (OpenCode by default, or Codex), and a separate model does the improving; the{" "}
                  <RefLink href="https://github.com/google-research/harness2/blob/main/docs/SETUP.md">setup docs</RefLink>{" "}
                  allow Claude or Gemini on Vertex for that role. On three professional benchmarks the paper reports
                  gains of up to 11.5 points on WorkBuddy-Bench, 4.5 on JobBench, and 11.8 percentage points on the
                  legal benchmark LAB.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Read the results with three caveats:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>It costs more runs.</strong> Every round of probing means extra agent rollouts on the same task. Wavect's <RefLink href="https://wavect.io/blog/google-harness2-setup-cost-safety.md">review</RefLink> argues the cost per accepted result can end up worse than the baseline, and that the largest gain was on one executor model.</li>
                    <li>• <strong>It is not a production system.</strong> The README states "This is not an officially supported Google product," and notes executor network access is unrestricted and Codex runs with its sandbox disabled.</li>
                    <li>• <strong>It optimizes against the task in front of it.</strong> With no ground truth, "better" means better behaviour as judged by the system; Wavect also reports an agent fetching its own grading rubric during a run. Watch for that kind of reward hacking if you try it.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="harness2-vs-hermes-openclaw" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Harness² vs Claude Code vs Hermes Agent vs OpenClaw: who is it for?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Harness² is not something you run as an assistant. It sits one level up: it tunes harnesses like the
                  ones below.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Tool</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it is</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Who it's for</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Used for</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">License</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {agents.map((a) => (
                            <TableRow key={a.tool}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{a.tool}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{a.category}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{a.who}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{a.use}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{a.license}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There is a family resemblance with Hermes Agent, which also improves itself by turning solved tasks
                  into reusable skills. The difference is where it happens: Hermes learns while it works for you, one
                  user at a time; Harness² is an offline optimizer that runs batches of tasks and keeps whichever harness
                  changes the evidence supports. For a personal agent, see{" "}
                  <Link to="/blog/hermes-agent-vs-openclaw" className="text-primary hover:underline">Hermes Agent vs OpenClaw</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="should-you-care" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When should you invest in your harness?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Your agent fails in the same ways repeatedly.</strong> Stopping early, skipping tests, losing track after a long session: these are harness problems, and a bigger model rarely fixes them.</li>
                    <li>• <strong>You are about to pay for a larger model.</strong> Try a better harness first; it is cheaper per task and the gains carry over when you do upgrade.</li>
                    <li>• <strong>You run the same kind of task many times.</strong> That is when harness engineering pays back, and when automatic optimizers like Harness² start to make sense.</li>
                    <li>• <strong>You are moving to production.</strong> Then the next investment is the runtime underneath, not more harness.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A good order of work: write the instructions and a definition of done, give the agent tests it can
                  run, add a progress log and small commits, put guardrails on risky tool calls, then measure. Only
                  after that is it worth reaching for an optimizer.
                </p>
              </section>

              <ExploreWithAI path="/blog/what-is-an-agent-harness" variant="questions" />

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://github.com/google-research/harness2">Google Research — Harness² (GitHub README)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2610.14224">Xu et al. 2026 — Harness²: Recursive Agent Harnessing for an Open World (arXiv:2610.14224)</RefLink></li>
                  <li>• <RefLink href="https://github.com/google-research/harness2/blob/main/docs/SETUP.md">Harness² setup docs (executors and improver models)</RefLink></li>
                  <li>• <RefLink href="https://harness2.github.io">Harness² project site</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents">Anthropic — Effective harnesses for long-running agents (Nov 2025)</RefLink></li>
                  <li>• <RefLink href="https://claude.com/blog/building-agents-with-the-claude-agent-sdk">Anthropic — Building agents with the Claude Agent SDK (Sep 2025)</RefLink></li>
                  <li>• <RefLink href="https://openai.com/index/harness-engineering/">OpenAI — Harness engineering: leveraging Codex in an agent-first world (Feb 2026)</RefLink></li>
                  <li>• <RefLink href="https://wavect.io/blog/google-harness2-setup-cost-safety.md">Wavect — Google Harness²: setup, cost, and safety review</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/what-is-an-agent-harness" />
      <Footer />
    </div>
  );
};

export default AgentHarnessPost;
