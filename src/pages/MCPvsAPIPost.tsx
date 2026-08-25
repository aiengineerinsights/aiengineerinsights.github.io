import { ArrowLeft, Clock, User, Calendar, Plug, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import MCPHeroDiagram from "@/components/MCPHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const vsApi = [
  { aspect: "What it is", api: "A general interface between two pieces of software", mcp: "A specific open protocol for connecting LLM apps to tools and data" },
  { aspect: "Who it's for", api: "Developers, who write integration code", mcp: "The model / agent, which calls tools at runtime" },
  { aspect: "Discovery", api: "Read the docs, hard-code each endpoint", mcp: "Self-describing — the host lists available tools automatically" },
  { aspect: "What it exposes", api: "Endpoints (REST, GraphQL, RPC…)", mcp: "Standard Tools, Resources, and Prompts" },
  { aspect: "Integration cost", api: "M×N — every app wired to every tool", mcp: "M+N — write one server, any host uses it" },
  { aspect: "Transport", api: "Usually HTTP", mcp: "JSON-RPC 2.0 over stdio or streamable HTTP" },
  { aspect: "Relationship", api: "The thing being called", mcp: "Usually wraps an API so a model can use it" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is MCP in simple terms?",
    a: "MCP (Model Context Protocol) is an open standard for connecting AI apps to external tools and data. Instead of writing custom glue code for every tool in every AI app, you expose a tool once as an MCP server, and any MCP-compatible host — Claude, ChatGPT, an IDE, your own agent — can use it. Anthropic describes it as a 'USB-C port for AI applications.'",
  },
  {
    q: "What is the difference between MCP and an API?",
    a: "An API is a general interface you write code against, one integration at a time. MCP is one standardized, model-facing protocol that makes tools self-describing and reusable across every AI app. They aren't competitors: an MCP server usually calls an API under the hood — MCP is the layer that lets an LLM discover and use that API in a uniform way.",
  },
  {
    q: "Is MCP better than a REST API?",
    a: "It's not better or worse — it operates at a different layer. Use a plain API for deterministic app-to-app integration with no model in the loop. Use MCP when you want an LLM or agent to discover and call tools, especially across multiple AI hosts. In practice MCP servers wrap REST APIs, so you often use both together.",
  },
  {
    q: "What is the difference between RAG and MCP?",
    a: "RAG (retrieval-augmented generation) is a technique for pulling relevant knowledge into a model's context. MCP is a protocol for connecting tools and data sources. They're at different layers and are often combined — you can expose a retrieval/RAG capability as an MCP server so any agent can search your knowledge base as a standard tool.",
  },
  {
    q: "Who created MCP and is it open?",
    a: "MCP was introduced and open-sourced by Anthropic in late 2024. The specification is public, with SDKs in several languages, and it saw broad adoption across the industry through 2025 — including support from other model providers and many IDEs and agent frameworks.",
  },
  {
    q: "How do I build an MCP server?",
    a: "Pick an official MCP SDK (TypeScript or Python are common), define the Tools, Resources, and Prompts you want to expose, wrap whatever API or data source they call, and run the server over stdio (for local) or HTTP (for remote). Point an MCP host — Claude Desktop, an IDE, or your agent — at it, and the tools become available automatically.",
  },
];

const MCPvsAPIPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-800 rounded-full px-3 py-1">
                  <Plug className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                MCP vs API: What the Model Context Protocol Actually Is (and When to Use It)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>MCP and an API aren't competitors.</strong> An API is a general interface you write code against;
                <strong> MCP (Model Context Protocol)</strong> is one open, model-facing standard for connecting AI apps
                to tools and data — and it usually wraps an API underneath. The payoff is standardization: write a tool
                once as an MCP server and any AI host can use it, turning the M×N integration problem into M+N. Here's
                what MCP is, how it differs from a plain API, how it works, how it relates to RAG, and when to reach for
                each.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-800 flex items-center justify-center flex-shrink-0">
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
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <MCPHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is MCP (Model Context Protocol)?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  MCP is an <strong>open protocol for connecting AI applications to external tools and data sources.</strong>{" "}
                  It was introduced and open-sourced by{" "}
                  <RefLink href="https://www.anthropic.com/news/model-context-protocol">Anthropic in late 2024</RefLink>{" "}
                  and adopted across the industry through 2025. The problem it solves is boring but expensive: before MCP,
                  every AI app needed custom integration code for every tool it wanted to use. Ten apps and ten tools
                  meant a hundred bespoke integrations.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  MCP fixes that the way USB-C fixed chargers, or the way the Language Server Protocol fixed editor
                  tooling: a single standard connector. You expose a capability once as an <strong>MCP server</strong>,
                  and any <strong>MCP host</strong> — Claude, ChatGPT, an IDE like Cursor, or your own{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link> — can
                  discover and use it without custom glue. Anthropic's own phrase for it is a "USB-C port for AI
                  applications."
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="vs-api" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">MCP vs API: the real difference</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The question "MCP vs API" is slightly the wrong frame, because MCP is built <em>on top of</em> APIs —
                  an MCP server almost always calls a REST or database API underneath. The useful contrast is what each
                  is <em>for</em>: an API is a general interface a developer codes against; MCP is a model-facing
                  protocol that makes those interfaces discoverable and reusable by any AI app.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Aspect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Traditional API</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">MCP</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vsApi.map((r) => (
                            <TableRow key={r.aspect}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.aspect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.api}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.mcp}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The single biggest win is the last-but-one row. Custom integrations scale as M×N — every AI app times
                  every tool. MCP collapses that to <strong>M+N</strong>: write a server once, and every host that speaks
                  MCP gets it for free.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="architecture" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How MCP works: architecture</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  MCP is a client-server protocol built on <RefLink href="https://www.jsonrpc.org/specification">JSON-RPC 2.0</RefLink>.
                  Three roles (shown in the diagram above):
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Host.</strong> The AI application the user interacts with — Claude Desktop, an IDE, an agent runtime.</li>
                    <li>• <strong>Client.</strong> Lives inside the host and holds one connection to each server.</li>
                    <li>• <strong>Server.</strong> Exposes capabilities over MCP, usually wrapping an API, database, or filesystem.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Each server offers three standard primitives: <strong>Tools</strong> (actions the model can call, like
                  "create a GitHub issue"), <strong>Resources</strong> (data/context the app can read, like a file or
                  record), and <strong>Prompts</strong> (reusable templates a user can invoke). Servers run over{" "}
                  <strong>stdio</strong> for local processes or <strong>streamable HTTP</strong> for remote ones. Because
                  the primitives are standard and self-describing, the host can list a server's tools at runtime — no
                  hard-coding.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="MCP, agents, RAG, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="rag-vs-mcp" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">RAG vs MCP: not the same thing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These get compared a lot, but they solve different problems at different layers.{" "}
                  <strong>RAG (retrieval-augmented generation) is a technique</strong> for pulling relevant knowledge
                  into a model's context before it answers. <strong>MCP is a protocol</strong> for connecting tools and
                  data sources to AI apps. They're complementary, not competing.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In fact, the cleanest way to ship RAG to an agent is <em>through</em> MCP: wrap your retrieval pipeline
                  (embeddings, vector search, reranking) in an MCP server that exposes a <code>search_knowledge_base</code>{" "}
                  tool. Now any MCP host can do retrieval against your data with zero custom integration. RAG is the
                  <em> what</em>; MCP is one clean <em>how</em> to deliver it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When to use MCP vs a plain API</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Reach for MCP</strong> when an LLM or agent needs to discover and call tools, especially if you want the same tool to work across multiple AI hosts, or you're building agents that plug into many capabilities.</li>
                    <li>• <strong>Reach for a plain API</strong> when it's deterministic app-to-app integration with no model in the loop, when you need maximum control or performance, or when only one consumer will ever call it.</li>
                    <li>• <strong>Usually you use both:</strong> the MCP server is a thin, model-friendly wrapper around your existing API, adding discovery, standard primitives, and reuse.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="examples" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">MCP examples and ecosystem</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There's a large and growing library of ready-made MCP servers — filesystem, GitHub, Google Drive,
                  Slack, Postgres, Puppeteer/browser, and web search among them — plus SDKs to build your own in
                  TypeScript, Python, and other languages. On the host side, Claude Desktop, popular IDEs and coding
                  agents (see our{" "}
                  <Link to="/blog/best-ai-coding-agents" className="text-primary hover:underline">ranked AI coding agents</Link>),
                  and custom agent frameworks all speak MCP. That two-sided adoption is exactly why writing one server is
                  worth it: it lights up everywhere at once.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="build" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to build an MCP server</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The minimum path:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Pick an SDK</strong> — the official TypeScript or Python SDK is the usual starting point.</li>
                    <li><strong>Define your primitives.</strong> List the Tools, Resources, and Prompts you want to expose, with clear names and descriptions (the model reads these).</li>
                    <li><strong>Wrap the backend.</strong> Each tool calls your existing API, database, or filesystem.</li>
                    <li><strong>Choose a transport.</strong> stdio for local, streamable HTTP for remote.</li>
                    <li><strong>Connect a host</strong> — point Claude Desktop, your IDE, or your agent at the server, and the tools appear automatically.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Building tool-using agents is core AI-engineering work in 2026. If you're leveling up toward it, our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>{" "}
                  and <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">skills checklist</Link>{" "}
                  cover the fundamentals underneath MCP and agents.
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
                  <li>• <RefLink href="https://www.anthropic.com/news/model-context-protocol">Anthropic — Introducing the Model Context Protocol</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/">Model Context Protocol — official documentation and specification</RefLink></li>
                  <li>• <RefLink href="https://github.com/modelcontextprotocol/servers">MCP reference servers (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://www.jsonrpc.org/specification">JSON-RPC 2.0 specification</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/mcp-vs-api" />
      <Footer />
    </div>
  );
};

export default MCPvsAPIPost;
