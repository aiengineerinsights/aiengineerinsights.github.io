import { ArrowLeft, Clock, User, Calendar, Boxes, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesOrchestratorHeroDiagram from "@/components/HermesOrchestratorHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const useCaseRows = [
  { pairing: "Plain Hermes", best: "Ops, scheduling, research, glue", why: "Skills, cron, memory, and MCP tools — no coding runtime needed for non-code automation" },
  { pairing: "Hermes + Claude Code", best: "Autonomous coding, refactors, PRs", why: "Hermes plans and schedules; Claude Code edits, runs, and manages git as the executor" },
  { pairing: "Hermes + DeepSeek", best: "Cheap orchestration & planning", why: "Route a low-cost model (incl. the R1 reasoning model) for the planning loop; save the strong model for hard steps" },
  { pairing: "Hermes + Codex / OpenCode", best: "BYO-key or alt-runtime coding", why: "Same delegate pattern, different executor — swap runtimes without changing the orchestration" },
  { pairing: "Hermes + computer use", best: "Browser / desktop tasks", why: "Drive a real UI for work that isn't a code edit — form-filling, scraping, checks" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "Can Hermes use Claude Code?",
    a: "Yes — Hermes ships an official bundled skill for it (autonomous-ai-agents/claude-code). Hermes delegates a coding task to the Claude Code CLI, which reads files, writes code, runs shell commands, and manages git autonomously, then returns the result. There are two modes: print mode (a one-shot 'claude -p' call, best for automation) and an interactive tmux/PTY session for multi-turn work.",
  },
  {
    q: "What does 'Hermes as an orchestrator' mean?",
    a: "It means using Hermes as the persistent brain — planning, memory, scheduling, and model routing — while a specialized agent runtime like Claude Code does the actual coding. Hermes decides what to do and when (including on a cron), delegates the code-writing step to the runtime, reads the result, and continues. It's the orchestrator + agent-runtime split: one layer plans, another executes.",
  },
  {
    q: "Why not just use Claude Code alone?",
    a: "Claude Code is excellent at the coding step but is session-bound and interactive by design. Pairing it under Hermes adds what a single interactive session doesn't have on its own: unattended scheduling (cron), persistent cross-run memory and skills that compound, task decomposition and dispatch, isolated git worktrees for parallel work, and model routing so a cheap model can handle orchestration. If you only need one interactive coding session, Claude Code alone is simpler; the pairing pays off for autonomous, repeated, or parallel work.",
  },
  {
    q: "Can Hermes run DeepSeek?",
    a: "Yes. DeepSeek is a supported provider in Hermes, so you can back the agent with a DeepSeek model (including the R1 reasoning model) via the DeepSeek API or an aggregator. A common motivation is cost: routing a cheaper model for the planning/orchestration loop and reserving a stronger model for the hard coding step. Exact pricing and quality vary by model and change often — check current provider docs before committing.",
  },
  {
    q: "Does Hermes only work with Claude Code?",
    a: "No. Hermes ships bundled autonomous-agent skills for several runtimes — Claude Code, Codex CLI, OpenCode, and computer use — under the same delegate pattern. You can swap the executor without changing the orchestration layer, which is one of the advantages of keeping planning and execution separate.",
  },
  {
    q: "Is it safe to let Hermes drive a coding agent unattended?",
    a: "Treat it with the same caution as any autonomous agent. Print-mode delegation skips interactive permission prompts, which is what makes it good for automation but also means the runtime can act without a per-step confirmation. Scope tool permissions tightly, run in an isolated git worktree, keep a human review gate on anything that ships, and avoid fully-permissive 'yolo' modes for work that touches production.",
  },
];

