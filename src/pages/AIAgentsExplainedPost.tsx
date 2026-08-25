import { ArrowLeft, Clock, User, Calendar, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AIAgentsHeroDiagram from "@/components/AIAgentsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const vsAgentic = [
  { aspect: "Part of speech", agent: "A noun — the thing itself", agentic: "An adjective — how it behaves" },
  { aspect: "What it names", agent: "A concrete system that perceives, decides, and acts toward a goal", agentic: "The degree of autonomy a system shows (planning, tool use, looping)" },
  { aspect: "Scope", agent: "Usually one autonomous unit", agentic: "The whole paradigm — often multi-step or multi-agent systems" },
  { aspect: "Example", agent: "A coding agent that fixes a bug end-to-end", agentic: "An 'agentic workflow' where several steps run autonomously" },
];

const typesTable = [
  { type: "Simple reflex", how: "Acts on the current input with fixed condition→action rules. No memory.", ex: "A thermostat-style rule bot" },
  { type: "Model-based reflex", how: "Keeps an internal model of the world to handle partial information.", ex: "A navigation bot tracking state it can't directly see" },
  { type: "Goal-based", how: "Chooses actions by whether they move it toward an explicit goal.", ex: "A planner searching for a sequence that reaches the target" },
  { type: "Utility-based", how: "Weighs trade-offs to maximize a utility score, not just reach a goal.", ex: "A routing agent balancing speed, cost, and risk" },
  { type: "Learning", how: "Improves its policy over time from feedback.", ex: "An RL agent, or an LLM agent that reflects on past runs" },
];

const modernTable = [
  { pattern: "Tool-using (ReAct)", how: "Interleaves reasoning with tool calls — think, act, observe, repeat. The default LLM-agent loop." },
  { pattern: "Planning", how: "Writes a multi-step plan first, then executes and revises it as results come in." },
  { pattern: "Reflective / self-critique", how: "Reviews its own output, spots errors, and retries — e.g. the Reflexion pattern." },
  { pattern: "Multi-agent", how: "Splits work across specialized agents (an orchestrator plus workers, or a debate) that coordinate." },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is an AI agent in simple terms?",
    a: "An AI agent is a software system that takes a goal, decides what to do on its own, and acts through tools — then looks at the result and keeps going until the goal is met. The key difference from a normal chatbot is autonomy plus a loop: it plans, uses tools (search, code, APIs), observes what happened, and adjusts, instead of answering once and stopping.",
  },
  {
    q: "What is the difference between AI agents and agentic AI?",
    a: "'AI agent' is a noun — the system itself. 'Agentic AI' is an adjective describing how autonomous a system's behavior is. In practice people use them interchangeably, but the useful distinction is: an agent is the concrete thing that plans and acts; 'agentic' describes any AI that shows that autonomy, often across multi-step or multi-agent workflows.",
  },
  {
    q: "Is ChatGPT an AI agent?",
    a: "It depends on the mode. Plain ChatGPT answering a message is not an agent — it responds once with no autonomous planning or tool loop. But ChatGPT running in an agentic mode (browsing, code execution, Deep Research, or Operator/computer use) is acting as an agent: it plans steps, calls tools, observes results, and loops until it finishes the task.",
  },
  {
    q: "What are the main types of AI agents?",
    a: "Classic AI theory lists five: simple reflex, model-based reflex, goal-based, utility-based, and learning agents. Modern LLM-based agents are usually described by pattern instead — tool-using (ReAct), planning, reflective/self-critique, and multi-agent systems.",
  },
  {
    q: "What are examples of AI agents?",
    a: "Coding agents like Claude Code, Cursor, and Devin; research agents like OpenAI Deep Research; computer-use agents like Operator and Claude's computer use; plus customer-support, data-analysis, and workflow-automation agents built with frameworks such as LangGraph, CrewAI, or the Claude and OpenAI Agents SDKs.",
  },
  {
    q: "How do I build an AI agent?",
    a: "Start with a capable LLM, give it a clear goal and a small set of tools, and wrap it in a loop that lets it plan, call tools, and read results. Add memory and guardrails as needed. Frameworks like LangGraph, CrewAI, the Claude Agent SDK, or the OpenAI Agents SDK handle the loop and tool wiring; MCP is a common standard for connecting tools. Keep the scope narrow first and expand once it's reliable.",
  },
];

