import { ArrowLeft, Clock, User, Calendar, GitCompare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import AgentZeroHeroDiagram from "@/components/AgentZeroHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";

const AgentZeroVsHermesPost = () => {
  const compareData = [
    { dim: "What it is", zero: "A general-purpose agent with its own Linux computer (Docker)", hermes: "A personal agent loop that learns from its own work", claw: "A gateway daemon that routes your messaging channels" },
    { dim: "Where it runs", zero: "Inside a Docker container; optional A0 CLI bridge to your host", hermes: "On your machine; pluggable execution backends (local, Docker, SSH, serverless)", claw: "On your machine or a server, as a resident gateway" },
    { dim: "Main interface", zero: "Browser web UI with a Linux desktop, built-in browser and document editors", hermes: "Terminal (TUI), desktop app, local web dashboard, messaging gateways", claw: "20+ messaging channels; macOS menu bar app" },
    { dim: "Skills and extensions", zero: "Skills, 100+ community plugins (Plugin Hub), MCP, A2A, editable prompts and tools", hermes: "Writes its own reusable skills from completed tasks", claw: "Human-written skills from the ClawHub marketplace" },
    { dim: "Memory", zero: "Curated memory store (main, fragments, solutions, skills), isolated per project", hermes: "Local files plus searchable SQLite session history", claw: "Markdown files plus transcript and task history" },
    { dim: "Multi-agent", zero: "Agents spawn subordinate agents and get reports back", hermes: "One agent loop that can hand coding tasks to runtimes like Claude Code or Codex CLI", claw: "Multi-agent workflows through the gateway" },
    { dim: "Messaging", zero: "Telegram, WhatsApp and Email integrations", hermes: "Messaging gateways (Telegram, Discord, Slack and more)", claw: "Its core: 20+ channels" },
    { dim: "Models", zero: "Bring your own: OpenAI, Anthropic, Gemini, OpenRouter, Ollama, LM Studio; OpenAI Codex plan via OAuth", hermes: "Bring your own; OpenRouter routing; one-click local models", claw: "Bring your own; model-agnostic" },
    { dim: "Install", zero: "A0 Launcher app, a one-line installer, or docker run", hermes: "Official install script or the desktop app", claw: "npm i -g openclaw@latest, Docker, or a one-click cloud deploy" },
    { dim: "Language · license", zero: "Python · MIT", hermes: "Python · MIT", claw: "TypeScript · MIT" },
  ];

  const pickData = [
    { you: "Want the agent to drive real apps, a browser and office files where you can watch it", pick: "Agent Zero" },
    { you: "Want everything the agent does contained in one Docker sandbox by default", pick: "Agent Zero" },
    { you: "Want to read and change every prompt and tool the agent uses", pick: "Agent Zero" },
    { you: "Want a personal agent that gets faster at your repeat tasks on its own", pick: "Hermes Agent" },
    { you: "Prefer a terminal or a native desktop app over a browser tab", pick: "Hermes Agent" },
    { you: "Mostly talk to your assistant from Telegram, Slack, WhatsApp or Discord", pick: "OpenClaw" },
    { you: "Want a marketplace of ready-made skills on day one", pick: "OpenClaw" },
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-sky-800 rounded-full px-3 py-1">
                  <GitCompare className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Agent Zero vs Hermes Agent vs OpenClaw (2026): Which Should You Run?
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Agent Zero vs Hermes Agent: both are free, MIT-licensed, self-hosted AI agents written in Python, but they
                are built around different ideas. <strong>Agent Zero gives the agent its own Linux computer</strong>: it
                runs inside Docker and you watch it work through a browser UI with a real desktop, browser and document
                editors. <strong>Hermes Agent is a personal agent loop that learns</strong>, writing reusable skills from
                the work it finishes. <strong>OpenClaw</strong>, the third name in every comparison, is a gateway that puts
                one assistant into 20+ messaging apps.
              </p>

              {/* Author Info */}
              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-sky-800 flex items-center justify-center flex-shrink-0">
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
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 27, 2026
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
            <AgentZeroHeroDiagram />

            {/* TL;DR — short, self-contained direct answer */}
            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — Agent Zero vs Hermes vs OpenClaw:</strong> pick <strong>Agent Zero</strong> if you want an
                agent that works inside its own Docker-sandboxed Linux computer (desktop, browser, LibreOffice) that you
                watch and steer from a web UI, and you want to edit every prompt and tool. Pick <strong>Hermes Agent</strong>{" "}
                if you want a personal agent on your own machine that writes its own skills and gets faster at repeat tasks.
                Pick <strong>OpenClaw</strong> if you mostly reach your assistant through Telegram, Slack, WhatsApp or
                Discord. All three are MIT-licensed and self-hosted; you pay only for the model tokens you use.
              </p>
            </div>

            {/* Article Content */}
            <ExploreWithAI path="/blog/agent-zero-vs-hermes-agent" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="short-answer" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Agent Zero vs Hermes vs OpenClaw: What's the Real Difference?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All three get described as "open-source AI agents", so they get compared feature by feature. The more
                  useful question is <strong>where each one puts the center of the system</strong>:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Agent Zero puts a computer at the center.</strong> The agent gets a full Linux machine inside a Docker container, with a desktop, a browser and office apps, and you share that screen with it.</li>
                  <li>• <strong>Hermes Agent puts the agent loop at the center.</strong> Planning, calling tools and running code is the core, and the agent turns finished work into skills it reuses.</li>
                  <li>• <strong>OpenClaw puts a gateway at the center.</strong> A resident daemon owns your chat channels, sessions and routing, and the agent lives behind it.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That one choice decides most of the rest: how you talk to the agent, how contained it is, and what kind of
                  work it is good at. If you already know Hermes and OpenClaw, our{" "}
                  <Link to="/blog/hermes-agent-vs-openclaw" className="text-primary hover:underline">Hermes Agent vs OpenClaw comparison</Link>{" "}
                  covers that pair in depth; this post adds Agent Zero to the picture.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-agent-zero" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. What Is Agent Zero?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Agent Zero (also called A0) is an open-source, MIT-licensed agent framework</strong> from Agent
                  Zero s.r.o., a company in Brno, Czech Republic. Its own tagline is "Give your agent a full Linux
                  computer." The project is written in Python, lives at{" "}
                  <a href="https://github.com/agent0ai/agent-zero" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">agent0ai/agent-zero</a>{" "}
                  on GitHub (about 19.6k stars), and ships often: v2.11 through v2.14 came out between August 27 and
                  October 13, 2026.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What makes it different, according to its README:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>A real Linux desktop.</strong> An XFCE desktop runs inside the container, so the agent can use GUI apps (the README's example is Blender), terminals and files while you watch and take over with your own mouse and keyboard.</li>
                  <li>• <strong>A built-in browser with annotation.</strong> You click elements on a page to tell the agent to change, inspect, copy ("lift") or comment on them.</li>
                  <li>• <strong>Document cowork.</strong> A Markdown editor plus LibreOffice Writer, Calc and Impress that you and the agent edit at the same time.</li>
                  <li>• <strong>Projects.</strong> Each project keeps its own files, instructions, memory, secrets, Git repos and model choices.</li>
                  <li>• <strong>Multi-agent by default.</strong> Any agent can create subordinate agents for focused subtasks and receive their reports.</li>
                  <li>• <strong>Plugins and protocols.</strong> A Plugin Hub with 100+ community plugins, plus MCP, A2A, custom tools and fully editable prompts.</li>
                  <li>• <strong>Time Travel.</strong> Snapshots of the agent's workspace that you can diff and roll back.</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="agent-zero-vs-hermes" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Agent Zero vs Hermes Agent: How Do They Differ?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Both are Python, MIT-licensed and model-agnostic, so the differences are about how you work with them.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Where the agent acts.</strong> Agent Zero works inside its container by default. To touch real
                  files on your laptop you install the separate A0 CLI Connector and explicitly connect it. Hermes runs on
                  your machine, with execution sent to pluggable backends (local, Docker, SSH or serverless) and guarded by
                  command approval. So Agent Zero starts contained and you open doors; Hermes starts on your machine and
                  you add walls.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>How it gets better.</strong> Hermes's signature is that it distills finished tasks into reusable
                  skills on its own, so repeat work gets cheaper. Agent Zero leans on a memory store you curate (its docs
                  are blunt that memory "needs some human gardening"), on skills and plugins, and on letting you rewrite its
                  prompts and tools directly.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>How you talk to it.</strong> Agent Zero is a browser app first. Hermes is terminal-first, with a
                  native desktop app and a local web dashboard (see our{" "}
                  <Link to="/blog/hermes-agent-desktop-web-ui" className="text-primary hover:underline">Hermes desktop and web UI guide</Link>).
                  Both can also be reached from messaging apps: Agent Zero ships Telegram, WhatsApp and Email integrations;
                  Hermes has its own messaging gateways.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>What it's good at.</strong> Agent Zero shines on visible, hands-on work: driving a GUI app,
                  reviewing a web UI by annotating it, building a spreadsheet with you. Hermes shines as a long-running
                  personal agent that handles your recurring tasks and improves at them. New to Hermes? Start with our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes Agent guide</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="agent-zero-vs-openclaw" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Agent Zero vs OpenClaw: How Do They Differ?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  OpenClaw is a TypeScript gateway built for reach: one assistant across 20+ messaging channels, with
                  human-written skills installed from the ClawHub marketplace. Agent Zero is built for depth inside one
                  sandboxed workspace. In practice, OpenClaw is the better fit when the assistant should meet you in chat
                  apps all day; Agent Zero is the better fit when you sit down with it in a browser tab to get a piece of
                  work done and want to see every step.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  They overlap less than the "vs" suggests. Agent Zero can be reached from Telegram or WhatsApp, and
                  OpenClaw has a macOS menu bar app, but neither is trying to be the other.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="side-by-side" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Agent Zero vs Hermes vs OpenClaw: Side by Side</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All three ship releases every few weeks, so treat this as the shape of the trade-off and check each repo
                  before you commit.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Dimension</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Agent Zero</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Hermes Agent</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">OpenClaw</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {compareData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.dim}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.zero}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.hermes}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.claw}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <NewsletterSignup
                heading="Get one practical AI agents email a week"
                subtext="New agent releases tested, what changed, and whether it's worth switching. No hype, one email a week."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="security" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Which Is Safest to Run?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All three run commands with your API keys, so all three need care. The difference is the default.{" "}
                  <strong>Agent Zero is contained by design</strong>: the agent's computer is a Docker container, and
                  access to your host goes through a connector you install on purpose. <strong>Hermes</strong> runs on
                  your machine but ships defense-in-depth defaults: dangerous-command approval, sandboxed execution
                  backends and credential filtering. <strong>OpenClaw</strong> is the most operator-driven: you are
                  expected to harden the gateway yourself, and its public skill marketplace is one more thing to vet.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A container is a real boundary but not the strongest one, since it shares the host's kernel. If you plan
                  to let any of these agents run code unattended, read our{" "}
                  <Link to="/blog/ai-agent-sandboxing" className="text-primary hover:underline">AI agent sandboxing guide</Link>{" "}
                  for how containers compare with gVisor and microVMs, and our{" "}
                  <Link to="/blog/hermes-agent-security" className="text-primary hover:underline">Hermes Agent security guide</Link>{" "}
                  for the approval and credential settings worth changing.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="install" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. How Do You Install Each One?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Agent Zero</strong> needs Docker. The easiest path is the A0 Launcher, a desktop app for macOS,
                  Windows and Linux that checks Docker and sets up instances for you. On a server, use the one-line
                  installer. If Docker is already running, start it directly:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div># macOS / Linux installer</div>
                  <div>curl -fsSL https://bash.agent-zero.ai | bash</div>
                  <div className="mt-2"># or, with Docker already running</div>
                  <div>docker run -p 80:80 -v a0_usr:/a0/usr agent0ai/agent-zero</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Then open the web UI, pick your model provider and give it a task. If port 80 is taken, map another
                  port (for example <code>-p 5080:80</code>) and open <code>http://localhost:5080</code>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Hermes Agent</strong> installs with its official script or the native desktop app; our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">Hermes install guide</Link>{" "}
                  covers Mac, Windows, Linux, pip and Docker. <strong>OpenClaw</strong> installs with{" "}
                  <code>npm install -g openclaw@latest</code>, a Docker image, or a one-click cloud deploy.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Running models locally? Agent Zero's docs cover Ollama and LM Studio, and our{" "}
                  <Link to="/blog/hermes-agent-models" className="text-primary hover:underline">Hermes models guide</Link>{" "}
                  covers the same for Hermes. Local models are cheaper but weaker at long tool-calling chains, which all
                  three agents depend on.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="which-to-pick" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Which One Should You Pick?</h2>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">If you…</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Lean toward</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pickData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.you}</TableCell>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.pick}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Since all three are free, the cheapest way to decide is to give each the same real task for a day. Agent
                  Zero is the easiest to try without risk, because everything it does stays in its container. Still
                  weighing other options? Our{" "}
                  <Link to="/blog/hermes-agent-alternatives" className="text-primary hover:underline">Hermes Agent alternatives</Link>{" "}
                  roundup and{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source agent frameworks guide</Link>{" "}
                  cover the wider field.
                </p>
              </section>

              <ExploreWithAI path="/blog/agent-zero-vs-hermes-agent" variant="questions" />

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Frequently Asked Questions</h2>

                <h3 id="faq-difference" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What is the difference between Agent Zero and Hermes Agent?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Agent Zero gives the agent its own Linux computer inside Docker, which you watch and steer from a browser
                  UI with a desktop, browser and document editors. Hermes Agent runs on your machine as a personal agent
                  loop that writes reusable skills from the tasks it completes. Agent Zero is contained by default and
                  built for visible, hands-on work; Hermes is built to improve at your recurring tasks.
                </p>

                <h3 id="faq-free" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is Agent Zero free and open source?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Agent Zero is MIT-licensed and free to self-host, as are Hermes Agent and OpenClaw. You pay only for
                  the model usage behind your API keys, or nothing extra if you run local models through Ollama or LM
                  Studio.
                </p>

                <h3 id="faq-openclaw" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is Agent Zero better than OpenClaw?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It depends on the job. OpenClaw is better if you want one assistant inside 20+ messaging apps with a
                  marketplace of ready-made skills. Agent Zero is better if you want the agent to do hands-on work in a
                  sandboxed Linux desktop and browser that you can watch, and to customize its prompts and tools.
                </p>

                <h3 id="faq-docker" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Does Agent Zero need Docker?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Agent Zero runs as a Docker container, from a small VPS or Raspberry Pi to a GPU server. The A0
                  Launcher desktop app and the one-line installer check for Docker and help set it up; if Docker is
                  already running you can start it with <code>docker run -p 80:80 -v a0_usr:/a0/usr agent0ai/agent-zero</code>.
                </p>

                <h3 id="faq-together" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I run Agent Zero and Hermes Agent together?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. They don't conflict: Agent Zero lives in its own container and Hermes runs on your machine. Some
                  people use Hermes as the always-on personal agent and open Agent Zero for sandboxed, hands-on tasks.
                  Agent Zero also supports MCP and A2A, which makes connecting it to other agents possible.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">10. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://github.com/agent0ai/agent-zero" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Agent Zero — GitHub README, docs and releases</a></li>
                  <li>• <a href="https://www.agent-zero.ai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Agent Zero — official site</a></li>
                  <li>• <a href="https://github.com/agent0ai/agent-zero/blob/main/docs/guides/memory.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Agent Zero — Memory guide</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — GitHub (Nous Research)</a></li>
                  <li>• <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official site and docs</a></li>
                  <li>• <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenClaw — GitHub</a></li>
                  <li>• <a href="https://docs.openclaw.ai/platforms/macos" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenClaw — macOS app docs</a></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against each project's repository and docs on October 27, 2026. All three change quickly, so
                  verify current details before you commit.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/agent-zero-vs-hermes-agent" />
      <Footer />
    </div>
  );
};

export default AgentZeroVsHermesPost;
