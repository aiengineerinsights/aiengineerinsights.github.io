import { ArrowLeft, Clock, User, Calendar, Route, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import LLMRoutingHeroDiagram from "@/components/LLMRoutingHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const signals = [
  {
    signal: "Rules and metadata",
    decides: "Token count, user tier, whether a tool is required, language, SLA — plain code",
    cost: "Free, microseconds, deterministic",
    strength: "Zero risk of being 'wrong' in a way you can't explain; perfect for hard constraints",
    weakness: "Cannot tell an easy question from a hard one by content; rules rot as traffic shifts",
  },
  {
    signal: "Embedding similarity (semantic router)",
    decides: "Which of your example-utterance groups the query is closest to in vector space",
    cost: "One embedding call per request (often local), tens of milliseconds",
    strength: "No training loop — add a route by adding example sentences; good for intent-shaped traffic",
    weakness: "Measures topic, not difficulty; a 'billing' question can be trivial or brutal",
  },
  {
    signal: "Learned difficulty / preference router",
    decides: "A trained model predicts which tier will answer well (or which model 'wins') for this query",
    cost: "A small model forward pass; needs labeled or preference data to train",
    strength: "Directly optimizes the thing you care about — quality vs cost; strongest published results",
    weakness: "Training data effort; drift when your models or traffic change; opaque",
  },
  {
    signal: "Calibrated decision model (Jev-style)",
    decides: "A typed Choice — simple / complex — plus a confidence trained to track accuracy",
    cost: "One non-autoregressive pass; TypeSafe quotes ~70–500 ms and $0.042 per million input tokens",
    strength: "No training data, labels defined at request time, and a confidence you can threshold on",
    weakness: "Calibration is imperfect in the 0.3–0.8 band; prompt injection can move the verdict",
  },
];

