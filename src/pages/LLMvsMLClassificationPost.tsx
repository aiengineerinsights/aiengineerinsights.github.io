import { ArrowLeft, Clock, User, Calendar, Scale, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ClassificationHeroDiagram from "@/components/ClassificationHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const threeWay = [
  {
    approach: "Traditional ML classifier",
    calibrated: "Yes — outputs P(class); calibrate with Platt scaling or isotonic regression",
    data: "Yes — labeled, in-distribution examples",
    cost: "Near-free, milliseconds, deterministic",
    accuracy: "Highest, when the data is representative",
    zeroShot: "None — a new label means relabeling and retraining",
    auditable: "Yes — features, weights, and a reliability curve you can inspect",
    bestFor: "Stable, high-volume tasks where you have labeled data",
  },
  {
    approach: "LLM as classifier",
    calibrated: "No — the 'confidence' is generated text; RLHF makes it worse, not better",
    data: "No — a prompt is enough",
    cost: "Highest — autoregressive tokens per call, seconds of latency",
    accuracy: "Often good, but non-deterministic, prompt-sensitive, and drifts across versions",
    zeroShot: "Best — plus reasoning and world knowledge about the text",
    auditable: "Partly — it can explain itself, but the explanation is not the decision",
    bestFor: "Low-volume, long-tail, or reasoning-heavy labeling with no training data",
  },
  {
    approach: "Jev (decision model)",
    calibrated: "Trained for it (RLCD); an independent test still measured ECE ≈ 0.107, weakest in the 0.3–0.8 range",
    data: "No — labels are defined at runtime",
    cost: "Low — one non-autoregressive pass; $0.042 per million input tokens, output free (TypeSafe's figures)",
    accuracy: "Below a trained in-distribution classifier",
    zeroShot: "Yes — a Choice of up to 255 labels, a Score, or a probability",
    auditable: "Typed decision plus confidence; no feature attribution",
    bestFor: "Cold-start, changing label sets, and replacing the LLM-as-classifier hack",
  },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "Can an LLM be used as a classifier?",
    a: "Yes, and for genuine zero-shot work — no training data, brand-new or long-tail labels, low volume, or tasks that need world knowledge and reasoning about the text — it is often the right call. The mistake is treating it as a drop-in replacement for a trained classifier on a stable, high-volume task: it is slower, far more expensive per call, non-deterministic, prompt-sensitive, and the confidence number it reports is not a calibrated probability.",
  },
  {
    q: "Is an LLM's confidence score a real probability?",
    a: "No. When you prompt a model to 'give a confidence from 0 to 100', the number is generated text, not a measured probability. Token log-probabilities are not class probabilities either, and RLHF post-training distorts them further: OpenAI's GPT-4 Technical Report shows the pre-trained model was well-calibrated and post-training reduced that calibration. If you need a number to threshold on, you have to measure calibration (ECE, reliability diagram) rather than trust the model's self-report.",
  },
  {
    q: "What is calibration in machine learning?",
    a: "A classifier is calibrated when its probabilities match reality: among all the cases it calls about 90% likely, roughly 90% actually belong to that class. You measure it with Expected Calibration Error (ECE) and a reliability diagram. Traditional classifiers are calibrated after training with Platt scaling or isotonic regression (scikit-learn's CalibratedClassifierCV); modern neural networks tend to be overconfident, which Guo et al. 2017 showed temperature scaling can fix.",
  },
  {
    q: "Can Jev replace traditional ML classifiers?",
    a: "Not wholesale. On a stable, high-volume, in-distribution task where you already have labeled data, a calibrated XGBoost or fine-tuned classifier still wins on cost, accuracy, reproducibility, and auditability, so there is no reason to rip out a working one. Jev genuinely wins where there is no labeled data, where the label set changes often, for long-tail categories, or when you need a good-enough calibrated decision in an afternoon instead of a labeling project. In practice it mostly replaces the LLM-as-classifier hack, not a real trained classifier.",
  },
  {
    q: "What is the difference between Jev and an LLM for classification?",
    a: "An LLM generates text autoregressively and, if asked, verbalizes a confidence that is not a calibrated probability. Jev is TypeSafe AI's 'System One' model: it returns a typed decision — a Choice of up to 255 labels, a Score, or a calibrated probability — plus a confidence, in one non-autoregressive pass, with no text. It is trained with RLCD (Reinforcement Learning for Calibrated Decisions) so the confidence is meant to track accuracy, and it keeps the zero-shot flexibility of an LLM. Independent testing still found its calibration imperfect (ECE around 0.107) and its verdict movable by prompt injection.",
  },
  {
    q: "When should I use a traditional ML classifier instead of an LLM?",
    a: "Whenever the task is stable, the volume is high, and you have (or can cheaply get) labeled in-distribution data: fraud scoring, spam, churn, routing between a fixed set of queues. A logistic regression, gradient-boosted tree, or small fine-tuned transformer will be cheaper, faster, deterministic, reproducible, and easier to audit — and after Platt or isotonic calibration it gives you a probability you can actually set a threshold on.",
  },
];

