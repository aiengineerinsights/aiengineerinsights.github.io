import { ArrowLeft, Clock, User, Calendar, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import WhatIsJevHeroDiagram from "@/components/WhatIsJevHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const vsLlm = [
  { aspect: "What it returns", jev: "A typed decision — a Choice (one of up to 255 labels), a Score (a number), or a calibrated probability", llm: "Free-form text (which you then parse into a decision)" },
  { aspect: "How it generates", jev: "Non-autoregressive: every output in one parallel forward pass", llm: "Autoregressive: one token at a time, each conditioned on the last" },
  { aspect: "Confidence", jev: "Built in — trained (RLCD) so the score tracks real accuracy", llm: "Not calibrated by default; a self-reported '90% sure' is just more text" },
  { aspect: "Output shape", jev: "Always valid — cannot return malformed JSON or a label off the list", llm: "Can drift, wrap in prose, or break your schema; needs validation and retries" },
  { aspect: "Explanations", jev: "None — a value and a number, no reasoning", llm: "Can explain, reason step by step, and cite" },
  { aspect: "Latency / cost", jev: "TypeSafe claims ~70–500 ms and 40–400× cheaper on its own workflows; output tokens are free", llm: "Seconds for long outputs; billed on input and output tokens" },
  { aspect: "Best for", jev: "Classification, routing, scoring, moderation, guardrails, real-time loops", llm: "Writing, summarizing, multi-step reasoning, open-ended questions" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is Jev in simple terms?",
    a: "Jev is an AI model from TypeSafe AI that answers with a decision instead of a paragraph. You give it an input and a set of possible answers (labels, a numeric range, or a yes/no question), and it returns one typed value plus a confidence score — for example {label: 'fraud', confidence: 0.87} — in a single pass. TypeSafe calls this category a 'System One' model, after the fast, intuitive mode of thinking, as opposed to the slow, deliberate 'System Two' style of a chat LLM.",
  },
  {
    q: "Is Jev an LLM?",
    a: "Not in the usual sense. A large language model generates text autoregressively, one token at a time. Jev is non-autoregressive: it produces all of its outputs in one parallel forward pass and never emits free text. It is built to be consumed by software directly, not read by a person. Think of it as a decision model that sits next to your LLM, not a replacement for it.",
  },
  {
    q: "Can Jev hallucinate?",
    a: "It cannot hallucinate the shape of an answer — you will never get malformed JSON, a label that wasn't on your list, or a string where you asked for a number. But it absolutely can return the wrong value inside a valid type: a legitimate transaction labeled 'fraud', or a confident score on a question it cannot actually answer. 'Cannot hallucinate' means structurally safe, not never wrong.",
  },
  {
    q: "How much does Jev cost?",
    a: "As of September 2026, TypeSafe charges $0.042 per million input tokens, output is free, and the context window is 32,000 tokens. Early access opened on September 15, 2026 behind a waitlist, which was dropped around September 21, so API keys are now open. It is also available through Cloudflare Workers AI (model id typesafe/jev), OpenRouter, and Composio.",
  },
  {
    q: "What is RLCD and how is Jev trained?",
    a: "RLCD stands for Reinforcement Learning for Calibrated Decisions. Where RLHF rewards a model for outputs that human raters approve of, RLCD rewards the model for being right and for reporting a confidence that matches how often it is right — a '90% confidence' answer should be correct about 90% of the time. TypeSafe says Jev is trained this way on synthetic data. Independent testing shows the calibration is real but imperfect, especially in the 0.3–0.8 mid-range.",
  },
  {
    q: "Who built Jev?",
    a: "TypeSafe AI, a San Francisco company founded in 2024. It came out of stealth in September 2026 with a $40M seed round led by DCVC. The CEO is Diogo Almeida, a former OpenAI and Google Brain researcher who was a co-inventor of RLHF and InstructGPT and a contributor to GPT-4. His co-founders are Erik Gafni and Sasha Sheng.",
  },
];

