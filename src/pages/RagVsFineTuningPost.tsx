import { ArrowLeft, Clock, User, Calendar, GitCompare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import RagVsFineTuningHeroDiagram from "@/components/RagVsFineTuningHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const comparisonRows = [
  { aspect: "What it changes", rag: "What the model sees — retrieves context at inference time", ft: "The model itself — updates weights in a training run" },
  { aspect: "Best for", rag: "Knowledge problems: facts that change, need citations", ft: "Behavior problems: tone, format, narrow task consistency" },
  { aspect: "Knowledge freshness", rag: "Real-time — re-index a doc, the next answer reflects it", ft: "Frozen at training time — a new fact needs a new training run" },
  { aspect: "Citations / provenance", rag: "Native — you know which chunk the answer used", ft: "Opaque — behavior lives in weights, not inspectable sources" },
  { aspect: "Data needed", rag: "Your existing documents, any size", ft: "Hundreds to thousands of labeled input/output examples" },
  { aspect: "Latency", rag: "Adds a retrieval hop (tens to hundreds of ms)", ft: "No retrieval step — direct model call" },
  { aspect: "Cost pattern", rag: "Lower upfront, per-call token cost from injected context", ft: "Training cost upfront, cheaper per call at high volume" },
  { aspect: "Typical build time", rag: "Days to a few weeks (embeddings, vector store, pipeline)", ft: "Weeks (labeled data collection is usually the bottleneck)" },
];

const beyondTable = [
  { technique: "LoRA / QLoRA (PEFT)", what: "Freeze the base model, train tiny low-rank adapters", why: "Fine-tunes an 8B–70B model on one GPU, ~0.1–1% of params, mergeable with no added latency" },
  { technique: "DPO (vs RLHF)", what: "Align to preferences directly, no separate reward model", why: "Simpler and more stable than RLHF; now the common way teams tune behavior" },
  { technique: "Distillation", what: "Train a small student on a large teacher's outputs", why: "Get near-frontier quality in a small, cheap-to-serve model" },
  { technique: "Reasoning / test-time compute", what: "Spend compute at inference (o1/o3, DeepSeek-R1)", why: "Buys reasoning ability without a task-specific fine-tune" },
  { technique: "Long context + RAG", what: "Put knowledge in the prompt instead of the weights", why: "Often replaces fine-tuning for knowledge; RAG stays the cost-efficient default" },
];

