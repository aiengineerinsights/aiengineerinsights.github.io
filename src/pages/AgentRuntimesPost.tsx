import { ArrowLeft, Clock, User, Calendar, Server, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentRuntimesHeroDiagram from "@/components/AgentRuntimesHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const runtimes = [
  { name: "LangGraph / LangGraph Platform", model: "Graph of nodes, explicit state machine", state: "Built-in checkpointing (Postgres/SQLite) — pause/resume", sandbox: "Bring your own (not built in)", fit: "Complex, controllable multi-step agents; teams already on LangChain" },
  { name: "DeepAgents", model: "Batteries-included agent harness on LangGraph — planning, sub-agents, skills", state: "Persistent memory with context offloading/summarization; LangGraph checkpointing", sandbox: "Virtual filesystem + pluggable sandboxed backends", fit: "Want the full harness (sub-agents, HITL, memory) without assembling middleware yourself" },
  { name: "AgentOS", model: "Runtime service — serves Agno SDK agents/teams/workflows as REST + MCP + chat", state: "DB-backed state, background execution, checkpointing", sandbox: "Bring your own", fit: "Want a single running service (API, MCP, Control Plane UI), not just a library" },
  { name: "CrewAI", model: "Role-based multi-agent crews, sequential/hierarchical", state: "In-process memory; no durable checkpointing by default", sandbox: "Bring your own", fit: "Fast-to-prototype multi-agent workflows" },
  { name: "OpenAI Agents SDK", model: "Lightweight agent loop + handoffs + guardrails, provider-agnostic (100+ LLMs via Chat Completions API); SandboxAgent, RealtimeAgent, VoiceAgent variants", state: "Pluggable Sessions — in-memory, SQLite, or Redis-backed persistence", sandbox: "Hosted code interpreter tool; SandboxAgent runs in an isolated environment", fit: "Teams wanting a lightweight agent loop that isn't locked to one model provider" },
  { name: "Claude Agent SDK", model: "Agent loop with built-in tool use + subagents", state: "Session/context managed by the SDK", sandbox: "Built-in bash/file tools, sandboxable via container", fit: "Coding and computer-use style agents on Claude" },
  { name: "AutoGen / AG2", model: "Conversable multi-agent chat", state: "In-process; some persistence via extensions", sandbox: "Optional Docker code executor", fit: "Research and multi-agent conversation patterns" },
  { name: "Temporal", model: "Durable workflow engine (not agent-specific)", state: "Event-sourced, durable by design — survives crashes/restarts for days-to-years", sandbox: "None built in — you sandbox tool activities yourself", fit: "Enterprise-grade durability under any framework's agent loop" },
  { name: "Restate", model: "Durable execution service, lightweight Temporal alternative", state: "Journal-based durable state, single binary", sandbox: "None built in", fit: "Simpler ops than Temporal, still durable" },
  { name: "Inngest", model: "Event-driven durable functions", state: "Step-level checkpointing via queues", sandbox: "None built in", fit: "Serverless/edge-friendly agent backends" },
  { name: "AWS Bedrock Agents", model: "Managed agent orchestration on Bedrock models", state: "AWS-managed session state", sandbox: "AWS-managed code interpreter", fit: "AWS-native teams wanting a managed runtime" },
  { name: "Google Vertex AI Agent Builder / ADK", model: "Managed + open-source agent framework (ADK)", state: "Session service, managed or self-hosted", sandbox: "Code execution via Vertex tools", fit: "GCP-native teams; ADK for open, portable agents" },
  { name: "Microsoft Semantic Kernel + Azure AI Agent Service", model: "Plugin-based orchestration + managed Azure runtime", state: "Azure-managed threads/state", sandbox: "Azure-managed code interpreter", fit: "Azure/.NET or enterprise Microsoft stacks" },
  { name: "Letta (MemGPT)", model: "Stateful agent server focused on memory", state: "Persistent, self-editing memory as a first-class primitive", sandbox: "Bring your own", fit: "Long-lived agents that must remember across sessions" },
  { name: "LlamaIndex Workflows", model: "Event-driven step graph", state: "Context object persisted between steps", sandbox: "Bring your own", fit: "Teams already on LlamaIndex for RAG-heavy agents" },
  { name: "E2B / Modal", model: "Not agent frameworks — sandboxed execution substrates", state: "N/A (stateless compute sandboxes)", sandbox: "Purpose-built: isolated microVMs / containers per run", fit: "The tool-sandbox layer under any of the above" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is an AI agent runtime?",
    a: "An agent runtime is the infrastructure layer that actually executes an agent in production: a scheduler that runs and resumes steps, a durable state store that checkpoints progress so a task survives a crash or restart, an isolated sandbox for running tools/code, observability for tracing and cost, and guardrails for approvals. It's distinct from an agent framework or SDK, which mostly defines how you write the agent's logic — the runtime is what keeps that logic running reliably at scale.",
  },
  {
    q: "What is the difference between an agent framework and an agent runtime?",
    a: "A framework (LangChain, CrewAI's agent classes, the OpenAI/Claude Agent SDKs) gives you APIs to define an agent's reasoning loop, tools, and prompts. A runtime is what executes that definition in production: durable state across long-running tasks, retries and idempotency, concurrency and worker scaling, multi-tenant isolation, and observability. Some products bundle both (LangGraph, AWS Bedrock Agents); others are pure durable-execution substrates (Temporal, Restate) that any framework's agent loop can run on top of.",
  },
  {
    q: "Why do agents need durable execution instead of just a loop in a process?",
    a: "Because real agent tasks can run for minutes to days, call flaky external APIs, and need a human to approve a step hours later. A plain in-process loop dies with the process — restart the server and you lose all progress. Durable execution frameworks (Temporal, Restate, LangGraph's checkpointer) persist the agent's state after every step, so a crash, deploy, or long pause just means resuming from the last checkpoint instead of starting over.",
  },
  {
    q: "How do you sandbox tool execution for an agent?",
    a: "Never run model-generated code or shell commands directly on a host that has real credentials or data. Use an isolated execution environment — a microVM (E2B), a container with strict resource/network limits (Modal, Docker), or a managed code-interpreter tool (OpenAI, Bedrock, Vertex) — so a bad or adversarial tool call can't escape its sandbox, exhaust the host, or exfiltrate secrets.",
  },
  {
    q: "What should I use to trace and monitor an agent runtime in production?",
    a: "Instrument every model call and tool call as a span so you can see the full execution tree, not just the final answer. LangSmith, Langfuse, and Arize Phoenix are the common purpose-built options; several now follow the OpenTelemetry GenAI semantic conventions, so you can also route agent traces into a general-purpose observability stack. Track token usage and cost per span, not just per request, since a single agent turn can trigger many nested calls.",
  },
  {
    q: "What's a good default production stack for agent runtimes in 2026?",
    a: "For most teams: LangGraph for the agent graph with Postgres-backed checkpointing for durable state, E2B or Modal for sandboxed tool/code execution, Langfuse for tracing and cost observability, and a queue (SQS or Redis) in front of a worker pool for scaling. Move the durability layer to Temporal or Restate once you need cross-service sagas, very long-running workflows (days+), or strict enterprise reliability guarantees that a single framework's checkpointer doesn't give you.",
  },
  {
    q: "LangGraph vs Temporal: which one do you actually need?",
    a: "They're not really competitors — LangGraph is an agent graph framework with its own checkpointer for durable state; Temporal is a general-purpose durable execution engine with no agent-specific concepts at all. Most teams run LangGraph for the agent's reasoning graph and only reach for Temporal (or Restate) underneath it once they need cross-service sagas, multi-day workflows, or durability guarantees stronger than a single framework's built-in checkpointer.",
  },
];

const AgentRuntimesPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full px-3 py-1">
                  <Server className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Agent Runtimes Explained: The Production Layer Every Agent Framework Is Missing (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>An agent runtime is the infrastructure that keeps an agent running reliably in production</strong> —
                durable execution that survives crashes, retries and idempotency for flaky tools, sandboxed code execution,
                observability, and human-approval gates. It's the layer a framework or SDK doesn't give you for free.
                Here's what runtimes solve, a survey of the AI agent orchestration landscape (LangGraph, DeepAgents,
                Temporal, Bedrock Agents, AgentOS, Letta, and more), how to actually take one to production, real use
                cases, the best repos to learn from, and a concrete stack to start with.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-800 flex items-center justify-center flex-shrink-0">
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
                      Sep 25, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      16 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentRuntimesHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is an AI agent runtime?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An agent runtime is the infrastructure layer that <strong>executes</strong> an{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link>{" "}
                  in production, as opposed to the framework or SDK that defines how you write the agent's reasoning
                  loop in the first place. A framework like LangChain, CrewAI, or the Claude/OpenAI Agents SDKs gives
                  you APIs for prompts, tools, and control flow. A runtime is what keeps that logic running reliably
                  once real users, real failures, and real duration hit it: it schedules and resumes steps, persists
                  state so a crash doesn't lose progress, sandboxes tool execution, traces every call, and enforces
                  who can approve what.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The line blurs in practice — LangGraph is both a framework <em>and</em> ships a runtime (checkpointing,
                  the LangGraph Platform). But the distinction matters because many teams ship a working agent demo on a
                  framework alone, then discover in production that they need durable state, sandboxing, and
                  observability the framework never promised.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="problem" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What production problem does an agent runtime solve?</h2>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  A demo agent runs in one process, in memory, for a few seconds. A production agent has to survive:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Long-running, pausable tasks.</strong> A research or approval-gated agent can take minutes to days — the process that started it may not be the one that finishes it.</li>
                    <li>• <strong>Crashes and restarts.</strong> A deploy or an OOM shouldn't lose an agent's progress; it should resume from its last checkpoint.</li>
                    <li>• <strong>Flaky tools and retries.</strong> External APIs fail transiently; retries must be idempotent so a tool doesn't get called twice with side effects (double-charging a card, double-sending an email).</li>
                    <li>• <strong>Tool sandboxing.</strong> Model-generated code or shell commands need to run somewhere that can't touch real secrets or the host filesystem.</li>
                    <li>• <strong>Concurrency and scale.</strong> Thousands of concurrent agent sessions need worker pools, queues, and backpressure, not one Python process.</li>
                    <li>• <strong>Observability and cost control.</strong> Every model and tool call needs a trace and a token/cost tag, or a slow or expensive agent is invisible until the bill arrives.</li>
                    <li>• <strong>Human-in-the-loop approval.</strong> Some actions (payments, prod deploys, sending an email) need a person to confirm before the agent proceeds — potentially hours later.</li>
                    <li>• <strong>Multi-tenant isolation.</strong> One customer's agent session, state, and tool credentials must never leak into another's.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A runtime is the collection of infrastructure that answers all of these — durable state, sandboxing,
                  scheduling, observability, and guardrails — so the agent's own reasoning loop can stay simple.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="landscape" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The AI agent orchestration and runtime landscape: which one should you use?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There's no single "agent runtime" category yet — the landscape spans agent-native frameworks that
                  bundle some runtime features, general-purpose durable-execution engines that any agent can run on
                  top of, and pure sandboxing substrates for the tool-execution layer.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Runtime / platform</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Execution model</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">State / durability</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Sandboxing</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best fit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {runtimes.map((r) => (
                            <TableRow key={r.name}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.name}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.model}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.state}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.sandbox}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.fit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Also worth knowing: <strong>Griptape</strong> and <strong>Haystack Agents</strong> offer similar
                  agent-graph patterns to CrewAI/LangGraph with smaller ecosystems; <strong>LlamaIndex Workflows</strong>{" "}
                  is the natural fit if your agent is RAG-heavy and already on LlamaIndex. None of the pure agent
                  frameworks match Temporal or Restate's durability guarantees out of the box — that's the trade-off
                  the next section covers.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agent runtimes, MCP, RAG, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="production" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to take an agent runtime to production</h2>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  Whichever framework you start from, production readiness comes down to the same checklist:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Isolate tool execution.</strong> Run model-generated code or shell commands in a microVM (E2B) or a locked-down container (Modal, Docker) — never on a host with real credentials.</li>
                    <li><strong>Make state durable.</strong> Checkpoint after every step (LangGraph's Postgres checkpointer, Temporal's event-sourced history, Restate's journal) so a crash resumes instead of restarts.</li>
                    <li><strong>Design for idempotency and retries.</strong> Give every tool call an idempotency key so a retried "charge card" or "send email" doesn't double-execute.</li>
                    <li><strong>Instrument everything.</strong> Trace every model call and tool call as a span with token/cost metadata — LangSmith, Langfuse, and Arize Phoenix are purpose-built; several align with the emerging{" "}
                      <RefLink href="https://opentelemetry.io/docs/specs/semconv/gen-ai/">OpenTelemetry GenAI semantic conventions</RefLink>, so you can also feed agent traces into a general observability stack.</li>
                    <li><strong>Add guardrails and human approval gates.</strong> Gate irreversible or high-risk actions (payments, prod deploys, external emails) behind an explicit approval step the runtime can pause and resume for.</li>
                    <li><strong>Scale with queue-based worker pools.</strong> Put agent sessions behind a queue (SQS, Redis) so worker pools scale horizontally and one slow session doesn't block others.</li>
                    <li><strong>Isolate multi-tenant state and credentials.</strong> Scope each session's memory, tool credentials, and sandbox to its tenant — never share a sandbox or credential set across customers.</li>
                    <li><strong>Put evals in CI.</strong> Run a regression eval suite against agent behavior on every change, the same way you'd run unit tests, so a prompt or tool change doesn't silently degrade quality.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="use-cases" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Use cases that actually need a real runtime</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Coding agents</strong> (Claude Code, Devin-style) — need sandboxed execution for arbitrary code and long sessions that can pause for review.</li>
                    <li>• <strong>Customer support automation</strong> — needs durable state across a multi-turn conversation that can span hours, plus human escalation gates.</li>
                    <li>• <strong>Deep research agents</strong> — long-running, many tool calls (search, browse, read), benefit heavily from checkpointing so a 20-minute run survives a hiccup.</li>
                    <li>• <strong>Workflow / RPA-style agents</strong> — durable execution is the whole point: a business process that runs for days and must never silently drop a step.</li>
                    <li>• <strong>Data analysis agents</strong> — sandboxed code execution (E2B, Modal) is non-negotiable when the agent is writing and running its own Python/SQL.</li>
                    <li>• <strong>Computer-use agents</strong> — need strict sandboxing (isolated VM/browser) plus approval gates before any action with real-world side effects.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="repos" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Best repos to reference and learn from</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <RefLink href="https://github.com/langchain-ai/langgraph">langchain-ai/langgraph</RefLink> — graph-based agent orchestration with built-in checkpointing; the clearest reference for durable agent state.</li>
                    <li>• <RefLink href="https://github.com/langchain-ai/deepagents">langchain-ai/deepagents</RefLink> — batteries-included agent harness on LangGraph: sub-agents, virtual filesystem, context offloading, human-in-the-loop, skills.</li>
                    <li>• <RefLink href="https://github.com/agno-agi/agno">agno-agi/agno</RefLink> — "FastAPI for agents"; ships AgentOS, a runtime that serves agents/teams/workflows as REST + MCP + chat with a Control Plane UI.</li>
                    <li>• <RefLink href="https://github.com/crewAIInc/crewAI">crewAIInc/crewAI</RefLink> — role-based multi-agent crews; good reference for task delegation patterns.</li>
                    <li>• <RefLink href="https://github.com/openai/openai-agents-python">openai/openai-agents-python</RefLink> — lightweight, provider-agnostic agent loop, handoffs, and guardrails as a minimal reference implementation.</li>
                    <li>• <RefLink href="https://github.com/anthropics/claude-agent-sdk-python">anthropics/claude-agent-sdk-python</RefLink> — the SDK behind Claude Code; a strong reference for tool use and subagents.</li>
                    <li>• <RefLink href="https://github.com/microsoft/autogen">microsoft/autogen</RefLink> — conversable multi-agent patterns and research-oriented orchestration.</li>
                    <li>• <RefLink href="https://github.com/temporalio/temporal">temporalio/temporal</RefLink> — the reference durable-execution engine; read this to understand event sourcing for long-running workflows.</li>
                    <li>• <RefLink href="https://github.com/restatedev/restate">restatedev/restate</RefLink> — a lighter-weight durable execution service, good if Temporal feels heavy operationally.</li>
                    <li>• <RefLink href="https://github.com/letta-ai/letta">letta-ai/letta</RefLink> (formerly MemGPT) — the clearest reference for stateful, self-editing agent memory.</li>
                    <li>• <RefLink href="https://github.com/run-llama/llama_index">run-llama/llama_index</RefLink> — includes LlamaIndex Workflows, an event-driven step-graph runtime for RAG-heavy agents.</li>
                    <li>• <RefLink href="https://github.com/e2b-dev/E2B">e2b-dev/E2B</RefLink> — open-source secure sandboxes (microVMs) purpose-built for running AI-generated code.</li>
                    <li>• <RefLink href="https://github.com/modal-labs/modal-examples">modal-labs/modal-examples</RefLink> — serverless sandboxed compute examples, including agent tool-execution patterns.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="stack" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">A suggested production stack for agent runtimes</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There's no one-size-fits-all stack, but here's a concrete, opinionated starting point — and where
                  to deviate from it.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Agent graph:</strong> LangGraph, with Postgres-backed checkpointing for durable state.</li>
                    <li>• <strong>Sandboxed tool execution:</strong> E2B or Modal, so model-generated code never touches the host.</li>
                    <li>• <strong>Observability:</strong> Langfuse (or LangSmith / Arize Phoenix) for per-call tracing, token usage, and cost.</li>
                    <li>• <strong>Scaling:</strong> a queue (SQS or Redis) in front of a worker pool, so agent sessions scale horizontally.</li>
                    <li>• <strong>Guardrails:</strong> an explicit approval-gate node in the graph for irreversible actions.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base"><strong>Pick X when Y:</strong></p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Pick the lean LangGraph + Postgres stack</strong> when you're one team shipping a single product's agents and want to move fast without new infra.</li>
                    <li>• <strong>Add Temporal or Restate</strong> when workflows span multiple services, need to survive for days or weeks, or require enterprise-grade durability guarantees a single framework's checkpointer doesn't give you.</li>
                    <li>• <strong>Pick a managed platform (Bedrock Agents, Vertex AI Agent Builder, Azure AI Agent Service)</strong> when you're already deep in that cloud and want less operational surface, at the cost of some portability.</li>
                    <li>• <strong>Use Letta</strong> specifically when the hard problem is long-lived memory, not orchestration — it's a memory-first runtime, not a general workflow engine.</li>
                    <li>• <strong>Reach for DeepAgents</strong> when you want the full batteries-included harness (sub-agents, virtual filesystem, context offloading, HITL) on top of LangGraph without assembling that middleware yourself; <strong>reach for AgentOS</strong> when you want a single running service — REST + MCP + chat interfaces plus a Control Plane UI — out of the box, not just a Python library.</li>
                  </ul>
                </div>
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
                  <li>• <RefLink href="https://github.com/langchain-ai/langgraph">LangGraph (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://www.langchain.com/langgraph-platform">LangGraph Platform documentation</RefLink></li>
                  <li>• <RefLink href="https://github.com/langchain-ai/deepagents">DeepAgents (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/agno-agi/agno">Agno / AgentOS (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/crewAIInc/crewAI">CrewAI (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/openai/openai-agents-python">OpenAI Agents SDK (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/anthropics/claude-agent-sdk-python">Claude Agent SDK (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/microsoft/autogen">Microsoft AutoGen / AG2 (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://docs.temporal.io/">Temporal documentation</RefLink></li>
                  <li>• <RefLink href="https://github.com/restatedev/restate">Restate (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/letta-ai/letta">Letta / MemGPT (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/e2b-dev/E2B">E2B (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/modal-labs/modal-examples">Modal examples (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://opentelemetry.io/docs/specs/semconv/gen-ai/">OpenTelemetry GenAI semantic conventions</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/agent-runtimes-explained" />
      <Footer />
    </div>
  );
};

export default AgentRuntimesPost;
