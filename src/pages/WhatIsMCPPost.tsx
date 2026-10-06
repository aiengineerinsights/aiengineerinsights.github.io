import { ArrowLeft, Clock, User, Calendar, Network, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import WhatIsMCPHeroDiagram from "@/components/WhatIsMCPHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const rolesTable = [
  { role: "MCP Host", what: "The AI application the user is actually using — Claude Desktop, Claude Code, an IDE, or your own agent.", does: "Coordinates one or more MCP clients, decides which servers to connect to, and owns the LLM loop." },
  { role: "MCP Client", what: "A component inside the host. The host creates one client per server.", does: "Maintains a dedicated connection to a single MCP server and relays requests and responses." },
  { role: "MCP Server", what: "A separate program (local or remote) that wraps a tool, data source, or workflow.", does: "Exposes capabilities — tools, resources, prompts — to any client that speaks the protocol." },
];

const primitivesTable = [
  { primitive: "Tools", is: "Executable functions the model can call — run a query, create an issue, send a message.", example: "A GitHub server exposes create_issue and search_code." },
  { primitive: "Resources", is: "Read-only data the host can pull into the model's context — files, records, documents.", example: "A filesystem server exposes file contents by URI." },
  { primitive: "Prompts", is: "Reusable prompt templates the server offers, usually surfaced to the user as commands.", example: "A server ships a 'summarize this PR' template." },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is MCP?",
    a: "MCP (Model Context Protocol) is an open standard for connecting AI applications to external tools, data sources, and workflows. It was introduced and open-sourced by Anthropic in November 2024 and defines a client-server protocol: an AI app (the host) runs MCP clients that connect to MCP servers, and each server exposes capabilities — tools, resources, and prompts — that the AI can discover and use at runtime. The goal is that a tool integrated once as an MCP server works with any MCP-compatible AI application.",
  },
  {
    q: "What does MCP stand for?",
    a: "MCP stands for Model Context Protocol. 'Model' refers to the AI model, 'context' is the external information and tools the model needs to do useful work, and 'protocol' means it is a standardized, specified way of exchanging that context — not a product or a library.",
  },
  {
    q: "What is an MCP server?",
    a: "An MCP server is a program that exposes capabilities to AI applications over the Model Context Protocol. It can expose three kinds of things: tools (functions the model can call), resources (data the host can read into context), and prompts (reusable prompt templates). A server can run locally on your machine, communicating over stdio, or remotely as a web service using Streamable HTTP. Examples include servers for the filesystem, Git, GitHub, Slack, and databases.",
  },
  {
    q: "What is MCP in AI?",
    a: "In AI systems, MCP is the standard way an AI agent or assistant discovers and calls external tools and data at runtime. Instead of hard-coding each integration into the agent, the agent connects to MCP servers, asks each one what it offers, and calls those capabilities through a common message format (JSON-RPC 2.0). It sits alongside agent frameworks, which handle reasoning and orchestration, and agent-to-agent protocols like A2A, which handle communication between agents.",
  },
  {
    q: "Who created MCP and is it open source?",
    a: "Anthropic introduced MCP and open-sourced it on November 25, 2024, releasing a specification, SDKs, and a repository of reference servers. It is an open standard with a public, versioned specification maintained at modelcontextprotocol.io, and the SDKs and reference servers are developed in the open on GitHub under the modelcontextprotocol organization.",
  },
  {
    q: "Is MCP only for Claude?",
    a: "No. MCP started at Anthropic, but it is an open standard and is not tied to Claude. The official MCP documentation lists AI assistants including Claude and ChatGPT and developer tools such as Visual Studio Code and Cursor as supporting the protocol, and OpenAI documents MCP support in both its Agents SDK and its platform API. Any application that implements an MCP client can use any MCP server.",
  },
];