const AIAgentsExplainedPost = () => {
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
                AI Agents Explained: Definition, Types, Architecture, and Real Examples (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                An <strong>AI agent</strong> is a system built around a large language model that takes a goal, decides
                what to do on its own, and acts through tools — then observes the result and loops until it's done. That
                autonomy-plus-loop is what separates an agent from a one-shot chatbot. This guide covers what AI agents
                are, how <strong>agentic AI</strong> differs, the architecture and the loop that powers them, the main
                types, real-world examples, whether ChatGPT counts as an agent, and how to build one.
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
                      Aug 25, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AIAgentsHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is an AI agent?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An AI agent is a system that <strong>perceives a goal, decides on the next action, acts through tools,
                  and observes the result — repeating the loop until the goal is met.</strong> The classic definition
                  from AI theory is an entity that perceives its environment and acts on it to achieve objectives. In
                  2026, "AI agent" almost always means an <strong>LLM-powered</strong> version of that idea: a language
                  model is the reasoning core, and it's wired to memory and tools so it can do real work autonomously.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The distinction that matters in practice is between a <em>responder</em> and an <em>agent</em>. A plain
                  chatbot answers your message once and stops. An agent is given an outcome — "fix this failing test,"
                  "research these five vendors," "book the cheapest flight" — and then works toward it across multiple
                  steps, calling tools and correcting itself along the way. Anthropic's engineering team draws the same
                  line in{" "}
                  <RefLink href="https://www.anthropic.com/engineering/building-effective-agents">Building Effective Agents</RefLink>:
                  workflows follow fixed paths, while agents dynamically decide their own steps.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="vs-agentic" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI agents vs agentic AI: what's the difference?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The two terms are often used interchangeably, and that's mostly fine — but there's a clean way to keep
                  them straight. <strong>"AI agent" is a noun; "agentic AI" is an adjective.</strong> One names the
                  system; the other describes how autonomous its behavior is.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Aspect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">AI agent</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Agentic AI</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vsAgentic.map((r) => (
                            <TableRow key={r.aspect}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.aspect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.agent}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.agentic}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you want the deeper version of what "agentic" actually requires of a model — planning, tool use,
                  memory, and autonomy — see our companion piece on{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">what makes LLMs agentic</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="architecture" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How AI agents work: the architecture and the loop</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Every LLM agent, however it's branded, is built from the same handful of parts arranged around a loop
                  (the diagram above shows it). Learn these five components and you can read any agent framework:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Reasoning core (the LLM).</strong> Decides the next action. Everything else exists to feed it good context and carry out what it chooses.</li>
                    <li>• <strong>Goal &amp; perception.</strong> The task, plus whatever the agent can currently observe — the user's request, tool outputs, environment state.</li>
                    <li>• <strong>Planning.</strong> Breaking the goal into steps. Sometimes an explicit up-front plan, sometimes step-by-step reasoning as it goes.</li>
                    <li>• <strong>Tools (actions).</strong> How the agent affects the world: web search, code execution, API calls, database queries, RAG retrieval. Increasingly wired up through <RefLink href="https://modelcontextprotocol.io/">MCP</RefLink>.</li>
                    <li>• <strong>Memory.</strong> Short-term (the context window for the current run) and long-term (a vector store or database it can read from and write to across runs).</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The loop that ties them together is usually some form of <strong>ReAct</strong> — reason, act, observe,
                  repeat — introduced by{" "}
                  <RefLink href="https://arxiv.org/abs/2210.03629">Yao et al. (2022)</RefLink>. The agent thinks about
                  what to do, calls a tool, reads the result, and feeds that back into the next decision, looping until
                  the goal is reached or a stop condition trips. More capable agents add a{" "}
                  <em>reflection</em> step — critiquing their own output and retrying — as in the{" "}
                  <RefLink href="https://arxiv.org/abs/2303.11366">Reflexion</RefLink> pattern.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, RAG, LLMs, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="types" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Types of AI agents</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There are two useful ways to slice this. Classic AI theory (Russell &amp; Norvig) defines five agent
                  types by how they decide:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Type</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How it decides</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {typesTable.map((r) => (
                            <TableRow key={r.type}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.type}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.how}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.ex}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In modern practice, LLM agents are usually described by <strong>pattern</strong> rather than by that
                  taxonomy:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Pattern</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {modernTable.map((r) => (
                            <TableRow key={r.pattern}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.pattern}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.how}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="examples" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Real-world AI agent examples</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The fastest way to understand agents is to look at ones people actually use in 2026:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Coding agents:</strong> Claude Code, Cursor, and Devin take a task ("fix this bug," "add this feature") and edit code, run tests, and iterate. See our <Link to="/blog/best-ai-coding-agents" className="text-primary hover:underline">ranked comparison of AI coding agents</Link>.</li>
                    <li>• <strong>Research agents:</strong> OpenAI Deep Research and similar tools browse dozens of sources, take notes, and synthesize a cited report — a planning-plus-tool loop over the web.</li>
                    <li>• <strong>Computer-use agents:</strong> OpenAI's Operator and Anthropic's computer use control a real browser or desktop — clicking, typing, and reading the screen to complete tasks.</li>
                    <li>• <strong>Open-source agents:</strong> projects like <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes</Link> and AutoGPT-style runners let you run autonomous agents with your own keys and models.</li>
                    <li>• <strong>Business agents:</strong> customer-support agents that resolve tickets end-to-end, data-analysis agents that query warehouses and chart results, and workflow agents that chain internal tools.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  When multiple agents coordinate — one planning, others executing — you get a multi-agent system. Google's{" "}
                  <Link to="/blog/google-a2a" className="text-primary hover:underline">A2A protocol</Link> is one attempt
                  at a standard for how those peer agents talk to each other.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="is-chatgpt" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Is ChatGPT an AI agent?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It depends on the mode. <strong>Plain ChatGPT — typing a message and getting a reply — is not an
                  agent.</strong> It's a responder: one input, one output, no autonomous planning and no tool loop.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  But ChatGPT running in an <strong>agentic mode</strong> — browsing, code execution, Deep Research, or
                  Operator/computer use — <em>is</em> acting as an agent. In those modes it plans steps, calls tools,
                  reads the results, and loops until the task is finished. Same model, different wiring: the agent is the
                  loop and the tools around the model, not the model alone. That's the mental model to carry into any
                  "is X an agent?" question.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="build" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to build an AI agent</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You don't need a framework to start — the minimum viable agent is an LLM, a few tools, and a loop — but
                  frameworks handle the plumbing once you go past a prototype. The practical path:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Pick a capable model.</strong> Agent reliability lives and dies on the reasoning core; use a strong frontier model while you're getting it working.</li>
                    <li><strong>Define one clear goal and a small tool set.</strong> Two or three good tools beat ten flaky ones. Narrow scope first.</li>
                    <li><strong>Wrap it in a loop.</strong> Let the model plan, call a tool, read the result, and decide again — with a hard stop on steps or cost.</li>
                    <li><strong>Add memory and guardrails.</strong> Persist what matters, validate tool inputs/outputs, and keep a human in the loop for risky actions.</li>
                    <li><strong>Evaluate relentlessly.</strong> Agents fail in long, compounding ways — build evals before you scale, not after.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Common frameworks in 2026: <strong>LangGraph</strong> (graph-based control), <strong>CrewAI</strong>{" "}
                  (multi-agent roles), the <strong>Claude Agent SDK</strong>, and the <strong>OpenAI Agents SDK</strong> —
                  most now speak <RefLink href="https://modelcontextprotocol.io/">MCP</RefLink> for tools. If agent
                  engineering is a skill you're building toward, our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>{" "}
                  and <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">AI engineer skills checklist</Link>{" "}
                  sequence the fundamentals that agent work sits on top of.
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
                  <li>• <RefLink href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic — Building Effective Agents</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2210.03629">Yao et al. — ReAct: Synergizing Reasoning and Acting in Language Models (2022)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2303.11366">Shinn et al. — Reflexion: Language Agents with Verbal Reinforcement Learning (2023)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/">Model Context Protocol (MCP) — specification and docs</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/what-are-ai-agents" />
      <Footer />
    </div>
  );
};

export default AIAgentsExplainedPost;