const LLMvsMLClassificationPost = () => {
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
                  <Scale className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                LLM vs Traditional ML for Classification: The Calibration Problem, and Where Jev Fits (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Classification is the most common real ML task</strong> — fraud, intent, moderation, routing.
                The question was never "which model is smartest." It's{" "}
                <strong>"which one gives me a class plus a probability I can actually trust, at the right cost?"</strong>{" "}
                In 2026 you have three options: a traditional ML classifier, an LLM used as a classifier, and a
                calibrated decision model like Jev. This post maps all three, centered on the thing that actually
                decides it — <strong>calibration</strong> — and ends with a straight answer to whether a decision model
                can replace your trained classifier.
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
                      13 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <ClassificationHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="the-real-question" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does a classifier actually need to give you?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two things, not one. The obvious output is the <strong>class</strong>: fraud or not, refund or
                  billing, safe or block. The output that actually runs the business is the{" "}
                  <strong>probability attached to it.</strong> Almost every real classification system is a threshold
                  on that number — auto-approve above 0.95, send to a human between 0.6 and 0.95, auto-decline below.
                  If the number is meaningless, the thresholds are meaningless, and the "accuracy" you measured on a
                  test set says nothing about what happens at each cut-off in production.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A probability you can trust is a <strong>calibrated</strong> one. The definition is simple: take
                  every case the model called about 90% likely to be fraud; if the model is calibrated, about 90% of
                  them really are fraud. Same at 70%, same at 30%. You measure the gap with{" "}
                  <strong>Expected Calibration Error (ECE)</strong> — bucket predictions by stated confidence, compare
                  stated confidence to observed accuracy in each bucket, take the weighted average of the gaps — and
                  you eyeball it with a <strong>reliability diagram</strong>, where a perfectly calibrated model sits on
                  the diagonal.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hold onto that definition. Everything that follows — why the LLM-as-classifier hack is a mistake, what
                  Jev is for, and when a boring gradient-boosted tree still wins — comes down to which of the three
                  approaches hands you a number that passes this test, and at what price.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="traditional-classifiers" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What do traditional ML classifiers actually give you?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Logistic regression, gradient-boosted trees (XGBoost and friends), and small fine-tuned transformers
                  all do the same thing at the output layer: they emit a <strong>class probability directly.</strong>{" "}
                  That number is a real, differentiable function of the input, learned from labeled examples, and it
                  is the same number every time you run the same input. Everything the operations side of a company
                  loves about these models follows from that:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Cheap and fast.</strong> A tree ensemble or a linear model scores a row in microseconds to milliseconds on a CPU. At millions of decisions a day, that is the difference between "free" and a line item.</li>
                    <li>• <strong>Deterministic and reproducible.</strong> Same model, same input, same output — which is what a regulator, an auditor, or a colleague debugging a complaint needs.</li>
                    <li>• <strong>Interpretable and auditable.</strong> Logistic weights and tree feature importances tell you <em>why</em>; a reliability diagram tells you <em>how much to trust it</em>.</li>
                    <li>• <strong>Calibratable.</strong> Raw scores from a boosted tree or an SVM are often not calibrated, so you fit a second-stage map on held-out data: <strong>Platt scaling</strong> (a logistic fit on the scores) or <strong>isotonic regression</strong> (a monotone, non-parametric fit). scikit-learn packages both as{" "}
                      <RefLink href="https://scikit-learn.org/stable/modules/calibration.html"><code>CalibratedClassifierCV</code></RefLink>.
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One caveat that matters for the rest of this post: <strong>neural networks are not calibrated by
                  default.</strong>{" "}
                  <RefLink href="https://arxiv.org/abs/1706.04599">Guo et al. 2017, "On Calibration of Modern Neural Networks"</RefLink>,
                  showed that as networks got deeper and more accurate they also got systematically <em>overconfident</em>,
                  and proposed temperature scaling — a single learned scalar on the logits — as a cheap fix. So even a
                  fine-tuned BERT-class classifier needs a calibration step. The point is that for this whole family,
                  calibration is a known, solved, one-line problem. You just have to remember it exists.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The cost is the labeled data. A trained classifier only knows the labels it was trained on, only
                  performs on the distribution it was trained on, and adding a category means going back to the
                  labeling queue. That single limitation is what created the demand for the next two options.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="llm-as-classifier" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why is "LLM as classifier" usually the wrong call?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Here is the pattern, and if you have shipped anything with an LLM in the last three years you have
                  either written it or reviewed it: <em>"Classify the following as A, B, or C and give a confidence
                  from 0 to 100."</em> Parse the JSON, threshold on the confidence, done. It works in the demo. It is
                  also the single most common misuse of a language model I see in production, for five reasons, and
                  the first one is the one that matters.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>The confidence is not a probability.</strong> "confidence: 0.9" is a string the model generated because your prompt asked for a number. It was not computed from anything. It is text.</li>
                    <li><strong>Cost and latency.</strong> Every decision is an autoregressive generation — hundreds of milliseconds to seconds, and paid per token — against a classifier that is effectively free and instant. At scale, this is the difference between a rounding error and a budget line.</li>
                    <li><strong>Non-deterministic, prompt-sensitive, and drifting.</strong> Rephrase the instruction, reorder the labels, or wait for the provider's next model version and the decisions move. There is no fixed artifact to version.</li>
                    <li><strong>No real decision threshold or reliability curve.</strong> Because the number is not calibrated, the threshold you set is a guess, and you cannot draw the diagram that would tell you how wrong it is.</li>
                    <li><strong>Inconsistent label adherence.</strong> Models invent labels, merge two, or answer in prose. You end up writing a parser and a retry loop around a classifier.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Reason one deserves the detail, because people push back on it: "surely the model has <em>some</em>{" "}
                  internal probability." It does — token log-probabilities — but those are probabilities over the{" "}
                  <em>next token</em>, not over your classes, and post-training distorts them. OpenAI's own{" "}
                  <RefLink href="https://arxiv.org/abs/2303.08774">GPT-4 Technical Report</RefLink> is unusually candid
                  here: the pre-trained base model was well-calibrated on its evaluations, and{" "}
                  <strong>RLHF post-training reduced that calibration.</strong> The alignment process that makes a
                  model pleasant to talk to also makes it more confidently wrong.{" "}
                  <RefLink href="https://arxiv.org/abs/2305.14975">Tian et al. 2023, "Just Ask for Calibration"</RefLink>,
                  studied exactly the verbalized-confidence trick on RLHF models and found that the stated numbers need
                  deliberate prompting strategies just to reduce their error — out of the box, they skew overconfident.
                  So the "0.9" you are thresholding on carries the fingerprint of a training process that was
                  optimizing for helpfulness, not for honesty about uncertainty.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Now the fair part.</strong> There is a real niche where an LLM is the <em>right</em>{" "}
                  classifier, and it is bigger than the purists admit:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Genuine zero-shot with no training data.</strong> You have a label set and zero examples, and you need something today.</li>
                    <li>• <strong>Brand-new or long-tail labels.</strong> Categories that change weekly, or that appear a handful of times a month, will never accumulate enough examples to train on.</li>
                    <li>• <strong>Tasks that need world knowledge or reasoning about the text.</strong> "Is this support ticket describing a bug that a recent regulation would make reportable?" is not a bag-of-features problem.</li>
                    <li>• <strong>Low volume.</strong> If you make a few hundred decisions a day, cost and latency are irrelevant and the flexibility is worth it.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In those cases, use the LLM — but use it for the <em>label</em>, and treat its confidence as a
                  hint, not a probability. If you need a threshold you can defend, measure calibration yourself on a
                  labeled sample, or reach for a model that was trained to give you one. That is the gap the third
                  option is aimed at.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Classifiers, calibration, agents, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="where-jev-fits" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Where does Jev fit — the zero-shot calibrated middle?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">Jev</RefLink> is
                  TypeSafe AI's "System One" model, and the cleanest way to describe it is as a direct answer to the
                  section above. Instead of generating text, it returns a <strong>typed decision</strong> — a{" "}
                  <strong>Choice</strong> among up to 255 labels, a <strong>Score</strong>, or a calibrated
                  probability — <strong>plus a confidence, in one non-autoregressive pass.</strong> No prose, no
                  JSON to parse, no "give me a number from 0 to 100." (We have a fuller explainer on{" "}
                  <Link to="/blog/what-is-jev" className="text-primary hover:underline">what Jev is</Link> and a
                  head-to-head on{" "}
                  <Link to="/blog/jev-vs-llm" className="text-primary hover:underline">Jev vs LLMs</Link>; this
                  section is about where it sits relative to a trained classifier.)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The part that matters for this post is <em>how</em> it was trained. Jev uses{" "}
                  <strong>RLCD — Reinforcement Learning for Calibrated Decisions</strong> — a post-training process
                  built specifically so that the confidence it emits tracks how often it is actually right. That is
                  the exact property RLHF erodes in a chat model. The stated goal is to close the LLM calibration gap
                  while keeping the thing a trained classifier lacks: <strong>zero-shot flexibility.</strong> You
                  define the labels at request time, with no training data, and change them next week without a
                  retraining cycle. It is also priced like infrastructure rather than like a chat model —{" "}
                  <strong>$0.042 per million input tokens, output free, 32k context</strong> — which, with the
                  single-pass design, is why TypeSafe positions it as the cheap, fast option. (Those speed and cost
                  figures are TypeSafe's own claims; treat them as vendor numbers.)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That is what makes it "more advanced" than the LLM hack, and the difference is structural rather
                  than a matter of degree. The LLM produces a confidence because you asked; Jev produces one because
                  that is the only thing it is built to produce, and it was optimized for that number to mean
                  something. Behind it is a team with the pedigree to attempt that: TypeSafe AI was founded in 2024 in
                  San Francisco with a $40M seed from DCVC, and its CEO, Diogo Almeida, is ex-OpenAI and Google Brain,
                  a co-inventor of RLHF and InstructGPT, and a contributor to GPT-4 — which is to say, someone who
                  knows precisely how RLHF breaks calibration, building the corrective.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base"><strong>The honest limits</strong>, from independent testing rather than the launch post:</p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>It is calibrated, not perfectly calibrated.</strong> An independent study measured an ECE of roughly 0.107 — about 4.4× a well-calibrated baseline — with confidence noticeably shakier in the 0.3–0.8 mid-range, which is exactly the range where your "send to a human" band usually lives.</li>
                    <li>• <strong>Trained in-distribution classifiers still beat it on raw accuracy.</strong> Zero-shot has a ceiling; a model that has seen ten thousand of your labeled examples knows things about your data that no runtime label description can convey.</li>
                    <li>• <strong>Prompt injection can move the verdict.</strong>{" "}
                      <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat</RefLink>{" "}
                      covered an Octomind demo in which a block probability of 0.76 fell to 0.48 after a fake "user pre-approved" field was inserted into the input. A calibrated number is only as trustworthy as the input it was computed on — and if that input includes attacker-controlled text, it is not fully trustworthy.
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  None of that disqualifies it. An ECE of 0.107 with an actual reliability curve you can measure is a
                  different universe from a verbalized "0.9" with no curve at all. But it does set up the real
                  question. For the mechanics of calling it, see{" "}
                  <Link to="/blog/how-to-use-jev" className="text-primary hover:underline">how to use Jev</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="can-it-replace" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Can Jev or a decision model replace traditional classifiers?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>No, not wholesale — and yes, in a specific and valuable set of cases.</strong> Both halves
                  matter, so here they are separately.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>No, for the workhorse case.</strong> If you have a stable, high-volume, in-distribution
                  task and you already hold labeled data — fraud scoring on your own transaction history, spam on your
                  own mail, routing between a fixed set of queues — a calibrated XGBoost or a fine-tuned small
                  transformer still wins on every axis an operations team cares about: cost per decision, raw accuracy,
                  reproducibility, and auditability. It is deterministic, its calibration is a solved one-liner, it has
                  no prompt-injection surface because it has no prompt, and it is nearly free to run. Do not rip out a
                  working classifier to put a zero-shot model in its place; you would be paying more to be less
                  accurate and less explainable.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Yes, where it genuinely wins.</strong> The trained classifier's superpower is also its
                  precondition: it needs the labeled data. Wherever that precondition fails, a decision model is not
                  just competitive but the obviously better tool:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Cold start.</strong> New product, new market, new policy — no labels yet, and the decision has to ship anyway.</li>
                    <li>• <strong>Fast-changing label sets.</strong> Moderation taxonomies, incident categories, campaign-specific intents. Retraining every time the list changes is a treadmill.</li>
                    <li>• <strong>True zero-shot and long-tail categories.</strong> Labels that will never see enough examples to train on.</li>
                    <li>• <strong>"Good enough, calibrated, this afternoon."</strong> When a measurable, thresholdable probability by end of day beats a better one after a six-week labeling project.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Put those together and the net effect is clear: <strong>a decision model mostly replaces the
                  LLM-as-classifier hack, not a real trained classifier.</strong> Everywhere a team today is prompting
                  a chat model for "a confidence from 0 to 100" and thresholding on it, a model built to emit a
                  calibrated decision is a strict upgrade — cheaper, faster, typed, and with a number that at least
                  attempts to mean something. Everywhere a team has a calibrated tree ensemble humming along on
                  in-distribution data, nothing has changed. It is the same "not competitors, different jobs" framing
                  we used for{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs fine-tuning</Link>:
                  the tool that needs no training data and the tool that exploits it are answering different
                  questions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The one place the "no" softens: a decision model can be the <em>bridge</em> to a trained
                  classifier. Ship Jev zero-shot on day one, log every decision alongside the eventual ground truth,
                  and in three months you have the labeled dataset that lets a cheap in-distribution model take over
                  the high-volume core — while the zero-shot model keeps handling the long tail. That is how the two
                  coexist rather than compete.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="comparison" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Traditional ML vs LLM vs Jev: the three-way comparison</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The whole argument in one table. Read the first column first — it is the one that decides most
                  real deployments.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Approach</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Calibrated probability?</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Needs training data?</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Cost &amp; latency</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">In-distribution accuracy</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Zero-shot flexibility</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Interpretable / auditable?</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {threeWay.map((r) => (
                            <TableRow key={r.approach}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">{r.approach}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.calibrated}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.data}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.cost}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.accuracy}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.zeroShot}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.auditable}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.bestFor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Notice the shape of the middle row. The LLM is the best at exactly one thing — zero-shot flexibility
                  with reasoning — and the worst at nearly everything else, which is why it belongs in a niche rather
                  than in the default slot. The bottom row keeps most of that flexibility and fixes the cost, the
                  typing, and (imperfectly) the calibration; what it gives up is the reasoning and world knowledge of
                  a full language model, and the raw accuracy of a model trained on your data.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-choose" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do you choose between them?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Ask the questions in this order and stop at the first one that answers "yes."
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Do you have labeled, in-distribution data and a stable label set?</strong> Train a classical model, calibrate it with Platt or isotonic, plot the reliability diagram, and ship. This is the default, and it is the default for a reason.</li>
                    <li><strong>Does the decision need reasoning or world knowledge about the text, at low volume?</strong> Use an LLM for the label. Do not threshold on its confidence; either measure calibration on a labeled sample or route uncertain cases to a person.</li>
                    <li><strong>Do you need a typed, thresholdable decision now, with no labels or a label set that keeps moving?</strong> Use a decision model like Jev. Verify its calibration on your own data — an ECE of about 0.107 in one independent test is not the same as zero — and keep attacker-controlled text out of the input, or at least out of the fields the decision hinges on.</li>
                    <li><strong>Is it a mix?</strong> Then it is a pipeline: a decision model for the cold start and the long tail, logging into the dataset that trains the classical model for the high-volume core. If the decisions gate actions inside an{" "}
                      <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link>, that calibrated number is also what tells the agent when to ask before acting.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tips" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Practical tips before you ship any of them</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Plot the reliability diagram, whatever the model.</strong> It takes a few hundred labeled examples and ten lines of code, and it is the only way to know whether the threshold you picked means what you think it means. If you cannot plot it, you do not have a probability; you have a number.</li>
                    <li>• <strong>Never threshold on verbalized LLM confidence.</strong> Use the label and route on something you have measured. If a colleague insists the model's "0.9" is meaningful, hand them the GPT-4 report's calibration section.</li>
                    <li>• <strong>Calibrate on held-out data, not training data.</strong> Platt and isotonic fits on the training set just re-learn the training set's overconfidence. <code>CalibratedClassifierCV</code> handles the cross-validation for you.</li>
                    <li>• <strong>Treat vendor speed and cost numbers as claims to verify.</strong> TypeSafe's $0.042 per million input tokens and single-pass latency are its own figures; benchmark them on your traffic before they go into a cost model.</li>
                    <li>• <strong>Assume the mid-range is the weak spot.</strong> Whether it is an LLM or a decision model, calibration tends to be worst between roughly 0.3 and 0.8 — exactly where "escalate to a human" bands live. Widen the band or add a second signal there.</li>
                    <li>• <strong>Log every zero-shot decision with its eventual outcome.</strong> That log is the labeled dataset that lets you graduate to a cheap trained classifier later. The zero-shot phase should be building toward its own replacement.</li>
                    <li>• <strong>Keep untrusted text out of the decision input.</strong> A 0.76 that becomes 0.48 after one injected field is the demonstration; the fix is structural — separate the fields the decision hinges on from anything a user or attacker can write.</li>
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
                  <li>• <RefLink href="https://arxiv.org/abs/1706.04599">Guo et al. 2017 — On Calibration of Modern Neural Networks (temperature scaling)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2303.08774">OpenAI — GPT-4 Technical Report (RLHF post-training reduced calibration)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2305.14975">Tian et al. 2023 — Just Ask for Calibration (verbalized confidence from RLHF models)</RefLink></li>
                  <li>• <RefLink href="https://scikit-learn.org/stable/modules/calibration.html">scikit-learn — Probability calibration (Platt scaling, isotonic regression, CalibratedClassifierCV)</RefLink></li>
                  <li>• <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">TypeSafe AI — Introducing System One models and Jev</RefLink></li>
                  <li>• <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat — Companies are putting Jev in charge of AI agent decisions, and prompt injection can influence the verdict</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/llm-vs-traditional-ml-classification" />
      <Footer />
    </div>
  );
};

export default LLMvsMLClassificationPost;
