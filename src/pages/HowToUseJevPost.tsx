import { ArrowLeft, Clock, User, Calendar, GitBranch, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HowToUseJevHeroDiagram from "@/components/HowToUseJevHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const useCases = [
  {
    useCase: "Agent routing",
    decides: "Is this query simple or complex? (a Choice) — so a small model handles the easy ones and the big model gets the rest",
    fits: "The decision is cheap, fast (TypeSafe claims ~70–500 ms), and typed, so the router is a one-line branch instead of a prompt-and-parse step",
    watch: "Mid-range confidence (roughly 0.3–0.8) is where calibration is weakest; route those to the safer, bigger path by default",
  },
  {
    useCase: "Tool-call guardrail",
    decides: "Should this proposed tool call be blocked or allowed? (a Choice or a probability) before your runtime executes it",
    fits: "Sits between the planning LLM and the executor; a non-autoregressive verdict adds little latency to every step",
    watch: "Prompt injection can move the verdict. Never let unguarded untrusted text into a gate on a destructive action; keep a hard rule or a human there",
  },
  {
    useCase: "Classification / moderation",
    decides: "Which label applies — category, urgency flag, policy violation — from up to 255 labels, plus a confidence",
    fits: "Output is a valid label every time, with output tokens free and input at $0.042 per million tokens, so high-volume triage is cheap",
    watch: "A valid label is not a correct label. Sample and audit; treat low and mid confidences as 'needs review', not as a decision",
  },
  {
    useCase: "Real-time game / robot loop",
    decides: "The next discrete action or a Score for the current state, tens of times per session",
    fits: "Reported demo costs are tiny (about $0.01 for a 2-minute Minecraft session, about $0.10 for a 15-minute drone sim, per coverage) and latency fits a control loop",
    watch: "Jev cannot count or compare dates reliably and gives no reasoning — keep physics, safety limits, and anything arithmetic in ordinary code",
  },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "How do I get access to Jev?",
    a: "Jev entered early access on September 15, 2026 and the waitlist was dropped around September 21, 2026, so access is open. You can call it directly through the TypeSafe API with a TYPESAFE_API_KEY, or through OpenRouter, Cloudflare Workers AI (model id typesafe/jev, which does not require a TypeSafe key), or Composio. Pick whichever platform your stack already talks to.",
  },
  {
    q: "What does Jev return instead of text?",
    a: "A typed decision plus a calibrated confidence. There are three output types: a Choice (one label from a set of up to 255), a Score (a number), and a calibrated probability. A typical response looks like {label: 'fraud', confidence: 0.87}. Your code branches on the label and the confidence directly, with no parsing and no 'answer only yes or no' prompt.",
  },
  {
    q: "Does Jev work with LangChain and Pydantic?",
    a: "Yes. LangChain has a TypeSafeClassifier integration: you pass it state plus the questions you want decided and get typed decisions back, which LangChain uses for agent routing and tool-call risk blocking. Jev's outputs are Pydantic-typed, and it accepts Pydantic schemas as output constraints, so the decision lands in your code already validated. Check the current TypeSafe and LangChain docs for exact signatures.",
  },
  {
    q: "How much does Jev cost?",
    a: "Verified pricing is $0.042 per million input tokens, with output free, and a 32,000-token context window. TypeSafe's headline comparisons (up to about 193.6x faster and about 444.6x cheaper than LLM alternatives) are vendor claims on vendor-selected workflows, and the 444.6x figure uses the average of two other models as its reference answer, which measures agreement rather than accuracy.",
  },
  {
    q: "Can Jev hallucinate?",
    a: "The shape cannot be wrong: you always get a valid label, score, or probability of the type you asked for. The value can still be wrong. 'Cannot hallucinate' is a claim about type safety, not about correctness, so treat Jev like any classifier: measure its accuracy on your own data before trusting it, and watch the confidence.",
  },
  {
    q: "Is it safe to let Jev decide whether an agent's tool call runs?",
    a: "Only with guards around it. VentureBeat reported, and an Octomind engineer demonstrated, that injected text moves Jev's verdict: a 'block this command?' probability of 0.76 fell to 0.48 after a fake 'user pre-approved' field was added to the input. TypeSafe's own limitations page says adversarial content can move the answer. Use Jev as a fast first filter, never as the only thing standing between untrusted input and a destructive action.",
  },
];

