import { ArrowLeft, Clock, User, Calendar, Network, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ContextEngineeringHeroDiagram from "@/components/ContextEngineeringHeroDiagram";

const benchmarks = [
  { metric: "Cost per prompt", without: "$0.49", withGr: "$0.27" },
  { metric: "Average turns per task", without: "11.7", withGr: "3.5" },
  { metric: "Average response time", without: "172s", withGr: "124s" },
  { metric: "Quality (scored /100)", without: "76.6", withGr: "86.6" },
  { metric: "Cost win rate", without: "—", withGr: "10 / 10 prompts" },
];

const byTask = [
  { task: "Migration & architecture design", cut: "up to 81%" },
  { task: "Performance analysis", cut: "up to 80%" },
  { task: "Testing & test generation", cut: "up to 76%" },
  { task: "Full-stack debugging", cut: "up to 73%" },
  { task: "Feature development", cut: "up to 71%" },
  { task: "Code explanation & audit", cut: "up to 55%" },
  { task: "Large codebase (7k+ files, avg)", cut: "43% average" },
];

const faqs = [
  {
    q: "What is context engineering?",
    a: "Context engineering is the practice of deliberately curating what goes into a model's context window — the right code, docs, and state — instead of just crafting the instruction. As models moved from single prompts to agents working over large codebases, what you put in the window started to matter more than how you phrase the ask. It's the natural successor to prompt engineering.",
  },
  {
    q: "Is context engineering the same as prompt engineering?",
    a: "No. Prompt engineering optimizes the wording of your instruction; context engineering optimizes the information the model has when it reads that instruction. For coding assistants, the highest-leverage move in 2026 is usually context, not phrasing — the model can reason well if (and only if) the relevant code is already in front of it.",
  },
  {
    q: "Why is Claude Code so expensive on large projects?",
    a: "Because you pay for the entire context every turn, and it compounds: every file the agent reads stays in the window for the rest of the session, so each new message re-bills the growing context. On big repos, letting the assistant explore freely is what turns into $200–400/month bills. Curating the context — feeding only the relevant files — is the most direct fix.",
  },
  {
    q: "Does GrapeRoot send my code anywhere?",
    a: "No. GrapeRoot processes everything locally — it builds the graph on your machine and no code leaves it. It's open source under Apache 2.0 and runs on macOS, Linux, and Windows.",
  },
  {
    q: "How much does GrapeRoot actually save?",
    a: "On its published benchmark (7,700+ files, 50+ prompts), cost per prompt dropped from $0.49 to $0.27 with equal-or-better quality. Savings vary by task — up to ~81% on migration and architecture work, ~43% average on large codebases. It won on cost for all 10 test prompts.",
  },
  {
    q: "Which AI coding tools does it work with?",
    a: "Claude Code and OpenAI Codex CLI have full support, plus Cursor, Gemini CLI, GitHub Copilot, OpenCode, and several others. It ships as a wrapper command per tool (dgc for Claude Code, dg for Codex).",
  },
];

const ContextEngineeringGrapeRootPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-emerald-700 rounded-full px-3 py-1">
                  <Network className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Tooling</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Context Engineering for AI Coding: How GrapeRoot Cuts Claude Code Token Cost 30–45%
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                If your AI coding assistant is quietly burning a few hundred dollars a month and forgetting your project
                halfway through a task, the problem usually isn't the model — it's the context. This is about the fix that
                actually works: <strong>context engineering</strong>, and a clean open-source tool called{" "}
                <strong>GrapeRoot</strong> that automates it, cutting cost per prompt from $0.49 to $0.27 with equal-or-better
                answers. Here's the problem, why it happens, and how the fix is built.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-emerald-700 flex items-center justify-center flex-shrink-0">
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
                      Tool Deep-Dive
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 5, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      9 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <ContextEngineeringHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="the-problem" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">You've felt this if you code with an AI daily</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You ask Claude Code for a change, and before it writes a line it starts <em>rummaging</em> — grepping the
                  repo, opening a file, opening another, chasing an import, reading a test it didn't need. Ten turns later it
                  finally answers. Every one of those files is now sitting in the context window, and you're paying to
                  re-read all of them on every message after. Do that all day and the bill creeps toward the{" "}
                  <strong>$200–400 a month</strong> people keep reporting on Reddit and Discord.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Then the session gets long and the wheels come off. The window fills up, auto-compaction kicks in to avoid
                  the hard limit, and it quietly summarizes away the decision you made twenty minutes ago. Suddenly the
                  assistant that nailed the first three files is <strong>contradicting its own earlier fixes</strong>,
                  reintroducing a bug you already squashed, and forgetting which framework you're on. The usual advice —
                  maintain a <code>.claudeignore</code>, hand-pick the exact files for every prompt, run <code>/compact</code>{" "}
                  at the right moment — works, but it turns you into a full-time context janitor.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  None of this is the model being dumb. It's the model drowning in the wrong context.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-context-engineering" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The real culprit: context, not the prompt</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Once you see it that way, the fix stops being "write a better prompt" and becomes "control what's in the
                  window." That shift has a name. <strong>Context engineering is the practice of deliberately curating what
                  goes into a model's context window</strong> — the right code, docs, and state — instead of only wording the
                  instruction. It's the successor to prompt engineering, and for coding it's where the leverage moved.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The distinction is sharp: <strong>prompt engineering</strong> optimizes the wording of your request;{" "}
                  <strong>context engineering</strong> optimizes the information the model has when it reads that request. A
                  perfectly phrased prompt can't save a model that has never seen the function you're asking it to change —
                  but give it exactly that function, its callers, and its types, and even a terse prompt lands. On a real
                  repo, context beats phrasing almost every time. (It's the same instinct as grounding a chatbot with
                  retrieval, which is exactly the "context window and token limits" pain from our{" "}
                  <Link to="/blog/llm-deployment-challenges" className="text-primary hover:underline">LLM deployment challenges</Link>.)
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-graperoot-works" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The fix, and how it's built: GrapeRoot</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Doing context engineering by hand is the janitor work no one wants. <strong>GrapeRoot is an open-source
                  context engine that automates it</strong> — it sits between you and your assistant and does the curating
                  for you. Here's how it's built, and why the design matters.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On first run it scans your project and builds a <strong>semantic graph</strong> of it — files, symbols,
                  imports, and call chains — stored locally in your repo. That graph is the whole trick: instead of the
                  assistant discovering structure by reading files at runtime (on your dime), the structure is already mapped.
                  Then, on every question, GrapeRoot <strong>ranks the files most relevant to what you're asking and packs
                  them into the prompt before the assistant sees it</strong>, under a hard per-turn token budget. The model
                  opens the conversation already holding the right code. No rummaging, no dead-end file reads.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li>Point it at a project — the codebase is scanned into a local semantic graph.</li>
                    <li>You ask a question.</li>
                    <li>The graph identifies the relevant files and packs them into context, within a fixed token budget.</li>
                    <li>Your assistant answers with the right code already loaded.</li>
                    <li><strong>It compounds:</strong> files you've read, edited, or queried are weighted higher next turn, so each turn gets cheaper — the opposite of the cost spiral above.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That compounding is the part that inverts the pain we started with. In a normal session cost grows as the
                  window fills; here the graph <em>remembers</em> what's already loaded, so a token you avoided on turn three
                  keeps saving you on every turn after. It's worth contrasting with the other "give the AI a graph" tools
                  (CodeGraph and friends): those hand the model a graph and let it <em>explore</em> via tool calls — it still
                  spends turns pulling context before it can reason. GrapeRoot preloads instead of letting it hunt.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="benchmarks" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Does it actually move the numbers?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  GrapeRoot's published benchmark ran across real codebases (7,700+ files) and 50+ engineering prompts. Cost
                  per prompt roughly halved, turns dropped about 3×, and — the part worth pausing on — quality went <em>up</em>.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Metric</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Without</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">With GrapeRoot</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {benchmarks.map((r) => (
                            <TableRow key={r.metric}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.metric}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.without}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.withGr}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base">
                  The win scales with how much the task leans on understanding a big codebase — architecture and migration
                  work benefit most, quick explanations least:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Task type</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Cost reduction</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {byTask.map((r) => (
                            <TableRow key={r.task}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.task}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.cut}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Usual caveat: these are the vendor's own numbers on their own benchmark. Treat "30–45% typical, up to
                  ~81% on architecture-heavy work" as a directional claim to validate on your repo, not a guarantee. The
                  mechanism, though, is hard to argue with — you can't be billed for exploration that never happens.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="quality" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Wait — doesn't feeding it less context hurt quality?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the fair objection, and the reason that quality number matters. If you show the model fewer files,
                  surely it misses things? In the benchmark the opposite happened — quality rose from <strong>76.6 to 86.6</strong>{" "}
                  — and it's not a fluke. Three reasons curating context tends to <em>improve</em> answers, not degrade them:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <li>• <strong>More context isn't better — the <em>right</em> context is.</strong> LLMs suffer "lost in the middle" and context rot: as the window fills with marginally-relevant code, attention spreads thin and the model misses what matters. Trimming to the relevant files raises the signal it reasons over.</li>
                    <li>• <strong>The model only used a few files anyway.</strong> Even when it explores, it answers from a handful of files — after wrong guesses and dead ends that pollute the window. Preloading the right ones skips the detours and the noise they leave behind.</li>
                    <li>• <strong>Less forced forgetting.</strong> A leaner window hits auto-compaction later, so fewer details get summarized away and the model stays coherent across a long task instead of reversing its earlier decisions — the exact failure from the top of this article.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The honest limit: this only holds if the <strong>ranking is right</strong>. If the graph mis-ranks and
                  omits a file the task genuinely needed, that answer can get worse — the model can't reason about code it
                  never saw. So the quality of a context engine <em>is</em> the quality of its retrieval. In practice the
                  graph (symbols, imports, call chains, plus what you've touched this session) ranks well enough that
                  measured quality rose — but it's a retrieval system, not magic, worth spot-checking on your own code.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="install" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Trying it on your own repo</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It's a Python package (<code>graperoot</code> on PyPI) with a per-tool wrapper command, Apache 2.0, on
                  macOS/Linux/Windows. Everything runs locally — no code leaves your machine — so it's a low-risk afternoon
                  experiment rather than a commitment.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1.5 text-sm sm:text-base font-mono">
                    <li><strong>Claude Code:</strong> <code>dgc /path/to/project</code></li>
                    <li><strong>Codex CLI:</strong> <code>dg</code></li>
                    <li><strong>Cursor / Gemini / Copilot / OpenCode:</strong> <code>graperoot . --cursor</code> (etc.)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="verdict" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">So — should you use it?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you recognized yourself in the first section — big codebase, Claude Code or Codex daily, tired of the
                  assistant re-reading half the repo and forgetting the plan — the answer is probably yes, and the local,
                  open-source setup means trying it costs you almost nothing. If your project is small enough to fit in the
                  window anyway, or you mostly do one-off scripts, you won't feel the difference.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Either way, the durable lesson outlives the specific tool: in 2026 the cheapest, most reliable AI coding
                  comes from engineering the <em>context</em>, not just the prompt. GrapeRoot is one clean implementation of
                  that idea — the same discipline the strongest{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">agentic systems</Link>{" "}
                  use under the hood, packaged for your editor.
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
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://graperoot.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GrapeRoot — official site</a></li>
                  <li>• <a href="https://graperoot.dev/benchmarks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GrapeRoot — benchmark methodology &amp; results</a></li>
                  <li>• <a href="https://github.com/kunal12203/GrapeRoot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GrapeRoot on GitHub</a></li>
                  <li>• <a href="https://pypi.org/project/graperoot/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">graperoot on PyPI</a></li>
                  <li>• <a href="https://dev.to/agentic-engineer/taming-context-windows-disable-auto-compact-for-better-ai-4gbm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DEV — taming context windows &amp; auto-compact</a></li>
                  <li>• <a href="https://dev.to/siddhantkcode/claude-code-is-costly-unless-you-do-this-484o" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DEV — Claude Code cost &amp; token management</a></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3 text-xs sm:text-sm">
                  Independent write-up — not sponsored. Benchmark figures are GrapeRoot's own published numbers; validate on
                  your codebase before relying on them.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/context-engineering-graperoot" />
      <Footer />
    </div>
  );
};

export default ContextEngineeringGrapeRootPost;
