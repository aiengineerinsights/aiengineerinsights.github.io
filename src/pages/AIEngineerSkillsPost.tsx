import { ArrowLeft, Clock, User, Calendar, ListChecks, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AIEngineerSkillsHeroDiagram from "@/components/AIEngineerSkillsHeroDiagram";
import TopmateCTA from "@/components/TopmateCTA";
import NewsletterSignup from "@/components/NewsletterSignup";

const RoadmapCTA = () => (
  <Card className="my-6 sm:my-8 p-5 sm:p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-blue-600/30">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
      <div className="min-w-0">
        <h3 className="font-semibold text-base sm:text-lg mb-1">Turn this checklist into a plan</h3>
        <p className="text-sm text-muted-foreground m-0">
          Get the free AI engineering roadmap PDF — these skills mapped into a phase-by-phase order to learn them in.
        </p>
      </div>
      <Link to="/ai-engineering-roadmap" className="shrink-0">
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Download the roadmap
        </Button>
      </Link>
    </div>
  </Card>
);

const AIEngineerSkillsPost = () => {
  const techData = [
    { skill: "Python (fluent)", what: "Idiomatic Python, typing, async basics, common libraries", prove: "A clean, tested codebase on GitHub" },
    { skill: "Software engineering", what: "Git, testing, code review, APIs, basic system design", prove: "A deployed service with real structure" },
    { skill: "ML / DL foundations", what: "Training, evaluation, overfitting, embeddings, transformers at a working level", prove: "A model built and evaluated end to end" },
    { skill: "LLM application skills", what: "Prompting, structured output, function calling, context management", prove: "An app where the LLM is reliable, not lucky" },
    { skill: "RAG & vector search", what: "Chunking, embeddings, retrieval, re-ranking, grounding", prove: "A RAG app with an evaluation harness" },
    { skill: "Agents & tool use", what: "Planning loops, tool/function calling, guardrails, failure handling", prove: "An agent doing a real multi-step task safely" },
    { skill: "Evaluation", what: "Offline evals, LLM-as-judge, regression tests for prompts/pipelines", prove: "Numbers that show your system got better" },
    { skill: "MLOps / deployment", what: "Serving, monitoring, cost & latency, CI/CD basics", prove: "Something live you can talk about operationally" },
  ];

  const seniorityData = [
    { level: "Junior", bar: "Ship a working LLM feature with guidance", focus: "Python + one solid end-to-end project (RAG or agent), basic evals, can deploy it" },
    { level: "Mid", bar: "Own a feature end to end and make it reliable", focus: "Strong software engineering, real evaluation discipline, cost/latency awareness, debugging LLM failures" },
    { level: "Senior", bar: "Design systems and set the technical direction", focus: "Architecture, trade-off judgment, mentoring, choosing when NOT to use an LLM, driving product outcomes" },
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-full px-3 py-1">
                  <ListChecks className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Engineer Skills in 2026: The Complete Checklist (Technical + Soft), by Seniority
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Job posts list twenty "requirements"; they collapse into a stack you can actually learn. Here's the honest
                skill list for an AI engineer in 2026 — the technical core, the LLM skills that <em>define</em> the role today,
                the soft skills that get you promoted, what to prioritize by seniority, and what's overrated. For each skill:
                what it means and how to prove you have it.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Beginner-friendly</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Aug 14, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />11 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <AIEngineerSkillsHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="the-stack" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. The Skill Stack in One Picture</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An AI engineer's skills sit in five layers on a software-engineering base: <strong>software engineering →
                  ML/DL foundations → LLM &amp; GenAI (the 2026 core) → MLOps &amp; deployment → judgment &amp; communication</strong>,
                  with just-enough math as a support rail. The insight most people miss: the <strong>LLM &amp; GenAI layer is what
                  turns a software engineer into an AI engineer</strong> — it's the differentiator, but it only works when the
                  base beneath it is solid. If you want the ordered path to acquire these,{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">start with the roadmap</Link>;
                  this post is the deep dive on the skills themselves.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="technical" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. The Technical Skills (and How to Prove Each)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  "Knowing about" a skill and being able to <em>show</em> it are different things. For each, the second column
                  is what actually gets you hired — a portfolio artifact beats a bullet point.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Skill</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it means</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How to prove it</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {techData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.skill}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.what}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.prove}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="the-2026-core" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. The LLM Skills That Define the Role in 2026</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you only sharpen one layer, make it this one. The 2026 AI engineer is measured on turning probabilistic
                  models into reliable products: <strong>RAG</strong> (grounding answers in your data), <strong>agents</strong>{" "}
                  and tool use (letting models act, safely), <strong>evaluation</strong> (proving it works and catching
                  regressions), and <strong>cost/latency engineering</strong> (making it affordable at scale). Evaluation is the
                  most under-practiced and most valued — anyone can demo an LLM once; few can show it stays good. If "agent"
                  still feels vague, our primer on{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">what makes an LLM agentic</Link>{" "}
                  breaks down exactly which properties matter.
                </p>
                <RoadmapCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="soft" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. The Soft Skills That Actually Get You Promoted</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Underrated, and the real ceiling on a career. The ones that matter most:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4 list-disc pl-5">
                  <li><strong>Problem framing</strong> — knowing which problems are worth an LLM and which are not. Senior engineers say "no" to AI more than juniors expect.</li>
                  <li><strong>Communication &amp; writing</strong> — explaining trade-offs to non-experts, writing clear design docs and project write-ups.</li>
                  <li><strong>Product sense</strong> — connecting the model to a user outcome, not a benchmark score.</li>
                  <li><strong>Pragmatism</strong> — shipping a reliable good-enough system over a fragile clever one, and knowing the difference.</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-seniority" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. What to Prioritize by Seniority</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You don't need all of it at once. The bar rises from "ship with help" to "set the direction."
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Level</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">The bar</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Skills to prioritize</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {seniorityData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.level}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.bar}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.focus}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="overrated" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Overrated vs. Underrated</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Where beginners misallocate time:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4 list-disc pl-5">
                  <li><strong>Overrated:</strong> deriving math from scratch, training foundation models yourself, memorizing every framework, collecting certificates.</li>
                  <li><strong>Underrated:</strong> evaluation, debugging why an LLM system fails, cost/latency, writing, and plain software-engineering rigor.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The gap between a demo and a product is almost entirely the "underrated" list. That's also where the salary is —
                  see the{" "}
                  <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">2026 AI engineer salary guide</Link>{" "}
                  for how those skills price out by level.
                </p>
                <TopmateCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Frequently Asked Questions</h2>

                <h3 id="faq-skills" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What skills do you need to be an AI engineer?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A software-engineering base (Python, Git, APIs, testing), ML/DL foundations, the LLM/GenAI core (prompting,
                  RAG, agents, evaluation), MLOps/deployment, right-sized math, and the soft skills of problem framing and
                  communication. Aim for working competence across the stack rather than mastery of any single layer.
                </p>

                <h3 id="faq-coding" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Do AI engineers need to be good at coding and math?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Coding: yes, genuinely — it's a software-engineering role at its core. Math: you need working intuition for
                  linear algebra, probability, and a little calculus, but not research-level depth. Reasoning about model
                  behavior matters more than deriving proofs.
                </p>

                <h3 id="faq-most-important" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What's the most important AI engineering skill in 2026?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Evaluation. Building an LLM demo is easy; proving it's reliable and catching regressions as prompts, models,
                  and data change is hard — and it's what separates a hobby project from a production system employers pay for.
                </p>

                <h3 id="faq-noncoders" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can non-coders become AI engineers?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Not without learning to code. "AI engineer" is an engineering role — Python and software fundamentals are the
                  entry ticket. Prompt-only roles exist, but they aren't AI engineering and don't command the same pay or
                  durability.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="next" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Turn Skills Into a Plan</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A checklist is only useful in the right order. Pair this with the{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">step-by-step roadmap</Link>{" "}
                  to sequence these skills, and grab the free PDF to keep the whole plan in one place.
                </p>
                <RoadmapCTA />
                <NewsletterSignup />
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/ai-engineer-skills" />
      <Footer />
    </div>
  );
};

export default AIEngineerSkillsPost;