const tools = [
  {
    tool: "RouteLLM (LMSYS / UC Berkeley)",
    kind: "Learned router, open source",
    routesOn: "Predicted win-rate of a strong vs weak model, trained on human preference data",
    note: "Paper reports cost reductions of over 2× in certain cases without quality loss; routers transferred when the strong/weak pair was swapped",
  },
  {
    tool: "Semantic Router (Aurelio Labs)",
    kind: "Embedding router, open source",
    routesOn: "Similarity between the query embedding and example utterances per route",
    note: "Returns a route name or None; positioned as a 'superfast decision-making layer' that avoids waiting on an LLM generation",
  },
  {
    tool: "NVIDIA LLM Router blueprint",
    kind: "Reference architecture",
    routesOn: "v2: intent routing with a small Qwen 1.7B model, or 'auto-routing' with CLIP embeddings plus a trained network",
    note: "v2 only returns a model recommendation (it does not proxy the call); the repo now carries a deprecation notice pointing to NeMo Switchyard",
  },
  {
    tool: "Jev (TypeSafe AI)",
    kind: "Calibrated decision model, API",
    routesOn: "A Choice you define at request time (e.g. simple / complex) with a calibrated confidence",
    note: "Used in LangChain's ModelRouterMiddleware with the instruction 'Choose the least costly model that can complete the task'",
  },
  {
    tool: "LiteLLM Router",
    kind: "AI gateway / proxy, open source",
    routesOn: "Deployment-level load balancing: simple-shuffle, latency-based, usage-based, least-busy, cost-based, custom",
    note: "Balances copies of the same model across providers and regions with cooldowns, fallbacks, retries; does not judge query difficulty",
  },
  {
    tool: "OpenRouter Auto Router (openrouter/auto)",
    kind: "Hosted gateway feature",
    routesOn: "A lightweight classifier assigns ~30 task types, then ranks models by what the OpenRouter community spent on that task over a trailing 7-day window",
    note: "Cost tiers (low → max), session stickiness, allowed/excluded model filters, graceful degradation to a default set",
  },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is LLM routing?",
    a: "LLM routing is a cheap decision made before an expensive model call: for each incoming request, a router picks which model (or model tier) should answer it, based on difficulty, intent, cost, latency, or policy. The goal is to send the easy majority of traffic to a small, cheap model and reserve the frontier model for the hard minority, so you cut cost and latency without a visible drop in quality.",
  },
  {
    q: "What is the difference between an LLM router and an AI gateway?",
    a: "An AI gateway (LiteLLM, Portkey, OpenRouter's core proxy) sits in front of many providers and handles keys, rate limits, retries, fallbacks, and load balancing across deployments of a model — it decides which copy of a model serves a request. An LLM router decides which model should answer at all, based on the content of the request. Many products do both; the routing signal (rules, embeddings, a learned router, or a calibrated decision model) is the part that determines quality and cost.",
  },
  {
    q: "How much does LLM routing actually save?",
    a: "Published results, on the authors' own benchmarks: RouteLLM (Ong et al., 2024) reports cost reductions of over 2× in certain cases without compromising response quality; Hybrid LLM (Ding et al., 2024) reports up to 40% fewer calls to the large model with no drop in response quality; FrugalGPT (Chen, Zaharia, Zou, 2023) reports matching the best individual LLM with up to 98% cost reduction using cascades and related tricks. Your number depends on how much of your traffic is genuinely easy, so measure it on your own logs before putting it in a budget.",
  },
  {
    q: "What is RouteLLM?",
    a: "RouteLLM is an open-source framework and paper from LMSYS and UC Berkeley (Ong et al., 2024) for training routers that dynamically choose between a stronger and a weaker LLM at inference time. The routers are trained on human preference data (plus data augmentation) to predict when the weaker model's answer would be preferred, and the paper reports that trained routers kept working even when the strong and weak models were swapped at test time.",
  },
  {
    q: "Can I use Jev as an LLM router?",
    a: "Yes — routing by complexity is one of the use cases TypeSafe and LangChain document for it. You ask Jev a Choice question (simple vs complex, or small / medium / frontier) and get back a label plus a calibrated confidence in one non-autoregressive pass, with no training data. The practical rules: route to the cheap model only on high-confidence 'simple', send every mid-range confidence (roughly 0.3–0.8) to the stronger model by default, and keep attacker-controlled text out of the fields the decision hinges on, because prompt injection has been shown to move Jev's verdicts.",
  },
  {
    q: "How do I evaluate an LLM router?",
    a: "Build a labeled eval set of real requests where you already know which tier answers acceptably, then measure three things for each routing configuration: router accuracy (how often it picks the cheapest acceptable tier), the quality delta versus sending everything to the frontier model (graded by your existing evals or an LLM judge with human spot checks), and the realized cost and latency. Log every production decision with its confidence and outcome so you can re-run that evaluation as traffic and models drift.",
  },
];

