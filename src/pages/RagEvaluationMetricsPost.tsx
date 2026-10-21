import { ArrowLeft, Clock, User, Calendar, Gauge, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import RagEvalHeroDiagram from "@/components/RagEvalHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const ragasMetrics = [
  { metric: "Faithfulness", side: "Generation", question: "Is every claim in the answer supported by the retrieved context?", groundTruth: "No" },
  { metric: "Answer Relevancy", side: "Generation", question: "Does the answer actually address the question asked?", groundTruth: "No" },
  { metric: "Context Precision", side: "Retrieval", question: "Are the retrieved chunks relevant, and are relevant ones ranked first?", groundTruth: "No" },
  { metric: "Context Recall", side: "Retrieval", question: "Did retrieval pull back everything needed to answer?", groundTruth: "Yes" },
];

const frameworkCompare = [
  { aspect: "Core idea", ragas: "Batch metrics library for RAG pipelines", trulens: "Live tracing + RAG-triad feedback functions", deepeval: "Pytest-style assertions for CI" },
  { aspect: "Ground truth needed", ragas: "Only for context recall", trulens: "No (reference-free triad)", deepeval: "Optional, both modes supported" },
  { aspect: "Best fit", ragas: "Offline benchmarking, comparing configs", trulens: "Production monitoring on live traffic", deepeval: "Gating merges / regression tests in CI" },
  { aspect: "Output", ragas: "Aggregate scores over a dataset", trulens: "Per-call scores attached to traces", deepeval: "Pass/fail per test case" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is RAG evaluation?",
    a: "RAG evaluation is measuring whether a retrieval-augmented generation pipeline retrieves the right context and generates an answer that's grounded in it. It splits into two failure edges: retrieval quality (did we find the right chunks?) and generation faithfulness (did the model use them correctly, without inventing anything?). Standard frameworks like RAGAS and TruLens score both with an LLM-as-judge.",
  },
  {
    q: "What is the RAG triad?",
    a: "The RAG triad, coined by TruEra/TruLens, is three evaluations that together catch hallucination: context relevance (are retrieved chunks relevant to the query?), groundedness (is the answer supported by the retrieved context?), and answer relevance (does the answer address the question?). Passing all three gives confidence the app is hallucination-free up to the limits of its knowledge base.",
  },
  {
    q: "What is faithfulness in RAG evaluation?",
    a: "Faithfulness measures what fraction of an answer's claims are actually supported by the retrieved context. RAGAS computes it by decomposing the answer into atomic statements with an LLM, checking each against the context, and scoring supported/total. A score below roughly 0.7–0.8 is commonly used as a threshold that flags meaningful hallucination worth investigating.",
  },
  {
    q: "RAGAS vs TruLens vs DeepEval — which should I use?",
    a: "They fit different stages. RAGAS is the fastest path to scored, standardized RAG metrics for offline comparison of pipeline configurations. TruLens adds OpenTelemetry-based tracing so you can watch faithfulness and relevance drift on live production traffic, not just an eval set. DeepEval is built pytest-style, so RAG quality becomes a CI gate that can block a merge. Many teams run more than one: RAGAS or TruLens in development, DeepEval in CI, TruLens (or Arize Phoenix) in production.",
  },
  {
    q: "Does a high faithfulness score mean the RAG system is correct?",
    a: "No. Faithfulness only checks that the answer's claims trace back to the retrieved context — it can't tell you if that context was itself wrong or stale. A RAG system can score 0.95 on faithfulness and still give a confidently wrong business answer if the underlying documents were outdated or incorrect. RAG evaluation frameworks operate at the inference layer; they don't substitute for keeping the knowledge base accurate.",
  },
  {
    q: "Do I need labeled ground truth to evaluate a RAG pipeline?",
    a: "Not for the core generation-side metrics. Faithfulness and answer relevancy are reference-free — they only need the question, retrieved context, and generated answer. Context recall is the exception: it requires a ground-truth answer to check whether retrieval pulled back everything necessary, so it's typically added once you have a labeled eval set.",
  },
  {
    q: "What is answer correctness, and how is it different from faithfulness?",
    a: "Faithfulness checks whether the answer is consistent with the retrieved context — internal consistency, not truth. Answer correctness checks the answer against a human-written reference answer, combining a factual F1 score over claims with semantic similarity between the two texts. A response can score high on faithfulness and still be wrong if the retrieved chunk itself was outdated or incorrect; answer correctness is the metric that catches that faithful-but-wrong case, at the cost of needing a labeled gold set.",
  },
  {
    q: "Should I use Arize Phoenix instead of RAGAS?",
    a: "They solve different problems, not competing ones. RAGAS is an offline metrics library for scoring a pipeline against a fixed eval set during development. Arize Phoenix is a production observability platform: it traces every span (embedding, retrieval, reranking, generation) on OpenTelemetry and runs LLM-as-judge evaluators against live traffic after the fact, so you can localize a bad answer to the exact step that caused it. Most production RAG stacks run both — RAGAS or TruLens in development, Phoenix (or TruLens) watching sampled production traffic for drift.",
  },
];

