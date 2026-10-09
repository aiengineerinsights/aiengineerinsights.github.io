import { ArrowLeft, Clock, User, Calendar, ShieldCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import MCPTrustHeroDiagram from "@/components/MCPTrustHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const owaspTop10 = [
  { id: "MCP01", risk: "Token mismanagement & secret exposure", mitigation: "Short-lived, audience-bound tokens; never log or pass through raw tokens" },
  { id: "MCP02", risk: "Privilege escalation via scope creep", mitigation: "Review requested scopes on every update, not just first install" },
  { id: "MCP03", risk: "Tool poisoning", mitigation: "Static-scan tool descriptions for model-directed imperatives before connecting" },
  { id: "MCP07", risk: "Insufficient authentication & authorization", mitigation: "Verify the server implements OAuth 2.1 + Protected Resource Metadata" },
  { id: "MCP09", risk: "Shadow MCP servers", mitigation: "Maintain an approved-server registry; block ad hoc stdio configs in CI" },
];

const scopingChecklist = [
  { stage: "Before connecting", action: "Read the full tool manifest, not just the names — scan descriptions for hidden imperatives" },
  { stage: "Before connecting", action: "Check whether tokens are audience-bound (issued specifically for this server) or passed through" },
  { stage: "At connect time", action: "Grant the narrowest OAuth scope the task needs, not the broadest the server offers" },
  { stage: "After connecting", action: "Pin the tool manifest's hash; diff it on every server update to catch silent rug-pulls" },
  { stage: "Ongoing", action: "Log every tool call with the server identity, so a compromised server is traceable" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is MCP server trust scoping?",
    a: "It's the practice of treating every Model Context Protocol server as untrusted supply chain — like a new npm package — until you've reviewed its tool manifest, scoped the credentials it receives, and set up a way to detect if its behavior changes later. The alternative, connecting any MCP server with a long-lived, broadly scoped token and never re-checking it, is how tool poisoning and rug-pull attacks succeed.",
  },
  {
    q: "What is a tool poisoning attack against an MCP server?",
    a: "OWASP's MCP Top 10 (MCP03) describes it as an adversary embedding instructions inside a tool's name, description, or parameter text — the part the model treats as authoritative, not the part a human reviews. Invariant Labs first disclosed this in April 2025: a tool description can tell the model to 'ignore previous instructions' or quietly read ~/.ssh/id_rsa, and the agent follows it because tool descriptions aren't rendered as prose a user reads before approving.",
  },
  {
    q: "What is an MCP 'rug pull' attack?",
    a: "A dynamic version of tool poisoning: a tool's definition looks safe when you approve it, then changes after the fact. Microsoft Learn's AI attack catalog documents the pattern — a trusted tool like send_slack_message is silently altered server-side to exfiltrate data instead, and because agents don't routinely re-verify a tool's definition after the first approval, the malicious version executes without any approval prompt firing again.",
  },
  {
    q: "What is token passthrough and why is it dangerous in MCP?",
    a: "It's when an MCP server forwards a token it received from the client straight to an upstream API instead of validating and re-issuing its own. The official MCP authorization spec explicitly forbids this: a server MUST NOT pass through a token it didn't issue, because a downstream API may wrongly trust the token as already validated — the classic 'confused deputy' pattern that lets an attacker access resources the original token was never meant to reach.",
  },
  {
    q: "How do I scope AI agent permissions for MCP servers in practice?",
    a: "Apply least privilege at every layer: grant the narrowest OAuth scope a task needs rather than the broadest the server advertises, use short-lived audience-bound tokens instead of standing credentials, statically scan each tool's declared description for model-directed imperatives before connecting, and pin the tool manifest so you can diff it on every server update. This mirrors Meta's 'Rule of Two' for agent sessions generally — don't let a single session combine untrusted input, access to sensitive systems, and the ability to change state unchecked.",
  },
  {
    q: "Are official MCP reference servers safe to use?",
    a: "They're educational references, not hardened production software. Anthropic's own SECURITY.md for the modelcontextprotocol/servers repo states plainly that the reference servers are intended to demonstrate SDK usage and that its bug-bounty program does not cover vulnerabilities found in them — the bounty applies only to the MCP SDKs. Treat any reference server you actually run the same way you'd treat a third-party one: scoped tokens, pinned manifests, no blanket trust just because the repo is official.",
  },
];

const MCPTrustPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-full px-3 py-1">
                  <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                MCP Server Trust: How to Vet and Scope AI Agent Permissions Before You Connect One
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Connecting an MCP server to your agent means trusting its tool descriptions as much as its code — and OWASP's MCP Top 10 catalogs five separate ways that trust gets abused.</strong>{" "}
                Tool poisoning hides instructions inside descriptions the model reads but a human never does. Rug-pull
                attacks change a tool's behavior after you've already approved it. Token passthrough turns your MCP
                server into a confused deputy with access it was never meant to have. None of this is theoretical — it's
                documented in OWASP's own vulnerability catalog, Microsoft's attack-technique database, and the official
                MCP specification's own security-considerations section. Here's what each attack actually looks like and
                the concrete scoping checklist that neutralizes them.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-700 flex items-center justify-center flex-shrink-0">
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
                      Oct 9, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <MCPTrustHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="why-trust-matters" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Why does MCP server trust matter more than trusting a regular API?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Because the thing you're trusting isn't just the server's code — it's the natural-language tool
                  descriptions the server hands your agent, and the model treats those descriptions as instructions. The{" "}
                  <RefLink href="https://owasp.org/projects/mcp-top-10">OWASP MCP Top 10</RefLink> frames this directly:
                  an MCP server's "privilege escalation via scope creep" (MCP02) and "tool poisoning" (MCP03) entries
                  both exploit the fact that an agent reads a tool's declared surface as authoritative, with no
                  separation between "data describing the tool" and "instructions the model should follow." That's a
                  materially different trust boundary than calling a REST API, where the response schema is fixed and
                  doesn't get to redirect the caller's behavior.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This connects directly to the credential-theft pattern covered in{" "}
                  <Link to="/blog/ai-agent-security-prompt-injection" className="text-primary hover:underline">
                    how prompt injection steals credentials from coding agents
                  </Link>{" "}
                  — an MCP server is one of the most common channels an agent reads untrusted content through, and{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">what MCP actually is</Link>{" "}
                  (a standard for exposing tools and data to an agent) is exactly why its trust model deserves its own
                  scrutiny, separate from the agent's own permissions.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tool-poisoning" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  What is a tool poisoning attack, concretely?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Security firm Invariant Labs first disclosed Tool Poisoning Attacks in April 2025, documented in the{" "}
                  <RefLink href="https://arxiv.org/html/2508.12538">
                    systematic analysis of MCP security
                  </RefLink>{" "}
                  on arXiv: an attacker embeds hidden instructions inside a tool's name, description, or parameter
                  text — often disguised as an innocuous code comment — that redirect the model's behavior while the
                  tool's actual function looks benign. OWASP's write-up on{" "}
                  <RefLink href="https://owasp.org/www-project-mcp-top-10/2025/MCP03-2025%E2%80%93Tool-Poisoning">
                    MCP03: Tool Poisoning
                  </RefLink>{" "}
                  gives the specific tells to scan for before connecting a server: model-directed imperatives like
                  "ignore previous instructions" or "do not tell the user," references to sensitive paths like{" "}
                  <code>~/.ssh</code>, <code>.env</code>, or <code>.aws/credentials</code>, and exfiltration patterns —
                  an action verb like send or upload sitting near an external URL or webhook.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="rug-pull" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  What is a rug-pull attack, and why doesn't approval protect you from it?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A rug pull is the dynamic version of tool poisoning: the tool definition you reviewed and approved is
                  safe at approval time, then changes later. <RefLink href="https://learn.microsoft.com/en-us/security/zero-trust/catalog-ai-attack-techniques/rug-pull-attack">
                  Microsoft Learn's AI attack-technique catalog</RefLink>{" "}
                  walks through the mechanism: a trusted tool — their example is <code>send_slack_message</code> — gets
                  silently altered server-side to exfiltrate data or run unauthorized actions. Because most agent
                  integrations only check a tool's definition at first connection, not on every call, the malicious
                  version runs without triggering a fresh approval prompt. The same arXiv analysis above measured a
                  simulated rug-pull attack succeeding 80% of the time against unprotected test setups, which is why
                  "approve once" is not the same guarantee as "safe forever."
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="token-passthrough" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  What is token passthrough, and why does the MCP spec forbid it?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Token passthrough is when an MCP server receives an access token from the client and forwards that
                  same, unmodified token to an upstream API instead of validating it and issuing its own. The{" "}
                  <RefLink href="https://modelcontextprotocol.io/specification/draft/basic/authorization/security-considerations">
                    official MCP authorization security-considerations spec
                  </RefLink>{" "}
                  states this plainly: "the MCP server MUST NOT pass through the token it received from the MCP
                  client," because a downstream API may incorrectly trust that token as already validated by the MCP
                  server — the classic confused-deputy problem, where an attacker with a stolen or mis-scoped token
                  rides it further than it was ever meant to reach. The spec also requires tokens to be
                  audience-bound — issued specifically for the MCP server that receives them — so a token leaked in one
                  context can't be replayed against a different resource.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="owasp-top-10" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  What does OWASP's full MCP Top 10 cover?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The <RefLink href="https://owasp.org/projects/mcp-top-10">full list</RefLink> has ten entries; these
                  five are the ones most directly under an individual engineer's control when choosing and configuring
                  a server, rather than something only the server operator can fix:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">ID</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Risk</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What scopes it down</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {owaspTop10.map((r) => (
                            <TableRow key={r.id}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.id}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.risk}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.mitigation}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="scoping-checklist" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  What's a practical scoping checklist before connecting a new MCP server?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Treat a new MCP server like a new npm dependency, not a trusted built-in — review it before you add
                  it, and keep checking it afterward:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Stage</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {scopingChecklist.map((r) => (
                            <TableRow key={r.action}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.stage}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.action}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Even Anthropic's own reference implementations don't get a pass here. The{" "}
                  <RefLink href="https://github.com/modelcontextprotocol/servers/blob/e6b0b0f5/SECURITY.md">
                    SECURITY.md for the modelcontextprotocol/servers repo
                  </RefLink>{" "}
                  states outright that those servers are "reference implementations intended to demonstrate MCP
                  features and SDK usage, not production-ready solutions," and that Anthropic's bug-bounty program
                  explicitly excludes them — it covers only the MCP SDKs. "Official" is not a substitute for "vetted
                  and scoped."
                </p>
              </section>

              <section className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Frequently asked questions</h2>
                <div className="space-y-4 sm:space-y-6">
                  {faqs.map((f) => (
                    <div key={f.q}>
                      <h3 className="font-semibold text-base sm:text-lg mb-2">{f.q}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li><RefLink href="https://owasp.org/projects/mcp-top-10">OWASP — MCP Top 10 (2025)</RefLink></li>
                  <li><RefLink href="https://owasp.org/www-project-mcp-top-10/2025/MCP03-2025%E2%80%93Tool-Poisoning">OWASP — MCP03:2025 Tool Poisoning</RefLink></li>
                  <li><RefLink href="https://learn.microsoft.com/en-us/security/zero-trust/catalog-ai-attack-techniques/rug-pull-attack">Microsoft Learn — Rug-Pull Attack (Agent / MCP Server)</RefLink></li>
                  <li><RefLink href="https://arxiv.org/html/2508.12538">Systematic Analysis of MCP Security (arXiv 2508.12538)</RefLink></li>
                  <li><RefLink href="https://modelcontextprotocol.io/specification/draft/basic/authorization/security-considerations">Model Context Protocol — Authorization Security Considerations</RefLink></li>
                  <li><RefLink href="https://github.com/modelcontextprotocol/servers/blob/e6b0b0f5/SECURITY.md">modelcontextprotocol/servers — SECURITY.md</RefLink></li>
                </ul>
              </section>
            </article>

            <NewsletterSignup />
            <RelatedPosts current="/blog/mcp-server-trust-permissions" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MCPTrustPost;
