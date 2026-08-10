import { ArrowLeft, Clock, User, Calendar, Download, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesInstallHeroDiagram from "@/components/HermesInstallHeroDiagram";

const HermesInstallPost = () => {
  const methodData = [
    { method: "Desktop app", best: "Beginners; a GUI with no terminal", cmd: "Download the installer from the official site" },
    { method: "CLI script", best: "Mac / Linux / WSL2, fastest terminal setup", cmd: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash" },
    { method: "Windows PowerShell", best: "Native Windows without WSL2", cmd: "iex (irm https://hermes-agent.nousresearch.com/install.ps1)" },
    { method: "pip", best: "Python users; put it in a venv/project", cmd: "pip install hermes-agent" },
    { method: "Docker", best: "Isolated / reproducible / server deploys", cmd: "docker pull nousresearch/hermes-agent:latest" },
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Download className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                How to Install Hermes Agent (macOS, Windows, Linux, pip, Docker)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                The fastest way to install Hermes Agent: on macOS or Linux, run{" "}
                <code className="text-sm">curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code>,
                then <code className="text-sm">hermes model</code> to pick a provider and{" "}
                <code className="text-sm">hermes --tui</code> to start. On Windows use the PowerShell one-liner or WSL2;
                Python users can <code className="text-sm">pip install hermes-agent</code>. It's free and open source (MIT) —
                you only pay for model inference. Full steps for every method below.
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
                      Beginner
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 10, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      8 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <HermesInstallHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="which-method" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Which Install Method Should You Use?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes Agent ships five install paths — all land on the same agent core and the same config in{" "}
                  <code>~/.hermes/</code>. Pick by how you like to work. New to the terminal? Use the desktop app. Live in a
                  shell? Use the install script. Want it in a Python project or a container? pip or Docker. If you want the
                  bigger picture first, our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes Agent guide</Link>{" "}
                  explains what it is and why the architecture is worth a look.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Method</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Command</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {methodData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.method}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.best}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 font-mono break-all">{row.cmd}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="macos" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Install Hermes Agent on macOS</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two options. For a GUI, download the <strong>Hermes Desktop</strong> installer from{" "}
                  <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent.nousresearch.com</a>{" "}
                  and run it. For the terminal (CLI + desktop share one core and memory):
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</div>
                  <div className="text-muted-foreground">source ~/.zshrc   # reload your shell</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Standard caution: piping a script into <code>bash</code> runs remote code. Read the script first
                  (<code>curl -fsSL …/install.sh | less</code>) if your threat model calls for it, or install from the GitHub repo.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="windows" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Install Hermes Agent on Windows</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two supported paths. <strong>Native PowerShell</strong> (no WSL2 needed) for the CLI:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>iex (irm https://hermes-agent.nousresearch.com/install.ps1)</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Or install the <strong>Hermes Desktop</strong> EXE from the official site for a full GUI. If you prefer a
                  Linux-native environment, open <strong>WSL2</strong> (Ubuntu) and run the macOS/Linux <code>install.sh</code>
                  command from the section above — that's the most battle-tested path for the Python runtime.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="linux" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Install Hermes Agent on Linux (and WSL2)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The same one-line installer covers Linux, WSL2, and even Android via Termux:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</div>
                  <div className="text-muted-foreground">source ~/.bashrc   # or ~/.zshrc</div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="pip" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Install Hermes Agent with pip (Python Package)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Since May 2026, Hermes Agent is on PyPI. Install it into a virtual environment so it doesn't collide with
                  other Python projects:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>python -m venv .venv &amp;&amp; source .venv/bin/activate</div>
                  <div>pip install hermes-agent</div>
                  <div>hermes --tui</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The pip route is handy if you want to pin Hermes in a project's dependencies or run it inside an existing
                  Python toolchain.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="docker" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Run Hermes Agent with Docker</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For an isolated or server deployment, pull the official image and mount a volume so your config and memory
                  persist between runs:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>docker pull nousresearch/hermes-agent:latest</div>
                  <div>docker run -it -v ~/.hermes:/root/.hermes nousresearch/hermes-agent:latest</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On Apple Silicon, add <code>--platform linux/arm64</code> to the pull. Docker is also one of Hermes's
                  execution sandboxes — useful when you want the agent to run untrusted tasks in isolation.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="first-run" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. First Run: Pick a Model and Start</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  After any install method, configure a provider, then start the agent. Hermes is model-agnostic — bring your
                  own API key (OpenAI, Anthropic, OpenRouter, or a compatible endpoint), or use Nous Portal:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes model            # choose provider + paste your API key</div>
                  <div>hermes setup --portal   # or use Nous Portal (easiest for beginners)</div>
                  <div>hermes --tui            # start the modern TUI (or: hermes)</div>
                  <div>hermes --continue       # resume your last session</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Secrets live in <code>~/.hermes/.env</code> and settings in <code>~/.hermes/config.yaml</code>. Hermes needs a
                  model with at least a <strong>64,000-token context window</strong>, so pick a provider/model that meets that.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="extras" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Optional: Voice, Messaging Gateways, and Health Checks</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Voice mode:</strong> <code>cd ~/.hermes/hermes-agent &amp;&amp; uv pip install --python ./venv/bin/python -e ".[voice]"</code>, then <code>/voice on</code> in the CLI.</li>
                  <li>• <strong>Messaging gateways</strong> (Telegram, Discord, Slack, WhatsApp, Signal): <code>hermes gateway setup</code>.</li>
                  <li>• <strong>Diagnose problems:</strong> <code>hermes doctor</code>.</li>
                  <li>• <strong>Update to the latest version:</strong> <code>hermes update</code>.</li>
                  <li>• <strong>List saved sessions:</strong> <code>hermes sessions list</code>.</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="troubleshooting" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Troubleshooting Common Install Issues</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong><code>hermes: command not found</code>:</strong> reload your shell — <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code> — or open a new terminal.</li>
                  <li>• <strong>Context-window error on first message:</strong> your model is below the 64k-token minimum; pick a larger-context model with <code>hermes model</code>.</li>
                  <li>• <strong>Windows PowerShell blocks the script:</strong> run PowerShell as Administrator, or use WSL2 with the Linux installer.</li>
                  <li>• <strong>Anything else:</strong> run <code>hermes doctor</code> — it diagnoses most config and provider issues.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Deciding whether Hermes is even the right agent for you? See our{" "}
                  <Link to="/blog/hermes-agent-vs-openclaw" className="text-primary hover:underline">Hermes Agent vs OpenClaw comparison</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">10. Frequently Asked Questions</h2>

                <h3 id="faq-free" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is Hermes Agent free to install?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Hermes Agent is MIT-licensed and free to download, install, and self-host. You only pay for the model
                  inference you use, via your own API keys or a Nous Portal subscription.
                </p>

                <h3 id="faq-windows" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I install Hermes Agent on Windows without WSL2?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes — use the native PowerShell installer (<code>iex (irm …/install.ps1)</code>) or the Hermes Desktop EXE.
                  WSL2 is optional and mainly preferred if you want a Linux-native Python environment.
                </p>

                <h3 id="faq-pip" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">How do I install Hermes Agent with pip?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Run <code>pip install hermes-agent</code> (ideally inside a virtual environment), then start it with{" "}
                  <code>hermes --tui</code>. PyPI support was added in May 2026.
                </p>

                <h3 id="faq-uninstall" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Where is Hermes installed and how do I remove it?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Config and data live in <code>~/.hermes/</code> (secrets in <code>.env</code>, settings in{" "}
                  <code>config.yaml</code>). To remove a pip install, <code>pip uninstall hermes-agent</code>; for the script
                  install, delete <code>~/.hermes/</code> and remove the PATH line the installer added to your shell rc file.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">11. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official Quickstart</a></li>
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs/user-guide/docker" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — Docker guide</a></li>
                  <li>• <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official site & downloads</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/how-to-install-hermes-agent" />
      <Footer />
    </div>
  );
};

export default HermesInstallPost;
