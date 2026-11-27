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
import { CLAUDE_CERT_PREP_CHECKLIST } from "@/config/newsletterBonuses";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

// Names and codes: Pearson VUE's Anthropic page. Prices: Anthropic's Partner Academy
// certification FAQ. Audience and domains: prep providers that publish the exam guides
// (Anthropic shows the guides inside the Partner Academy only), except Developer –
// Professional, whose audience and domains are from Anthropic's own prep-course page.
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
    name: "Claude Certified Developer – Professional",
    code: "CCDV-P",
    who: "Experienced engineers who operate Claude-powered applications and agents in production at scale",
    covers: "Agent architecture and orchestration, production integration and reliability, observability, debugging and incident response, evaluation engineering, cost and latency, runtime guardrails and security, operating fleets of coding agents",
    price: "$175",
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

// Course titles: the public catalog at academy.claude.com/courses (read Nov 26, 2026).
// The mapping to exams is our recommendation, not Anthropic's.
const coursePaths = [
  {
    exam: "Associate (CCAO-F)",
    courses: "Claude 101 · AI Fluency: Framework and foundations · AI capabilities and limitations · Introduction to Claude Cowork",
  },
  {
    exam: "Developer – Foundations (CCDV-F)",
    courses: "Claude Platform 101 · Building with the Claude API · Tool use with the Messages API · Introduction to Model Context Protocol · Claude Code 101 · Introduction to agent skills",
  },
  {
    exam: "Developer – Professional (CCDV-P)",
    courses: "Everything on the Developer – Foundations path · Introduction to evals · Introduction to subagents · Model Context Protocol: Advanced topics",
  },
  {
    exam: "Architect – Foundations (CCAR-F)",
    courses: "Building with the Claude API · Model Context Protocol: Advanced topics · Claude Code in action · Introduction to subagents · Introduction to agent skills",
  },
  {
    exam: "Architect – Professional (CCAR-P)",
    courses: "Everything on the Architect – Foundations path · Introduction to evals · Claude on Google Cloud or Claude with Amazon Bedrock (whichever is your platform)",
  },
];