const WhatIsJevPost = () => {
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
                  <Target className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                What Is Jev? TypeSafe's System One Decision Model, Explained (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Jev is TypeSafe AI's "System One" model:</strong> instead of writing text, it returns a{" "}
                <strong>typed, calibrated decision</strong> — a value plus a confidence score, such as{" "}
                <code>{"{label: \"fraud\", confidence: 0.87}"}</code> — in a single non-autoregressive pass. It is built
                for software to consume directly, not for a person to read. Here's what Jev is, how "System One" differs
                from a normal LLM, how it's trained, who's behind it, what it costs, where it fits — and the limitations
                you need to know before you let it gate anything real.
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
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <WhatIsJevHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-jev" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is Jev?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Jev is a model from{" "}
                  <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">TypeSafe AI</RefLink>{" "}
                  that returns <strong>structured decisions with a calibrated confidence score, not text.</strong> You
                  hand it an input and the shape of the answer you want; it hands back one value in that shape and a
                  number saying how sure it is. There is no prose to parse, no JSON to validate, no "here's my
                  analysis" preamble to strip out.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Three output types cover most of what you'd ask a classifier to do:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Choice.</strong> Pick exactly one of up to 255 labels you define — <code>fraud</code> / <code>legit</code> / <code>review</code>, a routing target, a moderation category.</li>
                    <li>• <strong>Score.</strong> A number — a severity rating, a relevance score, a priority.</li>
                    <li>• <strong>Probability.</strong> A calibrated likelihood for a yes/no question — "should this tool call be blocked?"</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The mechanical difference from a chat model is that Jev is <strong>non-autoregressive</strong>. An
                  LLM predicts one token, feeds it back in, predicts the next, and so on until it decides to stop. Jev
                  produces all of its outputs in <strong>one parallel forward pass</strong> — which is why it can be
                  fast and cheap, and also why it can't ramble, explain, or drift out of your schema. Its whole job is to
                  emit a decision that a program can act on immediately.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="system-one" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does "System One" mean — decisions vs text?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  TypeSafe borrows the framing from the two-modes-of-thinking idea: <strong>System One</strong> is
                  fast, intuitive, and pattern-matched — you glance at a transaction and something feels off;{" "}
                  <strong>System Two</strong> is slow, deliberate, and verbal — you write out the reasoning. Chat LLMs
                  are System Two machines: they think in language, and language is generated a token at a time. A
                  "System One model," in TypeSafe's terminology, is a model that skips the language step and goes
                  straight to the judgment.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That matters because a huge share of what LLMs are actually deployed for in production is not writing
                  — it's <em>deciding</em>. Is this ticket urgent? Which agent should handle this request? Is this
                  output safe to send? Does this tool call look dangerous? Teams have been answering those with a
                  full LLM, a "respond only with JSON" prompt, a parser, and a retry loop. Jev's pitch is that a
                  decision should come back as a decision. For a deeper side-by-side, see our{" "}
                  <Link to="/blog/jev-vs-llm" className="text-primary hover:underline">Jev vs LLMs</Link> comparison;
                  the short version is in the table below.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Aspect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Jev (System One)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Normal LLM (System Two)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vsLlm.map((r) => (
                            <TableRow key={r.aspect}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.aspect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.jev}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.llm}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two rows deserve emphasis. <strong>"Explanations: none"</strong> is a feature and a cost at once — you
                  get a number, not a reason, so if a human needs to understand <em>why</em>, Jev alone won't do it.
                  And the latency/cost row is TypeSafe's own claim on workflows TypeSafe chose; we come back to that
                  below.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-it-works" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How does Jev work? RLCD and calibrated confidence</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The part of Jev that is genuinely new is not "a classifier" — small classifiers have existed
                  forever. It's the training objective. TypeSafe trains Jev with{" "}
                  <strong>RLCD — Reinforcement Learning for Calibrated Decisions</strong> — on synthetic data. Where
                  RLHF (which the same CEO helped invent) rewards a model for outputs that human raters approve of,
                  RLCD rewards two things: <strong>being right</strong>, and <strong>reporting a confidence that matches
                  how often it is right.</strong> A decision Jev tags with 0.90 confidence should be correct about 90% of
                  the time across many such decisions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That is what "calibrated" means, and it's the property that makes the confidence score usable as a
                  control signal rather than decoration. If calibration holds, you can write real thresholds:
                  auto-approve above 0.95, auto-reject below 0.05, send the middle to a human or to a bigger model. An
                  LLM that says "I'm 90% sure" in its text has no such guarantee — that sentence is just more generated
                  tokens.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice the developer experience is: define the decision (labels, a score range, or a
                  probability question), send the input, get back the typed value and the confidence. A{" "}
                  <code>TYPESAFE_API_KEY</code> is all the API needs. Typed outputs map cleanly onto{" "}
                  <strong>Pydantic</strong> models, there's a <code>TypeSafeClassifier</code> integration for{" "}
                  <RefLink href="https://www.langchain.com/blog/building-a-harness-with-jev">LangChain</RefLink>, and
                  Jev is available on{" "}
                  <RefLink href="https://developers.cloudflare.com/ai/models/typesafe/jev/">Cloudflare Workers AI</RefLink>{" "}
                  (model id <code>typesafe/jev</code>), OpenRouter, and Composio. Our{" "}
                  <Link to="/blog/how-to-use-jev" className="text-primary hover:underline">how to use Jev</Link> guide
                  walks through the actual calls.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="New models, agents, RAG, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="who-built-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Who built Jev? TypeSafe AI, Diogo Almeida, and the $40M seed</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Jev comes from <strong>TypeSafe AI</strong>, a San Francisco company founded in 2024 that came out of
                  stealth in September 2026 with a <strong>$40M seed round led by DCVC</strong>. The CEO is{" "}
                  <RefLink href="https://ai.engineer/speakers/diogo-almeida">Diogo Almeida</RefLink>, a former OpenAI
                  and Google Brain researcher who was a co-inventor of RLHF and InstructGPT — the techniques behind
                  ChatGPT — and a contributor to GPT-4. His co-founders are Erik Gafni and Sasha Sheng.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The pedigree is relevant to the technical claim, not just the fundraising. RLHF is the reason chat
                  models became pleasant to talk to; RLCD is the same lineage of reinforcement-learning post-training
                  pointed at a different target — accuracy and honest confidence instead of human approval. Whether
                  that target is fully met is an empirical question (see the limitations section), but the people
                  asking it have done this kind of work before.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="cost-access" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How much does Jev cost, and how do you get access?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Pricing as of September 2026:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Input:</strong> $0.042 per million tokens.</li>
                    <li>• <strong>Output:</strong> free — there are no output tokens to bill, since the answer is a value and a number, not text.</li>
                    <li>• <strong>Context window:</strong> 32,000 tokens.</li>
                    <li>• <strong>Availability:</strong> early access opened September 15, 2026 behind a waitlist; around September 21 the waitlist was dropped and API keys are open. Also on Cloudflare Workers AI, OpenRouter, and Composio.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On speed and cost relative to LLMs, be careful with the headline numbers.{" "}
                  <strong>TypeSafe claims</strong> Jev is up to ~193.6× faster and ~444.6× cheaper at peak, with a more
                  typical range of 40–200× faster and 40–400× cheaper, and ~70–500 ms latency — all measured on
                  workflows TypeSafe selected. There's also a methodological catch that independent reviewers have
                  flagged: the 444.6× figure uses the <em>average of two other models' answers</em> (GPT-6 Astra and
                  Claude Fable 5.1) as the reference. That measures agreement with other models, not accuracy against
                  ground truth. Treat the multipliers as vendor marketing until you've benchmarked your own task.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What you <em>can</em> take at face value is the pricing structure: a fraction of a cent per thousand
                  input tokens and nothing for output makes Jev cheap enough to run inside a loop — which is exactly the
                  kind of use case it's aimed at.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="use-cases" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is Jev used for?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Real-time control loops.</strong> TypeSafe's demos include game bots (Minecraft, Subway Surfers) and drone/robot simulations where a decision is needed many times a second. TypeSafe's own cost figures: about $0.01 for a 2-minute Minecraft session and about $0.10 for a 15-minute drone sim.</li>
                    <li>• <strong>Agent routing.</strong> Classify an incoming request by complexity and send easy ones to a small model and hard ones to a big one — the first step in most <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">agent</Link> architectures, and the one that shouldn't itself cost a full LLM call.</li>
                    <li>• <strong>Tool-call guardrails.</strong> Before an agent executes a tool call, ask Jev for a "should this be blocked?" probability and gate on it. (Read the limitations section before you do this with untrusted input.)</li>
                    <li>• <strong>Content moderation and classification.</strong> The classic bread-and-butter: category labels, severity scores, spam/not-spam, with a confidence you can threshold on.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The common thread: the answer is a value, the volume is high, and latency matters. If you were
                  previously weighing whether to fine-tune a small classifier or prompt a big model for one of these —
                  the trade-off we cover in{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs fine-tuning</Link>{" "}
                  — Jev is a third option worth putting on the bench.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="limitations" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What are Jev's limitations?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the section the launch coverage mostly skipped, and it's the one that decides whether Jev
                  belongs in your stack. Four things to internalize:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>"Cannot hallucinate" is about shape, not truth.</strong> Jev will never return malformed JSON, a label that isn't on your list, or a string where you asked for a number. It can and does return the <em>wrong</em> value inside a valid type. Never read the marketing line as "never wrong."</li>
                    <li>• <strong>Calibration is real but imperfect.</strong> An independent study measured an expected calibration error (ECE) of about 0.107 — roughly 4.4× that of a well-calibrated baseline. The confidence is reliable at the extremes (near 0 or near 1) and shaky in the 0.3–0.8 mid-range. Worst case: on unanswerable questions it was right 44.7% of the time while reporting an average confidence of 0.74. Threshold aggressively at the ends; do not trust a 0.6 as meaning much.</li>
                    <li>• <strong>No reasoning, and weak on some basics.</strong> Jev gives no explanation for any decision, and it cannot reliably count or compare dates. If the decision hinges on arithmetic, ordering, or an audit trail, use a System Two model (or plain code) for that part.</li>
                    <li>• <strong>Prompt injection works.</strong> <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat</RefLink> reported, and an Octomind demo showed, that a "should this be blocked?" probability of 0.76 fell to 0.48 after a fake "user pre-approved" field was added to the input. If Jev's decision gates a real action, do not feed it unguarded untrusted content — sanitize the input, or don't let attacker-controlled text reach the field the decision is made on.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  None of this makes Jev useless. It makes it a <strong>fast, cheap, structurally safe decision layer
                  with a confidence score you should trust at the edges and verify in the middle</strong> — which is a
                  precise and useful thing to be, as long as you build around it rather than assume it's an oracle.
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
                  <li>• <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">TypeSafe AI — Introducing System One models and Jev</RefLink></li>
                  <li>• <RefLink href="https://en.wikipedia.org/wiki/Jev_(AI_model)">Wikipedia — Jev (AI model)</RefLink></li>
                  <li>• <RefLink href="https://www.langchain.com/blog/building-a-harness-with-jev">LangChain — Building a harness with Jev</RefLink></li>
                  <li>• <RefLink href="https://developers.cloudflare.com/ai/models/typesafe/jev/">Cloudflare Workers AI — typesafe/jev model page</RefLink></li>
                  <li>• <RefLink href="https://ai.engineer/speakers/diogo-almeida">AI Engineer — Diogo Almeida speaker profile</RefLink></li>
                  <li>• <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat — Companies are putting Jev in charge of AI agent decisions, and prompt injection can influence the verdict</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/what-is-jev" />
      <Footer />
    </div>
  );
};

export default WhatIsJevPost;
