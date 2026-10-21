import { ArrowLeft, Clock, User, Calendar, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ManagedAgentsHeroDiagram from "@/components/ManagedAgentsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const DOCS = "https://platform.claude.com/docs/en/managed-agents/overview";
const PRICING = "https://platform.claude.com/docs/en/about-claude/pricing#claude-managed-agents-pricing";

const quickstart = `# From Anthropic's Managed Agents quickstart (Python), trimmed.
# Every Managed Agents endpoint needs the managed-agents-2026-04-01 beta header.
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-5-5",
    system="You are a helpful coding assistant. Write clean, well-documented code.",
    tools=[{"type": "agent_toolset_20260401"}],
)

environment = client.beta.environments.create(
    name="quickstart-env",
    config={"type": "cloud",
            "networking": {"type": "limited", "allow_package_managers": True}},
)

session = client.beta.sessions.create(
    agent=agent.id, environment_id=environment.id, title="Quickstart session",
)

with client.beta.sessions.events.stream(session.id) as stream:
    client.beta.sessions.events.send(session.id, events=[{
        "type": "user.message",
        "content": [{"type": "text", "text": "Create a Python script that generates the first 20 "
                     "Fibonacci numbers and saves them to fibonacci.txt"}],
    }])
    for event in stream:
        ...  # agent.message / agent.tool_use / session.status_idle`;

const options = [
  { option: "Claude Managed Agents", who: "Anthropic hosts the agent loop, sandbox, and session state", models: "Claude only", best: "Long-running, asynchronous Claude agents without running infrastructure" },
  { option: "Claude Agent SDK", who: "You run it, in a process you operate", models: "Claude only", best: "Embedding Claude Code's harness in your own app or infrastructure" },
  { option: "Claude Code (CLI)", who: "You, on your machine", models: "Claude only", best: "Interactive coding in a terminal or IDE" },
  { option: "AWS Bedrock AgentCore", who: "AWS hosts; you bring the agent", models: "Any framework, any model", best: "Teams standardised on AWS, mixing models and frameworks" },
  { option: "Google Gemini Enterprise Agent Platform (formerly Vertex AI Agent Engine)", who: "Google Cloud hosts; you bring the agent", models: "ADK, LangChain, LangGraph, LlamaIndex, custom", best: "Teams on Google Cloud building with ADK or LangGraph" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is Claude Managed Agents?",
    a: "Claude Managed Agents is Anthropic's hosted service for running Claude as an autonomous agent. Anthropic describes it as a pre-built, configurable agent harness that runs in managed infrastructure, best for long-running tasks and asynchronous work. You define an agent (model, system prompt, tools, MCP servers, skills) and an environment (a cloud sandbox Anthropic manages, or your own), then start sessions that Anthropic runs, keeping their state and event history on its side. It launched in public beta on April 8, 2026.",
  },
  {
    q: "How much does Claude Managed Agents cost?",
    a: "Two charges: tokens at the standard model rates, plus $0.08 per session-hour of runtime. Runtime is measured to the millisecond and only counts while a session's status is running, not while it is idle or terminated, and it replaces separate container-hour billing. Web search costs $10 per 1,000 searches, the Batch API discount does not apply, and pinning inference to the US adds a 1.1x multiplier. Anthropic's own example, a one-hour Opus 5.5 session with 50,000 input and 15,000 output tokens, costs $0.58, or about $0.43 with prompt caching.",
  },
  {
    q: "What is the difference between Claude Managed Agents and the Claude Agent SDK?",
    a: "Where the agent runs. The Claude Agent SDK is a library that runs Claude Code's agent harness in a process you operate, so you host the loop, the sandbox, and the state. Managed Agents is the same idea hosted by Anthropic: Anthropic runs the agent loop, provides the sandbox, stores the session and its events, and you talk to it over an API. Choose the SDK for full control and your own infrastructure; choose Managed Agents to skip running agent infrastructure.",
  },
  {
    q: "Is Claude Managed Agents generally available?",
    a: "Not yet. As of October 2026 it is in public beta: every endpoint requires the managed-agents-2026-04-01 beta header, though access is enabled by default for all API accounts. Some features, such as MCP tunnels and the memory feature Anthropic calls dreaming, are in a narrower research preview that you have to request.",
  },
  {
    q: "What tools can a Claude Managed Agent use?",
    a: "The built-in agent toolset includes bash, read, write, edit, glob, grep, web fetch, and web search. You can also add custom tools that your own code executes, connect MCP servers through the MCP connector (with OAuth credentials stored in vaults), and attach skills to the agent.",
  },
  {
    q: "What are the downsides of Claude Managed Agents?",
    a: "It runs Claude models only, so teams that want to mix providers see lock-in; session data lives in Anthropic's managed storage; it is not currently eligible for Zero Data Retention or HIPAA BAA coverage; it is still in beta; and Anthropic does not document sandbox CPU, memory, or maximum session length. Agents running unattended can also run up token costs, so set per-session budgets.",
  },
];

const ClaudeManagedAgentsPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-700 rounded-full px-3 py-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Claude Managed Agents Explained: What It Is, How It Works, Pricing, and When to Use It (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Anthropic will now run your Claude agent for you: the loop, the sandbox, and the state.</strong>{" "}
                This guide explains what Claude Managed Agents is, its four building blocks, a working quickstart, the
                exact pricing, how it compares with the Claude Agent SDK, AWS Bedrock AgentCore, and Google's agent
                platform, and when it is the right choice.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-700 flex items-center justify-center flex-shrink-0">
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
                      Oct 20, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <ManagedAgentsHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> Claude Managed Agents is Anthropic's hosted agent service, in public beta since
                April 8, 2026. You define an Agent (model, prompt, tools, MCP servers, skills) and an Environment (an
                Anthropic cloud sandbox or your own), then start Sessions that Anthropic runs and stores, streaming
                Events back to you. It costs standard token prices plus $0.08 per session-hour of running time. Use it
                for long-running, asynchronous Claude agents when you don't want to operate agent infrastructure; use
                the Claude Agent SDK if you need to host it yourself or a multi-model platform if you need other
                providers.
              </p>
            </div>

            <ExploreWithAI path="/blog/claude-managed-agents" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is Claude Managed Agents?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's{" "}
                  <RefLink href={DOCS}>documentation</RefLink> defines it as a "pre-built, configurable agent harness
                  that runs in managed infrastructure. Best for long-running tasks and asynchronous work." In plainer
                  terms: the agent loop that powers Claude Code, plus a sandbox for it to work in, plus durable session
                  storage, offered as an API. You send a task; Anthropic runs the agent until it is done or needs you.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It{" "}
                  <RefLink href="https://claude.com/blog/claude-managed-agents">launched on April 8, 2026</RefLink>{" "}
                  and is still in public beta: every endpoint requires the <code>managed-agents-2026-04-01</code> beta
                  header, though access is on by default for all API accounts. If the vocabulary is new, two earlier
                  posts help: an{" "}
                  <Link to="/blog/what-is-an-agent-harness" className="text-primary hover:underline">agent harness</Link>{" "}
                  is everything around the model that lets it act, and an{" "}
                  <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">agent runtime</Link>{" "}
                  is the production layer that keeps it running. Managed Agents is Anthropic selling you both,
                  pre-assembled.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-it-works" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How does Claude Managed Agents work?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There are four objects:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Agent</strong>: the reusable definition, with model, system prompt, tools, MCP servers, and skills.</li>
                    <li>• <strong>Environment</strong>: where it runs. Either an Anthropic-managed cloud sandbox or a self-hosted sandbox on your own infrastructure, with networking rules.</li>
                    <li>• <strong>Session</strong>: one running instance of an agent in an environment. Anthropic keeps its state and event history server-side, so it survives disconnects.</li>
                    <li>• <strong>Events</strong>: what flows in and out: user turns, tool results, and status updates, streamed over server-sent events.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's engineering post,{" "}
                  <RefLink href="https://anthropic.com/engineering/managed-agents">Scaling Managed Agents: Decoupling the brain from the hands</RefLink>,
                  explains the design: the "brain" (Claude plus the harness) is separated from the "hands" (sandboxes and
                  tools) and from the session log, so each can fail, scale, and be replaced independently. Anthropic
                  reports that after this change "p50 TTFT dropped roughly 60% and p95 dropped over 90%."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On top of that sit the features you would otherwise build yourself: a built-in toolset (bash, read,
                  write, edit, glob, grep, web fetch, web search), custom tools your code executes,{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">MCP servers</Link> with OAuth
                  credentials kept in vaults, skills, multi-agent coordination, scheduled (cron) deployments, per-session
                  budgets, permission policies, outcome rubrics, and the ability to steer or interrupt a running agent.
                  The harness also handles prompt caching and context compaction for you.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="quickstart" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Claude Managed Agents quickstart</h2>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  The{" "}
                  <RefLink href="https://platform.claude.com/docs/en/managed-agents/quickstart">official quickstart</RefLink>{" "}
                  creates the three objects and streams the result:
                </p>
                <pre className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-xs sm:text-sm">
                  <code>{quickstart}</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There are SDKs for Python, TypeScript, Java, Go, C#, Ruby, and PHP, a CLI (<code>ant apply agent.md</code>{" "}
                  lets you define an agent in a Markdown or YAML file), and in Claude Code the command{" "}
                  <code>/claude-api managed-agents-onboard</code> walks you through setup.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agent platforms, harnesses, runtimes, and what they really cost: one practical email a week for engineers. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="pricing" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How much does Claude Managed Agents cost?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Per Anthropic's{" "}
                  <RefLink href={PRICING}>pricing page</RefLink>, you pay for two things, "tokens and session runtime":
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Tokens</strong> at the standard rate of whichever model the agent uses, with prompt caching discounts applied.</li>
                    <li>• <strong>$0.08 per session-hour</strong> of runtime, "measured to the millisecond", counted only while the session is <code>running</code>. Idle, rescheduling, and terminated time is free.</li>
                    <li>• Session runtime <strong>replaces</strong> container-hour billing, so there is no separate charge for the sandbox.</li>
                    <li>• Web search: $10 per 1,000 searches. No Batch API discount. US-only inference: 1.1x.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's worked example: a one-hour session on Opus 5.5 that uses 50,000 input and 15,000 output
                  tokens costs <strong>$0.20 + $0.30 + $0.08 = $0.58</strong>, or about $0.43 with caching. The
                  runtime fee is small; tokens dominate. That makes model choice and context management the real cost
                  levers, the same ones we cover in{" "}
                  <Link to="/blog/llm-routing" className="text-primary hover:underline">LLM routing</Link>. Set a
                  per-session budget before you let an agent run unattended.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="comparison" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Claude Managed Agents vs Agent SDK vs AgentCore vs Google's agent platform</h2>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Option</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Who runs the agent</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Models / frameworks</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {options.map((o) => (
                            <TableRow key={o.option}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{o.option}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{o.who}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{o.models}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{o.best}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The sharpest line is <strong>who runs the loop</strong>. Anthropic's{" "}
                  <RefLink href="https://code.claude.com/docs/en/agent-sdk/overview">Agent SDK overview</RefLink>{" "}
                  puts it plainly: the SDK runs the agent "in a process you operate," while Managed Agents means
                  Anthropic hosts the agent. The second line is <strong>model choice</strong>.{" "}
                  <RefLink href="https://aws.amazon.com/bedrock/agentcore/">Bedrock AgentCore</RefLink> advertises "any
                  framework, any model" (and lists the Claude Agent SDK as a supported framework), and{" "}
                  <RefLink href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview">Google's agent platform</RefLink>{" "}
                  hosts ADK, LangChain, LangGraph, and LlamaIndex agents. Managed Agents is Claude-only. If you build with
                  an open-source framework, see our{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">agent frameworks comparison</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="limits" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Limits and what to watch</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Still beta.</strong> APIs may change; MCP tunnels and the "dreaming" memory feature are a separate research preview.</li>
                    <li>• <strong>Compliance.</strong> Anthropic says it is "not currently eligible for Zero Data Retention or HIPAA BAA coverage." You can delete sessions and files through the API.</li>
                    <li>• <strong>Where it runs.</strong> Available on the Claude Platform (including Claude Platform on AWS), but Anthropic's pricing page notes it is "not available on partner-operated cloud platforms."</li>
                    <li>• <strong>Rate limits.</strong> 300 requests per minute on create endpoints and 1,200 on read endpoints per organization, on top of your usage tier.</li>
                    <li>• <strong>Undocumented limits.</strong> Sandbox CPU, memory, disk, and maximum session length aren't published; test your longest job before you depend on it.</li>
                    <li>• <strong>Lock-in.</strong> The main complaint in the <RefLink href="https://news.ycombinator.com/item?id=47693047">Hacker News launch thread</RefLink> (169 points) and in <RefLink href="https://venturebeat.com/orchestration/anthropics-claude-managed-agents-gives-enterprises-a-new-one-stop-shop-but">VentureBeat's coverage</RefLink>: one model provider, with session data in Anthropic's managed database.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's launch customers give a sense of the target: Notion, Rakuten, Asana, Sentry, and Atlassian
                  among them, with Sentry running a debugging agent and a patch-writing agent. That is the sweet spot:
                  well-defined, asynchronous jobs that take minutes to hours, where the team wants results, not agent
                  infrastructure. Pair it with sensible{" "}
                  <Link to="/blog/ai-guardrails" className="text-primary hover:underline">guardrails on tool calls</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when-to-use" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When should you use Claude Managed Agents?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Use it</strong> if you are already on Claude, the job is long-running or asynchronous (research, code changes, data work), and you don't want to run sandboxes, queues, and session storage yourself.</li>
                    <li>• <strong>Use the Claude Agent SDK</strong> if you need the agent inside your own infrastructure, on a partner cloud, or under data rules Managed Agents can't meet yet.</li>
                    <li>• <strong>Use AgentCore or Google's platform</strong> if you need to mix model providers or already standardise on that cloud.</li>
                    <li>• <strong>Use a plain tool-calling loop</strong> if the task is short and synchronous; an agent platform is overkill for a few tool calls. For coordinating several agents, see <Link to="/blog/multi-agent-orchestration-patterns" className="text-primary hover:underline">multi-agent orchestration patterns</Link>.</li>
                  </ul>
                </div>
              </section>

              <ExploreWithAI path="/blog/claude-managed-agents" variant="questions" />

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
                  <li>• <RefLink href={DOCS}>Anthropic — Claude Managed Agents overview (docs)</RefLink></li>
                  <li>• <RefLink href="https://platform.claude.com/docs/en/managed-agents/quickstart">Anthropic — Managed Agents quickstart</RefLink></li>
                  <li>• <RefLink href="https://platform.claude.com/docs/en/managed-agents/tools">Anthropic — Managed Agents tools</RefLink></li>
                  <li>• <RefLink href="https://platform.claude.com/docs/en/managed-agents/reference">Anthropic — Managed Agents API reference and limits</RefLink></li>
                  <li>• <RefLink href={PRICING}>Anthropic — Pricing: Claude Managed Agents</RefLink></li>
                  <li>• <RefLink href="https://claude.com/blog/claude-managed-agents">Anthropic — Claude Managed Agents launch (Apr 8, 2026)</RefLink></li>
                  <li>• <RefLink href="https://anthropic.com/engineering/managed-agents">Anthropic Engineering — Scaling Managed Agents: Decoupling the brain from the hands</RefLink></li>
                  <li>• <RefLink href="https://code.claude.com/docs/en/agent-sdk/overview">Anthropic — Agent SDK overview (SDK vs Claude Code vs Managed Agents)</RefLink></li>
                  <li>• <RefLink href="https://aws.amazon.com/bedrock/agentcore/">AWS — Amazon Bedrock AgentCore</RefLink></li>
                  <li>• <RefLink href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview">Google Cloud — Agent Engine overview</RefLink></li>
                  <li>• <RefLink href="https://venturebeat.com/orchestration/anthropics-claude-managed-agents-gives-enterprises-a-new-one-stop-shop-but">VentureBeat — Claude Managed Agents and lock-in risk</RefLink></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base">
                  <em>Pricing and beta status verified against Anthropic's docs on October 20, 2026.</em>
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/claude-managed-agents" />
      <Footer />
    </div>
  );
};

export default ClaudeManagedAgentsPost;
