import { ArrowLeft, Clock, User, Calendar, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import ResumeHeroDiagram from "@/components/ResumeHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";
import { AI_ENGINEER_RESUME_TEMPLATE } from "@/config/newsletterBonuses";

const PATH = "/blog/ai-engineer-resume";

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{children}</p>
);
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{children}</h2>
);
const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{children}</h3>
);
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>
);
const In = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-primary hover:underline">{children}</Link>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">{children}</ul>
);
const DataTable = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
    <div className="min-w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>{head.map((h) => <TableHead key={h} className="text-xs sm:text-sm px-2 sm:px-4">{h}</TableHead>)}</TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, j) => (
                  <TableCell key={j} className={`text-xs sm:text-sm px-2 sm:px-4 align-top ${j === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

const GOOGLE_RESUME_VIDEO = "https://www.youtube.com/watch?v=BYUy1yvjHxE";
const GOOGLE_APPLY_VIDEO = "https://www.youtube.com/watch?v=olScOTFtVW8";

const structure: string[][] = [
  ["1. Header", "Name, city and country, email, phone, LinkedIn, GitHub", "1 to 2 lines"],
  ["2. Summary", "The job title you are applying for, years of experience, what you ship", "2 lines"],
  ["3. Skills", "Grouped by area: languages, LLM and retrieval, agents, evaluation, infrastructure", "4 to 5 lines"],
  ["4. Experience", "Roles newest first, each with 2 to 5 result bullets", "Half the page or more"],
  ["5. Projects", "One or two builds with a link, the stack and how you measured them", "4 to 6 lines"],
  ["6. Education and extras", "Degree, then certifications, papers, talks, open source if you have them", "2 to 4 lines"],
];

// Illustrative rewrites. Every number below is made up to show the shape of a strong bullet.
const rewrites = [
  {
    topic: "Retrieval (RAG)",
    before: "Worked on a RAG chatbot using LangChain and Pinecone.",
    after: "Built the retrieval pipeline for a support assistant over 40,000 help articles; hybrid search plus re-ranking raised recall@5 from 0.62 to 0.84 on a 300-question test set.",
    why: "Names the system, its size, the change you made and a retrieval metric with the test set behind it.",
  },
  {
    topic: "Prompts and evaluation",
    before: "Responsible for prompt engineering and testing.",
    after: "Versioned 14 production prompts in Git with a regression suite that runs on every pull request; it caught 9 quality regressions before release in two quarters.",
    why: "Shows prompts treated as code, and evaluation as part of the release process.",
  },
  {
    topic: "Cost",
    before: "Reduced LLM costs.",
    after: "Cut monthly model spend by 38% at the same evaluation score by routing short queries to a smaller model and caching repeated prompts.",
    why: "A saving only counts if quality held. Say how you know it did.",
  },
  {
    topic: "Agents",
    before: "Built AI agents with tool calling.",
    after: "Shipped an agent that drafts refund decisions with 6 internal tools; every payout needs human approval; 71% of drafts were approved unedited across 2,100 cases.",
    why: "States what the agent may do, where a person stays in control, and how often it was right.",
  },
  {
    topic: "Fine-tuning",
    before: "Fine-tuned LLMs for better accuracy.",
    after: "Fine-tuned an open-weight 8B model on 12,000 labelled tickets for intent classification; matched the hosted model's F1 of 0.91 at one fifth of the cost per request.",
    why: "Gives the task, the data size, the baseline you compared against and the reason it was worth doing.",
  },
  {
    topic: "Moving from software engineering",
    before: "Developed REST APIs in Python and maintained microservices.",
    after: "Added a document question-answering endpoint to a Python service used by 300 internal users; p95 latency 2.1 s with streaming; a 120-case test set gates each deploy.",
    why: "Keeps the production engineering and puts the AI work you did inside it at the front.",
  },
];

const keywordGroups: string[][] = [
  ["Languages and backend", "Python, TypeScript, REST APIs, async, automated tests"],
  ["Retrieval", "RAG, chunking, embeddings, vector database, semantic search, hybrid search, re-ranking"],
  ["Agents", "tool calling or function calling, agent orchestration, multi-step workflows, structured output, Model Context Protocol (MCP), LangGraph, LangChain, LlamaIndex"],
  ["Evaluation", "evaluation datasets or test sets, automated evals, LLM-as-judge, regression tests in CI"],
  ["Running it in production", "observability, tracing, latency, cost, token usage, Docker, Kubernetes, CI/CD, AWS, Azure or GCP"],
  ["Safety", "guardrails, prompt injection, human review or human-in-the-loop"],
  ["Often listed as a bonus", "fine-tuning"],
];

const mistakes = [
  { t: "A skills list with no proof.", d: "Twenty tools in a row say nothing. Each skill you list should appear again in a bullet that shows what you did with it." },
  { t: "Tools as the headline.", d: "A bullet that only names a framework describes the tutorial, not your work. Lead with the system and the result; name the tool at the end." },
  { t: "No numbers, or numbers you cannot defend.", d: "A bullet with no number is hard to weigh. A number you cannot explain is worse, because the interviewer will ask how you measured it." },
  { t: "No mention of evaluation.", d: "The job postings we read ask for it by name. If you built a test set or a regression check, it belongs in a bullet." },
  { t: "Demo projects presented as production.", d: "A weekend build is fine when it is labelled as a project. Calling it production invites questions about users, uptime and cost that you cannot answer." },
  { t: "One resume for every application.", d: "The summary and the top bullets should use the wording of the posting in front of you, wherever that wording is true for you." },
  { t: "Design that gets in the way.", d: "Two columns, skill bars, icons and photos make a page harder to scan and harder to parse. A single column with standard headings is enough." },
  { t: "Spilling onto a second page by a few lines.", d: "Cut older roles to two bullets or remove the weakest project until the page ends cleanly." },
];

const faqs = [
  {
    q: "How long should an AI engineer resume be?",
    a: "One page if you can, two at most. Google's recruiters give the same range in their resume advice: one page is ideal, and engineering resumes should not run past two pages. Cut older roles to two bullets before you add a second page.",
  },
  {
    q: "What should an AI engineer put on a resume with no AI job experience?",
    a: "Put your software or data experience first, rewritten to show production ownership, then one or two AI projects with a public link and an evaluation. A project that states its test set, its metric and its known failures carries more weight than a list of courses. If you added any AI feature at your current job, even a small one, lead with it.",
  },
  {
    q: "Which keywords should an AI engineer resume include?",
    a: "Use the terms from the job posting you are applying to, wherever they are true for you. In the postings we read on November 25, 2026, the recurring terms were Python, RAG, embeddings, vector database, re-ranking, tool calling, agent orchestration, evaluation and LLM-as-judge, observability and tracing, guardrails, prompt injection, Docker, CI/CD and a cloud platform. Put each term inside a bullet that shows what you did with it.",
  },
  {
    q: "Should I list every AI tool and framework I have tried?",
    a: "No. List only what you can answer interview questions about. Google's recruiters give this advice for programming languages, and it applies to frameworks too. Three tools backed by bullets are stronger than fifteen that are not.",
  },
  {
    q: "Do I need numbers in every bullet?",
    a: "Aim for a number in most bullets, and never invent one. Useful numbers for AI work are a quality metric with its test set size, latency, cost per request, the number of users or documents, and how often a person accepted the output. If you did not measure something, describe the scale and the decision instead.",
  },
  {
    q: "Should an AI engineer resume be a PDF or a Word file?",
    a: "Send a PDF unless the application form asks for another format. Google's recruiters say PDF is preferred. Keep the text real and selectable, in a single column with standard section headings, so that people and parsing software can both read it.",
  },
  {
    q: "Is there a free AI engineer resume template?",
    a: "Yes. The template on this page is free with the newsletter sign-up: an editable Word file, plus a PDF that shows the template and a filled example. The example is illustrative; its name, companies and numbers are made up.",
  },
];

const AIEngineerResumePost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-800 rounded-full px-3 py-1">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Engineer Resume: Template, Examples and Bullet Rewrites (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                An <strong>AI engineer resume</strong> has one job: to show that you have built systems with a model
                inside them, measured them and kept them running. This guide gives you the structure, section by
                section, six before-and-after bullet rewrites, the keywords that current job postings ask for, and a{" "}
                <a href="#get-template" className="text-primary hover:underline">free template in Word and PDF</a>.
                The examples are illustrative: the names, companies and numbers in them are made up.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Career Guide</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 25, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />11 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ResumeHeroDiagram />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR: an AI engineer resume in six sections.</strong> Header, a two-line summary, grouped
                skills, experience, one or two projects, then education. Keep it to one page if you can and two at
                most, in a single column. Write every bullet as what you built, the measured result and how you did
                it, for example a retrieval metric on a named test set, latency, or cost per request. Take your
                keywords from the job posting, and list only tools you can answer interview questions about. Never
                use a number you did not measure.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <NewsletterSignup
              compact
              heading="Get the AI engineer resume template (Word + PDF)"
              subtext="Free with the weekly email for AI engineers. Unsubscribe anytime."
              bonus={AI_ENGINEER_RESUME_TEMPLATE}
            />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="structure">1. What Does an AI Engineer Resume Look Like?</H2>
                <P>
                  It looks like a good software engineering resume with the AI work moved to the front. The order
                  below works for most people with at least one job behind them. New graduates move education to the
                  top; everyone else keeps it at the bottom.
                </P>
                <DataTable head={["Section", "What goes in it", "Space"]} rows={structure} />
                <P>
                  Keep it to one page if you can. Google's recruiters say{" "}
                  <A href={GOOGLE_APPLY_VIDEO}>one page is ideal</A> and that engineering resumes should be{" "}
                  <A href={GOOGLE_RESUME_VIDEO}>no longer than two pages</A>, with experience taking up most of
                  the space. We follow that range here. Nothing in this guide depends on tricks for resume-screening
                  software; you will see statistics about how many resumes such software rejects, and we could not
                  find a primary source for them, so we do not repeat them.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sections">2. What Goes in Each Section?</H2>

                <H3 id="header">Header</H3>
                <P>
                  Your name, city and country, email, phone, LinkedIn and GitHub, on one or two lines. Google's
                  recruiters call a GitHub profile or other open-source work{" "}
                  <A href={GOOGLE_RESUME_VIDEO}>critical for technical candidates</A>. Leave out a photo and your
                  full street address. Make sure the pinned repositories on your GitHub are the ones you want read.
                </P>

                <H3 id="summary">Summary</H3>
                <P>
                  Two lines. Use the job title from the posting, your years of experience, how many of them involved
                  shipping LLM features, and the kind of system you build. Skip adjectives about yourself. An
                  illustrative example: <em>AI engineer with 6 years of software experience, 2 of them shipping LLM
                  features to production. Builds retrieval and agent systems with evaluation in the release
                  process.</em>
                </P>

                <H3 id="skills">Skills</H3>
                <P>
                  Group skills so a reader can find what they need in a few seconds: languages, LLM and retrieval,
                  agents, evaluation, infrastructure. List only what you can be interviewed on. Google's recruiters
                  tell candidates to put programming languages near the top and to be{" "}
                  <A href={GOOGLE_RESUME_VIDEO}>comfortable interviewing in them</A>; apply the same test to every
                  framework you name. Our{" "}
                  <In to="/blog/ai-engineer-skills">AI engineer skills breakdown</In> shows which ones matter at each
                  level.
                </P>

                <H3 id="experience">Experience</H3>
                <P>
                  This section decides the outcome. List roles newest first with the title, employer and dates in
                  month and year. Give the current role three to five bullets and older roles two or three. Put the
                  AI work first inside each role, even if it was a small part of the job. Section 3 shows how to
                  write the bullets.
                </P>

                <H3 id="projects">Projects</H3>
                <P>
                  One or two, each with a link. A project earns its place when it shows something the job history
                  does not, which is why it matters most for people moving into AI. Say what it does, who uses it and
                  how you measured it. A repository whose README shows the test set, the metric and the known
                  failures tells a reviewer that you work the way their team does.
                </P>

                <H3 id="education">Education, certifications and extras</H3>
                <P>
                  Degree, university and year on one line. Add certifications, papers, talks and open-source
                  contributions only when they are relevant to the role. If you are weighing a certificate, our guide
                  to <In to="/blog/anthropic-certifications">Anthropic certifications</In> covers what each one
                  tests.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="bullets">3. How Do You Write a Strong Resume Bullet?</H2>
                <P>
                  Use three parts: <strong>what you built, the measured result, and how you did it</strong>. This is
                  the structure Google's recruiters teach as{" "}
                  <A href={GOOGLE_RESUME_VIDEO}>"Accomplished [X] as measured by [Y] by doing [Z]"</A>. For AI work,
                  the middle part is where most resumes are thin, so pick the measure before you write the sentence:
                </P>
                <UL>
                  <li>• <strong>Quality:</strong> recall@k, faithfulness, accuracy or F1, with the size of the test set.</li>
                  <li>• <strong>Speed:</strong> p50 or p95 latency, time to first token.</li>
                  <li>• <strong>Cost:</strong> cost per request or monthly spend, at a stated quality level.</li>
                  <li>• <strong>Scale:</strong> users, requests per day, documents indexed.</li>
                  <li>• <strong>Trust:</strong> how often a person accepted the output unedited, or how many bad outputs a guardrail stopped.</li>
                </UL>
                <P>
                  The rewrites below show the pattern.{" "}
                  <strong>Every number in them is made up for illustration.</strong> Use only numbers you measured
                  and can explain, because each one is a question you will be asked. Our{" "}
                  <In to="/blog/ai-engineer-interview-questions">AI engineer interview questions</In> guide shows how
                  those follow-ups go.
                </P>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {rewrites.map((r) => (
                    <div key={r.topic} className="border border-border rounded-lg p-3 sm:p-4 bg-card/50">
                      <p className="font-semibold text-sm sm:text-base mb-2">{r.topic}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-1">
                        <span className="font-medium text-foreground">Before: </span>{r.before}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed mb-1">
                        <span className="font-medium text-primary">After: </span>{r.after}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        <span className="font-medium text-foreground">Why it works: </span>{r.why}
                      </p>
                    </div>
                  ))}
                </div>
                <P>
                  If you have no number for a piece of work, do not make one up. Describe the scale and the decision
                  instead: what you chose, what you rejected and why.
                </P>
              </section>

              <div id="get-template" className="scroll-mt-24">
                <NewsletterSignup
                  heading="Get the AI engineer resume template"
                  subtext="An editable Word file with every section and bullet pattern from this guide, plus a PDF with a filled example. Free when you join the weekly AI engineering brief; the download link appears right after you sign up."
                  bonus={AI_ENGINEER_RESUME_TEMPLATE}
                />
              </div>

              <TopmateCTA
                placement="resume-mid"
                heading="Want a second pair of eyes on your resume?"
                text="Resume review and interview prep, 1:1 with an AI Engineering Lead."
              />

              <section className="mb-6 sm:mb-8">
                <H2 id="keywords">4. Which Keywords Do AI Engineer Job Postings Ask For?</H2>
                <P>
                  We read seven AI engineer job postings on November 25, 2026, from software companies, a bank
                  platform, a manufacturer, a healthcare group and consultancies. Four are linked under References.
                  The terms below each appeared in at least two of them. Treat the table as a checklist of what to
                  look for in your own target posting, and not as a list to paste.
                </P>
                <DataTable head={["Area", "Terms that recurred"]} rows={keywordGroups} />
                <P>
                  Two patterns stood out. First, the postings ask for evaluation by name, and several ask for it in
                  the release process as regression checks. Second, they separate production work from prototypes;
                  one says it wants someone who can ship AI applications,{" "}
                  <A href="https://quabyt.com/careers/ai-engineer">"not just prototype them"</A>. A resume that shows
                  measurement and operation answers both.
                </P>
                <P>
                  How to use the terms: read the posting, mark the terms that are true for you, and use the posting's
                  wording for them in your summary and bullets. Google's recruiters recommend{" "}
                  <A href={GOOGLE_RESUME_VIDEO}>reading the job description and looking at the language it uses</A>.
                  Do not add a term you cannot discuss.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="by-background">5. How Should You Adapt It to Your Background?</H2>
                <H3>Moving from software engineering</H3>
                <P>
                  Your production experience is the asset: APIs, testing, on-call, cost. Keep those bullets and put
                  any AI feature you shipped at the front of the role, however small. Add one project that covers the
                  gap, usually retrieval with an evaluation. The path is laid out in{" "}
                  <In to="/blog/how-to-become-an-ai-engineer">how to become an AI engineer</In>.
                </P>
                <H3>Moving from data science or ML</H3>
                <P>
                  You already have evaluation discipline. What reviewers look for is shipping: services, latency,
                  deploys, monitoring. Rewrite model-centred bullets to end in what reached users, and move notebooks
                  and competitions below production work.
                </P>
                <H3>New graduate</H3>
                <P>
                  Education goes first. Then projects, internships, research and open source, each written with the
                  same three-part bullet. One project with real users or a public evaluation is worth more than five
                  course assignments.
                </P>
                <H3>Senior or lead</H3>
                <P>
                  Add scope: the decisions you owned, the size of the system, what you chose not to build, and the
                  people you raised. Two pages are reasonable here. For where levels and pay sit, see the{" "}
                  <In to="/blog/ai-engineer-salary">AI engineer salary guide</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="mistakes">6. What Mistakes Should You Avoid?</H2>
                <UL>
                  {mistakes.map((m) => (
                    <li key={m.t}>• <strong>{m.t}</strong> {m.d}</li>
                  ))}
                </UL>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="format">7. How Should You Format and Send It?</H2>
                <UL>
                  <li>• <strong>Layout:</strong> a single column, standard headings (Summary, Skills, Experience, Projects, Education), one plain font, consistent dates.</li>
                  <li>• <strong>File:</strong> PDF, unless the form asks for something else. Google's recruiters say <A href={GOOGLE_RESUME_VIDEO}>PDF is preferred</A>. Export it from your editor so the text stays selectable; do not send a scan or an image.</li>
                  <li>• <strong>File name:</strong> your name and the role, for example firstname-lastname-ai-engineer.pdf.</li>
                  <li>• <strong>Links:</strong> open every link in a private window before you send it.</li>
                  <li>• <strong>Proofread:</strong> read it aloud once. Typos in a resume about careful engineering cost more than they should.</li>
                </UL>
                <H3 id="checklist">A two-minute check before you send</H3>
                <UL>
                  <li>• Does the summary use the job title from this posting?</li>
                  <li>• Does the first bullet of the current role describe AI work with a number?</li>
                  <li>• Does at least one bullet mention evaluation?</li>
                  <li>• Can you explain how every number was measured?</li>
                  <li>• Does every skill you list appear in at least one bullet?</li>
                  <li>• Does the page end cleanly, with no stray lines on a second page?</li>
                </UL>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">Frequently Asked Questions</H2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <TopmateCTA placement="resume" />
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="references">References and related guides</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href={GOOGLE_RESUME_VIDEO}>Life at Google: Create Your Resume for Google, Tips and Advice (video by Google recruiters)</A></li>
                  <li>• <A href={GOOGLE_APPLY_VIDEO}>Life at Google: How to apply for a job at Google (video)</A></li>
                  <li>• Job postings read on November 25, 2026: <A href="https://quabyt.com/careers/ai-engineer">Quabyt, AI Engineer</A>; <A href="https://www.verasoft.com/careers/jobs/senior-ai-engineer">Verasoft, Senior AI Engineer</A>; <A href="https://careers.skaleet.com/jobs/8659645-ai-engineer-llm-agents-python-h-f">Skaleet, AI Engineer</A>; <A href="https://cat.wd5.myworkdayjobs.com/en-US/CaterpillarCareers/job/AI-Engineer_R0000401627-1">Caterpillar, AI Engineer</A>. Postings are taken down when roles close.</li>
                  <li>• <In to="/blog/ai-engineer-skills">AI Engineer Skills: What You Actually Need</In></li>
                  <li>• <In to="/blog/ai-engineer-interview-questions">AI Engineer Interview Questions</In></li>
                  <li>• <In to="/blog/how-to-become-an-ai-engineer">How to Become an AI Engineer</In></li>
                  <li>• <In to="/blog/ai-engineer-salary">AI Engineer Salary Guide</In></li>
                  <li>• <In to="/ai-engineering-roadmap">AI Engineering Roadmap</In></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current={PATH} />
      <Footer />
    </div>
  );
};

export default AIEngineerResumePost;