const HowToUseJevPost = () => {
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
                  <GitBranch className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                How to Use Jev: A Practical Guide + Use Cases for AI Engineers (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Jev returns a typed, calibrated decision — a label or score plus a confidence — that your
                code acts on directly.</strong> No text to parse, no "answer only yes or no" prompt. That makes it
                a good fit for the decision points inside an agent loop: which model to route to, whether a tool
                call is safe to run, what label a message gets. This is the practical guide: how to get access,
                what the output types are, the integrations (LangChain, Pydantic, Cloudflare), the real use cases,
                a worked routing-and-guardrail pattern, and the one security caveat that matters before you put it
                in front of anything destructive.
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
                      Sep 23, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <HowToUseJevHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="access" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do I get access to Jev?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Quick recap if you're arriving cold: Jev is TypeSafe AI's "System One" model. It's{" "}
                  <strong>non-autoregressive</strong> — it doesn't generate tokens — and it returns a typed decision
                  with a calibrated confidence instead of text. If you want the conceptual background first, read{" "}
                  <Link to="/blog/what-is-jev" className="text-primary hover:underline">what Jev is</Link> and{" "}
                  <Link to="/blog/jev-vs-llm" className="text-primary hover:underline">how it differs from an LLM</Link>;
                  this post assumes you already want to wire it in.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Jev went into{" "}
                  <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">early access on September 15, 2026</RefLink>,
                  and the waitlist was dropped around September 21, 2026 — so as of this writing, access is open. You
                  have four ways in:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>TypeSafe API directly.</strong> Sign up, get a <code>TYPESAFE_API_KEY</code>, and call the API. This is the canonical path and the one the LangChain and Pydantic integrations sit on top of.</li>
                    <li>• <strong>OpenRouter.</strong> If you already route model calls through OpenRouter, Jev is listed there.</li>
                    <li>• <strong>Cloudflare Workers AI.</strong> Model id <code>typesafe/jev</code> — and notably, usable <em>without</em> a TypeSafe key, which makes it the lowest-friction way to try it if you're already on Workers. See the <RefLink href="https://developers.cloudflare.com/ai/models/typesafe/jev/">Cloudflare model page</RefLink>.</li>
                    <li>• <strong>Composio.</strong> Available as part of Composio's tool catalogue if that's your integration layer.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Pricing, as verified at launch: <strong>$0.042 per million input tokens, output free</strong>, with a
                  32,000-token context window. Output being free follows from the architecture — there are no output
                  tokens to bill, just a decision.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="output-types" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does Jev actually return? The three output types</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Everything about using Jev well comes back to this: you pick the <em>shape</em> of the answer up
                  front, and Jev is guaranteed to return something of that shape. There are three shapes:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Choice.</strong> Pick one label from a set you define — up to 255 of them. This is your router ("simple" / "complex"), your guardrail ("block" / "allow"), and your classifier ("billing" / "bug" / "feature-request" / …).</li>
                    <li>• <strong>Score.</strong> A number. Useful when you want a ranking or a threshold you tune yourself rather than a fixed label.</li>
                    <li>• <strong>Calibrated probability.</strong> A probability for a yes/no question — "is this command dangerous?" — that is meant to be calibrated, i.e. a 0.8 should be right about 80% of the time.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Every answer comes with a confidence. TypeSafe's own example is{" "}
                  <code>{"{label: \"fraud\", confidence: 0.87}"}</code>. Two things to internalise before you build
                  on it. First, <strong>"cannot hallucinate" means the shape, not the value.</strong> You will
                  always get a valid label from your list; the label can still be the wrong one. Second, the
                  calibration is <strong>imperfect</strong>: an independent measurement put the expected calibration
                  error at roughly 0.107, and confidence is shakiest in the 0.3–0.8 mid-range. In practice that
                  means confidences near 0 or 1 are worth acting on; confidences in the middle are a signal to fall
                  back to a rule, a bigger model, or a human.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What you do <em>not</em> get: reasoning, explanations, or free text of any kind. Jev also can't
                  reliably count or compare dates. If your decision depends on arithmetic, do the arithmetic in code
                  and hand Jev the result as a field.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="integrations" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which integrations exist? LangChain, Pydantic, and Cloudflare</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You can call the raw API, but the three integrations below are where most engineers will actually
                  touch Jev. I'm keeping these high-level on purpose — the SDKs are a week old and signatures will
                  move, so check the current docs for the exact calls.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>LangChain — <code>TypeSafeClassifier</code>.</strong> You give it the agent's current state plus the questions you want decided, and get typed decisions back. LangChain's own write-up (<RefLink href="https://www.langchain.com/blog/building-a-harness-with-jev">Building a harness with Jev</RefLink>) uses it for exactly the two jobs this post is about: routing by complexity, and blocking risky tool calls before they execute.</li>
                    <li>• <strong>Pydantic-typed outputs.</strong> Jev's results are Pydantic-typed, and it accepts Pydantic schemas as output constraints. So the decision arrives in your code already validated — no <code>json.loads</code>, no regex, no "the model wrapped it in markdown again."</li>
                    <li>• <strong>Cloudflare Workers AI — <code>typesafe/jev</code>.</strong> The zero-signup path if you're already on Workers. Fits naturally at the edge: classify or gate a request before it ever reaches your origin.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A note on where this sits architecturally. If you've read our{" "}
                  <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">MCP vs API</Link> piece: MCP
                  is how an agent <em>discovers and calls</em> tools. Jev is a candidate for the step just before
                  that — deciding whether a given call should go through at all. They're different layers and they
                  compose.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="use-cases" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What are the real use cases for Jev?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Four patterns are documented so far, either by TypeSafe, by LangChain, or in the demos coverage has
                  reported on. Each row is the same shape: what Jev decides, why it's a fit, and the thing that will
                  bite you.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Use case</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What Jev decides</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why Jev fits</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Watch out</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {useCases.map((r) => (
                            <TableRow key={r.useCase}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.useCase}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.decides}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.fits}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.watch}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The real-time row deserves a word. The demos that got attention — a Minecraft bot, a Subway Surfers
                  bot, drone and robot simulations — work because Jev is being asked a small discrete question many
                  times per second, not because it "understands" the game. The cost figures (about $0.01 for a
                  two-minute Minecraft session, about $0.10 for a fifteen-minute drone sim) are{" "}
                  <strong>reported demo numbers</strong>, not benchmarks; take them as an order of magnitude.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On the vendor's headline claims: TypeSafe says Jev is up to ~193.6× faster and ~444.6× cheaper
                  than the alternatives, with ~70–500 ms latency. Those are{" "}
                  <strong>TypeSafe's own numbers on vendor-selected workflows</strong>. The 444.6× figure in
                  particular uses the average of two other models as its reference answer — so it measures agreement
                  with those models, not accuracy against ground truth. Useful directionally; not something to put
                  in a design doc without your own measurement.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agents, guardrails, routing, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="worked-example" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">A worked pattern: routing plus a tool-call guardrail</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Here is the pattern I'd actually ship, in prose first. It's the same shape LangChain describes, and
                  it's how I'd slot Jev into an{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link> loop —
                  or into an orchestration setup like the one in our{" "}
                  <Link to="/blog/hermes-claude-code-orchestration" className="text-primary hover:underline">Hermes + Claude Code</Link>{" "}
                  post, where Jev can act as the routing and guardrail decision layer in front of the agent runtimes.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Route on arrival.</strong> When a request comes in, ask Jev one Choice question: is this <em>simple</em> or <em>complex</em>? High-confidence "simple" goes to a small, cheap model. Everything else — including every mid-range confidence — goes to the big model. Bias the fallback toward the safer path.</li>
                    <li><strong>Let the planning model plan.</strong> The LLM proposes a tool call as usual — a shell command, a database write, an API call with side effects.</li>
                    <li><strong>Gate before execution.</strong> Before your executor runs the call, ask Jev a calibrated-probability question: should this be blocked? Pass it the <em>structured</em> call — tool name, arguments, the task context your own code assembled — not raw user text.</li>
                    <li><strong>Apply hard rules on top.</strong> Some actions are never allowed regardless of what any model says (deleting the repo, sending money, touching production). Those are plain <code>if</code> statements in code, checked <em>before</em> and <em>independently of</em> Jev.</li>
                    <li><strong>Escalate the middle.</strong> If the block probability lands in the mushy 0.3–0.8 band on a high-impact action, don't decide — hand it to a human, or refuse and let the agent re-plan.</li>
                    <li><strong>Log the decision and the confidence.</strong> You will want this to measure Jev's accuracy on your traffic, and to spot when the confidence distribution shifts.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  The same thing as pseudocode. <strong>This is illustrative only</strong> — it shows the shape of the
                  control flow, not real SDK calls. Check the current TypeSafe and LangChain docs for exact syntax.
                </p>
                <pre className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-xs sm:text-sm">
                  <code>{`# ILLUSTRATIVE PSEUDOCODE — not real API syntax.
# See current TypeSafe / LangChain docs for the actual calls.

decision = jev.decide(question="simple or complex?", input=request)
model = small_model if (decision.label == "simple" and decision.confidence > 0.9) else big_model

proposed_call = model.plan(request)

if violates_hard_rule(proposed_call):          # plain code, runs first, no model involved
    refuse(proposed_call)

verdict = jev.decide(question="block this call?", input=structured(proposed_call))
log(proposed_call, verdict)

if verdict.probability > 0.8:
    refuse(proposed_call)
elif verdict.probability > 0.3 and is_high_impact(proposed_call):
    escalate_to_human(proposed_call)          # the mid-range is not a decision
else:
    execute(proposed_call)`}</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Notice what Jev is and isn't doing here. It makes two cheap, fast, typed decisions per turn. It
                  is not the last line of defence, and it never sees unfiltered user text on the gate that
                  matters. That brings us to the caveat.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="security" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The security caveat: prompt injection moves Jev's verdict</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the part to read twice. Because Jev returns a structured decision rather than text, it is
                  tempting to assume it's immune to prompt injection — there's no output for an attacker to hijack.
                  That assumption is wrong. <strong>Adversarial text in the input moves the decision.</strong>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat reported</RefLink>{" "}
                  on this, and an engineer at Octomind demonstrated it concretely: a "block this command?" question
                  returned a block probability of <strong>0.76</strong>. After adding a fake{" "}
                  <code>user pre-approved</code> field to the input, the same question returned <strong>0.48</strong>{" "}
                  — below any sensible threshold. Nothing about the command changed. A string did. TypeSafe's own
                  limitations page is candid about it: adversarial content "can move the answer."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">The practical rules that fall out of that:</p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Never let unguarded untrusted input flow into a Jev decision that gates a real action.</strong> Untrusted means anything a user typed, anything scraped from the web, anything read from a file or a tool result. Structure it, strip it, or summarise it with code before it reaches the gate.</li>
                    <li>• <strong>Keep a hard rule or a human on every high-impact gate.</strong> Jev can be the fast filter that handles the 95% of obvious cases; it should not be the only thing between an injected instruction and a destructive tool call.</li>
                    <li>• <strong>Assume the confidence can be gamed too.</strong> An attacker who can lower a block probability from 0.76 to 0.48 can also push it under whatever threshold you picked. Thresholds are not security boundaries.</li>
                    <li>• <strong>Don't pass fields the model shouldn't trust.</strong> If "pre-approved" is a real concept in your system, it should be a value your code sets from an authenticated source — never something that appears inside the text Jev reads.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  None of this is unique to Jev; every model-based guardrail has the same problem. But Jev's pitch —
                  a decision layer you can trust because it's typed — makes it easier to forget. Typed is not the same
                  as trustworthy.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when-not-to-use" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When should you not use Jev?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>When you need an explanation.</strong> Jev gives you a label and a number. If a user, an auditor, or a downstream agent needs to know <em>why</em>, you need an LLM (or you need to log enough context to reconstruct the why yourself).</li>
                    <li>• <strong>When the decision is arithmetic.</strong> Counting, date comparison, "is this over budget" — Jev can't do these reliably. Compute the answer in code and, if anything, hand Jev the result as a feature.</li>
                    <li>• <strong>When the input is adversarial by design and the action is irreversible.</strong> A public-facing bot deciding whether to run a shell command on untrusted text is exactly the scenario from the section above. Use a hard allowlist, not a probability.</li>
                    <li>• <strong>When you haven't measured it on your data.</strong> The 444.6× figure measures agreement with other models, not accuracy. Until you've run Jev against a labelled sample of your own traffic, you don't know its error rate — and its confidence won't reliably tell you, especially in the 0.3–0.8 band.</li>
                    <li>• <strong>When a plain rule already works.</strong> If a regex or a lookup table decides it correctly, that is faster, cheaper, and has no calibration error at all.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tips" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Practical tips for getting Jev right</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Ask small questions.</strong> One Choice with a handful of clear labels beats one Choice with 200 fuzzy ones. Jev supports up to 255 labels; that doesn't mean you should use them.</li>
                    <li>• <strong>Design the fallback before the happy path.</strong> Decide what happens at mid-range confidence first. That single decision is most of your risk.</li>
                    <li>• <strong>Feed structure, not prose.</strong> Assemble the input from fields your code controls. The less free text Jev reads, the less an attacker can move.</li>
                    <li>• <strong>Use the free output tokens.</strong> Because output is free and input is $0.042 per million tokens, it's cheap to ask several questions per turn. Routing plus guardrail plus an urgency flag is still a rounding error.</li>
                    <li>• <strong>Start on Cloudflare if you just want to try it.</strong> <code>typesafe/jev</code> on Workers AI needs no TypeSafe key. Move to the direct API when you want the LangChain and Pydantic integrations.</li>
                    <li>• <strong>Log every decision with its confidence.</strong> Then sample and label. Within a week you'll know Jev's real accuracy on your traffic, and you'll notice drift when it happens.</li>
                    <li>• <strong>Know who built it, and what they didn't claim.</strong> TypeSafe AI was founded in 2024 in San Francisco with a $40M seed from DCVC. CEO Diogo Almeida was previously at OpenAI and Google Brain, is a co-inventor of RLHF and InstructGPT, and contributed to GPT-4. Solid pedigree; still, evaluate the model, not the résumé.</li>
                  </ul>
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
                  <li>• <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">TypeSafe AI — Introducing System One models and Jev</RefLink></li>
                  <li>• <RefLink href="https://www.langchain.com/blog/building-a-harness-with-jev">LangChain — Building a harness with Jev (TypeSafeClassifier for routing and tool-call blocking)</RefLink></li>
                  <li>• <RefLink href="https://developers.cloudflare.com/ai/models/typesafe/jev/">Cloudflare Workers AI — typesafe/jev model page</RefLink></li>
                  <li>• <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat — Companies are putting Jev in charge of AI agent decisions, and prompt injection can influence the verdict</RefLink></li>
                  <li>• <RefLink href="https://en.wikipedia.org/wiki/Jev_(AI_model)">Wikipedia — Jev (AI model)</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/how-to-use-jev" />
      <Footer />
    </div>
  );
};

export default HowToUseJevPost;
