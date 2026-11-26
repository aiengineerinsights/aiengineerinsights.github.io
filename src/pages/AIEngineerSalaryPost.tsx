import { ArrowLeft, Clock, User, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import SalaryHeroDiagram from "@/components/SalaryHeroDiagram";
import TopmateCTA from "@/components/TopmateCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import { AI_ENGINEER_OFFER_WORKSHEET } from "@/config/newsletterBonuses";

const sourceCompare = [
  { source: "Glassdoor (Nov 2026)", figure: "$169,591 median total pay · $127K–$230K middle 50%", measures: "1,146 self-reported salaries, broad US market; base $93K–$167K plus $34K–$63K bonus and other pay" },
  { source: "Built In (2026)", figure: "$184,757 avg base · $211,243 avg total comp", measures: "Tech-company-focused; sample skews more senior" },
  { source: "Indeed (Nov 2026)", figure: "About $152K avg base", measures: "About 4,200 salaries from job postings; Indeed files the role as \"AI Developer\"" },
  { source: "Levels.fyi, ML/AI engineers (Nov 2026)", figure: "$251,000 median total comp · $170K–$375K middle 50%", measures: "5,696 salaries incl. stock and bonus; skews big tech" },
  { source: "Levels.fyi, \"AI Engineer\" title (Nov 2026)", figure: "$155,000 median total comp", measures: "Just over 300 salaries; mostly smaller companies that use the newer title" },
  { source: "BLS (May 2025)", figure: "$140,300 median", measures: "Computer & information research scientists, the closest official category" },
];

const levelTable = [
  { level: "Junior / entry (0–2 yrs)", broad: "$145K median total pay (base $79K–$148K)", bigtech: "Google L3 $208K · Meta E3 $187K · Amazon L4 $177K" },
  { level: "AI engineer (mid, 3–5 yrs)", broad: "$170K median total pay", bigtech: "Google L4 $316K · Meta E4 $309K · Amazon L5 $286K" },
  { level: "Senior (6–9 yrs)", broad: "$215K median total pay", bigtech: "Google L5 $445K · Meta E5 $457K · Amazon L6 $417K" },
  { level: "Staff", broad: "Too few reports to trust (12 salaries)", bigtech: "Google L6 $646K · Meta E6 $787K" },
  { level: "Principal", broad: "$295K median ($240K–$370K)", bigtech: "Above staff; few public data points" },
];

const companyTable = [
  { company: "Anthropic", band: "$483K (SWE) – $1.3M (Staff)", median: "$870K", note: "All software engineers; mostly private stock" },
  { company: "OpenAI", band: "$249K (L2) – $2.32M (L7)", median: "$800K", note: "All software engineers; equity is most of the package" },
  { company: "xAI", band: "—", median: "$640K", note: "All software engineers; about $240K base + $400K stock" },
  { company: "Meta", band: "$187K (E3) – $787K (E6)", median: "$470K", note: "Machine learning engineer" },
  { company: "Apple", band: "—", median: "$420K", note: "Machine learning engineer" },
  { company: "Google", band: "$208K (L3) – $646K (L6)", median: "$313K", note: "Machine learning engineer" },
  { company: "Amazon", band: "$177K (L4) – $417K (L6)", median: "$280K", note: "Machine learning engineer" },
  { company: "Nvidia", band: "—", median: "$242K", note: "Machine learning engineer" },
  { company: "Microsoft", band: "—", median: "$223K", note: "Machine learning engineer" },
];

// Posted ranges read from each employer's own job board on Nov 26, 2026. They are
// what the posting states; postings close and ranges change, so re-read before quoting.
const labResearchTable = [
  { lab: "Anthropic", role: "Research Engineer, Interpretability", range: "$315,000 – $560,000", note: "Posted as annual salary" },
  { lab: "Anthropic", role: "Research Engineer, Production Model Post-Training", range: "$350,000 – $500,000", note: "Posted as annual salary" },
  { lab: "Anthropic", role: "Research Engineer / Scientist, Pre-training", range: "$500,000 – $850,000", note: "Posted as annual salary" },
  { lab: "OpenAI", role: "Research Engineer", range: "$250K – $445K", note: "Plus equity (value not posted)" },
  { lab: "OpenAI", role: "Research Engineer, Codex", range: "$380K – $500K", note: "Plus equity (value not posted)" },
  { lab: "xAI", role: "Model Engineer, Post-Training & RL", range: "$160,000 – $250,000", note: "Base only; equity on top. No role titled Research Engineer was open" },
  { lab: "xAI", role: "Sr. Model Engineer, Post-Training & RL", range: "$220,000 – $357,000", note: "Base only; equity on top" },
];

const fdeTable = [
  { source: "Levels.fyi, all US companies", figure: "$225,000 median total comp", note: "Middle half $170K–$300K; 90th percentile $363K" },
  { source: "OpenAI posting, Forward Deployed Engineer (San Francisco)", figure: "$185K – $300K", note: "Plus equity" },
  { source: "Anthropic posting, Staff Forward Deployed Engineer", figure: "$280,000 – $320,000", note: "Posted as annual salary; staff level" },
];

const cityTable = [
  { city: "San Francisco, CA", pay: "$223,865", sample: "694 salaries" },
  { city: "Los Angeles, CA", pay: "$205,404", sample: "116 salaries" },
  { city: "Seattle, WA", pay: "$205,041", sample: "466 salaries" },
  { city: "New York, NY", pay: "$201,044", sample: "498 salaries" },
  { city: "Austin, TX", pay: "$183,709", sample: "99 salaries" },
  { city: "Boston, MA", pay: "$178,752", sample: "161 salaries" },
  { city: "Atlanta, GA", pay: "$162,873", sample: "51 salaries" },
  { city: "Chicago, IL", pay: "$148,086", sample: "90 salaries" },
];

const rolesTable = [
  { role: "AI engineer", base: "$152K–$185K avg (Indeed, Built In)", tc: "$169K (Glassdoor) – $251K (Levels.fyi ML/AI)" },
  { role: "Machine learning engineer", base: "$186,703 avg (Indeed)", tc: "Same Levels.fyi ML/AI pool: $251K" },
  { role: "Software developer", base: "$135,980 median (BLS)", tc: "—" },
  { role: "Computer & information research scientist", base: "$140,300 median (BLS)", tc: "—" },
];

const skillsTable = [
  { skill: "Evaluation / evals architecture", premium: "Top of band", note: "Golden datasets, pairwise and offline/online eval harnesses — the single biggest separator in 2026" },
  { skill: "Generative AI / LLMs", premium: "+40–60%", note: "Highest-demand specialization over baseline ML" },
  { skill: "RAG (retrieval-augmented generation)", premium: "+25–40%", note: "Production retrieval systems, not demos" },
  { skill: "Multi-agent orchestration", premium: "+20–35%", note: "LangGraph, Claude Agent SDK, CrewAI — now resume keywords" },
  { skill: "Production fine-tuning", premium: "+25–50%", note: "Rare in practice; most 'AI engineers' only call APIs" },
  { skill: "MLOps / deployment", premium: "+10–20%", note: "Stable, unglamorous, dependable premium" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is a research engineer's salary at a frontier AI lab?",
    a: "Posted salary ranges in November 2026 run from $315,000 to $560,000 for research engineers at Anthropic (up to $850,000 on pre-training and staff roles) and from $250,000 to $445,000 plus equity at OpenAI. xAI posts $160,000 to $250,000 base plus equity for model engineers. Levels.fyi's median total compensation for OpenAI research engineers is $880,000, most of it stock, though that figure rests on one level's submissions.",
  },
  {
    q: "What is a forward deployed engineer's salary?",
    a: "Levels.fyi's median total compensation for forward deployed engineers in the US is $225,000, with the middle half between $170,000 and $300,000 (November 2026). Frontier labs post more: OpenAI lists $185,000 to $300,000 plus equity for forward deployed engineers in San Francisco, and Anthropic lists $280,000 to $320,000 for a staff forward deployed engineer.",
  },
  {
    q: "What is the entry-level AI engineer salary?",
    a: "Glassdoor puts the median total pay for a junior AI engineer at about $145K in November 2026, with base pay from $79K to $148K. Built In reports $80,000 for engineers with less than a year of experience. Big tech starts higher: about $208K total comp at Google L3, $187K at Meta E3 and $177K at Amazon L4 for machine learning engineers (Levels.fyi).",
  },
  {
    q: "How much does an AI engineer make per month?",
    a: "About $14,100 a month at Glassdoor's $169,591 median total pay, or about $12,700 a month on Indeed's roughly $152,000 average base salary. At big tech, Levels.fyi's $251,000 median total comp for ML/AI engineers works out to about $20,900 a month before taxes.",
  },
  {
    q: "How much does an AI engineer make per hour?",
    a: "About $82 an hour at Glassdoor's median total pay and about $73 an hour on Indeed's average base salary, assuming a 2,080-hour year. Built In's $184,757 average base works out to about $89 an hour. Contract rates usually run higher to cover the missing benefits and equity.",
  },
  {
    q: "Which company pays AI engineers the most?",
    a: "The frontier labs. Levels.fyi's November 2026 data puts median software-engineer total comp at about $870,000 at Anthropic, $800,000 at OpenAI and $640,000 at xAI, mostly in equity. Among big tech, Meta leads for machine learning engineers at a $470K median, then Apple ($420K), Google ($313K) and Amazon ($280K).",
  },
  {
    q: "Do AI engineers earn more than ML engineers?",
    a: "Not by title. Indeed's November 2026 averages show machine learning engineers at about $187K base versus about $152K for AI developers, because the ML title is older and more common at big tech. What does pay a premium is AI skill at the same level: Ravio's 2026 compensation report found AI engineers earn 5–16% more than software engineers at the same individual-contributor level.",
  },
  {
    q: "Does an AI engineer need a degree?",
    a: "No hard requirement. Many postings list a CS or ML degree as preferred, but companies increasingly hire on demonstrated ability to ship AI systems to production: real projects, RAG pipelines, eval suites, deployed agents. A degree helps most for research-leaning roles at frontier labs. If you're building that evidence from scratch, a structured AI engineering roadmap plus one or two real production projects is the practical route in.",
  },
];

const AIEngineerSalaryPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-cyan-800 rounded-full px-3 py-1">
                  <DollarSign className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Engineer Salary (November 2026): What US Engineers Earn by Level, Company, and City
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                US AI engineers earn a <strong>median total pay of about $170K</strong> (Glassdoor, November 2026)
                and an <strong>average base salary of $152K–$185K</strong> (Indeed, Built In). At big tech, machine
                learning and AI engineers have a <strong>$251K median total comp</strong> (Levels.fyi). At the
                frontier labs, median software-engineer packages run <strong>$640K to $870K</strong>, mostly in
                equity, and research engineer roles are posted at <strong>$250K to $560K in salary alone</strong>.
                Below is the sourced breakdown by lab, level, company, and city, plus an offer-comparison worksheet
                you can fill in.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Career Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Updated Nov 26, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      15 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <SalaryHeroDiagram />

            <ExploreWithAI path="/blog/ai-engineer-salary" variant="strip" />


            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="how-much" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How much does an AI engineer make in the US?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There is no single honest number, because the salary databases sample different slices of the
                  market and disagree by about $100K. The spread is the useful part: <strong>the broad US market pays
                  AI engineers about $150K–$185K in base salary ($170K median total pay), big tech pays $250K–$470K in
                  total compensation, and frontier labs pay $640K–$870K at the median.</strong> Here's what each source
                  reports as of November 2026, and why the numbers differ:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Source</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Reported figure</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it measures</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sourceCompare.map((r) => (
                            <TableRow key={r.source}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.source}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.figure}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.measures}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One structural note: the Bureau of Labor Statistics doesn't track "AI engineer" as its own occupation
                  yet. The closest official categories are software developers (median $135,980) and computer and
                  information research scientists (median $140,300, May 2025), which the BLS projects to grow 22% from
                  2025 to 2035, far faster than the average occupation.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="frontier-lab-research-engineer" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frontier AI lab research engineer salary</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>A research engineer at a frontier AI lab is posted at roughly $250K to $560K in salary, and
                  up to $850K on pre-training and staff roles, before equity.</strong> Total compensation is higher:
                  Levels.fyi puts the median for OpenAI research engineers at $880,000, of which about $333K is base
                  and $560K is stock. That median comes from one level (L4) and was last updated in August 2026, so
                  read it as an indication, not a band.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The most reliable numbers are the ones the labs publish themselves. These are the ranges on open
                  US postings, read from each lab's own job board on November 26, 2026:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Lab</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Posted role</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Posted range</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What the range covers</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {labResearchTable.map((r) => (
                            <TableRow key={r.role}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.lab}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.role}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">{r.range}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Three things to know when you read these. First, the ranges are wide because one posting covers
                  several levels; where you land depends on the level you are hired at. Second, the labs do not post
                  equity values, and at a private company that equity cannot be sold until a tender offer or other
                  liquidity event. Third, postings close and ranges change, so check the live posting before you
                  quote a number in a negotiation. Google DeepMind's postings could not be read on the day, so it is
                  not in the table.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A posted range tells you the band. It does not tell you how two offers compare once stock,
                  sign-on and vesting are counted. The{" "}
                  <a href="#offer-worksheet" className="text-primary hover:underline">offer-comparison worksheet</a>{" "}
                  further down puts offers on the same four-year basis.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="forward-deployed-engineer-salary" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Forward deployed engineer salary</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>The median forward deployed engineer in the US earns $225,000 in total compensation</strong>{" "}
                  (Levels.fyi, November 2026), with the middle half between $170,000 and $300,000. Frontier labs post
                  above that:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Source</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Figure</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Note</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fdeTable.map((r) => (
                            <TableRow key={r.source}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.source}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">{r.figure}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What the job involves, and how to move into it, is in our{" "}
                  <Link to="/blog/forward-deployed-ai-engineer" className="text-primary hover:underline">forward-deployed AI engineer guide</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-experience" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary by experience level</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Experience is the biggest driver of pay inside one company, but the gap between the broad market and
                  big tech widens at every rung. The middle column is Glassdoor's median total pay for each AI engineer
                  title; the right column is Levels.fyi total comp for machine learning engineers at big tech
                  (November 2026).
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Level</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Broad market (Glassdoor)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Big tech (Levels.fyi)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {levelTable.map((r) => (
                            <TableRow key={r.level}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.level}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.broad}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.bigtech}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Concrete example of the widening gap: a junior AI engineer in the broad market has a median near $145K
                  total pay, while a classmate who lands Google L3 starts around $208K. The gap compounds, because
                  equity refreshers and level jumps stack at big tech in a way annual raises elsewhere don't. At the
                  top, Glassdoor's principal AI engineer median is about $295K, while staff level at Google and Meta
                  is $646K–$787K. Glassdoor has only 12 staff AI engineer salaries, too few to quote.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-company" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary by company</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Median total comp below is from Levels.fyi (November 2026), which aggregates verified offers. OpenAI,
                  Anthropic and xAI don't break out an ML track, so their rows cover all software engineers. The
                  pattern is consistent: <strong>frontier labs pay roughly 2x big-tech medians, and nearly all of the
                  premium is equity</strong>, which stays illiquid until a tender offer or liquidity event.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Company</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Total comp range</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Median</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Note</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companyTable.map((r) => (
                            <TableRow key={r.company}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.company}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.band}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.median}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Treat these as point-in-time, self-reported figures rather than guarantees. Frontier-lab numbers move
                  fast, depend on paper valuations, and some rows rest on small samples. If the
                  customer-facing side of lab work appeals to you, the{" "}
                  <Link to="/blog/forward-deployed-ai-engineer" className="text-primary hover:underline">forward-deployed AI engineer</Link>{" "}
                  role is one of the more accessible doors into frontier-lab compensation.
                </p>
              </section>

              <div id="offer-worksheet">
                <NewsletterSignup
                  heading="Comparing offers? Get the offer-comparison worksheet"
                  subtext="A two-page PDF: the November 2026 benchmark figures from this guide on one page, and a fill-in worksheet on the other that puts two or three offers on the same four-year basis, with private-company stock counted separately. Free with the weekly email."
                  bonus={AI_ENGINEER_OFFER_WORKSHEET}
                />
              </div>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-location" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary by location</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  San Francisco pays the most, about 20% above the national machine learning engineer average, with
                  Los Angeles, Seattle and New York close behind at just over $200K. Indeed doesn't publish city pages
                  for the AI engineer title, so the table uses its <strong>machine learning engineer average base
                  salary</strong> for every city, one consistent source updated in November 2026. Dallas is left out because its average rests on fewer than 20 salaries and moved by more than $10K between two reads on the same day. Built In's
                  figure for <strong>remote US AI engineers is $180,173</strong>, close to hub pay without hub rent.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">City</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Average base (Indeed, Nov 2026)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Sample</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cityTable.map((r) => (
                            <TableRow key={r.city}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.city}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.pay}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.sample}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Adjust for cost of living before comparing: San Francisco pays about $40K more than Austin, but rent and
                  state income tax eat much of that, so the coastal premium shrinks once living costs are priced in.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="per-month-hour" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary per month and per hour</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Monthly and hourly equivalents of the November 2026 figures:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                    <li>• <strong>Broad-market median total pay (Glassdoor):</strong> $169,591/year ≈ <strong>$14,133/month</strong> ≈ <strong>$82/hour</strong></li>
                    <li>• <strong>Average base (Indeed):</strong> about $152,000/year ≈ $12,700/month ≈ $73/hour</li>
                    <li>• <strong>Tech-focused average base (Built In):</strong> $184,757/year ≈ $15,396/month ≈ $88.83/hour</li>
                    <li>• <strong>Official benchmark (BLS):</strong> $140,300/year ≈ $11,692/month ≈ $67.45/hour</li>
                    <li>• <strong>Big tech (Levels.fyi ML/AI median):</strong> $251,000 total comp ≈ $20,917/month</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These are gross (pre-tax) figures, and the hourly conversion assumes a standard 2,080-hour year.
                  Freelance and contract AI engineering rates are typically higher per hour than these salaried
                  equivalents to compensate for the lack of benefits and equity.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="vs-other-roles" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer vs ML engineer vs software engineer salary</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The titles overlap heavily in job listings, and the title alone doesn't decide pay. Indeed's machine
                  learning engineer average is actually higher than its AI developer average, because the ML title is
                  older and concentrated at big tech:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Role</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Base salary</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Total comp</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rolesTable.map((r) => (
                            <TableRow key={r.role}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.role}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.base}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.tc}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice, "AI engineer" in 2026 usually means building on foundation models (RAG systems, agents,
                  evals, LLM integrations), while "ML engineer" leans toward training and serving models. The premium
                  follows the skills, not the title: Ravio's 2026 compensation report found AI engineers earn 5–16% more
                  than software engineers at the same individual-contributor level, and that 27% of companies pay a
                  premium to hire AI/ML engineers (European data, but the same direction as US offers). If you're weighing the paths, our{" "}
                  <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">AI engineer skills checklist</Link>{" "}
                  breaks down what each role actually requires.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="skills-premium" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which skills pay the biggest premium?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Level and employer set the band; skills decide where you land inside it. The clearest 2026 signal from
                  recruiters and compensation data: <strong>engineers who can design and ship evaluation systems pull the
                  top of their band</strong> — golden datasets, pairwise evals, and offline plus online eval harnesses in
                  production. Approximate premiums over a baseline ML role:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Skill / specialization</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Premium</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why it pays</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {skillsTable.map((r) => (
                            <TableRow key={r.skill}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.skill}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.premium}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Premiums stack: an engineer who ships evals <em>and</em> owns a production RAG system is worth far more
                  than either skill alone. Sources: Kore1 LLM/RAG salary guides and Second Talent (2026).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="trend" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Is AI engineer pay still rising in 2026?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes, but it is stabilizing rather than running away. Levels.fyi's median total comp for ML/AI
                  engineers is <strong>$251,000 in November 2026</strong>, up from about $245K when we first published
                  this guide in August, after a peak near $295K in March 2024 and a dip to $228K in January 2025 during
                  a hiring reset.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The premium for AI skills held through 2026 layoffs: PwC's 2025 AI Jobs Barometer measured a 56% wage
                  premium for AI-skilled workers, Ravio's October 2026 report shows AI engineers ahead of software
                  engineers at every individual-contributor level, and the BLS projects 22% growth for the closest
                  official occupation through 2035. The runaway phase is over, but people who ship production AI still
                  get paid more for it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="increase" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to increase your AI engineer salary</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The data above implies a clear playbook. Ordered by expected impact:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Change employer tier, not just employer.</strong> The broad market → big tech → frontier lab jumps are worth ~$100K–$400K each at the same experience level — no raise negotiation compares.</li>
                    <li><strong>Own an evaluation system.</strong> Evals are the single biggest skill separator in 2026; engineers who ship golden datasets and offline/online eval harnesses pull the top of their band. Build production LLM evidence — RAG pipelines, agents, evals — because that's what postings screen for. The operational side is covered in our <Link to="/blog/mlops-best-practices" className="text-primary hover:underline">MLOps best practices</Link> guide.</li>
                    <li><strong>Negotiate equity, not base.</strong> At the frontier labs, equity is most of the package (xAI's median is about $240K base plus $400K stock); base bands are rigid, grant sizes are not.</li>
                    <li><strong>Anchor to a high-paying market.</strong> Built In puts remote US AI engineers at about $180K, so you can capture close-to-hub pay without hub-level rent.</li>
                    <li><strong>Level up deliberately.</strong> The entry→mid→senior→staff ladder roughly adds $100K–$250K in total comp per rung at big tech; ask what the next level requires and build against it.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you're earlier in the journey and the skills list is the bottleneck, start with our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link> —
                  it sequences the fundamentals (Python, math, ML, MLOps, LLMs/agents) that the salaries in this post
                  are ultimately paying for. New to the field entirely? See{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">how to become an AI engineer</Link>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Have an offer in hand, or two, and want a second opinion on the numbers? Book a 1:1 session.
                </p>
                <TopmateCTA placement="salary" />
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Higher offers come down to the interview loop; our <Link to="/blog/ai-engineer-interview-questions" className="text-primary hover:underline">AI engineer interview questions</Link> guide covers what gets asked at each level.
                </p>
              </section>

              <ExploreWithAI path="/blog/ai-engineer-salary" variant="questions" />


              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <TopmateCTA placement="salary" />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://www.glassdoor.com/Salaries/ai-engineer-salary-SRCH_KO0,11.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Glassdoor — AI Engineer salaries, United States (Nov 2026)</a></li>
                  <li>• <a href="https://www.glassdoor.com/Salaries/senior-ai-engineer-salary-SRCH_KO0,18.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Glassdoor — Senior AI Engineer salaries</a></li>
                  <li>• <a href="https://www.glassdoor.com/Salaries/principal-ai-engineer-salary-SRCH_KO0,21.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Glassdoor — Principal AI Engineer salaries</a></li>
                  <li>• <a href="https://www.indeed.com/career/ai-engineer/salaries" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Indeed — AI Developer salaries (Nov 2026)</a></li>
                  <li>• <a href="https://www.indeed.com/career/machine-learning-engineer/salaries" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Indeed — Machine Learning Engineer salaries by city (Nov 2026)</a></li>
                  <li>• <a href="https://builtin.com/salaries/us/ai-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Built In — 2026 AI Engineer salary in the US</a></li>
                  <li>• <a href="https://www.levels.fyi/t/software-engineer/focus/ml-ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — ML/AI software engineer salaries (Nov 2026)</a></li>
                  <li>• <a href="https://www.levels.fyi/t/software-engineer/title/ai-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — AI Engineer title salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/anthropic/salaries/software-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Anthropic software engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/openai/salaries/software-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — OpenAI software engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/xai/salaries/software-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — xAI software engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/openai/salaries/software-engineer/title/research-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — OpenAI research engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/t/software-engineer/title/forward-deployed-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Forward deployed engineer salaries</a></li>
                  <li>• <a href="https://job-boards.greenhouse.io/anthropic" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic — open roles with posted salary ranges (read Nov 26, 2026)</a></li>
                  <li>• <a href="https://openai.com/careers/search/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI — open roles with posted compensation ranges (read Nov 26, 2026)</a></li>
                  <li>• <a href="https://job-boards.greenhouse.io/xai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">xAI — open roles with posted base salary ranges (read Nov 26, 2026)</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/google/salaries/software-engineer/title/machine-learning-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Google machine learning engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/meta/salaries/software-engineer/title/machine-learning-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Meta machine learning engineer salaries</a></li>
                  <li>• <a href="https://get.ravio.com/blog/ai-compensation-and-talent-trends" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ravio — AI compensation and talent trends (Oct 2026)</a></li>
                  <li>• <a href="https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">US BLS — Computer and Information Research Scientists (May 2025)</a></li>
                  <li>• <a href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">US BLS — Software Developers, Occupational Outlook Handbook</a></li>
                  <li>• <a href="https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PwC — Global AI Jobs Barometer</a></li>
                  <li>• <a href="https://www.kore1.com/ai-engineer-salary-guide/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Kore1 — AI Engineer Salary Guide 2026 (skills premiums)</a></li>
                  <li>• <a href="https://www.secondtalent.com/resources/most-in-demand-ai-engineering-skills-and-salary-ranges/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Second Talent — In-demand AI engineering skills & salary ranges (2026)</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/ai-engineer-salary" />
      <Footer />
    </div>
  );
};

export default AIEngineerSalaryPost;