const RagEvaluationMetricsPost = () => {
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
                  <Gauge className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">RAG & Retrieval</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                RAG Evaluation Metrics: Faithfulness, Context Precision/Recall, and How to Actually Measure a RAG Pipeline
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>RAG evaluation splits into two failure edges: retrieval and generation.</strong> Retrieval
                metrics — context precision and context recall — check whether the right chunks were found. Generation
                metrics — faithfulness and answer relevancy — check whether the model's answer is grounded in what was
                retrieved and actually addresses the question. Frameworks like RAGAS, TruLens, and DeepEval all score
                some version of these four signals with an LLM-as-judge. Here's what each metric means, how it's
                computed, which framework fits which stage, and the pitfalls that make eval scores lie to you.
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
                      Sep 21, 2026 · Updated Oct 15, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <RagEvalHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What are RAG evaluation metrics?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG pipeline</Link>{" "}
                  has two places it can fail: the <strong>retriever</strong> can pull back the wrong chunks (or miss
                  the right ones), and the <strong>generator</strong> can drift off-topic or invent facts that sound
                  plausible but aren't in the context it was given. RAG evaluation metrics exist to measure each edge
                  separately, because "the final answer looked reasonable" doesn't tell you which part of the pipeline
                  to fix when it doesn't.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most frameworks converge on the same four signals — two for retrieval, two for generation — computed
                  by an <strong>LLM-as-judge</strong> over a question / context / answer triple, usually without
                  needing a human-written reference answer for at least the generation-side metrics (
                  <RefLink href="https://ai-tldr.dev/learn/rag/rag-evaluation/rag-evaluation-metrics/">RAGAS docs summary</RefLink>
                  ; <RefLink href="https://www.trulens.org/getting_started/core_concepts/rag_triad">TruLens RAG triad</RefLink>).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="rag-triad" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The RAG triad: context relevance, groundedness, answer relevance</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  TruEra (now folded into TruLens) coined the <strong>RAG triad</strong> as a compact way to reason
                  about hallucination: <strong>context relevance</strong> (is each retrieved chunk relevant to the
                  query?), <strong>groundedness</strong> (is the answer's content actually supported by that context?),
                  and <strong>answer relevance</strong> (does the final answer address what was asked?). If all three
                  score well, the app is hallucination-free up to the limits of its own knowledge base — it can still
                  be wrong if the knowledge base itself is wrong (
                  <RefLink href="https://truera.com/ai-quality-education/generative-ai-rags/what-is-the-rag-triad">TruEra — What is the RAG Triad</RefLink>
                  ; <RefLink href="https://www.trulens.org/getting_started/core_concepts/rag_triad">TruLens docs</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the same idea RAGAS implements under different names — groundedness ≈ faithfulness, context
                  relevance ≈ context precision — which is why the two frameworks' scores are directly comparable even
                  though the terminology doesn't match exactly.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="ragas-metrics" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The four core RAGAS metrics</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://deepwiki.com/vibrantlabsai/ragas/4.2-rag-evaluation-metrics">RAGAS</RefLink> is
                  the most widely cited reference implementation of RAG metrics. Its four load-bearing scores split
                  cleanly along the retrieval/generation line:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Metric</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Side</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Question it answers</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Needs ground truth?</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ragasMetrics.map((r) => (
                            <TableRow key={r.metric}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.metric}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.side}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.question}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.groundTruth}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Faithfulness</strong> is computed by decomposing the answer into atomic claims with an LLM,
                  checking each against the retrieved context, and scoring supported claims over total claims — one of
                  two unsupported claims gives 0.5, not zero, which is why claim-level decomposition catches partial
                  hallucination that a holistic "is this grounded, yes/no" judgment tends to round up and miss (
                  <RefLink href="https://teachyou.ai/blog/ragas-metrics-explained">RAGAS metrics explained</RefLink>
                  ; <RefLink href="https://arjunjaggi.com/blog/rag-evaluation">RAG evaluation deep dive</RefLink>).
                  A score below roughly 0.7–0.8 is a commonly cited threshold for meaningful hallucination worth
                  investigating — treat it as a rule of thumb, not a hard industry standard, since the exact cutoff is
                  workload-dependent.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Context precision</strong> penalizes irrelevant chunks, especially ones ranked high — it's an
                  average-precision-style calculation over an LLM's relevant/irrelevant verdict on each retrieved
                  chunk. <strong>Context recall</strong> is the one metric here that needs a ground-truth answer: it
                  checks whether the information required to answer correctly was retrieved at all, independent of
                  whether the generator used it well.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="frameworks" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">RAGAS vs TruLens vs DeepEval: which framework for which stage</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The three metrics are the same in spirit across tools; what differs is workflow fit. All three use
                  an LLM-as-judge and support the core RAG triad, but they're built for different points in the
                  lifecycle (
                  <RefLink href="https://atlan.com/know/llm-evaluation-frameworks-compared/">Atlan — RAGAS vs TruLens vs DeepEval</RefLink>
                  ; <RefLink href="https://helpmetest.com/blog/rag-evaluation-frameworks-comparison/">framework selection guide</RefLink>).
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Aspect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">RAGAS</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">TruLens</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">DeepEval</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {frameworkCompare.map((r) => (
                            <TableRow key={r.aspect}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.aspect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.ragas}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.trulens}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.deepeval}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A pattern that shows up repeatedly in practitioner write-ups: use RAGAS (or TruLens) during
                  development to compare pipeline configurations, add DeepEval as a pytest-style gate in CI once the
                  eval set is stable, and run TruLens or Arize Phoenix in production to watch scores on live traffic
                  rather than only at deploy time — the three don't conflict and are commonly run together (
                  <RefLink href="https://atlan.com/know/llm-evaluation-frameworks-compared/">Atlan comparison</RefLink>
                  ; <RefLink href="https://helpmetest.com/blog/rag-evaluation-frameworks-comparison/">RAGAS vs TruLens vs DeepEval</RefLink>).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="answer-correctness" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Faithful but wrong: why you also need an answer correctness metric</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A faithfulness score of 0.95 doesn't mean the answer is <em>right</em> — it means the answer is
                  consistent with whatever was retrieved. If the retrieved chunk itself contains a stale price or a
                  wrong number, a perfectly faithful answer still repeats the error. <strong>Answer correctness</strong>{" "}
                  closes that gap by scoring the generated answer against a human-written reference answer, not against
                  the retrieved context. RAGAS computes it as a weighted blend of a factual F1 score (claims the answer
                  and reference agree on, versus false positives and false negatives) and the semantic similarity
                  between the two texts — commonly weighted around 0.75 factual / 0.25 semantic (
                  <RefLink href="https://krishnaik.in/tutorials/ragas/answer-correctness">RAGAS answer correctness docs</RefLink>
                  ). One practitioner checklist for production RAG puts a concrete number on the gap: a pipeline that
                  scored 0.91 on answer relevancy and 0.88 on faithfulness still shipped a wrong account number to a
                  user, because the model faithfully repeated a chunk that was itself incorrect — the exact failure
                  mode faithfulness cannot catch (
                  <RefLink href="https://lazar-milicevic.com/blog/rag-evaluation-metrics-a-12-point-checklist-2026">RAG evaluation metrics — a 12-point checklist</RefLink>
                  ).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The practical rule: ship both. Gate on faithfulness (commonly ≥0.9–0.95) to catch ungrounded
                  claims, and gate separately on answer correctness against a small labeled gold set (commonly
                  ≥0.85) to catch the faithful-but-wrong case. The two metrics fail independently and point at
                  different fixes — a faithfulness miss means tighten the generation prompt, an answer-correctness
                  miss with high faithfulness means go fix the retrieved document or the knowledge base, not the model.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="production-monitoring" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Taking RAG eval into production: Arize Phoenix</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  RAGAS and DeepEval answer "is this pipeline good on my eval set" offline. The open question in
                  production is different: is quality drifting on <em>live</em> traffic, and which span in a
                  multi-step trace caused a bad answer? <strong>Arize Phoenix</strong>, built on OpenTelemetry/
                  OpenInference, captures spans for each pipeline step — embedding, retrieval, reranking, generation
                  — and runs LLM-as-judge evaluators (hallucination, QA correctness, relevance) against those spans
                  after the fact, so a bad answer can be traced to the exact step that produced it rather than
                  treated as one opaque failure (
                  <RefLink href="https://arize.com/resources/llm-evaluation">Arize — LLM evaluation methods and metrics guide</RefLink>
                  ; <RefLink href="https://thegeocommunity.com/blogs/generative-engine-optimization/arize-phoenix-llm-observability">Arize Phoenix — open-source LLM observability and eval guide</RefLink>
                  ). It runs fully locally with Apache-2.0 licensing, which matters for teams whose data-governance
                  review blocks sending every production trace to a third-party SaaS.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The resulting production stack most teams converge on: RAGAS or TruLens during development to
                  compare configurations, DeepEval as a pytest-style CI gate once the eval set stabilizes, and Phoenix
                  (or TruLens) in production to watch faithfulness and answer-correctness for drift on a sampled slice
                  of real traffic — one documented pattern samples roughly 5% of production traffic weekly and alerts
                  on faithfulness drift before users report problems.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="RAG, agents, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="building-eval-set" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Building an eval set that's actually worth running</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Start from real queries, not made-up ones.</strong> Pull from support logs, product feedback, or early user sessions — synthetic-only test sets miss the messy phrasing real users produce.</li>
                    <li>• <strong>Cover the failure modes you actually care about,</strong> not just "does it work": ambiguous questions, questions with no answer in the knowledge base, multi-hop questions that need two chunks combined.</li>
                    <li>• <strong>Label ground truth only where you need it</strong> — faithfulness and answer relevancy don't require it, so spend labeling effort on context recall and answer correctness, the metrics that do.</li>
                    <li>• <strong>Re-run 2–3 times and average</strong> on borderline cases; LLM-judge scores are reported to vary by roughly ±0.05 between runs on the same input due to judge non-determinism.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="pitfalls" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Where RAG eval scores lie to you</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A high score is not proof of correctness. Independent benchmarking has found that none of the major
                  frameworks can distinguish a factually wrong retrieved context from a correct one — the metrics
                  check whether the answer is <em>consistent with</em> what was retrieved, not whether what was
                  retrieved is true. A pipeline can score 0.95 on faithfulness and still confidently deliver the wrong
                  business answer if the underlying document was stale or incorrect (
                  <RefLink href="https://atlan.com/know/llm-evaluation-frameworks-compared/">Atlan — independent benchmark findings</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The judge model matters more than the framework you pick around it: since all three tools defer
                  scoring to an LLM, a poorly calibrated or biased judge produces misleading dashboards regardless of
                  which library computed the number. Treat eval scores as a triage signal that tells you where to look
                  — not a certificate of correctness.
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
                  <li>• <RefLink href="https://deepwiki.com/vibrantlabsai/ragas/4.2-rag-evaluation-metrics">RAGAS — RAG evaluation metrics documentation</RefLink></li>
                  <li>• <RefLink href="https://ai-tldr.dev/learn/rag/rag-evaluation/rag-evaluation-metrics/">RAG Evaluation Metrics Explained (RAGAS breakdown)</RefLink></li>
                  <li>• <RefLink href="https://teachyou.ai/blog/ragas-metrics-explained">Ragas Metrics Explained: Faithfulness, Context Precision and Recall</RefLink></li>
                  <li>• <RefLink href="https://www.trulens.org/getting_started/core_concepts/rag_triad">TruLens — The RAG Triad</RefLink></li>
                  <li>• <RefLink href="https://truera.com/ai-quality-education/generative-ai-rags/what-is-the-rag-triad">TruEra — What is the RAG Triad?</RefLink></li>
                  <li>• <RefLink href="https://atlan.com/know/llm-evaluation-frameworks-compared/">Atlan — RAGAS vs TruLens vs DeepEval, 2026 Guide</RefLink></li>
                  <li>• <RefLink href="https://helpmetest.com/blog/rag-evaluation-frameworks-comparison/">RAG Evaluation Frameworks Compared: RAGAS vs TruLens vs DeepEval</RefLink></li>
                  <li>• <RefLink href="https://arjunjaggi.com/blog/rag-evaluation">RAG Evaluation: RAGAS, Faithfulness, and LLM-as-Judge</RefLink></li>
                  <li>• <RefLink href="https://krishnaik.in/tutorials/ragas/answer-correctness">RAGAS Answer Correctness: Factual F1 Plus Semantic Similarity</RefLink></li>
                  <li>• <RefLink href="https://lazar-milicevic.com/blog/rag-evaluation-metrics-a-12-point-checklist-2026">RAG Evaluation Metrics: A 12-Point Checklist (2026)</RefLink></li>
                  <li>• <RefLink href="https://arize.com/resources/llm-evaluation">Arize — LLM Evaluation: Methods, Metrics, RAG & Agent Evals Guide</RefLink></li>
                  <li>• <RefLink href="https://thegeocommunity.com/blogs/generative-engine-optimization/arize-phoenix-llm-observability">Arize Phoenix — Open-Source LLM Observability & Eval Guide</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/rag-evaluation-metrics" />
      <Footer />
    </div>
  );
};

export default RagEvaluationMetricsPost;
