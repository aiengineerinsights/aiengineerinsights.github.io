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
import ColumnsHeroDiagram from "@/components/ColumnsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";

const PATH = "/blog/meta-muse-alternatives";

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

const MetaMuseAlternativesPost = () => {
  const table = [
    ["Meta Muse (baseline)", "Meta", "Free with a weekly limit; Power $20/mo; Maximum $100/mo", "Meta's cloud, one VM per user", "Connectors, custom connectors, skills; no public agent API found", "No"],
    ["OpenAI dots", "OpenAI", "First dot included in ChatGPT Pro or Business Premium (Pro price not confirmed); Enterprise $50 to $500 per dot per month from Jan 14, 2027", "OpenAI cloud computer per dot; local access optional", "ChatGPT plugins, local skills; no dot-specific API documented", "No"],
    ["Gemini task mode (formerly Gemini Spark)", "Google", "Free in six countries; elsewhere needs Google AI Pro or Ultra (USD price not confirmed)", "Sandboxed VM on Google Cloud, one per account", "Skills, connected apps; custom MCP announced June 2026, current status not confirmed", "No"],
    ["Claude Cowork (now part of Claude)", "Anthropic", "Paid plans only: Pro $20/mo, Max $100, Ultra $200, Team $20 per seat", "Anthropic's cloud; desktop app for local files", "Plugins that bundle skills, connectors and sub-agents", "No"],
    ["Grok Bot", "xAI (page footer: SpaceX Super Intelligence LLC)", "Premium $30/mo, Super $100, Ultra $200", "One hosted computer per user, operated by Cursor, in the US", "Custom MCP servers, skills, routines, Bot templates", "No"],
    ["Manus 2.0", "Manus", "Free with 300 credits a day; Pro from $20/mo; Team from $20 per seat", "Manus cloud; Cloud Computer add-on (price not published)", "Public REST API, webhooks, skills, connectors", "No"],
    ["Perplexity Computer", "Perplexity", "Available on Pro and Max; plan prices not confirmed; Max includes 10,000 credits a month", "Cloud sandbox; local modes on Apple silicon Macs and NVIDIA hardware", "400+ prebuilt connectors, custom remote MCP connectors", "No"],
    ["Genspark Claw", "Genspark", "Cloud Computer subscription plus credits; prices not confirmed", "Dedicated cloud computer, or a macOS/Windows desktop app", "30+ built-in skills, custom skills", "No"],
    ["OpenClaw", "OpenClaw Foundation", "Free; no paid tier or hosted service", "Your own computer", "Plugin SDK, tools, skills, ClawHub registry", "Yes, MIT"],
    ["Hermes Agent", "Nous Research", "Free to self-host; Hermes Cloud in Nous Portal plans from $20/mo", "Your machine, Docker, an SSH host or serverless sandboxes", "MCP servers, skills, plugins, subagents, cron", "Yes, MIT"],
  ];

  const pick = [
    ["Live outside the six countries where Meta has announced Muse", "Check each vendor's country list first; OpenClaw and Hermes Agent are software you host yourself"],
    ["Already pay for ChatGPT Pro or Business", "OpenAI dots"],
    ["Use Gmail, Calendar and Drive and live in a country where tasks are free", "Gemini task mode"],
    ["Mostly need research, analysis and documents over your own files", "Claude Cowork"],
    ["Want a managed agent that accepts a custom MCP server", "Grok Bot or Perplexity Computer"],
    ["Need to start agent tasks from your own code", "Manus 2.0 (public REST API)"],
    ["Want an agent with its own email address, phone number and wallet", "Manus Cue (early access)"],
    ["Want to reach the agent from WhatsApp, Telegram, LINE or Signal without self-hosting", "Genspark Claw"],
    ["Want memory, state and credentials on hardware you control", "OpenClaw or Hermes Agent"],
    ["Want to choose the model yourself", "OpenClaw, Hermes Agent or Genspark Claw"],
  ];

  const faqs = [
    {
      id: "faq-best",
      q: "What is the best Meta Muse alternative?",
      a: "It depends on what made you look past Muse. If you already pay for ChatGPT Pro or Business, OpenAI dots is included. Gemini task mode is free in six countries. Manus 2.0 has a public REST API. OpenClaw and Hermes Agent are MIT-licensed and run on your own hardware.",
    },
    {
      id: "faq-personal-agent",
      q: "What is a personal AI agent?",
      a: "A personal AI agent is an assistant that carries out tasks in your apps and accounts instead of only answering questions. It keeps working after you close the app and comes back when it needs your approval. Meta Muse, OpenAI dots, Manus and OpenClaw are examples.",
    },
    {
      id: "faq-open-source",
      q: "Is there an open-source alternative to Meta Muse?",
      a: "Yes. OpenClaw and Hermes Agent are both MIT-licensed and self-hosted. OpenClaw runs on your own computer and has no paid tier. Hermes Agent from Nous Research runs locally, in Docker or on a server, and has a paid hosted option called Hermes Cloud.",
    },
    {
      id: "faq-muse-vs-manus",
      q: "Muse vs Manus: what is the difference?",
      a: "Muse is Meta's personal AI agent. It runs on Meta's cloud with the Muse Spark model, is free with a weekly token limit, and has no public API for the agent on the Meta pages we read. Manus is an independent company again. It bills in credits, with a free plan and Pro from $20 a month, and has a public REST API.",
    },
    {
      id: "faq-manus-2",
      q: "What is Manus 2.0?",
      a: "Manus 2.0 is the release Manus announced on September 28, 2026, for web, desktop and mobile. It added the Cascade agent harness, a purchasable Cloud Computer, Automations with event triggers, the Manus Studio desktop app, Remote Control of your own computer from a phone, and a separate app called Cue.",
    },
    {
      id: "faq-manus-cue",
      q: "What is Manus Cue?",
      a: "Cue is a standalone app from Manus for personal agents. Each agent gets its own email address, phone number, wallet and computer, and can pay within a budget you set. At the Manus 2.0 launch it was in early access, free with an invite code.",
    },
    {
      id: "faq-dots-vs-muse",
      q: "OpenAI dots vs Meta Muse: how do they differ?",
      a: "Both give the agent its own cloud computer. A dot lives inside ChatGPT, and the first one is included with ChatGPT Pro or Business Premium. Muse is a separate app that is free with a weekly token limit. OpenAI does not offer dots on consumer plans in the EEA, Switzerland or the UK, while Meta launched Muse in the UK on November 23, 2026.",
    },
    {
      id: "faq-gemini-spark",
      q: "What happened to Gemini Spark?",
      a: "Google renamed it. Google's help page says Spark was a subscriber beta that is now called Task, reached through a Chat/Task toggle in the Gemini app. On November 17, 2026 Google made tasks free in the US, India, Canada, Australia, Japan and Korea. Elsewhere a Google AI Pro or Ultra subscription is required.",
    },
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
                  <Layers className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Meta Muse Alternatives (2026): 9 Personal AI Agents Compared
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                The main <strong>Meta Muse alternatives</strong> fall into three groups: managed agents from the large
                labs (OpenAI dots, Gemini task mode, Claude Cowork, Grok Bot), independent managed agents (Manus 2.0,
                Perplexity Computer, Genspark Claw), and open-source agents you host yourself (OpenClaw, Hermes Agent).
                This page compares all nine on maker, price, where the agent runs and how you extend it, so you can
                pick by the constraint that matters to you.
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
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineering Lead</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Intermediate</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 25, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />12 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ColumnsHeroDiagram
              gradientId="mmaBg"
              title="META MUSE ALTERNATIVES · 2026"
              subtitle="nine personal AI agents, grouped by who runs the computer the agent works on"
              columns={[
                { name: "LAB AGENTS", tag: "hosted by a large lab", color: "#22d3ee", lines: ["OpenAI dots (inside ChatGPT)", "Gemini task mode (was Spark)", "Claude Cowork (now in Claude)", "Grok Bot (from $30/mo)"], best: "if you already pay that lab" },
                { name: "INDEPENDENT", tag: "hosted, outside the big labs", color: "#a78bfa", lines: ["Manus 2.0 (public REST API)", "Manus Cue (early access)", "Perplexity Computer (20+ models)", "Genspark Claw (WhatsApp, Telegram)"], best: "if you want an API or chat apps" },
                { name: "SELF-HOSTED", tag: "open source, MIT", color: "#f97316", lines: ["OpenClaw (your own computer)", "Hermes Agent (writes own skills)", "Any model provider, or local", "State stays on your hardware"], best: "if you want control of the box" },
              ]}
              footer="prices as of Nov 25, 2026 · no rankings · pick by your constraint"
              ariaLabel="Meta Muse alternatives in 2026, in three groups. Managed agents from large labs: OpenAI dots inside ChatGPT, Gemini task mode (formerly Gemini Spark), Claude Cowork (now part of Claude) and Grok Bot from $30 a month. Independent managed agents: Manus 2.0 with a public REST API, Manus Cue in early access, Perplexity Computer with 20+ models and Genspark Claw with WhatsApp and Telegram channels. Open-source, self-hosted agents under the MIT licence: OpenClaw on your own computer and Hermes Agent, which writes its own skills, both with any model provider and state kept on your hardware."
              source="aiengineerinsights.com · from vendor pages and repositories, Nov 25, 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — Meta Muse alternatives:</strong> If you already pay for ChatGPT Pro or Business,{" "}
                <strong>OpenAI dots</strong> is included. <strong>Gemini task mode</strong> (formerly Gemini Spark) is
                free in six countries. <strong>Claude Cowork</strong> is now part of Claude on paid plans, and{" "}
                <strong>Grok Bot</strong> starts at $30 a month. <strong>Manus 2.0</strong> is independent of Meta again
                and has a public REST API. <strong>Perplexity Computer</strong> and <strong>Genspark Claw</strong> are
                the other independent managed agents. <strong>OpenClaw</strong> and <strong>Hermes Agent</strong> are
                MIT-licensed and run on your own hardware. Prices are as of Nov 25, 2026.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="why-look-past-muse">1. Why Look Past Meta Muse?</H2>
                <P>
                  A personal AI agent is an assistant that carries out tasks in your apps and accounts, keeps working
                  after you close the app, and comes back when it needs approval. Meta{" "}
                  <A href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/">announced Muse</A> as
                  one on September 8, 2026. Our{" "}
                  <In to="/blog/how-meta-muse-works">How Meta Muse works</In> post covers the design. There are five
                  sourced reasons to compare it with something else:
                </P>
                <UL>
                  <li>• <strong>Country availability.</strong> Meta's newsroom posts announce Muse in the US (September 8), Japan (October 23), Singapore (October 27), Australia (November 17) and the UK (November 23). iPhone in Canada reported a Canadian launch around September 18. We found no announcement for other countries.</li>
                  <li>• <strong>Weekly token limits.</strong> Muse is free with a usage limit, and Meta does not publish the size of the free allowance. <A href="https://www.meta.com/help/subscriptions/1021145227643680/">Meta's subscriptions page</A> lists Power at $20 a month for 500M Muse tokens a week and Maximum at $100 a month for 3B a week. It also says subscriptions are in limited testing and not available in all locations.</li>
                  <li>• <strong>It runs on Meta's cloud and Meta's model.</strong> Each user gets a dedicated cloud VM, and the model is Muse Spark. <A href="https://research.meta.ai/blog/how-we-built-safety-into-muse">Meta's safety post</A> says staff access to a user's VM data is restricted by policy and is not prevented technically. A Confidential VM that would block that access is planned.</li>
                  <li>• <strong>Reported incidents.</strong> GeekWire reported on September 20, 2026 (US Pacific time) that Amazon had cut Muse off from shopping on Amazon.com. eWeek reported that security firm Claroc found more than 6,800 publicly shared Muse pages through passive DNS records, after which Meta suspended conversation sharing. On November 18, Reuters reported that it had reproduced Muse reading Signal message text on an Android phone and a Mac through device permissions. Meta's own safety post says Muse "can and will still make mistakes".</li>
                  <li>• <strong>No public API for the agent.</strong> No API or SDK for the Muse agent appears on the Meta pages we read. You extend Muse with connectors, including custom connectors that Muse builds for you.</li>
                </UL>
                <P>
                  This page compares published information checked on November 25, 2026. It has no rankings or scores.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="comparison-table">2. Meta Muse Alternatives Compared</H2>
                <DataTable head={["Product", "Maker", "Price", "Runs where", "How you extend it", "Open source"]} rows={table} />
                <p className="text-muted-foreground text-xs sm:text-sm italic mb-4">
                  Prices as of Nov 25, 2026, in USD, from each vendor's own pages. "Not confirmed" means we found no
                  figure on a vendor page.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="lab-agents">3. Which Managed Agents From the Large Labs Compete With Muse?</H2>
                <P>
                  In all four, the vendor hosts the computer the agent works on.
                </P>

                <H3 id="openai-dots">OpenAI dots</H3>
                <P>
                  A dot is an always-on agent inside ChatGPT that pursues goals across conversations using its own
                  cloud computer and connected apps. OpenAI{" "}
                  <A href="https://openai.com/index/introducing-dots/">announced dots</A> on September 29, 2026, and
                  writes the name in lower case.
                </P>
                <UL>
                  <li>• <strong>Price:</strong> the first dot is included in ChatGPT Pro or Business Premium, with a usage allowance. The Pro price is not confirmed on an OpenAI page we read. On Enterprise, a dot costs $50, $200 or $500 per month by tier, billed from January 14, 2027.</li>
                  <li>• <strong>Availability:</strong> per <A href="https://help.openai.com/en/articles/20001530-getting-started-with-your-dot">OpenAI's help page</A>, consumer plans exclude the EEA, Switzerland and the UK. EU Business and Enterprise plans got dots on October 28, 2026.</li>
                  <li>• <strong>Runs where:</strong> each dot has its own cloud computer and cloud browser. Access to your local computer is optional and off by default.</li>
                  <li>• <strong>Extend it:</strong> ChatGPT plugins that reach more than 4,000 apps, and local skills when local access is on. No dot-specific API is documented.</li>
                </UL>
                <P>
                  <strong>How it relates to ChatGPT Work:</strong> they are two products. ChatGPT Work{" "}
                  <A href="https://openai.com/index/chatgpt-for-your-most-ambitious-work/">launched on July 9, 2026</A>{" "}
                  as an agent mode for long tasks that produce documents, sheets, slides and web apps. A dot is the
                  persistent agent, and it can hand jobs to Work or Codex threads. Those jobs count against your
                  ChatGPT limits; chatting with the dot does not.
                </P>
                <P>
                  <strong>Pick this if</strong> you already pay for ChatGPT Pro or Business and want one agent that
                  delegates into Work and Codex.
                </P>

                <H3 id="gemini-task-mode">Gemini task mode (formerly Gemini Spark)</H3>
                <P>
                  Task mode is Google's cloud-based personal agent inside the Gemini app. Google announced it as
                  Gemini Spark on May 19, 2026. <A href="https://support.google.com/gemini/answer/17094507?hl=en">Google's help page</A>{" "}
                  now says Spark was a subscriber beta that has been renamed Task, reached through a Chat/Task toggle
                  next to the prompt box. 9to5Google dated the interface change to October 2026, and Google's
                  November 17 post about tasks does not use the word Spark.
                </P>
                <UL>
                  <li>• <strong>Price:</strong> free in the US, India, Canada, Australia, Japan and Korea since <A href="https://blog.google/innovation-and-ai/products/gemini-app/tasks-in-gemini-free-new-features/">November 17, 2026</A>. Elsewhere it needs a Google AI Pro or Ultra subscription. We did not confirm a USD price on a Google page.</li>
                  <li>• <strong>Availability:</strong> not offered in the EEA, Nigeria, Switzerland or the UK.</li>
                  <li>• <strong>Runs where:</strong> hardware-isolated sandboxed VMs on Google Cloud, one per account.</li>
                  <li>• <strong>Extend it:</strong> skills, which are reusable instruction sets you can upload as skill.md files, plus connected apps. Google announced custom MCP connectors as rolling out on June 30, 2026. We could not confirm their current status.</li>
                </UL>
                <P>
                  <strong>Pick this if</strong> your work is in Gmail, Calendar and Drive and you live in one of the six
                  countries where tasks are free.
                </P>

                <H3 id="claude-cowork">Claude Cowork</H3>
                <P>
                  Cowork is Anthropic's mode for multi-step non-coding work such as research, analysis and documents,
                  carried out in the files and tools you choose. It launched as a research preview on January 12, 2026
                  and became generally available on macOS and Windows on April 9. Since September 16, 2026 Anthropic
                  has been <A href="https://claude.com/resources/articles/cowork-is-now-claude">merging Cowork into Claude</A>,
                  so that any conversation can take on a Cowork task. The product page now says Cowork is just Claude.
                </P>
                <UL>
                  <li>• <strong>Price:</strong> paid plans only. Pro $20 a month, Max $100, Ultra $200, Team $20 per seat, Enterprise through sales.</li>
                  <li>• <strong>Runs where:</strong> an isolated cloud environment on Anthropic's servers, which continues with the laptop closed. Since October 6, 2026 new tasks on Pro, Max and Ultra run in the cloud. Local files, browser use and computer use need the desktop app open.</li>
                  <li>• <strong>Extend it:</strong> plugins that bundle skills, connectors and sub-agents. Admins can run private plugin marketplaces.</li>
                </UL>
                <P>
                  <strong>Pick this if</strong> you mostly need research and documents over your own files. For agents you deploy inside a product, see{" "}
                  <In to="/blog/claude-managed-agents">Claude Managed Agents</In>.
                </P>

                <H3 id="grok-bot">Grok Bot</H3>
                <P>
                  Grok Bot is a set of always-on agents, called Bots, that work on a cloud computer and sign into the
                  tools you already use. It was <A href="https://x.ai/news/introducing-grok-bot">announced on x.ai</A>{" "}
                  as a beta on August 11, 2026. The product page footer names SpaceX Super Intelligence LLC, and the
                  page now says Grok Bot is generally available for Teams and Enterprise customers.
                </P>
                <UL>
                  <li>• <strong>Price:</strong> Premium $30 a month, Super $100, Ultra $200, each with weekly Bot usage included and overage billed at token cost.</li>
                  <li>• <strong>Runs where:</strong> one persistent hosted computer per user, shared by all of that user's Bots, operated by Cursor and located in the US.</li>
                  <li>• <strong>Model:</strong> there is no model picker. <A href="https://docs.x.ai/grok-bot/security">The security docs</A> say each request is routed to a first-party or third-party model, and the model used is not shown.</li>
                  <li>• <strong>Extend it:</strong> you can ask a Bot to connect a custom MCP server, save working tasks as skills, schedule them as routines, and publish Bot templates to a marketplace.</li>
                </UL>
                <P>
                  <strong>Pick this if</strong> you want custom MCP servers in a managed agent and do not need to choose
                  the model.
                </P>
              </section>

              <NewsletterSignup
                heading="Get one practical AI agents email a week"
                subtext="Agent launches, price changes and security incidents, with the sources linked. One email a week."
              />

              <section className="mb-6 sm:mb-8">
                <H2 id="manus-2">4. What Is Manus 2.0, and Who Owns Manus Now?</H2>
                <P>
                  Manus is a managed agent you give tasks to on the web, desktop and mobile. It gets a longer section
                  because of its history with Meta and because 2.0 changed the product.
                </P>

                <H3 id="manus-ownership">Ownership: announced, blocked, independent again</H3>
                <UL>
                  <li>• <strong>December 2025:</strong> Meta announced its acquisition of Manus, as <A href="https://techcrunch.com/2026/04/27/china-vetoes-metas-2b-manus-deal-after-months-long-probe/">TechCrunch reported</A>.</li>
                  <li>• <strong>April 27, 2026:</strong> TechCrunch reported that China's National Development and Reform Commission prohibited foreign investment in Manus and ordered the parties to withdraw the transaction.</li>
                  <li>• <strong>August 11, 2026:</strong> Reuters reported that Manus said it would return to operating as an independent company and would delete data generated by certain users on or after December 29, 2025 as part of separating from Meta.</li>
                </UL>
                <P>
                  Reports of the deal's value differ, so we leave the figure out. Manus's shareholders after the
                  separation are not confirmed.
                </P>

                <H3 id="manus-2-features">What Manus 2.0 added</H3>
                <P>
                  Manus <A href="https://manus.im/blog/introducing-manus-2-0">announced 2.0</A> on September 28, 2026,
                  for web, desktop and mobile. The post names no underlying models.
                </P>
                <UL>
                  <li>• <strong>Cascade:</strong> the new version of Manus's in-house agent harness. It starts a project light and loads specialised capabilities only when needed. Manus claims 23.2% fewer tokens, 28.2% less time and 32% lower run cost than its previous system, in one test configuration it does not describe.</li>
                  <li>• <strong>Cloud Computer:</strong> a dedicated environment you buy for work that must stay up, such as an always-on automation.</li>
                  <li>• <strong>Event triggers:</strong> Automations extend scheduled tasks with triggers from connected services, such as a new email, a calendar event, a Slack message or a Notion update.</li>
                  <li>• <strong>Manus Studio:</strong> the upgraded desktop app, with new Video Editor and Game Dev environments.</li>
                  <li>• <strong>Cue:</strong> a separate app for personal agents. Each agent gets its own email address, phone number, wallet and computer, can pay within a budget you set, and can take calls. At launch Cue was in early access, free with an invite code.</li>
                </UL>

                <H3 id="manus-pricing-api">Manus pricing and API</H3>
                <P>
                  <A href="https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus">Manus's help centre</A>{" "}
                  lists three plan families as of Nov 25, 2026. Free is $0 with 300 credits refreshed daily, 1
                  concurrent task and 2 scheduled automations. Pro starts at $20 a month with 4,000 credits, or $40
                  with 8,000, and allows 20 concurrent tasks. Team starts at $20 per seat with a shared credit pool.
                  Prices for Cloud Computer, and for Cue after early access, are not published.
                </P>
                <P>
                  Manus has a <A href="https://open.manus.ai/docs/v2/introduction.md">public REST API (v2)</A> for
                  creating and managing tasks, projects, files, webhooks, skills, connectors and custom agents. API
                  usage draws on the account's credits. Rate limits are the same on every plan: 10 requests a minute
                  for creating tasks and sending messages, and 100 a minute for read endpoints. Each API key has full
                  account access.
                </P>
                <P>
                  <strong>Pick this if</strong> you need to start agent tasks from your own code, or want a free plan
                  with a daily credit refresh.
                </P>

                <H3 id="muse-vs-manus">Muse vs Manus</H3>
                <P>
                  Muse is Meta's agent. It runs on Meta's cloud with Meta's Muse Spark model, it is free with a weekly
                  token limit, and we found no public API for the agent. Manus is a separate company again. It bills
                  in credits, has a free plan and a Pro plan from $20 a month, and has a public REST API. Choose Muse if you want Meta's consumer connectors and built-in
                  checkout in a country where Muse has launched. Choose Manus if you want API access or event-triggered
                  automations.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="independent-agents">5. Which Other Independent Managed Agents Are There?</H2>

                <H3 id="perplexity-computer">Perplexity Computer</H3>
                <P>
                  <A href="https://www.perplexity.ai/help-center/en/articles/13837784-what-is-computer">Computer</A>{" "}
                  is Perplexity's autonomous worker, which chains research, tool use, document creation, connectors,
                  memory and scheduling from one prompt. The Decoder reported its launch on February 25, 2026 at the
                  $200-a-month tier, and Perplexity's changelog says it opened to all Pro subscribers on March 12,
                  2026. Max includes 10,000 credits a month, Pro has no monthly credit grant, and tasks pause when
                  credits run out. We did not confirm plan prices on a Perplexity page. It runs in an isolated cloud
                  sandbox by default, with local modes on Apple silicon Macs and supported NVIDIA hardware. You extend
                  it with 400+ prebuilt connectors or a custom remote MCP connector, and it orchestrates 20+ models.{" "}
                  <strong>Pick this if</strong> your tasks start with research and you want custom MCP connectors.
                </P>

                <H3 id="genspark-claw">Genspark Claw</H3>
                <P>
                  <A href="https://www.genspark.ai/helpcenter/genspark-claw">Genspark Claw</A> is Genspark's persistent
                  personal assistant, which connects to your apps, keeps memory and acts across email, calendar and
                  messaging. Its launch date and prices are not confirmed. It runs either on a dedicated always-on
                  Cloud Computer, sold as a subscription in Lite, Standard and Powerful tiers, or in a macOS or
                  Windows desktop app that works only while the machine is on. You reach it through WhatsApp, Telegram, LINE, Slack, Microsoft Teams,
                  Discord, Signal, Google Chat or Feishu/Lark, and each Claw has its own email address. You extend it
                  with 30+ built-in skills and custom skills, and you can switch the model.{" "}
                  <strong>Pick this if</strong> you want a hosted agent you can message from the chat apps you
                  already use.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="open-source">6. Is There an Open-Source Alternative to Meta Muse?</H2>
                <P>
                  Yes, two: OpenClaw and Hermes Agent, both under the MIT licence. Muse itself borrows from this group.
                  TechCrunch reported that Meta's Nat Friedman said Muse was built from scratch but is "definitely
                  heavily inspired as a product by OpenClaw". Our{" "}
                  <In to="/blog/meta-muse-vs-openclaw-vs-hermes-agent">Meta Muse vs OpenClaw vs Hermes Agent</In>{" "}
                  comparison goes through the three in detail.
                </P>

                <H3 id="openclaw">OpenClaw</H3>
                <P>
                  <A href="https://github.com/openclaw/openclaw">OpenClaw</A> is an open-source assistant that runs on
                  your own computer and talks to you through the chat apps you already use. The OpenClaw Foundation
                  stewards it, and the README says there is no paid tier or hosted service. The repository was created
                  on November 24, 2025, and the latest stable release is v2026.11.9, published November 25, 2026.
                </P>
                <UL>
                  <li>• <strong>Price:</strong> free. You bring a hosted or local model.</li>
                  <li>• <strong>Runs where:</strong> a local Gateway on your machine controls sessions, tools and channels. Memory, state and credentials stay on your hardware.</li>
                  <li>• <strong>Extend it:</strong> tools, skills and plugins through a plugin SDK, shared on the ClawHub registry. The docs list 33 chat channels.</li>
                  <li>• <strong>Watch for:</strong> sandboxing and exec approvals are off by default, so tools run on the host until you configure a sandbox. See our <In to="/blog/ai-agent-sandboxing">agent sandboxing guide</In>.</li>
                </UL>
                <P>
                  <strong>Pick this if</strong> you want everything on your own machine and will do the hardening
                  yourself. If OpenClaw is not the right fit, see{" "}
                  <In to="/blog/openclaw-alternatives">OpenClaw alternatives</In>.
                </P>

                <H3 id="hermes-agent">Hermes Agent</H3>
                <P>
                  <A href="https://github.com/NousResearch/hermes-agent">Hermes Agent</A> is Nous Research's
                  open-source agent with a built-in learning loop that writes and refines its own skills and keeps
                  memory across sessions. The repository was created on July 22, 2025, and the latest stable release
                  is v0.23.4, dated November 23, 2026.
                </P>
                <UL>
                  <li>• <strong>Price:</strong> free to self-host. Hermes Cloud, an always-on hosted agent, is included in paid Nous Portal plans: Plus $20, Super $100 and Ultra $200 a month.</li>
                  <li>• <strong>Runs where:</strong> your machine, Docker, an SSH host or serverless sandboxes. It works with any model provider.</li>
                  <li>• <strong>Extend it:</strong> MCP servers, skills, plugins, subagents and a built-in cron scheduler.</li>
                  <li>• <strong>Approvals:</strong> dangerous-command approval defaults to a smart mode, where a helper model approves low-risk commands, denies dangerous ones and asks you about unclear ones.</li>
                </UL>
                <P>
                  <strong>Pick this if</strong> you want an open-source agent with MCP support, approval checks on by
                  default, and a hosted option for later. Related reading:{" "}
                  <In to="/blog/hermes-agent-vs-openclaw">Hermes Agent vs OpenClaw</In> and{" "}
                  <In to="/blog/hermes-agent-alternatives">Hermes Agent alternatives</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="which-to-pick">7. Which Meta Muse Alternative Should You Pick?</H2>
                <DataTable head={["If you…", "Look at"]} rows={pick} />
                <P>
                  Before you sign up, read the vendor's own country and plan page, and decide which accounts the agent
                  may write to. Google and Meta both warn about prompt injection in their own documentation. If the
                  term agent is new to you, start with{" "}
                  <In to="/blog/what-are-ai-agents">what AI agents are</In>.
                </P>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">8. Frequently Asked Questions</H2>
                {faqs.map((f) => (
                  <div key={f.id}>
                    <H3 id={f.id}>{f.q}</H3>
                    <P>{f.a}</P>
                  </div>
                ))}
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">9. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• Meta Muse: <A href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/">launch post</A> · <A href="https://research.meta.ai/blog/how-we-built-safety-into-muse">safety engineering post</A> · <A href="https://www.meta.com/help/subscriptions/1021145227643680/">subscriptions help page</A> · <A href="https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/">UK launch post</A></li>
                  <li>• Muse reporting: <A href="https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff-over-agentic-shopping/">GeekWire on the Amazon block</A> · <A href="https://www.eweek.com/news/meta-muse-chat-exposure/">eWeek on the shared links</A> · <A href="https://www.thestar.com.my/news/world/2026/11/18/as-meta-bets-big-on-muse-ai-agent-early-safety-mishaps-surface">Reuters investigation (syndicated)</A> · <A href="https://techcrunch.com/2026/09/22/meta-admits-muses-likeness-to-openclaw-isnt-a-coincidence/">TechCrunch on Muse and OpenClaw</A> · <A href="https://www.iphoneincanada.ca/2026/09/18/metas-muse-ai-agent-is-now-available-in-canada/">iPhone in Canada</A></li>
                  <li>• OpenAI: <A href="https://openai.com/index/introducing-dots/">Introducing dots</A> · <A href="https://help.openai.com/en/articles/20001530-getting-started-with-your-dot">Getting started with your dot</A> · <A href="https://help.openai.com/en/articles/20001641-pricing-and-billing-for-dots-in-chatgpt-enterprise">Enterprise dot pricing</A> · <A href="https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes">ChatGPT Business release notes</A> · <A href="https://openai.com/index/chatgpt-for-your-most-ambitious-work/">ChatGPT Work launch post</A></li>
                  <li>• Google: <A href="https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/">Spark announcement</A> · <A href="https://support.google.com/gemini/answer/17094507?hl=en">Gemini help page on tasks</A> · <A href="https://blog.google/innovation-and-ai/products/gemini-app/tasks-in-gemini-free-new-features/">Tasks in Gemini, Nov 17</A> · <A href="https://blog.google/innovation-and-ai/products/gemini-app/gemini-spark-updates-june-2026/">June 2026 updates</A> · <A href="https://9to5google.com/2026/10/12/gemini-spark-task-redesign/">9to5Google on the rename</A></li>
                  <li>• Anthropic: <A href="https://claude.com/product/cowork">Cowork product page</A> · <A href="https://claude.com/resources/articles/cowork-is-now-claude">Cowork is now Claude</A> · <A href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Get started with Cowork</A> · <A href="https://support.claude.com/en/articles/12138966-release-notes">release notes</A></li>
                  <li>• Grok Bot: <A href="https://x.ai/news/introducing-grok-bot">launch post</A> · <A href="https://x.ai/bot">product page</A> · <A href="https://docs.x.ai/grok-bot/faq">FAQ</A> · <A href="https://docs.x.ai/grok-bot/security">security docs</A></li>
                  <li>• Manus: <A href="https://manus.im/blog/introducing-manus-2-0">Introducing Manus 2.0</A> · <A href="https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus">membership pricing</A> · <A href="https://open.manus.ai/docs/v2/introduction.md">API v2 docs</A> · <A href="https://open.manus.ai/docs/v2/rate-limits.md">rate limits</A> · <A href="https://techcrunch.com/2026/04/27/china-vetoes-metas-2b-manus-deal-after-months-long-probe/">TechCrunch on the blocked deal</A> · <A href="https://www.thestandard.com.hk/innovation/article/339691/AI-startup-Manus-to-resume-independent-operations-as-deal-with-Meta-unwinds">Reuters on the separation (syndicated)</A></li>
                  <li>• Perplexity and Genspark: <A href="https://www.perplexity.ai/help-center/en/articles/13837784-what-is-computer">What is Computer</A> · <A href="https://www.perplexity.ai/changelog/what-we-shipped---march-13-2026">Perplexity changelog</A> · <A href="https://the-decoder.com/perplexity-computer-bundles-rival-ai-models-into-one-agentic-workflow-system-for-200-a-month/">The Decoder on the launch</A> · <A href="https://www.genspark.ai/helpcenter/genspark-claw">Genspark Claw help page</A></li>
                  <li>• Open source: <A href="https://github.com/openclaw/openclaw">OpenClaw on GitHub</A> · <A href="https://docs.openclaw.ai/start/why-openclaw">OpenClaw docs</A> · <A href="https://github.com/NousResearch/hermes-agent">Hermes Agent on GitHub</A> · <A href="https://hermes-agent.nousresearch.com/docs/user-guide/security">Hermes Agent security docs</A> · <A href="https://hermes-agent.nousresearch.com/">Hermes Agent site</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against the pages above on November 25, 2026. Prices, plan names and country lists for these
                  products change often, so confirm on the vendor's page before you subscribe. This page is a
                  comparison of published information; it is not based on hands-on testing.
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

export default MetaMuseAlternativesPost;