const smallModelCases = [
  { company: "Checkr", model: "Fine-tuned small Llama (via Predibase)", use: "Background-check adjudication — 230 categories", outcome: "~5× lower cost, ~0.15s response, 90% accuracy on the hardest 2% of cases; replaced GPT-4" },
  { company: "Together AI (benchmark)", model: "Fine-tuned Llama-3-8B on math data", use: "Mathematical problem solving", outcome: "47.2% → 65.2% — beat Llama-3-70B (64.2%), ~91% of GPT-4o, ~50× cheaper, <$100 to train" },
  { company: "Convirza", model: "Multi-LoRA Llama (via Predibase)", use: "Call-center conversation analysis at scale", outcome: "Serves many fine-tuned adapters on shared infra; sub-second inference on millions of calls/month" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "Is RAG cheaper than fine-tuning?",
    a: "Usually to start, no — not always to run. RAG typically has a lower upfront build cost and no training run, but every call pays a token cost for the injected context plus a retrieval hop. Fine-tuning costs more upfront (data labeling and a training job) but a fine-tuned smaller model can get cheaper per call at high, repetitive volume. Compare total cost across build, run, and maintain, not just the price of one training run.",
  },
  {
    q: "Can you use RAG and fine-tuning together?",
    a: "Yes, and most production systems that reach real scale do. The common pattern is to fine-tune for behavior — tone, refusal style, output format — and use RAG for facts, so the model talks in a consistent voice while grounding its answers in current, cited documents. This combined pattern is sometimes called RAFT (retrieval-augmented fine-tuning).",
  },
  {
    q: "Does fine-tuning teach a model new facts?",
    a: "Not reliably. Fine-tuning adjusts weights toward the style and structure of the training examples; it does not give a model a dependable, inspectable store of facts the way a retrieval index does. Teams that fine-tune on a document set to make the model \"know\" it often end up with a model that confidently invents details rather than accurately recalling them. For facts, use RAG.",
  },
  {
    q: "When should I choose RAG over fine-tuning?",
    a: "Choose RAG when your knowledge changes often, you need to cite the source of an answer for compliance or trust, your knowledge base is large or proprietary, or you don't have labeled training examples. RAG is also the standard starting point even for teams that expect to add fine-tuning later.",
  },
  {
    q: "When should I choose fine-tuning over RAG?",
    a: "Choose fine-tuning when you need consistent behavior — a specific tone, refusal pattern, or output format — that prompting alone doesn't reliably enforce; when your latency budget can't absorb a retrieval hop; or when the underlying knowledge is stable and query volume is high enough that a smaller fine-tuned model is meaningfully cheaper to run than a frontier model with RAG.",
  },
  {
    q: "How much data does fine-tuning need?",
    a: "There's no universal number, but production guides commonly cite ranges in the hundreds to low thousands of clean, labeled input/output examples for a supervised fine-tune, with quality mattering more than raw count. RAG, by contrast, works directly off documents you likely already have, with no labeling step.",
  },
  {
    q: "What is LoRA / QLoRA?",
    a: "LoRA (Low-Rank Adaptation) fine-tunes a model by freezing its original weights and training small low-rank adapter matrices instead — roughly 0.1–1% of the parameters — so quality stays close to a full fine-tune at a fraction of the compute and memory, with no added inference latency once merged. QLoRA adds 4-bit quantization of the base model, making it possible to fine-tune large models on a single GPU. Both are parameter-efficient fine-tuning (PEFT) methods and are the default way teams fine-tune in 2026.",
  },
  {
    q: "Can a small fine-tuned model beat a large model?",
    a: "For a narrow, well-defined task, often yes. Publicly documented examples show fine-tuned small open models (8B-class) matching or beating much larger models on a specific task at far lower cost — e.g. Together AI reported a fine-tuned Llama-3-8B beating the 70B base on math at ~50× lower cost than GPT-4o, and Checkr replaced GPT-4 with fine-tuned small models for background-check classification at roughly 5× lower cost. The win is task-specific: a small fine-tuned model does not become generally smarter, just very good at the one job it was tuned for.",
  },
];

