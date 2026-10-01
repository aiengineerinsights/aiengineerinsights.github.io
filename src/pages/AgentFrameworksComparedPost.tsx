import { ArrowLeft, Clock, User, Calendar, Boxes, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentFrameworksHeroDiagram from "@/components/AgentFrameworksHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const frameworkTable = [
  { framework: "LangGraph", model: "Graph of nodes and edges with explicit, typed state; supports cycles, branching, checkpointing", language: "Python, TypeScript", best: "Complex, stateful, branching or long-running workflows where you want explicit control" },
  { framework: "CrewAI", model: "Role-based crews of agents assigned tasks; Flows for event-driven orchestration", language: "Python", best: "Standing up a role-playing multi-agent team quickly with minimal wiring" },
  { framework: "AutoGen / AG2", model: "Conversational multi-agent orchestration — agents exchange messages, group chats, human-in-the-loop", language: "Python (AutoGen also .NET)", best: "Conversation-style multi-agent research and prototyping; AutoGen itself is now in maintenance mode" },
  { framework: "Pydantic AI", model: "Type-safe, function-first agents with Pydantic-validated structured outputs and dependency injection", language: "Python", best: "Python teams that value type safety, testability, and validated outputs" },
  { framework: "LlamaIndex (agents)", model: "Agents and workflows built around a retrieval/indexing core", language: "Python, TypeScript", best: "Retrieval-heavy agents over your own documents" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is an AI agent framework?",
    a: "An AI agent framework is a library that gives you the scaffolding for building an agent: the reasoning loop that calls a model repeatedly, the plumbing for tool and function calling, state and memory handling, and a way to orchestrate multiple steps or multiple agents. Open-source examples include LangGraph, CrewAI, AutoGen (and its AG2 fork), and Pydantic AI. The framework defines how you write the agent; it is not the production runtime that sandboxes, schedules, and monitors it.",
  },
  {
    q: "What is the best open-source AI agent framework?",
    a: "There is no single best open-source AI agent framework — the right choice depends on the programming model you want and your use case. LangGraph is the strong pick when you need explicit control over a stateful, branching workflow; CrewAI is the fastest way to stand up a role-based multi-agent team; Pydantic AI is the choice for Python teams that prioritise type safety and testability; and LlamaIndex fits retrieval-heavy applications. Pick by how you want to express the agent's logic, not by feature-list length.",
  },
  {
    q: "CrewAI vs LangGraph: which should I use?",
    a: "Use CrewAI when you want a high-level, role-based abstraction — define agents with roles and goals, give them tasks, and let the crew run — and speed of getting started matters more than fine-grained control. Use LangGraph when your workflow has real branching, loops, or long-lived state and you want to define it explicitly as a graph of nodes and edges with built-in checkpointing. The trade-off is abstraction and speed (CrewAI) versus explicit control over state and flow (LangGraph).",
  },
  {
    q: "Is Pydantic AI production-ready?",
    a: "Pydantic AI is a newer agent framework from the team behind Pydantic, built around type-safe agents, Pydantic-validated structured outputs, and a dependency-injection system that makes agents straightforward to test. It is actively developed and used in production by teams who value those properties, but it is younger than LangGraph or AutoGen, so check the official docs and changelog for current API stability before committing a critical workload to it.",
  },
  {
    q: "What happened to AutoGen?",
    a: "AutoGen began as a Microsoft Research project for conversational multi-agent systems. As of 2026 the lineage has split: a group of original maintainers created the community fork AG2 (the ag2 package, which preserves the classic autogen namespace), while Microsoft placed the AutoGen repository in maintenance mode and now points new users to Microsoft Agent Framework, which it describes as AutoGen's successor and for which it publishes an AutoGen migration guide. Check the official AutoGen, AG2, and Microsoft Agent Framework docs for current status before starting a new project on any of them.",
  },
  {
    q: "Do I need an agent framework at all?",
    a: "Not always. For a single agent with a handful of tools, a plain tool-calling loop against the model's API — call the model, execute any tool calls it returns, append results, repeat — is often simpler, easier to debug, and has fewer dependencies. Frameworks earn their place when you need multi-step or multi-agent orchestration, durable state and checkpointing, structured outputs, or built-in observability, and when you would otherwise end up rebuilding those pieces yourself.",
  },
];

const AgentFrameworksComparedPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-800 rounded-full px-3 py-1">
                  <Boxes className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Open-Source AI Agent Frameworks Compared: LangGraph vs CrewAI vs AutoGen vs Pydantic AI (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>The open-source AI agent frameworks differ mostly in how they make you think</strong> —
                as a graph, as a crew of roles, as a conversation, or as typed functions — not in what they can
                ultimately do. This is a decision guide, not a feature dump: it covers what a framework actually
                gives you, the axes that matter when choosing one, how LangGraph, CrewAI, AutoGen/AG2, and Pydantic
                AI compare, a focused CrewAI vs LangGraph section, and a situation-by-situation recommendation. It
                also draws the line between a framework and the{" "}
                <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">agent runtime</Link>{" "}
                you will still need in production.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
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
                      AI Agents
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 1, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      13 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentFrameworksHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What an AI agent framework actually gives you</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link>{" "}
                  is, at its core, a loop: call a model, let it decide whether to call a tool, execute the tool,
                  feed the result back, and repeat until the task is done. You can write that loop in fifty lines
                  against any model API. An <strong>AI agent framework</strong> is what you reach for when the
                  fifty lines stop being enough — it supplies the reasoning loop, the tool-calling plumbing, state
                  and memory handling, structured outputs, and some way to orchestrate multiple steps or multiple
                  agents, so you are not rebuilding the same scaffolding for every project.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Concretely, most agentic AI frameworks bundle some combination of: a model abstraction so you can
                  swap providers; a way to declare tools (usually from typed function signatures); a state object
                  that persists across steps; a control-flow mechanism (a graph, a task list, a conversation, or
                  plain function calls); and hooks for tracing and evaluation. Where they differ — and this is the
                  whole point of this guide — is the <strong>programming model</strong> they impose on you.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One distinction is worth fixing before anything else: <strong>a framework defines how you write
                  the agent; it is not the production runtime.</strong> Where the agent's process lives, how its
                  tool calls are sandboxed, how it is scheduled, retried, and observed across thousands of runs —
                  that is the job of an{" "}
                  <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">agent runtime</Link>,
                  and every framework below still needs one underneath it. Choosing LangGraph or CrewAI answers
                  "how do I express this workflow", not "how does it run safely at 3 a.m.".
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-choose" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The axes that actually matter when choosing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Feature matrices for ai agent frameworks age in weeks and mostly converge anyway — everyone
                  supports tools, streaming, and the major model providers. The decisions that will still matter a
                  year into the project are these:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Programming model.</strong> Do you want to express the agent as an explicit <em>graph</em> (LangGraph), a <em>crew of roles</em> with tasks (CrewAI), a <em>conversation</em> between agents (AutoGen/AG2), or <em>type-safe functions</em> (Pydantic AI)? This is the single biggest determinant of how the code reads six months from now.</li>
                    <li>• <strong>Control vs abstraction.</strong> High-level frameworks get you a demo fast and then fight you when you need to intervene mid-run. Low-level ones make you wire more, but every transition is yours to inspect and change.</li>
                    <li>• <strong>State and memory.</strong> Is state a first-class, typed object you can checkpoint, resume, and time-travel through, or an implicit message history? Long-running and human-in-the-loop workflows live or die on this.</li>
                    <li>• <strong>Tool and MCP support.</strong> How tools are declared (typed signatures vs schemas) and whether the framework can mount{" "}
                      <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">MCP servers</Link>{" "}
                      as tool sources, so you are not hand-wrapping every integration.</li>
                    <li>• <strong>Observability.</strong> Can you trace every model call, tool call, and state transition out of the box, or do you bolt it on? You will debug agents far more than you write them.</li>
                    <li>• <strong>Maturity and community.</strong> Age of the project, release cadence, and — as the AutoGen story below shows — whether the project's governance is stable.</li>
                    <li>• <strong>Language.</strong> Python is the default across the board; LangGraph and LlamaIndex also ship TypeScript, and AutoGen has a .NET line. If your product is TypeScript-first, that narrows the field fast.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Keep those axes in mind as you read the framework profiles — each one is strong on some and
                  deliberately weak on others, and the "best ai agent builder" for you is the one whose
                  trade-offs line up with your workflow, not the one with the longest README.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="frameworks" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The main open-source AI agent frameworks</h2>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">LangGraph</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  LangGraph, from the LangChain team, models an agent as a <strong>graph</strong>: nodes are
                  functions (model calls, tool executions, routing logic), edges define transitions — including
                  conditional edges and cycles — and a shared, explicitly typed state object flows through the
                  graph. Its persistence layer checkpoints that state at every step, which is what enables
                  pausing for human approval, resuming after failure, and "time-travelling" to an earlier state
                  to replay a run (
                  <RefLink href="https://langchain-ai.github.io/langgraph/">LangGraph docs</RefLink>
                  ; <RefLink href="https://langchain-ai.github.io/langgraph/concepts/persistence/">LangGraph — Persistence</RefLink>).
                  Because every transition is explicit, LangGraph is the strongest pick when you want control over
                  a complex, stateful, possibly cyclic workflow — and the price is that you write that graph
                  yourself rather than getting it for free from a higher-level abstraction. It ships for both
                  Python and JavaScript/TypeScript (
                  <RefLink href="https://github.com/langchain-ai/langgraph">github.com/langchain-ai/langgraph</RefLink>).
                </p>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">CrewAI</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  CrewAI's unit of design is the <strong>crew</strong>: you define agents with a role, a goal, and a
                  backstory, give them tools, assign tasks, and let the crew execute those tasks sequentially or
                  under a manager. It is a role-playing, multi-agent-first programming model, and the appeal is
                  speed — a researcher/writer/reviewer team is a few dozen lines. CrewAI also provides{" "}
                  <strong>Flows</strong> for event-driven, more deterministic orchestration where you need
                  explicit steps and state alongside crews (
                  <RefLink href="https://docs.crewai.com/concepts/agents">CrewAI docs — Agents</RefLink>
                  ; <RefLink href="https://docs.crewai.com/concepts/flows">CrewAI docs — Flows</RefLink>
                  ; <RefLink href="https://github.com/crewAIInc/crewAI">github.com/crewAIInc/crewAI</RefLink>).
                  It is Python-only and is best when the problem naturally decomposes into roles and you want the
                  team running quickly rather than hand-wiring every transition.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">AutoGen and AG2</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  AutoGen originated in Microsoft Research and popularised the <strong>conversational</strong>{" "}
                  multi-agent model: agents are "conversable", they exchange messages, group chats coordinate
                  several of them, and a human can be a participant in the loop. Its programming model is still
                  the cleanest way to think about agents that genuinely need to talk to each other (
                  <RefLink href="https://microsoft.github.io/autogen/">AutoGen docs</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The thing to know before you adopt it is that <strong>as of 2026 the AutoGen lineage has
                  split and is consolidating</strong>. A group of the original maintainers created{" "}
                  <strong>AG2</strong>, a community fork distributed as the <code>ag2</code> package that keeps
                  the classic <code>autogen</code> namespace and agent classes (ConversableAgent, GroupChat, and
                  so on) available as "AG2 Classic" (
                  <RefLink href="https://docs.ag2.ai/">AG2 docs</RefLink>
                  ; <RefLink href="https://github.com/ag2ai/ag2">github.com/ag2ai/ag2</RefLink>).
                  Meanwhile Microsoft's own AutoGen repository states that it is in maintenance mode and
                  community-managed, and directs new users to <strong>Microsoft Agent Framework</strong>, which it
                  describes as AutoGen's successor and for which it publishes a migration guide (
                  <RefLink href="https://github.com/microsoft/autogen">github.com/microsoft/autogen</RefLink>
                  ; <RefLink href="https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/">Microsoft — AutoGen to Agent Framework migration guide</RefLink>).
                  The practical read: for a new project, treat AG2 as the community continuation of the
                  conversational model and Microsoft Agent Framework as Microsoft's supported direction, and check
                  the official repos for current status rather than relying on a 2024-era tutorial.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">Pydantic AI</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Pydantic AI comes from the team behind Pydantic, the validation library most Python AI code
                  already depends on, and it is a <strong>type-safe, function-first</strong> framework: an agent
                  is a typed object, tools are plain Python functions whose signatures become the tool schema,
                  outputs are validated against Pydantic models (so a malformed response triggers a retry rather
                  than a downstream crash), and a dependency-injection system passes connections, clients, or
                  test doubles into tools and system prompts (
                  <RefLink href="https://ai.pydantic.dev/">Pydantic AI docs</RefLink>
                  ; <RefLink href="https://ai.pydantic.dev/output/">Pydantic AI — Output</RefLink>
                  ; <RefLink href="https://ai.pydantic.dev/dependencies/">Pydantic AI — Dependencies</RefLink>).
                  That combination makes it unusually pleasant to unit-test, and it is the natural choice for a
                  Python team that already thinks in types and wants agents to feel like the rest of their
                  codebase rather than a separate DSL. It is also younger than the others here, so check the docs
                  and changelog for current API stability (
                  <RefLink href="https://github.com/pydantic/pydantic-ai">github.com/pydantic/pydantic-ai</RefLink>).
                </p>

                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Framework</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Programming model</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Language</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {frameworkTable.map((r) => (
                            <TableRow key={r.framework}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.framework}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.model}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.language}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.best}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">Others worth knowing</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>LlamaIndex agents.</strong> LlamaIndex started as the indexing and retrieval library, and its agents and workflows are built around that core — the right starting point when the agent's main job is reasoning over your own documents (
                    <RefLink href="https://docs.llamaindex.ai/">LlamaIndex docs</RefLink>).</li>
                  <li>• <strong>OpenAI Agents SDK.</strong> Open-source and lightweight — agents, handoffs between agents, and guardrails — but it is a vendor SDK designed around OpenAI's platform rather than a framework-neutral layer (
                    <RefLink href="https://openai.github.io/openai-agents-python/">OpenAI Agents SDK docs</RefLink>).</li>
                  <li>• <strong>Google ADK.</strong> Google's Agent Development Kit is likewise open source and model-agnostic in principle, but optimised for Gemini and the Google Cloud ecosystem (
                    <RefLink href="https://google.github.io/adk-docs/">Google ADK docs</RefLink>).</li>
                  <li>• <strong>Semantic Kernel and Microsoft Agent Framework.</strong> Semantic Kernel is Microsoft's long-standing SDK for integrating models into .NET, Python, and Java applications; Microsoft Agent Framework is the newer, consolidated direction Microsoft now points AutoGen users to (
                    <RefLink href="https://learn.microsoft.com/semantic-kernel/">Semantic Kernel docs</RefLink>
                    ; <RefLink href="https://learn.microsoft.com/agent-framework/">Microsoft Agent Framework docs</RefLink>).</li>
                </ul>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, RAG, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="crewai-vs-langgraph" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">CrewAI vs LangGraph: the real trade-off</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the comparison most teams are actually making, and it is cleaner than the marketing
                  suggests. <strong>CrewAI optimises for abstraction and speed; LangGraph optimises for explicit
                  control over state and flow.</strong> Neither is "more capable" — they sit at different ends of
                  the same spectrum.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  With CrewAI you describe <em>who</em> is on the team and <em>what</em> needs doing; the framework
                  decides much of the <em>how</em>. That is wonderful on day one — a content pipeline, a research
                  crew, or a multi-step analysis is up in an afternoon — and it is the right call when the problem
                  really is "several specialists collaborating on a task" and you are happy to let the crew drive.
                  The friction appears when you need to intervene mid-run, branch on a specific intermediate
                  result, or guarantee a particular ordering: you end up reaching for Flows and writing the
                  explicit steps anyway (
                  <RefLink href="https://docs.crewai.com/concepts/flows">CrewAI docs — Flows</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  With LangGraph you write the graph. Every node, every conditional edge, every loop is yours,
                  and the typed state that flows through it is checkpointed at each step, so pausing for a human
                  decision, resuming after a crash, or replaying from an earlier checkpoint are supported
                  behaviours rather than things you improvise (
                  <RefLink href="https://langchain-ai.github.io/langgraph/concepts/persistence/">LangGraph — Persistence</RefLink>).
                  The cost is that there is no "crew" to hand the problem to — the first version takes longer
                  and the code is more verbose. That is a good trade when the workflow is genuinely complex,
                  long-running, or has to be auditable; it is a poor trade for a weekend prototype.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A useful heuristic: if you can sketch your agent as a list of roles and tasks on a whiteboard,
                  start with CrewAI. If you find yourself drawing boxes with arrows, loops, and "wait for approval
                  here" annotations, you already want LangGraph. And the two are not mutually exclusive — teams do
                  prototype in CrewAI to validate that the task decomposes well, then rebuild the production
                  version in LangGraph once the shape of the workflow is known.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="decision" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Decision guide: which framework for which situation</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>You want explicit control of a stateful, branching, or long-running workflow</strong> → LangGraph. Checkpointing and human-in-the-loop are built in, and the graph is auditable.</li>
                    <li>• <strong>You want to stand up a role-based multi-agent team fast</strong> → CrewAI. Define roles and tasks, run the crew, iterate; graduate to Flows when you need explicit steps.</li>
                    <li>• <strong>You are a Python team that values type safety and testing</strong> → Pydantic AI. Validated structured outputs and dependency injection make agents feel like the rest of your codebase.</li>
                    <li>• <strong>Your agents genuinely need to converse with each other</strong> → AG2 for the community continuation of the AutoGen model, or Microsoft Agent Framework if you want Microsoft's supported path.</li>
                    <li>• <strong>You are all-in on Microsoft, .NET, or an enterprise Azure stack</strong> → Semantic Kernel today, with Microsoft Agent Framework as the direction Microsoft is pointing to.</li>
                    <li>• <strong>Your app is retrieval-heavy — agents reasoning over your own documents</strong> → LlamaIndex, so the agent layer sits directly on the indexing and retrieval you already need.</li>
                    <li>• <strong>You are committed to one model vendor and want the thinnest layer</strong> → that vendor's SDK (OpenAI Agents SDK, Google ADK), accepting the lock-in.</li>
                    <li>• <strong>One agent, a few tools, no multi-step state</strong> → no framework. A plain tool-calling loop against the model API is simpler to debug and has fewer moving parts.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Whichever you choose, remember that <strong>the framework is only half the problem</strong>. It
                  gives you a way to write the agent; it does not give you a sandbox for its tool calls, a
                  scheduler for its long-running jobs, durable storage that survives a redeploy, or the tracing
                  and cost controls you need across thousands of runs. Those belong to the runtime layer — see{" "}
                  <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">agent runtimes explained</Link>{" "}
                  for how that layer fits underneath any of the frameworks above — and the sooner a team separates
                  "how we write agents" from "how we run agents", the fewer rewrites it faces later.
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

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://langchain-ai.github.io/langgraph/">LangGraph — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://langchain-ai.github.io/langgraph/concepts/persistence/">LangGraph — Persistence (checkpointing, human-in-the-loop, time travel)</RefLink></li>
                  <li>• <RefLink href="https://github.com/langchain-ai/langgraph">LangGraph — GitHub repository</RefLink></li>
                  <li>• <RefLink href="https://docs.crewai.com/">CrewAI — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://docs.crewai.com/concepts/agents">CrewAI — Agents concept</RefLink></li>
                  <li>• <RefLink href="https://docs.crewai.com/concepts/flows">CrewAI — Flows concept</RefLink></li>
                  <li>• <RefLink href="https://github.com/crewAIInc/crewAI">CrewAI — GitHub repository</RefLink></li>
                  <li>• <RefLink href="https://microsoft.github.io/autogen/">AutoGen — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://github.com/microsoft/autogen">AutoGen — GitHub repository (maintenance-mode notice)</RefLink></li>
                  <li>• <RefLink href="https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/">Microsoft — Migrating from AutoGen to Microsoft Agent Framework</RefLink></li>
                  <li>• <RefLink href="https://docs.ag2.ai/">AG2 — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://github.com/ag2ai/ag2">AG2 — GitHub repository</RefLink></li>
                  <li>• <RefLink href="https://ai.pydantic.dev/">Pydantic AI — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://ai.pydantic.dev/output/">Pydantic AI — Output (structured, validated outputs)</RefLink></li>
                  <li>• <RefLink href="https://ai.pydantic.dev/dependencies/">Pydantic AI — Dependencies (dependency injection)</RefLink></li>
                  <li>• <RefLink href="https://github.com/pydantic/pydantic-ai">Pydantic AI — GitHub repository</RefLink></li>
                  <li>• <RefLink href="https://docs.llamaindex.ai/">LlamaIndex — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://openai.github.io/openai-agents-python/">OpenAI Agents SDK — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://google.github.io/adk-docs/">Google Agent Development Kit (ADK) — Official documentation</RefLink></li>
                  <li>• <RefLink href="https://learn.microsoft.com/semantic-kernel/">Microsoft — Semantic Kernel documentation</RefLink></li>
                  <li>• <RefLink href="https://learn.microsoft.com/agent-framework/">Microsoft — Agent Framework documentation</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/open-source-ai-agent-frameworks" />
      <Footer />
    </div>
  );
};

export default AgentFrameworksComparedPost;
