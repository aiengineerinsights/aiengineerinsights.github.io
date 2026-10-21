import { ArrowLeft, Clock, User, Calendar, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import AnthropicCertificationsHeroDiagram from "@/components/AnthropicCertificationsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

// Names and codes: Pearson VUE's Anthropic page. Price, audience, and domains: as
// published by prep providers (Anthropic shows them inside the Partner Academy only).
const certifications = [
  {
    name: "Claude Certified Associate – Foundations",
    code: "CCAO-F",
    who: "Business and productivity users of Claude; no coding required",
    covers: "Output evaluation and validation, workflow integration, governance and responsible use, prompting, product and model selection, configuration and knowledge management, troubleshooting",
    price: "$99",
  },
  {
    name: "Claude Certified Developer – Foundations",
    code: "CCDV-F",
    who: "Engineers shipping applications on the Claude API and SDKs (Python or TypeScript)",
    covers: "Applications and integration (the largest domain), model selection and optimization, agents and workflows, prompt and context engineering, tools and MCP, security, Claude Code, evaluation",
    price: "$125",
  },
  {
    name: "Claude Certified Architect – Foundations",
    code: "CCAR-F (CCA-F)",
    who: "Builders of production Claude and agent systems",
    covers: "Agentic architecture and orchestration, Claude Code, prompt engineering, tool design and MCP, context management and reliability",
    price: "$125",
  },
  {
    name: "Claude Certified Architect – Professional",
    code: "CCAR-P",
    who: "Senior solution architects who own a Claude solution end to end",
    covers: "Integration, solution design, evaluation and optimization, governance and risk, stakeholder communication and lifecycle, models and context engineering, operational enablement",
    price: "$175",
  },
];

// Course titles: the public catalog at anthropic.skilljar.com (Oct 2026).
// The mapping to exams is our recommendation, not Anthropic's.
const coursePaths = [
  {
    exam: "Associate (CCAO-F)",
    courses: "Claude 101 · AI Fluency: Framework & Foundations · AI Capabilities and Limitations · Introduction to Claude Cowork",
  },
  {
    exam: "Developer (CCDV-F)",
    courses: "Claude Platform 101 · Building with the Claude API · Introduction to Model Context Protocol · Claude Code 101 · Introduction to agent skills",
  },
  {
    exam: "Architect – Foundations (CCAR-F)",
    courses: "Building with the Claude API · Model Context Protocol: Advanced Topics · Claude Code in Action · Introduction to subagents · Introduction to agent skills",
  },
  {
    exam: "Architect – Professional (CCAR-P)",
    courses: "Everything on the Architect – Foundations path · Deploying Claude Enterprise with Confidence · Claude on Google Cloud (if that is your platform)",
  },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What certifications does Anthropic offer?",
    a: "Anthropic offers four proctored Claude certifications, delivered by Pearson VUE: Claude Certified Associate – Foundations (CCAO-F) for business users, Claude Certified Developer – Foundations (CCDV-F) for engineers building on the API, Claude Certified Architect – Foundations (CCAR-F, often written CCA-F) for builders of agent systems, and Claude Certified Architect – Professional (CCAR-P) for senior solution architects. Separately, the free Anthropic Academy courses give certificates of completion, and the nomination-only Claude Frontier Academy awards a Claude Resident Engineer badge.",
  },
  {
    q: "Is the Anthropic certification free?",
    a: "No. The exams are paid per attempt; prep providers report $99 for the Associate exam, $125 each for Developer and Architect – Foundations, and $175 for Architect – Professional, and Anthropic says tiered partners get a discounted first attempt. What is free: the Anthropic Academy courses on Skilljar, which anyone can take, and joining the Claude Partner Network as a firm.",
  },
  {
    q: "Can an individual take a Claude certification exam without a partner company?",
    a: "Not directly. Pearson VUE states that certification is open to organizations in the Claude Partner Network, and registration runs through the Anthropic Partner Academy, which partner firms get access to. In practice you need to work at, or contract for, a partner firm. If you are not near one, take the free Anthropic Academy courses and build public Claude projects; that covers most of the learning without the exam.",
  },
  {
    q: "Which Anthropic certification should I take first?",
    a: "Match it to your job. Business users who use Claude daily but do not code should start with the Associate (CCAO-F). Software engineers building on the Claude API should start with the Developer (CCDV-F). Engineers who design agent systems with tools, MCP, and Claude Code should take Architect – Foundations (CCAR-F). Architect – Professional (CCAR-P) is for people with several years of systems architecture experience who already deliver production LLM solutions.",
  },
  {
    q: "Are Anthropic Academy courses free, and do they give a certificate?",
    a: "Yes, the Anthropic Academy courses at anthropic.skilljar.com are free; you sign up with an email address and no Claude subscription is needed. Completing a course gives a certificate of completion that you can add to LinkedIn, but it is not a Claude certification: the certifications require passing a proctored Pearson VUE exam.",
  },
  {
    q: "How long is a Claude certification valid, and how many times can I retake the exam?",
    a: "Prep providers report that Claude certifications are valid for 12 months. Pearson VUE's retake policy allows up to four attempts per exam in any rolling 12-month period, with a 14-day wait after the first attempt, 30 days after the second, and 90 days after the third.",
  },
];

const AnthropicCertificationsPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full px-3 py-1">
                  <Award className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Anthropic Certifications (2026): All 4 Claude Exams, Costs, Eligibility, and the Free Anthropic Academy Courses
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Anthropic has four Claude certifications, one set of free courses, and one invitation-only academy, and people mix them up.</strong>{" "}
                This guide maps all of it: what each certification tests and costs, who is allowed to sit the exams,
                which free Anthropic Academy courses prepare you for which exam, how the Claude Frontier Academy fits
                in, and whether any of it is worth your time if you are building an AI engineering career.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-orange-600 flex items-center justify-center flex-shrink-0">
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
                      Oct 13, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      9 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AnthropicCertificationsHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> Anthropic offers four proctored Claude certifications through Pearson VUE:
                Associate – Foundations (CCAO-F, business users, ~$99), Developer – Foundations (CCDV-F, API engineers,
                ~$125), Architect – Foundations (CCAR-F, agent-system builders, ~$125), and Architect – Professional
                (CCAR-P, senior architects, ~$175). Each is a 120-minute exam with a pass mark of 720 out of 1,000, valid
                for 12 months. The exams are open only to organizations in the Claude Partner Network, so you need to
                work at or with a partner firm. Anyone can take the free Anthropic Academy courses on Skilljar, which
                give certificates of completion, not certifications. The Claude Frontier Academy is a separate,
                nomination-only program.
              </p>
            </div>

            <ExploreWithAI path="/blog/anthropic-certifications" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-certifications" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What certifications does Anthropic offer?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's certification program has four exams. The names and exam codes below are the ones on{" "}
                  <RefLink href="https://www.pearsonvue.com/us/en/anthropic.html">Pearson VUE's Anthropic page</RefLink>,
                  which delivers the exams. Anthropic publishes the detailed exam guides inside its Partner Academy, so
                  the price, audience, and domain columns come from prep providers that publish the blueprints. Treat
                  them as current, not guaranteed, and confirm them before you book.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Certification</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Code</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Who it is for</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it covers</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {certifications.map((c) => (
                            <TableRow key={c.code}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{c.name}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">{c.code}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.who}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.covers}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The Architect – Foundations exam came first: Anthropic launched it in March 2026 with the Claude
                  Partner Network, and we cover it in depth in our{" "}
                  <Link to="/blog/claude-certified-architect-exam" className="text-primary hover:underline">Claude Certified Architect exam guide</Link>{" "}
                  and{" "}
                  <Link to="/blog/claude-certified-architect-exam-traps" className="text-primary hover:underline">11 exam traps</Link>{" "}
                  post. The Associate, Developer, and Architect – Professional exams followed in July 2026, turning one
                  exam into a ladder. Uptake has been fast: in October 2026 Anthropic reported that{" "}
                  <RefLink href="https://www.anthropic.com/news/claude-frontier-academy">more than 175,000 professionals</RefLink>{" "}
                  in the partner network had earned Claude certifications.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="exam-format" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is the exam format, and how long is a certification valid?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All four exams share the same format, so once you know one you know the others:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Length:</strong> 120 minutes, one sitting, scenario-based multiple-choice and multiple-response questions (prep providers report roughly 53–63 questions, depending on the exam).</li>
                    <li>• <strong>Pass mark:</strong> a scaled score of 720 on a 100–1,000 scale. Scaled means it is not a raw 72%; the number of questions you need right varies with the difficulty of your exam form.</li>
                    <li>• <strong>Delivery:</strong> Pearson VUE, either online with OnVUE proctoring (webcam, room scan, photo ID) or at a Pearson test center.</li>
                    <li>• <strong>Retakes:</strong> up to four attempts per exam in any rolling 12 months. Pearson VUE's policy is a 14-day wait after the first attempt, 30 days after the second, and 90 days after the third.</li>
                    <li>• <strong>Validity:</strong> 12 months, as reported by prep providers. Claude changes fast, so budget for renewing it every year.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="who-can-take" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Who can take an Anthropic certification exam?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the question most guides skip. Pearson VUE states plainly that "certification is open to
                  organizations in the Claude Partner Network," and you register through the{" "}
                  <strong>Anthropic Partner Academy</strong>, not through a public signup page. Anthropic's{" "}
                  <RefLink href="https://www.anthropic.com/news/services-track-partner-hub">partner announcement</RefLink>{" "}
                  describes the model: getting started in the network is free, and member firms gain Partner Academy
                  access, including the certification exams, with tiered partners receiving a discounted first attempt.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  So the realistic routes to a Claude certification are:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>You work at a partner firm</strong> (consultancies, systems integrators, and software companies that build on Claude). Ask your partner or training lead for Partner Academy access.</li>
                    <li>• <strong>Your company could become a partner.</strong> Joining is free for firms at <RefLink href="https://claude.com/partners">claude.com/partners</RefLink>. If your team already ships Claude work for clients, this is worth raising internally.</li>
                    <li>• <strong>Neither applies.</strong> You cannot book the exam yourself today. Take the free Academy courses below, build public Claude projects, and check the Pearson VUE page every few months in case eligibility opens up.</li>
                  </ul>
                </div>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Certifications, skills that pay, and the AI tools worth learning: one practical email a week for engineers building an AI career. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="anthropic-academy" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What are the free Anthropic Academy courses?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <RefLink href="https://anthropic.skilljar.com/">Anthropic Academy</RefLink> is Anthropic's free course
                  catalog, hosted on Skilljar. Anyone can sign up with an email address; you do not need a Claude
                  subscription or a partner company. Finishing a course gives you a certificate of completion you can
                  add to LinkedIn. That is useful as a signal of effort, but it is <em>not</em> a Claude certification,
                  which always means a proctored Pearson VUE exam.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The public catalog had 23 courses in October 2026, grouped roughly like this:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Using Claude:</strong> Claude 101, Introduction to Claude Cowork, AI Capabilities and Limitations, Deploying Claude Enterprise with Confidence.</li>
                    <li>• <strong>Building with Claude:</strong> Claude Platform 101, Building with the Claude API, Claude on Google Cloud, Claude with Amazon Bedrock (listed as an AWS employee training program).</li>
                    <li>• <strong>Agents and MCP:</strong> Introduction to Model Context Protocol, Model Context Protocol: Advanced Topics, Introduction to agent skills, Introduction to subagents.</li>
                    <li>• <strong>Claude Code:</strong> Claude Code 101, Claude Code in Action.</li>
                    <li>• <strong>AI Fluency:</strong> AI Fluency: Framework &amp; Foundations, plus versions for students, educators, pK-12 educators, nonprofits, small businesses, builders, and creative work, and Teaching AI Fluency.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you are an engineer, skip the audience-specific AI Fluency variants and go straight to the
                  building, agents, and Claude Code tracks. They teach the same material the Developer and Architect
                  exams test, and they are the closest thing to official exam prep that is open to everyone.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="course-to-exam" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which Anthropic Academy courses prepare you for which exam?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic does not publish an official mapping on its public pages. This is ours, built by matching
                  each exam's reported domains to the course catalog:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Exam</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Free courses to take first</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {coursePaths.map((p) => (
                            <TableRow key={p.exam}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{p.exam}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{p.courses}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Courses alone will not get you through the Developer or Architect exams. They are scenario-based and
                  reward people who have actually shipped: designed a tool interface, debugged an agent loop, decided
                  what goes in the context window. Pair every course with a small project. If you need ideas for what
                  to build, the projects in our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineer roadmap</Link>{" "}
                  and the agent concepts in{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">What is MCP?</Link> map directly
                  onto the exam domains.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="which-first" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Which Anthropic certification should you take first?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>You use Claude every day but do not code</strong> (analyst, PM, consultant, operations): Associate – Foundations (CCAO-F). It tests judgment about outputs, workflows, and governance, not programming.</li>
                    <li>• <strong>You are a software engineer adding Claude to products:</strong> Developer – Foundations (CCDV-F). Prep providers list 1–5 years of engineering experience and 6+ months of hands-on LLM work as the recommended background.</li>
                    <li>• <strong>You design agent systems</strong> with tools, MCP servers, subagents, and Claude Code: Architect – Foundations (CCAR-F). This is the most established exam and the one with the most prep material.</li>
                    <li>• <strong>You lead Claude delivery for clients or a platform team:</strong> Architect – Professional (CCAR-P). The recommended background is 3+ years of systems architecture plus production LLM delivery, and it adds stakeholder, governance, and lifecycle domains the others do not test.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You do not have to climb in order. There are no formal prerequisites between the exams, so an
                  experienced agent builder can go straight to Architect – Foundations.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="frontier-academy" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is the Claude Frontier Academy?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The{" "}
                  <RefLink href="https://www.anthropic.com/news/claude-frontier-academy">Claude Frontier Academy</RefLink>,
                  announced on October 2, 2026, is not a certification you can sign up for. It is a nomination-only
                  program, backed by $100 million, that trains enterprise engineers to deploy Claude the way Anthropic's
                  own forward-deployed engineers do. Organizations nominate hands-on engineers through their Anthropic
                  account team or partner manager. Engineers complete a multi-day in-person program and a graded practical
                  assessment to earn the <strong>Claude Resident Engineer</strong> badge, then lead a real Claude project
                  at their own company in a 12-week residency. Anthropic says it aims to train 10,000 of these engineers
                  by the end of 2027.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If that role sounds interesting, our guide to the{" "}
                  <Link to="/blog/forward-deployed-ai-engineer" className="text-primary hover:underline">forward-deployed AI engineer</Link>{" "}
                  role explains what the job involves and how to move into it.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="worth-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Are Anthropic certifications worth it for an AI engineering career?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  It depends on where you work. Inside a Claude partner firm, a certification is close to a requirement:
                  partner tiers and client staffing are measured by how many certified people a firm has, so it can
                  directly affect which projects you get. Outside that world, it is a useful but secondary signal.
                  Hiring managers for AI engineering roles still weight a portfolio of shipped LLM systems more than any
                  vendor exam, as we found when researching{" "}
                  <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">what AI engineers are paid for</Link>{" "}
                  and{" "}
                  <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">which AI engineer skills employers ask for</Link>.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Worth it:</strong> you are at or near a partner firm, you build on Claude professionally, and the $99–$175 fee is covered or small for you.</li>
                    <li>• <strong>Do the free courses instead:</strong> you are early in your career, you are switching into AI engineering, or no partner firm is in reach. The learning is the same; spend the time on projects. Our{" "}
                      <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">how to become an AI engineer</Link>{" "}
                      guide shows the order to learn things in.</li>
                    <li>• <strong>Remember the renewal:</strong> a 12-month validity means the certification is a recurring cost in time and money, not a one-off.</li>
                  </ul>
                </div>
              </section>

              <ExploreWithAI path="/blog/anthropic-certifications" variant="questions" />

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
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://www.pearsonvue.com/us/en/anthropic.html">Pearson VUE — Anthropic certification exams (names, codes, eligibility, retake policy, delivery)</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/news/services-track-partner-hub">Anthropic — Claude Partner Network Services Track and Partner Hub (June 3, 2026)</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/news/claude-frontier-academy">Anthropic — Claude Frontier Academy (October 2, 2026)</RefLink></li>
                  <li>• <RefLink href="https://anthropic.skilljar.com/">Anthropic Academy — free course catalog on Skilljar</RefLink></li>
                  <li>• <RefLink href="https://claude.com/partners">Claude Partner Network — official page</RefLink></li>
                  <li>• <RefLink href="https://preporato.com/blog/claude-certifications-complete-guide-2026">Preporato — Claude certifications compared (reported prices, domains, recommended experience)</RefLink></li>
                  <li>• <RefLink href="https://claudecertificationguide.com/blog/new-claude-certifications-2026">Claude Certification Guide — all four exams explained (format, pass mark, validity)</RefLink></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base">
                  <em>Prices, question counts, and validity are as reported by prep providers in October 2026. Anthropic
                  publishes the official exam guides inside the Partner Academy; check them and Pearson VUE before you
                  book.</em>
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/anthropic-certifications" />
      <Footer />
    </div>
  );
};

export default AnthropicCertificationsPost;