// The checklist below is the short version of the subscriber PDF. Every rule is from
// Pearson VUE's Anthropic pages or Anthropic's Partner Academy certification FAQ.
const prepChecklist = [
  { when: "Before you book", items: "Confirm your firm is in the Claude Partner Network and sign in to the Partner Academy with your company email. Make the name in your exam profile match your government ID exactly; it locks for a year once confirmed. Decide whether you test before or after December 7, and download the matching exam guide." },
  { when: "While you prepare", items: "Work through the exam guide domain by domain; it is the authoritative scope. Take the free courses mapped above and build one small project per domain. Practise the sample questions in the guide; there is no official practice exam." },
  { when: "The week before (online exams)", items: "Run Pearson's system test on the same computer and network you will use. Plan a personal network: VPNs and corporate networks are not allowed. One screen only, with a working webcam, microphone and speakers; no headphones." },
  { when: "Exam day", items: "Start check-in 30 minutes early. Have a valid, physical government photo ID. Clear the desk: no notes, paper, pens or phone. The exam is closed book; you get a digital whiteboard. Allow about 135 minutes in total." },
  { when: "Afterwards", items: "Your score shows on screen at the end. If you pass, claim the badge from the Credly email. If not, the score report shows your percentage per section; the first retake is allowed after 14 days." },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What certifications does Anthropic offer?",
    a: "Anthropic offers five proctored Claude certifications, delivered by Pearson VUE: Claude Certified Associate – Foundations (CCAO-F) for business users, Claude Certified Developer – Foundations (CCDV-F) for engineers building on the API, Claude Certified Developer – Professional (CCDV-P) for engineers who run Claude systems in production at scale, Claude Certified Architect – Foundations (CCAR-F, often written CCA-F) for builders of agent systems, and Claude Certified Architect – Professional (CCAR-P) for senior solution architects. Separately, the free Claude Academy courses give completion badges, and the nomination-only Claude Frontier Academy awards a Claude Resident Engineer badge.",
  },
  {
    q: "Is the Anthropic certification free?",
    a: "No. Anthropic's certification FAQ lists $99 for the Associate exam, $125 each for Developer – Foundations and Architect – Foundations, and $175 each for Developer – Professional and Architect – Professional, per attempt. Select, Preferred and Global Premier partners get 50% off, and the discount also applies to retakes. What is free: the Claude Academy courses, which anyone can take, and joining the Claude Partner Network as a firm.",
  },
  {
    q: "Can an individual take a Claude certification exam without a partner company?",
    a: "Not directly. Anthropic's certification FAQ says certification is currently available only to organizations in the Claude Partner Network, and registration needs a partner email address on a recognized company domain; personal email addresses do not work. In practice you need to work at a partner firm. If you are not near one, take the free Claude Academy courses and build public Claude projects; that covers most of the learning without the exam.",
  },
  {
    q: "Which Anthropic certification should I take first?",
    a: "Match it to your job. Business users who use Claude daily but do not code should start with the Associate (CCAO-F). Software engineers building on the Claude API should start with Developer – Foundations (CCDV-F), and move to Developer – Professional (CCDV-P) once they operate Claude systems in production. Engineers who design agent systems with tools, MCP, and Claude Code should take Architect – Foundations (CCAR-F). Architect – Professional (CCAR-P) is for people who design and govern Claude solutions at enterprise scale. None of the exams requires another first.",
  },
  {
    q: "Are Anthropic Academy courses free, and do they give a certificate?",
    a: "Yes. Anthropic's courses now live at Claude Academy (academy.claude.com) and are free; you can browse without signing in, and a free Claude account saves your progress. Passing a course's quizzes gives a completion badge you can share, but it is not a Claude certification: the certifications require passing a proctored Pearson VUE exam. The old course site, anthropic.skilljar.com, closes in early December 2026.",
  },
  {
    q: "How long is a Claude certification valid, and how many times can I retake the exam?",
    a: "A Claude certification is valid for 12 months from the date you earn it, and Anthropic says on-time renewal is a free, non-proctored assessment. Pearson VUE's retake policy allows up to four attempts per exam in any rolling 12-month period, with a 14-day wait after the first attempt, 30 days after the second, and 90 days after the third.",
  },
  {
    q: "What changes in the Claude certification exams on December 7, 2026?",
    a: "Pearson VUE states that the Associate – Foundations, Developer – Foundations, and Architect – Professional exams include updated content from December 7, 2026, with updated exam guides published on November 17. The updated exams have 70 questions, 60 scored and 10 unscored. If you test on December 7 or later, prepare from the updated guide in the Anthropic Partner Academy. Architect – Foundations is not on the list of exams changing.",
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
                Anthropic Certifications (2026): All 5 Claude Exams, Costs, Eligibility, and the Free Claude Academy Courses
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Anthropic has five Claude certifications, one set of free courses, and one invitation-only academy, and people mix them up.</strong>{" "}
                This guide maps all of it: what each certification tests and costs, who is allowed to sit the exams,
                what changes on December 7, 2026, which free Claude Academy courses prepare you for which exam, how
                the Claude Frontier Academy fits in, and whether any of it is worth your time if you are building an
                AI engineering career. It ends with an exam-prep checklist you can work through.
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
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AnthropicCertificationsHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> Anthropic offers five proctored Claude certifications through Pearson VUE:
                Associate – Foundations (CCAO-F, business users, $99), Developer – Foundations (CCDV-F, API engineers,
                $125), Developer – Professional (CCDV-P, engineers running Claude in production, $175), Architect –
                Foundations (CCAR-F, agent-system builders, $125), and Architect – Professional (CCAR-P, senior
                architects, $175). Each is a 120-minute exam with a pass mark of 720 on a 100–1,000 scale, valid for
                12 months. Three of the exams carry updated content from December 7, 2026. The exams are open only to
                organizations in the Claude Partner Network, so you need to work at a partner firm. Anyone can take
                the free courses at Claude Academy, which give completion badges, not certifications. The Claude
                Frontier Academy is a separate, nomination-only program.
              </p>
            </div>

            <ExploreWithAI path="/blog/anthropic-certifications" variant="strip" />

            <NewsletterSignup
              compact
              heading="Get the Claude certification exam-prep checklist (PDF)"
              subtext="Free with the weekly email for AI engineers. Unsubscribe anytime."
              bonus={CLAUDE_CERT_PREP_CHECKLIST}
            />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-certifications" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What certifications does Anthropic offer?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's certification program has five exams. The names and exam codes below are the ones on{" "}
                  <RefLink href="https://www.pearsonvue.com/us/en/anthropic.html">Pearson VUE's Anthropic page</RefLink>,
                  which delivers the exams, and the prices are from{" "}
                  <RefLink href="https://anthropic-partners.skilljar.com/page/faq-certifications">Anthropic's certification FAQ</RefLink>,
                  in US dollars before any partner discount. Anthropic publishes the detailed exam guides inside its
                  Partner Academy, so the audience and domain columns come from prep providers that publish the
                  blueprints, except for Developer – Professional, where they come from Anthropic's own prep-course
                  page. Confirm them against the exam guide before you book.
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
                  post. The Associate, Developer – Foundations, and Architect – Professional exams followed in July
                  2026, and Developer – Professional has since been added, giving the Developer and Architect tracks
                  two levels each. Uptake has been fast: in October 2026 Anthropic reported that professionals across
                  46,000 firms had earned{" "}
                  <RefLink href="https://www.anthropic.com/news/claude-frontier-academy">more than 175,000 Claude certifications</RefLink>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One detail matters if you work at a partner firm: Anthropic's FAQ says the Associate exam does not
                  count towards Claude Partner Network eligibility. The other four do.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="exam-format" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is the exam format, and how long is a certification valid?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All five exams share the same format, so once you know one you know the others. These points are
                  from Anthropic's certification FAQ and Pearson VUE unless marked:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Length:</strong> 120 minutes to answer multiple-choice and scenario-based multiple-response questions. Anthropic says to plan about 135 minutes of seat time, including check-in and a short survey.</li>
                    <li>• <strong>Questions:</strong> the updated exams and Developer – Professional have 70 questions, 60 scored and 10 unscored. Prep providers report 60 for Architect – Foundations.</li>
                    <li>• <strong>Pass mark:</strong> a scaled score of 720 on a 100–1,000 scale. Scaled means it is not a raw 72%; scores are equated across exam forms of slightly different difficulty.</li>
                    <li>• <strong>Closed book:</strong> no notes, documentation, translation tools or AI assistants. Online candidates get a digital whiteboard.</li>
                    <li>• <strong>Delivery:</strong> Pearson VUE, either online with OnVUE proctoring (webcam, room scan, photo ID) or at a Pearson test center, in English or Japanese.</li>
                    <li>• <strong>Results:</strong> your score shows on screen at the end. The score report gives your percentage correct per section, which tells you what to review before a retake.</li>
                    <li>• <strong>Rescheduling:</strong> test-center exams up to 48 hours before the appointment; online exams up to one hour before. Miss the window, or the appointment, and the fee is forfeited.</li>
                    <li>• <strong>Retakes:</strong> up to four attempts per exam in any rolling 12 months. Pearson VUE's policy is a 14-day wait after the first attempt, 30 days after the second, and 90 days after the third.</li>
                    <li>• <strong>Validity:</strong> 12 months from the date you earn it. Anthropic says on-time renewal is a free, non-proctored assessment; let it lapse and you retake the full exam at the full fee.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="december-7-update" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What changes on December 7, 2026?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Three exams get updated content on December 7, 2026: Associate – Foundations, Developer –
                  Foundations, and Architect – Professional.</strong> Pearson VUE's page says the updated exam guides
                  were published on November 17, and that anyone testing on December 7 or later should prepare from
                  the updated guide. The date you sit the exam decides which version you get, so check which guide
                  you are studying from before you book. Architect – Foundations is not on the list.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The updated guides sit inside the Partner Academy, so we cannot show the new domain weights here.
                  Prep providers report that the weights shift on all three exams; treat any third-party table as
                  provisional and read the guide itself. Two other changes are already in effect: since November 12,
                  2026 you sign in to Pearson through the Partner Academy and pay at Pearson's checkout, and the
                  domain lists in our table above describe the exams as they stand through December 6.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="who-can-take" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Who can take an Anthropic certification exam?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the question most guides skip. Pearson VUE states plainly that "certification is open to
                  organizations in the Claude Partner Network," and you register through the{" "}
                  <strong>Anthropic Partner Academy</strong>, not through a public signup page. Anthropic's FAQ adds
                  that registration needs a partner email address on a recognized company domain, that personal
                  addresses do not work, and that candidates must be at least 18. Anthropic's{" "}
                  <RefLink href="https://www.anthropic.com/news/services-track-partner-hub">partner announcement</RefLink>{" "}
                  describes the model: getting started in the network is free, and member firms gain Partner Academy
                  access, including the certification exams. Registered-tier partners pay full price; Select,
                  Preferred and Global Premier partners get 50% off, and the discount applies to retakes too.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  So the realistic routes to a Claude certification are:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>You work at a partner firm</strong> (consultancies, systems integrators, and software companies that build on Claude). Ask your partner or training lead for Partner Academy access.</li>
                    <li>• <strong>Your company could become a partner.</strong> Joining is free for firms at <RefLink href="https://claude.com/partners">claude.com/partners</RefLink>. If your team already ships Claude work for clients, this is worth raising internally.</li>
                    <li>• <strong>Neither applies.</strong> You cannot book the exam yourself today. Take the free Claude Academy courses below, build public Claude projects, and check the Pearson VUE page every few months in case eligibility opens up.</li>
                  </ul>
                </div>
              </section>

              <div id="prep-checklist-download">
                <NewsletterSignup
                  heading="Sitting an exam? Get the exam-prep checklist"
                  subtext="A two-page PDF to tick off: what to settle before you book, a four-week study plan, the online-proctoring computer and room rules, and exam day. Every rule is taken from Pearson VUE and Anthropic's own pages. Free with the weekly email."
                  bonus={CLAUDE_CERT_PREP_CHECKLIST}
                />
              </div>

              <section className="mb-6 sm:mb-8">
                <h2 id="anthropic-academy" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What are the free Anthropic Academy courses?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's free courses now live at{" "}
                  <RefLink href="https://academy.claude.com/courses">Claude Academy</RefLink> (academy.claude.com).
                  You can browse the catalog without signing in, and a free Claude account saves your progress; you
                  do not need a paid plan or a partner company. Passing a course's quizzes gives you a completion
                  badge you can share. That is useful as a signal of effort, but it is <em>not</em> a Claude
                  certification, which always means a proctored Pearson VUE exam.
                </p>
                <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base leading-relaxed m-0">
                    <strong>If you took courses on the old site:</strong> Anthropic's{" "}
                    <RefLink href="https://academy.claude.com/help/faq">Claude Academy FAQ</RefLink> says
                    anthropic.skilljar.com closes in early December 2026. Before then, import your history into
                    Claude Academy with a Claude account that uses the same email address, and save any certificate
                    PDFs you want to keep. The partner training site, anthropic-partners.skilljar.com, is not
                    affected.
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The public catalog on November 26, 2026 is grouped like this:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Start your journey:</strong> Claude 101, Claude Code 101, Introduction to Claude Cowork, Introduction to Claude Tag, Claude Platform 101.</li>
                    <li>• <strong>Learn the products:</strong> Claude Code in action, Introduction to Model Context Protocol, Model Context Protocol: Advanced topics, Introduction to subagents, Introduction to agent skills, The AI-native SDLC playbook.</li>
                    <li>• <strong>Build with the API:</strong> Building with the Claude API, Tool use with the Messages API, Introduction to evals, Claude with Amazon Bedrock, Claude on Google Cloud.</li>
                    <li>• <strong>Become AI fluent:</strong> AI Fluency: Framework and foundations, AI capabilities and limitations, Building effective human-agent teams (beta), plus AI Fluency versions for builders, creative work, educators, nonprofits, small businesses and students.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you are an engineer, skip the audience-specific AI Fluency variants and go straight to the
                  product and API tracks. They teach the same material the Developer and Architect exams test, and
                  they are the closest thing to official exam prep that is open to everyone. Partner firms also get
                  exam-specific prep courses inside the Partner Academy.
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
                    <li>• <strong>You already run Claude systems in production:</strong> Developer – Professional (CCDV-P). Anthropic describes it as covering reliability, observability, incident response, evaluation, cost and latency, security, and fleets of coding agents.</li>
                    <li>• <strong>You design agent systems</strong> with tools, MCP servers, subagents, and Claude Code: Architect – Foundations (CCAR-F). This is the most established exam and the one with the most prep material.</li>
                    <li>• <strong>You lead Claude delivery for clients or a platform team:</strong> Architect – Professional (CCAR-P). Prep providers list 3+ years of systems architecture plus production LLM delivery as the recommended background, and it adds stakeholder, governance, and lifecycle domains the others do not test.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You do not have to climb in order. Anthropic's FAQ confirms there is no formal prerequisite, so
                  you can take Architect – Professional without holding Foundations, and passing Foundations does not
                  upgrade to Professional automatically.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="exam-prep-checklist" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Claude certification exam-prep checklist</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An exam fee can be forfeited over logistics alone: a name that does not match the ID, a setup
                  that fails the online-proctoring rules, a missed reschedule window. This is the short version of
                  the checklist. Each rule comes from{" "}
                  <RefLink href="https://www.pearsonvue.com/us/en/anthropic/onvue.html">Pearson VUE's online-testing requirements for Anthropic</RefLink>{" "}
                  or Anthropic's certification FAQ.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">When</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What to do</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {prepChecklist.map((c) => (
                            <TableRow key={c.when}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{c.when}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{c.items}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The{" "}
                  <a href="#prep-checklist-download" className="text-primary hover:underline">two-page PDF version</a>{" "}
                  has tick boxes, the full computer and room rules, and a four-week study plan. If you would rather
                  talk through which exam fits your role and how to prepare around a full-time job, book a 1:1
                  session.
                </p>
                <TopmateCTA placement="certification" />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="frontier-academy" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is the Claude Frontier Academy?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The{" "}
                  <RefLink href="https://www.anthropic.com/news/claude-frontier-academy">Claude Frontier Academy</RefLink>,
                  announced on October 2, 2026, is not a certification you can sign up for. It is a nomination-only
                  program, backed by $100 million, that trains what Anthropic calls Frontier Deployed Engineers to
                  the same standard as its own engineers. Organizations nominate hands-on engineers and ask their
                  Anthropic account team or Partner Account Manager whether they are eligible. Engineers complete a
                  multi-day in-person program and a graded practical to earn the <strong>Claude Resident
                  Engineer</strong> badge, then lead a real Claude project at their own company in a 12-week
                  residency. Those who pass a second assessment at the end earn the <strong>Claude Frontier Deployed
                  Engineer</strong> badge; Anthropic expects the first of those in early 2027, and aims to train
                  10,000 engineers by the end of 2027.
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
                    <li>• <strong>Remember the renewal:</strong> a 12-month validity means the certification needs attention every year. On-time renewal is a free assessment; a lapsed one means the full exam at the full fee.</li>
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
                <TopmateCTA placement="certification" />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://www.pearsonvue.com/us/en/anthropic.html">Pearson VUE — Anthropic certification exams (names, codes, eligibility, December 7 update, retake policy)</RefLink></li>
                  <li>• <RefLink href="https://www.pearsonvue.com/us/en/anthropic/onvue.html">Pearson VUE — online testing requirements for Anthropic exams (computer, room, ID, check-in)</RefLink></li>
                  <li>• <RefLink href="https://anthropic-partners.skilljar.com/page/faq-certifications">Anthropic Partner Academy — certification FAQ (prices, discounts, eligibility, format, scoring, validity)</RefLink></li>
                  <li>• <RefLink href="https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional">Anthropic Partner Academy — Claude Certified Developer – Professional prep courses (audience and domains)</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/news/services-track-partner-hub">Anthropic — Claude Partner Network Services Track and Partner Hub (June 3, 2026)</RefLink></li>
                  <li>• <RefLink href="https://www.anthropic.com/news/claude-frontier-academy">Anthropic — Claude Frontier Academy (October 2, 2026)</RefLink></li>
                  <li>• <RefLink href="https://academy.claude.com/courses">Claude Academy — free course catalog</RefLink></li>
                  <li>• <RefLink href="https://academy.claude.com/help/faq">Claude Academy — FAQ (free access, completion badges, Skilljar closure)</RefLink></li>
                  <li>• <RefLink href="https://claude.com/partners">Claude Partner Network — official page</RefLink></li>
                  <li>• <RefLink href="https://preporato.com/blog/claude-certifications-complete-guide-2026">Preporato — Claude certifications compared (reported domains and recommended experience)</RefLink></li>
                  <li>• <RefLink href="https://claudecertificationguide.com/blog/new-claude-certifications-2026">Claude Certification Guide — the four July 2026 exams explained</RefLink></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base">
                  <em>Every source was re-read on November 26, 2026. Domain lists, recommended experience, and the
                  Architect – Foundations question count are as reported by prep providers. Anthropic publishes the
                  official exam guides inside the Partner Academy; check them and Pearson VUE before you book.</em>
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
