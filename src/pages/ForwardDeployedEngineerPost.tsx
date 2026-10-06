import { ArrowLeft, Clock, User, Calendar, Briefcase, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ForwardDeployedHeroDiagram from "@/components/ForwardDeployedHeroDiagram";
import TopmateCTA from "@/components/TopmateCTA";
import NewsletterSignup from "@/components/NewsletterSignup";

const roleCompare = [
  { role: "Forward-Deployed Engineer", owns: "End-to-end production delivery inside the customer", ships: "Working systems in prod", note: "Same person maps it and maintains it" },
  { role: "Solutions Engineer", owns: "Configuring an existing product to fit", ships: "Configured deployments", note: "Rarely writes net-new production code" },
  { role: "Sales Engineer", owns: "Technical enablement of a deal", ships: "Demos, POCs, answers", note: "Hands off before production" },
  { role: "ML Engineer", owns: "Building and training the models", ships: "Models, pipelines", note: "Platform-side, not customer-embedded" },
  { role: "Product Engineer", owns: "Building the platform for everyone", ships: "General product features", note: "One-to-many, not one customer" },
];

const payTable = [
  { company: "Palantir (FDSE)", band: "$171K–$295K total · ~$211K median", note: "Levels.fyi 2026 — the original role" },
  { company: "OpenAI (FDE)", band: "$160K–$280K base (mid); senior total far higher", note: "SF; up to ~50% travel; equity-heavy" },
  { company: "Anthropic (Applied AI)", band: "Frontier-lab comp; senior totals reported into the high six figures", note: "Mostly equity; embeds with strategic customers" },
  { company: "Google Cloud (FDE)", band: "$127K–$183K base + equity", note: "Published salary bands" },
  { company: "Salesforce / enterprise AI", band: "Competitive; varies by level", note: "Growing FDE-equivalent hiring" },
];

const faqs = [
  {
    q: "What is a forward-deployed engineer in simple terms?",
    a: "A software engineer who embeds with a customer — on-site, remote, or inside their cloud — learns the domain, and writes production code against the customer's real data and systems. The defining trait is end-to-end ownership: the person who scopes the problem is the person who keeps it running months later.",
  },
  {
    q: "How is an FDE different from a consultant or solutions engineer?",
    a: "Consultants deliver reports and recommendations; solutions engineers configure an existing product. An FDE builds and owns the actual system that runs in production. It's a builder role with delivery accountability, not an advisory or configuration role.",
  },
  {
    q: "How much does a forward-deployed AI engineer make?",
    a: "Reported bands in 2026: Google Cloud roughly $127K–$183K base plus equity, and OpenAI mid-level roughly $160K–$280K in San Francisco (with up to ~50% travel). Lab equity can push total compensation well above base. Treat specific numbers as point-in-time and role-dependent.",
  },
  {
    q: "Which companies hire forward-deployed engineers?",
    a: "Palantir originated the role and still hires heavily for it (as Forward Deployed and Deployment Strategist tracks). The frontier AI labs — OpenAI and Anthropic — now hire FDEs, as does Google Cloud, plus enterprise-AI firms like Salesforce, Databricks, and Scale AI. Search for 'forward deployed engineer jobs' at these companies' careers pages, where hiring has risen sharply through 2025–2026.",
  },
  {
    q: "Is the forward-deployed engineer role worth it?",
    a: "It's a strong fit if you like shipping real systems against messy real data, enjoy customer contact, and want unusually direct impact and comp. It's a poor fit if you want deep, uninterrupted focus on a single codebase, dislike travel, or prefer platform work over customer-facing delivery.",
  },
  {
    q: "What does the forward-deployed engineer interview process involve?",
    a: "Expect a recruiter screen, a coding screen, a customer-flavoured design or take-home exercise, and a hiring-manager round, typically over 3–4 weeks. Palantir's loop is known for a 'decomposition' round (breaking a vague real-world problem into data, APIs, and components without coding) and a 'learning' round (extending an unfamiliar system quickly). OpenAI's reported loop includes a roughly one-week take-home that you then present and defend to the team, with evaluation centred on explaining technical choices in plain language and tying them to the customer's use case.",
  },
  {
    q: "How long does it take to become FDE-ready?",
    a: "If you already ship backend or ML code to production, a focused 90 days is enough to build the specific evidence FDE loops screen for: one real RAG or agent system with an eval suite, a deployment inside a constrained environment, and a written decomposition of a messy problem. If you're starting from scratch, work the AI engineering roadmap first — Foundation and Core AI take most people 6–12 months before the Engineering phase makes sense.",
  },
  {
    q: "Do forward-deployed engineers have to travel?",
    a: "Usually some, and sometimes a lot. The role exists because being physically or organisationally close to the customer is what unblocks delivery, so postings commonly list travel — OpenAI's FDE listings cite up to ~50%, and Palantir's forward-deployed track has historically been on-site with customers. Remote-embedded variants exist (working inside the customer's cloud rather than their office), but assume regular customer-site time unless the listing says otherwise.",
  },
];

const BlogPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-indigo-800 rounded-full px-3 py-1">
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                The Forward-Deployed AI Engineer: What the Role Actually Is, What It Pays, and Whether You Should Go For It
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                A forward-deployed engineer (FDE) is a software engineer who embeds with a customer and owns an AI system
                end to end — scoping it, writing the production code, and keeping it running. Palantir invented the role in
                2005; in 2026 OpenAI, Anthropic, and Google are hiring it hard. Here's what the job is, how it compares to
                adjacent titles, what it pays, and how to break in.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
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
                      Career Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jul 29, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      14 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <ForwardDeployedHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">TL;DR</p>
                <p className="text-sm sm:text-base leading-relaxed mb-0">
                  A forward-deployed AI engineer is a software engineer who embeds with one customer, writes production
                  code against that customer's real data and systems, and stays accountable for the result after launch.
                  Palantir created the role; OpenAI, Anthropic, Google Cloud, and enterprise-AI firms like Databricks,
                  Scale AI, and Salesforce now hire for it. Reported 2026 bands run from roughly $127K–$183K base at
                  Google Cloud to $171K–$295K total compensation at Palantir, with frontier-lab equity pushing totals
                  higher.
                </p>
              </div>

              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is a forward-deployed AI engineer?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A forward-deployed engineer embeds directly in a customer's environment — on-site, remote, or inside the
                  customer's own cloud/VPC — learns the domain end to end, and ships production code against the customer's
                  real data and systems. The line that separates it from consulting is simple: <strong>consultants deliver
                  reports; an FDE delivers the running system.</strong>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The defining trait is <strong>end-to-end accountability</strong>. The same engineer who maps the problem
                  on day one is the one who gets paged when it breaks in production six months later. That single fact
                  shapes everything about how the role hires, works, and pays.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="why-now" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why are AI labs suddenly hiring for it?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Because shipping AI in production needs two bodies of knowledge that live on opposite sides of a contract.
                  The customer's team knows the data schemas, compliance rules, legacy systems, and edge cases. The lab's
                  engineers know how models actually behave — prompting patterns, RAG strategies, evaluation frameworks, and
                  the failure modes that only appear at scale. <strong>Neither side has the other's knowledge, and you need
                  both to ship something that runs.</strong> The FDE is the person who holds both at once.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Palantir built this function in 2005 selling its Gotham platform into intelligence agencies, precisely
                  because traditional consultants couldn't write production code and solutions engineers couldn't reshape
                  the product. Two decades later the AI labs hit the same wall with enterprise customers — and copied the
                  playbook. OpenAI stood up its FDE team in late 2024 and scaled it through 2025; Anthropic runs the
                  function under its Applied AI group; Google Cloud hires FDE-equivalent roles with published salary bands.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="vs-other-roles" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How does it differ from solutions, sales, ML, and product engineers?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The titles overlap in job listings, but the ownership is different. The FDE is the only one on this list
                  who both writes net-new production code <em>and</em> owns it in the customer's environment after launch.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Role</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Owns</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Ships</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Key difference</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {roleCompare.map((r) => (
                            <TableRow key={r.role}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.role}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.owns}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.ships}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skills" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What skills does the role actually demand?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It's a production-AI skill set with a customer-facing edge. Job postings converge on:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                    <li>• <strong>RAG pipelines</strong> — chunking, vector databases (pgvector, Pinecone, Weaviate), embeddings, reranking</li>
                    <li>• <strong>Evaluation engineering</strong> — building eval suites for hallucinations, regressions, and grounding (the 2026 non-negotiable)</li>
                    <li>• <strong>Agents</strong> — multi-step tool-use chains and orchestration frameworks</li>
                    <li>• <strong>Production observability</strong> — latency, token usage, error rates, output drift</li>
                    <li>• <strong>Security &amp; compliance</strong> — deploying inside client-controlled, on-prem or private-cloud infrastructure</li>
                    <li>• <strong>Prompt architecture</strong> — system prompts, structured outputs, guardrails at scale</li>
                    <li>• <strong>Client communication</strong> — the soft skill that separates FDEs from pure builders</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If that list looks familiar, it's the same production discipline behind our{" "}
                  <Link to="/blog/llm-deployment-challenges" className="text-primary hover:underline">LLM deployment challenges</Link>{" "}
                  and{" "}
                  <Link to="/blog/mlops-best-practices" className="text-primary hover:underline">MLOps best practices</Link> —
                  an FDE is someone who can do all of it inside someone else's org. For the full, prioritised list with
                  how to prove each one, see the{" "}
                  <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">AI engineer skills guide</Link>.
                </p>
              </section>

              <NewsletterSignup
                heading="Want the role? Get the AI engineering roadmap"
                subtext="The exact skills, projects, and interview prep for AI engineering roles like FDE — one practical email a week, plus the free 2026 roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="pay" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does a forward-deployed AI engineer get paid (by company)?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Short answer: <strong>Palantir's forward-deployed software engineers earn roughly $171K–$295K total
                  compensation, with a median around $211K</strong> (Levels.fyi, 2026). The frontier labs — OpenAI and
                  Anthropic — reportedly pay meaningfully more at the same level, with almost the entire premium sitting in
                  equity. Reported 2026 bands below; treat them as point-in-time and role-dependent, not guarantees.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Company</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Reported band</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Note</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payTable.map((r) => (
                            <TableRow key={r.company}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.company}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.band}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One naming note for Palantir specifically: it organizes by parallel tracks rather than a numbered ladder —
                  <strong> Software Engineering (Dev), Forward Deployed (Delta), and Deployment Strategist (Echo)</strong>.
                  The <em>Deployment Strategist</em> is the more business/analysis-leaning sibling of the FDSE, so if you're
                  comparing "forward deployed engineer" vs "deployment strategist" salaries, they're two rungs of the same
                  customer-embedded ladder. To see how these bands sit against the broader market, the{" "}
                  <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">AI engineer salary guide</Link>{" "}
                  breaks pay down by experience, company, and location.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-break-in" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do you break into the role (and where are the jobs)?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The bar is evidence that you can take AI to production, not just build a demo. A practical path:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Ship one real production system</strong> — a RAG pipeline or agentic workflow running against real data with real users, not a notebook.</li>
                    <li><strong>Master evaluation engineering</strong> — be able to prove a system works and catch when it regresses; this is the most-cited differentiator in 2026 postings.</li>
                    <li><strong>Deploy inside constraints</strong> — practice shipping in a private cloud / on-prem / compliance-bound setting, since that's the FDE's home turf.</li>
                    <li><strong>Sharpen client communication</strong> — you'll translate between executives, domain experts, and your own platform team daily.</li>
                    <li><strong>Target the hirers</strong> — OpenAI, Anthropic, Google Cloud, Palantir, plus enterprise-AI firms like Databricks, Scale AI, and Salesforce.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  New to production AI generally? Start with the fundamentals in our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>,
                  then build the deployment muscle the FDE role screens for. If you're deciding whether to aim for FDE or a
                  platform-side AI engineering role first, the{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">how to become an AI engineer</Link>{" "}
                  guide covers the general path and a realistic timeline by starting point.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="portfolio-projects" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which portfolio projects signal FDE readiness?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  FDE hiring loops are built around one question: <strong>can this person take a vague problem to a running
                  system in someone else's environment?</strong> A portfolio answers that only if the projects look like
                  delivery work, not demos. Four projects that map directly to what the loops test:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li>
                      <strong>RAG over messy, real data with an eval suite</strong> — not a clean Wikipedia dump. Use a
                      domain corpus with PDFs, tables, duplicates, and stale versions. Ship retrieval, reranking, and a
                      regression eval that catches hallucination and grounding failures. Document the chunking decisions
                      you made and why.
                    </li>
                    <li>
                      <strong>An agentic workflow with tool calls and guardrails</strong> — a multi-step agent that touches
                      real systems (a database, an internal API, a ticketing tool), with structured outputs, failure
                      handling, and a human-in-the-loop checkpoint. This is the "working system in prod" signal from the
                      comparison table above.
                    </li>
                    <li>
                      <strong>A deployment inside constraints</strong> — the same system running in a private VPC or
                      on-prem-style setup with no outbound internet, secrets management, and observability (latency, token
                      spend, error rates, drift). Customer-controlled infrastructure is the FDE's home turf, and almost no
                      candidate portfolio shows it.
                    </li>
                    <li>
                      <strong>A written decomposition memo</strong> — take an ambiguous business problem and produce a
                      two-page breakdown: data sources, schema, APIs, components, risks, and what you'd ship in week one.
                      This is exactly what Palantir's decomposition round and OpenAI's case presentation ask for live, so
                      having one in your portfolio doubles as interview prep.
                    </li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Each project should ship with a short README that reads like a customer handoff: the problem, the
                  constraints, the decisions, the eval results, and how to run it. For general guidance on packaging
                  projects so they get interviews, see the portfolio section of our{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer#portfolio" className="text-primary hover:underline">how to become an AI engineer</Link>{" "}
                  guide.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="interview-process" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does the FDE interview process look like?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  FDE loops differ from standard software engineering loops in one way that matters: alongside coding, they
                  test whether you can <strong>decompose an ambiguous, customer-shaped problem and explain your decisions to
                  non-engineers</strong>. The two most-documented loops are Palantir's and OpenAI's.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Palantir (Forward Deployed Software Engineer).</strong> Per interview-prep guides, the process
                  runs four stages over roughly 3–4 weeks: a 30-minute recruiter call; a technical screen that is either live
                  coding (CodePair or Karat) or an online HackerRank assessment covering a coding problem, a SQL query, and an
                  API task; a virtual or in-person onsite of three 60-minute rounds; and a 60-minute hiring-manager round
                  that revisits whichever onsite area was weakest. The onsite rounds are drawn from a pool that includes
                  coding, system design, and two formats with no direct FAANG equivalent: a <em>decomposition</em> round,
                  where you break a vague real-world challenge into data schema, APIs, and components without writing code,
                  and a <em>learning</em> round, where you're handed an unfamiliar system in your language of choice and
                  asked to understand and extend it. Behavioral questions are embedded in nearly every round rather than
                  isolated in one.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>OpenAI (Forward Deployed Engineer).</strong> Candidate reports and prep guides describe a loop of a
                  recruiter screen, a take-home project (reported at about one week — one candidate was asked to build a
                  semantic search setup over a product catalogue and present it back), a live coding screen, a technical
                  deep dive and solution-design round, and a final panel with the hiring manager. The consistent theme in
                  reports is that evaluators weight whether you can explain technical choices in plain English, tie them
                  back to the customer's use case, and adapt the design when the customer's needs change — as much as the
                  code itself.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The general shape across employers, then, is: <strong>recruiter screen → coding screen → a
                  customer-flavoured design, decomposition, or take-home exercise → hiring-manager round</strong>. The
                  coding bar is real but rarely the differentiator; the design and decomposition rounds are. For the LLM
                  system-design and behavioral question banks that overlap most with FDE loops, work through our{" "}
                  <Link to="/blog/ai-engineer-interview-questions#system-design" className="text-primary hover:underline">AI engineer interview questions</Link>{" "}
                  guide, especially the system-design and role-fit sections.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="90-day-plan" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does a 90-day plan to become FDE-ready look like?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This plan assumes you can already ship backend or ML code to production. It maps onto the phases of our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>{" "}
                  — Phase 3 (Engineering: MLOps &amp; Production), Phase 4 (Data &amp; Infrastructure), Phase 5
                  (Specialization), and Phase 6 (Leadership &amp; Communication) — and skips Phases 1–2, which you should
                  have covered. If you're earlier than that, start with the roadmap and come back; the phases are the
                  prerequisite, not optional.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    <li>
                      <strong>Days 1–30 — Ship one real system (Roadmap Phase 3 + 5).</strong> Pick a messy domain corpus
                      and build the RAG pipeline from the portfolio list above, end to end: ingestion, chunking, retrieval,
                      reranking, generation. Put it in front of at least a few real users. The goal is a running system with
                      a URL, not a notebook. Reference the LLM core skills in the{" "}
                      <Link to="/blog/ai-engineer-skills#the-2026-core" className="text-primary hover:underline">skills guide</Link>{" "}
                      as your checklist.
                    </li>
                    <li>
                      <strong>Days 31–60 — Make it provable and deployable (Roadmap Phase 3 + 4).</strong> Add the eval suite:
                      a labelled test set, grounding and hallucination checks, and a regression gate in CI. Instrument it —
                      latency, token spend, error rates, output drift. Then redeploy it inside constraints: private network,
                      secrets management, no outbound calls except the model endpoint. This is the month that separates
                      "built a demo" from "can deliver inside a customer's environment".
                    </li>
                    <li>
                      <strong>Days 61–90 — Build the customer-facing muscle and prep the loop (Roadmap Phase 6).</strong>{" "}
                      Write the decomposition memo for a second, different business problem. Present your shipped system to a
                      non-engineer and iterate until they can explain it back to you. Run mock rounds against the
                      system-design and behavioral sections of the{" "}
                      <Link to="/blog/ai-engineer-interview-questions" className="text-primary hover:underline">interview questions guide</Link>,
                      then apply to the hirers listed above with the portfolio and memo as your evidence.
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Before you negotiate, anchor on the bands in the pay table above and the broader{" "}
                  <Link to="/blog/ai-engineer-salary#by-company" className="text-primary hover:underline">AI engineer salary by company</Link>{" "}
                  data; the FDE premium is mostly equity, so compare total compensation, not base.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="worth-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Should you go for it?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Go for it if</strong> you like shipping real systems against messy real data, enjoy customer
                  contact and travel, and want unusually direct impact and compensation early in the AI wave.{" "}
                  <strong>Skip it if</strong> you want deep uninterrupted focus on one codebase, dislike travel and
                  stakeholder management, or prefer one-to-many platform work over one-customer delivery. The role rewards
                  generalist builders who are comfortable owning the whole path from problem to production.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <TopmateCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://www.marktechpost.com/2026/05/20/what-is-a-forward-deployed-engineer-the-ai-role-openai-anthropic-and-google-are-hiring-in-2026/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MarkTechPost — What is a Forward Deployed Engineer (2026)</a></li>
                  <li>• <a href="https://thenewstack.io/forward-deployed-engineers-ai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The New Stack — Why OpenAI and Anthropic are hiring FDE teams</a></li>
                  <li>• <a href="https://getperspective.ai/blog/palantir-forward-deployed-engineering-playbook-anthropic-openai-copying" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Perspective AI — Palantir's FDE playbook</a></li>
                  <li>• <a href="https://www.paraform.com/blog/openai-forward-deployed-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Paraform — OpenAI's Forward Deployed Engineer role breakdown</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/palantir/salaries/software-engineer/title/fdse" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Palantir Forward Deployed Software Engineer salaries</a></li>
                  <li>• <a href="https://www.aced.io/guides/palantir-forward-deployed-engineer-interview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Aced (formerly Exponent) — Palantir Forward Deployed Engineer interview guide</a></li>
                  <li>• <a href="https://www.aced.io/experiences/openai-forward-deployed-engineer-interview-0b9c09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Aced — OpenAI Forward Deployed Engineer interview experience report</a></li>
                  <li>• <a href="https://www.educative.io/courses/forward-deployed-engineer/interview-guide-openai-forward-deployed-engineers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Educative — Interview guide for OpenAI Forward Deployed Engineers</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/forward-deployed-ai-engineer" />
      <Footer />
    </div>
  );
};

export default BlogPost;