const HermesClaudeCodePost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-800 rounded-full px-3 py-1">
                  <Boxes className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Hermes + Claude Code: Using Hermes as an Orchestrator for Autonomous Coding (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Hermes Agent is capable on its own — skills, cron, memory, and MCP tools. But its most useful shape in
                2026 is as an <strong>orchestrator</strong>: the persistent brain that plans, remembers, and schedules,
                while a specialized <strong>agent runtime</strong> like <strong>Claude Code</strong> does the actual
                coding. Hermes officially ships a bundled skill to drive Claude Code (and Codex, OpenCode, and computer
                use), routes any model provider — including <strong>DeepSeek</strong> — underneath, and can run the whole
                loop unattended. This guide covers plain Hermes, the standout Hermes + Claude Code pairing, the DeepSeek
                and other-runtime combinations, the orchestrator pattern behind it, and which pairing fits which job.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
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
                      Sep 18, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <HermesOrchestratorHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="plain-hermes" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What plain Hermes does on its own</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Before pairing, it helps to know what Hermes brings by itself. Hermes Agent is Nous Research's
                  open-source terminal agent, and its core is less about writing code than about <em>running work</em>:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Self-improving skills</strong> — reusable capabilities it can create and refine as it works. (We cover these in depth in <Link to="/blog/hermes-agent-skills" className="text-primary hover:underline">Hermes Agent Skills</Link>.)</li>
                    <li>• <strong>A cron scheduler</strong> — tasks described in natural language that run unattended on a schedule.</li>
                    <li>• <strong>Persistent memory</strong> — cross-session recall so work compounds instead of resetting each run.</li>
                    <li>• <strong>MCP support</strong> — connect any <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">MCP</Link> tool, and expose Hermes's own tools to other hosts.</li>
                    <li>• <strong>Multi-provider model routing</strong> — swap the backing model without touching your setup (see <Link to="/blog/hermes-agent-models" className="text-primary hover:underline">which LLM to run with Hermes</Link>).</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That's plenty for ops, research, and glue work. What plain Hermes is <em>not</em> optimized for is
                  heavy, interactive code generation — which is exactly the gap a coding runtime fills. For the full
                  picture of Hermes itself, start with our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes Agent explainer</Link>{" "}
                  and the <RefLink href="https://hermes-agent.nousresearch.com/docs">official docs</RefLink>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why-pair" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why pair Hermes with a coding agent</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The pairing is an instance of a pattern the whole field is moving toward: separating the{" "}
                  <strong>orchestrator</strong> (what to do, when, and with what memory) from the{" "}
                  <strong>agent runtime</strong> (the thing that actually edits and runs code). As Addy Osmani puts it in{" "}
                  <RefLink href="https://addyosmani.com/blog/code-agent-orchestra/">The Code Agent Orchestra</RefLink>,
                  teams are shifting from a "conductor model" — one agent, one synchronous session — to an
                  "orchestrator model" where a coordinator plans and specialized agents work with their own context
                  windows. Hermes is a natural orchestrator; a coding CLI is a natural runtime.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="hermes-claude-code" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Hermes + Claude Code: the standout pairing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes ships an <strong>official bundled skill</strong> for Claude Code (under
                  <code> autonomous-ai-agents/claude-code</code>), so this isn't a hack — it's a supported path. Hermes
                  delegates a coding task to the{" "}
                  <RefLink href="https://code.claude.com/docs/en/cli-reference">Claude Code CLI</RefLink>, which reads
                  files, writes code, runs shell commands, spawns its own subagents, and manages git — then hands the
                  result back. The skill documents two modes:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Print mode (<code>claude -p</code>)</strong> — a one-shot task that returns a result and exits, with no interactive prompts. This is the clean path for automation and CI: "fix the failing test", "add error handling to all API calls", run it, read the output.</li>
                    <li>• <strong>Interactive PTY via tmux</strong> — a full conversational session Hermes drives through a tmux pane, for multi-turn work where it needs to send follow-ups and watch progress in real time.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There's also a one-command <strong>import</strong>: <code>hermes import-agent claude-code</code> maps
                  your existing Claude Code setup — CLAUDE.md instructions, permission allowlists, MCP servers, skills,
                  and memories — into their Hermes equivalents, so an established Claude Code workflow carries over
                  rather than being rebuilt. And because Hermes can run each delegated job in an{" "}
                  <strong>isolated git worktree</strong>, multiple coding tasks can proceed in parallel without stepping
                  on each other. In the split, <strong>Hermes plans, schedules, and remembers; Claude Code writes and
                  runs the code.</strong> If you want the coding-agent side of that equation in context, our{" "}
                  <Link to="/blog/best-ai-coding-agents" className="text-primary hover:underline">ranked guide to AI coding agents</Link>{" "}
                  covers where Claude Code fits.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, orchestration, RAG, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="hermes-deepseek" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Hermes + DeepSeek: routing a cheaper brain</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Because Hermes routes any model provider, the backing model is a separate decision from the runtime.
                  <strong> DeepSeek is a supported provider</strong>, which makes it a common choice for the
                  orchestration loop specifically: the planning, decomposition, and check-in steps don't always need a
                  frontier model, so routing a cheaper DeepSeek model — including the{" "}
                  <strong>R1 reasoning model</strong> for multi-step planning — and reserving a stronger model for the
                  hard coding step is a practical cost lever. The general principle holds across providers: match the
                  model to the step, not the whole job. (Exact pricing and benchmark numbers move fast and vary by
                  model — check current provider docs rather than trusting a figure in any blog, including this one.)
                  Our <Link to="/blog/hermes-agent-models" className="text-primary hover:underline">Hermes models guide</Link>{" "}
                  covers provider setup, and the{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">cost patterns of small vs frontier models</Link>{" "}
                  are worth understanding before you route.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="other-runtimes" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Beyond Claude Code: Codex, OpenCode, and computer use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Claude Code is the headline pairing, but Hermes ships the same kind of bundled skill for several
                  runtimes, so the orchestration layer stays put while you swap the executor:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Codex CLI</strong> — OpenAI's coding agent, delegated with the same print-mode/PTY pattern.</li>
                    <li>• <strong>OpenCode</strong> — an open-source, bring-your-own-key runtime for teams that want model and cost control.</li>
                    <li>• <strong>Computer use</strong> — for work that isn't a code edit at all: driving a real browser or desktop to fill forms, scrape, or run checks.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The takeaway: "Hermes + X" is a family, not a single integration. Keeping planning and execution
                  separate is what lets you change your mind about the runtime later.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="pattern" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The orchestrator + agent-runtime pattern (and its rules)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This pairing works for the same reasons multi-agent coding works in general, and it inherits the same
                  hard-won rules. Drawing on{" "}
                  <RefLink href="https://addyosmani.com/blog/code-agent-orchestra/">Osmani's write-up</RefLink> and{" "}
                  <RefLink href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns">Microsoft's AI agent design patterns</RefLink>:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Specialization + isolation beats one big agent.</strong> Separate context windows for planning vs coding keep each focused and reduce cross-contamination.</li>
                    <li>• <strong>Verification is the bottleneck, not generation.</strong> The orchestrator's real job is to gate output — tests, review, a human check — not just to hand off more work.</li>
                    <li>• <strong>Keep the coordinating set small.</strong> Guidance across these sources converges on a handful of agents, with step limits to prevent loops.</li>
                    <li>• <strong>Persist accumulated learning.</strong> A curated instructions file (CLAUDE.md / AGENTS.md) plus Hermes's memory is what makes runs compound instead of repeat.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="use-cases" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which pairing for which job</h2>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Setup</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {useCaseRows.map((r) => (
                            <TableRow key={r.pairing}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.pairing}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.best}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.why}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tips" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Tips for running Hermes as an orchestrator</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Start with print mode.</strong> One-shot <code>claude -p</code> delegation is the simplest, most predictable integration; reach for tmux only when you genuinely need multi-turn.</li>
                    <li><strong>Import, don't rebuild.</strong> <code>hermes import-agent claude-code</code> carries your CLAUDE.md, permissions, and MCP servers over so the runtime behaves the way you already trust.</li>
                    <li><strong>Isolate parallel work in git worktrees.</strong> It's the clean way to let multiple delegated tasks run at once without collisions.</li>
                    <li><strong>Route models by step.</strong> Cheap model (e.g. DeepSeek) for orchestration, strong model for the hard coding — the split is where the cost savings live.</li>
                    <li><strong>Gate what ships.</strong> Keep tests and a human review between the runtime's output and anything that reaches production; print mode skips permission prompts by design.</li>
                    <li><strong>Mind autonomy risk.</strong> Unattended agents with shell access need tight tool scopes — see our <Link to="/blog/hermes-agent-security" className="text-primary hover:underline">Hermes security breakdown</Link> before going fully hands-off.</li>
                  </ol>
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
                  <li>• <RefLink href="https://hermes-agent.nousresearch.com/docs">Hermes Agent — Official documentation (Nous Research)</RefLink></li>
                  <li>• <RefLink href="https://code.claude.com/docs/en/cli-reference">Claude Code — CLI reference (Anthropic)</RefLink></li>
                  <li>• <RefLink href="https://addyosmani.com/blog/code-agent-orchestra/">Addy Osmani — The Code Agent Orchestra (2026)</RefLink></li>
                  <li>• <RefLink href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns">Microsoft Azure — AI Agent Design Patterns</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-claude-code-orchestration" />
      <Footer />
    </div>
  );
};

export default HermesClaudeCodePost;
