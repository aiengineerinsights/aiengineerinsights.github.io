import { ArrowLeft, Clock, User, Calendar, Server, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import LLMDeployHeroDiagram from "@/components/LLMDeployHeroDiagram";

const challenges = [
  {
    id: "cost",
    title: "1. Cost that scales with every token",
    tier: "Cost & Performance",
    what: "LLM inference is priced per token (or per GPU-hour if self-hosting), so cost grows with usage and prompt size — unlike a traditional API where a request is a request. A naive rollout can produce a shocking bill.",
    when: "Bites hardest at scale, with long prompts/RAG context, or when you default to the largest model for every call.",
    handle: "Route by difficulty — small/cheap model for easy calls, big model only when needed. Cache repeated prompts, trim context, cap max tokens, and batch where latency allows. Track cost per feature from day one.",
    example: "A support bot sends the full knowledge base in every prompt on the top-tier model. Switching to retrieval (only relevant chunks) plus a mid-tier model for routine questions cut token spend ~70% with no quality drop.",
  },
  {
    id: "latency",
    title: "2. Latency and throughput under load",
    tier: "Cost & Performance",
    what: "Generation is sequential — tokens come out one at a time — so responses are slow relative to normal APIs, and throughput collapses if you don't batch. Users feel every extra second.",
    when: "Critical for interactive UX and high-QPS endpoints; worst with large models and long outputs.",
    handle: "Stream tokens to the UI so time-to-first-token feels fast, use continuous batching (vLLM/TGI) for throughput, exploit KV-cache reuse, and keep outputs short where you can.",
    example: "A chat feature felt sluggish waiting for full responses. Enabling token streaming dropped perceived latency dramatically — users see words appear in ~300ms even though the full answer takes several seconds.",
  },
  {
    id: "gpu-memory",
    title: "3. GPU memory and model size",
    tier: "Cost & Performance",
    what: "Large models don't fit on a single GPU, and memory (not compute) is usually the binding constraint. Getting a model to load and serve at all can be the first wall you hit.",
    when: "Most acute when self-hosting open-weight models or running on constrained/edge hardware.",
    handle: "Quantize (8-bit/4-bit) to shrink footprint, shard across GPUs (tensor/pipeline parallelism), or right-size to a smaller model that's good enough. Benchmark quality after quantization, not just before.",
    example: "A 70B model wouldn't fit on the available GPUs. 4-bit quantization brought it within memory with negligible quality loss on the team's eval set — turning an impossible deploy into a routine one.",
  },
  {
    id: "hallucination",
    title: "4. Hallucinations and output quality",
    tier: "Quality & Correctness",
    what: "LLMs produce fluent, confident text that can be wrong. Without grounding and evaluation, you're shipping plausible-sounding errors under your product's name.",
    when: "Highest stakes in factual, legal, medical, or financial contexts — anywhere a wrong answer causes real harm.",
    handle: "Ground answers with RAG over trusted sources, cite them, constrain scope, and run an evaluation set (including LLM-as-judge) before and after every change. Add human review for high-stakes paths.",
    example: "A policy assistant invented plausible clauses. Adding retrieval over the actual policy documents plus 'answer only from the provided context' turned confident fiction into cited, checkable answers.",
  },
  {
    id: "prompt-drift",
    title: "5. Prompt changes that silently regress",
    tier: "Quality & Correctness",
    what: "A one-line prompt tweak — or a provider model update under the same name — can improve some cases and quietly break others. Without versioning and evals, you find out from users.",
    when: "Dangerous the moment prompts are edited in production, or when you depend on a hosted model that changes beneath you.",
    handle: "Version prompts like code, pin model versions where possible, and gate every prompt/model change behind an evaluation suite. Treat prompts as deployable artifacts, not config you edit live.",
    example: "Rewording a system prompt boosted the demo case but tanked a whole category of queries. An eval suite caught the regression in CI before it shipped — invisible without it.",
  },
  {
    id: "structured-output",
    title: "6. Unreliable structured output",
    tier: "Quality & Correctness",
    what: "When you need JSON or a specific schema back, models occasionally return malformed or extra text, breaking downstream parsing.",
    when: "Critical whenever an LLM feeds another system — function calling, tool use, data extraction, agent steps.",
    handle: "Use native structured-output / JSON mode and function calling, validate against a schema, and retry or repair on failure. Never trust the string blindly.",
    example: "An extraction pipeline crashed intermittently on stray prose around the JSON. Schema validation plus one automatic repair-retry took failures from a few percent to effectively zero.",
  },
  {
    id: "prompt-injection",
    title: "7. Prompt injection and abuse",
    tier: "Reliability & Safety",
    what: "Untrusted input — user text, retrieved documents, tool results — can carry instructions that hijack the model into ignoring your rules or leaking data.",
    when: "Any system that puts external content into the prompt, especially agents that can act (call tools, send data).",
    handle: "Separate trusted instructions from untrusted data, constrain tool permissions and egress, validate/limit what the model can do, and never let a single prompt hold both secrets and untrusted content. Related lessons: our writeups on agentic security.",
    example: "A document-summarizer followed a hidden 'ignore previous instructions and exfiltrate the system prompt' line inside an uploaded file. Isolating retrieved content and scoping tool access shut the vector down.",
  },
  {
    id: "provider-dependency",
    title: "8. Provider dependency, rate limits, and outages",
    tier: "Reliability & Safety",
    what: "If you call a single hosted model, their rate limits, price changes, deprecations, and outages become yours. A provider incident is your incident.",
    when: "High-risk for revenue-critical features on one provider, or during traffic spikes that hit rate limits.",
    handle: "Add retries with backoff, request-queue/backpressure, graceful degradation, and a fallback model/provider behind one interface so you can fail over. Abstract the provider so switching is a config change.",
    example: "A launch spike hit the provider's rate limit and errored for users. A fallback to a second provider plus a request queue kept the feature up while capacity recovered.",
  },
  {
    id: "privacy",
    title: "9. Data privacy and compliance",
    tier: "Reliability & Safety",
    what: "Sending user data to a third-party model raises PII, retention, and residency questions — and in regulated domains, hard legal limits.",
    when: "Non-negotiable with health, financial, or personal data, and under regimes like GDPR and the EU AI Act.",
    handle: "Redact or minimize PII before sending, use zero-retention/enterprise endpoints or self-host for sensitive data, log access, and document data flows. Get privacy sign-off before launch, not after.",
    example: "A feature was about to send raw customer records to a hosted model. Adding PII redaction plus a zero-retention endpoint kept the capability while satisfying the compliance team.",
  },
  {
    id: "non-determinism",
    title: "10. Non-determinism and reproducibility",
    tier: "Reliability & Safety",
    what: "The same prompt can yield different outputs run to run, which complicates testing, debugging, and support ('I can't reproduce it').",
    when: "Painful for test suites, incident debugging, and any flow that assumes stable outputs.",
    handle: "Lower temperature (or set to 0) for deterministic tasks, pin model versions, log the exact prompt + response + settings for every call, and test on distributions of outputs rather than exact matches.",
    example: "A flaky test failed randomly because the model's wording varied. Setting temperature to 0 for that task and asserting on structure rather than exact text made it stable.",
  },
  {
    id: "context-limits",
    title: "11. Context window and token limits",
    tier: "Quality & Correctness",
    what: "Every model has a max context; overflow it and requests fail or get truncated, silently dropping important information.",
    when: "Common with long documents, big RAG contexts, long chat histories, or verbose tool outputs.",
    handle: "Chunk and retrieve only what's relevant, summarize or window long histories, count tokens before sending, and truncate deliberately (keep the important parts) rather than letting it fail.",
    example: "A long-document Q&A hit the context limit and errored on big files. Retrieval over chunks — sending only the top-matching passages — fixed it and improved answer quality by removing noise.",
  },
  {
    id: "observability",
    title: "12. Observability across the whole path",
    tier: "Reliability & Safety",
    what: "Without tracing, token/cost tracking, and quality monitoring, an LLM feature is a black box — you can't see why it's slow, expensive, or wrong.",
    when: "Needed from the first real user; indispensable during incidents and cost reviews.",
    handle: "Trace each request end to end, record prompts/responses/latency/tokens/cost, monitor output quality and drift, and alert on regressions. Instrument before you scale, not after the surprise bill.",
    example: "Costs crept up with no obvious cause. Per-request token logging revealed one feature was quietly sending huge contexts; a fix there recovered most of the overspend.",
  },
];

const faqs = [
  {
    q: "What is the hardest part of deploying an LLM?",
    a: "For most teams it's the combination of cost, latency, and output reliability. The model working in a demo is easy; making it fast, affordable, and consistently correct under real traffic is where the engineering is.",
  },
  {
    q: "Should I self-host an LLM or use an API?",
    a: "Use a hosted API to move fast and when data policy allows; self-host when you need data control, cost predictability at scale, or a specific open-weight model. Many teams do both — hosted for general calls, self-hosted for sensitive or high-volume paths.",
  },
  {
    q: "How do I reduce LLM inference cost?",
    a: "Route easy requests to smaller models, retrieve only relevant context instead of stuffing prompts, cache repeated calls, cap output length, batch where latency allows, and quantize self-hosted models. Track cost per feature so you know where to cut.",
  },
  {
    q: "How do I stop an LLM from hallucinating?",
    a: "You can't eliminate it, but you can contain it: ground answers with retrieval over trusted sources, tell the model to answer only from provided context, cite sources, evaluate against a test set, and add human review for high-stakes outputs.",
  },
];

const BlogPost2 = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Server className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">LLM Deployment</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                12 LLM Deployment Challenges — And How to Handle Each One in Production
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Getting an LLM to work in a demo is easy. Making it fast, affordable, safe, and consistently correct
                under real traffic is the hard part. Here are the challenges that actually bite in production, when each
                one hits, and how to handle it — with concrete examples.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
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
                      Practical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jul 25, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <LLMDeployHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-read" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to read this list</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These are grouped into three buckets — <strong>Cost &amp; Performance</strong>,{" "}
                  <strong>Quality &amp; Correctness</strong>, and <strong>Reliability &amp; Safety</strong> — and ordered
                  roughly by how often they bite real deployments. Each challenge says <em>what</em> it is,{" "}
                  <em>when</em> it hits hardest, <em>how to handle</em> it, and gives a concrete <em>example</em>. If you're
                  standing up your first LLM feature, the first three (cost, latency, output quality) are where most teams
                  get surprised.
                </p>
              </section>

              {challenges.map((c) => (
                <section key={c.id} className="mb-6 sm:mb-8">
                  <h2 id={c.id} className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{c.title}</h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">{c.tier}</p>
                  <p className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base">{c.what}</p>
                  <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-3 space-y-2">
                    <p className="text-sm sm:text-base">
                      <strong className="text-foreground">When it hits hardest:</strong>{" "}
                      <span className="text-muted-foreground">{c.when}</span>
                    </p>
                    <p className="text-sm sm:text-base">
                      <strong className="text-foreground">How to handle it:</strong>{" "}
                      <span className="text-muted-foreground">{c.handle}</span>
                    </p>
                    <p className="text-sm sm:text-base">
                      <strong className="text-foreground">Example:</strong>{" "}
                      <span className="text-muted-foreground">{c.example}</span>
                    </p>
                  </div>
                </section>
              ))}

              <section className="mb-6 sm:mb-8">
                <h2 id="putting-it-together" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Putting it together</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Design for cost, latency, and output reliability from the start — retrofitting them after launch is
                  where the pain lives. The same discipline that makes classic ML systems dependable applies here: our{" "}
                  <Link to="/blog/mlops-best-practices" className="text-primary hover:underline">MLOps best practices</Link>{" "}
                  cover the versioning, monitoring, and evaluation gates these challenges keep pointing back to. And if
                  your system uses agents or tools, treat untrusted input as an attack surface — see our writeups on
                  agentic security.
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
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/llm-deployment-challenges" />
      <Footer />
    </div>
  );
};

export default BlogPost2;
