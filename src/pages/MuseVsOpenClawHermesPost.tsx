import { ArrowLeft, Clock, User, Calendar, GitCompare, BarChart3 } from "lucide-react";
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
import { HERMES_CHEAT_SHEET } from "@/config/newsletterBonuses";

const PATH = "/blog/meta-muse-vs-openclaw-vs-hermes-agent";

// Sources, all checked Nov 25, 2026.
const SRC = {
  museLaunch: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
  museSafety: "https://research.meta.ai/blog/how-we-built-safety-into-muse",
  museUK: "https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/",
  museJapan: "https://about.fb.com/ja/news/2026/10/muse-personal-ai-agent-launches-in-japan/",
  museSingapore: "https://about.fb.com/news/2026/10/muse-is-now-available-in-singapore-the-worlds-first-personal-ai-agent-built-for-everyone/",
  museAustralia: "https://about.fb.com/news/2026/11/muse-is-now-available-in-australia/",
  museCanada: "https://www.iphoneincanada.ca/2026/09/18/metas-muse-ai-agent-is-now-available-in-canada/",
  musePlans: "https://www.meta.com/help/subscriptions/1021145227643680/",
  museTokens: "https://www.meta.com/help/subscriptions/28153473374286914/",
  musePermissions: "https://www.meta.com/help/artificial-intelligence/1385290430137537/",
  museConnectors: "https://www.meta.com/help/artificial-intelligence/1687253048996149/",
  museMemory: "https://www.meta.com/help/artificial-intelligence/1047255454427887/",
  museSparkApi: "https://developer.meta.com/ai/models/muse-spark/",
  museStartBuilding: "https://developer.meta.com/ai/lp/start-building/",
  musePlatform: "https://platform.muse.ai/docs",
  parallelMcp: "https://parallel.ai/articles/meta-muse-custom-integrations.md",
  tcOpenClaw: "https://techcrunch.com/2026/09/22/meta-admits-muses-likeness-to-openclaw-isnt-a-coincidence/",
  tcConnect: "https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/",
  geekwire: "https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff-over-agentic-shopping/",
  media404: "https://404media.co/meta-tests-muse-ai-agent-calls-that-are-actually-made-by-humans-in-a-call-center",
  reutersSept: "https://www.ksl.com/article/51627159/",
  reutersNov: "https://www.thestar.com.my/news/world/2026/11/18/as-meta-bets-big-on-muse-ai-agent-early-safety-mishaps-surface",
  eweek: "https://www.eweek.com/news/meta-muse-chat-exposure/",
  clawRepo: "https://github.com/openclaw/openclaw",
  clawWhy: "https://docs.openclaw.ai/start/why-openclaw",
  clawChannels: "https://docs.openclaw.ai/channels",
  hermesRepo: "https://github.com/NousResearch/hermes-agent",
  hermesSite: "https://hermes-agent.nousresearch.com/",
  hermesSecurity: "https://hermes-agent.nousresearch.com/docs/user-guide/security",
  hermesMessaging: "https://hermes-agent.nousresearch.com/docs/user-guide/messaging",
  hermesRelease: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3",
};

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
const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 text-[0.85em] font-mono text-foreground">{children}</code>
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

