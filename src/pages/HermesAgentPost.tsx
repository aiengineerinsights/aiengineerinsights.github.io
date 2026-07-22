import { ArrowLeft, Clock, User, Calendar, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesHeroDiagram from "@/components/HermesHeroDiagram";

const HermesAgentPost = () => {
  const installData = [
    { platform: "macOS 12+", method: "DMG installer or terminal", command: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash" },
    { platform: "Windows 10/11", method: "EXE installer or PowerShell", command: "iex (irm https://hermes-agent.nousresearch.com/install.ps1)" },
    { platform: "Linux / WSL2", method: "Terminal", command: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash" },
  ];

  const sandboxData = [
    { backend: "Local", useCase: "Fastest iteration on your own machine, no isolation" },
    { backend: "Docker", useCase: "Container isolation for untrusted or repeatable tasks" },
    { backend: "SSH", useCase: "Run the agent's hands on a remote box you control" },
    { backend: "Singularity", useCase: "HPC and research cluster environments" },
    { backend: "Modal / Daytona", useCase: "Serverless cloud sandboxes that scale to zero" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />

          {/* Main Content */}
          <div className="flex-1 w-full max-w-none lg:max-w-4xl">
            {/* Back Button */}
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 sm:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Insights</span>
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Hermes Agent by Nous Research: The Self-Improving Open-Source AI Agent, Explained
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                What is Hermes AI, how do you download the desktop app on Mac, Windows, or Linux, and what makes its
                architecture worth studying? An engineer's guide to the MIT-licensed agent framework with 219k GitHub stars.
              </p>

              {/* Author Info */}
              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</h3>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jul 22, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      9 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Hero Diagram */}
            <HermesHeroDiagram />

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-hermes-agent" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. What Is Hermes Agent?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Hermes Agent is an open-source, self-improving AI agent framework built by Nous Research</strong>,
                  released under the MIT license. Tagged "the agent that grows with you," it is an autonomous assistant that
                  plans tasks in natural language, calls tools, executes code in sandboxes, and — its signature trick —
                  <strong> writes its own skills as it solves problems</strong>, so the same task is faster and cheaper the second time.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Unlike a chatbot that lives in one tab, Hermes runs as <strong>one agent with one memory across every
                  surface you use</strong>: a terminal CLI, a native desktop app, and messaging gateways for Telegram,
                  Discord, Slack, WhatsApp, Signal, and email. Sessions, configuration, API keys, skills, and memory sync
                  across all of them.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">Hermes Agent at a glance:</h4>
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                    <li>• <strong>License:</strong> MIT — audit it, self-host it, fork it</li>
                    <li>• <strong>GitHub:</strong> ~219k stars, ~41k forks, 81% Python / 16% TypeScript</li>
                    <li>• <strong>Current version:</strong> v0.19.0 (desktop app shipped June 2, 2026 as public preview)</li>
                    <li>• <strong>Model-agnostic:</strong> OpenAI, Anthropic, OpenRouter, or 300+ models via Nous Portal</li>
                    <li>• <strong>Persistent memory:</strong> projects, solution paths, and full-text session search (FTS5)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="hermes-agent-vs-hermes-llm" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Hermes Agent vs. Hermes LLM vs. OpenHermes — Which Is Which?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The name "Hermes" is overloaded, and search results mix three different things (four, if you count the
                  French fashion house Hermès — that one does not ship a CLI):
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>
                    • <strong>Hermes Agent</strong> — the agent <em>framework</em> covered in this article: planner, tools,
                    skills, memory, gateways. It can be powered by any capable LLM.
                  </li>
                  <li>
                    • <strong>Hermes (the LLM family)</strong> — Nous Research's line of fine-tuned open-weight language
                    models (Hermes 2, Hermes 3, and successors), known for strong instruction following and tool calling.
                  </li>
                  <li>
                    • <strong>OpenHermes</strong> — the earlier open dataset and fine-tune lineage that put the Hermes name
                    on the map in the open-source community.
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The agent is deliberately <strong>not tied to Nous's own models</strong>. You point it at any compatible
                  endpoint with <code>hermes model</code> — a design choice that separates orchestration quality from model
                  quality, and one reason engineers take the codebase seriously.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="architecture-deep-dive" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Architecture: What's Actually in the Repo</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent GitHub repository</a> is
                  organized the way you would design an agent platform from first principles:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base font-mono">
                    <li>• <strong>agent/</strong> — core planning and execution loop</li>
                    <li>• <strong>skills/</strong> — procedural memory: skills the agent writes and reuses</li>
                    <li>• <strong>tools/</strong> — 40+ built-in tools (browser, search, images, TTS, files)</li>
                    <li>• <strong>providers/</strong> — LLM provider integrations</li>
                    <li>• <strong>gateway/</strong> — Telegram, Discord, Slack, WhatsApp, Signal bridges</li>
                    <li>• <strong>hermes_cli/</strong> — full TUI with slash-command autocomplete and history</li>
                    <li>• <strong>plugins/</strong> — extension system, compatible with the agentskills.io standard</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two architectural decisions stand out. First, <strong>subagent delegation is process-level</strong>: a
                  delegated subagent gets its own conversation, its own terminal, and Python RPC — closer to spawning a
                  junior engineer than calling a function. Second, <strong>execution is sandboxed by default</strong> with
                  pluggable backends:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Sandbox Backend</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">When You'd Use It</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sandboxData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.backend}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.useCase}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="self-improving-loop" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. The Self-Improving Loop: Skills as Procedural Memory</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most agent frameworks treat every task as a cold start. Hermes's built-in learning loop is different:
                  when the agent solves a problem, it can <strong>distill the solution path into a named, reusable skill</strong>.
                  Next time a similar task appears, the skill short-circuits the exploration phase — fewer tokens, fewer
                  wrong turns, faster completion.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Combine that with persistent project memory and cron-style scheduling ("send me a morning briefing,
                  back up this folder nightly") and you get something closer to an <strong>accumulating co-worker</strong> than a
                  stateless assistant. This is the pattern we expect most serious agent stacks to converge on — the
                  interesting part is watching it work in a codebase you can read.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="download-and-install" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. How to Download Hermes Agent (Mac, Windows, Linux)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The official download source is <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent.nousresearch.com</a> —
                  no account gate, no waitlist. The <strong>Hermes Desktop app</strong> (public preview since June 2026) gives
                  you streaming tool output, a side-by-side preview pane, a file browser, voice input/output, and a settings
                  UI — no terminal required. CLI and desktop share the same agent core and memory.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Platform</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Method</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Install Command</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {installData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.platform}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.method}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 font-mono break-all">{row.command}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Standard caution applies to piping curl into bash: read the install script first, or install from the
                  GitHub repo if your threat model demands it. After install, run <code>hermes</code> to start the TUI and
                  <code> hermes model</code> to pick your provider.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="models-and-pricing" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Models, Nous Portal, and Pricing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The framework itself is free and open source. Bring your own API keys (OpenAI, Anthropic, OpenRouter, or
                  any compatible endpoint), or use <strong>Nous Portal</strong> — Nous Research's hosted gateway to 300+
                  models with tiered subscriptions (Free, Plus, Super, Ultra) that bundle monthly credits. Self-hosters pay
                  nothing beyond their own inference.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="engineers-take" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. An Engineer's Take: Why This One Matters</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Plenty of agent frameworks demo well. Three things make Hermes worth your reading time as an engineer:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>
                    • <strong>The memory model is the product.</strong> Skills-as-procedural-memory plus searchable session
                    history is a concrete answer to the "agents forget everything" problem — in shipping code, not a paper.
                  </li>
                  <li>
                    • <strong>Surfaces are thin, the core is one.</strong> Desktop, CLI, and six messaging gateways over a
                    single agent core is the right decomposition; most stacks get this wrong and fork per-platform.
                  </li>
                  <li>
                    • <strong>Sandbox pluggability.</strong> Local-to-Modal execution behind one interface means the same
                    agent scales from laptop experiments to serverless production without rearchitecting.
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you are building your own agent stack, read <code>skills/</code> and <code>gateway/</code> before
                  writing another orchestration layer from scratch.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Frequently Asked Questions</h2>

                <h3 id="faq-what-is-hermes-ai" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What is Hermes AI?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  "Hermes AI" usually refers to Hermes Agent, Nous Research's open-source autonomous AI agent — though it can
                  also mean the Hermes family of fine-tuned LLMs from the same lab. The agent is the framework; the LLMs are
                  models that can power it.
                </p>

                <h3 id="faq-is-hermes-free" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is Hermes Agent free?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes — MIT-licensed and free to download, self-host, and modify. You pay only for the model inference you
                  use, either via your own API keys or a Nous Portal subscription tier.
                </p>

                <h3 id="faq-hermes-windows" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Does Hermes Agent run on Windows?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Windows 10/11 gets a native EXE installer for the desktop app, or a one-line PowerShell install for
                  the CLI. WSL2 is also supported via the Linux script.
                </p>

                <h3 id="faq-hermes-official-website" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Where are the official website and documentation?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The official website is <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent.nousresearch.com</a>,
                  documentation lives at <a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">/docs</a>,
                  and the source is at <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/NousResearch/hermes-agent</a>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="resources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Resources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official website & downloads</a></li>
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent documentation</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                  <li>• <a href="https://the-decoder.com/nous-research-releases-hermes-desktop-an-open-source-ai-agent-for-every-platform/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Decoder — Hermes Desktop release coverage</a></li>
                  <li>• <a href="https://www.marktechpost.com/2026/06/03/nous-research-releases-hermes-desktop-a-native-cross-platform-front-end-for-hermes-agent-v0-15-2-with-streaming-tool-output/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MarkTechPost — Hermes Desktop technical overview</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-agent-nous-research-guide" />
      <Footer />
    </div>
  );
};

export default HermesAgentPost;
