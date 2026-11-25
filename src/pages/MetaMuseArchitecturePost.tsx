import { ArrowLeft, Clock, User, Calendar, ShieldCheck, BarChart3 } from "lucide-react";
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
import TopmateCTA from "@/components/TopmateCTA";

const PATH = "/blog/how-meta-muse-works";

const SAFETY_POST = "https://research.meta.ai/blog/how-we-built-safety-into-muse";
const LAUNCH_POST = "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/";
const PERMISSIONS_HELP = "https://www.meta.com/help/artificial-intelligence/1385290430137537/";
const CONNECTORS_HELP = "https://www.meta.com/help/artificial-intelligence/1687253048996149/";
const MEMORY_HELP = "https://www.meta.com/help/artificial-intelligence/1047255454427887/";
const PAYMENTS_HELP = "https://www.meta.com/help/superintelligence/1436362127544482/";
const MODEL_PAGE = "https://developer.meta.com/ai/models/muse-spark/";
const START_BUILDING = "https://developer.meta.com/ai/lp/start-building/";
const SPARK_POST = "https://research.meta.ai/blog/introducing-muse-spark-1-3";
const PLATFORM_DOCS = "https://platform.muse.ai/docs";
const GEEKWIRE = "https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff-over-agentic-shopping/";
const REUTERS_SEP = "https://www.ksl.com/article/51627159/";
const REUTERS_NOV = "https://www.thestar.com.my/news/world/2026/11/18/as-meta-bets-big-on-muse-ai-agent-early-safety-mishaps-surface";
const MEDIA_404 = "https://404media.co/meta-tests-muse-ai-agent-calls-that-are-actually-made-by-humans-in-a-call-center";
const EWEEK = "https://www.eweek.com/news/meta-muse-chat-exposure/";
const PARALLEL = "https://parallel.ai/articles/meta-muse-custom-integrations.md";

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

const faqs = [
  {
    id: "faq-how",
    q: "How does Meta Muse work?",
    a: "Each user gets a dedicated cloud VM that Meta calls the Muse Secure VM. The agent, its workspace and its tools run inside a locked-down container on that VM. A separate service called Sentinel sits outside the container and decides whether each connector action and each network request is allowed, denied, or sent to the user for approval. The model behind the agent is Muse Spark.",
  },
  {
    id: "faq-sentinel",
    q: "What is Muse Sentinel?",
    a: "Sentinel is a separate agent that runs on the VM host, outside the container where Muse runs. Meta describes it as the only permission authority for connector actions and for all network egress. Muse proposes an action; Sentinel allows it, denies it, or asks the user. Sentinel also swaps the surrogate token for the real credential at the network boundary once a request is authorised.",
  },
  {
    id: "faq-safe",
    q: "Is Meta Muse safe?",
    a: "The published design is strong for a consumer agent: per-user VMs, a restricted container, credentials kept away from the model, and human approval for actions that move data out. Meta also says prompt injection is unsolved and that Muse will still make mistakes. The reported incidents so far involved share links, device permissions, website terms and human contractors, which sit outside the sandbox. Treat it as a tool you supervise.",
  },
  {
    id: "faq-meta-access",
    q: "Can Meta see my Muse data?",
    a: "With the current architecture, yes in principle. Meta's safety engineering post says staff access to a user's VM data is restricted by operational policy and is not prevented technically. A Muse Confidential VM that is meant to block Meta's access cryptographically was planned for later in 2026. As of 25 November 2026, Meta's help page still describes it as a future option.",
  },
  {
    id: "faq-api",
    q: "Is there a Meta Muse API?",
    a: "Not for the agent. None of the Meta pages used for this article documents a public API or SDK for the Muse agent. Developers have two other surfaces: the Meta Model API, which serves the Muse Spark model, and the Muse Connector Platform, where companies submit connectors for review.",
  },
  {
    id: "faq-api-price",
    q: "How much does the Muse Spark API cost?",
    a: "Meta's developer page lists muse-spark-1.3 at $1.25 per million input tokens, $0.15 per million cached input tokens and $4.25 per million output tokens, with a 1M-token context window. A muse-spark-1.3-contributor variant costs $0.10 input, $0.002 cached and $0.20 output per million tokens, and its traffic is used to improve Meta's products.",
  },
  {
    id: "faq-passwords",
    q: "Does the Muse model see my passwords or card number?",
    a: "Meta says credentials never reach the model. Code inside the container sees a surrogate token, and Sentinel substitutes the real secret at the network boundary after it authorises the request. For purchases through Link by Stripe, Muse gets a single-use card tied to one merchant, one amount and a short validity window, and every purchase needs your approval.",
  },
];