const MuseVsOpenClawHermesPost = () => {
  const compare = [
    ["Maker", "Meta", "Stewarded by the OpenClaw Foundation, an independent 501(c)(3)", "Nous Research"],
    ["Licence", "Meta's hosted service, under Meta's terms", "MIT, open source", "MIT, open source"],
    ["Runs where", "A dedicated cloud VM per user, run by Meta", "Your own computer, as a local Gateway", "Your machine, Docker, an SSH host or a serverless sandbox"],
    ["Model", "Muse Spark, Meta's model", "Hosted or local models, swapped as provider plugins", "Any provider: Nous Portal, OpenRouter, OpenAI, custom endpoints"],
    ["Price", "Free with a usage limit; Power $20/month, Maximum $100/month", "Free software, no paid tier; you pay your model provider", "Free software; you pay your model provider. Optional Hermes Cloud in paid Nous Portal plans"],
    ["Setup", "Install the app or open muse.ai, then connect your apps", "Run an installer, then openclaw onboard --install-daemon", "Run an installer or Docker image, or use the desktop app (macOS, Windows)"],
    ["Channels", "Muse apps (iOS, Android, web, Mac) and WhatsApp", "33 channels in the docs catalog, plus companion apps", "Telegram, Discord, Slack, WhatsApp, Signal, Email and more through its gateway"],
    ["Extensibility", "Built-in connectors, partner connectors Meta reviews, custom connectors Muse builds", "Tools, skills and plugins through a plugin SDK and the ClawHub registry", "MCP servers, skills, plugins, subagents, cron"],
    ["Approvals by default", "Asks before write actions (until you choose Always allow) and before every purchase", "Exec approvals and sandboxing are off by default", "Smart mode: a helper model approves, denies or asks you"],
    ["Availability", "US, Canada, Japan, Singapore, Australia, UK", "Anywhere you can install it", "Anywhere you can install it"],
  ];

  const decide = [
    ["Meta Muse", "You want an agent working within minutes, you live in one of the six countries, you are fine with Meta's model, and you accept that Meta runs the computer and that its staff access is limited by policy."],
    ["OpenClaw", "You want to pick the model, keep memory and credentials on your own hardware, reach the agent from many chat apps, and you are willing to turn on sandboxing and approvals yourself."],
    ["Hermes Agent", "You want a self-hosted agent that writes its own skills, command approval that is on from the first run, MCP servers, and a choice between your own machine and a paid hosted option."],
    ["Muse plus a self-hosted agent", "You want Muse for shopping, bookings and everyday accounts, and a self-hosted agent for code, private files and work where you need to choose the model."],
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
                  <GitCompare className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Meta Muse vs OpenClaw vs Hermes Agent (2026): Rent the Agent or Run Your Own?
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Meta Muse</strong> is a managed personal agent: Meta runs the agent, the model and the computer
                it works on. <strong>OpenClaw</strong> and <strong>Hermes Agent</strong> are self-hosted: you install
                open-source software and bring your own model keys. This comparison covers where each one runs, what
                it costs, what it asks before acting, who can see your data, and how to choose.
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
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />11 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ColumnsHeroDiagram
              gradientId="mvohBg"
              title="RENT THE AGENT OR RUN YOUR OWN?"
              subtitle="one managed agent and two self-hosted ones, as of Nov 25 2026"
              columns={[
                { name: "META MUSE", tag: "Meta runs it for you", color: "#60a5fa", lines: ["cloud VM per user, run by Meta", "model: Muse Spark", "free tier, $20 and $100 plans", "asks before write actions"], best: "best for: no setup, app connectors" },
                { name: "OPENCLAW", tag: "you run a chat gateway", color: "#f97316", lines: ["MIT, runs on your own computer", "33 channels in the docs catalog", "any model via provider plugins", "sandbox, approvals off by default"], best: "best for: chat-app reach" },
                { name: "HERMES AGENT", tag: "you run an agent that learns", color: "#86c98f", lines: ["MIT, by Nous Research", "local, Docker, SSH or serverless", "any model provider, plus MCP", "smart command approval by default"], best: "best for: self-written skills" },
              ]}
              footer="managed: Meta holds the computer and the model · self-hosted: you hold both"
              ariaLabel="Meta Muse versus OpenClaw versus Hermes Agent, as of November 25, 2026. Meta Muse is managed: Meta runs it for you on a cloud VM per user, the model is Muse Spark, there is a free tier plus 20 and 100 dollar monthly plans, and it asks before write actions; best for no setup and app connectors. OpenClaw is self-hosted: MIT licensed, runs on your own computer as a chat gateway, lists 33 channels in its docs catalog, uses any model through provider plugins, and has sandboxing and exec approvals off by default; best for chat-app reach. Hermes Agent is self-hosted: MIT licensed, by Nous Research, runs locally, in Docker, over SSH or in serverless sandboxes, works with any model provider and MCP servers, and has smart command approval on by default; best for self-written skills. With the managed agent Meta holds the computer and the model; with the self-hosted agents you hold both."
              source="aiengineerinsights.com · from Meta's posts and help pages, and each project's GitHub and docs, checked Nov 25 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — Meta Muse vs OpenClaw vs Hermes Agent:</strong> Muse is the managed option. Meta gives
                each user a cloud VM, runs its own Muse Spark model, and asks for approval before write actions and
                purchases. It is free with a usage limit, with $20 and $100 monthly plans, and is available in six
                countries. OpenClaw and Hermes Agent are free, MIT-licensed software that you run yourself with any
                model you pay for. OpenClaw leaves sandboxing and exec approvals off by default; Hermes Agent turns
                command approval on by default. Choose Muse for no setup and ready-made connectors, and a self-hosted
                agent when you need to pick the model and keep data on your own hardware.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="what-each-is">1. Is Meta Muse Like OpenClaw and Hermes Agent?</H2>
                <P>
                  All three are personal agents: software that carries out tasks for you across your accounts and
                  keeps working when you are not watching. They differ in who runs them.
                </P>
                <UL>
                  <li>• <strong>Meta Muse</strong> is a personal agent <A href={SRC.museLaunch}>Meta announced on September 8, 2026</A>. It keeps working after you close the app and comes back when something changes or it needs approval. Meta hosts everything. We call this a <strong>managed</strong> agent.</li>
                  <li>• <strong>OpenClaw</strong> is an <A href={SRC.clawRepo}>open-source assistant</A> that runs on your own computer and talks to you through the chat apps you already use. A local Gateway process controls sessions, tools and channels.</li>
                  <li>• <strong>Hermes Agent</strong> is <A href={SRC.hermesRepo}>Nous Research's open-source agent</A>. It has a learning loop that writes and refines its own skills and keeps memory across sessions.</li>
                </UL>
                <P>
                  OpenClaw and Hermes Agent are <strong>self-hosted</strong> agents: you install them, you supply the
                  model, and you own the machine they run on. For how those two differ from each other, see{" "}
                  <In to="/blog/hermes-agent-vs-openclaw">Hermes Agent vs OpenClaw</In>. For Muse's internals, see{" "}
                  <In to="/blog/how-meta-muse-works">How Meta Muse works</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="comparison">2. Meta Muse vs OpenClaw vs Hermes Agent: Side-by-Side</H2>
                <DataTable head={["", "Meta Muse", "OpenClaw", "Hermes Agent"]} rows={compare} />
                <P>
                  As of Nov 25, 2026, the GitHub API showed 395,167 stars for OpenClaw (latest stable release
                  v2026.11.9) and 265,922 for Hermes Agent (latest stable release v0.23.4). Star counts change daily.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="openclaw-influence">3. Is Muse Based on OpenClaw?</H2>
                <P>
                  Muse was inspired by OpenClaw, according to Meta's own product lead.{" "}
                  <A href={SRC.tcOpenClaw}>TechCrunch reported on September 22, 2026</A> that Nat Friedman, head of
                  product at Meta Superintelligence Labs, wrote on X that Muse was built from scratch but is
                  "definitely heavily inspired as a product by OpenClaw".
                </P>
                <P>
                  The posts followed a viral X post by Ansh Nanda that described Muse as OpenClaw for non-technical
                  users. Users had found matching workspace file names, including a <C>SOUL.md</C> personality file
                  with near-identical content. Asked about the match, Friedman did not dispute it and said the team
                  thought Peter Steinberger "got those things exactly right". TechCrunch also reported Friedman saying
                  he bought hundreds of Mac minis for his team after using OpenClaw in January, and that the goal was
                  something like OpenClaw made safe and scalable to billions of people.
                </P>
                <P>
                  TechCrunch's report does not say any OpenClaw code was reused. The supportable claim is that Muse
                  borrows product ideas and file conventions from OpenClaw. Meta's{" "}
                  <A href={SRC.museMemory}>help page</A> confirms one of those conventions: Muse's memory is a{" "}
                  <C>MEMORY.md</C> file you can open.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="where-it-runs">4. Where Does Each Agent Run, and Who Picks the Model?</H2>
                <P>
                  <strong>Muse runs on Meta's computers.</strong> Meta's{" "}
                  <A href={SRC.museSafety}>safety engineering post</A> says each user gets a dedicated cloud VM, the
                  Muse Secure VM: an isolated Linux machine with a browser and enough CPU, memory and storage to
                  compile code and run sub-agents and cron jobs. Muse for Mac can also drive Mac apps with permission.
                  The model is Muse Spark; the safety post names version 1.3. Meta's posts name no other model for
                  Muse.
                </P>
                <P>
                  <strong>OpenClaw runs on your own computer.</strong> Its{" "}
                  <A href={SRC.clawRepo}>README</A> describes hosted and local model providers as swappable plugins.
                </P>
                <P>
                  <strong>Hermes Agent runs where you put it:</strong> your local machine, Docker, an SSH host, or
                  serverless sandboxes such as Modal, Daytona and Vercel Sandbox. It works with any provider (Nous
                  Portal, OpenRouter, OpenAI, custom endpoints), and you switch with <C>hermes model</C>. There is
                  also a hosted option: <A href={SRC.hermesSite}>Hermes Cloud</A> is an always-on agent included in
                  paid Nous Portal plans.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="price">5. What Does Each One Cost?</H2>
                <P>
                  <strong>Muse</strong> is free with a usage limit. Meta's{" "}
                  <A href={SRC.musePlans}>subscriptions help page</A> lists two paid plans:
                </P>
                <UL>
                  <li>• <strong>Power:</strong> $20 per month, 500M Muse tokens per week, 10 phone calls per day.</li>
                  <li>• <strong>Maximum:</strong> $100 per month, 3B Muse tokens per week, 20 phone calls per day.</li>
                </UL>
                <P>
                  Limits are weekly and counted in Muse tokens. When you hit the limit you can upgrade,{" "}
                  <A href={SRC.museTokens}>buy a one-time token pack</A>, or wait for the free limit to refresh. Meta
                  does not publish the size of the free allowance, and the help page says subscriptions are in limited
                  testing and not available in all locations. TechCrunch{" "}
                  <A href={SRC.tcConnect}>reported from Meta Connect</A> that Mark Zuckerberg expects Meta to earn
                  money later through a small fee on transactions.
                </P>
                <P>
                  <strong>OpenClaw and Hermes Agent</strong> cost nothing as software. OpenClaw's README says there
                  is no paid tier or hosted service. Your costs are the machine and the model. Hermes's README
                  pitches a $5 VPS. Model cost depends on the provider and on how much the agent runs, so there is no
                  single figure to quote. As one reference point,{" "}
                  <A href={SRC.museSparkApi}>Meta's own API</A> lists Muse Spark 1.3 at $1.25 per million input tokens
                  and $4.25 per million output tokens. Hermes Cloud, the hosted option, comes with Nous Portal's paid
                  plans: Plus at $20, Super at $100 and Ultra at $200 per month.
                </P>
                <P>
                  The trade is predictability against control. Muse has a fixed monthly price and a cap. A
                  self-hosted agent has no cap unless you set one with your provider, and an agent that runs all day
                  can spend more than a subscription would.
                </P>
              </section>

              <NewsletterSignup
                heading="Leaning toward running your own agent? Get the Hermes Agent cheat sheet"
                subtext="Every install, model, skills and fix command on one printable page, free when you join. Plus one practical email a week on personal agents like Muse, OpenClaw and Hermes."
                bonus={HERMES_CHEAT_SHEET}
              />

              <section className="mb-6 sm:mb-8">
                <H2 id="setup-channels">6. How Much Setup Does Each Need, and Where Do You Talk to It?</H2>
                <P>
                  <strong>Muse</strong> needs no installation beyond an app. You open the Muse app or muse.ai, pick
                  which apps to connect, and choose an access level for each; for email the choice is read-only or
                  read-and-send. Meta's launch post says you can talk to Muse in the Muse app or in WhatsApp, and
                  the UK post lists iOS, Android, muse.ai and WhatsApp. Reports on WhatsApp support at launch differ
                  by country, so check your region.
                </P>
                <P>
                  <strong>OpenClaw</strong> installs with a script on macOS, Linux or WSL2, a PowerShell installer on
                  Windows, or <C>npm install -g openclaw@latest</C>, followed by{" "}
                  <C>openclaw onboard --install-daemon</C>. Its{" "}
                  <A href={SRC.clawChannels}>channel catalog</A> lists 33 channels: Telegram and X are bundled, and
                  Discord, Slack, WhatsApp, Signal, iMessage, Microsoft Teams and others are official plugins.
                </P>
                <P>
                  <strong>Hermes Agent</strong> installs with a script on Linux, macOS or WSL2, a PowerShell installer
                  on Windows, a Docker image, or desktop apps for macOS and Windows.{" "}
                  <A href={SRC.hermesRelease}>Version 0.23.3</A> added a one-question first-run setup. Its{" "}
                  <A href={SRC.hermesMessaging}>messaging gateway</A> covers Telegram, Discord, Slack, WhatsApp,
                  Signal, Email and more. Our <In to="/blog/how-to-install-hermes-agent">Hermes install guide</In>{" "}
                  walks through it.
                </P>
                <P>
                  With either self-hosted agent you also need a model key and a machine that stays on. That is the
                  real setup cost, and it is the part Muse removes.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="extensibility">7. What Can Each Agent Connect To and Be Extended With?</H2>
                <P>
                  <strong>Muse uses connectors.</strong> A connector is a link between Muse and one service, such as
                  Gmail or Notion. There are three kinds:
                </P>
                <UL>
                  <li>• <strong>Built-in connectors</strong>, written by Meta. Facebook, Instagram and Threads connect automatically when the accounts share an Accounts Center.</li>
                  <li>• <strong>Partner connectors</strong>, submitted through the <A href={SRC.musePlatform}>Muse Connector Platform</A>, which requires business verification and a three-stage review.</li>
                  <li>• <strong>Custom connectors</strong>, which <A href={SRC.museConnectors}>Muse builds on request</A> for a service that is not on the list. Meta does not review these, and the safety post describes its privilege separation for built-in connectors only.</li>
                </UL>
                <P>
                  The Meta pages cited here describe no public API or SDK for the Muse agent. On MCP,{" "}
                  <A href={SRC.parallelMcp}>an article from Parallel</A> says the Muse app has no setting for adding
                  an MCP server; Muse instead builds an MCP client on its VM and saves it as a skill, and servers
                  running on your own machine are out of reach.
                </P>
                <P>
                  <strong>OpenClaw</strong> is extended with tools, skills and plugins through a plugin SDK, shared on
                  the ClawHub registry. <strong>Hermes Agent</strong> supports MCP servers, a skills system compatible
                  with the agentskills.io standard, plugins, subagents and a built-in cron scheduler, and it ships an
                  importer for OpenClaw settings, memories and skills. Because both are open source, you can read
                  and change the code. With Muse, extension happens through connectors and skills that Muse writes
                  inside its VM.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="safety">8. What Are the Safety Defaults?</H2>
                <P>
                  <strong>Muse</strong> puts the agent in a container inside its VM and keeps the security services
                  outside it. A separate host-side agent called <strong>Sentinel</strong> is the only permission
                  authority for connector actions and for all network traffic leaving the VM: Muse proposes an action,
                  and Sentinel allows it, denies it, or asks you. Approval prompts go from Sentinel straight to the
                  app, not through the chat. Credentials never reach the model; code in the container sees a surrogate
                  token.
                </P>
                <P>
                  Meta's <A href={SRC.musePermissions}>permissions page</A> gives two settings per area:{" "}
                  <strong>Ask for some actions</strong>, which still covers every write action and important reads,
                  and <strong>Always ask</strong>. On each request you choose Allow once, Allow for this task, Allow
                  for this site, Always allow or Deny. Every purchase needs a human approval. Meta also states that
                  prompt injection is unsolved and that Muse will still make mistakes, and its help text makes the
                  user responsible for supervising Muse and for every transaction it makes.
                </P>
                <P>
                  <strong>OpenClaw</strong> is looser out of the box. Its own{" "}
                  <A href={SRC.clawWhy}>docs</A> say tools run on the host for the main session unless you configure
                  sandboxing, and that both sandboxing and exec approvals are off by default. Unknown people who
                  message the agent must be paired and approved by default. A hardened mode uses openshell or Docker
                  sandbox backends with network access off inside the sandbox.
                </P>
                <P>
                  <strong>Hermes Agent</strong> has command approval on by default. Its{" "}
                  <A href={SRC.hermesSecurity}>security docs</A> describe the default <C>smart</C> mode: a helper
                  model approves low-risk commands, denies dangerous ones and asks you about unclear ones. A fixed
                  blocklist of catastrophic commands applies in every mode, and unattended cron runs deny dangerous
                  commands by default. Inside container backends those checks are skipped, because the container is
                  treated as the boundary.
                </P>
                <P>
                  So on the single criterion of approvals being on by default, Muse and Hermes Agent ask and OpenClaw
                  does not until you configure it. On isolation, Muse gives you a VM you did not have to build, and
                  the self-hosted agents give you isolation only if you set it up. Our guide to{" "}
                  <In to="/blog/ai-agent-sandboxing">AI agent sandboxing</In> explains the options.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="privacy">9. Who Can See Your Data?</H2>
                <P>
                  <strong>With Muse, your data sits on Meta's infrastructure.</strong> Meta's safety post is direct
                  about what that means today: the current design does not technically prevent Meta from accessing a
                  user's VM data, and staff access is restricted by operational policy. A Muse Confidential VM,
                  intended to block Meta's access cryptographically, is planned; as of Nov 25, 2026 the help page
                  still describes it as a future option.
                </P>
                <UL>
                  <li>• <strong>Training:</strong> training on your interactions is on by default. You can switch it off in Settings &gt; Data controls, and the change also applies to earlier interactions.</li>
                  <li>• <strong>Ads:</strong> Meta says conversations and VM data are not shared with its ad systems. Muse's web browsing appears as your own activity, so a site Muse visits can still show you retargeted ads.</li>
                  <li>• <strong>Your files:</strong> you can inspect, edit and download the files on the VM, including Muse's memory. A full reset deletes all Muse data.</li>
                </UL>
                <P>
                  <strong>With a self-hosted agent, the data sits where you run it.</strong> OpenClaw's docs say
                  memory, state and credentials stay on your hardware, and that telemetry is a daily version check by
                  default, with anonymous feature statistics as an opt-in. Hermes Agent keeps its memory and session
                  history with the agent. One caveat applies to both: unless you run a local model, your prompts and
                  the content the agent reads still go to the model provider you chose.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="availability">10. Where Is Meta Muse Available?</H2>
                <P>As of Nov 25, 2026, the documented launches are:</P>
                <UL>
                  <li>• <strong>United States:</strong> September 8, 2026 (<A href={SRC.museLaunch}>Meta</A>).</li>
                  <li>• <strong>Canada:</strong> around September 18, 2026, according to <A href={SRC.museCanada}>iPhone in Canada</A>.</li>
                  <li>• <strong>Japan:</strong> October 23, 2026 (<A href={SRC.museJapan}>Meta</A>).</li>
                  <li>• <strong>Singapore:</strong> October 27, 2026 (<A href={SRC.museSingapore}>Meta</A>).</li>
                  <li>• <strong>Australia:</strong> November 17, 2026 (<A href={SRC.museAustralia}>Meta</A>).</li>
                  <li>• <strong>United Kingdom:</strong> November 23, 2026, for people aged 18 and over (<A href={SRC.museUK}>Meta</A>).</li>
                </UL>
                <P>
                  OpenClaw and Hermes Agent have no country list. You can run them wherever you can install the
                  software and reach a model provider. If Muse is not in your country, see{" "}
                  <In to="/blog/meta-muse-alternatives">Meta Muse alternatives</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="incidents">11. What Has Gone Wrong With Muse So Far?</H2>
                <P>Here are four incidents reported since launch, each attributed to the outlet that reported it.</P>
                <UL>
                  <li>• <strong>Amazon block.</strong> <A href={SRC.geekwire}>GeekWire reported</A> on September 20, 2026 (US Pacific time) that Amazon had cut Muse off from shopping on Amazon.com after asking Meta to exclude the site. Amazon's stated objections were that Meta gave no notice, that the agent does not identify itself when browsing, and that it appears to capture and store customer credentials.</li>
                  <li>• <strong>Phone calls placed by people.</strong> <A href={SRC.media404}>404 Media reported</A> on September 22, 2026 that Meta was testing having call-centre contractors place some Muse phone calls. <A href={SRC.reutersSept}>Reuters reported</A> the same day, from internal posts, that one tester was told only afterwards that a human had made the call. Meta's spokesperson said this was internal testing and that the calling feature would ship with proper disclosures.</li>
                  <li>• <strong>Shared links.</strong> <A href={SRC.eweek}>eWeek reported</A> that security firm Claroc found more than 6,800 publicly shared Muse pages by querying a passive-DNS database, and that sampled pages opened without sign-in. According to eWeek, Meta suspended conversation sharing on October 20, 2026, and Claroc said it had no evidence the shares had been misused.</li>
                  <li>• <strong>Reading Signal messages.</strong> <A href={SRC.reutersNov}>Reuters reported</A> on November 18, 2026 that it reproduced Muse reading Signal message text on an Android phone through notification access and on a Mac through accessibility and screenshot features, while the same attempts were blocked on an iPhone. Reuters said Muse used device permissions granted during setup, not a connector. Meta's spokesperson described the examples Reuters raised as isolated incidents.</li>
                </UL>
                <P>
                  Self-hosted agents have their own record. Our{" "}
                  <In to="/blog/openclaw-alternatives">OpenClaw alternatives</In> post covers OpenClaw's security
                  advisories, including CVE-2026-25253. The difference is who fixes what: with Muse you wait for
                  Meta, and with a self-hosted agent you apply the update and own the configuration.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="how-to-choose">12. Which Should You Choose?</H2>
                <DataTable head={["Choose", "If..."]} rows={decide} />
                <P>
                  If you have settled on self-hosting but not on which agent, compare more options in{" "}
                  <In to="/blog/hermes-agent-alternatives">Hermes Agent alternatives</In> and{" "}
                  <In to="/blog/agent-zero-vs-hermes-agent">Agent Zero vs Hermes Agent</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="use-both">13. Can You Use Muse and a Self-Hosted Agent Together?</H2>
                <P>
                  Yes. They are separate products, so nothing stops you running both. The practical question is
                  how to split the work. A reasonable split follows the data:
                </P>
                <UL>
                  <li>• <strong>Muse</strong> for consumer tasks that depend on its partner connectors and its payment approvals, such as shopping and bookings.</li>
                  <li>• <strong>OpenClaw or Hermes Agent</strong> for code, private files, internal tools and anything where the choice of model or the location of the data matters.</li>
                </UL>
                <P>
                  Two cautions. First, do not connect the same account with write access to both agents unless you
                  want two agents able to send from it. Second, Meta's model is not exclusive to Muse:{" "}
                  <A href={SRC.museStartBuilding}>Meta offers Muse Spark</A> through its own API, OpenRouter and
                  Google Cloud, and Hermes Agent lists OpenRouter as a provider. That suggests a self-hosted agent
                  can use Meta's model, but check the provider's current model list before you rely on it.
                </P>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">14. FAQ</H2>

                <H3 id="faq-like-openclaw">Is Meta Muse like OpenClaw?</H3>
                <P>
                  In purpose, yes: both are personal agents that act across your accounts and keep working in the
                  background. The difference is who runs them. Meta hosts Muse on a cloud VM with its own Muse Spark
                  model, while OpenClaw is MIT-licensed software you run on your own computer with a model you
                  choose.
                </P>

                <H3 id="faq-built-on">Is Meta Muse built on OpenClaw?</H3>
                <P>
                  No source says Muse contains OpenClaw code. TechCrunch reported on September 22, 2026 that Nat
                  Friedman, head of product at Meta Superintelligence Labs, said Muse was built from scratch and was
                  heavily inspired by OpenClaw as a product. Users also found matching workspace file names, such as
                  SOUL.md.
                </P>

                <H3 id="faq-self-hosted">Is there a self-hosted alternative to Meta Muse?</H3>
                <P>
                  Yes. OpenClaw and Hermes Agent are both free, MIT-licensed personal agents you run yourself with
                  your own model keys. OpenClaw focuses on reaching you through many chat apps. Hermes Agent writes
                  its own skills and has command approval on by default.
                </P>

                <H3 id="faq-free">Is Meta Muse free?</H3>
                <P>
                  Muse is free with a usage limit. Meta's help page lists a Power plan at $20 per month with 500M
                  Muse tokens per week and a Maximum plan at $100 per month with 3B Muse tokens per week. Meta does
                  not publish the size of the free allowance, and subscriptions are in limited testing.
                </P>

                <H3 id="faq-meta-access">Can Meta see my Muse data?</H3>
                <P>
                  Meta's safety engineering post says the current design does not technically prevent Meta from
                  accessing a user's VM data, and that staff access is restricted by operational policy. A Muse
                  Confidential VM meant to block that access is planned and was still described as a future option
                  on November 25, 2026.
                </P>

                <H3 id="faq-safer">Which asks for approval by default: Muse, OpenClaw or Hermes Agent?</H3>
                <P>
                  Muse and Hermes Agent do. Muse asks before write actions and before every purchase, and Hermes Agent
                  defaults to a smart approval mode for dangerous commands. OpenClaw's own docs say sandboxing and
                  exec approvals are off by default, so you have to turn them on.
                </P>

                <H3 id="faq-countries">Which countries have Meta Muse?</H3>
                <P>
                  As of November 25, 2026, Muse has launched in the United States, Canada, Japan, Singapore,
                  Australia and the United Kingdom. OpenClaw and Hermes Agent have no country restrictions because
                  you install and run them yourself.
                </P>

                <H3 id="faq-both">Can I use Meta Muse and Hermes Agent or OpenClaw together?</H3>
                <P>
                  Yes. They are separate products, so nothing stops you running both. A sensible split is Muse for
                  shopping, bookings and other tasks that use its partner connectors, and a self-hosted agent for
                  code, private files and work where you need to choose the model.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">15. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href={SRC.museLaunch}>Meta — Introducing Muse, a personal AI agent (Sept 8, 2026)</A></li>
                  <li>• <A href={SRC.museSafety}>Meta — How we built safety into Muse (Sept 8, 2026)</A></li>
                  <li>• <A href={SRC.musePlans}>Meta help — Muse subscription plans and limits</A></li>
                  <li>• <A href={SRC.museTokens}>Meta help — Additional Muse tokens</A></li>
                  <li>• <A href={SRC.musePermissions}>Meta help — Muse permissions, approvals and activity log</A></li>
                  <li>• <A href={SRC.museConnectors}>Meta help — Muse connectors and custom connectors</A></li>
                  <li>• <A href={SRC.museMemory}>Meta help — Muse memory, data controls and Confidential VM</A></li>
                  <li>• <A href={SRC.museUK}>Meta — Introducing Muse in the UK (Nov 23, 2026)</A></li>
                  <li>• <A href={SRC.museSparkApi}>Meta for Developers — Muse Spark model page and API pricing</A></li>
                  <li>• <A href={SRC.tcOpenClaw}>TechCrunch — Meta admits Muse's likeness to OpenClaw isn't a coincidence (Sept 22, 2026)</A></li>
                  <li>• <A href={SRC.geekwire}>GeekWire — Amazon blocks Meta's Muse AI assistant (Sept 20, 2026)</A></li>
                  <li>• <A href={SRC.reutersSept}>Reuters, via KSL — Muse phone-call testing (Sept 22, 2026)</A></li>
                  <li>• <A href={SRC.reutersNov}>Reuters, via The Star — Muse early safety mishaps (Nov 18, 2026)</A></li>
                  <li>• <A href={SRC.clawRepo}>OpenClaw — GitHub repository and README</A></li>
                  <li>• <A href={SRC.clawWhy}>OpenClaw docs — Why OpenClaw (security defaults)</A></li>
                  <li>• <A href={SRC.clawChannels}>OpenClaw docs — Channels</A></li>
                  <li>• <A href={SRC.hermesRepo}>Hermes Agent — GitHub repository and README</A></li>
                  <li>• <A href={SRC.hermesSecurity}>Hermes Agent docs — Security</A></li>
                  <li>• <A href={SRC.hermesSite}>Hermes Agent — site, Hermes Cloud and Nous Portal plans</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against the pages above on November 25, 2026. Prices, limits, country lists, release
                  numbers and star counts change often, so confirm them on the linked pages before you decide. This
                  comparison is built from published documentation and reporting, not from our own testing of Muse.
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

export default MuseVsOpenClawHermesPost;
