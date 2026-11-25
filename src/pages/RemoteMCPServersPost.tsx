import { ArrowLeft, Clock, User, Calendar, Server, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import RemoteMCPHeroDiagram from "@/components/RemoteMCPHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const transportCompare = [
  { aspect: "Transport", stdio: "Standard input/output, child process", http: "Streamable HTTP, single endpoint over the network" },
  { aspect: "Where it runs", stdio: "Same machine as the host", http: "Any host, network, or serverless platform" },
  { aspect: "Who connects", stdio: "One user, one process", http: "Many users and devices against one hosted server" },
  { aspect: "Auth model", stdio: "None required — reads credentials from the local environment", http: "OAuth 2.1, server is a resource server (RFC 9728)" },
  { aspect: "Token issuance", stdio: "N/A", http: "A separate authorization server issues tokens; the MCP server only validates them" },
  { aspect: "Session state", stdio: "Lives in the process", http: "Stateless by spec — no permanent session storage required" },
  { aspect: "Typical use", stdio: "Local dev tools: filesystem, git, local DB", http: "SaaS integrations: Ahrefs, GitHub, Slack, Notion, Linear" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is a remote MCP server?",
    a: "A remote MCP server is an MCP server that runs somewhere other than the user's own machine — on a company's infrastructure, a SaaS vendor's cloud, or a serverless platform — and that an MCP client reaches over the network using the Streamable HTTP transport instead of spawning it as a local stdio child process. Ahrefs, for example, runs a single remote MCP server at a fixed HTTPS endpoint that any customer's AI client can connect to, rather than shipping a binary each user runs locally.",
  },
  {
    q: "Does a remote MCP server need OAuth?",
    a: "Yes, by spec. The MCP authorization specification says HTTP-based transports SHOULD implement OAuth 2.1, while stdio transports SHOULD NOT — they should read credentials from the local environment instead. A remote MCP server acts as an OAuth 2.1 resource server: it validates bearer access tokens on every request but never issues them itself. A separate authorization server (your identity provider, or one hosted alongside the MCP server) handles sign-in and token issuance.",
  },
  {
    q: "What is the difference between local (stdio) and remote (HTTP) MCP servers?",
    a: "Local servers run as a child process on the same machine as the host and read secrets straight from the environment — there's one user, no network hop, and the spec explicitly says to skip the OAuth flow. Remote servers run over the network via Streamable HTTP, serve many users and devices from one deployment, and must authenticate every request with a bearer token validated against OAuth 2.0 Protected Resource Metadata (RFC 9728).",
  },
  {
    q: "What new MCP features push teams toward remote servers?",
    a: "Anthropic's November 2026 update — reported after the protocol passed 700 million monthly SDK downloads — made Tasks (background jobs a server runs and reports back on) and Elicitation (a server pausing to ask the user for missing input) generally available, both aimed at servers operating more independently of a single chat session. Anthropic also shipped Enterprise Managed Auth, letting admins approve a remote server once so every employee connects automatically, and MCP Apps, which lets a remote server embed a full UI inside Claude.",
  },
  {
    q: "Is a remote MCP server more secure or less secure than a local one?",
    a: "Neither is inherently safer — the risk just moves. A local server trusts whatever is in your environment variables and can read your filesystem directly. A remote server adds a network attack surface and a token-management problem: the MCP spec explicitly forbids a server from passing through a token it didn't issue, because doing so invites the confused-deputy attack OWASP's MCP Top 10 catalogs. Either way, treat every third-party MCP server as untrusted and scope its credentials tightly — see our guide to vetting MCP server permissions.",
  },
  {
    q: "Can one remote MCP server serve multiple users?",
    a: "That's the main reason to go remote. A stdio server is one process per user on their own machine. A single remote MCP server deployment, protected by per-user OAuth tokens, can serve every customer of a SaaS product — which is exactly the model Ahrefs, GitHub, and other vendors use instead of asking each user to install and run a local binary.",
  },
];

