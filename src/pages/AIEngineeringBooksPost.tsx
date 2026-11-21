import { ArrowLeft, Clock, User, Calendar, Layers, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import BookMapHeroDiagram from "@/components/BookMapHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import { AI_ARCHITECT_READING_MAP } from "@/config/newsletterBonuses";

const PATH = "/blog/ai-engineering-books";

const FSA = "https://www.oreilly.com/library/view/fundamentals-of-software/9781098175504/";
const HARD = "https://www.oreilly.com/library/view/software-architecture-the/9781492086888/";
const AIE = "https://www.oreilly.com/library/view/ai-engineering/9781098166298/";

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{children}</p>
);
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{children}</h2>
);
const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{children}</h3>
);
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>
);
const L = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-primary hover:underline">{children}</Link>
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
            {rows.map((r, i) => (
              <TableRow key={i}>
                {r.map((c, j) => (
                  <TableCell key={j} className={`${j === 0 ? "font-medium " : ""}text-xs sm:text-sm px-2 sm:px-4`}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

const AIEngineeringBooksPost = () => {
  const books = [
    ["Fundamentals of Software Architecture, 2nd edition", "Mark Richards, Neal Ford", "March 2025", "How to think like an architect: characteristics, modularity, styles, decisions"],
    ["Software Architecture: The Hard Parts", "Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani", "October 2021", "What breaks when a system is distributed: coupling, data, transactions, contracts"],
    ["AI Engineering", "Chip Huyen", "December 2024", "What changes when a component is a foundation model: evals, RAG, agents, inference"],
  ];

  const center = [
    ["Every choice is a trade-off", "Stated as a law of software architecture, and the reason for the phrase \"least worst architecture\"", "The closing chapter is called \"Build Your Own Trade-Off Analysis\"", "Build versus buy, RAG versus finetuning, cost versus latency versus quality"],
    ["Fitness functions ≈ evals", "\"Governance and Fitness Functions\" for measuring architecture characteristics", "Fitness functions attached to each decomposition pattern", "Two chapters on evaluation, including AI as a judge and designing an evaluation pipeline"],
    ["Orchestrated workflows", "Mediated event-driven architecture and orchestration-driven styles", "Orchestration versus choreography, and eight transactional saga patterns", "Agent planning and \"AI pipeline orchestration\""],
    ["Schemas as contracts", "Contracts between a microkernel core and its plug-ins", "Strict versus loose contracts, and stamp coupling", "Structured outputs from a model"],
  ];

  const pairs = [
    ["Both architecture books", "ADRs", "A written record of a decision and why. Use them for model choice, RAG versus finetuning, and vendor lock-in"],
    ["Both architecture books", "Architecture quantum; static and dynamic coupling", "The smallest part you can deploy on its own. A feature and the model it calls are coupled at runtime, so they fail together"],
    ["Both architecture books", "Stamp coupling", "Passing a whole record when one field is needed. With an LLM this is paid for per token"],
    ["Fundamentals + AI Engineering", "Observability", "A request is a tree of model and tool calls, so it has to be traced, not just timed"],
    ["Fundamentals + AI Engineering", "Latency and cost as characteristics", "Treat them like any other \"-ility\": name them, measure them, pick a few to protect"],
    ["Fundamentals + AI Engineering", "Layered thinking", "Huyen's three layers of the AI stack are a layered architecture, with the same rules about what may call what"],
    ["Fundamentals + AI Engineering", "Evolve in small steps", "Her architecture chapter adds one piece at a time: context, guardrails, router and gateway, cache, agent patterns"],
    ["The Hard Parts + AI Engineering", "Data ownership", "Who owns a table becomes who owns a dataset, an index, or an eval set"],
    ["The Hard Parts + AI Engineering", "Caching", "Replicated caching between services; exact and semantic caching in front of a model"],
    ["The Hard Parts + AI Engineering", "Shared service or gateway", "The reuse patterns (shared library, shared service, sidecar) are the options for a model gateway"],
    ["The Hard Parts + AI Engineering", "Analytical data and the data flywheel", "Data mesh on one side, user feedback feeding the next model on the other"],
  ];

  const alone = [
    ["Fundamentals", "Identifying and limiting architecture characteristics; cohesion, coupling and connascence; the catalog of styles from layered to microservices; diagramming, risk, negotiation and leadership", "You have never had to justify an architecture to other people"],
    ["The Hard Parts", "Granularity disintegrators and integrators; decomposing a monolith and its database; data ownership; distributed transactions; the eight saga patterns; data mesh", "You are splitting a system up, or debugging one that was split badly"],
    ["AI Engineering", "How foundation models work and are sampled; evaluation methodology; prompt engineering and prompt attacks; RAG and agents; finetuning; dataset engineering; inference optimization", "You are putting a model into a product for the first time"],
  ];

  const beyond = [
    ["MCP and agent protocols", "The books predate most of the tooling", "What is MCP?", "/blog/what-is-mcp"],
    ["Durable, long-running agents", "Sagas cover long transactions, not agents that run for hours and must resume", "Agent runtimes explained", "/blog/agent-runtimes-explained"],
    ["AI governance and the EU AI Act", "None of the three is a compliance book", "AI guardrails", "/blog/ai-guardrails"],
    ["GPU capacity and FinOps", "Inference optimization is covered; capacity planning and budgets are not", "LLM routing", "/blog/llm-routing"],
    ["On-call for probabilistic systems", "Runbooks assume the same input gives the same output", "The fallacies of LLM systems", "/blog/fallacies-of-llm-systems"],
    ["AI product sense", "Knowing which problems a model should not be used for", "Conway's law for AI", "/blog/conways-law-ai"],
  ];

  const planA = [
    ["1–2", "AI Engineering ch. 1–2", "What a foundation model is and why its output varies"],
    ["3–4", "AI Engineering ch. 3–4", "Evaluation. Read these as a book about fitness functions"],
    ["5", "AI Engineering ch. 5", "Prompting, including prompt injection"],
    ["6–7", "AI Engineering ch. 6", "RAG and agents"],
    ["8", "AI Engineering ch. 10", "The reference architecture: this is the chapter closest to your day job"],
    ["9–10", "AI Engineering ch. 7–9, skimmed", "Finetuning, datasets and inference: know what exists and what it costs"],
    ["11", "The Hard Parts ch. 11–13, reread", "Workflows, sagas and contracts, this time with agents in mind"],
    ["12", "Build", "One AI feature with an eval suite in CI and an ADR for each big choice"],
  ];

  const planB = [
    ["1–2", "Fundamentals ch. 1–5", "Architectural thinking, modularity, and how to pick characteristics"],
    ["3", "Fundamentals ch. 6–8", "Fitness functions, scope, components. You already write evals; this is the same habit"],
    ["4–5", "Fundamentals, the styles chapters", "Read event-driven and microservices closely; skim the rest"],
    ["6", "Fundamentals, the chapters on decisions and risk", "ADRs and risk storming"],
    ["7–8", "The Hard Parts ch. 1–4 and 7", "Coupling, quanta and service granularity"],
    ["9", "The Hard Parts ch. 8–10", "Reuse patterns, data ownership, data access"],
    ["10", "The Hard Parts ch. 11–13", "Orchestration versus choreography, sagas, contracts"],
    ["11", "The Hard Parts ch. 14–15", "Analytical data and trade-off analysis"],
    ["12", "Apply", "Write ADRs and fitness functions for an AI system you already run"],
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-800 rounded-full px-3 py-1">
                  <Layers className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Architecture</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Engineering Books: The 3 That Make an AI Architect (and What None of Them Teach)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Software architects and AI engineers are solving the same problems with different vocabularies, and
                most reading lists make it worse by putting them on separate shelves. I mapped three books against
                each other to see what really overlaps. Four ideas sit in all three, eleven more are shared by two,
                and six things an AI architect needs are in none of them.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Intermediate</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 16, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />11 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <BookMapHeroDiagram />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR:</strong> The three <strong>AI engineering books</strong> worth reading together are{" "}
                <em>Fundamentals of Software Architecture</em> (how to think), <em>Software Architecture: The Hard
                Parts</em> (what breaks when systems are distributed) and Chip Huyen's <em>AI Engineering</em> (what
                changes when a component is a model). All three share four ideas: every choice is a trade-off,{" "}
                <strong>fitness functions are evals</strong>, workflows need an orchestrator, and schemas are
                contracts. None of them covers agent protocols, long-running agents, governance, GPU budgets, on-call
                for systems that don't repeat themselves, or product sense. Those you learn from docs and practice.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="why-these-three">1. Why These Three Books</H2>
                <P>
                  Most lists of AI engineering books are ten titles long and tell you to read all of them. This one is
                  three, chosen because each answers a different question, and because together they cover the job
                  people now call <strong>AI architect</strong>: designing systems where some of the components are
                  models.
                </P>
                <DataTable head={["Book", "Authors", "Published", "The question it answers"]} rows={books} />
                <P>
                  The first two are from the same family of authors and were written to be read in that order. The
                  third comes from a different community. That gap is the interesting part: where they agree, they
                  usually don't know they agree.
                </P>
                <P>
                  Links to the publisher's pages:{" "}
                  <A href={FSA}>Fundamentals of Software Architecture</A>,{" "}
                  <A href={HARD}>Software Architecture: The Hard Parts</A>,{" "}
                  <A href={AIE}>AI Engineering</A>. Chapter names below are from their published tables of contents.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="evals-are-fitness-functions">2. The Idea in the Middle: An Eval Is a Fitness Function</H2>
                <P>
                  Start with the overlap that matters most. In the architecture books, a <strong>fitness function</strong>{" "}
                  is an automated check that tells you whether a system still has a property you care about. Chapter 6
                  of <em>Fundamentals</em> is called "Measuring and Governing Architecture Characteristics", and{" "}
                  <em>The Hard Parts</em> attaches a fitness function to every decomposition pattern it describes.
                </P>
                <P>
                  In <em>AI Engineering</em>, an <strong>eval</strong> is an automated check that tells you whether a
                  model-backed feature still does what you need. Huyen spends two chapters on it, covering exact
                  evaluation, AI as a judge, and how to design an evaluation pipeline.
                </P>
                <P>
                  One community writes these checks against coupling and latency. The other writes them against
                  faithfulness and tone. They are the same tool, used for the same reason: you can't keep a property
                  you don't test for. An architect who already runs fitness functions in CI knows how to run evals in
                  CI. An AI engineer who already gates releases on an eval set is already doing architecture
                  governance, and can extend the habit to cost, latency and coupling.
                </P>
                <P>
                  Three more ideas sit in the centre with it.
                </P>
                <DataTable head={["Shared idea", "In Fundamentals", "In The Hard Parts", "In AI Engineering"]} rows={center} />
                <P>
                  The workflow row deserves a second look. A saga is a long transaction split across services, with a
                  plan for what to do when a step fails. An agent run is a long task split across model and tool
                  calls, with the same need. The eight saga patterns are a ready-made vocabulary for{" "}
                  <L to="/blog/multi-agent-orchestration-patterns">multi-agent orchestration</L>: who coordinates,
                  whether steps wait for each other, and what "done" means when something fails halfway.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="what-transfers">3. What Two Books Share: The Ideas That Transfer</H2>
                <P>
                  These are the overlaps between pairs. Each is an architecture idea with a direct use in an AI
                  system, or the reverse.
                </P>
                <DataTable head={["Shared by", "Idea", "What it means for an AI system"]} rows={pairs} />
                <P>
                  The stamp coupling row is my favourite example of an old idea with a new price. Sending a whole
                  customer record to a service that needs one field has always been wasteful. Sending a whole document
                  to a model that needs one paragraph is the same mistake, except now every extra token is billed and
                  makes the answer worse. See{" "}
                  <L to="/blog/fallacies-of-llm-systems">the fallacies of LLM systems</L> for the evidence on long
                  context.
                </P>
                <P>
                  For the observability row, <L to="/blog/ai-agent-observability">AI agent observability</L> shows
                  what a trace of one agent request looks like. For the gateway row,{" "}
                  <L to="/blog/conways-law-ai">Conway's law for AI</L> covers who should own it.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="each-book-alone">4. What Each Book Gives You Alone</H2>
                <DataTable head={["Book", "Only here", "Read it first if"]} rows={alone} />
                <P>
                  Two notes on <em>AI Engineering</em>. It is not a book about one vendor's API, so it has aged better
                  than most writing on the subject. And its last chapter, "AI Engineering Architecture and User
                  Feedback", is the one closest to the other two books: it builds a reference architecture one step at
                  a time, which is how an architect would want it explained.
                </P>
              </section>

              <NewsletterSignup bonus={AI_ARCHITECT_READING_MAP} />

              <section className="mb-6 sm:mb-8">
                <H2 id="beyond-all-three">5. What None of Them Teach</H2>
                <P>
                  Six things an AI architect deals with are outside all three books. That is not a criticism: books
                  take years, and some of this didn't exist when they were written. You learn these from documentation
                  and from running systems.
                </P>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {["Topic", "Why the books don't cover it", "Start here"].map((h) => (
                              <TableHead key={h} className="text-xs sm:text-sm px-2 sm:px-4">{h}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {beyond.map(([topic, why, label, to]) => (
                            <TableRow key={topic}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{topic}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{why}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4"><L to={to}>{label}</L></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="reading-order">6. Reading Order: Two 12-Week Plans</H2>
                <P>
                  Which book you start with depends on which half you already have. Both plans end the same way: build
                  something and write the decisions down.
                </P>
                <H3 id="plan-architect">If you are a software architect moving into AI</H3>
                <P>
                  You have read the two architecture books, or lived them. Start with the model.
                </P>
                <DataTable head={["Weeks", "Read", "Why"]} rows={planA} />
                <H3 id="plan-ai-engineer">If you are an AI engineer growing into architecture</H3>
                <P>
                  You can ship a RAG feature. What you are missing is the language for defending a design and the
                  patterns for when it has to be split across teams.
                </P>
                <DataTable head={["Weeks", "Read", "Why"]} rows={planB} />
                <P>
                  If you are earlier than either, start with the{" "}
                  <L to="/ai-engineering-roadmap">AI engineer roadmap</L> and come back to this list at phase 3.
                </P>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">7. Frequently Asked Questions</H2>

                <H3 id="faq-best">What is the best AI engineering book?</H3>
                <P>
                  For building products on foundation models, AI Engineering by Chip Huyen (O'Reilly, December 2024)
                  is the most complete single book. It covers evaluation, prompt engineering, RAG and agents,
                  finetuning, dataset engineering, inference optimization and a reference architecture. Pair it with a
                  software architecture book if you design systems and not just features.
                </P>

                <H3 id="faq-architecture">Do AI engineers need to learn software architecture?</H3>
                <P>
                  Yes, once a feature has to run in production alongside other systems. Trade-off analysis, coupling,
                  data ownership, contracts and distributed workflows all apply to AI systems, and the architecture
                  books explain them more thoroughly than AI books do. Fundamentals of Software Architecture is the
                  place to start.
                </P>

                <H3 id="faq-ai-architect">What is an AI architect?</H3>
                <P>
                  An AI architect designs systems in which some components are AI models. The role combines classic
                  software architecture (characteristics, coupling, data, trade-offs) with AI engineering (evaluation,
                  retrieval, agents, inference cost). There is no standard definition yet, which is why a reading map
                  across both fields is useful.
                </P>

                <H3 id="faq-fitness">What is the difference between a fitness function and an eval?</H3>
                <P>
                  In practice, very little. A fitness function is an automated check that an architecture still has a
                  property such as low coupling or acceptable latency. An eval is an automated check that an AI
                  feature still produces acceptable output. Both run in CI and both exist to stop a property from
                  drifting unnoticed.
                </P>

                <H3 id="faq-order">In what order should I read these three books?</H3>
                <P>
                  Software architects should read AI Engineering first, since they already know the other two topics.
                  AI engineers should read Fundamentals of Software Architecture, then The Hard Parts. Read The Hard
                  Parts after Fundamentals in either case, because it builds on it.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">8. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href={FSA}>Mark Richards, Neal Ford — Fundamentals of Software Architecture, 2nd Edition (O'Reilly, March 2025)</A></li>
                  <li>• <A href={HARD}>Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani — Software Architecture: The Hard Parts (O'Reilly, October 2021)</A></li>
                  <li>• <A href={AIE}>Chip Huyen — AI Engineering (O'Reilly, December 2024)</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  The mapping between the books is our own reading, not something the authors published. Chapter names
                  and publication dates checked against the publisher's listings on November 16, 2026. No affiliate
                  links.
                </p>
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

export default AIEngineeringBooksPost;
