import { ArrowLeft, Clock, User, Calendar, ShieldAlert, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentSecurityHeroDiagram from "@/components/AgentSecurityHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const cveTable = [
  { cve: "CVE-2025-49150", product: "Cursor", impact: "Remote code execution via MCP" },
  { cve: "CVE-2025-53773", product: "GitHub Copilot", impact: "Auto-approve privilege escalation" },
  { cve: "CVE-2025-58335", product: "Junie", impact: "Data exfiltration" },
  { cve: "CVE-2025-61260", product: "Codex CLI", impact: "Command injection" },
  { cve: "CVE-2025-53097", product: "Roo Code", impact: "Credential theft" },
];

const defenseLayers = [
  { tier: "Silent", scope: "Read-only ops inside project scope", example: "Reading files already in the repo" },
  { tier: "Logged", scope: "Writes to project files, shown in an activity feed", example: "Editing an existing source file" },
  { tier: "Confirmed", scope: "Shell execution, network requests, cross-project access", example: "Installing a new npm package" },
  { tier: "Blocked", scope: "Credential access, system modification", example: "Reading .env, writing to ~/.ssh" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is prompt injection in an AI coding agent?",
    a: "Prompt injection is when content the agent reads — a GitHub issue, a PR comment, an MCP tool response, a fetched web page, an error log — contains instructions crafted to look like legitimate input but are actually commands for the model to follow. Because LLMs process instructions and data through the same channel, the agent can't reliably tell 'the user told me to do this' apart from 'a webpage told me to do this.'",
  },
  {
    q: "Can prompt injection actually steal credentials from a coding agent?",
    a: "Yes, and it has been demonstrated against production tools. Researchers showed Claude Code Security Review, Gemini CLI Action, and GitHub Copilot Agent could all be hijacked through GitHub issue/PR content to leak API keys and tokens from their own CI runner environment — using GitHub itself as the exfiltration channel, no external server required.",
  },
  {
    q: "Is this just a theoretical risk, or are there real CVEs?",
    a: "Real CVEs exist across major tools: CVE-2025-49150 (Cursor, RCE via MCP), CVE-2025-53773 (Copilot, auto-approve privilege escalation), CVE-2025-58335 (Junie, data exfiltration), CVE-2025-61260 (Codex CLI, command injection), and CVE-2025-53097 (Roo Code, credential theft). Microsoft also disclosed two CVEs in Semantic Kernel (2026-25592, 2026-26030) that chained prompt injection into full host-level remote code execution.",
  },
  {
    q: "What is the 'Rule of Two' for agent security?",
    a: "A guideline from Meta's security team: an agent should satisfy no more than two of (A) processing untrusted input, (B) accessing sensitive data, and (C) changing state or communicating externally. An agent that does all three — reads an untrusted GitHub issue, holds API keys, and can push commits — is exactly the shape every documented credential-theft incident takes.",
  },
  {
    q: "How do I actually defend an AI coding agent against this?",
    a: "Least privilege, not blocklisting. Scope tools to an allowlist (`--allowed-tools` in Claude Code, equivalent flags elsewhere) instead of trying to block dangerous commands one by one — blocklists are whack-a-mole. Run agents in sandboxed, ephemeral environments with scoped, short-lived credentials rather than long-lived developer tokens. Require explicit human approval for shell execution, network calls, and any credential-adjacent action. Treat every MCP server and every piece of repository content (issues, PR comments, READMEs) as untrusted input.",
  },
  {
    q: "Does running an agent in a sandbox fully solve the problem?",
    a: "No — sandbox escapes exist too. Microsoft's Semantic Kernel disclosure showed an agent sandbox could be defeated through an unvalidated file-path parameter in a host-side helper function, letting an attacker write a payload straight to the host's Startup folder from inside the 'isolated' sandbox. Sandboxing reduces blast radius; it doesn't replace capability scoping and human approval gates.",
  },
];

const AgentSecurityPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-orange-700 rounded-full px-3 py-1">
                  <ShieldAlert className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Coding Agent Security: How Prompt Injection Leads to Credential Theft (and How to Stop It)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Prompt injection against AI coding agents is a documented, exploited vulnerability class, not a hypothetical.</strong>{" "}
                Researchers have shown Claude Code, Gemini CLI, GitHub Copilot, Cursor, Codex, and Semantic Kernel agents
                can all be hijacked through content they're designed to read — GitHub issues, MCP tool responses, Sentry
                error events — into leaking API keys, tokens, and in some cases full remote code execution. Five public
                CVEs and two cross-vendor disclosures back this up. Here's how the attack works, what the real incidents
                looked like, and the concrete controls (allowlisting, sandboxing, human-approval gates) that actually
                reduce the risk.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-600 to-orange-700 flex items-center justify-center flex-shrink-0">
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
                      Oct 7, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentSecurityHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is prompt injection against a coding agent?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Traditional security models keep instructions and data strictly separate. LLM-based agents don't: a{" "}
                  <RefLink href="https://arxiv.org/pdf/2601.17548">systematization-of-knowledge paper analyzing 78 studies</RefLink>{" "}
                  on the topic notes that models process both through the same channel, so content an agent merely{" "}
                  <em>reads</em> — a PR title, an issue body, an MCP tool's response, a fetched web page, an error trace —
                  can carry instructions the agent treats as authoritative. The same paper catalogs 42 distinct attack
                  techniques and found attack success rates against published defenses exceed 85% once an attacker adapts.
                  The <RefLink href="https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html">OWASP
                  Secure Coding with AI Cheat Sheet</RefLink> independently lists the same surface: issue bodies, PR
                  comments, README files, dependency changelogs, and fetched pages all become instruction sources once an
                  agent reads them.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This matters more for coding agents than chatbots because coding agents are wired to{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">tools</Link> — shell
                  execution, package installs, git push — and typically run with the developer's own credentials. A
                  successful injection isn't a bad chat response; it's an action taken with your permissions.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="real-incidents" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Has this actually happened, or is it theoretical?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It's been demonstrated against production tools, cross-vendor. Security researcher Aonan Guan, working
                  with Johns Hopkins researchers, showed that{" "}
                  <RefLink href="https://oddguan.com/blog/comment-and-control-prompt-injection-credential-theft-claude-code-gemini-cli-github-copilot/">
                    Anthropic's Claude Code Security Review, Google's Gemini CLI Action, and GitHub Copilot Agent
                  </RefLink>{" "}
                  could each be hijacked via GitHub PR titles, issue bodies, and comments — turning the host repository's
                  own GitHub Actions secrets (API keys, tokens) into stolen data, exfiltrated back through GitHub itself
                  with no external infrastructure. The Copilot variant bypassed three dedicated runtime defenses GitHub
                  had added specifically to prevent this: environment filtering, secret scanning, and a network firewall.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Separately, the <RefLink href="https://labs.cloudsecurityalliance.org/research/csa-research-note-agentjacking-mcp-sentry-injection-20260612/">
                  Cloud Security Alliance documented "agentjacking"</RefLink>: attackers inject malicious instructions into
                  Sentry error events using only a public, write-only DSN credential. When a developer asks their agent to
                  investigate open errors, the agent retrieves the poisoned event through Sentry's MCP server and executes
                  the embedded instructions with the developer's own privileges — recovering AWS credentials, GitHub/GitLab
                  tokens, npm tokens, and CI/CD secrets in the proof-of-concept, with zero policy violated and zero anomaly
                  threshold crossed.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="cves" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What CVEs exist for this specifically?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The SoK paper above catalogs over 30 CVEs tied to agentic coding assistants; five representative ones:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">CVE</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Product</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Impact</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cveTable.map((r) => (
                            <TableRow key={r.cve}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.cve}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.product}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.impact}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Microsoft's research team went further, disclosing{" "}
                  <RefLink href="https://www.microsoft.com/en-us/security/blog/2026/05/07/prompts-become-shells-rce-vulnerabilities-ai-agent-frameworks/">
                  two CVEs in Microsoft Semantic Kernel</RefLink> (CVE-2026-25592, CVE-2026-26030) that chained prompt
                  injection into full host-level remote code execution — one through an unsanitized parameter in a search
                  plugin reaching Python's <code>eval()</code>, the other through an unvalidated file path letting an
                  injected instruction write a malicious script straight to the host's Windows Startup folder from inside
                  what was supposed to be an isolated sandbox.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why-hard" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why is this hard to fix with blocklists?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Because the agent's job legitimately requires reading untrusted content. Blocking specific commands
                  doesn't close the hole — the OWASP cheat sheet notes Anthropic blocked the <code>ps</code> command as a
                  mitigation, and attackers simply moved to <code>cat /proc/*/environ</code> to read the same environment
                  variables a different way. The SoK paper's review of 18 published defense mechanisms found most achieve
                  less than 50% mitigation against adaptive attackers. The architectural fix isn't a smarter filter; it's
                  removing the agent's ability to reach sensitive capabilities at all unless explicitly scoped.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="defend" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do I actually defend my agent setup?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Both the SoK paper and OWASP converge on the same shape of answer: least privilege, not detection.
                  Meta's security team frames it as the <strong>"Rule of Two"</strong> — an agent should satisfy no more
                  than two of: (A) processing untrusted input, (B) accessing sensitive data, (C) changing state or
                  communicating externally. Every incident above is an agent doing all three at once. A practical tiered
                  approval model, adapted from the SoK paper's proposal:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Tier</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Scope</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {defenseLayers.map((r) => (
                            <TableRow key={r.tier}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.tier}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.scope}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.example}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Concretely: use an explicit tool allowlist (e.g. Claude Code's <code>--allowed-tools</code>) rather than
                  trying to blocklist dangerous ones; run agents with ephemeral, scoped credentials instead of long-lived
                  developer tokens in environment variables; exclude <code>.env</code>, <code>*.pem</code>, and SSH keys
                  from the agent's visible context; and require human approval before shell execution, network egress, or
                  any credential-adjacent action — particularly for{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">MCP servers</Link> and CI agents
                  that process content from outside contributors.
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
                  <li><RefLink href="https://arxiv.org/pdf/2601.17548">Prompt Injection Attacks on Agentic Coding Assistants (SoK, arXiv 2601.17548)</RefLink></li>
                  <li><RefLink href="https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html">OWASP — Secure Coding with AI Cheat Sheet</RefLink></li>
                  <li><RefLink href="https://oddguan.com/blog/comment-and-control-prompt-injection-credential-theft-claude-code-gemini-cli-github-copilot/">Comment and Control: Prompt Injection to Credential Theft in Claude Code, Gemini CLI, and GitHub Copilot</RefLink></li>
                  <li><RefLink href="https://labs.cloudsecurityalliance.org/research/csa-research-note-agentjacking-mcp-sentry-injection-20260612/">Cloud Security Alliance — Agentjacking: MCP Injection Hijacks AI Coding Agents</RefLink></li>
                  <li><RefLink href="https://www.microsoft.com/en-us/security/blog/2026/05/07/prompts-become-shells-rce-vulnerabilities-ai-agent-frameworks/">Microsoft Security — When Prompts Become Shells: RCE Vulnerabilities in AI Agent Frameworks</RefLink></li>
                </ul>
              </section>
            </article>

            <NewsletterSignup />
            <RelatedPosts currentPath="/blog/ai-agent-security-prompt-injection" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgentSecurityPost;
