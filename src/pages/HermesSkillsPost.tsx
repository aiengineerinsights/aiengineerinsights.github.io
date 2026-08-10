import { ArrowLeft, Clock, User, Calendar, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesSkillsHeroDiagram from "@/components/HermesSkillsHeroDiagram";

const HermesSkillsPost = () => {
  const actionData = [
    { action: "write", does: "Create a brand-new skill (the agent auto-writes these into ~/.hermes/skills/)" },
    { action: "edit", does: "Rewrite an existing skill's content in place" },
    { action: "patch", does: "Apply a targeted change to part of a skill without rewriting the whole file" },
    { action: "delete", does: "Remove a skill you no longer want the agent to reach for" },
    { action: "write_file", does: "Add a supporting file inside a skill directory (scripts, templates, notes)" },
    { action: "remove_file", does: "Delete a supporting file from a skill directory" },
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
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Hermes Agent Skills: How Self-Improving Skills Actually Work
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Hermes Agent skills are versioned, self-improving procedures stored as markdown files
                (<code className="text-sm">SKILL.md</code> with YAML frontmatter) in{" "}
                <code className="text-sm">~/.hermes/skills/</code>. The agent auto-creates them from completed
                workflows and via a background self-improvement review that runs after a turn — so a repeat task
                skips the exploration phase and finishes faster and cheaper. You load one with{" "}
                <code className="text-sm">hermes -s &quot;skill-name&quot;</code>, manage them with{" "}
                <code className="text-sm">skill_manage</code> actions, and gate every write behind review with{" "}
                <code className="text-sm">write_approval</code>. Here is how the whole loop works.
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
                      8 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Hero Diagram */}
            <HermesSkillsHeroDiagram />

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-are-skills" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. What Are Hermes Agent Skills?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Skills are versioned, self-improving procedures the agent stores as markdown files</strong> —
                  one <code>SKILL.md</code> per skill, with YAML frontmatter at the top and the procedure written out
                  below it, kept in <code>~/.hermes/skills/</code>. Think of a skill as a saved &quot;how I solved this
                  last time&quot; note that the agent can read back before it starts working. If you want the wider
                  picture of where skills sit in the system, our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">complete guide to Hermes Agent by Nous Research</Link>{" "}
                  walks through the architecture around them.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The reason this matters: most agent frameworks cold-start every task, re-deriving the same steps from
                  scratch each time. Skills are Hermes&apos;s <strong>procedural memory</strong> — the differentiator that
                  lets a repeat task reuse a known-good path instead of re-exploring it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="self-improving" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. What Makes Skills &quot;Self-Improving&quot;?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two behaviors earn the &quot;self-improving&quot; label. First, the agent <strong>auto-creates skills
                  from completed workflows</strong> — when it finishes a task, the solution path is a candidate to be
                  saved. Second, a <strong>background self-improvement review runs after a turn</strong>, distilling what
                  just happened into a reusable skill without you asking for it.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The payoff is concrete: because the next similar task can load an existing skill, the exploration phase
                  is short-circuited — <strong>fewer tokens, fewer wrong turns, faster and cheaper completion</strong>.
                  That is the whole point of procedural memory, and it is the loop most serious agent stacks are moving
                  toward. If the word &quot;agentic&quot; is doing a lot of work here, this behavior is a textbook example
                  of it in shipping code.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="where-stored" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Where Are Skills Stored, and How Are They Organized?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Skills live in <code>~/.hermes/skills/</code>. Each skill is a directory containing a{" "}
                  <code>SKILL.md</code> file, and you can group related skills into subdirectories to keep the folder
                  legible as it grows:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>~/.hermes/skills/devops/</div>
                  <div>~/.hermes/skills/research/</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Agent-created skills are written into <code>~/.hermes/skills/</code>. Existing skills are modified in
                  place — including any that live under configured <code>external_dirs</code>, so shared or external skill
                  folders update where they already are rather than being copied.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skill-manage" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. How Do You Manage Skills? The <code>skill_manage</code> Actions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Both you and the agent manage skills through <code>skill_manage</code> actions. Here is what each one
                  does:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Action</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it does</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {actionData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 font-mono">{row.action}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.does}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice, the agent leans on <code>write</code> to save what it just learned, then <code>edit</code>{" "}
                  and <code>patch</code> to refine a skill over time as it hits edge cases — which is the &quot;versioned&quot;
                  part of the definition doing its job.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="load-a-skill" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. How Do You Load a Skill?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  When you want the agent to reach for a specific skill on the next task, load it explicitly. From the
                  shell, pass the skill name with <code>-s</code>; inside the CLI, use the slash command:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes -s &quot;skill-name&quot;   # load a skill at launch</div>
                  <div>/skill skill-name        # load a skill from inside the CLI</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is how you steer the agent toward a proven procedure instead of hoping it rediscovers it. Haven&apos;t
                  installed Hermes yet? Our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">step-by-step guide to installing Hermes Agent</Link>{" "}
                  covers every platform, and skills work the same way regardless of how you installed it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="manual-vs-auto" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Manual vs. Auto Skill Creation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You do not have to wait for the agent to write a skill — you can author one by hand. Create the skill
                  directory and a <code>SKILL.md</code> file with YAML frontmatter, or scaffold it with the CLI:
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>mkdir -p ~/.hermes/skills/research</div>
                  <div># then create ~/.hermes/skills/research/SKILL.md with YAML frontmatter</div>
                  <div>hermes skills create     # or scaffold it interactively</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The two creation paths coexist: hand-written skills capture procedures you already know, while
                  auto-created skills capture what the agent discovers while working. Both end up as the same{" "}
                  <code>SKILL.md</code> format in the same folder.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="write-approval" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Staying in Control: <code>write_approval</code></h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A self-writing agent editing files on your machine deserves a safety valve, and Hermes has one. When{" "}
                  <strong><code>write_approval</code> is enabled, every <code>skill_manage</code> write is staged rather
                  than committed</strong> — the change is held for your review instead of the agent writing it freely.
                  You get to see exactly what the agent wants to save before it lands in{" "}
                  <code>~/.hermes/skills/</code>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you are still weighing whether Hermes&apos;s approach fits your workflow, our{" "}
                  <Link to="/blog/hermes-agent-vs-openclaw" className="text-primary hover:underline">Hermes Agent vs OpenClaw comparison</Link>{" "}
                  puts its memory and control model side by side with the alternative.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="portability" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Sharing Skills: The Skills Hub and the Open Standard</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Skills are portable. Because they are plain markdown files, you can share them with others through the{" "}
                  <strong>Skills Hub</strong>, and they are compatible with the open standard at{" "}
                  <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">agentskills.io</a>.
                  That means a procedure your agent learned can be handed to a teammate&apos;s agent — the accumulated
                  know-how is not locked inside one install.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Frequently Asked Questions</h2>

                <h3 id="faq-what-is-a-skill" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What is a Hermes Agent skill?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It is a versioned, self-improving procedure stored as a <code>SKILL.md</code> markdown file (with YAML
                  frontmatter) in <code>~/.hermes/skills/</code>. The agent can write skills automatically and reuse them
                  on later tasks so it does not have to re-solve the same problem from scratch.
                </p>

                <h3 id="faq-auto-create" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Does Hermes create skills automatically?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. The agent auto-creates skills from completed workflows, and a background self-improvement review
                  runs after a turn to distill what it just did into a reusable skill. You can also write skills manually.
                </p>

                <h3 id="faq-load" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">How do I load a specific skill?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Launch with <code>hermes -s &quot;skill-name&quot;</code>, or run <code>/skill skill-name</code> from
                  inside the CLI. Skills you (or the agent) have saved live in <code>~/.hermes/skills/</code>.
                </p>

                <h3 id="faq-control" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I stop the agent from writing skills without my approval?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Enable <code>write_approval</code> and every <code>skill_manage</code> write is staged for your
                  review instead of being committed automatically, so nothing lands in your skills folder until you
                  approve it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">10. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — Skills documentation</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-agent-skills" />
      <Footer />
    </div>
  );
};

export default HermesSkillsPost;
