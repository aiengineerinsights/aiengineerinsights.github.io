import { ArrowLeft, Clock, User, Calendar, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import CCAHeroDiagram from "@/components/CCAHeroDiagram";

const domains = [
  {
    domain: "1. Agentic Architecture & Orchestration",
    weight: "27%",
    tests: "Agentic loops driven by stop_reason (continue on tool_use, halt on end_turn), multi-agent coordination and subagent spawning, task decomposition, session state, iteration caps as guardrails",
  },
  {
    domain: "2. Claude Code Configuration & Workflows",
    weight: "20%",
    tests: "CLAUDE.md hierarchy and precedence (project / user / enterprise), custom skills and slash commands, CI/CD integration",
  },
  {
    domain: "3. Prompt Engineering & Structured Output",
    weight: "20%",
    tests: "Explicit success criteria, few-shot examples, JSON schema / structured output, validation-retry loops",
  },
  {
    domain: "4. Tool Design & MCP Integration",
    weight: "18%",
    tests: "Tool descriptions that describe the user-facing function (not the implementation), structured MCP error contracts with recovery hints, the tool_choice parameter",
  },
  {
    domain: "5. Context Management & Reliability",
    weight: "15%",
    tests: "Rolling-window context management, provenance preservation across long sessions, escalation patterns when an agent can't proceed",
  },
];

const logistics = [
  { item: "Exam code", value: "CCAR-F (Claude Certified Architect – Foundations; also written CCA-F)" },
  { item: "Questions", value: "About 60 multiple-choice, scenario-based*" },
  { item: "Duration", value: "120 minutes, single sitting" },
  { item: "Delivery", value: "Pearson VUE — OnVUE online proctoring or a test center" },
  { item: "Open book?", value: "No — closed-book, no notes, no docs, no AI tools" },
  { item: "Scoring", value: "Scaled 100–1000; pass = 720" },
  { item: "Price", value: "$125 per attempt (launched at $99; see cost caveats below)" },
  { item: "Access", value: "Exam gated to Claude Partner Network members (joining is free); prep courses free to anyone" },
  { item: "Retakes", value: "14 days after 1st fail, 30 after 2nd, 90 after 3rd; max 4 attempts per rolling 12 months" },
  { item: "Validity", value: "~12 months, with free on-time renewal reported" },
];

const faqs = [
  {
    q: "Is the Claude Certified Architect exam free? How much does it cost?",
    a: "The exam is not free — it's widely reported at $125 per attempt (it launched at $99 in March 2026, and Anthropic officially mentions only a discounted first attempt for tiered partners; early 'free for partners' claims are unverified). What IS free: joining the Claude Partner Network, and all of the Anthropic Academy prep courses, which are open to anyone.",
  },
  {
    q: "How many questions is the CCAR-F exam, and how long is it?",
    a: "About 60 multiple-choice, scenario-based questions in 120 minutes (a minority of sources report 77 questions — Anthropic hasn't published an official count). You get 4 extended scenarios drawn from a bank of 6, each with a cluster of questions about what you'd do in that system.",
  },
  {
    q: "What is the passing score for the Claude Certified Architect exam?",
    a: "720 on a scaled score of 100–1000. Because the score is scaled, that's not a raw 72% — the exact number of questions you need right varies with form difficulty.",
  },
  {
    q: "Is the Claude Certified Architect certification worth it?",
    a: "Worth it if you already build on the Claude API or Claude Code professionally, work at (or near) a Claude Partner Network firm, and want a vendor-issued signal of applied agent-architecture judgment. Skip or wait if you're a chat-only Claude user, new to AI engineering, or nowhere near a partner org — the free Academy courses give you most of the learning without the fee.",
  },
  {
    q: "How long does it take to prepare for the CCA exam?",
    a: "It depends almost entirely on how much you've built. Daily Claude + agent builders report needing only a few focused review sessions. Weekly users who haven't built multi-agent systems typically need 2–3 weeks plus one real multi-agent build. Chat-only users should budget 5–8 weeks — the exam is about 80% agent/architecture/API material.",
  },
  {
    q: "Is the Claude Certified Architect exam proctored?",
    a: "Yes. It's delivered by Pearson VUE, either online via OnVUE (system check, webcam room scan, government photo ID, closed-book conditions) or at a physical test center. Skilljar only hosts the free courses — the exam itself is not on Skilljar.",
  },
  {
    q: "What is the retake policy if I fail?",
    a: "Wait 14 days after a first fail, 30 days after a second, and 90 days after a third, with a maximum of 4 attempts in any rolling 12-month period. Each attempt is paid.",
  },
];

const ClaudeCertifiedArchitectPost = () => {
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
                The Claude Certified Architect (CCA) Exam: The 5 Domains, What It Costs, and an Honest Take on Whether It's Worth It
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                The Claude Certified Architect – Foundations (exam code <strong>CCAR-F</strong>) is Anthropic's first
                official technical certification, launched in March 2026: about 60 scenario-based multiple-choice
                questions, 120 minutes, closed-book, proctored by Pearson VUE, pass at 720/1000, currently ~$125 per
                attempt. It's aimed at solution architects and AI engineers building production systems on the Claude
                API, Claude Code, and MCP — and the exam is gated to the (free-to-join) Claude Partner Network, while
                the prep courses are free to anyone. Here's what's on it, how registration works, and an honest read on
                whether you should sit it.
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
                      Certification Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 7, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <CCAHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-cca" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is the Claude Certified Architect (CCA)?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  On March 12, 2026, Anthropic launched its first official technical credential alongside the Claude
                  Partner Network: <strong>Claude Certified Architect – Foundations</strong>, exam code CCAR-F (you'll
                  also see it written CCA-F). It's one of four certifications in the program — Associate (CCAO-F, for
                  business users), Developer (CCDV-F, for engineers), <strong>Architect – Foundations (CCAR-F, this
                  one)</strong>, and Architect – Professional (CCAR-P). By June 2026, Anthropic reported more than
                  10,000 Claude certifications earned across the program.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  What makes CCAR-F different from most vendor certs is the format. It's <strong>scenario-based, not
                  definitional</strong>: instead of asking what the <code>tool_choice</code> parameter does, it drops
                  you into a system — a support agent that's stuck in a loop, a multi-agent pipeline whose subagents are
                  contradicting each other, a Claude Code CI/CD job behaving differently than local runs — and asks what
                  you'd do. It tests architectural judgment under "the system is broken because…" conditions, which is
                  exactly the judgment production work actually demands. That's also what makes it harder to cram for.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="worth-it" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Is the Claude Certified Architect worth it?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Honest answer: <strong>worth it for a specific person, not for everyone</strong> — and the case for it
                  is newer and thinner than for an AWS or Azure cert, because the whole program is months old.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>The case for it.</strong> It's a first-mover credential issued by the model vendor itself —
                  when hiring managers do start filtering for "can architect Claude-based systems," this is the official
                  signal. The scenario/decision format means passing signals applied judgment rather than flashcard
                  recall, which is rarer among certs. And if you work at a Claude Partner Network firm, certifications
                  count toward the firm's Services Track scoring — some employers will actively want you to hold it.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>The case against it.</strong> It launched in 2026, so hiring-manager mindshare is still
                  forming — it doesn't yet carry the weight of an AWS Solutions Architect on a resume. The exam is
                  partner-gated and paid. It's vendor-specific in a fast-moving field, with roughly 12-month validity.
                  And there's a documented MCQ-vs-real-skill gap: one candidate publicly reported scoring{" "}
                  <strong>1000/1000 on the official practice exam three times, then 590 on the real thing</strong> — the
                  practice material simply doesn't match the real scenario format. A multiple-choice pass, even a
                  scenario-based one, still isn't proof you can ship.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Verdict:</strong> if you already build on the Claude API or Claude Code professionally and a
                  partner org is in your orbit, the ~$125 and a few weeks of prep are a reasonable bet on an early
                  credential. If you're not in that position, take the free Academy courses (which are most of the
                  educational value) and skip the exam fee for now — the certification will still be there when it
                  carries more market weight. Certifications also move salaries less than shipped systems do; see what
                  actually drives pay in our{" "}
                  <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">AI engineer salary breakdown</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="who-its-for" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Who is the CCA exam for (and who should skip it)?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The target profile is <strong>solution architects, AI/ML engineers, and technical consultants who
                  design production systems on the Claude API, Claude Code, the Agent SDK, and MCP</strong>. Prep guides
                  suggest roughly 6+ months of hands-on Claude API experience before sitting it, and the pattern in
                  candidate write-ups is consistent: the best predictor of passing is how much you've already{" "}
                  <em>built</em> with Claude, not how many hours you studied.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Who should skip or wait:</strong>
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Pure prompt-writers and chat-only Claude users.</strong> Roughly 80% of the exam is agent, architecture, and API material — prompt skill alone won't carry you.</li>
                    <li>• <strong>People brand-new to AI engineering.</strong> Build foundations first — start with our <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link> — then come back to certification.</li>
                    <li>• <strong>Anyone not near a partner org.</strong> The exam is gated to the Claude Partner Network. Joining is free, but if partner status is irrelevant to your work, the free Academy courses deliver the learning without the fee.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="the-5-domains" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What's on the exam? The 5 domains and their weights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The exam covers five domains. The weights matter for study planning: domains 1 and 2 together are
                  about <strong>47% of the exam</strong> — nearly half of your score rides on agent architecture and
                  Claude Code. Questions arrive as <strong>4 extended scenarios drawn from a bank of 6</strong>
                  (customer-support agents, code generation with Claude Code, multi-agent research, developer-productivity
                  tools, Claude Code in CI/CD, and structured data extraction), each scenario carrying a cluster of
                  questions.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Domain</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Weight</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What it tests</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {domains.map((d) => (
                            <TableRow key={d.domain}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{d.domain}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{d.weight}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{d.tests}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Why each domain matters in practice: <strong>agentic orchestration</strong> (27%) is where production
                  agents actually fail — loop control via <code>stop_reason</code> rather than trusting the model to say
                  "I'm done," and knowing that subagents don't share context, are the difference between a demo and a
                  system (the same fundamentals as{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">what makes LLMs agentic</Link>).{" "}
                  <strong>Claude Code configuration</strong> (20%) tests whether you understand CLAUDE.md precedence and
                  CI/CD behavior — the operational layer most teams learn by getting burned. <strong>Prompt engineering
                  and structured output</strong> (20%) is about systems that consume model output programmatically, where
                  a malformed JSON response is an outage, not an inconvenience. <strong>Tool design and MCP</strong>{" "}
                  (18%) covers the contract between model and tools — descriptions the model can act on and errors it can
                  recover from. And <strong>context management</strong> (15%), the smallest domain, is reportedly the one
                  that surprises candidates most — rolling-window management is the topic people say they'd "never heard
                  of" walking in.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="format-cost-registration" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Format, cost, and how to register</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <em>Caveat before the numbers: this is an independent guide, not affiliated with Anthropic. Some
                  figures below (question count, pricing history, renewal terms) are widely reported by candidates and
                  prep guides rather than published by Anthropic — verify current details on the official Anthropic and
                  Pearson VUE pages before you book.</em>
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Logistics</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Detail</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {logistics.map((r) => (
                            <TableRow key={r.item}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.item}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  *On the question count: most sources say about 60 questions; a minority report 77. Anthropic hasn't
                  published an official count, so plan for "about 60" and don't be thrown if your form differs. On
                  price: the current widely-reported price is <strong>$125 per attempt</strong> — it launched at $99 in
                  March 2026, and while some early articles claimed the exam was "free for the first 5,000 partner
                  employees," that claim is unverified; Anthropic officially states only a{" "}
                  <em>discounted first attempt for tiered partners</em>. Treat $125 as current.
                </p>
                <h3 id="registration-steps" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">How do you register for the CCAR-F exam?</h3>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Join the Claude Partner Network</strong> (free) — apply at claude.com/partners.</li>
                    <li><strong>Access the Anthropic Partner Academy</strong> through your partner account.</li>
                    <li><strong>Register and schedule via Pearson VUE</strong> — choose OnVUE online proctoring or a physical test center.</li>
                    <li><strong>Complete proctoring setup</strong> — system check, webcam room scan, government photo ID; closed-book conditions apply for the full sitting.</li>
                    <li><strong>Reschedule or cancel up to 24 hours</strong> before your appointment if needed.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  One recurring point of confusion: <strong>Skilljar hosts only the free courses</strong>. The proctored
                  exam itself is delivered by Pearson VUE — finishing an Academy course does not certify you.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-prepare" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How do you prepare? What actually worked for candidates</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The prep advice below comes from a small sample — early candidate write-ups on Medium plus a handful
                  of prep blogs — so treat it as practitioner signal, not statistics. It's consistent, though, and it
                  contradicts the default "grind flashcards" instinct in one big way.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ol className="space-y-2 text-sm sm:text-base list-decimal list-inside">
                    <li><strong>Build something real first.</strong> The #1 reported predictor of passing. Ship a multi-agent workflow or an MCP server end-to-end — the exam's scenarios are the failure modes you'll have personally hit.</li>
                    <li><strong>Drill scenario questions, not definitions.</strong> Write ~10 of your own "the system is broken because…" questions per domain and reason through them. That's the exam's actual shape.</li>
                    <li><strong>Don't trust the official practice exam.</strong> It's ~25 definition-style questions that don't match the real scenario format — the source of the 1000-on-practice, 590-on-real story above. Use it to check terminology, not readiness.</li>
                    <li><strong>Weight your study time by domain.</strong> Agentic architecture plus Claude Code is ~47% of the exam. Spend your hours there, not evenly.</li>
                    <li><strong>Take the free Academy "Agents" and "Tool Use" tracks.</strong> Reported as the highest-leverage official material for this exam — and free to anyone, no account gating.</li>
                  </ol>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Candidates also converge on <strong>five traps</strong> the exam repeatedly checks: (1){" "}
                  <strong>subagent context isolation</strong> — subagents don't share context, so coordination needs
                  explicit handoff; (2) <strong>CLAUDE.md precedence</strong> across project, user, and enterprise
                  levels; (3) <strong>tool-description leakage</strong> — descriptions should state the user-facing
                  function, not the implementation; (4) <strong>MCP error contracts</strong> — structured errors with
                  recovery hints, never raw stack traces; and (5) <strong>rolling-window context management</strong>,
                  the least-studied domain. If you can reason about all five from experience, you're most of the way
                  there.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Rough timelines from the same write-ups: daily Claude + agent users needed only a few focused
                  sessions; weekly users new to agents needed 2–3 weeks plus one real multi-agent build; chat-only users
                  should plan 5–8 weeks.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="resources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Resources for preparing</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Academy</a> — the free official courses; prioritize the Agents and Tool Use tracks</li>
                    <li>• <a href="https://www.pearsonvue.com/us/en/anthropic.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pearson VUE — Anthropic exams</a> — scheduling, OnVUE requirements, test centers</li>
                    <li>• <a href="https://claude.com/partners" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Partner Network</a> — free to join; required for exam access</li>
                    <li>• <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Building Effective Agents</a> — Anthropic's canonical agent-architecture essay; domain 1 in prose form</li>
                    <li>• <a href="https://code.claude.com/docs/en/agent-sdk/overview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Agent SDK docs</a> — the build-something-real starting point</li>
                    <li>• <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Model Context Protocol</a> — for domain 4; build one server end-to-end</li>
                    <li>• <a href="https://github.com/dnacenta/claude-certified-architect" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Community study guide (GitHub)</a> — an organized community-maintained outline</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you're earlier in the journey, our{" "}
                  <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>{" "}
                  covers the foundations this exam assumes, and{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">what makes LLMs agentic</Link>{" "}
                  is a gentler on-ramp to the concepts domain 1 tests hardest.
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
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic Academy — official free courses</a></li>
                  <li>• <a href="https://www.pearsonvue.com/us/en/anthropic.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pearson VUE — Anthropic certification exams</a></li>
                  <li>• <a href="https://claude.com/partners" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Partner Network — official page</a></li>
                  <li>• <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic — Building Effective Agents</a></li>
                  <li>• <a href="https://dev.to/aws-builders/the-claude-certified-architect-exam-5-domains-6-scenarios-and-everything-you-need-to-know-4le3" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dev.to — The CCA exam: 5 domains, 6 scenarios explainer</a></li>
                  <li>• <a href="https://github.com/dnacenta/claude-certified-architect" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub — community CCA study guide</a></li>
                  <li>• <a href="https://findskill.ai/blog/how-to-prepare-claude-certified-architect-exam-2026/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">findskill.ai — how to prepare for the CCA exam (2026)</a></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3 text-xs sm:text-sm">
                  Independent guide — not affiliated with or endorsed by Anthropic. Exam details change; some figures
                  here are widely reported by candidates and prep guides rather than Anthropic-published. Verify current
                  pricing, format, and policies on the official Anthropic and Pearson VUE pages before booking.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/claude-certified-architect-exam" />
      <Footer />
    </div>
  );
};

export default ClaudeCertifiedArchitectPost;
