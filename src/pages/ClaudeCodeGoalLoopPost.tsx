import { ArrowLeft, Clock, User, Calendar, Route, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import ColumnsHeroDiagram from "@/components/ColumnsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CLAUDE_CODE_CHEAT_SHEET } from "@/config/newsletterBonuses";

const PATH = "/blog/claude-code-goal-loop";

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{children}</p>
);
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{children}</h2>
);
const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{children}</h3>
);
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>
);
const In = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-primary hover:underline">{children}</Link>
);
const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 text-[0.85em] font-mono text-foreground">{children}</code>
);
const Code = ({ children }: { children: string }) => (
  <pre className="bg-muted rounded-lg p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm mb-4"><code>{children}</code></pre>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">{children}</ul>
);
const DataTable = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
    <div className="min-w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>{head.map((h) => <TableHead key={h} className="text-xs sm:text-sm px-2 sm:px-4">{h}</TableHead>)}</TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, j) => (
                  <TableCell key={j} className={`text-xs sm:text-sm px-2 sm:px-4 align-top ${j === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

const ClaudeCodeGoalLoopPost = () => {
  const compare = [
    ["What starts the next turn", "The previous turn ends", "A time interval passes", "The previous turn ends", "The previous turn ends"],
    ["What decides it is done", "A separate small model reads the conversation and checks your condition", "You stop it, or Claude decides the work is done", "Claude prints your exact completion phrase, or the iteration cap is hit", "Your script's exit code"],
    ["Where you set it", "Typed in the session", "Typed in the session", "Typed in the session, after installing the plugin", "A settings file"],
    ["Scope", "This session only", "This session only", "This session only", "Every session in that settings scope"],
    ["Deterministic?", "No: a model judges", "No", "Partly: exact string match plus a hard cap", "Yes, with a command hook"],
    ["Built in?", "Yes", "Yes", "Plugin from Anthropic's marketplace", "Yes"],
  ];

  const conditions = [
    ["make the auth module better", "No end state, nothing to check"],
    ["all tests pass", "Which tests, proven how? Claude could also delete a failing test"],
    ["uv run pytest tests/auth exits 0, with no file under tests/ modified, or stop after 20 turns", "One end state, a stated check, a constraint, and a cap"],
    ["every call to old_logger in app/ is replaced and rg old_logger app/ returns nothing", "The check is a command whose output appears in the conversation"],
    ["CHANGELOG.md has one entry for every PR merged since the last tag, listed by gh pr list", "Names the source of truth, so the checker can compare"],
  ];

  const stalls = [
    ["Goal paused", "A failure a retry would repeat: a rate limit, a usage limit, a hook that ended the turn", "Wait or fix the cause, then send any message"],
    ["Goal still active (retrying)", "A failure that tends to clear by itself, such as an overloaded server. After three automatic retries it pauses", "Nothing, or send a message to retry now"],
    ["Goal cleared after an unrecoverable error", "Sign-in failure, exhausted credit, a model that is unavailable, context that could not be compacted", "Fix the cause and set the goal again"],
    ["Judged impossible", "The checker decided the condition can never be met", "Read the reason, then rewrite the condition"],
    ["Loop stopped, goal still set", "Claude answered the checker for several turns without using a tool", "Send a prompt that unblocks it"],
    ["Never resolves", "The condition depends on something that never appears in the conversation", "Rewrite it as something Claude's own output can show"],
  ];

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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full px-3 py-1">
                  <Route className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Coding</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Claude Code /goal vs /loop vs Ralph Loop: Goal-Based Development Explained (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Claude Code has four ways to keep working after a turn ends: <strong>/goal</strong>,{" "}
                <strong>/loop</strong>, the <strong>Ralph loop</strong> plugin, and a <strong>Stop hook</strong>. They
                differ in one thing that matters: what decides the work is finished. This guide explains how each one
                works, how to write a goal condition that actually resolves, and how to keep an unattended run from
                burning your budget.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Intermediate</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 20, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />11 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ColumnsHeroDiagram
              gradientId="ccglBg"
              title="FOUR WAYS TO KEEP CLAUDE CODE WORKING"
              subtitle="the difference is what decides the work is finished"
              columns={[
                { name: "/GOAL", tag: "work until a condition holds", color: "#f97316", lines: ["built in, one per session", "a small model checks", "reads the conversation only", "clears itself when met"], best: "best for: build until tests pass" },
                { name: "/LOOP", tag: "repeat a prompt on a timer", color: "#5eb8c8", lines: ["built in", "runs every N minutes", "same session each time", "stops when you stop it"], best: "best for: polling CI or a deploy" },
                { name: "RALPH LOOP", tag: "re-feed the same prompt", color: "#8b9cf0", lines: ["plugin, Anthropic marketplace", "exact completion phrase", "--max-iterations cap", "/cancel-ralph to stop"], best: "best for: the Ralph technique" },
                { name: "STOP HOOK", tag: "your script decides", color: "#86c98f", lines: ["lives in settings.json", "exit code 2 blocks the stop", "applies to every session", "deterministic"], best: "best for: rules with no exceptions" },
              ]}
              footer="whichever you pick: one checkable end state, and a cap on turns or spend"
              ariaLabel="Four ways to keep Claude Code working, and what decides the work is finished. /goal is built in, one per session; a small model checks your condition by reading the conversation only, and the goal clears itself when met; best for building until tests pass. /loop is built in and repeats a prompt on a timer in the same session until you stop it; best for polling CI or a deploy. Ralph loop is a plugin from Anthropic's marketplace that re-feeds the same prompt until Claude prints an exact completion phrase or the max-iterations cap is reached, and is stopped with /cancel-ralph; best for the Ralph technique. A Stop hook lives in settings.json, blocks the stop with exit code 2, applies to every session and is deterministic; best for rules with no exceptions. Whichever you pick, give it one checkable end state and a cap on turns or spend."
              source="aiengineerinsights.com · from Anthropic's Claude Code docs and the ralph-loop plugin README, checked Nov 18 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — /goal vs /loop vs Ralph loop:</strong> use <C>/goal</C> to keep Claude working until a
                condition is met; a separate model checks it after every turn. Use <C>/loop</C> to repeat a prompt on
                a timer, for polling. The Ralph loop plugin re-feeds the same prompt until Claude prints an exact
                phrase, and needs <C>--max-iterations</C>. A Stop hook is the deterministic option: your script
                decides. For most "keep going until it works" jobs, the built-in <C>/goal</C> is now the place to
                start. Write the condition as one end state Claude's own output can prove, and add "or stop after N
                turns".
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="what-is-it">1. What Is Goal-Based Development in Claude Code?</H2>
                <P>
                  Normally Claude Code works for one turn and hands control back when it judges the work done.
                  Goal-based development changes who makes that call. You state what "done" means once, and something
                  other than the working model checks it after every turn. If the answer is "not yet", Claude starts
                  another turn without waiting for you.
                </P>
                <P>
                  This is the idea behind the Ralph Wiggum technique, which Geoffrey Huntley summed up as "Ralph is a
                  Bash loop": feed an agent the same prompt again and again and let it improve its own work through
                  the files it leaves behind. Claude Code now has that built in as <C>/goal</C>, with a checker
                  attached.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="comparison">2. /goal vs /loop vs Ralph Loop vs a Stop Hook</H2>
                <DataTable head={["", "/goal", "/loop", "Ralph loop", "Stop hook"]} rows={compare} />
                <P>
                  One clarification, because the names invite confusion: <C>/loop</C> did not become <C>/goal</C>.
                  Both exist. <C>/loop</C> is about <em>time</em> ("every 15 minutes"), and <C>/goal</C> is about a{" "}
                  <em>condition</em> ("until the tests pass"). Auto mode is a third thing: it removes permission
                  prompts within a turn but does not start a new one.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="how-goal-works">3. How Does /goal Work?</H2>
                <P>
                  Type <C>/goal</C> followed by a condition. That starts a turn at once, with the condition as the
                  instruction. Under the hood it is a session-scoped Stop hook that asks a model to judge. Each time
                  Claude finishes a turn, Claude Code sends the condition and the conversation so far to your small
                  fast model, which returns one of three verdicts:
                </P>
                <UL>
                  <li>• <strong>Not yet met:</strong> Claude keeps working, and takes the reason as guidance for the next turn.</li>
                  <li>• <strong>Met:</strong> the goal clears and the transcript records it as achieved.</li>
                  <li>• <strong>Impossible:</strong> the goal clears and the transcript records why.</li>
                </UL>
                <P>
                  The detail that decides whether a goal works: <strong>the checker does not run commands or read
                  files.</strong> It only sees what Claude has already put in the conversation. A condition about
                  something that never shows up there cannot be confirmed, however true it is.
                </P>
                <Code>{`/goal            # show the condition, time running, turns, token spend, last reason
/goal clear      # stop it (also: stop, off, reset, none, cancel)
Ctrl+O           # see the reason behind each verdict`}</Code>
                <UL>
                  <li>• One goal per session. A new one replaces the old one.</li>
                  <li>• <C>/clear</C> removes an active goal. Resuming a session restores one that was still active.</li>
                  <li>• If a subagent or background command is still running when a turn ends, the check is skipped until that work finishes.</li>
                </UL>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="conditions">4. How to Write a Goal Condition That Resolves</H2>
                <P>A condition that holds up over many turns has three parts:</P>
                <UL>
                  <li>• <strong>One measurable end state:</strong> a test result, a build exit code, a file count, an empty queue.</li>
                  <li>• <strong>A stated check:</strong> the command that proves it, so its output lands in the conversation.</li>
                  <li>• <strong>The constraints that matter:</strong> what must not change on the way there.</li>
                </UL>
                <DataTable head={["Condition", "Verdict"]} rows={conditions} />
                <P>
                  Add a cap in the condition itself, such as <C>or stop after 20 turns</C>. Claude reports progress
                  against it each turn and the checker reads that. The condition can be up to 4,000 characters, so
                  there is room to be specific.
                </P>
                <P>
                  The constraint line is the one people skip. "Tests pass" can be satisfied by weakening the tests. If
                  the tests are the spec, say so: no file under <C>tests/</C> may be edited.
                </P>
              </section>

              <NewsletterSignup bonus={CLAUDE_CODE_CHEAT_SHEET} />

              <section className="mb-6 sm:mb-8">
                <H2 id="loop">5. When Should You Use /loop?</H2>
                <P>
                  <C>/loop</C> runs a prompt repeatedly while the session stays open. Give it an interval and a
                  prompt:
                </P>
                <Code>{`/loop 15m check CI on this branch; if it is red, read the failing job's log, fix it and push`}</Code>
                <UL>
                  <li>• Leave out the interval and Claude paces itself between runs.</li>
                  <li>• Leave out the prompt and it runs the built-in maintenance prompt, or your <C>loop.md</C>.</li>
                  <li>• Each run is another turn in the same session, so do not leave one going inside a long conversation: every run re-reads all of it.</li>
                  <li>• <C>/proactive</C> is an alias.</li>
                </UL>
                <P>
                  Use it for watching something that changes without you: a deploy, a CI run, a queue. For work that
                  should happen while your laptop is closed, <C>/schedule</C> sets up a cloud task on a timer.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="ralph-loop">6. What Is the Ralph Loop Plugin, and Do You Still Need It?</H2>
                <P>
                  The Ralph loop plugin is Anthropic's packaging of the Ralph Wiggum technique. Older posts call it
                  ralph-wiggum. It uses a Stop hook to catch Claude's attempt to finish and feed the{" "}
                  <strong>same prompt</strong> back in. The prompt never changes; Claude sees its own earlier work in
                  the files and git history and builds on it.
                </P>
                <Code>{`/plugin install ralph-loop@claude-plugins-official

/ralph-loop "Build a REST API for todos: CRUD, input validation, tests.
Output <promise>COMPLETE</promise> when every test passes." \\
  --completion-promise "COMPLETE" --max-iterations 30

/cancel-ralph`}</Code>
                <UL>
                  <li>• <C>--max-iterations</C> defaults to unlimited. Always set it.</li>
                  <li>• <C>--completion-promise</C> is an exact string match, so it cannot tell "finished" from "gave up". The plugin's own README says to treat the iteration cap as the main safety net.</li>
                  <li>• Nothing independent checks the claim. Claude can print the phrase when the work is not done.</li>
                </UL>
                <P>
                  That last point is the real difference from <C>/goal</C>, where a fresh model judges the condition
                  and the working model's word is not enough. For most jobs, start with <C>/goal</C>. Ralph loop still
                  fits when you want the same prompt re-read every round with a hard iteration count, or when you
                  already have prompts written for it.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="stop-hook">7. The Deterministic Option: a Stop Hook</H2>
                <P>
                  A goal is judged by a model, so it can be wrong. When "done" must mean the test suite really passed,
                  put the check in a Stop hook. Your command runs every time Claude tries to finish; exit code 2
                  blocks the stop and sends the error output back.
                </P>
                <Code>{`// .claude/settings.json
{
  "hooks": {
    "Stop": [
      { "hooks": [ { "type": "command", "command": "uv run pytest -q 1>&2 || exit 2" } ] }
    ]
  }
}`}</Code>
                <P>
                  The two combine well: a goal to say what you want, a Stop hook to enforce the part that cannot be
                  argued with. If a Stop hook blocks eight stops in a row with no tool call between them, Claude Code
                  ends the turn anyway. More on where hooks fit in{" "}
                  <In to="/blog/claude-code-best-practices">Claude Code best practices</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="unattended">8. Running a Goal Unattended Without Burning Your Budget</H2>
                <UL>
                  <li>• <strong>Permission mode:</strong> a goal does not change it. In Manual mode Claude still stops to ask before commands your settings do not allow. Run the goal in auto mode, with deny rules for what must never happen.</li>
                  <li>• <strong>A cap:</strong> put "or stop after N turns" in the condition. With <C>-p</C> you can also pass <C>--max-turns</C> or <C>--max-budget-usd</C>.</li>
                  <li>• <strong>Watch the spend:</strong> <C>/goal</C> with no argument shows turns and token spend so far. Every turn re-sends the conversation, and the check after each turn is one more small-model call.</li>
                  <li>• <strong>Limit the blast radius:</strong> run it in a worktree (<C>claude -w name</C>) on its own branch, and have a person approve the merge.</li>
                  <li>• <strong>Start small:</strong> try the goal on one module before the whole codebase.</li>
                </UL>
                <P>From a script, a goal runs to completion in one call:</P>
                <Code>{`claude -p "/goal CHANGELOG.md has an entry for every PR merged this week" \\
  --output-format stream-json --verbose`}</Code>
                <P>
                  With plain text output the final answer only prints when the loop ends, which can look stuck. The
                  streaming format shows each message as it happens.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="stalls">9. Why Did My Goal Stop or Never Finish?</H2>
                <DataTable head={["What you see", "Why", "What to do"]} rows={stalls} />
                <P>
                  The last row is the common one. If the condition is "the client approved the design" or "the staging
                  site looks right", nothing in the conversation can prove it, and the goal keeps saying "not yet".
                  Rewrite it as a command whose output Claude can show.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">10. FAQ</H2>

                <H3 id="faq-difference">What is the difference between /goal and /loop in Claude Code?</H3>
                <P>
                  /goal keeps Claude working until a condition you write is met, and a separate model checks that
                  condition after every turn. /loop repeats a prompt on a time interval while the session is open and
                  stops when you stop it. Use /goal for building until something passes and /loop for polling
                  something that changes over time.
                </P>

                <H3 id="faq-ralph">What is the Ralph loop in Claude Code?</H3>
                <P>
                  The Ralph loop is a technique where an agent is fed the same prompt repeatedly and improves its work
                  through the files it leaves behind. In Claude Code it is available as the ralph-loop plugin from
                  Anthropic's marketplace, which uses a Stop hook to re-feed the prompt until Claude prints a
                  completion phrase or an iteration cap is reached.
                </P>

                <H3 id="faq-replace">Does /goal replace the Ralph loop plugin?</H3>
                <P>
                  For most uses, yes. /goal is built in, needs no plugin, and has an independent model check the
                  condition, while the Ralph loop trusts Claude to print a completion phrase. The plugin is still
                  useful when you want the identical prompt re-read each round with a hard iteration limit.
                </P>

                <H3 id="faq-condition">How do I write a good /goal condition?</H3>
                <P>
                  State one measurable end state, the command that proves it, and anything that must not change, then
                  add a cap such as "or stop after 20 turns". The checker only reads the conversation, so the proof
                  has to be something Claude's own output shows, such as a test command exiting with 0.
                </P>

                <H3 id="faq-stop">How do I stop a goal in Claude Code?</H3>
                <P>
                  Run /goal clear. The words stop, off, reset, none and cancel work too, and /clear also removes an
                  active goal. In a non-interactive run started with claude -p, press Ctrl+C. To stop a Ralph loop,
                  run /cancel-ralph.
                </P>

                <H3 id="faq-cost">Does /goal cost more than a normal session?</H3>
                <P>
                  It can. Each extra turn re-sends the conversation, and each check is one more call to the small fast
                  model. The check itself is cheap; the turns are what add up. Run /goal with no argument to see turns
                  and token spend, and put a turn limit in the condition.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">11. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href="https://code.claude.com/docs/en/goal">Claude Code docs — Keep Claude working toward a goal</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/commands">Claude Code docs — Commands (/goal, /loop, /schedule)</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/hooks-guide">Claude Code docs — Hooks guide</A></li>
                  <li>• <A href="https://code.claude.com/docs/en/best-practices">Claude Code docs — Best practices (running without you)</A></li>
                  <li>• <A href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop">ralph-loop plugin README, Anthropic's official marketplace</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against Anthropic's Claude Code docs and the ralph-loop plugin README (v1.0.1) on November
                  18, 2026. Examples are ours. Behaviour such as retries and check-ins depends on your Claude Code
                  version, so run /release-notes if something here does not match.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current={PATH} />
      <Footer />
    </div>
  );
};

export default ClaudeCodeGoalLoopPost;
