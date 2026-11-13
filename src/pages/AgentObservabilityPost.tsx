import { ArrowLeft, Clock, User, Calendar, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentObservabilityHeroDiagram from "@/components/AgentObservabilityHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import ExploreWithAI from "@/components/ExploreWithAI";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const toolsCompared = [
  { tool: "Langfuse", license: "MIT (open source)", selfHost: "Yes — Docker Compose (ClickHouse + Postgres + Redis)", otel: "Yes, OTel-native", bestFor: "Multi-agent tracing (Agent Graph view), teams that want to self-host", cost: "~$101/mo Cloud Core at 1M events" },
  { tool: "LangSmith", license: "Proprietary (closed source)", selfHost: "Enterprise tier only", otel: "Partial — strongest inside LangChain/LangGraph", bestFor: "Teams already standardized on LangChain/LangGraph", cost: "~$2,514/mo Plus at 1M events" },
  { tool: "Arize Phoenix", license: "Elastic License 2.0 (open source)", selfHost: "Yes — single Docker container", otel: "Yes, OpenInference/OTel-native", bestFor: "RAG eval (RAGAS-style faithfulness/relevance) alongside tracing", cost: "Self-host free; cloud tiers available" },
  { tool: "MLflow", license: "Apache 2.0 (open source)", selfHost: "Yes", otel: "Yes — native GenAI semconv export since MLflow 3.11", bestFor: "Teams already on MLflow for experiment tracking / model registry", cost: "Free, self-hosted; 30M+/mo PyPI downloads" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is AI agent observability?",
    a: "AI agent observability is the practice of capturing, tracing, and evaluating everything an AI agent does during a request — not just a single request/response timing, but the full nested tree of model calls, tool calls, retrieval steps, and hand-offs to other agents. It's built on OpenTelemetry's GenAI semantic conventions, which standardize spans like invoke_agent, chat, and execute_tool so different tools can read the same traces.",
  },
  {
    q: "How is AI agent observability different from traditional APM?",
    a: "Traditional APM measures a request's duration and error rate as one span, which is fine when the server does one deterministic thing. An agent's single request can fan out into dozens of nested spans — a planning step, several model calls, multiple tool calls, and handoffs to sub-agents — and a slow or wrong answer could come from any one of them. APM gives you the total time; agent observability gives you the span tree that explains it.",
  },
  {
    q: "What is the OpenTelemetry GenAI semantic convention?",
    a: "It's a set of standard span names and attributes (gen_ai.operation.name, gen_ai.request.model, gen_ai.response.model, gen_ai.usage.input_tokens/output_tokens, gen_ai.agent.name, gen_ai.tool.name, gen_ai.conversation.id) that different tools emit and read the same way, covering operations like invoke_agent, chat, execute_tool, and plan. As of mid/late 2026 it's still marked 'Development' status in the OpenTelemetry spec, not yet frozen, so attribute names can still shift between releases.",
  },
  {
    q: "Should I use Langfuse, LangSmith, Arize Phoenix, or MLflow for agent observability?",
    a: "It depends mostly on your stack and hosting needs. Langfuse is OTel-native and MIT-licensed, a strong default if you want to self-host and need a dedicated multi-agent view. LangSmith is the obvious pick if you're already deep in LangChain/LangGraph, but it's closed-source and self-hosting is Enterprise-only. Arize Phoenix is the strongest choice if RAG/retrieval evaluation metrics matter as much as tracing. MLflow fits teams that already use it for experiment tracking and want tracing in the same tool, now with native GenAI semconv export.",
  },
  {
    q: "What is trajectory evaluation for AI agents?",
    a: "Trajectory evaluation scores the sequence of steps an agent took — which tools it called, in what order, with what arguments — rather than just checking whether the final output looks correct. It catches failures an output-only check misses: the agent picked the wrong tool but still produced a plausible-looking answer, it ran an unsafe sequence that happened to land on a correct-looking end state, or it claims success while the underlying system state never actually changed.",
  },
  {
    q: "How do you instrument a multi-agent system for observability?",
    a: "Give each agent its own gen_ai.agent.name attribute, and make sure the calling agent — not the agent being called — emits the invoke_agent span for that handoff. That convention is what lets a tracing UI reconstruct the full call graph between agents instead of a flat list of disconnected spans, which is the difference between seeing 'agent A handed off to agent B' and just seeing two unrelated traces.",
  },
];

const AgentObservabilityPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-primary rounded-sm px-3 py-1">
                  <Activity className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Agent Observability: Tracing, Metrics, and Evals Explained
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>AI agent observability is tracing and evaluating the full span tree behind one agent
                request</strong> — every nested model call, tool call, retrieval step, and sub-agent handoff —
                not just a request/response timing the way classic APM does. It runs on{" "}
                <strong>OpenTelemetry's GenAI semantic conventions</strong>, which standardize spans like{" "}
                <code>invoke_agent</code>, <code>chat</code>, and <code>execute_tool</code> so tools like Langfuse,
                LangSmith, Arize Phoenix, and MLflow can all read the same traces. Here's how the tracing actually
                works, how the major tools compare, why output-only evals miss real failures, and how to instrument
                a multi-agent system correctly.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary-foreground" />
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
                      Nov 9, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentObservabilityHeroDiagram />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
              <p className="text-sm sm:text-base font-semibold mb-2">TL;DR</p>
              <ul className="space-y-1.5 text-sm sm:text-base text-muted-foreground">
                <li>• Agent observability traces the nested span tree of one request, not a single HTTP timing.</li>
                <li>• OpenTelemetry's GenAI semantic conventions (gen_ai.*) are the emerging standard, but still "Development" status, not frozen.</li>
                <li>• Langfuse, LangSmith, Arize Phoenix, and MLflow differ mainly on license, self-hosting, and what they're strongest at (RAG eval vs multi-agent view vs LangChain-native).</li>
                <li>• Trajectory evaluation (did it use the right tools, in the right order?) catches failures output-only checks miss.</li>
                <li>• In multi-agent systems, the calling agent emits the invoke_agent span — not the agent being called.</li>
              </ul>
            </div>

            <ExploreWithAI path="/blog/ai-agent-observability" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is AI agent observability, and how is it different from APM?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  AI agent observability is the practice of capturing, tracing, and evaluating everything an{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link> does
                  while handling one request — not just whether it returned a 200 in 800ms. Classic application
                  performance monitoring (APM) treats a request as one span with a duration and an error flag, which
                  works when the server does one deterministic thing. An agent is different: a single user request
                  can fan out into a planning step, several nested model calls, multiple tool calls, a retrieval
                  step, and a handoff to another sub-agent — and any one of those can be the reason the response was
                  slow or wrong.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://elastic.co/observability-labs/blog/ai-agent-observability-opentelemetry">Elastic's engineering team</RefLink> and{" "}
                  <RefLink href="https://honeycomb.io/blog/instrumenting-ai-agents-agent-timeline-opentelemetry-guide">Honeycomb</RefLink> both
                  make the same point from different angles: you need the whole <strong>span tree</strong> — the parent-child
                  relationship between <code>invoke_agent</code>, <code>chat</code>, and <code>execute_tool</code> spans —
                  to debug an agent, because the aggregate request duration hides which exact step caused the problem.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why-it-matters" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why agent observability matters now</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Once an agent has more than one tool, or hands work off between sub-agents, a plain error log stops
                  being enough. A request that "worked" in the sense of returning an answer can still have silently
                  called the wrong tool, burned 10x the tokens it needed to, or lost context across a multi-turn
                  session — none of which shows up as an HTTP error. Without a trace of every step, you're debugging
                  by guessing which of the five things that happened inside the request actually went wrong.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is also why the industry converged on a shared standard rather than every vendor shipping a
                  proprietary tracing format: the{" "}
                  <RefLink href="https://opentelemetry.io/blog/2026/genai-observability">OpenTelemetry GenAI Semantic Conventions</RefLink>{" "}
                  mean a trace produced by one SDK can be read by Langfuse, Phoenix, MLflow, or a generic OTel
                  backend like Honeycomb or Elastic, instead of locking you into one vendor's trace format.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-tracing-works" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How agent tracing actually works (OpenTelemetry GenAI semconv)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The <RefLink href="https://opentelemetry.io/blog/2026/genai-observability">OpenTelemetry GenAI semantic conventions</RefLink>{" "}
                  define standard span names for the operations an agent performs — <code>invoke_agent</code>,{" "}
                  <code>chat</code>, <code>execute_tool</code>, and <code>plan</code> among them — plus a common set
                  of attributes carried on every span:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <code>gen_ai.operation.name</code> — which operation this span represents (chat, execute_tool, invoke_agent…).</li>
                    <li>• <code>gen_ai.request.model</code> / <code>gen_ai.response.model</code> — the model requested vs. the one that actually served the call.</li>
                    <li>• <code>gen_ai.usage.input_tokens</code> / <code>gen_ai.usage.output_tokens</code> — token accounting per span, so cost is attributable to the exact call that spent it.</li>
                    <li>• <code>gen_ai.agent.name</code> — which named agent emitted the span, essential once you have more than one.</li>
                    <li>• <code>gen_ai.tool.name</code> — which tool an execute_tool span invoked.</li>
                    <li>• <code>gen_ai.conversation.id</code> — ties spans across turns of the same session together.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A simplified trace for "research a topic, then write it up" looks like a tree: a root{" "}
                  <code>invoke_agent</code> span for the researcher agent, with child spans for a <code>chat</code>{" "}
                  call to the model and an <code>execute_tool</code> call to a search tool, then a sibling{" "}
                  <code>invoke_agent</code> span for a writer agent it handed off to, which itself nests its own{" "}
                  <code>chat</code> and <code>execute_tool</code> spans — exactly what the hero diagram above shows.
                </p>
                <div className="bg-[#0d1117] border border-border rounded-lg p-4 mb-4 sm:mb-6 overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-muted-foreground"><code>{`with tracer.start_as_current_span(
    "invoke_agent", attributes={"gen_ai.agent.name": "researcher"}
) as agent_span:
    with tracer.start_as_current_span(
        "chat", attributes={"gen_ai.request.model": "claude-opus-4"}
    ):
        response = model.chat(messages)

    with tracer.start_as_current_span(
        "execute_tool", attributes={"gen_ai.tool.name": "web_search"}
    ):
        results = web_search(query)`}</code></pre>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One caveat worth flagging:{" "}
                  <RefLink href="https://truefoundry.com/blog/opentelemetry-genai-semantic-conventions">TrueFoundry's writeup</RefLink>{" "}
                  notes the spec is still marked <strong>"Development" status</strong> as of mid/late 2026 — not yet
                  frozen or stable — so attribute names can still shift between releases. Pin a version and expect to
                  update instrumentation as the spec matures, the same way you'd treat any pre-1.0 standard. MLflow's{" "}
                  <RefLink href="https://mlflow.org/docs/latest/genai/tracing/opentelemetry/genai-semconv">docs on the convention</RefLink>{" "}
                  are a good place to track what's actually stabilized.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tools-compared" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Langfuse vs LangSmith vs Arize Phoenix vs MLflow</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All four read and/or emit OpenTelemetry-shaped traces, but they differ on license, self-hosting
                  difficulty, and what they're actually strongest at:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Tool</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">License</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Self-hosting</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">OTel-native</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Approx. cost at 1M events/mo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {toolsCompared.map((r) => (
                            <TableRow key={r.tool}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.tool}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.license}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.selfHost}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.otel}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.bestFor}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.cost}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Per <RefLink href="https://mlflow.org/top-5-agent-observability-tools">MLflow's own comparison</RefLink>{" "}
                  and <RefLink href="https://arize.com/resources/llm-and-agent-evaluation-platforms">Arize's evaluation-platform breakdown</RefLink>,
                  the practical default is: <strong>Langfuse</strong> if you want an OTel-native, self-hostable
                  option with a dedicated multi-agent "Agent Graph" view; <strong>LangSmith</strong> only if you're
                  already committed to LangChain/LangGraph and fine with a closed-source, cloud-first tool;{" "}
                  <strong>Arize Phoenix</strong> when RAG and retrieval-quality metrics (faithfulness, relevance)
                  matter as much as tracing; and <strong>MLflow</strong> if you already run it for experiment
                  tracking and want tracing in the same place — it's exported{" "}
                  <RefLink href="https://pythondatabench.com/article/llm-observability-python-langfuse-langsmith-arize-phoenix-2026">native GenAI semconv support since MLflow 3.11</RefLink>.
                  A fifth option, <strong>Braintrust</strong>, is worth a mention for eval-driven workflows but has
                  no self-hosting path, per{" "}
                  <RefLink href="https://zenml.io/blog/langfuse-vs-phoenix">ZenML's Langfuse vs Phoenix comparison</RefLink>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you're weighing Langfuse against Phoenix specifically,{" "}
                  <RefLink href="https://arize.com/docs/phoenix/resources/frequently-asked-questions/langfuse-alternative-arize-phoenix-vs-langfuse-key-differences">Arize's own FAQ on the two</RefLink>{" "}
                  is a reasonably balanced starting point even though it's written by one of the vendors.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, RAG, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="evaluation" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Trajectory evals vs output-only evals</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Tracing tells you what happened; evaluation tells you whether it was good. The mistake teams make
                  is scoring only the final output — does the answer look right? — because that check misses an
                  entire class of agent failures. Per{" "}
                  <RefLink href="https://arize.com/resources/llm-and-agent-evaluation-platforms">Arize's research on agent evaluation</RefLink>,{" "}
                  <strong>trajectory evaluation</strong> — scoring the sequence of tool calls and decisions the agent
                  took, not just the end state — catches failures an output-only check can't:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• The agent called the wrong tool but still produced a final answer that happens to look correct.</li>
                    <li>• It ran an unsafe sequence of actions that nonetheless landed on a correct-looking end state.</li>
                    <li>• Context was lost across a multi-turn session, so a later turn silently contradicts an earlier one.</li>
                    <li>• The agent reports success, but the underlying system state never actually changed (a write that silently failed).</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice this means scoring traces, not just outputs: given the full span tree for a request,
                  check whether the <em>tool call sequence</em> matches what a correct run should look like, in
                  addition to whether the final text response reads fine. If you're building{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">retrieval into the agent</Link>,
                  the same principle applies — faithfulness and context-precision metrics score the retrieval step,
                  not just whatever the model wrote afterward.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="multi-agent-observability" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do you observe a multi-agent system specifically?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Once you're running{" "}
                  <Link to="/blog/multi-agent-orchestration-patterns" className="text-primary hover:underline">multiple agents coordinating on one task</Link>,
                  one rule matters more than any tool choice:{" "}
                  <RefLink href="https://honeycomb.io/blog/instrumenting-ai-agents-agent-timeline-opentelemetry-guide">Honeycomb's instrumentation guide</RefLink>{" "}
                  specifies that each agent should carry its own <code>gen_ai.agent.name</code> attribute, and the{" "}
                  <strong>calling</strong> agent — not the callee — is responsible for emitting the{" "}
                  <code>invoke_agent</code> span for that handoff.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Get that backwards and your tracing UI shows two unconnected traces instead of one agent handing
                  off to another — which defeats the purpose of tracing a multi-agent run in the first place. This
                  is also where a tool's dedicated "agent graph" view (Langfuse has one) earns its keep: it renders
                  the handoff chain visually instead of making you reconstruct it from a flat span list.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="getting-started" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to get started with agent observability</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Instrument with OpenTelemetry's GenAI semconv</strong> — use an SDK or integration that already emits <code>gen_ai.*</code> attributes rather than hand-rolling your own span schema.</li>
                    <li><strong>Pick one backend to start.</strong> Langfuse (self-hosted via Docker Compose) is the lowest-friction way to see your first traces without a procurement cycle.</li>
                    <li><strong>Name every agent.</strong> Set <code>gen_ai.agent.name</code> on every agent before you have more than one — retrofitting it later means re-tracing old incidents blind.</li>
                    <li><strong>Add trajectory checks, not just output checks,</strong> to your eval set — at minimum, assert the expected tool was called with reasonable arguments.</li>
                    <li><strong>Watch token usage per span,</strong> not just per request — <code>gen_ai.usage.*</code> attributes let you see exactly which model call is driving cost.</li>
                    <li><strong>Make tracing a platform service,</strong> not something each team wires up alone — otherwise you can't follow one request across two teams' agents. See <Link to="/blog/conways-law-ai" className="text-primary hover:underline">Conway's law for AI</Link> for who should own it.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This also matters for the operational side of agents more broadly — see our{" "}
                  <Link to="/blog/mlops-best-practices" className="text-primary hover:underline">MLOps best practices</Link>{" "}
                  for how tracing fits into the rest of the production lifecycle, and our piece on{" "}
                  <Link to="/blog/ai-agent-memory" className="text-primary hover:underline">AI agent memory</Link>{" "}
                  if context loss across sessions (one of the trajectory-eval failure modes above) is what's biting you.
                  If your agent runs untrusted code or tools, pair observability with{" "}
                  <Link to="/blog/ai-agent-sandboxing" className="text-primary hover:underline">proper sandboxing</Link>{" "}
                  — tracing tells you what happened, sandboxing limits the damage when it's something you didn't want.
                </p>
              </section>

              <ExploreWithAI path="/blog/ai-agent-observability" variant="questions" />

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
                  <li>• <RefLink href="https://opentelemetry.io/blog/2026/genai-observability">OpenTelemetry — GenAI observability blog post</RefLink></li>
                  <li>• <RefLink href="https://elastic.co/observability-labs/blog/ai-agent-observability-opentelemetry">Elastic Observability Labs — AI agent observability with OpenTelemetry</RefLink></li>
                  <li>• <RefLink href="https://truefoundry.com/blog/opentelemetry-genai-semantic-conventions">TrueFoundry — OpenTelemetry GenAI semantic conventions</RefLink></li>
                  <li>• <RefLink href="https://honeycomb.io/blog/instrumenting-ai-agents-agent-timeline-opentelemetry-guide">Honeycomb — instrumenting AI agents: the agent timeline, an OpenTelemetry guide</RefLink></li>
                  <li>• <RefLink href="https://mlflow.org/docs/latest/genai/tracing/opentelemetry/genai-semconv">MLflow docs — GenAI semantic conventions</RefLink></li>
                  <li>• <RefLink href="https://mlflow.org/top-5-agent-observability-tools">MLflow — top 5 agent observability tools</RefLink></li>
                  <li>• <RefLink href="https://arize.com/resources/llm-and-agent-evaluation-platforms">Arize — LLM and agent evaluation platforms</RefLink></li>
                  <li>• <RefLink href="https://pythondatabench.com/article/llm-observability-python-langfuse-langsmith-arize-phoenix-2026">Python Databench — LLM observability: Langfuse, LangSmith, Arize Phoenix (2026)</RefLink></li>
                  <li>• <RefLink href="https://zenml.io/blog/langfuse-vs-phoenix">ZenML — Langfuse vs Phoenix</RefLink></li>
                  <li>• <RefLink href="https://arize.com/docs/phoenix/resources/frequently-asked-questions/langfuse-alternative-arize-phoenix-vs-langfuse-key-differences">Arize Phoenix FAQ — Phoenix vs Langfuse key differences</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/ai-agent-observability" />
      <Footer />
    </div>
  );
};

export default AgentObservabilityPost;
