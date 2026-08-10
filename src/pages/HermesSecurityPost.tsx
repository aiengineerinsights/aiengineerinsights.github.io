import { ArrowLeft, Clock, User, Calendar, ShieldCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesSecurityHeroDiagram from "@/components/HermesSecurityHeroDiagram";

const HermesSecurityPost = () => {
  const layerData = [
    {
      layer: "1. User authorization",
      does: "Gates who is allowed to drive the agent in the first place, before any command runs.",
      control: "Keep the agent scoped to you; don't expose local dashboards or gateways to the network without auth.",
    },
    {
      layer: "2. Dangerous-command approval",
      does: "Stages risky actions (destructive or high-impact commands) for a human to confirm instead of running them silently.",
      control: "Leave command approval on — it's the checkpoint between a plan and a mistake.",
    },
    {
      layer: "3. Container isolation",
      does: "Runs the agent's execution in a sandbox by default, so commands hit an isolated environment, not your host.",
      control: "Choose a backend: Local for speed, Docker/SSH/Modal/Daytona/Singularity for untrusted or repeatable tasks.",
    },
    {
      layer: "4. Credential filtering",
      does: "Keeps your API keys and secrets out of the model context the agent works from.",
      control: "Store secrets in ~/.hermes/.env, keep the file protected, and scope each API key narrowly.",
    },
    {
      layer: "5. Context scanning",
      does: "Inspects the content flowing into the agent's context to reduce what an attacker can smuggle in.",
      control: "Treat untrusted inputs (web pages, files, messages) as hostile and run those tasks in a sandbox backend.",
    },
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
                  <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Agentic Security</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Is Hermes Agent Safe? Its Security Model and Sandboxing, Explained
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Short answer: Hermes Agent is <strong>as safe as any agent that runs commands on your machine and holds
                your credentials can be — because it ships defense-in-depth by default instead of making you bolt
                security on</strong>. Five layers wrap every action: user authorization, dangerous-command approval,
                container isolation, credential filtering, and context scanning. Execution is sandboxed by default with
                pluggable backends (Local, Docker, SSH, Singularity, Modal, Daytona). Keep command approval on and run
                untrusted work in a Docker/sandbox backend, and the blast radius stays small.
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
                      Advanced
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

            {/* Hero Diagram */}
            <HermesSecurityHeroDiagram />

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="is-hermes-safe" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Is Hermes Agent Safe?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes — with the caveat that any autonomous agent is a security surface the moment it can{" "}
                  <strong>run commands on your machine and hold your credentials</strong>. That is not a Hermes quirk; it is
                  the nature of the job. What separates Hermes is that it treats security as a <strong>default posture, not an
                  add-on</strong>: the agent ships defense-in-depth out of the box, so you inherit sane protection before you
                  configure anything. If you want the wider architecture context first, our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">guide to Hermes Agent by Nous Research</Link>{" "}
                  covers what the framework is and how it's built.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The right way to judge "is it safe?" is to ask about <strong>blast radius</strong>: if the agent goes wrong —
                  a prompt injection, a bad tool call, a hallucinated <code>rm -rf</code> — how far can the damage reach? An
                  agent's blast radius equals its <strong>execution model plus its credential model</strong>. Hermes narrows
                  both with five layers, described next.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="five-layers" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. The Five Layers of Defense in Depth</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes wraps every action in five layers. Each one assumes the layer inside it might fail — that is what
                  "defense in depth" means. Here's what each layer does and the lever you control:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Layer</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How you control it</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {layerData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.layer}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.does}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.control}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Notice the pattern: authorization decides <em>who</em>, approval decides <em>whether</em>, isolation decides{" "}
                  <em>where</em>, credential filtering decides <em>what secrets the model can see</em>, and context scanning
                  decides <em>what data reaches the model</em>. No single layer is load-bearing on its own.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-sandbox" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. How Does Hermes Sandbox Execution?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Execution is <strong>sandboxed by default</strong>, and the sandbox is pluggable — you pick the backend that
                  matches how much you trust the task. This is layer 3 from the table above, and it is the single biggest lever
                  on blast radius. Why it matters is not theoretical: an agent that escapes its sandbox can reach the rest of
                  your system, as our writeup on{" "}
                  <Link to="/blog/openai-models-hacked-hugging-face" className="text-primary hover:underline">OpenAI's models escaping a sandbox and hacking Hugging Face</Link>{" "}
                  shows in detail.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Local</strong> — fastest iteration on your own machine, no isolation. Use it only for tasks and inputs you already trust.</li>
                  <li>• <strong>Docker</strong> — container isolation for untrusted or repeatable tasks. The default recommendation when you're unsure.</li>
                  <li>• <strong>SSH</strong> — run the agent's hands on a remote box you control, keeping your primary machine out of reach.</li>
                  <li>• <strong>Singularity</strong> — isolation for HPC and research-cluster environments.</li>
                  <li>• <strong>Modal / Daytona</strong> — serverless cloud sandboxes that spin up per task and scale to zero.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Rule of thumb: <strong>anything untrusted or repeatable goes in Docker or an isolated backend.</strong> Reserve
                  Local for quick, trusted work on inputs you control. If you haven't installed Hermes yet, our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">step-by-step install guide</Link>{" "}
                  covers the Docker path directly.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skills-safety" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Skills Safety: Reviewing What the Agent Writes</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes can write its own skills — reusable procedures it authors as it solves problems. That is powerful, and
                  it is also a write path onto your disk, so it deserves a gate. Enabling{" "}
                  <code>write_approval</code> <strong>stages every skill write</strong> — create, edit, patch, or delete — for
                  your review instead of letting the agent write freely.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you run agent-authored skills, turn this on. It converts "the agent silently rewrote a skill" into "the
                  agent proposed a change and I approved it" — the same human-in-the-loop principle as dangerous-command
                  approval, applied to the agent's procedural memory.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="config-secrets" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Where Config and Secrets Live</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two files matter for security, both under <code>~/.hermes/</code>:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base font-mono">
                    <li>• <strong>~/.hermes/.env</strong> — your API keys and secrets. Keep it protected (restrictive file permissions; never commit it).</li>
                    <li>• <strong>~/.hermes/config.yaml</strong> — settings, including approval and sandbox choices.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Credential filtering (layer 4) keeps those secrets out of the model's context, but that protection assumes
                  the file itself is locked down. Treat <code>~/.hermes/.env</code> the way you'd treat any secrets file.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="best-practices" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Security Best Practices Checklist</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes gives you safe defaults; these habits keep them that way:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Keep command approval on.</strong> The confirmation prompt is your last line before a destructive action.</li>
                  <li>• <strong>Run untrusted tasks in a Docker/sandbox backend.</strong> Never point the Local backend at inputs you don't trust.</li>
                  <li>• <strong>Scope API keys narrowly.</strong> Least privilege caps what a leaked or misused key can do.</li>
                  <li>• <strong>Review agent-authored skills.</strong> Enable <code>write_approval</code> so skill writes are staged for you.</li>
                  <li>• <strong>Don't expose local dashboards or gateways to the network without auth.</strong> An open port is an open door into your agent.</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Frequently Asked Questions</h2>

                <h3 id="faq-safe" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is Hermes Agent safe to run on my main machine?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For trusted tasks, yes — execution is sandboxed by default and dangerous commands require approval. For
                  untrusted or experimental work, run it in a Docker or other isolated backend so a mistake or injection can't
                  reach your host. The safety comes from matching the backend to how much you trust the task.
                </p>

                <h3 id="faq-credentials" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can Hermes leak my API keys?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Credential filtering keeps your keys out of the model context, and secrets live in the protected{" "}
                  <code>~/.hermes/.env</code> file rather than in prompts. Scope each key narrowly and keep that file locked
                  down, and a single compromised key stays low-impact.
                </p>

                <h3 id="faq-sandbox-backend" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Which sandbox backend should I use?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Local for fast, trusted iteration; Docker for untrusted or repeatable tasks (the safe default); SSH to push
                  execution onto a remote box; Singularity for HPC clusters; and Modal or Daytona for serverless cloud
                  sandboxes. When in doubt, use Docker.
                </p>

                <h3 id="faq-write-approval" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What does write_approval do?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It stages every skill write the agent attempts — create, edit, patch, or delete — for your review instead of
                  letting the agent modify skills freely. Turn it on if you rely on agent-authored skills and want a human in
                  the loop on that write path.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official documentation</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-agent-security" />
      <Footer />
    </div>
  );
};

export default HermesSecurityPost;
