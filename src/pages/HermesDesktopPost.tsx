import { ArrowLeft, Clock, User, Calendar, Monitor, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesDesktopHeroDiagram from "@/components/HermesDesktopHeroDiagram";

const HermesDesktopPost = () => {
  const surfaceData = [
    { surface: "CLI / TUI", best: "Terminal users; scripting, SSH, keyboard-first workflows", how: "hermes --tui" },
    { surface: "Desktop app", best: "Beginners who want a native GUI with no terminal at all", how: "Download the installer (macOS / Windows)" },
    { surface: "Web dashboard", best: "Configuring settings, browsing sessions, and monitoring from a browser tab", how: "hermes dashboard → http://127.0.0.1:9119" },
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
                  <Monitor className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Hermes Agent Desktop App & Web UI: The Visual Way to Run Your Agent
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Besides the terminal, Hermes gives you two graphical ways to work: a native{" "}
                <strong>Desktop app</strong> for macOS and Windows (download it from{" "}
                <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent.nousresearch.com</a>),
                and a <strong>web dashboard</strong> you open in a browser by running{" "}
                <code className="text-sm">hermes dashboard</code> and visiting{" "}
                <code className="text-sm">http://127.0.0.1:9119</code>. All three surfaces — CLI/TUI, desktop, and
                dashboard — share one agent core and one memory, and both graphical options are free and open source (MIT).
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
                      Beginner
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
            <HermesDesktopHeroDiagram />

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="the-three-surfaces" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. What Are the Graphical Ways to Run Hermes?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes has <strong>two graphical options besides the terminal</strong> (the CLI/TUI): a native{" "}
                  <strong>Desktop app</strong> and a <strong>web dashboard</strong> that runs in your browser. The key thing
                  to understand up front is that these are not separate products — <strong>all three surfaces share one agent
                  core and one memory</strong>. Whatever you do in the desktop app shows up in the CLI, and vice versa:
                  sessions, skills, API keys, and memory are the same underneath. If you want the bigger picture of what
                  Hermes is first, start with our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">Hermes Agent guide from Nous Research</Link>.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Surface</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">When to use it</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How to open</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {surfaceData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.surface}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.best}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 font-mono break-all">{row.how}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Prefer the command line, or brand new to Hermes and not sure it's for you? Two companion reads: our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">step-by-step Hermes install guide</Link>{" "}
                  covers every setup path, and our{" "}
                  <Link to="/blog/hermes-agent-vs-openclaw" className="text-primary hover:underline">Hermes Agent vs OpenClaw comparison</Link>{" "}
                  helps you decide if it's the right agent for you.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="desktop-app" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. What Is the Hermes Desktop App?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The <strong>Hermes Desktop app</strong> is a native application for <strong>macOS and Windows</strong>,
                  shipped as a public preview since June 2026. It's the friendliest way to run Hermes if you'd rather not
                  touch a terminal at all. You download an installer from{" "}
                  <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent.nousresearch.com</a>,
                  run it, and you're working in a full graphical interface.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What you get in the desktop app:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Streaming tool output</strong> — watch the agent's tools run in real time.</li>
                  <li>• <strong>A side-by-side preview pane</strong> — see results next to the conversation.</li>
                  <li>• <strong>A file browser</strong> — navigate files the agent is working with visually.</li>
                  <li>• <strong>Voice input and output</strong> — talk to the agent and hear it back.</li>
                  <li>• <strong>A settings UI</strong> — configure everything without editing config files by hand.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Because it sits on the same core as the CLI, anything you start in the desktop app is available in the
                  terminal later — no export, no sync step. It's the same agent wearing a GUI.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="web-dashboard" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. What Is the Hermes Web Dashboard?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The <strong>web dashboard</strong> is a browser-based control panel for Hermes. You launch it with a single
                  command, and it starts a <strong>local server on your own machine</strong> — by default at{" "}
                  <a href="http://127.0.0.1:9119" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://127.0.0.1:9119</a>:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes dashboard</div>
                  <div className="text-muted-foreground"># then open http://127.0.0.1:9119 in your browser</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Community documentation describes the dashboard as being built on a <strong>FastAPI backend</strong> with a{" "}
                  <strong>React 19 single-page app</strong> front end. Note that <code>127.0.0.1</code> means it runs entirely
                  on your computer — <strong>your data stays local</strong> unless you deliberately change the host binding to
                  allow network access (more on that below).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  From that one browser tab, the dashboard lets you (again, as community-documented — not every item is in the
                  official docs yet):
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• Configure <strong>settings and API keys</strong> without editing YAML by hand.</li>
                  <li>• <strong>Browse sessions</strong> and revisit past conversations.</li>
                  <li>• <strong>Schedule tasks</strong> to run on a cadence.</li>
                  <li>• <strong>Monitor usage analytics</strong> to see what the agent has been doing.</li>
                  <li>• Manage <strong>files, profiles, skills, memory, and logs</strong> in one place.</li>
                  <li>• Drop into an <strong>embedded web terminal</strong> when you do want a shell.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In short: the dashboard is the point-and-click layer over everything Hermes stores in{" "}
                  <code>~/.hermes/</code>, so you rarely need to open a config file yourself.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="open-dashboard" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. How Do I Open the Hermes Dashboard?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Three steps, assuming Hermes is already installed:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes dashboard          # 1. start the local server</div>
                  <div># 2. open http://127.0.0.1:9119 in any browser</div>
                  <div># 3. configure keys &amp; settings in the UI — no YAML needed</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you haven't installed Hermes yet, our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">how-to-install-Hermes guide</Link>{" "}
                  walks through every method (macOS, Windows, Linux, pip, and Docker) before you get here. Secrets live in{" "}
                  <code>~/.hermes/.env</code> and settings in <code>~/.hermes/config.yaml</code> — the dashboard simply edits
                  those for you through a UI.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="remote-access" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Can I Access the Dashboard From Another Device?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  By default, no — and that's intentional. The dashboard <strong>binds to localhost (<code>127.0.0.1</code>)</strong>,
                  meaning only the machine it's running on can reach it. To open it up to your phone, another laptop, or a
                  server, you have to <strong>explicitly change the host binding</strong> to allow network access.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Be careful here: exposing the dashboard to a network means anyone who can reach that address can drive your
                  agent, read your sessions, and see your keys. Only do this <strong>behind authentication or a VPN</strong> —
                  never bind it to a public interface on an untrusted network. If you just want a GUI on your own computer,
                  leave it on localhost and use the desktop app or the default dashboard.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="desktop-vs-dashboard" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Desktop App vs. Web Dashboard — Which Should I Use?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  They overlap, but they're aimed at slightly different moments:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>
                    • <strong>Reach for the desktop app</strong> when you want a polished, installed application for everyday
                    chatting with the agent — streaming output, a preview pane, voice, and a file browser, with nothing to
                    launch from a terminal.
                  </li>
                  <li>
                    • <strong>Reach for the web dashboard</strong> when you want to <em>administer</em> Hermes — tweak settings
                    and keys, browse sessions, schedule tasks, watch analytics, and manage skills, memory, and logs — all from
                    a browser tab, with an embedded terminal on hand.
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You don't have to choose permanently. Since everything runs on one core and one memory, you can chat in the
                  desktop app, open the dashboard to schedule a task, then drop to the CLI for a scripted run — all against the
                  same agent state.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Frequently Asked Questions</h2>

                <h3 id="faq-web-ui" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Does Hermes have a web UI/dashboard?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Alongside the terminal CLI/TUI and the native desktop app, Hermes has a browser-based web dashboard.
                  You start it with <code>hermes dashboard</code>, which runs a local server (by default at{" "}
                  <code>http://127.0.0.1:9119</code>). Community documentation describes it as a FastAPI backend with a React
                  19 single-page app.
                </p>

                <h3 id="faq-open-dashboard" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">How do I open the Hermes dashboard?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Run <code>hermes dashboard</code> in your terminal, then open{" "}
                  <code>http://127.0.0.1:9119</code> in any browser. The server runs locally on your machine, so your data
                  stays on your computer unless you explicitly change the host binding to allow network access.
                </p>

                <h3 id="faq-desktop-platforms" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What platforms does the Hermes Desktop app support?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  macOS and Windows, via an installer you download from{" "}
                  <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent.nousresearch.com</a>.
                  It's been in public preview since June 2026 and gives you streaming tool output, a side-by-side preview
                  pane, a file browser, voice input/output, and a settings UI — no terminal required.
                </p>

                <h3 id="faq-free" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Are the desktop app and dashboard free?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes — both are free and open source under the MIT license, just like the rest of Hermes. Config lives in{" "}
                  <code>~/.hermes/</code> (secrets in <code>.env</code>, settings in <code>config.yaml</code>). You only pay
                  for the model inference you use.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official site & downloads</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-agent-desktop-web-ui" />
      <Footer />
    </div>
  );
};

export default HermesDesktopPost;
