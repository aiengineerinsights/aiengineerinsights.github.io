import { ArrowLeft, Clock, User, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import SalaryHeroDiagram from "@/components/SalaryHeroDiagram";
import TopmateCTA from "@/components/TopmateCTA";

const sourceCompare = [
  { source: "ZipRecruiter (Jul 2026)", figure: "$101,752 average", measures: "Base salary across all US employers — includes non-tech companies, so it runs lowest" },
  { source: "Glassdoor (2026)", figure: "$144,427 average · $115,909–$182,456 typical range", measures: "Self-reported base pay across the broad market" },
  { source: "Built In (2026)", figure: "$184,757 average · ~$211,243 with additional comp", measures: "Tech-company-focused salary data" },
  { source: "Levels.fyi (2026)", figure: "~$244K median total compensation", measures: "Verified offers, skews to big tech; includes stock and bonus" },
  { source: "BLS (May 2024)", figure: "$133,080 median (software developers)", measures: "Closest official occupation — no separate 'AI engineer' category yet" },
];

const levelTable = [
  { level: "Entry / junior (0–2 yrs)", broad: "$69,362 average (ZipRecruiter); ~$134K starting for AI/ML roles (Robert Half)", bigTech: "~$199K total comp — Google L3 ML engineer (Levels.fyi)" },
  { level: "Mid-level (3–5 yrs)", broad: "$170,750 midpoint for AI/ML engineers (Robert Half)", bigTech: "~$302K median total comp — Google ML engineer (Levels.fyi)" },
  { level: "Senior (5–8 yrs)", broad: "$126,557 average, broad market (ZipRecruiter); $193,250 high end (Robert Half)", bigTech: "~$457K median total comp — Meta ML engineer (Levels.fyi)" },
  { level: "Staff / principal (8+ yrs)", broad: "Rare outside tech hubs; usually negotiated", bigTech: "$660K–$743K total comp — Meta E6 / Google L7 (Levels.fyi)" },
];

const companyTable = [
  { company: "OpenAI", band: "$253K (L2) – $1.27M (L6)", median: "~$860K", note: "Software engineer; PPU equity is most of the package" },
  { company: "Anthropic", band: "$367K (entry) – $1.25M (staff)", median: "~$870K", note: "Software engineer; equity-heavy frontier-lab comp" },
  { company: "Meta", band: "$187K (E3) – $660K (E6)", median: "~$457K", note: "ML engineer track" },
  { company: "Apple", band: "$171K – $528K+", median: "~$381K", note: "ML engineer; stock grants drive the top of band" },
  { company: "Google", band: "$199K (L3) – $743K (L7)", median: "~$302K", note: "ML engineer track" },
  { company: "Amazon", band: "$177K (L4) – $409K (L6)", median: "~$265K", note: "ML engineer track" },
  { company: "Microsoft", band: "$184K – $502K+ (AI engineer)", median: "~$219K (ML engineer)", note: "Separate AI-engineer and ML-engineer titles" },
];

const cityTable = [
  { city: "San Francisco Bay Area", pay: "$213K median base ($192K–$250K, 25th–75th pct)", source: "Recruiting from Scratch, 1.9M job postings (2026)" },
  { city: "Seattle", pay: "~$202K average", source: "Indeed (2026)" },
  { city: "New York City", pay: "$179,591 average ($140K–$233K typical range)", source: "Glassdoor (2026)" },
  { city: "Remote (US)", pay: "$194K median ($155K–$225K, 25th–75th pct)", source: "Recruiting from Scratch (2026)" },
  { city: "US national average", pay: "$184,757 average", source: "Built In (2026)" },
];

const faqs = [
  {
    q: "What is the entry-level AI engineer salary?",
    a: "It depends heavily on where you land. Across all US employers, ZipRecruiter puts the entry-level average at $69,362 a year (about $5,780/month). At tech companies in major hubs, entry-level base offers typically run $115K–$135K, and at big tech the first rung is much higher — a Google L3 ML engineer averages roughly $199K in total compensation per Levels.fyi.",
  },
  {
    q: "How much does an AI engineer make per month?",
    a: "Using ZipRecruiter's broad-market averages: about $8,479/month for the average AI engineer, $5,780/month at entry level, and $10,546/month for senior engineers. At big tech, monthly figures are far higher — a $244K median total comp package (Levels.fyi) works out to roughly $20,000+/month before taxes.",
  },
  {
    q: "Is AI engineering a good career? Is it high paying?",
    a: "Yes, on both current pay and trajectory. AI engineers out-earn the general software baseline (BLS software developers median: $133,080), PwC's Global AI Jobs Barometer found a 56% wage premium for AI skills, and the BLS projects 15–20% growth for adjacent occupations from 2024 to 2034 — much faster than average. The main caveat: the highest packages are concentrated at a small number of companies and cities.",
  },
  {
    q: "Does an AI engineer need a degree?",
    a: "No hard requirement. Many postings list a CS or ML degree as preferred, but companies increasingly hire on demonstrated ability to ship AI systems to production — real projects, RAG pipelines, eval suites, deployed agents. A degree helps most for research-leaning roles at frontier labs. If you're building that evidence from scratch, a structured path like an AI engineering roadmap plus one or two real production projects is the practical route in.",
  },
  {
    q: "Which company pays AI engineers the most?",
    a: "The frontier labs. Levels.fyi puts median software-engineer total compensation at roughly $860K at OpenAI and $870K at Anthropic — two to three times big-tech medians — with most of the premium in equity. Among big tech, Meta's ML engineer median (~$457K) leads Apple (~$381K), Google (~$302K), Amazon (~$265K), and Microsoft (~$219K).",
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
                AI Engineer Salary in 2026: What US Engineers Actually Earn, by Level, Company, and City
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                US AI engineers earn roughly $100K–$250K a year in 2026, depending on which data you trust: Glassdoor's
                broad-market average is $144,427, Built In's tech-focused average is $184,757, and Levels.fyi's
                big-tech-skewed data puts median total compensation near $244K. At the frontier labs — OpenAI and
                Anthropic — median packages exceed $850K, mostly in equity. Here's the full sourced breakdown by
                experience level, company, and city, plus what actually moves the number.
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
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Career Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 3, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <SalaryHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="how-much" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How much does an AI engineer make in the US?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There is no single honest number — the major salary databases sample different slices of the market,
                  and they disagree by more than $100K. The spread itself is the most useful fact: <strong>the broad US
                  market pays AI engineers roughly $100K–$185K in base salary, while big tech pays ~$200K–$450K in
                  total compensation and frontier labs pay $850K+ at the median.</strong> Here's what each source
                  reports and why the numbers differ:
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
                  yet. The closest official categories are software developers (median $133,080, May 2024) and computer
                  and information research scientists (median $140,910) — both projected to grow 15–20% from 2024 to
                  2034, much faster than the average occupation. The AI premium on top of that baseline is real:
                  PwC's 2025 Global AI Jobs Barometer measured a <strong>56% wage premium for workers with AI
                  skills</strong>, up from 25% the year before.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-experience" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary by experience level</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Experience is the single biggest in-company driver of pay, but the gap between the broad market and
                  big tech widens at every rung. The two columns below are deliberately separate — averaging them
                  produces a number nobody actually earns.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Level</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Broad US market</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Big tech (total comp)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {levelTable.map((r) => (
                            <TableRow key={r.level}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.level}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.broad}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.bigTech}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Concrete example of the widening gap: an entry-level engineer at a non-tech company might start near
                  ZipRecruiter's $69K average, while their classmate who lands Google L3 starts around $199K total comp
                  — a ~3x difference on day one that compounds, because equity refreshers and level jumps stack at big
                  tech in a way annual raises elsewhere don't.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-company" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary by company</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All figures below are from Levels.fyi (2026), which aggregates verified offers. The pattern is
                  consistent: <strong>frontier labs pay 2–3x big-tech medians, and nearly all of the premium is
                  equity</strong> — OpenAI grants PPUs (profit participation units) and Anthropic grants private stock,
                  both illiquid until a tender offer or liquidity event.
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
                  Treat these as point-in-time, self-reported bands rather than guarantees — frontier-lab numbers in
                  particular move fast and depend on paper valuations. If the customer-facing side of lab work appeals
                  to you, the{" "}
                  <Link to="/blog/forward-deployed-ai-engineer" className="text-primary hover:underline">forward-deployed AI engineer</Link>{" "}
                  role is one of the more accessible doors into frontier-lab compensation.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="by-location" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary by location</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  San Francisco and New York pay roughly 20–50% above the national average, but the most interesting
                  2026 shift is remote: <strong>US remote AI engineer pay ($194K median) now sits within a few percent
                  of San Francisco</strong>, per Recruiting from Scratch's analysis of 1.9 million job postings.
                  Companies hiring outside the US (India, Eastern Europe, Latin America) typically pay a fraction of
                  these figures — the table below is US-market data.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Location</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Reported pay (2026)</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Source</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cityTable.map((r) => (
                            <TableRow key={r.city}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.city}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.pay}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.source}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="per-month-hour" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer salary per month and per hour</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  People often search monthly and hourly equivalents, so here they are, straight from ZipRecruiter's
                  broad-market data (2026):
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                    <li>• <strong>Average AI engineer:</strong> $101,752/year ≈ <strong>$8,479/month</strong> ≈ <strong>$48.92/hour</strong></li>
                    <li>• <strong>Entry level:</strong> $69,362/year ≈ $5,780/month ≈ $33.35/hour</li>
                    <li>• <strong>Senior:</strong> $126,557/year ≈ $10,546/month ≈ $60.84/hour</li>
                    <li>• <strong>Big-tech reference:</strong> a $244K median total-comp package (Levels.fyi) works out to roughly $20,300/month</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These are gross (pre-tax) figures, and the hourly conversion assumes a standard 2,080-hour year.
                  Freelance/contract AI engineering rates are typically higher per hour than these salaried
                  equivalents to compensate for the lack of benefits and equity.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="vs-other-roles" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI engineer vs software engineer vs ML engineer salary</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The three titles overlap heavily in job listings, but the market currently prices them differently.
                  Using each role's most comparable broad-market figure:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                    <li>• <strong>Software engineer (baseline):</strong> $133,080 median — BLS software developers, May 2024</li>
                    <li>• <strong>ML engineer:</strong> ~$128K–$186K base in 2026, with big-tech medians of $265K–$457K total comp (Levels.fyi)</li>
                    <li>• <strong>AI engineer:</strong> $144,427 Glassdoor average base; $170,750 Robert Half AI/ML midpoint; ~$244K Levels.fyi median total comp</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice, "AI engineer" in 2026 usually means building on foundation models — RAG systems, agents,
                  evals, LLM integrations — while "ML engineer" leans toward training and serving models. The AI title
                  carries a premium right now because demand is newer than the supply of people with production LLM
                  experience. Robert Half's 2026 guide puts AI/ML starting-salary growth at 4.1% — the highest of any
                  tech specialty it tracks — and PwC's 56% AI-skills wage premium is the widest ever measured in its
                  barometer. Whether the gap between the titles persists is an open question; the skills overlap far
                  more than the pay does.
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
                    <li><strong>Build production LLM evidence.</strong> Shipped RAG pipelines, agent systems, and eval suites are what 2026 postings screen for; a portfolio of real deployments beats certificates. The operational side — monitoring, CI/CD, safe rollouts — is covered in our <Link to="/blog/mlops-best-practices" className="text-primary hover:underline">MLOps best practices</Link> guide.</li>
                    <li><strong>Negotiate equity, not base.</strong> At the top of the market, equity is 55–70% of the package (Pin's 2026 compensation benchmarks); base bands are rigid, grant sizes are not.</li>
                    <li><strong>Anchor to a high-paying market.</strong> Remote US roles now pay within ~2% of San Francisco — you can capture hub-level pay without hub-level rent.</li>
                    <li><strong>Level up deliberately.</strong> The entry→mid→senior→staff ladder roughly adds $100K–$250K in total comp per rung at big tech; ask what the next level requires and build against it.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you're earlier in the journey and the skills list is the bottleneck, start with our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link> —
                  it sequences the fundamentals (Python, math, ML, MLOps, LLMs/agents) that the salaries in this post
                  are ultimately paying for.
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
                  <li>• <a href="https://www.glassdoor.com/Salaries/ai-engineer-salary-SRCH_KO0,11.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Glassdoor — AI Engineer salaries, United States</a></li>
                  <li>• <a href="https://www.ziprecruiter.com/Salaries/Ai-Engineer-Salary" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ZipRecruiter — AI Engineer salary (annual, monthly, hourly)</a></li>
                  <li>• <a href="https://builtin.com/salaries/us/ai-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Built In — 2026 AI Engineer salary in the US</a></li>
                  <li>• <a href="https://www.levels.fyi/t/software-engineer/title/machine-learning-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Machine Learning Engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/openai/salaries/software-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — OpenAI Software Engineer salaries</a></li>
                  <li>• <a href="https://www.levels.fyi/companies/anthropic/salaries/software-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Levels.fyi — Anthropic Software Engineer salaries</a></li>
                  <li>• <a href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">US Bureau of Labor Statistics — Software Developers, Occupational Outlook Handbook</a></li>
                  <li>• <a href="https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">US Bureau of Labor Statistics — Computer and Information Research Scientists</a></li>
                  <li>• <a href="https://www.roberthalf.com/us/en/job-details/aiml-engineer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Robert Half 2026 Salary Guide — AI/ML Engineer</a></li>
                  <li>• <a href="https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PwC — Global AI Jobs Barometer (56% AI wage premium)</a></li>
                  <li>• <a href="https://www.recruitingfromscratch.com/blog/ai-engineer-san-francisco-salary-in-2026-real-data-from-1-9-million-job-postings" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Recruiting from Scratch — AI engineer pay from 1.9M job postings (SF and remote)</a></li>
                  <li>• <a href="https://www.pin.com/blog/ai-compensation-salary-guide/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pin — AI Compensation Benchmarks 2026</a></li>
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