const RemoteMCPServersPost = () => {
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
                  <Server className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Remote MCP Servers Explained: OAuth, Hosting, and When to Skip Local stdio (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>A remote MCP server runs over the network instead of on the user's own machine</strong> — reached
                via the Streamable HTTP transport instead of a local stdio child process — which means it has to
                authenticate every request with OAuth 2.1 instead of just reading credentials from the environment. Use
                a <strong>local (stdio) server</strong> for single-user developer tools on your own machine; use a{" "}
                <strong>remote server</strong> the moment you need one deployment to serve many users or devices. Here's
                how the two differ, how remote MCP auth actually works, and what Anthropic just added that makes remote
                servers more capable.
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
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Technical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Nov 25, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <RemoteMCPHeroDiagram />

            <ExploreWithAI variant="strip" path="/blog/remote-mcp-servers" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is a remote MCP server?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A remote MCP server is an{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">MCP server</Link> that doesn't
                  run on the user's own machine. Instead of an{" "}
                  <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/transports/stdio">MCP host spawning it as a local child process over stdio</RefLink>,
                  a remote server runs on shared infrastructure — a company's cloud, a SaaS vendor's backend, or a
                  serverless platform — and an MCP client on the host connects to it over HTTPS using the{" "}
                  <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/transports/streamable-http">Streamable HTTP transport</RefLink>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Ahrefs is a concrete example already running in production: it operates a single{" "}
                  <RefLink href="https://docs.ahrefs.com/mcp/docs/introduction.md">hosted remote MCP server at a fixed Streamable HTTP endpoint</RefLink>{" "}
                  that every customer on a paid plan connects their AI client to — Claude, ChatGPT, Cursor, or any other
                  MCP-compatible tool — through OAuth, rather than shipping a binary each user installs and runs
                  locally. That's the whole point of "remote": one deployment, many users, standard auth in front of it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="auth" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How does authentication work for a remote MCP server?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  By the official{" "}
                  <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/authorization">MCP authorization specification</RefLink>,
                  authorization is optional for MCP in general, but when a server uses an HTTP-based transport it{" "}
                  <strong>SHOULD</strong> implement OAuth 2.1 — while a stdio server <strong>SHOULD NOT</strong>, and
                  should pull credentials from the local environment instead. Three parties are involved:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>The MCP server</strong> — an{" "}
                      <RefLink href="https://github.com/modelcontextprotocol/python-sdk/blob/main/docs/run/authorization.md">OAuth 2.1 resource server</RefLink>.
                      It never signs anyone in and never issues a token; it only validates the bearer token on the
                      <code> Authorization</code> header of each request.</li>
                    <li>• <strong>The authorization server</strong> — your identity provider (Auth0, Keycloak, Entra, or
                      one you run yourself), or one hosted alongside the MCP server. It authenticates the user and
                      issues access tokens.</li>
                    <li>• <strong>The MCP client</strong> — discovers which authorization server the resource trusts,
                      gets a token from it via OAuth 2.0 Protected Resource Metadata (<RefLink href="https://datatracker.ietf.org/doc/html/rfc9728">RFC 9728</RefLink>),
                      and sends it back as the bearer token on every call.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One rule matters more than the rest for security: the spec requires servers to implement OAuth 2.0
                  Protected Resource Metadata and forbids passing a client's token straight through to an upstream
                  API unvalidated — a server <strong>MUST NOT</strong> trust a token it didn't issue itself as
                  already-validated for a downstream call, the classic "confused deputy" problem. If you're connecting
                  a third-party remote server, see our{" "}
                  <Link to="/blog/mcp-server-trust-permissions" className="text-primary hover:underline">guide to vetting and scoping MCP server permissions</Link>{" "}
                  before you hand it a token.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="compare" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Local (stdio) vs remote (Streamable HTTP): side by side</h2>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Aspect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Local — stdio</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Remote — Streamable HTTP</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transportCompare.map((r) => (
                            <TableRow key={r.aspect}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.aspect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.stdio}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.http}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="MCP, agents, RAG, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="whats-new" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What's new in MCP that pushes teams toward remote servers?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In November 2026, Anthropic reported the protocol had passed{" "}
                  <RefLink href="https://the-decoder.com/anthropic-tops-700-million-monthly-mcp-sdk-downloads-and-expands-the-protocol-for-more-autonomous-ai-agents/">700 million monthly SDK downloads and more than 10,000 connectors for Claude</RefLink>,
                  two years after launch, and used the milestone to ship several features aimed squarely at servers that
                  run independently of a single chat session — which is to say, remote, always-on deployments:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Tasks</strong> reached general availability — a server can run a longer job in the
                      background and report back only when the result is ready, instead of blocking the conversation.</li>
                    <li>• <strong>Elicitation</strong> also went GA — a running process can pause and ask the user for a
                      specific missing detail rather than failing outright.</li>
                    <li>• <strong>Enterprise Managed Auth</strong> lets admins approve a remote server once so every
                      employee in the organization connects automatically, instead of each person running their own
                      OAuth flow.</li>
                    <li>• <strong>MCP Apps</strong>, documented in{" "}
                      <RefLink href="https://modelcontextprotocol.io/extensions/skills/overview">Anthropic's MCP extensions</RefLink>,
                      lets a remote server embed a full interactive UI inside Claude, not just text responses.</li>
                    <li>• <strong>Tool Search</strong>, which loads individual tool descriptions only when needed, can{" "}
                      <RefLink href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool">cut context usage by more than 85% in multi-server setups</RefLink> —
                      relevant because every connected server (local or remote) injects its tool definitions into
                      context, and remote deployments tend to accumulate more connected servers over time.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  None of this requires going remote — a stdio server can implement Tasks or Elicitation too — but
                  background jobs, org-wide auto-approval, and embedded UI are the features that matter most once a
                  server is serving many users instead of one developer's laptop, which is exactly the remote use case.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When should you build a remote server instead of a local one?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Build local (stdio)</strong> when it's a single-user developer tool that only needs
                      access to that person's own machine — a filesystem server, a local git helper, a personal
                      database client. No OAuth, no hosting bill, no network latency.</li>
                    <li>• <strong>Build remote (Streamable HTTP)</strong> the moment you're a SaaS vendor shipping a
                      tool to many customers, need centralized control over who can connect (Enterprise Managed Auth),
                      or need the server reachable from a mobile client, a web app, or a teammate's machine without
                      installing anything locally — the Ahrefs model.</li>
                    <li>• <strong>You still need per-user scoping either way.</strong> A remote server doesn't remove
                      the need to scope what each connected account can do — if anything it matters more, because one
                      compromised token can now reach every resource that user's account owns on your platform.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="related" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Where this fits with MCP vs API and MCP security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Transport choice is one layer of a bigger picture. If you haven't settled what MCP actually is versus
                  a plain API, start with{" "}
                  <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">MCP vs API</Link>. If you're about
                  to connect a third-party remote server — your own or a vendor's — read{" "}
                  <Link to="/blog/mcp-server-trust-permissions" className="text-primary hover:underline">how to vet and scope MCP server permissions</Link>{" "}
                  first; token theft and tool poisoning don't care whether the server you connect is local or remote.
                </p>
              </section>

              <ExploreWithAI variant="questions" path="/blog/remote-mcp-servers" />

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
                  <li>• <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/authorization">MCP specification — Authorization</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/transports/stdio">MCP specification — stdio transport</RefLink></li>
                  <li>• <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/transports/streamable-http">MCP specification — Streamable HTTP transport</RefLink></li>
                  <li>• <RefLink href="https://datatracker.ietf.org/doc/html/rfc9728">RFC 9728 — OAuth 2.0 Protected Resource Metadata</RefLink></li>
                  <li>• <RefLink href="https://github.com/modelcontextprotocol/python-sdk/blob/main/docs/run/authorization.md">MCP Python SDK — server authorization docs</RefLink></li>
                  <li>• <RefLink href="https://the-decoder.com/anthropic-tops-700-million-monthly-mcp-sdk-downloads-and-expands-the-protocol-for-more-autonomous-ai-agents/">The Decoder — Anthropic tops 700M monthly MCP SDK downloads (Nov 2026)</RefLink></li>
                  <li>• <RefLink href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool">Anthropic — Tool Search tool documentation</RefLink></li>
                  <li>• <RefLink href="https://docs.ahrefs.com/mcp/docs/introduction.md">Ahrefs — remote MCP server documentation</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/remote-mcp-servers" />
      <Footer />
    </div>
  );
};

export default RemoteMCPServersPost;
