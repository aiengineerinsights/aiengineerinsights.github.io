import { ArrowLeft, Clock, User, Calendar, Route, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import BecomeAIEngineerHeroDiagram from "@/components/BecomeAIEngineerHeroDiagram";
import TopmateCTA from "@/components/TopmateCTA";
import NewsletterSignup from "@/components/NewsletterSignup";

// Reusable conversion CTA — funnels this career/MoFu traffic to the roadmap PDF,
// which is the page that already ranks and converts (pos ~1.7 for "roadmap pdf").
const RoadmapCTA = () => (
  <Card className="my-6 sm:my-8 p-5 sm:p-6 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 border-emerald-600/30">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
      <div className="min-w-0">
        <h3 className="font-semibold text-base sm:text-lg mb-1">Get the full roadmap as a free PDF</h3>
        <p className="text-sm text-muted-foreground m-0">
          The complete phase-by-phase AI engineering roadmap — skills, order, and milestones — in one downloadable page.
        </p>
      </div>
      <Link to="/ai-engineering-roadmap" className="shrink-0">
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
          <Download className="mr-2 h-4 w-4" />
          Download the roadmap
        </Button>
      </Link>
    </div>
  </Card>
);

const HowToBecomeAIEngineerPost = () => {
  const phaseData = [
    { phase: "1 · Foundations", time: "1–3 months", focus: "Python, Git, the command line, core CS (data structures, APIs), and just-enough math (linear algebra, probability, calculus intuition). Don't over-invest in theory here." },
    { phase: "2 · Core ML / DL", time: "2–4 months", focus: "How models learn: regression, classification, neural nets, training/validation, overfitting, evaluation metrics. Build a few small models end to end so the concepts are concrete." },
    { phase: "3 · AI Engineering", time: "2–4 months", focus: "The modern job: LLMs, prompting, RAG, vector databases, agents and tool use, function calling, evaluation, and cost/latency trade-offs. This is what most 2026 'AI engineer' roles actually want." },
    { phase: "4 · Build & Specialize", time: "ongoing", focus: "Ship 2–4 real projects that solve a real problem, pick a niche (agents, RAG search, MLOps, a domain), and turn the projects into a portfolio." },
    { phase: "5 · Get Hired", time: "1–3 months", focus: "Tighten your resume around shipped work, target the right role (AI engineer, ML engineer, forward-deployed), practice system-design + LLM questions, and apply with a portfolio that proves it." },
  ];

  const skillData = [
    { area: "Programming", skills: "Python (fluent), Git, APIs, basic SQL, the terminal", why: "Everything is built and glued together in code — this is non-negotiable." },
    { area: "ML / DL foundations", skills: "Training, evaluation, embeddings, transformers at a working level", why: "You don't need to derive backprop, but you must know why a model behaves as it does." },
    { area: "LLM & GenAI", skills: "Prompting, RAG, vector DBs, agents/tool use, function calling, evals", why: "The core of the modern role — how to make LLMs reliable in a product." },
    { area: "Software engineering", skills: "Clean code, testing, version control, code review, basic system design", why: "AI engineers ship production systems, not notebooks." },
    { area: "MLOps / deployment", skills: "APIs, containers, monitoring, cost/latency management, CI/CD basics", why: "Getting a model live and keeping it reliable is half the job." },
    { area: "Math (right-sized)", skills: "Linear algebra, probability, a little calculus — intuition over proofs", why: "Enough to reason about models; not a math degree." },
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-blue-700 rounded-full px-3 py-1">
                  <Route className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                How to Become an AI Engineer in 2026: A Practical, Step-by-Step Roadmap
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                The honest version: <strong>you don't need a PhD, and most people can get there in roughly 6–18 months of
                focused work</strong> — faster if you already write software or work with data. What you do need is to learn
                the <em>right</em> things in the <em>right</em> order, build real projects, and specialize. This is the path,
                the skills that actually matter in 2026, and how to land the role.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-blue-700 flex items-center justify-center flex-shrink-0">
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
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />13 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <BecomeAIEngineerHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="short-answer" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. The Short Answer</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Can you become an AI engineer without a PhD or a CS degree?</strong> Yes. The field rewards
                  demonstrable skill and shipped projects over credentials. <strong>How long does it take?</strong> With
                  consistent effort, most people reach job-ready in <strong>6–18 months</strong> — closer to 6 if you already
                  code or work in data, closer to 18 if you're starting from scratch. The mistake that wastes the most time is
                  trying to learn everything: you don't need to master research-level math or every framework. You need a
                  focused path.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  That path has five phases — foundations, core ML/DL, AI engineering, build &amp; specialize, and get hired —
                  which the rest of this guide walks through. If you'd rather have the whole thing as a checklist you can keep,
                  grab the free PDF:
                </p>
                <RoadmapCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. What an AI Engineer Actually Does (vs. Data Scientist / ML Engineer)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An <strong>AI engineer</strong> builds products powered by models — especially LLMs. In 2026 that usually
                  means wiring language models into real systems: retrieval (RAG), agents and tool use, evaluation, and getting
                  it all to run reliably and affordably in production. It's a software-engineering role with an AI core.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The neighbors are often confused. A <strong>data scientist</strong> leans toward analysis, statistics, and
                  insight; an <strong>ML engineer</strong> leans toward training, serving, and optimizing custom models; an
                  <strong> AI engineer</strong> leans toward composing existing models (mostly via APIs) into applications. The
                  lines blur, and titles vary by company — but if you enjoy <em>building things people use</em> more than
                  research, AI engineering is the fit. If the word "agent" still feels fuzzy, our explainer on{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">what makes an LLM agentic</Link>{" "}
                  is a good primer for phase 3.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="the-path" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. The 5-Phase Path</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Order matters more than speed. Each phase builds on the last; skipping foundations to jump straight to
                  agents is the classic way to get stuck. Rough timings assume ~10 focused hours a week.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Phase</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Typical time</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What to focus on</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {phaseData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.phase}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.time}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.focus}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <RoadmapCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skills" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. The Skills You Actually Need</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Job posts list dozens of "requirements," but they collapse into six areas. Aim for working competence, not
                  perfection — you'll deepen the rest on the job.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Area</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What to learn</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why it matters</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {skillData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.area}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.skills}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.why}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Notice what's <em>not</em> here: you don't need to invent architectures or train foundation models from
                  scratch. The 2026 AI engineer's edge is making existing models reliable, cheap, and useful in a product.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="portfolio" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Build a Portfolio That Gets Interviews</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Projects beat certificates. Two or three <strong>real</strong> projects that solve a real problem will do
                  more than a wall of course completions. Good signals to build:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4 list-disc pl-5">
                  <li>A <strong>RAG app</strong> over a dataset you care about — with evaluation, not just a demo that "works once."</li>
                  <li>An <strong>agent</strong> that does a genuinely useful multi-step task, with tool use and guardrails.</li>
                  <li>Something <strong>deployed and monitored</strong> — a public URL, an API, cost/latency you can talk about.</li>
                  <li>A short write-up per project: the problem, your approach, what broke, what you'd do next. This is what interviewers actually read.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Depth beats breadth. One polished, deployed, evaluated project signals more competence than five weekend
                  demos.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="get-hired" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. How to Get Hired</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Target the right role. "AI engineer," "ML engineer," "GenAI engineer," and the fast-growing{" "}
                  <Link to="/blog/forward-deployed-ai-engineer" className="text-primary hover:underline">forward-deployed AI engineer</Link>{" "}
                  all value shipped LLM work — but weight skills differently, so read the posting, not just the title. Build your
                  resume around <em>outcomes</em> ("built a RAG system that cut support resolution time 30%"), not tools.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Know the market you're entering: pay ranges widely by level, company, and city — we break the real numbers
                  down in the{" "}
                  <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">2026 AI engineer salary guide</Link>.
                  Prep for LLM-flavored system design ("design a RAG pipeline," "how would you evaluate this agent") alongside
                  standard coding rounds, and let your portfolio carry the interview.
                </p>
                <TopmateCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="timeline" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. A Realistic Timeline by Starting Point</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4 list-disc pl-5">
                  <li><strong>Software engineer →</strong> ~6–9 months. You have phases 1 and 5 mostly covered; focus on ML/DL and AI engineering.</li>
                  <li><strong>Data analyst / scientist →</strong> ~6–12 months. Strong on data and some ML; add software engineering, deployment, and LLM systems.</li>
                  <li><strong>Adjacent tech (IT, QA, PM) →</strong> ~9–15 months. Build the programming base first, then follow the path in order.</li>
                  <li><strong>Complete beginner →</strong> ~12–18 months. Entirely doable — be patient through foundations; that's where most people quit.</li>
                </ul>
                <RoadmapCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Frequently Asked Questions</h2>

                <h3 id="faq-degree" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Do you need a degree to become an AI engineer?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  No. A CS or related degree helps and some employers prefer it, but many AI engineers are self-taught or come
                  from adjacent fields. A strong portfolio of shipped, evaluated projects consistently outweighs a credential.
                </p>

                <h3 id="faq-howlong" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">How long does it take to become an AI engineer?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Roughly 6–18 months of consistent, focused study and building — faster if you already have a software or data
                  background, longer if you're starting from zero. Following the phases in order is what keeps it on the short
                  end.
                </p>

                <h3 id="faq-noexp" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I become an AI engineer with no experience?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes, but start with programming foundations before anything AI-specific — that's the base everything else sits
                  on. Then follow the path and let real projects become your "experience." Most complete beginners get there in
                  about 12–18 months.
                </p>

                <h3 id="faq-vs" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">AI engineer vs. ML engineer vs. data scientist — what's the difference?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Broadly: data scientists analyze and model for insight; ML engineers train, serve, and optimize models; AI
                  engineers compose existing models (often LLMs via APIs) into products. Titles overlap and vary by company, so
                  read the actual responsibilities.
                </p>

                <h3 id="faq-late" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Is it too late / is the field too saturated?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Entry-level anything is competitive, but demand for people who can actually ship reliable LLM systems still
                  outstrips supply. The saturation is in "I did a prompt course," not in "I can build and evaluate a production
                  RAG/agent system." Aim for the second.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="next" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Your Next Step</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Pick your phase, commit to ~10 hours a week, and start building in public. The single most useful thing you
                  can do right now is grab the full roadmap so you always know the next step — and keep our{" "}
                  <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">salary guide</Link> and{" "}
                  <Link to="/blog/forward-deployed-ai-engineer" className="text-primary hover:underline">forward-deployed role guide</Link>{" "}
                  handy for when you reach phase 5.
                </p>
                <RoadmapCTA />
                <NewsletterSignup />
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/how-to-become-an-ai-engineer" />
      <Footer />
    </div>
  );
};

export default HowToBecomeAIEngineerPost;