const WhatIsMCPPost = () => {
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
                  <Network className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                What Is MCP (Model Context Protocol)? A Plain-English Guide for AI Engineers (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>MCP (Model Context Protocol) is an open standard for connecting AI applications to external
                tools and data.</strong> Introduced by Anthropic in late 2024, it replaces one-off integration code
                with a single client-server protocol: expose a tool once as an MCP server, and any MCP-compatible AI
                app can discover and use it. This guide explains what MCP is, what an MCP server actually does, how the
                architecture works, and where it fits in an{" "}
                <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link> stack — in
                plain English, with the spec cited for every claim.
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
                      <BookOpen className="h-4 w-4 mr-1" />
                      Explainer
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 8, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <WhatIsMCPHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is MCP? A plain-English definition</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>MCP stands for Model Context Protocol.</strong> It is an open standard — a published
                  specification, not a product — that defines how an AI application talks to the outside world:
                  local files, databases, SaaS tools, internal APIs, and reusable workflows. The official
                  documentation describes it as "an open-source standard for connecting AI applications to external
                  systems" (
                  <RefLink href="https://modelcontextprotocol.io/docs/getting-started/intro">MCP docs — What is MCP?</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic introduced and open-sourced MCP on November 25, 2024, shipping the specification, SDKs,
                  local server support in the Claude Desktop apps, and an open-source repository of pre-built servers
                  (
                  <RefLink href="https://www.anthropic.com/news/model-context-protocol">Anthropic — Introducing the Model Context Protocol</RefLink>).
                  The analogy Anthropic and the MCP docs use is a <strong>"USB-C port for AI applications"</strong>:
                  just as USB-C gives every device one standard connector instead of a drawer full of proprietary
                  cables, MCP gives every AI app one standard way to plug into tools and data (
                  <RefLink href="https://modelcontextprotocol.io/docs/getting-started/intro">MCP docs</RefLink>).
                  That framing is theirs, not ours, but it is the right mental model.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two things MCP is <em>not</em>: it is not a model, and it is not an agent framework. It does not
                  decide what the AI should do or how it reasons — the MCP docs are explicit that it "focuses solely
                  on the protocol for context exchange" and does not dictate how applications use LLMs (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/architecture">MCP docs — Architecture</RefLink>).
                  It is the plumbing between an AI app and the systems it needs to reach.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The problem MCP solves: M × N integrations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Before a standard existed, every AI application that wanted to reach a tool had to write its own
                  integration for it. A chat assistant, an IDE agent, and an internal support bot each needed their
                  own GitHub connector, their own Postgres connector, their own Slack connector — with their own
                  auth handling, schema descriptions, and error semantics. With <strong>M</strong> AI apps
                  and <strong>N</strong> tools, that is <strong>M × N</strong> integrations to build and maintain,
                  none of them reusable across apps.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  MCP collapses that to <strong>M + N</strong>. A tool is wrapped once as an MCP server; an AI app
                  implements an MCP client once. From then on, any client can use any server, because both sides
                  speak the same protocol. The MCP docs frame the payoff by audience: developers get reduced
                  integration time and complexity, tool builders reach every MCP-compatible app with a single
                  server, and end users get assistants that can actually act on their data (
                  <RefLink href="https://modelcontextprotocol.io/docs/getting-started/intro">MCP docs — Why does MCP matter?</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A natural question is how this differs from just calling a REST API — the short answer is that MCP
                  is a layer <em>on top of</em> your APIs that makes them discoverable and callable by any AI client,
                  and the deep comparison (MCP vs API, MCP vs RAG, when to use which) lives in our{" "}
                  <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">MCP vs API guide</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="mcp-server" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is an MCP server?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>An MCP server is a program that exposes capabilities — tools, resources, and prompts — to AI
                  applications over the Model Context Protocol.</strong> It can run locally on your machine as a
                  subprocess, or remotely as a web service. The MCP docs define servers as "programs that expose
                  specific capabilities to AI applications through standardized protocol interfaces" (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/server-concepts">MCP docs — Understanding MCP servers</RefLink>).
                  So when someone says "MCP server," they mean a wrapper around something useful — a filesystem,
                  a Git repo, a database, a SaaS product — that any MCP client can plug into.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  To understand where a server sits, you need the three roles the protocol defines (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/architecture">MCP docs — Participants</RefLink>):
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Role</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it is</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rolesTable.map((r) => (
                            <TableRow key={r.role}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.role}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.what}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.does}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An MCP server can expose three kinds of capability. The MCP docs call these the core server
                  features, and each has a different "who triggers it" model: tools are model-controlled (the AI can
                  discover and invoke them, subject to the host's approval controls), resources are
                  application-driven (the host decides how to retrieve and present them as context), and prompts
                  are user-controlled (explicitly invoked, not triggered automatically) (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/server-concepts">MCP docs — Core server features</RefLink>):
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Primitive</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it is</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {primitivesTable.map((r) => (
                            <TableRow key={r.primitive}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.primitive}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.is}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.example}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>A concrete example.</strong> The reference <em>Filesystem</em> server in the official
                  servers repository provides "secure file operations with configurable access controls" (
                  <RefLink href="https://github.com/modelcontextprotocol/servers">modelcontextprotocol/servers — Reference Servers</RefLink>).
                  When Claude Desktop launches it, the server runs as a local subprocess on the same machine; the
                  host creates one MCP client for it, asks the server what tools it offers, and from then on the
                  model can read, search, and write files within the directories you allowed — without Claude
                  Desktop having any filesystem code of its own (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/architecture">MCP docs — Architecture</RefLink>).
                  Swap in a GitHub server and the same client code gives the model issues, pull requests, and code
                  search instead. That interchangeability is the whole point.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, MCP, RAG, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="architecture" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How MCP works: the architecture</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  MCP follows a <strong>client-server architecture</strong>. The host application — Claude Code,
                  Claude Desktop, an IDE, or your own agent — establishes connections to one or more MCP servers by
                  creating one MCP client per server. Each client maintains a dedicated connection to its server.
                  Local servers using stdio typically serve a single client; remote servers using Streamable HTTP
                  typically serve many (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/architecture">MCP docs — Architecture</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The protocol is organized in two layers (
                  <RefLink href="https://modelcontextprotocol.io/docs/learn/architecture">MCP docs — Layers</RefLink>):
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Data layer.</strong> A JSON-RPC 2.0 based exchange protocol that defines message structure and semantics: discovery (a client queries a server's supported protocol versions, capabilities, and identity), the server primitives (tools, resources, prompts), client features such as elicitation (a server asking the user for input), and utility features like notifications for real-time updates and progress tracking for long-running operations.</li>
                    <li>• <strong>Transport layer.</strong> How those messages physically move between client and server — connection establishment, message framing, and authorization. The data layer is the inner layer; the transport is the outer one, and the same messages work over any transport.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Messages are JSON-RPC 2.0.</strong> The specification states that "the protocol uses
                  JSON-RPC 2.0 messages to establish communication between" hosts, clients, and servers, and that
                  messages must be UTF-8 encoded (
                  <RefLink href="https://modelcontextprotocol.io/specification/latest">MCP Specification — Overview</RefLink>
                  ; <RefLink href="https://modelcontextprotocol.io/specification/latest/basic/transports">MCP Specification — Transports</RefLink>).
                  In practice that means a client sends a request like <code>tools/list</code> to discover what a
                  server offers, gets back a JSON description of each tool and its input schema, and later sends{" "}
                  <code>tools/call</code> with arguments when the model decides to use one.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Two standard transports.</strong> The current specification defines two (
                  <RefLink href="https://modelcontextprotocol.io/specification/latest/basic/transports">MCP Specification — Transports</RefLink>):
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>stdio</strong> — newline-delimited JSON-RPC messages over the standard input and output streams of a subprocess the client launches. This is the "local server" case: zero network setup, the server dies when the host does.</li>
                    <li>• <strong>Streamable HTTP</strong> — each message is an HTTP POST to a single MCP endpoint; replies come back as a JSON object or as a request-scoped SSE stream. This is the "remote server" case, used by hosted servers that serve many clients and need authorization.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Clients and servers may also implement custom transports, but those two are what you will meet in
                  the wild. The spec is versioned by date and evolves — always read the <em>latest</em> revision at
                  modelcontextprotocol.io rather than trusting a blog post's snapshot of the details (
                  <RefLink href="https://modelcontextprotocol.io/specification/latest">MCP Specification — latest</RefLink>).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="mcp-in-ai" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is MCP in AI? Where it fits in an agent stack</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In the context of AI systems, MCP is <strong>the standard way an agent or assistant discovers and
                  calls external tools and data at runtime</strong>. An{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link> is a
                  loop: the model observes, decides, acts, and observes again. MCP is how the "act" step reaches
                  anything outside the model — the agent connects to servers, asks each what it can do, and calls
                  those capabilities through a common message format instead of through bespoke glue code. The MCP
                  docs' own examples are agents that read your calendar, query a database, or open a pull request (
                  <RefLink href="https://modelcontextprotocol.io/docs/getting-started/intro">MCP docs — What can MCP enable?</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  MCP <em>complements</em> agent frameworks rather than replacing them. A framework like LangGraph,
                  CrewAI, or the OpenAI Agents SDK handles reasoning, orchestration, memory, and control flow; MCP
                  handles how tools are described and reached. Most of the frameworks in our{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source agent frameworks roundup</Link>{" "}
                  can consume MCP servers as tool sources — OpenAI's Agents SDK, for example, documents MCP support
                  directly (
                  <RefLink href="https://openai.github.io/openai-agents-python/mcp/">OpenAI Agents SDK — Model context protocol</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It also has a sibling. MCP connects an agent to its <em>tools</em>; the{" "}
                  <Link to="/blog/google-a2a" className="text-primary hover:underline">A2A (Agent2Agent) protocol</Link>{" "}
                  connects agents to <em>other agents</em>. They solve different problems and are routinely used
                  together. And if you are wondering how MCP relates to plain APIs or to RAG, that comparison is
                  covered in depth in our{" "}
                  <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">MCP vs API post</Link>{" "}
                  — this guide stays on "what it is and how it works."
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="examples" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Real MCP servers and the ecosystem</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  At launch, Anthropic shipped pre-built servers for Google Drive, Slack, GitHub, Git, Postgres, and
                  Puppeteer, and named Block and Apollo as early adopters, with Zed, Replit, Codeium, and Sourcegraph
                  working to add MCP to their developer tools (
                  <RefLink href="https://www.anthropic.com/news/model-context-protocol">Anthropic — Introducing MCP</RefLink>).
                  Today the official <code>modelcontextprotocol/servers</code> repository holds a smaller set of
                  reference servers meant to demonstrate the protocol and SDKs — Everything, Fetch, Filesystem, Git,
                  Memory, Sequential Thinking, and Time — and points to the{" "}
                  <RefLink href="https://registry.modelcontextprotocol.io/">Official MCP Registry</RefLink> as the
                  place to browse published community and vendor servers (
                  <RefLink href="https://github.com/modelcontextprotocol/servers">modelcontextprotocol/servers</RefLink>).
                  Official SDKs exist for TypeScript, Python, Java, Kotlin, C#, Go, Rust, Swift, Ruby, and PHP, per
                  the same repository.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>On adoption</strong>, we only state what the primary sources say. The official MCP
                  documentation describes MCP as "an open protocol supported across a wide range of clients and
                  servers" and lists AI assistants including Claude and ChatGPT, and development tools including
                  Visual Studio Code and Cursor, as supporting it (
                  <RefLink href="https://modelcontextprotocol.io/docs/getting-started/intro">MCP docs — Broad ecosystem support</RefLink>).
                  OpenAI's platform documentation calls MCP "an open protocol that's becoming the industry standard
                  for extending AI models with additional tools and knowledge" and documents building remote MCP
                  servers for its API (
                  <RefLink href="https://developers.openai.com/api/docs/mcp">OpenAI — Building MCP servers</RefLink>).
                  So the short version is: MCP began at Anthropic, and it is now used across several major AI
                  vendors and most mainstream coding tools — which is exactly what makes writing one server worth it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="getting-started" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to try MCP</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You do not need to write code to see MCP work. The fastest route is to use an application that
                  already ships an MCP client, add one existing server, and watch the model discover and call its
                  tools. The official quickstart walks through adding the Filesystem server to Claude Desktop with a
                  few lines of JSON config (
                  <RefLink href="https://modelcontextprotocol.io/docs/develop/connect-local-servers">MCP docs — Connect to local MCP servers</RefLink>).
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Use an existing client.</strong> Claude Desktop, Claude Code, VS Code, and Cursor all include MCP clients — pick the one you already use.</li>
                    <li>• <strong>Add a server.</strong> Start with a reference server such as Filesystem or Git from the official repository, or browse the Official MCP Registry for a server that wraps a tool you rely on.</li>
                    <li>• <strong>Build one.</strong> When you want to expose your own system, write a server with an official SDK. We keep a step-by-step build walkthrough in the <Link to="/blog/mcp-vs-api#build" className="text-primary hover:underline">"How to build an MCP server" section of the MCP vs API guide</Link>, so we will not duplicate it here.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One habit worth forming early: treat MCP servers like any other dependency you grant access to.
                  A server that exposes tools is a server that can act on your behalf, so read what a server does
                  and scope its permissions (which directories, which repos, which credentials) before wiring it
                  into an agent that runs unattended.
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
                  <li>• <RefLink href="https://modelcontextprotocol.io/docs/getting-started/intro">Model Context Protocol — What is MCP? (official docs)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/docs/learn/architecture">Model Context Protocol — Architecture overview (participants, layers, data layer, transport layer)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/docs/learn/server-concepts">Model Context Protocol — Understanding MCP servers (tools, resources, prompts)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/docs/learn/client-concepts">Model Context Protocol — Understanding MCP clients (elicitation, roots)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/specification/latest">Model Context Protocol — Specification (latest revision)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/specification/latest/basic/transports">Model Context Protocol — Specification: Transports (stdio, Streamable HTTP)</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/docs/develop/connect-local-servers">Model Context Protocol — Connect to local MCP servers (quickstart)</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/news/model-context-protocol">Anthropic — Introducing the Model Context Protocol (Nov 25, 2024)</RefLink></li>
                  <li>• <RefLink href="https://github.com/modelcontextprotocol/servers">GitHub — modelcontextprotocol/servers (reference servers and official SDKs)</RefLink></li>
                  <li>• <RefLink href="https://registry.modelcontextprotocol.io/">Official MCP Registry</RefLink></li>
                  <li>• <RefLink href="https://openai.github.io/openai-agents-python/mcp/">OpenAI Agents SDK — Model context protocol (MCP)</RefLink></li>
                  <li>• <RefLink href="https://developers.openai.com/api/docs/mcp">OpenAI — Building MCP servers for plugins and API integrations</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/what-is-mcp" />
      <Footer />
    </div>
  );
};

export default WhatIsMCPPost;
