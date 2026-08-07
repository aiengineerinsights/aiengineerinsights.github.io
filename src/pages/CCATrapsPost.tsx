import { ArrowLeft, Clock, User, Calendar, AlertTriangle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import CCATrapsHeroDiagram from "@/components/CCATrapsHeroDiagram";

const judgmentTraps = [
  {
    id: "prompt-band-aid",
    name: "1. The Prompt Band-Aid",
    sounds: "A rule or safety constraint is being violated → strengthen the wording in the system prompt to enforce it.",
    fix: "Prompts are probabilistic; they influence behavior, they don't guarantee it. Hard rules belong in code — a PreToolUse hook or programmatic check that blocks the action deterministically. If the correct answer would still fail 1 in 1,000 times, it isn't enforcement.",
  },
  {
    id: "overengineering",
    name: "2. Overengineering the first step",
    sounds: "The scenario has a problem → reach for a multi-agent layout or a new infrastructure layer.",
    fix: "Anthropic consistently favors the simplest architecture with the fewest moving parts. Very often the right answer is a better tool description, a tightened scope, or a config change — not a new system. Distractors reward complexity because complexity looks rigorous.",
  },
  {
    id: "premature-infra",
    name: "3. Premature infrastructure",
    sounds: "Propose a routing layer, sub-agents, or an extra database up front.",
    fix: "Optimize what you already have first — tool definitions, clear scope boundaries, prompt structure. Add infrastructure only once a concrete limit forces it. An answer that introduces new components before exhausting the cheap fixes is almost always the trap.",
  },
  {
    id: "sentiment-signal",
    name: "4. Sentiment as signal",
    sounds: "The model sounds confident / the scenario's tone is positive → treat the execution as safe or correct.",
    fix: "Confidence is not correctness. A model's tone tells you nothing about whether the tool actually ran, the data was valid, or the constraint held. Verify against ground truth — a check, a test, a returned value — never the vibe.",
  },
  {
    id: "super-agent",
    name: "5. The Super Agent fallacy",
    sounds: "Consolidate everything into one capable agent loaded with 15+ general-purpose tools.",
    fix: "More tools means more selection ambiguity and worse reliability. Scope 4–5 focused tools per agent and delegate the overflow to subagents. Capability comes from clear boundaries, not from one agent that can do everything.",
  },
  {
    id: "practice-complacency",
    name: "6. Practice-score complacency",
    sounds: "You scored high on the recall-style practice test → you're ready for the real thing.",
    fix: "The official practice material is largely definition recall; the live exam is situational judgment with details buried in the scenario. People have scored 1000/1000 on practice and 590 on the real exam. Readiness is measured by whether you can reason from experience, not by a practice score.",
  },
];

const technicalTraps = [
  {
    id: "subagent-isolation",
    name: "1. Subagent context isolation",
    wrong: "Treat a subagent like a function that shares the orchestrator's memory — assume it can see the conversation, the files you read, or the bug you just found.",
    right: "Each subagent runs in its own separate context window with its own system prompt and tools; it does NOT inherit the parent conversation. Pass a self-contained handoff prompt in, and it returns exactly one distilled report out. The delegation prompt IS the API boundary.",
    code: `# WRONG — the subagent never saw any of this
Use the debugger subagent to fix that bug we found.

# RIGHT — self-contained handoff, one distilled return
Use the debugger subagent. Context it needs:
- File: src/auth.py, validate_token() lines 40-72
- Symptom: tokens signed with the rotated key are rejected
- Repro: pytest tests/test_auth.py::test_rotated_key (fails)
Return ONLY: the root cause and the exact diff to apply.`,
  },
  {
    id: "claude-md",
    name: "2. CLAUDE.md precedence",
    wrong: "Assume the most specific CLAUDE.md overrides the others, like CSS — project beats user beats enterprise.",
    right: "Files are concatenated, not overridden — every applicable file loads in full. Order is managed policy → user (~/.claude/CLAUDE.md) → project (./CLAUDE.md) → local, broadest to most specific. On a genuine conflict, Claude may pick arbitrarily. And CLAUDE.md is context, not enforcement — for hard guarantees use hooks or managed settings.",
    code: `# WRONG mental model
project CLAUDE.md  ─overrides→  user  ─overrides→  managed

# RIGHT — all concatenated into context at once
[managed policy] + [~/.claude/CLAUDE.md] + [./CLAUDE.md] + [./CLAUDE.local.md]
   loaded first                                        loaded last
→ conflicts are non-deterministic; enforce with hooks, not prose`,
  },
  {
    id: "tool-description",
    name: "3. Tool-description leakage",
    wrong: "Describe the implementation (\"calls /v2/pricing and joins the sku table\") or stay terse (\"gets the stock price\").",
    right: "The description is the single most important factor in tool performance — it's how the model decides whether and how to use the tool. Describe the user-facing function, when to use it (and when not), what each parameter means, and what it does NOT return. Aim for 3–4+ sentences. Implementation details are noise the model can't act on.",
    code: `// WRONG — too terse, no when/limits
"description": "Gets the stock price for a ticker."

// RIGHT — function, when-to-use, return, and limits
"description": "Retrieves the current stock price for a given ticker
symbol on a major US exchange (NYSE/NASDAQ). Returns the latest trade
price in USD. Use it when the user asks for the current price of a
specific stock. It does not return any other company information."`,
  },
  {
    id: "mcp-errors",
    name: "4. MCP error contracts",
    wrong: "When a tool fails, throw — let it surface as a JSON-RPC protocol error, or dump a raw stack trace into the result.",
    right: "Tool execution failures belong in the result with isError: true (is_error in the Messages API), not in the protocol layer — a protocol error the model may never see and can't recover from. Return a structured, actionable message with a recovery hint. The error text is part of the model's input.",
    code: `// WRONG — raw trace, or a protocol-level error the model can't recover from
{ "error": { "code": -32603, "message": "Traceback ... OperationalError: FATAL: too many connections" } }

// RIGHT — tool result, isError:true, actionable + recoverable
{ "result": { "isError": true, "content": [{ "type": "text",
  "text": "Query failed: the reporting DB is at its connection limit. Retry in ~30s, or narrow the query with a date range. No rows returned." }] } }`,
  },
  {
    id: "stop-reason",
    name: "5. Agentic loop control via stop_reason",
    wrong: "Drive termination off the model's prose — parse for \"I'm done\" — or exit purely on a fixed iteration count.",
    right: "Branch on the structured stop_reason field. Continue the loop while it's \"tool_use\" (run the tools, append the assistant turn, append a user turn of tool_result blocks, call again); terminate on \"end_turn\". An iteration cap is a safety backstop, not the primary exit. Stranding a tool_use block without a tool_result 400s the next call.",
    code: `messages = [{"role": "user", "content": query}]
for _ in range(MAX_ITERS):                 # backstop, not the exit
    r = client.messages.create(model="claude-opus-5",
                               messages=messages, tools=tools, max_tokens=1024)
    if r.stop_reason == "tool_use":
        results = run_tools(r.content)
        messages.append({"role": "assistant", "content": r.content})
        messages.append({"role": "user", "content": results})  # tool_result FIRST
        continue
    return r                               # end_turn / max_tokens / ... → done`,
  },
];

const faqs = [
  {
    q: "Why do good engineers fail the Claude Certified Architect exam?",
    a: "Because the wrong answers are written to sound like solid engineering. Options that add a stronger system prompt, a multi-agent layer, or more tools feel rigorous — but the exam rewards the simplest correct architecture and the recognition that prompts are probabilistic while enforcement is deterministic. Real-world instinct toward 'more' is exactly what the distractors exploit.",
  },
  {
    q: "Is the Claude Certified Architect exam hard?",
    a: "It's less about difficulty than about judgment. If you've actually built agentic systems on Claude, most answers are obvious once you spot the trap. If you've only read docs, the plausible-but-wrong options catch you. The single best predictor of passing is how much you've built, not how many hours you studied.",
  },
  {
    q: "How do I avoid the exam's trap answers?",
    a: "Ask two questions of every option: (1) Does this confuse a probabilistic prompt with deterministic code? (2) Does it add complexity when a simpler fix — a tool description, a scope boundary, a config change — would do? If yes to either, it's probably the distractor.",
  },
  {
    q: "What's the most-missed technical topic?",
    a: "Rolling-window context management and stop_reason-based loop control in domain 1, plus subagent context isolation. Candidates repeatedly report these as the areas they under-prepared. See the full breakdown in our main Claude Certified Architect exam guide.",
  },
];

const CCATrapsPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-purple-800 rounded-full px-3 py-1">
                  <AlertTriangle className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Why Good Engineers Fail the Claude Certified Architect Exam: 11 Traps to Avoid
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                On Anthropic's Claude Certified Architect – Foundations (CCA-F) exam, the wrong answers are deliberately
                written to <strong>sound like best-practice engineering</strong>. Passing comes down to recognizing two
                things: where a probabilistic prompt is being confused with deterministic code, and where complexity is
                masquerading as rigor. Here are the eleven traps — six of judgment, five technical — with the correct
                pattern for each.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-600 to-purple-800 flex items-center justify-center flex-shrink-0">
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
                      Exam Strategy
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 7, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <CCATrapsHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="why" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why the exam is a trap for strong engineers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most certifications ask what something <em>is</em>. The CCA-F asks what you'd do when something breaks —
                  and its distractors are engineered so the wrong choice reads like the responsible, senior move. Add a
                  firmer system prompt. Stand up an orchestration layer. Give the agent more tools. In a real standup those
                  answers sound great. On this exam they're the trap, because they violate two principles Anthropic keeps
                  returning to: <strong>prompts are probabilistic, not enforcement</strong>, and <strong>the best
                  architecture is the simplest one that works.</strong> The rest of this piece is those two ideas, made
                  concrete. It pairs with our full{" "}
                  <Link to="/blog/claude-certified-architect-exam" className="text-primary hover:underline">Claude Certified Architect exam guide</Link>{" "}
                  (domains, cost, format) — this one is purely about the traps.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="judgment-traps" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Part 1 — The judgment traps (why the distractors work)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These six aren't about knowing an API. They're about resisting the plausible-but-wrong instinct the exam
                  is built to exploit.
                </p>
                {judgmentTraps.map((t) => (
                  <div key={t.id} className="mb-5">
                    <h3 id={t.id} className="text-lg sm:text-xl font-semibold mb-2">{t.name}</h3>
                    <div className="bg-muted/50 p-4 sm:p-5 rounded-lg space-y-2">
                      <p className="text-sm sm:text-base">
                        <strong className="text-rose-400">Sounds right:</strong>{" "}
                        <span className="text-muted-foreground">{t.sounds}</span>
                      </p>
                      <p className="text-sm sm:text-base">
                        <strong className="text-emerald-400">The correction:</strong>{" "}
                        <span className="text-muted-foreground">{t.fix}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="technical-traps" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Part 2 — The technical traps you must know cold</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These five come straight from Anthropic's own docs. Each is a specific mechanism candidates get backwards.
                  If you can reason about all five from experience, you're most of the way there.
                </p>
                {technicalTraps.map((t) => (
                  <div key={t.id} className="mb-6">
                    <h3 id={t.id} className="text-lg sm:text-xl font-semibold mb-2">{t.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                      <strong className="text-rose-400">The wrong instinct:</strong> {t.wrong}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base">
                      <strong className="text-emerald-400">The correct pattern:</strong> {t.right}
                    </p>
                    <pre className="overflow-x-auto rounded-lg bg-muted/60 border border-border p-3 text-xs sm:text-sm leading-relaxed"><code>{t.code}</code></pre>
                  </div>
                ))}
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="the-habit" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The one habit that beats all eleven</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Build something real before you sit the exam — a multi-agent workflow or an MCP server, end to end, with
                  the failures that come with production. Every trap above is obvious once you've felt it: you've watched a
                  "stronger prompt" fail a rule anyway, watched a 15-tool agent get confused, watched a subagent redo work
                  because you forgot to hand off context. The exam rewards that scar tissue. When you read a scenario, run
                  two checks on each option — <em>does it confuse a probabilistic prompt with deterministic code?</em> and{" "}
                  <em>does it add complexity a simpler fix would avoid?</em> — and the distractors fall away. For the
                  broader plan, the domains and free study path are in the{" "}
                  <Link to="/blog/claude-certified-architect-exam" className="text-primary hover:underline">main exam guide</Link>, and the underlying agent concepts are in{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">What Makes LLMs Agentic</Link>.
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
                  <li>• <a href="https://code.claude.com/docs/en/sub-agents" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Code — Subagents</a> (context isolation)</li>
                  <li>• <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Code — Memory / CLAUDE.md</a> (precedence)</li>
                  <li>• <a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude API — Defining tools</a> (descriptions)</li>
                  <li>• <a href="https://platform.claude.com/docs/en/api/handling-stop-reasons" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude API — Handling stop_reason</a> (loop control)</li>
                  <li>• <a href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MCP spec — Tool errors (isError)</a></li>
                  <li>• <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic — Building Effective Agents</a> (simplest architecture)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3 text-xs sm:text-sm">
                  Independent study aid — not affiliated with Anthropic and not real exam content. Technical patterns are
                  quoted from the official docs linked above; verify current details there before you sit the exam.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/claude-certified-architect-exam-traps" />
      <Footer />
    </div>
  );
};

export default CCATrapsPost;