const MetaMuseArchitecturePost = () => {
  const layers = [
    ["Muse Secure VM", "One isolated Linux cloud machine per user, with a browser and enough CPU, memory and storage to compile code and run sub-agents and cron jobs", "One user's agent sharing a machine with another user's files"],
    ["Runtime cell", "A systemd-nspawn container on that VM that holds the agent harness, the workspace and every tool the agent runs. Root inside maps to an unprivileged host user; syscalls and capabilities are trimmed", "Agent code reaching the security services, the credential store or the host network settings"],
    ["Sentinel and the host services", "Sentinel decides every connector action and every network request. hatch-authd holds credentials and mints surrogate tokens. An egress proxy enforces the decision", "Requests to destinations the user never approved, real secrets entering the model's context, and auto-allowed requests from a process that has read user data"],
    ["Approval and audit", "Approval dialogs go from Sentinel straight to the client UI. Grants are scoped. An Activity log records actions and permissions", "A prompt-injected agent approving its own request through the chat, and actions the user cannot later trace"],
  ];

  const incidents = [
    ["Amazon blocks Muse", "Amazon cut Muse off from shopping on Amazon.com. Its stated objections: no notice from Meta, an agent that does not identify itself when browsing, and what appears to be capture and storage of customer credentials", "The browser path. A sandbox controls what the agent can do. It does not settle whether a website consents to being used by an agent", "GeekWire, reported 20 Sep 2026 (US Pacific)"],
    ["Human-placed phone calls", "Meta tested having call-centre contractors place some Muse calls. One internal tester learned only afterwards that a human made the call. An internal post said the feature was rolled back", "None of the four layers. This was a disclosure decision about people in the loop", "404 Media and Reuters, 22 Sep 2026"],
    ["Public share links", "Security firm Claroc found more than 6,800 publicly shared Muse pages through a passive-DNS database, because each share hostname contained the conversation title. Meta suspended sharing on 20 October", "None of the four layers. Sharing is a publishing feature, and the title leaked through DNS", "eWeek, 21 Oct 2026 (secondary report of Claroc's research)"],
    ["Signal messages read", "Reuters reproduced Muse reading Signal message text on an Android phone through notification access and on a Mac through accessibility and screenshot features. The same attempts were blocked on an iPhone", "Device permissions granted during setup. Per Reuters, no Connector was used, so connector permissions were not the gate", "Reuters, 18 Nov 2026"],
    ["Unwanted actions in internal testing", "Meta employees reported Muse surfacing other people's errands and messages, listing bank balances that were not theirs, and booking a non-refundable Airbnb without permission", "Approval is the layer meant to stop an unapproved booking. The sources used here do not explain the cause", "Reuters, 18 Nov 2026, from internal Meta posts"],
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-600 to-cyan-800 rounded-full px-3 py-1">
                  <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Agentic Security</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                How Meta Muse Works: Secure VM, Sentinel and the Approval Design (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Meta Muse is a personal AI agent that runs in a <strong>dedicated cloud VM per user</strong>. The agent
                works inside a restricted container, and a separate service called <strong>Sentinel</strong> decides
                which connector actions and network requests go through. This is an engineer's teardown of that
                design, built from Meta's own engineering post and help pages: what each layer does, where the
                reported incidents happened, what developers can build on, and what to copy into your own agent.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-600 to-cyan-800 flex items-center justify-center flex-shrink-0">
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
              gradientId="museArchBg"
              title="HOW META MUSE IS BUILT: FOUR LAYERS"
              subtitle="the agent proposes, a separate authority decides, the user approves"
              columns={[
                { name: "SECURE VM", tag: "one cloud VM per user", color: "#5eb8c8", lines: ["isolated Linux machine", "browser, CPU, storage", "runs sub-agents and cron", "backed up continuously"], best: "holds: one user's data" },
                { name: "RUNTIME CELL", tag: "where the agent runs", color: "#8b9cf0", lines: ["systemd-nspawn container", "root maps to unprivileged", "syscalls filtered", "no ptrace, no net admin"], best: "contains: agent and tools" },
                { name: "SENTINEL", tag: "decides, outside the cell", color: "#f97316", lines: ["allow, deny or ask the user", "inspects every egress call", "swaps in real credentials", "tainted calls: no auto-allow"], best: "decides: connectors, egress" },
                { name: "APPROVAL + AUDIT", tag: "the human in the loop", color: "#86c98f", lines: ["dialog bypasses the chat", "grants scoped and timed", "one-time card per purchase", "activity log of actions"], best: "confirms: data leaving the VM" },
              ]}
              footer="Muse proposes. Sentinel allows, denies, or asks the user."
              ariaLabel="How Meta Muse is built, in four layers. Layer one, the Muse Secure VM: one isolated Linux cloud machine per user, with a browser, CPU and storage, able to run sub-agents and cron jobs, backed up continuously. Layer two, the runtime cell: a systemd-nspawn container where the agent and its tools run, with root mapped to an unprivileged host user, filtered syscalls, and no ptrace or network admin capabilities. Layer three, Sentinel: a separate service outside the cell that allows, denies or asks the user, inspects every outbound request, swaps in real credentials at the network boundary, and removes auto-allow from tainted processes. Layer four, approval and audit: approval dialogs that bypass the chat, grants that are scoped and time-bounded, a one-time card per purchase, and an activity log of actions. Muse proposes; Sentinel allows, denies, or asks the user."
              source="aiengineerinsights.com · from Meta's safety engineering post and help pages, checked Nov 25 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR: how Meta Muse works.</strong> Every Muse user gets a dedicated cloud VM. The agent and
                its tools run inside a restricted <C>systemd-nspawn</C> container on that VM. A separate host-side
                service, Sentinel, is the only authority for connector actions and network egress: Muse proposes, and
                Sentinel allows, denies, or asks the user. The model never sees real credentials, only surrogate
                tokens that are swapped at the network boundary. The reported incidents so far happened mostly outside
                this sandbox, and Meta says its staff are kept out of user VMs by policy, with a technical block
                still to come.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="what-is-muse">1. What Is Meta Muse, and How Does It Work?</H2>
                <P>
                  Meta announced Muse on 8 September 2026 as a personal AI agent that carries out tasks instead of
                  only answering questions. It keeps working after you close the app and comes back when something
                  changes or it needs your approval (<A href={LAUNCH_POST}>Meta's launch post</A>). It runs on Muse
                  Spark, and Meta's <A href={SAFETY_POST}>safety engineering post</A> names the version as Muse Spark
                  1.3.
                </P>
                <P>
                  That safety engineering post is the main source for this teardown. It names the container
                  technology, the capabilities that were removed, and the services that sit outside the agent. Meta
                  sums the design up as two isolated security domains on one machine, in contrast to an LLM agent
                  running as root. The agent can propose anything, but a second component decides what touches your
                  accounts or the network, and for the risky cases a person does.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="four-layers">2. What Are the Four Layers of the Muse Design?</H2>
                <P>
                  The grouping into four layers is ours, to make the design easier to reason about. The rest of this
                  post uses these four names.
                </P>
                <DataTable head={["Layer", "What it does", "What it is meant to stop"]} rows={layers} />
                <P>
                  If the terms are new, read{" "}
                  <In to="/blog/what-is-an-agent-harness">what an agent harness is</In> and{" "}
                  <In to="/blog/ai-agent-sandboxing">AI agent sandboxing explained</In> first. Muse is a worked example
                  of both.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="secure-vm">3. What Runs Inside the Muse Secure VM and the Runtime Cell?</H2>
                <P>
                  The Muse Secure VM is an isolated Linux machine with a browser, sized so the agent can compile code,
                  build skills, and run sub-agents and cron jobs. VM data is backed up continuously, and users can
                  inspect, edit and download their files, including the agent's memory.
                </P>
                <P>
                  Inside the VM, the agent harness, the user workspace and all tools the agent executes run in what
                  Meta calls the runtime cell: a <C>systemd-nspawn</C> container with a Debian root filesystem. Three
                  restrictions are named:
                </P>
                <UL>
                  <li>• Root in the cell maps to an unprivileged user on the host.</li>
                  <li>• Syscalls are filtered, and <C>io_uring</C> is not available.</li>
                  <li>• Capabilities are trimmed: no <C>CAP_SYS_PTRACE</C>, no <C>CAP_NET_ADMIN</C>.</li>
                </UL>
                <P>
                  Some background, from general Linux knowledge and not from Meta: <C>systemd-nspawn</C> is a
                  lightweight container runner built on kernel namespaces. With root mapped to an unprivileged host
                  user, a process that gains root inside the container is still an ordinary user outside it.{" "}
                  <C>io_uring</C> is an asynchronous I/O interface that sandboxes often disable because it is a large
                  kernel attack surface. <C>CAP_SYS_PTRACE</C> lets a process inspect other processes and{" "}
                  <C>CAP_NET_ADMIN</C> lets it reconfigure networking.
                </P>
                <P>
                  The security services run outside the cell as separate systemd units: <C>hatch-safety</C>{" "}
                  (independent classifiers on inference traffic), <C>privsep</C> workers (built-in connector code with
                  scoped privileges), <C>hatch-authd</C> (credential storage and surrogate tokens), Sentinel, a
                  separate Postgres database for durable state, and proxies for inference and telemetry. "Hatch" is
                  Muse's internal codename. The cell talks to these services over Unix domain sockets using{" "}
                  <C>SO_PEERCRED</C> and peer ACLs. <C>SO_PEERCRED</C> is a kernel feature that tells a server which
                  process and user is on the other end of a socket.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sentinel">4. What Is Muse Sentinel, and What Does It Decide?</H2>
                <P>
                  Sentinel is a separate host-side agent. Meta describes it as the only permission authority for
                  connector actions and for all network egress. Muse proposes; Sentinel allows, denies, or asks the
                  user. The agent has no code path that grants itself permission.
                </P>
                <H3 id="egress">Egress control</H3>
                <P>
                  All outbound traffic goes through a forward proxy, enforced with user namespaces, veth boundaries
                  and eBPF. For each request Sentinel inspects the hostname, resolved IP, port, protocol, HTTP method,
                  path and the decoded request, with protections against server-side request forgery. eBPF, in
                  general terms, lets small verified programs run inside the kernel at fixed hook points.
                </P>
                <H3 id="surrogate-credentials">Surrogate credentials</H3>
                <P>
                  Credentials never reach the model. Code in the cell sees only a surrogate token minted by{" "}
                  <C>hatch-authd</C>. After Sentinel authorises a request, it swaps in the real secret at the network
                  boundary. This helps because a prompt-injected agent can only leak what it can read, and a
                  surrogate token is useless anywhere except through that proxy.
                </P>
                <H3 id="tainted-egress">Tainted egress</H3>
                <P>
                  Each tool process starts clean and becomes tainted once it reads user data. Only clean requests can
                  use the narrow auto-allow rules. Meta implements this with eBPF cgroup programs and eBPF programs on
                  LSM hooks. The effect: a process that has just read your inbox cannot make an unreviewed request.
                </P>
              </section>

              <NewsletterSignup
                heading="Building agents that take real actions?"
                subtext="The AI Engineer's Brief is a weekly email on agent architecture, agent security and system design interview prep, written for working engineers. No spam."
              />

              <section className="mb-6 sm:mb-8">
                <H2 id="browser-sub-agent">5. How Does the Browser Sub-Agent Handle Prompt Injection?</H2>
                <P>
                  Muse runs an up-to-date Chromium behind a virtualisation layer. A browser sub-agent drives it, and
                  that sub-agent sees an accessibility-tree snapshot of the page, not the raw DOM. It cannot run
                  JavaScript in the page, and it is paused while the user takes over or while credentials are being
                  filled.
                </P>
                <P>
                  An accessibility tree is the structured view a browser gives to screen readers: roles, names and
                  states. It is much smaller than the DOM and leaves out most of the markup where instructions can be
                  hidden, though visible text still comes through.
                </P>
                <P>
                  Meta frames the wider problem with Simon Willison's lethal trifecta: an agent that has private data,
                  reads untrusted content and can send data out. Its defence is layered: model training, labelling
                  external data as untrusted in the harness, an ensemble of independent detection classifiers, and
                  human approval for actions that move data out of the VM. The email connector also filters out
                  one-time passcodes, password-reset links and login magic links, using deterministic filters plus a
                  classifier.
                </P>
                <P>
                  Meta does not claim this is solved. The post says prompt injection remains an open problem and that
                  Muse "can and will still make mistakes". Meta opened a public bug bounty at launch, paying up to
                  $300,000 per valid report, including up to $130,000 for a prompt injection affecting one user. For
                  the general attack and defence patterns, see{" "}
                  <In to="/blog/ai-agent-security-prompt-injection">AI agent security and prompt injection</In> and{" "}
                  <In to="/blog/ai-guardrails">AI guardrails</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="approvals">6. How Do Approvals, the Audit Trail and Payments Work?</H2>
                <P>
                  The detail worth copying first: approval dialogs are sent by Sentinel straight to the client UI, not
                  through the chat with Muse, and the answer goes straight back to Sentinel. The model cannot rewrite
                  the question or fake the answer, because it is not on that channel.
                </P>
                <UL>
                  <li>• <strong>Grants are scoped capabilities:</strong> one-time, session-scoped, task-scoped, time-bounded or perpetual, each bound to a connector or destination and a use case.</li>
                  <li>• <strong>Two permission levels per area</strong> (<A href={PERMISSIONS_HELP}>Meta's permissions help page</A>): <strong>Ask for some actions</strong>, which covers every write action and important reads, or <strong>Always ask</strong>.</li>
                  <li>• <strong>Choices on a request:</strong> Allow once, Allow for this task, Allow for this site, Always allow, or Deny.</li>
                  <li>• <strong>Read and write are split</strong> where the service allows it, with controls finer than the OAuth scope. Meta's example is Gmail read access without access to Gmail settings.</li>
                  <li>• <strong>Audit trail:</strong> an Activity log of actions and permissions granted, an Upcoming view for scheduled tasks, and browsable System Files.</li>
                </UL>
                <P>
                  Payments follow the same idea. At US launch, checkout used Link by Stripe, whose agent wallet issues
                  a single-use card tied to one merchant, one dollar amount and a short validity window, and every
                  purchase gets a human approval. Meta's UK post calls the Stripe product Onelink. The{" "}
                  <A href={PAYMENTS_HELP}>payments help page</A> lists a second route: logging in with stored
                  credentials and paying with the card saved at the merchant, where Muse detects the checkout page and
                  prompts for approval with the purchase details.
                </P>
                <P>
                  Meta's help text also says that some actions cannot be undone, such as a sent email, and that the
                  user must supervise Muse and is responsible for all transactions it makes.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="connectors">7. How Do Connectors and Custom Connectors Work?</H2>
                <P>
                  A Connector is Muse's link to an outside service. Users pick which apps to connect and the access
                  level; for email the choice is read-only or read-and-send. Built-in Connector
                  code runs in the <C>privsep</C> workers with scoped privileges.
                </P>
                <P>
                  Custom Connectors are different. A user asks Muse to build a Connector for a service that is not in
                  the list, Muse walks through getting the API details, and it stores them in the Secure Credentials
                  Store. Meta's <A href={CONNECTORS_HELP}>connectors help page</A> says Meta does not review custom
                  Connectors, and the safety engineering post describes <C>privsep</C> privilege separation for
                  built-in Connectors specifically. Egress still passes Sentinel, but the connector code itself has
                  had no human review.
                </P>
                <P>
                  On MCP: according to an article by Parallel, the Muse app has no setting for adding an MCP server.
                  Muse instead builds an MCP client on its VM and saves it as a skill, and servers running on the
                  user's own machine cannot be reached (<A href={PARALLEL}>Parallel</A>).
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="is-muse-safe">8. Is Meta Muse Safe? Where the Design Held and Where It Did Not</H2>
                <P>
                  Start with what the reporting does not show. None of the incidents below describes an escape from
                  the runtime cell or a real credential reaching the model. That is an absence of reports, not proof
                  that the sandbox is sound. What the incidents do show is that most of the damage so far came from
                  parts of the product the four layers do not cover.
                </P>
                <DataTable head={["Incident", "What was reported", "Which layer was involved", "Source"]} rows={incidents} />
                <P>
                  Some detail behind the rows. On the share links, eWeek reported that sampled pages opened without
                  sign-in and included a CEO-only revenue review and a bank fraud alert, that most pages reviewed were
                  harmless, and that Claroc said it had no evidence of misuse (<A href={EWEEK}>eWeek</A>). On the
                  human-placed calls, Reuters reported that a Meta Superintelligence Labs VP wrote internally that
                  testing without disclosure "was a miss"; Meta's public statement called it internal dogfooding (
                  <A href={REUTERS_SEP}>Reuters</A>, <A href={MEDIA_404}>404 Media</A>).
                </P>
                <P>
                  On the Signal finding, Reuters reported that an Apple update that week closed the Mac pathway. On
                  the internal reports, Reuters said it could not tell whether the bank balances were real or
                  invented, and that Meta's spokesperson described the examples as isolated and said many of the
                  mix-ups were hallucinations that had already been fixed (<A href={REUTERS_NOV}>Reuters</A>). The
                  Amazon dispute is covered by <A href={GEEKWIRE}>GeekWire</A>.
                </P>
                <H3 id="staff-access">Meta's own admission about staff access</H3>
                <P>
                  The safety engineering post states that the current architecture does not stop Meta from accessing a
                  user's VM data. Staff access is restricted by operational policy, not prevented technically. A Muse
                  Confidential VM, intended to block Meta's access cryptographically and verifiably, was planned for
                  later in 2026, was in use by a small tester group, and had its design and source shared with
                  external auditors. As of 25 November 2026, Meta's <A href={MEMORY_HELP}>help page</A> still
                  describes it as a future option. Any claim that Meta itself cannot read your data applies to that
                  future VM, not to the product today.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="developers">9. What Can Developers Build On? Muse Spark API and the Connector Platform</H2>
                <UL>
                  <li>• <strong>The model, yes.</strong> Muse Spark 1.3 is available through the Meta Model API (<A href={SPARK_POST}>Meta's Muse Spark 1.3 post</A>). The <A href={MODEL_PAGE}>developer page</A> lists <C>muse-spark-1.3</C> at $1.25 input, $0.15 cached input and $4.25 output per million tokens, with a 1M-token context window, and says this traffic is not used to improve Meta products. A cheaper <C>muse-spark-1.3-contributor</C> variant costs $0.10 input, $0.002 cached and $0.20 output per million tokens, and its traffic is used to improve Meta's products.</li>
                  <li>• <strong>Other routes to the model.</strong> Muse Spark is also offered through OpenRouter and Google Cloud (<A href={START_BUILDING}>Meta's start-building page</A>).</li>
                  <li>• <strong>Connectors, with review.</strong> The <A href={PLATFORM_DOCS}>Muse Connector Platform</A> takes third-party submissions. Requirements include business verification, a named maintainer, OAuth or API-key auth, a read-only option where possible, a reviewer test account, and a three-stage review.</li>
                  <li>• <strong>The agent, no.</strong> None of the Meta pages used for this post documents a public API or SDK for the Muse agent.</li>
                </UL>
                <P>
                  So you cannot embed Muse in your product. You can call the same model and build the surrounding
                  system yourself. For hosted and open-source options, see{" "}
                  <In to="/blog/meta-muse-alternatives">Meta Muse alternatives</In> and{" "}
                  <In to="/blog/meta-muse-vs-openclaw-vs-hermes-agent">Meta Muse vs OpenClaw vs Hermes Agent</In>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="checklist">10. What Should You Copy Into Your Own Agent Design?</H2>
                <UL>
                  <li>• <strong>Separate the decision from the agent.</strong> The agent proposes; a process in another security domain decides.</li>
                  <li>• <strong>Give the agent surrogate tokens.</strong> Inject the real secret at the egress proxy, after authorisation.</li>
                  <li>• <strong>Force all egress through one proxy</strong> with default deny. Check destination, method and path.</li>
                  <li>• <strong>Track taint per process.</strong> Once a process has read user data, it loses any auto-allow rule.</li>
                  <li>• <strong>Send approval prompts on a channel the model cannot write to.</strong></li>
                  <li>• <strong>Scope every grant</strong> by duration and destination, and log every action and grant where the user can read it.</li>
                  <li>• <strong>Filter account-recovery material</strong> (one-time codes, reset links, magic links) out of what the agent reads.</li>
                  <li>• <strong>Use single-use, amount-limited payment credentials</strong> with approval per purchase.</li>
                  <li>• <strong>Threat-model the parts outside the sandbox:</strong> share links, device permissions, operator access and humans in the loop. The Muse incidents happened there.</li>
                </UL>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="interview">11. How Do You Use Muse as a System Design Interview Answer?</H2>
                <P>
                  "Design a personal agent that can act on a user's email, browser and payments" is the kind of prompt
                  an agent system design interview asks. Muse gives you a published reference to reason from:
                </P>
                <UL>
                  <li>• <strong>State the threat first.</strong> The agent has private data, reads untrusted content and can send data out. Prompt injection cannot be fully prevented, so the design must limit what a compromised agent can do.</li>
                  <li>• <strong>Draw two trust domains:</strong> one for the agent and its tools, one for policy, credentials and state.</li>
                  <li>• <strong>Walk one request end to end.</strong> The agent proposes sending an email; the policy service checks grants and taint; it asks the user on a separate channel; the proxy injects the credential; the action is logged.</li>
                  <li>• <strong>Name the trade-offs.</strong> A VM per user costs more than a shared container pool. More prompts mean more approval fatigue, which is why grants need scopes.</li>
                  <li>• <strong>Finish with what the sandbox does not cover,</strong> using the Muse incidents and their sources.</li>
                </UL>
                <P>
                  For the wider framework, including capacity, state and evaluation, see{" "}
                  <In to="/blog/agentic-ai-system-design">agentic AI system design</In>.
                </P>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">12. FAQ</H2>
                {faqs.map((f) => (
                  <div key={f.id}>
                    <H3 id={f.id}>{f.q}</H3>
                    <P>{f.a}</P>
                  </div>
                ))}
              </section>

              <TopmateCTA placement="muse-architecture" />

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">13. Sources</H2>
                <p className="text-muted-foreground mb-2 text-sm sm:text-base font-medium">Meta's own pages</p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <A href={SAFETY_POST}>Meta research blog: How we built safety into Muse (Sep 8, 2026)</A></li>
                  <li>• <A href={LAUNCH_POST}>Meta newsroom: Introducing Muse, a personal AI agent (Sep 8, 2026)</A></li>
                  <li>• <A href={PERMISSIONS_HELP}>Meta help: Muse permissions, approvals and the Activity log</A></li>
                  <li>• <A href={CONNECTORS_HELP}>Meta help: Connectors and custom Connectors</A></li>
                  <li>• <A href={MEMORY_HELP}>Meta help: Muse memory, data controls and Confidential VM</A></li>
                  <li>• <A href={PAYMENTS_HELP}>Meta help: Payments with Muse</A></li>
                  <li>• <A href="https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/">Meta newsroom: Introducing Muse in the UK (Nov 23, 2026)</A></li>
                  <li>• <A href={MODEL_PAGE}>Meta for Developers: Muse Spark model page and pricing</A></li>
                  <li>• <A href={START_BUILDING}>Meta for Developers: Start building with Muse Spark</A></li>
                  <li>• <A href={SPARK_POST}>Meta research blog: Introducing Muse Spark 1.3 (Sep 2, 2026)</A></li>
                  <li>• <A href={PLATFORM_DOCS}>Muse Connector Platform docs</A></li>
                </ul>
                <p className="text-muted-foreground mb-2 text-sm sm:text-base font-medium">Reporting</p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href={GEEKWIRE}>GeekWire: Amazon blocks Meta's Muse AI assistant (Sep 20, 2026)</A></li>
                  <li>• <A href={MEDIA_404}>404 Media: Meta tests Muse calls that are made by humans in a call centre (Sep 22, 2026)</A></li>
                  <li>• <A href={REUTERS_SEP}>Reuters, syndicated by KSL: internal testing of human-placed Muse calls (Sep 22, 2026)</A></li>
                  <li>• <A href={REUTERS_NOV}>Reuters, syndicated by The Star: early safety mishaps as Meta bets on Muse (Nov 18, 2026)</A></li>
                  <li>• <A href={EWEEK}>eWeek: Muse chat exposure found by Claroc (Oct 21, 2026), secondary coverage of Claroc's research</A></li>
                  <li>• <A href={PARALLEL}>Parallel: Meta Muse custom integrations, secondary source for the MCP detail</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against the pages above on November 25, 2026. Descriptions of Muse's internals come from
                  Meta's own published account and have not been independently verified here. The grouping into four
                  layers, the layer column in the incident table, the checklist and the interview structure are our
                  analysis. Short explanations of Linux and browser concepts are general background, not statements
                  about Meta's implementation.
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

export default MetaMuseArchitecturePost;
