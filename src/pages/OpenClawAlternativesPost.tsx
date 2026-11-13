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

const PATH = "/blog/openclaw-alternatives";

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

const OpenClawAlternativesPost = () => {
  const table = [
    ["Hermes Agent", "Nous Research", "MIT", "~262k", "A personal agent that writes its own skills", "Telegram, Discord, Slack, WhatsApp, Signal, Email"],
    ["nanobot", "HKUDS", "MIT", "~50k", "A small, readable Python assistant", "Telegram, Discord, Slack, WeChat, Email, Teams, Feishu"],
    ["ZeroClaw", "zeroclaw-labs", "MIT / Apache-2.0", "~33k", "Rust rewrite, light on memory", "30+ incl. Telegram, Discord, Slack, Matrix"],
    ["NanoClaw", "qwibitai", "MIT", "~31k", "Every agent in its own container", "WhatsApp, Telegram, Discord, Slack, Teams, iMessage, Matrix"],
    ["PicoClaw", "Sipeed", "MIT", "~30k", "Go binary for tiny devices", "19+ incl. Telegram, Discord, LINE"],
    ["Letta", "Letta", "Apache-2.0", "~25k", "Agents with long-term memory you can inspect", "Slack, Telegram, Discord"],
    ["Agent Zero", "agent0ai", "MIT", "~20k", "An agent with its own Linux desktop in Docker", "Telegram, WhatsApp, Email integrations"],
    ["IronClaw", "NEAR AI", "Apache-2.0 / MIT", "~13k", "Tools sandboxed in WebAssembly", "Web, REPL, webhooks; Telegram/Slack via WASM channels"],
    ["Moltis", "moltis-org", "MIT", "~3k", "Small Rust assistant", "Telegram, Discord, Slack, WhatsApp, Signal, Teams"],
  ];

  const pick = [
    ["Want the closest swap with a strong security story", "Hermes Agent"],
    ["Want each agent isolated in its own container", "NanoClaw or Agent Zero"],
    ["Run on a Raspberry Pi, old laptop or cheap VPS", "PicoClaw or ZeroClaw"],
    ["Want code small enough to read and audit yourself", "nanobot"],
    ["Care most about the agent remembering you over months", "Letta or Hermes Agent"],
    ["Want untrusted tools locked in a WASM sandbox", "IronClaw"],
    ["Want the agent to drive a real desktop and browser you can watch", "Agent Zero"],
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
                <div className="inline-flex items-center space-x-2 bg-primary rounded-sm px-3 py-1">
                  <Layers className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                9 Best OpenClaw Alternatives (2026): Safer, Lighter Self-Hosted AI Assistants
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                OpenClaw is the most popular open-source personal AI assistant, with around 394,000 GitHub stars and 29
                messaging channels. It is also big, and in 2026 it has had a run of security problems, from a
                one-click-exploitable CVE to hundreds of malicious skills on ClawHub. These are the{" "}
                <strong>OpenClaw alternatives worth running instead</strong>: what each does differently, its license,
                which chat apps it supports, and who it suits.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" />Intermediate</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 10, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />11 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ColumnsHeroDiagram
              gradientId="ocaBg"
              title="OPENCLAW ALTERNATIVES · 2026"
              subtitle="what to run instead, grouped by why people leave OpenClaw"
              columns={[
                { name: "SAFER", tag: "tighter defaults", color: "#7CC4F2", lines: ["Hermes Agent", "NanoClaw (per-agent containers)", "IronClaw (WASM sandbox)", "Agent Zero (Docker desktop)"], best: "if security made you leave" },
                { name: "LIGHTER", tag: "smaller, faster", color: "#C4A6F5", lines: ["nanobot (Python)", "ZeroClaw (Rust)", "PicoClaw (Go)", "Moltis (Rust)"], best: "if size and setup made you leave" },
                { name: "SMARTER", tag: "memory and learning", color: "#FFB454", lines: ["Hermes Agent (writes skills)", "Letta (long-term memory)", "Agent Zero (projects)", "all MIT or Apache"], best: "if you want it to improve" },
              ]}
              footer="all free and self-hosted · bring your own model · you pay only for tokens"
              ariaLabel="OpenClaw alternatives in 2026, grouped by why people leave OpenClaw. Safer options with tighter defaults: Hermes Agent, NanoClaw with per-agent containers, IronClaw with a WebAssembly sandbox, and Agent Zero with a Docker desktop. Lighter options that are smaller and faster: nanobot in Python, ZeroClaw in Rust, PicoClaw in Go and Moltis in Rust. Options focused on memory and learning: Hermes Agent, which writes its own skills, Letta with long-term memory, and Agent Zero with projects. All are free, self-hosted and MIT or Apache licensed, and you pay only for model tokens."
              source="aiengineerinsights.com · from each project's GitHub and docs, Nov 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR — Best OpenClaw alternatives:</strong> <strong>Hermes Agent</strong> (Nous Research, MIT) is
                the closest full replacement, with messaging gateways and stricter security defaults.{" "}
                <strong>NanoClaw</strong> runs every agent in its own container. <strong>nanobot</strong>,{" "}
                <strong>ZeroClaw</strong> and <strong>PicoClaw</strong> are much smaller rewrites in Python, Rust and Go for
                cheap servers and small devices. <strong>IronClaw</strong> sandboxes tools in WebAssembly,{" "}
                <strong>Letta</strong> focuses on long-term memory, and <strong>Agent Zero</strong> gives the agent its own
                Linux desktop in Docker. All are free, open source and self-hosted.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="why-leave">1. Why Are People Looking for OpenClaw Alternatives?</H2>
                <P>
                  OpenClaw (formerly Clawdbot and Moltbot) is an MIT-licensed assistant that runs as a gateway on your
                  machine or a server and connects one AI agent to WhatsApp, Telegram, Discord, Slack, iMessage, Signal and
                  more. It is actively maintained, with a release on November 8, 2026, and it is now run by a US non-profit
                  foundation. The reasons people switch are mostly about risk and weight, not features:
                </P>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Security incidents.</strong> CVE-2026-25253 (CVSS 8.8, fixed in v2026.1.29) let a crafted link make the Control UI connect to an attacker's gateway. OpenClaw's own security page reports 1,799 advisory reports since January 2026, 39 with a CVE and 14 confirmed critical, all fixed.</li>
                  <li>• <strong>Malicious skills.</strong> Koi Security found 341 malicious skills out of 2,857 on ClawHub, most from one campaign that installed a macOS info-stealer, and Snyk found critical issues in 13.4% of the 3,984 skills it scanned. OpenClaw's security scope excludes third-party ClawHub skills.</li>
                  <li>• <strong>Size and setup.</strong> A large TypeScript codebase with many dependencies is a lot to audit and to run on a small VPS or a Raspberry Pi.</li>
                </ul>
                <P>
                  If you only need to make OpenClaw safer, not replace it, start with our{" "}
                  <Link to="/blog/ai-agent-security-prompt-injection" className="text-primary hover:underline">AI agent prompt-injection guide</Link>{" "}
                  and{" "}
                  <Link to="/blog/ai-agent-sandboxing" className="text-primary hover:underline">agent sandboxing guide</Link>.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="table">2. OpenClaw Alternatives Compared</H2>
                <DataTable head={["Alternative", "By", "License", "GitHub stars", "What's different", "Chat channels"]} rows={table} />
                <p className="text-muted-foreground text-xs sm:text-sm italic mb-4">
                  Star counts are approximate, from each repository in November 2026.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="alternatives">3. The Best OpenClaw Alternatives, One by One</H2>

                <H3 id="hermes-agent">1. Hermes Agent: the closest full replacement</H3>
                <P>
                  Hermes Agent from Nous Research is the most popular alternative (around 262,000 stars, MIT). It covers
                  the same ground as OpenClaw, with messaging gateways for Telegram, Discord, Slack, WhatsApp, Signal and
                  email, but it is built around an agent that writes reusable skills from completed work. It also ships
                  stricter defaults: dangerous-command approval, sandboxed execution backends and credential filtering. Our{" "}
                  <Link to="/blog/hermes-agent-vs-openclaw" className="text-primary hover:underline">Hermes Agent vs OpenClaw comparison</Link>{" "}
                  goes deeper, and the{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">install guide</Link>{" "}
                  gets you running.
                </P>

                <H3 id="nanoclaw">2. NanoClaw: every agent in its own container</H3>
                <P>
                  NanoClaw (MIT, around 31,000 stars) was built as a small, auditable answer to OpenClaw's size. Each agent
                  runs inside its own container, so a misbehaving agent can't reach the rest of your system. It connects to
                  WhatsApp, Telegram, Discord, Slack, Teams, iMessage, Matrix and Google Chat, with Gmail via skills.
                </P>

                <H3 id="nanobot">3. nanobot: small enough to read</H3>
                <P>
                  nanobot from the University of Hong Kong's HKUDS lab (MIT, around 50,000 stars) is an ultra-light Python
                  assistant. Its pitch is a codebase you can actually read in an afternoon. It supports Telegram, Discord,
                  Slack, WeChat, email, Teams and Feishu, and it is actively maintained (v0.4.0 shipped October 28, 2026).
                </P>

                <H3 id="zeroclaw">4. ZeroClaw: a Rust rewrite</H3>
                <P>
                  ZeroClaw (MIT or Apache-2.0, around 33,000 stars) reimplements the OpenClaw idea in Rust, aiming for low
                  memory use and a single fast binary. It has the widest channel list here after OpenClaw itself, with 30+
                  channels including Telegram, Discord, Slack and Matrix.
                </P>

                <H3 id="picoclaw">5. PicoClaw: for tiny devices</H3>
                <P>
                  PicoClaw from Sipeed (MIT, around 30,000 stars) is written in Go and targets small, cheap hardware. It
                  supports 19+ channels including Telegram, Discord and LINE. Its last release was in May 2026, so check
                  recent commits before relying on it.
                </P>

                <H3 id="letta">6. Letta: memory first</H3>
                <P>
                  Letta (Apache-2.0, around 25,000 stars) grew out of the MemGPT research project and is built for agents
                  that remember over long periods, with memory you can inspect and edit. It is more of an agent platform
                  than a drop-in chat assistant, but it connects to Slack, Telegram and Discord.
                </P>

                <H3 id="agent-zero">7. Agent Zero: an agent with its own computer</H3>
                <P>
                  Agent Zero (MIT, around 20,000 stars) takes a different route: the agent works inside its own Linux
                  desktop in Docker, with a browser and office apps, which you watch from a web UI. It has Telegram,
                  WhatsApp and email integrations. See{" "}
                  <Link to="/blog/agent-zero-vs-hermes-agent" className="text-primary hover:underline">Agent Zero vs Hermes Agent vs OpenClaw</Link>.
                </P>

                <H3 id="ironclaw">8. IronClaw: tools in a WebAssembly sandbox</H3>
                <P>
                  IronClaw from NEAR AI (Apache-2.0 or MIT, around 13,000 stars) runs tools and channels as WebAssembly
                  modules, so each one only gets the access you grant it. It offers a web UI, a REPL and webhooks, with
                  Telegram and Slack as WASM channels.
                </P>

                <H3 id="moltis">9. Moltis: a small Rust assistant</H3>
                <P>
                  Moltis (MIT, around 3,000 stars) is the newest and smallest project here, a Rust assistant with Telegram,
                  Discord, Slack, WhatsApp, Signal and Teams support. Promising, but with a much smaller community, so
                  expect rougher edges.
                </P>
              </section>

              <NewsletterSignup
                heading="Get one practical AI agents email a week"
                subtext="New agent releases tested, security incidents explained, and whether it's worth switching. One email a week."
              />

              <section className="mb-6 sm:mb-8">
                <H2 id="which-to-pick">4. Which OpenClaw Alternative Should You Pick?</H2>
                <DataTable head={["If you…", "Lean toward"]} rows={pick} />
                <P>
                  Whatever you pick, the same rules apply: keep the gateway off the public internet, give it the fewest
                  credentials it needs, and treat community skills like any third-party code. Looking at Hermes-style
                  agents too? Our{" "}
                  <Link to="/blog/hermes-agent-alternatives" className="text-primary hover:underline">Hermes Agent alternatives</Link>{" "}
                  roundup and{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source agent frameworks guide</Link>{" "}
                  cover the wider field.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="hosted">5. What About Hosted Alternatives?</H2>
                <P>
                  If you don't want to run a server at all, the trade-off flips: you give up self-hosting for less
                  maintenance. Anthropic's Claude Cowork, bundled with paid Claude plans, handles multi-step tasks on your
                  desktop without a gateway to secure. For coding work specifically, a coding agent such as Claude Code is
                  usually a better fit than a chat assistant; see our{" "}
                  <Link to="/blog/best-ai-coding-agents" className="text-primary hover:underline">best AI coding agents roundup</Link>.
                </P>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">6. Frequently Asked Questions</H2>

                <H3 id="faq-best">What is the best OpenClaw alternative?</H3>
                <P>
                  For most people it is Hermes Agent from Nous Research: it is MIT-licensed, supports the main messaging
                  apps and ships stricter security defaults. If you want maximum isolation, NanoClaw runs each agent in its
                  own container; if you want something tiny, nanobot, ZeroClaw or PicoClaw.
                </P>

                <H3 id="faq-safe">Is OpenClaw safe to use?</H3>
                <P>
                  It can be, if you keep it updated and harden it, but it has had serious issues in 2026, including
                  CVE-2026-25253 (CVSS 8.8, fixed in v2026.1.29) and hundreds of malicious skills found on ClawHub. Keep the
                  gateway off the public internet, vet every skill, and give it only the credentials it needs.
                </P>

                <H3 id="faq-lightweight">What is a lightweight alternative to OpenClaw?</H3>
                <P>
                  nanobot (Python), ZeroClaw (Rust), PicoClaw (Go) and Moltis (Rust) are all much smaller than OpenClaw.
                  ZeroClaw has the widest channel support of the four, nanobot is the easiest to read, and PicoClaw targets
                  tiny devices.
                </P>

                <H3 id="faq-hermes">Is Hermes Agent better than OpenClaw?</H3>
                <P>
                  It depends on what you need. OpenClaw has the most messaging channels and the biggest skill marketplace.
                  Hermes Agent has stricter security defaults and an agent that writes its own reusable skills from the work
                  it completes. Both are free and MIT-licensed.
                </P>

                <H3 id="faq-free">Are OpenClaw alternatives free?</H3>
                <P>
                  Yes. Every alternative in this list is open source and free to self-host under MIT or Apache-2.0. You pay
                  only for the model usage behind your API keys, or nothing extra if you run local models.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">7. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href="https://github.com/openclaw/openclaw">OpenClaw — GitHub</A> · <A href="https://openclaw.ai/security">OpenClaw security page</A></li>
                  <li>• <A href="https://github.com/openclaw/openclaw/security/advisories/GHSA-g8p2-7wf7-98mq">OpenClaw advisory GHSA-g8p2-7wf7-98mq (CVE-2026-25253)</A></li>
                  <li>• <A href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html">The Hacker News — 341 malicious ClawHub skills</A> · <A href="https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/">Snyk — ToxicSkills</A></li>
                  <li>• <A href="https://github.com/NousResearch/hermes-agent">Hermes Agent</A> · <A href="https://github.com/qwibitai/nanoclaw">NanoClaw</A> · <A href="https://github.com/HKUDS/nanobot">nanobot</A></li>
                  <li>• <A href="https://github.com/zeroclaw-labs/zeroclaw">ZeroClaw</A> · <A href="https://github.com/sipeed/picoclaw">PicoClaw</A> · <A href="https://github.com/nearai/ironclaw">IronClaw</A> · <A href="https://github.com/moltis-org/moltis">Moltis</A></li>
                  <li>• <A href="https://github.com/letta-ai/letta">Letta</A> · <A href="https://github.com/agent0ai/agent-zero">Agent Zero</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Checked against each project's repository on November 10, 2026. These projects move fast; check recent
                  releases and security advisories before you deploy.
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

export default OpenClawAlternativesPost;