const RagVsFineTuningPost = () => {
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
                  <GitCompare className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">RAG & Retrieval</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                RAG vs Fine-Tuning: Which One Actually Solves Your Problem (2026 Decision Guide)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>RAG and fine-tuning aren't competing for the same job.</strong> RAG (retrieval-augmented
                generation) solves a <em>knowledge</em> problem — it retrieves relevant documents at inference time and
                leaves the model's weights untouched. Fine-tuning solves a <em>behavior</em> problem — it retrains the
                model on labeled examples so it consistently produces a tone, format, or narrow task without being
                told every time. If your model is wrong because it doesn't know something, that's RAG. If it's wrong
                because it answers inconsistently, that's fine-tuning. Most production systems that reach real scale
                in 2026 end up using both.
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
                      Sep 18, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      15 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <RagVsFineTuningHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-each-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What RAG and fine-tuning actually are</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>RAG (retrieval-augmented generation)</strong> connects a model to external data at query
                  time. A user's question is embedded, a retriever searches a vector database for the most relevant
                  chunks, and those chunks are injected into the prompt before the model answers — the technique{" "}
                  <RefLink href="https://ibm.com/think/topics/rag-vs-fine-tuning">was introduced by Meta AI in a 2020 paper</RefLink>{" "}
                  and has since become the default way to ground LLM answers in an organization's own documents. The
                  model's weights never change.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Fine-tuning</strong> takes a pretrained model and continues training it on a focused,
                  labeled dataset of input/output examples, adjusting the model's internal weights so it consistently
                  reproduces the pattern in those examples — a tone, an output schema, a narrow task. Per{" "}
                  <RefLink href="https://developer.ibm.com/articles/awb-rag-vs-fine-tuning">IBM's engineering writeup</RefLink>,
                  it's best suited to stable, unchanging tasks that need a consistent output, not to knowledge that
                  moves. As{" "}
                  <RefLink href="https://www.redhat.com/en/topics/ai/rag-vs-fine-tuning">Red Hat's explainer</RefLink>{" "}
                  puts it plainly: RAG augments the model by connecting it to external data; fine-tuning retrains the
                  model itself on a focused dataset.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="comparison" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">RAG vs fine-tuning: side by side</h2>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Aspect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">RAG</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Fine-tuning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {comparisonRows.map((r) => (
                            <TableRow key={r.aspect}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.aspect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.rag}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.ft}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The pattern across independent writeups from{" "}
                  <RefLink href="https://www.databricks.com/blog/rag-vs-fine-tuning">Databricks</RefLink> and{" "}
                  <RefLink href="https://ibm.com/think/topics/rag-vs-fine-tuning">IBM</RefLink> is consistent: RAG
                  trades a small latency and per-call token cost for always-current, citable answers; fine-tuning
                  trades an upfront training and data-labeling cost for consistent behavior and, at high volume,
                  cheaper per-call inference.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when-rag" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When RAG is the right call</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Knowledge changes often.</strong> Product docs, pricing, support content, or policy that updates weekly or faster — re-indexing a document is far cheaper than re-running a training loop every time it changes.</li>
                    <li>• <strong>You need citations.</strong> Compliance, audit, or user trust requires pointing at the specific document a claim came from — something fine-tuned weights can't do.</li>
                    <li>• <strong>The knowledge base is large or proprietary.</strong> Internal documentation, customer records, or a niche corpus the base model was never trained on.</li>
                    <li>• <strong>You don't have labeled examples.</strong> RAG needs documents, which most teams already have; fine-tuning needs curated input/output pairs, which most teams don't.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when-fine-tuning" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When fine-tuning is the right call</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>You need a strict tone, voice, or output format</strong> — brand voice, a fixed JSON schema, or a specialized reasoning style — that prompting alone doesn't reliably enforce.</li>
                    <li>• <strong>Latency is tight.</strong> No retrieval hop means a fine-tuned model answers in one call; that matters for voice interfaces or other sub-second budgets.</li>
                    <li>• <strong>The knowledge is stable.</strong> A domain that changes on a quarterly cadence or slower doesn't fight the fact that a fine-tune is a frozen snapshot.</li>
                    <li>• <strong>Volume is high and repetitive.</strong> A smaller fine-tuned model answering a narrow, high-volume task (ticket triage, structured extraction) can be meaningfully cheaper per call than a frontier model at scale.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One caution worth internalizing from{" "}
                  <RefLink href="https://developer.ibm.com/articles/awb-rag-vs-fine-tuning">IBM's guidance</RefLink>: don't
                  fine-tune to teach a model facts. It doesn't reliably store them the way a retrieval index does —
                  the more common outcome is a model that has memorized the <em>style</em> of the training examples
                  and confidently invents details rather than accurately recalling them.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="RAG, agents, evaluation, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="hybrid" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The hybrid pattern: fine-tune for behavior, RAG for facts</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice, "RAG vs fine-tuning" is often the wrong frame. RAG operates at the knowledge layer —
                  what the model has access to. Fine-tuning operates at the behavior layer — how the model uses what
                  it's given. Those are independent problems, which is why{" "}
                  <RefLink href="https://www.databricks.com/blog/rag-vs-fine-tuning">Databricks</RefLink> and{" "}
                  <RefLink href="https://community.ibm.com/community/user/blogs/wendy-munoz/2025/11/28/rag-vs-fine-tuning-best-practices-using-the-ibm-ai">IBM's field guidance</RefLink>{" "}
                  both describe a hybrid as the strongest pattern for mature systems: fine-tune the model for tone,
                  refusal calibration, and output structure, and layer RAG on top to supply the facts that change too
                  fast to retrain on. A support assistant is the classic example — fine-tuning fixes the voice and the
                  structured fields a ticketing system expects; RAG supplies the current product docs and policy so
                  the answer is both on-brand and correct today. This combined approach is sometimes called{" "}
                  <strong>RAFT (retrieval-augmented fine-tuning)</strong>: fine-tuning a model specifically on the
                  pattern of using retrieved context well.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The pragmatic sequence most guides converge on: ship RAG first because it's faster to stand up and
                  reveals exactly where the base model's behavior actually breaks down, then fine-tune only the piece
                  RAG can't reach — usually voice, structured output, or a narrow reasoning pattern.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="beyond" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Beyond classic fine-tuning: how model customization is evolving</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  "Fine-tuning" in 2026 rarely means retraining every weight. A handful of techniques have changed what
                  the choice even looks like — most of them making customization cheaper, or removing the need for it
                  entirely:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Technique</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why it matters</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {beyondTable.map((r) => (
                            <TableRow key={r.technique}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.technique}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.what}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.why}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The one that reset expectations is{" "}
                  <RefLink href="https://arxiv.org/abs/2106.09685">LoRA (Hu et al., 2021)</RefLink> and its 4-bit cousin
                  QLoRA: by training small adapter matrices instead of the full model, they cut fine-tuning from a
                  data-center job to something you can run on a single GPU (see the{" "}
                  <RefLink href="https://huggingface.co/docs/peft/index">HuggingFace PEFT library</RefLink>). Preference
                  tuning shifted too —{" "}
                  <RefLink href="https://arxiv.org/abs/2305.18290">Direct Preference Optimization (Rafailov et al., 2023)</RefLink>{" "}
                  aligns a model to human preferences without the separate reward model and RL loop that made RLHF hard
                  to run. And <strong>reasoning models</strong> (OpenAI's o-series, DeepSeek-R1) plus long context and
                  RAG increasingly deliver, at inference time, capability that teams used to chase with a fine-tune —
                  which is why{" "}
                  <RefLink href="https://arxiv.org/abs/2409.01666">recent research</RefLink> frames RAG and long context
                  as the cost-efficient default for knowledge, with fine-tuning reserved for behavior.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="small-models" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Where small fine-tuned models win (with real examples)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The most durable use of fine-tuning in 2026 isn't making a frontier model smarter — it's making a{" "}
                  <strong>small, open model good enough at one narrow task to replace a big one</strong>, at a fraction
                  of the cost and latency. LoRA is what made this practical, and the production case studies are now
                  concrete:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Company</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Model</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Use case</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Reported outcome</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {smallModelCases.map((r) => (
                            <TableRow key={r.company}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.company}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.model}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.use}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.outcome}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Checkr's team documented replacing GPT-4 with fine-tuned small open models for background-check
                  classification — <RefLink href="https://www.computerworld.com/article/3541362/checkr-ditches-gpt-4-for-a-smaller-genai-model-streamlines-background-checks.html">covered independently by Computerworld</RefLink>{" "}
                  and in <RefLink href="https://predibase.com/blog/how-checkr-streamlines-background-checks-with-fine-tuned-small-language">Predibase's case study</RefLink> — cutting cost roughly 5× while holding 90%
                  accuracy on their hardest cases. Together AI's{" "}
                  <RefLink href="https://www.together.ai/blog/finetuning">published benchmark</RefLink> shows the same
                  shape: a fine-tuned Llama-3-8B beat the 70B base on math and reached ~91% of GPT-4o at ~50× lower cost.
                  The pattern is consistent — narrow task, small model, big cost win — with the caveat that these
                  outcomes are self-reported and your task's numbers will differ.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="engineer-voice" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What AI engineers actually say about this</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Practitioner sentiment on Hacker News and r/LocalLLaMA has converged on a few hard-won opinions worth
                  knowing before you spend a training budget:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>"Fine-tuning is for form, not facts."</strong> The most repeated lesson: teams that fine-tuned to make a model <em>know</em> something got confident hallucinations, then fixed it with RAG in a fraction of the time.</li>
                    <li>• <strong>LoRA is the default, not full fine-tuning.</strong> The community treats parameter-efficient tuning as the normal path; full fine-tunes are seen as rarely worth the cost or the catastrophic-forgetting risk.</li>
                    <li>• <strong>"Prompt → RAG → fine-tune → distill," in that order.</strong> A widely shared sequence: exhaust prompting and RAG and write evals first; fine-tune a small model only for the narrow piece that's left; distill if you need it smaller still.</li>
                    <li>• <strong>The market agrees.</strong> Menlo Ventures' enterprise survey put RAG at 51% adoption versus just 9% for fine-tuning — a useful reality check against fine-tuning hype.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Source for the market figures:{" "}
                  <RefLink href="https://menlovc.com/2024-the-state-of-generative-ai-in-the-enterprise/">Menlo Ventures — 2024: The State of Generative AI in the Enterprise</RefLink>{" "}
                  (RAG 51%, up from 31%; fine-tuning 9%).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tips" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Tips for fine-tuning a small model well</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Earn the fine-tune first.</strong> Ship prompting + RAG and write evals before you train anything — it tells you exactly which narrow gap a fine-tune actually needs to close.</li>
                    <li><strong>Use LoRA/QLoRA, not a full fine-tune.</strong> Same task quality for a tiny fraction of the compute and memory, mergeable with no inference-latency cost, and lower catastrophic-forgetting risk.</li>
                    <li><strong>Prioritize data quality over volume.</strong> A few hundred to a few thousand clean, human-reviewed examples typically beat tens of thousands scraped from logs.</li>
                    <li><strong>Consider distillation.</strong> If you need frontier-level quality in a small model, training the small model on a larger one's outputs is often a better lever than fine-tuning on hand-labeled data.</li>
                    <li><strong>Evaluate before and after, on held-out data.</strong> Confirm the new checkpoint improved the target task <em>and</em> didn't regress on tasks it used to handle — small models memorize fast, so watch for overfitting.</li>
                    <li><strong>Match the method to the layer.</strong> Facts change → RAG. Behavior needs enforcing → fine-tune. Need reasoning → reach for a reasoning model before you assume a fine-tune is required.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="build" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What it takes to build each</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A minimal RAG pipeline needs an embedding model, a vector database, a retrieval/reranking step, and
                  prompt-injection logic — infrastructure most AI-engineering teams already know how to stand up. It
                  pairs naturally with tool-calling standards:{" "}
                  <Link to="/blog/mcp-vs-api" className="text-primary hover:underline">wrapping a retrieval pipeline as an MCP server</Link>{" "}
                  lets any AI host search your knowledge base as a standard tool, with zero custom integration per app.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A minimal fine-tuning pipeline needs a base model, a curated set of labeled input/output examples —
                  commonly hundreds to low thousands for a supervised fine-tune — and a training job, plus an
                  evaluation harness to confirm the new checkpoint didn't regress on tasks it used to handle. The data
                  collection and labeling step is usually the real bottleneck, not the training compute itself.
                  Building tool-using{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agents</Link>{" "}
                  and evaluating them well is core AI-engineering work either way — if you're leveling up toward it,
                  our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>{" "}
                  covers the fundamentals underneath both approaches.
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
                  <li>• <RefLink href="https://ibm.com/think/topics/rag-vs-fine-tuning">IBM — RAG vs. Fine-Tuning</RefLink></li>
                  <li>• <RefLink href="https://developer.ibm.com/articles/awb-rag-vs-fine-tuning">IBM Developer — RAG vs. Fine Tuning: Which AI Strategy Should You Choose?</RefLink></li>
                  <li>• <RefLink href="https://community.ibm.com/community/user/blogs/wendy-munoz/2025/11/28/rag-vs-fine-tuning-best-practices-using-the-ibm-ai">IBM Community — RAG vs. Fine-Tuning: Best Practices</RefLink></li>
                  <li>• <RefLink href="https://www.databricks.com/blog/rag-vs-fine-tuning">Databricks — RAG vs Fine Tuning: Enterprise Decisions for AI Models</RefLink></li>
                  <li>• <RefLink href="https://www.redhat.com/en/topics/ai/rag-vs-fine-tuning">Red Hat — RAG vs. Fine-Tuning</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2106.09685">Hu et al. — LoRA: Low-Rank Adaptation of Large Language Models</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2305.18290">Rafailov et al. — Direct Preference Optimization (DPO)</RefLink></li>
                  <li>• <RefLink href="https://huggingface.co/docs/peft/index">HuggingFace — PEFT (LoRA/QLoRA) documentation</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2409.01666">In Defense of RAG in the Era of Long-Context Language Models</RefLink></li>
                  <li>• <RefLink href="https://menlovc.com/2024-the-state-of-generative-ai-in-the-enterprise/">Menlo Ventures — 2024: The State of Generative AI in the Enterprise (RAG 51% vs fine-tuning 9%)</RefLink></li>
                  <li>• <RefLink href="https://www.together.ai/blog/finetuning">Together AI — Fine-tuning Llama-3-8B (math benchmark, cost)</RefLink></li>
                  <li>• <RefLink href="https://predibase.com/blog/how-checkr-streamlines-background-checks-with-fine-tuned-small-language">Predibase — How Checkr streamlines background checks with fine-tuned small models</RefLink></li>
                  <li>• <RefLink href="https://www.computerworld.com/article/3541362/checkr-ditches-gpt-4-for-a-smaller-genai-model-streamlines-background-checks.html">Computerworld — Checkr ditches GPT-4 for a smaller genAI model</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/rag-vs-fine-tuning" />
      <Footer />
    </div>
  );
};

export default RagVsFineTuningPost;
