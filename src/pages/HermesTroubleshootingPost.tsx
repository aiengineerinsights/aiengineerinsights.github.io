import { ArrowLeft, Clock, User, Calendar, Wrench, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesTroubleshootingHeroDiagram from "@/components/HermesTroubleshootingHeroDiagram";

const HermesTroubleshootingPost = () => {
  const symptomData = [
    { symptom: "hermes: command not found", cause: "Installer added a PATH entry your current shell hasn't loaded", fix: "source ~/.bashrc (or source ~/.zshrc), or open a new terminal" },
    { symptom: "Context-window error on first message", cause: "Your model is below the 64,000-token minimum", fix: "Pick a bigger-context model with hermes model" },
    { symptom: "Provider / auth error", cause: "Missing or wrong API key", fix: "Check keys in ~/.hermes/.env, then reconfigure with hermes model" },
    { symptom: "Windows PowerShell blocks the install script", cause: "Execution policy / permissions", fix: "Run PowerShell as Administrator, or use WSL2 with install.sh" },
    { symptom: "Docker config/memory not persisting", cause: "No volume mounted for ~/.hermes", fix: "Mount a volume: -v ~/.hermes:/root/.hermes" },
    { symptom: "Skill writes overwrote your manual edits", cause: "Agent-authored skills applied without review", fix: "Enable write_approval so skill writes are staged" },
    { symptom: "Voice mode not working", cause: "Voice extra not installed", fix: 'uv pip install --python ./venv/bin/python -e ".[voice]"' },
    { symptom: "Anything else / stale version", cause: "Config drift or out-of-date build", fix: "hermes doctor, then hermes update" },
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
                  <Wrench className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Hermes Agent Troubleshooting: Fixing the Most Common Errors
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Hit an error with Hermes Agent? <strong>Run <code className="text-sm">hermes doctor</code> first</strong> — it
                diagnoses most config and provider issues in one pass and usually tells you exactly what's wrong. The three
                you'll see most: <code className="text-sm">hermes: command not found</code> (reload your shell), a
                context-window error on the first message (your model is under the 64k-token minimum), and provider/auth
                errors (check your keys in <code className="text-sm">~/.hermes/.env</code>). Symptom-by-symptom fixes below.
              </p>

              {/* Author Info */}
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
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 10, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      7 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Hero Diagram */}
            <HermesTroubleshootingHeroDiagram />

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="run-doctor-first" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Always Start With <code>hermes doctor</code></h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Before you Google an error string or dig through logs, run the built-in health check:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes doctor</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <code>hermes doctor</code> diagnoses most configuration and provider issues — missing keys, a model that's
                  too small, a broken PATH, an out-of-date build — and points you at the fix. Nine times out of ten it saves
                  you the rest of this page. If you're setting Hermes up for the first time and want the full walkthrough, see
                  our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">guide to installing Hermes Agent</Link>{" "}
                  first, then come back here when something misbehaves.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="symptom-table" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Symptom → Likely Cause → Fix</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Scan for your symptom, apply the fix, and re-run <code>hermes doctor</code> to confirm. Every fix below is
                  covered in more detail in the sections that follow.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Symptom</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Likely cause</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Fix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {symptomData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 font-mono break-all">{row.symptom}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.cause}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 break-all">{row.fix}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="command-not-found" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Why does <code>hermes: command not found</code> happen?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The installer added a PATH entry to your shell's rc file, but your current terminal session was opened
                  before that change, so it hasn't picked it up. Reload the shell — or just open a new terminal:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>source ~/.bashrc   # bash</div>
                  <div>source ~/.zshrc    # zsh</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If <code>hermes</code> still isn't found after reloading, confirm the install actually finished, then run{" "}
                  <code>hermes doctor</code> once it's on your PATH.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="context-window" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Why does my first message throw a context-window error?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes needs a model with at least a <strong>64,000-token context window</strong>. If the model you picked
                  is smaller, the very first message fails because the agent's system prompt and tooling don't fit. Switch to
                  a larger-context model:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes model   # pick a provider/model with 64k+ context</div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="provider-auth" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. How do I fix provider and authentication errors?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Provider and auth errors almost always mean a missing, expired, or mistyped API key. Your secrets live in{" "}
                  <code>~/.hermes/.env</code> and your settings in <code>~/.hermes/config.yaml</code>. Check the key there,
                  then reconfigure the provider cleanly:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>cat ~/.hermes/.env    # verify the key is present and correct</div>
                  <div>hermes model          # reconfigure provider + paste a fresh key</div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="windows-wsl2" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Windows PowerShell blocks the install script</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If PowerShell refuses to run the install script, you have two reliable paths. Either{" "}
                  <strong>run PowerShell as Administrator</strong> and retry, or switch to <strong>WSL2</strong> (Ubuntu) and
                  use the Linux <code>install.sh</code> installer — the most battle-tested path for the Python runtime. Full
                  per-platform steps are in the{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">Hermes Agent install guide</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="docker-persistence" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. My Docker config and memory don't persist</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Inside a container, <code>~/.hermes</code> is wiped every time the container is recreated unless you mount a
                  volume for it. Bind your host's config directory into the container:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>docker run -it -v ~/.hermes:/root/.hermes nousresearch/hermes-agent:latest</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  With the volume mounted, your keys, settings, skills, and memory survive restarts.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sessions-updates-more" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Sessions, Updates, Skills, and Voice</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Lost your work / can't find a chat:</strong> list saved sessions with <code>hermes sessions list</code>, and resume the last one with <code>hermes --continue</code> (or <code>hermes -c</code>).</li>
                  <li>• <strong>Update problems or a stale build:</strong> run <code>hermes update</code> to pull the latest version, then re-run <code>hermes doctor</code>.</li>
                  <li>• <strong>Agent-authored skills overwriting your manual edits:</strong> enable <code>write_approval</code> so skill writes are staged for your review instead of applied silently.</li>
                  <li>• <strong>Voice mode not working:</strong> install the voice extra — <code>cd ~/.hermes/hermes-agent &amp;&amp; uv pip install --python ./venv/bin/python -e ".[voice]"</code>.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Want the bigger picture on how these pieces fit together — memory, skills, sandboxes, and gateways? Our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes Agent architecture guide</Link>{" "}
                  explains what each part does and why it's built that way.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Frequently Asked Questions</h2>

                <h3 id="faq-doctor" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What does <code>hermes doctor</code> actually check?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It runs Hermes's built-in diagnostics across your configuration and provider setup — the common failure
                  points like a broken PATH, missing API keys, a too-small model, or an out-of-date build — and reports what's
                  wrong so you can fix it. Always try it first.
                </p>

                <h3 id="faq-command-not-found" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Why do I get "hermes: command not found" right after installing?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The installer added a PATH entry to your shell rc file, but your open terminal hasn't reloaded it. Run{" "}
                  <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code>, or simply open a new terminal window.
                </p>

                <h3 id="faq-context" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Why does Hermes fail on the very first message?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Your chosen model is below the 64,000-token context-window minimum Hermes requires. Run{" "}
                  <code>hermes model</code> and pick a provider/model with a larger context window.
                </p>

                <h3 id="faq-keys" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Where does Hermes store my API keys and settings?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Secrets live in <code>~/.hermes/.env</code> and settings in <code>~/.hermes/config.yaml</code>. If you hit a
                  provider or auth error, verify the key in <code>.env</code>, then reconfigure with <code>hermes model</code>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">10. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official Quickstart</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-agent-troubleshooting" />
      <Footer />
    </div>
  );
};

export default HermesTroubleshootingPost;