const LLMRoutingPost = () => {
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
                  <Route className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                LLM Routing Explained: How an LLM Router Picks the Right Model (RouteLLM, Semantic Router, Jev, AI Gateways) — 2026
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Most LLM traffic does not need a frontier model.</strong> An LLM router is the cheap decision
                in front of the expensive call: it looks at each request and sends the easy majority to a small, fast
                model while reserving the big one for the hard minority. This guide covers what model routing is, why
                the published savings are real but benchmark-specific, the four routing signals (rules, embeddings,
                learned routers, calibrated decision models), what RouteLLM, Semantic Router, NVIDIA's router, LiteLLM,
                OpenRouter's auto router, and Jev actually route on, how to build and evaluate your own router, and the
                mistakes that quietly turn "cheaper" into "worse."
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
                      Oct 7, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      13 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <LLMRoutingHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> LLM routing sends each request to the cheapest model that can answer it
                acceptably, using a decision made <em>before</em> the expensive call — by rules, embedding similarity,
                a trained router (RouteLLM-style), or a calibrated decision model (Jev-style). Published routers report
                cost cuts from roughly 2× (RouteLLM) up to 98% (FrugalGPT cascades) on their own benchmarks; the number
                you get depends on how much of <em>your</em> traffic is genuinely easy. Default anything uncertain to the
                stronger model, log every decision, and measure router accuracy and quality delta on your own logs.
              </p>
            </div>

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-llm-routing" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is LLM routing, and what does an LLM router do?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  LLM routing (also called model routing) is the practice of choosing <em>which</em> model answers a
                  request at runtime rather than hard-wiring your application to one model. The router is whatever
                  makes that choice. It sits between your application and your model providers, inspects each
                  incoming request — the text, its length, the user, the tools in play — and dispatches it to a model
                  tier: a small, fast model for the easy cases; a frontier model for the hard ones; sometimes a middle
                  tier in between.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The reason routing exists is an uncomfortable fact about production traffic: a large share of it is
                  easy. Password resets, "what's your refund policy," classify-this-ticket, rewrite-this-sentence.
                  Sending those to the same model you use for multi-step agent planning is paying frontier prices for
                  work a model a tenth the size does fine. The{" "}
                  <RefLink href="https://arxiv.org/abs/2305.05176">FrugalGPT paper</RefLink> framed the economics
                  bluntly in 2023: API fees across popular models "can differ by two orders of magnitude," which is
                  exactly the gap a router exploits.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One distinction to fix before anything else, because the term "LLM router" is used for two different
                  things:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Model routing</strong> decides <em>which model</em> should answer, based on the request. This is what RouteLLM, Semantic Router, NVIDIA's router, OpenRouter's auto router, and Jev do, each with a different signal. It is the subject of this post.</li>
                    <li>• <strong>Gateway routing</strong> decides <em>which deployment</em> of a model serves a request — which region, which provider key, which copy has rate-limit headroom — plus retries, fallbacks, and cooldowns. LiteLLM's Router is the canonical open-source example. It does not look at what the request is asking.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You usually want both, layered: a model router in front choosing the tier, a gateway behind it
                  keeping each tier reliable. Conflating them is how teams buy a gateway, call it a router, and wonder
                  why their bill didn't move.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="does-routing-save-money" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Does LLM routing actually save money? What the papers measured</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes, with a caveat that matters: every published number is on the authors' own benchmark and
                  model pair. Three results anchor the field:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>FrugalGPT</strong> (<RefLink href="https://arxiv.org/abs/2305.05176">Chen, Zaharia, Zou, 2023</RefLink>) reports that it "can match the performance of the best individual LLM (e.g. GPT-4) with up to 98% cost reduction" and can "improve the accuracy over GPT-4 by 4% with the same cost," using three strategies — prompt adaptation, LLM approximation, and the <strong>LLM cascade</strong>: try a cheap model first, score its answer, and only escalate if the score is low.</li>
                    <li>• <strong>Hybrid LLM</strong> (<RefLink href="https://arxiv.org/abs/2404.14618">Ding et al., 2024</RefLink>) trains a router on predicted query difficulty with a tunable quality level, and reports "up to 40% fewer calls to the large model, with no drop in response quality."</li>
                    <li>• <strong>RouteLLM</strong> (<RefLink href="https://arxiv.org/abs/2406.18665">Ong et al., 2024</RefLink>) trains routers on human preference data to choose between a stronger and a weaker LLM, and reports it "significantly reduces costs — by over 2 times in certain cases — without compromising the quality of responses." Notably, the routers kept their performance "even when the strong and weak models are changed at test time."</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The spread — 2× to 98% — is not the papers disagreeing. It is the savings being a function of
                  three things you control: how much of your traffic is genuinely easy, how much cheaper your small
                  tier is than your big one, and how accurately your router can tell the two apart. A router with
                  perfect accuracy on traffic that is 90% easy saves close to 90% of frontier spend. The same router
                  on agent-planning traffic that is 90% hard saves almost nothing and adds a hop. The routing research
                  keeps pushing the accuracy term — a 2026 NVIDIA paper,{" "}
                  <RefLink href="https://arxiv.org/abs/2603.20895">"LLM Router: Rethinking Routing with Prefill Activations"</RefLink>,
                  routes on a model's internal prefill activations instead of surface features and reports closing
                  45.58% of the gap to an oracle router at 74.31% cost savings relative to the most expensive model —
                  but the traffic-mix term is yours, and it is the one to measure first.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="routing-signals" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The four routing signals: rules, embeddings, learned routers, decision models</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Every router, open source or hosted, makes its decision from one of four kinds of signal — or a
                  stack of them. The signal determines what the router can and cannot see, which is more important
                  than which product wraps it.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Signal</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it decides on</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Cost of the decision</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Strength</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Weakness</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {signals.map((r) => (
                            <TableRow key={r.signal}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.signal}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.decides}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.cost}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.strength}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.weakness}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Rules</strong> are where to start and where to put anything that is actually a policy: requests
                  over N tokens go to the long-context model, requests that need a tool go to the model that calls tools
                  reliably, enterprise-tier users always get the frontier model. Rules can't judge difficulty from
                  content, but they never surprise you.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Embedding similarity</strong> is what{" "}
                  <RefLink href="https://github.com/aurelio-labs/semantic-router">Semantic Router</RefLink> does: you
                  define each route with a handful of example utterances, the library embeds them, and at request time
                  it embeds the query and returns the closest route (or <code>None</code>). It is fast and needs no
                  training loop, and it is the right tool when your traffic is intent-shaped — billing vs support vs
                  sales. Its blind spot is that it measures <em>topic</em>, not <em>difficulty</em>. "Why was I charged
                  twice" and "reconcile these three invoices against the contract amendment" are both billing.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Learned routers</strong> fix that by training a model to predict the thing you care about:
                  RouteLLM predicts, from preference data, whether the weak model's answer would be preferred; Hybrid
                  LLM predicts query difficulty against a quality target; NVIDIA's prefill-activation router predicts
                  per-model correctness from internal activations. They have the strongest published results and the
                  highest setup cost — you need labeled or preference data, and the router is a model that drifts
                  when your traffic or your model pair changes.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Calibrated decision models</strong> are the newest option and the one most relevant to teams
                  who want a learned-style signal without a training project. A model like{" "}
                  <Link to="/blog/what-is-jev" className="text-primary hover:underline">Jev</Link> takes the request
                  plus a label set you define at call time (simple / complex, or small / medium / frontier) and returns
                  one typed Choice with a confidence trained to track accuracy. The confidence is the point: it lets you
                  route on a threshold instead of a guess. We come back to the practical rules for that in the Jev
                  section below.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A fifth pattern deserves a name because it is a different <em>topology</em>, not a different
                  signal: the <strong>cascade</strong>. Instead of predicting difficulty up front, FrugalGPT's cascade
                  calls the cheap model first, scores the answer with a separate checker, and escalates only if the
                  score is low. Cascades don't need a difficulty predictor, but they pay the cheap call on every
                  request and add its latency to the hard ones. Routers and cascades compose well: route the obvious
                  cases, cascade the ambiguous ones.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Routing, decision models, agents, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="routers-compared" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">RouteLLM vs Semantic Router vs NVIDIA vs Jev vs LiteLLM vs OpenRouter: what each actually routes on</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The names below get thrown into the same "LLM router" bucket in search results and Reddit threads.
                  They are not interchangeable. Read the third column: it tells you which signal from the previous
                  section each one is built on, and therefore what it can't see.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Tool</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it is</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Routes on</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Worth knowing</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tools.map((r) => (
                            <TableRow key={r.tool}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.tool}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.kind}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.routesOn}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two of these deserve a closer look because they are the ones most often mistaken for a difficulty
                  router. <RefLink href="https://docs.litellm.ai/docs/routing">LiteLLM's Router</RefLink> is a
                  gateway: its documented strategies — simple-shuffle (the default, weighted by RPM/TPM), latency-based,
                  usage-based, least-busy, cost-based, and custom — all pick a <em>deployment</em> from a pool, and its
                  reliability features are cooldowns, fallbacks, timeouts, and retries. It is excellent at that job.
                  It will not notice that a request is easy.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://openrouter.ai/docs/features/model-routing">OpenRouter's Auto Router</RefLink>{" "}
                  (<code>openrouter/auto</code>) is a genuine model router, but note what it optimizes. Per its docs, "a
                  fast, lightweight classifier assigns each prompt one of ~30 fine-grained task types," then the router
                  "looks up which models the OpenRouter community actually spends on over a trailing 7-day window" for
                  that task, filtered by the cost tier you choose (<code>low</code> through <code>max</code>). That is
                  routing on <em>task type and market behavior</em>, not on the difficulty of your specific request —
                  useful if you want a sensible default per task without building anything, less useful if your goal
                  is "send 70% of my support traffic to the small model." It also keeps a conversation on the model it
                  landed on and degrades to a default set if classification is unavailable.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The NVIDIA blueprint is a reminder that this space moves fast: the{" "}
                  <RefLink href="https://github.com/NVIDIA-AI-Blueprints/llm-router">llm-router repo</RefLink> went
                  from v1 (task/complexity classifiers) to v2 (intent routing via a small Qwen model, or CLIP
                  embeddings plus a trained network, returning recommendations only) and now carries a deprecation
                  notice pointing at NeMo Switchyard. Treat any specific router product as replaceable; the signal
                  taxonomy is what lasts.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-build" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do you build an LLM router? A pattern that holds up in production</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The router you ship is almost never one signal. It is rules first, then one content signal, then a
                  threshold with a safe default, then logging. In order:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Define the tiers and what "acceptable" means per tier.</strong> Two tiers is enough to start (small, frontier). Write down the quality bar — the eval score or human rubric — that a small-tier answer must clear. Without this, "the router works" is unfalsifiable.</li>
                    <li><strong>Pull every hard constraint into rules.</strong> Context length, tool requirements, tenant policy, regulated content. These never go through a model; they run first and short-circuit.</li>
                    <li><strong>Pick one content signal for the rest.</strong> Intent-shaped traffic: embeddings. Difficulty-shaped traffic with labeled data: a learned router. Difficulty-shaped traffic with no labels and a deadline: a calibrated decision model. Start with the one you can ship this week; you can swap it later because the interface — request in, tier out — doesn't change.</li>
                    <li><strong>Threshold with the expensive model as the default.</strong> Route to the small tier only when the signal is confidently "easy." Everything uncertain goes up. A router that errs toward the frontier model costs you a little money; one that errs toward the small model costs you quality you may not notice for weeks.</li>
                    <li><strong>Feed the router structured fields, not just raw text.</strong> Token count, turn count, whether retrieval found anything, user tier. It gives rules something to act on and shrinks the surface an attacker can write into.</li>
                    <li><strong>Log the decision, the confidence, the tier, and the outcome.</strong> This log is your eval set, your drift detector, and the training data for a learned router later.</li>
                    <li><strong>Put a gateway behind each tier.</strong> Retries, fallbacks, cooldowns, provider keys — the LiteLLM job. If the small tier is down, the router's decision should fall through to the frontier tier, not fail.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  The shape of it as pseudocode. <strong>Illustrative only</strong> — the control flow, not real SDK
                  calls:
                </p>
                <pre className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-xs sm:text-sm">
                  <code>{`# ILLUSTRATIVE PSEUDOCODE — control flow only, not real API syntax.

def route(request):
    # 1. hard rules run first, in plain code
    if request.tokens > SMALL_CTX or request.needs_tools or request.user.tier == "enterprise":
        return FRONTIER

    # 2. one content signal — swap the implementation, keep the interface
    decision = router.decide(
        question="simple or complex?",
        input=structured(request),          # fields your code assembled
        labels=["simple", "complex"],
    )
    log(request.id, decision.label, decision.confidence)

    # 3. threshold with the expensive model as the default
    if decision.label == "simple" and decision.confidence >= 0.9:
        return SMALL
    return FRONTIER                          # the uncertain middle goes UP, not down

tier = route(request)
answer = gateway.complete(tier, request)     # retries / fallbacks live in the gateway
if tier == SMALL and not passes_check(answer):
    answer = gateway.complete(FRONTIER, request)   # optional cascade on failure
log_outcome(request.id, tier, answer)`}</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Notice the asymmetry in step 3. The threshold is on "simple," not on "complex." That is deliberate:
                  it encodes the safe default into the control flow, so a badly calibrated or drifting router degrades
                  into "slightly more expensive," never into "silently worse." If the router is doing its job inside
                  an <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">agent loop</Link>,
                  the same decision point is also where you'd gate risky tool calls — a different question to the
                  same cheap decision layer.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="jev-as-router" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Where does Jev fit as an LLM router?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Routing by complexity is the headline use case TypeSafe and LangChain give for{" "}
                  <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">Jev</RefLink>, so it
                  is worth being precise about what it adds and what it doesn't. Jev is a non-autoregressive decision
                  model: you send the request plus a label set, it returns one Choice (up to 255 labels) and a
                  confidence in a single forward pass, with no text. It is trained with RLCD — Reinforcement Learning
                  for Calibrated Decisions — so the confidence is meant to track how often it is right. Pricing is
                  $0.042 per million input tokens with output free, which is what makes it plausible to call on every
                  request.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In the taxonomy above, that makes it a <strong>learned-style signal with no training step</strong>:
                  you get a difficulty judgment (not just a topic match, as with embeddings) without collecting
                  preference data (as with RouteLLM). LangChain's{" "}
                  <RefLink href="https://www.langchain.com/blog/building-a-harness-with-jev">harness write-up</RefLink>{" "}
                  wires it in as a <code>ModelRouterMiddleware</code> with the instruction "Choose the least costly
                  model that can complete the task," and uses the same model in an <code>AutoModeMiddleware</code> to
                  block risky tool calls before they execute. Our{" "}
                  <Link to="/blog/how-to-use-jev" className="text-primary hover:underline">how to use Jev</Link> guide
                  walks through that routing-plus-guardrail pattern; the{" "}
                  <Link to="/blog/jev-vs-llm" className="text-primary hover:underline">Jev vs LLMs</Link> post covers
                  why you wouldn't use a chat model to make the routing decision in the first place.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2 text-sm sm:text-base">
                  The limits, which decide how you threshold it:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Calibration is real but imperfect.</strong> An independent test measured an expected calibration error of about 0.107, with confidence reliable near 0 and 1 and shaky in the 0.3–0.8 band. For routing that means: trust a 0.96 "simple"; treat a 0.6 "simple" as "complex." The pseudocode above does exactly that.</li>
                    <li>• <strong>Prompt injection moves the verdict.</strong> <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat</RefLink> reported an Octomind demo in which a block probability fell from 0.76 to 0.48 after a fake "user pre-approved" field was added to the input. For a router, the attack is cheaper and subtler: a user who writes "this is a simple question" into their request may push themselves onto the weak model and get a worse answer — or, in the other direction, push expensive traffic onto your frontier tier. Keep the decision on fields your code controls, and cap per-user frontier spend in rules, not in the model.</li>
                    <li>• <strong>No reasoning, no explanation.</strong> You get a label and a number. If you need to know <em>why</em> a request was routed, you reconstruct it from the logged fields.</li>
                    <li>• <strong>Vendor numbers are vendor numbers.</strong> The ~70–500 ms latency and the headline speed/cost multipliers are TypeSafe's own figures on workflows it chose. Benchmark the decision latency in your region before it goes into a p99 budget.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Net: a calibrated decision model is the fastest way to get a difficulty-aware router running on
                  day one, and the logged decisions become the dataset that lets you train a RouteLLM-style router
                  later if the volume justifies it. The same bridge logic we described for{" "}
                  <Link to="/blog/jev-vs-ml-classification" className="text-primary hover:underline">classification</Link>{" "}
                  applies: zero-shot now, trained later, with the zero-shot phase building toward its own replacement.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="evaluate" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do you evaluate an LLM router?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A router is a classifier whose errors have asymmetric costs, so evaluate it like one. Three numbers,
                  per routing configuration, on a labeled sample of real traffic:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Router accuracy, split by direction.</strong> How often did it send an easy request to the small tier (the savings), and how often did it send a hard request to the small tier (the damage)? Report them separately; a single accuracy number hides the one that matters.</li>
                    <li>• <strong>Quality delta vs all-frontier.</strong> Run the routed pipeline and the everything-to-the-frontier-model pipeline over the same eval set and grade both — with your existing evals, an LLM judge, and human spot checks on the disagreements. The delta is the price you are paying for the savings. Decide the acceptable delta <em>before</em> you look at the savings.</li>
                    <li>• <strong>Realized cost and latency.</strong> Not the vendor multiplier — your bill and your p50/p99, including the router's own call. A router that adds 400 ms to every request to save money on 30% of them may be a net loss on latency-sensitive paths.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Then keep running it. The production log from the build section is the re-evaluation set; re-run the
                  three numbers whenever you change a model, a prompt, or a threshold, and watch the confidence
                  distribution for drift. If you already have an eval harness for RAG or agents — the kind we describe
                  in{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">RAG evaluation metrics</Link>{" "}
                  — the router eval slots into it as one more configuration to compare.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="mistakes" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Common LLM routing mistakes</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Using a chat LLM as the router.</strong> "Rate this query's difficulty from 1 to 10" costs an autoregressive call per request, returns a number that is generated text rather than a calibrated probability, and can take longer than the small-model answer it was supposed to save. Use a cheap signal.</li>
                    <li>• <strong>Thresholding toward the cheap model.</strong> If "complex" needs 0.9 confidence to reach the frontier model, every uncertain request gets the weak answer. Flip it: "simple" needs the confidence; everything else goes up.</li>
                    <li>• <strong>Buying a gateway and calling it a router.</strong> Load balancing across deployments of the same model will not reduce frontier spend. Check which signal the product routes on.</li>
                    <li>• <strong>Routing on topic when the problem is difficulty.</strong> Embedding routers are fast and useful, but an intent label doesn't tell you whether the small model can handle this instance of that intent.</li>
                    <li>• <strong>Letting user text control the decision.</strong> Any model-based router can be nudged by what the user writes. Rules on fields you control — tier, spend caps, tool requirements — are the parts an attacker can't talk past.</li>
                    <li>• <strong>Shipping without the quality delta.</strong> Savings are visible on the bill the same week; quality loss shows up as churn a quarter later. Measure both on day one.</li>
                    <li>• <strong>Not logging confidence.</strong> A log of labels without confidences cannot tell you whether the router is drifting or whether the threshold is in the right place. Store the number.</li>
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
                  <li>• <RefLink href="https://arxiv.org/abs/2406.18665">Ong et al. 2024 — RouteLLM: Learning to Route LLMs with Preference Data (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2305.05176">Chen, Zaharia, Zou 2023 — FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2404.14618">Ding et al. 2024 — Hybrid LLM: Cost-Efficient and Quality-Aware Query Routing (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2603.20895">Varshney et al. 2026 — LLM Router: Rethinking Routing with Prefill Activations (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://github.com/aurelio-labs/semantic-router">Aurelio Labs — semantic-router (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://github.com/NVIDIA-AI-Blueprints/llm-router">NVIDIA AI Blueprints — LLM Router (GitHub)</RefLink></li>
                  <li>• <RefLink href="https://docs.litellm.ai/docs/routing">LiteLLM — Router: load balancing, fallbacks, retries (docs)</RefLink></li>
                  <li>• <RefLink href="https://openrouter.ai/docs/features/model-routing">OpenRouter — Model routing and the Auto Router (docs)</RefLink></li>
                  <li>• <RefLink href="https://www.langchain.com/blog/building-a-harness-with-jev">LangChain — Building a harness with Jev (ModelRouterMiddleware, AutoModeMiddleware)</RefLink></li>
                  <li>• <RefLink href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">TypeSafe AI — Introducing System One models and Jev</RefLink></li>
                  <li>• <RefLink href="https://venturebeat.com/security/companies-are-putting-jev-in-charge-of-ai-agent-decisions-and-prompt-injection-can-influence-the-verdict">VentureBeat — Companies are putting Jev in charge of AI agent decisions, and prompt injection can influence the verdict</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/llm-routing" />
      <Footer />
    </div>
  );
};

export default LLMRoutingPost;
