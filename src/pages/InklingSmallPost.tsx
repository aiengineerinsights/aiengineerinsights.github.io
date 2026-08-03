import { ArrowLeft, Clock, User, Calendar, Cpu, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import InklingSmallHeroDiagram from "@/components/InklingSmallHeroDiagram";

const InklingSmallPost = () => {
  const specData = [
    { spec: "Total parameters", inkling: "975B", small: "276B" },
    { spec: "Active parameters", inkling: "41B", small: "12B" },
    { spec: "Architecture", inkling: "MoE, 6 of 256 experts + 2 shared", small: "Same design" },
    { spec: "Context window", inkling: "1M tokens", small: "1M tokens" },
    { spec: "Modalities", inkling: "Text, image, audio", small: "Text, image, audio" },
    { spec: "License", inkling: "Open-weight (Apache 2.0)", small: "Apache 2.0" },
    { spec: "Tinker output price", inkling: "$4.05 / 1M tokens", small: "$1.20 / 1M tokens" },
    { spec: "Release date", inkling: "Jul 15, 2026", small: "Jul 30, 2026" },
  ];

  const benchmarkData = [
    { task: "SWE-bench Verified", inkling: "77.6%", small: "80.2%", note: "Small wins — agentic coding RL" },
    { task: "Humanity's Last Exam", inkling: "29.7%", small: "31.6%", note: "Small wins" },
    { task: "IFBench (instruction following)", inkling: "79.8%", small: "82.2%", note: "Small wins" },
    { task: "MMMU Pro (visual reasoning)", inkling: "73.5%", small: "74.0%", note: "Roughly even" },
    { task: "AIME 2026 (math)", inkling: "97.1%", small: "95.5%", note: "Inkling wins" },
    { task: "GPQA Diamond", inkling: "87.2%", small: "89.5%", note: "Small wins" },
    { task: "Audio MC", inkling: "56.6%", small: "54.9%", note: "Inkling wins" },
    { task: "StrongREJECT (safety)", inkling: "98.4%", small: "98.4%", note: "Tied" },
  ];

  const peerData = [
    { model: "Inkling-Small", org: "Thinking Machines", total: "276B", active: "12B", ctx: "1M", license: "Apache 2.0" },
    { model: "DeepSeek V4 Flash", org: "DeepSeek", total: "284B", active: "13B", ctx: "1M", license: "MIT" },
    { model: "Qwen3.5-397B-A17B", org: "Alibaba", total: "397B", active: "17B", ctx: "1M", license: "Apache 2.0" },
    { model: "MiMo-V2.5", org: "Xiaomi", total: "310B", active: "15B", ctx: "1M", license: "MIT" },
  ];

  const hardwareData = [
    { precision: "BF16", vram: "~600 GB", setup: "4× B300/GB200 or 8× H200" },
    { precision: "NVFP4 (quantized)", vram: "~180 GB", setup: "1× B300 or 2× H200" },
    { precision: "1-bit (llama.cpp + Unsloth)", vram: "~30 GB", setup: "Single high-memory consumer/workstation GPU" },
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-purple-800 rounded-full px-3 py-1">
                  <Cpu className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Model Releases</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Inkling-Small vs. Inkling: Is Thinking Machines' 12B-Active Model Actually Worth Deploying?
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Yes, for coding, reasoning, and instruction-following workloads. Inkling-Small runs on 12B active
                parameters — a quarter of flagship Inkling's 41B — yet <strong>matches or beats it</strong> on
                SWE-bench Verified, Humanity's Last Exam, and IFBench, at roughly a third of the Tinker output
                price. It trails Inkling on raw knowledge coverage, math (AIME), and audio understanding. Here's the
                full spec breakdown, benchmark comparison, hardware requirements, and where it fits against other
                open-weight mixture-of-experts models in its class.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-purple-800 flex items-center justify-center flex-shrink-0">
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
                      Analysis
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 1, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Hero Diagram */}
            <InklingSmallHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-inkling-small" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. What Is Inkling-Small?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Inkling-Small is an open-weight mixture-of-experts (MoE) language model from Thinking
                  Machines Lab</strong>, released July 30, 2026 — two weeks after the lab's flagship model, Inkling.
                  It has <strong>276 billion total parameters but only 12 billion active per token</strong> (roughly
                  a quarter of Inkling's 41B active), routing each token to 6 of 256 experts plus 2 shared experts
                  that are always on. Despite the smaller active footprint, it's not a distilled-down toy: on
                  several benchmarks it outperforms the 975B-parameter model that trained it.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It shares Inkling's core design — a 42-layer decoder-only transformer with hybrid local/global
                  attention (a 5:1 ratio of sliding-window to global layers), relative position encoding instead of
                  RoPE, and native multimodal input across text, images, and audio — all within a 1 million-token
                  context window. Full weights are on Hugging Face under Apache 2.0, and it's available for
                  fine-tuning and chat through Thinking Machines' Tinker platform.
                </p>
                <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base text-foreground">
                    <strong>The one-line version:</strong> Inkling-Small is what you get when you distill a 975B
                    teacher on-policy into a 276B student and then spend two weeks of reinforcement learning
                    sharpening it specifically for agentic coding — and the student ends up beating the teacher on
                    the tasks that RL targeted.
                  </p>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-does-it-compare-to-inkling" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. How Does Inkling-Small Compare to Inkling on Specs?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Side by side, the two models share almost everything except scale and price:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Spec</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Inkling</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Inkling-Small</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {specData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.spec}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.inkling}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.small}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="is-inkling-small-as-good-as-inkling" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Is Inkling-Small As Good As Inkling? The Benchmark Numbers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>It depends on the task.</strong> Thinking Machines' own model card shows Inkling-Small
                  ahead on coding, general reasoning, and instruction-following — the areas its post-training
                  targeted — and behind on math and audio, where the larger model's extra capacity and breadth
                  still matter:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Benchmark</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Inkling (41B active)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Inkling-Small (12B active)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Result</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {benchmarkData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.task}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.inkling}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.small}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Thinking Machines is upfront about the trade-off in its own model card: Inkling retains the edge
                  in "knowledge coverage and factuality," which tracks with the AIME and Audio MC gaps above — a
                  quarter of the active parameters means less room to store long-tail facts, even when the model
                  reasons just as well or better on tasks it was specifically tuned for.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-was-it-trained" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. How Was a 12B-Active Model Trained to Beat a 41B-Active One?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Three ingredients, per Thinking Machines' release notes and model card:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>A revised pretraining mix.</strong> Inkling-Small didn't just inherit Inkling's data recipe — the mix and ML recipe were adjusted for the smaller architecture.</li>
                    <li><strong>On-policy distillation with Inkling as teacher.</strong> Rather than training on static teacher outputs, the student learns from the teacher's feedback on its own (on-policy) generations — generally a stronger signal than offline distillation.</li>
                    <li><strong>Two weeks of scaled agentic-coding reinforcement learning</strong>, plus RL-based calibration against proper scoring rules for forecasting tasks — which is precisely where the SWE-bench and IFBench gains show up.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The engineering takeaway: this is a repeatable recipe, not a one-off trick. On-policy distillation
                  from a larger sibling model, followed by a short, targeted RL burst on the capability you actually
                  care about, can beat raw parameter scaling on that capability specifically — while still trailing
                  on the breadth a bigger model accumulates during pretraining. If you're deciding between a bigger
                  base model and a smaller specialized one, the right question is "which benchmark matters for my
                  workload," not "which model is bigger." That's the same instinct behind{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">what makes an LLM agentic</Link>{" "}
                  in the first place — tool use and reasoning quality on your task, not parameter count.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-much-cheaper-is-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. How Much Cheaper Is Inkling-Small to Run?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On Thinking Machines' own Tinker platform, Inkling-Small is priced at <strong>$1.20 per million
                  output tokens</strong> versus Inkling's <strong>$4.05</strong> — a 70% cut. The hardware
                  requirement drops even more sharply, since a quarter of the active parameters means a much
                  smaller memory footprint per forward pass:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Precision</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">VRAM (Inkling-Small)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Typical Setup</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {hardwareData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.precision}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.vram}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.setup}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Full BF16 weights need roughly 600 GB of VRAM — 4× B300/GB200 or 8× H200 — down from Inkling's
                  ~2 TB. NVFP4-quantized inference fits in ~180 GB, or a single B300. Hugging Face's own Inference
                  Endpoints benchmark reports 140 tokens/second for single-user inference at $22 per hour of uptime.
                  For local or budget deployment, Unsloth's 1-bit quantization via llama.cpp cuts VRAM consumption
                  by roughly 95%, though at a real quality cost worth validating against your own evals before
                  committing to it in production.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-does-it-compare-to-other-open-weight-models" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. How Does Inkling-Small Compare to Other Open-Weight MoE Models?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Thinking Machines' own model card names its competitive set: DeepSeek V4 Flash, Qwen3.5-397B-A17B,
                  and Xiaomi's MiMo-V2.5 — all open-weight MoE models in roughly the same 12–17B active-parameter,
                  1M-context class:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Model</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Org</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Total / Active</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Context</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">License</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {peerData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.model}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.org}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.total} / {row.active}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.ctx}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.license}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Inkling-Small sits at the smallest active-parameter footprint of the four, which — combined with
                  its SWE-bench and IFBench scores — makes it a reasonable default to benchmark first if your
                  workload is agentic coding or instruction-following under a 1M-token context. We don't have
                  independently verified head-to-head benchmark numbers against DeepSeek V4 Flash, Qwen3.5, or
                  MiMo-V2.5 on identical harnesses, so treat any specific score comparison you see elsewhere with
                  the usual skepticism until you've run it yourself — the honest answer is "close enough to be
                  worth an eval run," not "definitively better."
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when-should-you-use-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. When Should You Actually Use Inkling-Small?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <li>• <strong>Best for:</strong> agentic coding assistants, RAG systems, and tool-use agents where SWE-bench-style task completion and instruction-following matter more than encyclopedic recall.</li>
                    <li>• <strong>Best for:</strong> teams that can't justify Inkling's ~2 TB BF16 footprint or $4.05/1M output price, but still need a genuinely capable 1M-context, multimodal open-weight model.</li>
                    <li>• <strong>Skip it for:</strong> workloads that lean on broad factual recall or math-heavy reasoning, where Inkling's extra active parameters still show a measurable edge (AIME 2026: 97.1% vs. 95.5%).</li>
                    <li>• <strong>Skip it for:</strong> audio-heavy pipelines — Inkling-Small trails Inkling on Audio MC (54.9% vs. 56.6%), a small but real gap if voice understanding is your core use case.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice, the decision is a cost-per-quality-point question specific to your task, not a
                  general "is it good" question — which is exactly why we're publishing the benchmark table above
                  rather than a verdict. Run your own eval on Tinker or a self-hosted vLLM instance before
                  committing production traffic to either model.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Frequently Asked Questions</h2>

                <h3 id="faq-is-inkling-small-open-source" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is Inkling-Small open source?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Full weights are released on Hugging Face under the Apache 2.0 license, which permits
                  commercial use, fine-tuning, and modification without additional authorization.
                </p>

                <h3 id="faq-active-parameters" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What does "12B active parameters" actually mean?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Inkling-Small is a mixture-of-experts model: 276B parameters exist in total, but each token only
                  routes through 12B of them (6 of 256 experts, plus 2 shared experts that are always active).
                  That's the number that determines inference compute and latency — not the 276B total, which only
                  affects memory footprint for holding the full model.
                </p>

                <h3 id="faq-can-i-run-it-locally" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I run Inkling-Small locally?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Only with significant hardware or aggressive quantization. NVFP4 quantization needs roughly
                  180 GB of VRAM (a single B300 or two H200s); llama.cpp with Unsloth's 1-bit quantization can get
                  the footprint down to roughly 30 GB, trading real quality for accessibility. It is not a
                  single-consumer-GPU model at full precision the way a 7B or 14B dense model would be.
                </p>

                <h3 id="faq-worth-switching" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Should I switch from Inkling to Inkling-Small in production?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If your workload is coding, agentic tool use, or instruction-following, Inkling-Small matches or
                  beats Inkling on the public benchmarks at roughly a third of the price — worth an eval run. If
                  your workload leans on broad factual knowledge, math, or audio understanding, Inkling still has a
                  measurable edge and the larger active parameter count may be worth the extra cost.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://thinkingmachines.ai/news/inkling-small/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Thinking Machines Lab — Introducing Inkling-Small</a></li>
                  <li>• <a href="https://thinkingmachines.ai/model-card/inkling-small/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Thinking Machines Lab — Inkling-Small model card</a></li>
                  <li>• <a href="https://thinkingmachines.ai/news/introducing-inkling/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Thinking Machines Lab — Introducing Inkling (flagship model)</a></li>
                  <li>• <a href="https://huggingface.co/blog/thinkingmachines-inkling" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hugging Face — Welcome Inkling by Thinking Machines</a></li>
                  <li>• <a href="https://analyticsindiamag.com/ai-news/thinking-machines-shrinks-inkling-to-12b-active-parameters-without-giving-up-performance" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Analytics India Magazine — coverage</a></li>
                  <li>• <a href="https://www.marktechpost.com/2026/07/15/thinking-machines-lab-releases-inkling-a-975b-parameter-open-weights-multimodal-moe-with-41b-active-parameters-and-controllable-thinking-effort/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MarkTechPost — Inkling flagship release coverage</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/inkling-small-thinking-machines" />
      <Footer />
    </div>
  );
};

export default InklingSmallPost;
