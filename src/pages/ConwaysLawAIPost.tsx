import { ArrowLeft, Clock, User, Calendar, Network, BarChart3 } from "lucide-react";
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
import { CONWAYS_LAW_AI_CHEAT_SHEET } from "@/config/newsletterBonuses";

const PATH = "/blog/conways-law-ai";

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

const ConwaysLawAIPost = () => {
  const teamTypes = [
    ["Stream-aligned", "A product team that owns one flow of user value end to end", "The AI feature: its prompts, tools, UX, and the test cases that define \"good\" for it"],
    ["Platform", "A group of teams offering internal services other teams use without waiting on them", "The AI gateway, model access and routing, the eval harness, tracing, cost tracking, guardrail enforcement"],
    ["Complicated subsystem", "A team for a part that needs deep specialist knowledge", "Retrieval and ranking at scale, fine-tuning, custom models, speech or vision pipelines"],
    ["Enabling", "Specialists who help other teams learn a skill, then step away", "Prompt and eval practices, agent patterns, AI security reviews: the useful half of an AI center of excellence"],
  ];

  const ownership = [
    ["Model access, keys and routing", "AI platform", "Without one owner, every team signs its own vendor contract and hard-codes one model"],
    ["Prompts and tool definitions", "Product team", "They change with the feature; central ownership turns each prompt edit into a ticket"],
    ["Eval harness (the runner, CI gate, dashboards)", "AI platform", "One harness, so results are comparable across features"],
    ["Eval cases (what \"good\" means)", "Product team", "Only the team that knows the users can write them"],
    ["Retrieval / RAG pipeline", "Product team at first; a specialist team once several products share it", "Splitting too early adds a hand-off; splitting too late gives you five vector stores"],
    ["Guardrail policy", "Security / risk, through an enabling team", "Policy is a governance decision"],
    ["Guardrail enforcement", "AI platform (in the gateway)", "Enforced in one place, it can't be skipped by a team in a hurry"],
    ["Tracing and cost dashboards", "AI platform", "A shared trace format is what lets you debug across teams"],
    ["Fine-tuning and custom models", "Complicated-subsystem team", "Rare, specialist work that most product teams shouldn't carry"],
  ];

  const antiPatterns = [
    ["One central AI team builds every AI feature", "Every feature routes through one shared \"AI service\"; it becomes a queue", "Move features into product teams; keep the central team as a platform offering self-service"],
    ["Every product team builds its own stack", "Five gateways, five vector stores, five eval scripts, no shared traces", "Stand up a thin AI platform team and offer the gateway and eval harness as a service"],
    ["An AI center of excellence that only writes guidelines", "Policy documents that the running system doesn't enforce", "Turn the CoE into an enabling team with a time limit, and put enforcement in the platform"],
    ["Nobody owns evals", "No regression gate; prompt and model changes ship on vibes", "Platform owns the harness, each product team owns its cases, and CI blocks on them"],
    ["Data team and AI team never talk", "RAG over stale exports instead of governed, fresh sources", "Short collaboration period between the two, then a data service the AI teams consume"],
  ];

  const bySize = [
    ["Startup (under ~30 engineers)", "No separate AI team. Product teams build AI features directly on a model API.", "One shared wrapper for model calls and one eval script, owned by whoever wrote it"],
    ["Scale-up (~30–150 engineers)", "Product teams build features; a thin AI platform team (2–4 people) runs the gateway, evals and tracing", "The platform team publishes what it offers, like any internal product"],
    ["Enterprise (150+ engineers)", "Platform grouping, one or more specialist teams for retrieval or models, an enabling team for adoption", "Microsoft calls the common shape \"hub and spoke\": central platform, federated delivery"],
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
                  <Network className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Architecture</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Conway's Law for AI: How Team Topology Shapes Your AI Architecture (+ Cheat Sheet)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Conway's law says a system ends up mirroring the communication structure of the organization that
                builds it. AI systems follow it more closely than most, because every piece (model access, prompts,
                retrieval, evals, guardrails) is owned by someone, and every ownership boundary becomes a seam in the
                architecture. Here's what the law says, how Team Topologies maps onto AI work, the org shapes that
                produce bad AI architecture, and which structure fits your company size.
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
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Nov 11, 2026</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />12 min read</div>
                  </div>
                </div>
              </Card>
            </header>

            <ColumnsHeroDiagram
              gradientId="claBg"
              title="CONWAY'S LAW FOR AI · WHO OWNS WHAT"
              subtitle="your AI architecture copies your team boundaries · Team Topologies mapped to AI systems"
              columns={[
                { name: "PRODUCT TEAMS", tag: "stream-aligned", color: "#7CC4F2", lines: ["AI features + UX", "prompts and tools", "eval cases", "first RAG pipeline"], best: "ship the AI feature" },
                { name: "AI PLATFORM", tag: "platform", color: "#C4A6F5", lines: ["gateway + routing", "eval harness + CI gate", "tracing + cost", "guardrail enforcement"], best: "offered as a service" },
                { name: "SPECIALISTS", tag: "complicated subsystem", color: "#FFB454", lines: ["retrieval at scale", "ranking", "fine-tuning", "custom models"], best: "deep expertise" },
                { name: "ENABLING", tag: "AI CoE done right", color: "#6FD6A8", lines: ["patterns + golden paths", "eval coaching", "AI security reviews", "then steps away"], best: "time-boxed help" },
              ]}
              footer="Inverse Conway: design the teams for the AI architecture you want"
              ariaLabel="Conway's law for AI: who owns what. Product teams, the stream-aligned teams, own AI features and UX, prompts and tools, eval cases and their first RAG pipeline. An AI platform team owns the gateway and model routing, the eval harness and CI gate, tracing and cost tracking, and guardrail enforcement, offered as a service. Specialist complicated-subsystem teams own retrieval at scale, ranking, fine-tuning and custom models. An enabling team, an AI center of excellence done right, provides patterns and golden paths, eval coaching and AI security reviews, then steps away. The inverse Conway maneuver means designing the teams for the AI architecture you want."
              source="aiengineerinsights.com · Team Topologies team types (Skelton & Pais) applied to AI systems, Nov 2026"
            />

            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-primary" aria-label="TL;DR">
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>TL;DR:</strong> <strong>Conway's law</strong> (Melvin Conway, 1968) says organizations design
                systems that copy their own communication structure. In AI systems that means ownership decides the
                architecture: a central AI team produces one bottleneck "AI service", and teams working alone produce
                five gateways and no shared evals. The working pattern from <strong>Team Topologies</strong> is product
                (stream-aligned) teams owning AI features and their eval cases, a <strong>platform team</strong> offering
                the gateway, eval harness and tracing as a service, specialist teams for retrieval or fine-tuning, and an{" "}
                <strong>enabling team</strong> instead of a permanent AI center of excellence. Designing teams to get the
                architecture you want is the <strong>inverse Conway maneuver</strong>.
              </p>
            </div>

            <ExploreWithAI path={PATH} variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <H2 id="what-is-conways-law">1. What Is Conway's Law?</H2>
                <P>
                  Melvin Conway put it in one sentence in his 1968 paper <em>How Do Committees Invent?</em>, published in{" "}
                  <em>Datamation</em> after Harvard Business Review turned it down:
                </P>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4 text-sm sm:text-base">
                  "Any organization that designs a system (defined broadly) will produce a design whose structure is a copy
                  of the organization's communication structure."
                </blockquote>
                <P>
                  Fred Brooks named it "Conway's law" in <em>The Mythical Man-Month</em> (1975). In plain terms: if two
                  teams rarely talk, the parts they build will meet at a narrow, awkward interface. If one team owns two
                  things, those things end up tightly coupled. The org chart leaks into the system.
                </P>
                <P>
                  It's not just folklore. A Harvard Business School study by MacCormack, Rusnak and Baldwin compared
                  matched products built by tightly knit companies and by loosely coupled open-source communities, and
                  found the open-source versions were consistently more modular, as the law predicts. A later review of
                  102 empirical studies by Colfer and Baldwin found the "mirroring" effect supported in 69% of them. And
                  Microsoft Research found that org-structure metrics predicted which Windows Vista binaries would fail
                  better than any code metric they tested: 86.2% precision, against 78.6% for code churn.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="why-ai">2. Why Does Conway's Law Hit AI Systems Harder?</H2>
                <P>
                  A classic web service has a few clear owners. An AI feature has more moving parts, and each one invites a
                  different owner: the model vendor relationship, the gateway that holds the API keys, the prompts and
                  tool definitions, the retrieval pipeline and its data, the evals, the guardrails, and the tracing that
                  shows what an agent actually did. Every handoff between those owners becomes a seam in the system.
                </P>
                <P>
                  Two examples. When a central "AI team" owns all model access, every product team's request routes
                  through one shared service, and that team's backlog becomes the system's throughput limit. When each
                  product team owns everything itself, you get one gateway, one vector store and one eval script per team,
                  none of which share traces, so nobody can debug a request that crosses two of them. Same company, same
                  models, different architecture, purely because of who talks to whom. The same logic applies inside the
                  system too: how you split work between{" "}
                  <Link to="/blog/multi-agent-orchestration-patterns" className="text-primary hover:underline">multiple agents</Link>{" "}
                  tends to mirror how the teams that build them are split.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="team-topologies">3. Team Topologies, Mapped to AI Work</H2>
                <P>
                  <A href="https://teamtopologies.com/key-concepts">Team Topologies</A>, the 2019 book by Matthew Skelton and
                  Manuel Pais (second edition September 2025), turns Conway's law into a design tool. It names four team
                  types and three ways they interact, and its core constraint is cognitive load: a team that owns too much
                  slows down and makes poor decisions. Here are the four types and what each should own in an AI
                  organization:
                </P>
                <DataTable head={["Team type", "What it is", "What it owns in AI work"]} rows={teamTypes} />
                <P>
                  The Team Topologies authors make the same call for generative AI: their own analysis suggests a
                  stream-aligned team is usually the right home for AI features, with enabling teams helping teams over the
                  first hurdles. Patrick Debois argued at PlatformCon 2025 that any serious generative AI effort deserves a
                  dedicated platform team, covering model providers, RAG as a service, a gateway for cost and access
                  control, and tracing.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="who-owns-what">4. Who Should Own Each Part of an AI System?</H2>
                <P>
                  The useful split is by how often something changes and who knows what "good" looks like. Things that
                  change with the feature belong to the product team; things every team needs the same way belong to the
                  platform.
                </P>
                <DataTable head={["Component", "Owner", "Why"]} rows={ownership} />
                <P>
                  The eval split is the one teams get wrong most often. A central team can build an excellent harness but
                  can't write good test cases for a feature it doesn't own; a product team can write great cases but
                  shouldn't each build its own runner. Our{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">RAG evaluation guide</Link>{" "}
                  covers what those cases should measure, and{" "}
                  <Link to="/blog/ai-agent-observability" className="text-primary hover:underline">AI agent observability</Link>{" "}
                  covers the shared tracing layer.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="interaction-modes">5. Which Interaction Mode Fits Which AI Work?</H2>
                <P>Team Topologies defines three ways teams work together. Each fits a different stage of AI work:</P>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Collaboration</strong> (two teams working closely for a set period): the first agent or RAG feature, when the product team and the platform or data team are both still learning what's needed. Put an end date on it.</li>
                    <li>• <strong>X-as-a-Service</strong> (one team provides, others consume with little contact): the steady state for the gateway, the eval harness, tracing and a shared retrieval service. If product teams have to file tickets to use them, it isn't a service yet.</li>
                    <li>• <strong>Facilitating</strong> (one team coaches another): the enabling team teaching prompt design, eval writing or <Link to="/blog/ai-guardrails" className="text-primary hover:underline">guardrail</Link> practices, then moving on to the next team.</li>
                  </ul>
                </div>
                <P>
                  The common failure is getting stuck in collaboration: the AI platform team stays embedded in every
                  product team's work, so it can never become a service and never scales.
                </P>
              </section>

              <NewsletterSignup
                heading="Get the Conway's law for AI cheat sheet"
                subtext="Subscribe and download the one-page cheat sheet: team types, who owns which AI component, warning signs and the setup by company size. Plus one practical AI engineering email a week."
                bonus={CONWAYS_LAW_AI_CHEAT_SHEET}
              />

              <section className="mb-6 sm:mb-8">
                <H2 id="anti-patterns">6. Which Team Structures Produce Bad AI Architecture?</H2>
                <P>Each of these org shapes predictably produces the architecture in the middle column:</P>
                <DataTable head={["Org shape", "Architecture it produces", "Fix"]} rows={antiPatterns} />
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="inverse-conway">7. What Is the Inverse Conway Maneuver?</H2>
                <P>
                  If the org shapes the system, you can shape the system by changing the org first. Martin Fowler
                  describes the{" "}
                  <A href="https://martinfowler.com/bliki/ConwaysLaw.html">inverse Conway maneuver</A> as changing how
                  designers communicate to encourage the architecture you want. Thoughtworks put it on its Technology
                  Radar as a technique to trial in 2014–2015, and the term itself goes back to a 2010 article by Jonny
                  LeRoy and Matt Simons.
                </P>
                <P>
                  For AI, that means deciding the target architecture first (for example, one gateway, a shared eval
                  harness, product-owned prompts) and then creating the teams that would naturally build it: a small
                  platform team with a clear service to offer, and product teams with the skills to own their features.
                  Fowler's caveat applies: reorganizing won't instantly fix a system that already exists, so expect the
                  architecture to follow the new teams over months, not weeks.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="by-size">8. Which AI Team Structure Fits Your Company Size?</H2>
                <DataTable head={["Company size", "Team setup", "Notes"]} rows={bySize} />
                <P>
                  Microsoft's{" "}
                  <A href="https://learn.microsoft.com/en-us/agents/center-of-excellence/operating-models">agent center of excellence guidance</A>{" "}
                  describes the same progression: start centralized, and federate delivery when the central team becomes
                  a source of approval delays and knowledge bottlenecks.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="ai-coe">9. AI Center of Excellence vs AI Platform Team</H2>
                <P>
                  An <strong>AI center of excellence</strong> (CoE) sets standards, governance and training. An{" "}
                  <strong>AI platform team</strong> builds and runs the shared services. In Team Topologies terms, a good
                  CoE is an enabling team and the platform team is a platform team; trouble starts when one group tries to
                  be both, or when a CoE becomes a permanent approval gate.
                </P>
                <P>
                  Microsoft's{" "}
                  <A href="https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/center-of-excellence">Cloud Adoption Framework</A>{" "}
                  recommends folding AI into an existing cloud CoE where one exists, creating a standalone AI team only if
                  current teams can't support adoption, and over time handing AI delivery to platform teams while the CoE
                  becomes advisory. McKinsey's 2025 State of AI survey found the same split in practice: risk, compliance
                  and data governance are the parts companies most often centralize, while AI talent and adoption are
                  usually run as a hybrid. Your <strong>AI operating model</strong> is simply the decision of which of
                  these you centralize and which you federate.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="agents-as-teammates">10. What Changes When AI Agents Join the Team?</H2>
                <P>
                  Coding and task agents add a new kind of team member, and Conway's law applies to them too. OpenAI's
                  guide{" "}
                  <A href="https://cdn.openai.com/business-guides-and-resources/building-an-ai-native-engineering-team.pdf">Building an AI-Native Engineering Team</A>{" "}
                  splits each phase of development into what you delegate to the agent, what you review, and what you
                  keep. Matthew Skelton made a related point at QCon London 2026, per{" "}
                  <A href="https://www.infoq.com/news/2026/03/ai-agency-team-topologies">InfoQ</A>: the main obstacles
                  to using AI agents are usually organizational, and teams need clear boundaries that give agents bounded
                  agency.
                </P>
                <P>
                  In practice, an agent works inside the same boundaries as the team that runs it. Give it a team's
                  repository, tools and{" "}
                  <Link to="/blog/claude-code-skills" className="text-primary hover:underline">skills</Link>, and it
                  produces that team's slice of the architecture. Give it access everywhere, and it will couple things no
                  team agreed to couple. If you're building that harness yourself, see{" "}
                  <Link to="/blog/what-is-an-agent-harness" className="text-primary hover:underline">what an agent harness is</Link>.
                </P>
              </section>

              <ExploreWithAI path={PATH} variant="questions" />

              <section className="mb-6 sm:mb-8">
                <H2 id="faq">11. Frequently Asked Questions</H2>

                <H3 id="faq-what">What is Conway's law in simple terms?</H3>
                <P>
                  Conway's law says the systems an organization builds end up copying how that organization communicates.
                  Teams that rarely talk build parts that connect poorly, and parts owned by one team end up tightly
                  coupled. Melvin Conway stated it in 1968, and Fred Brooks named it in The Mythical Man-Month in 1975.
                </P>

                <H3 id="faq-inverse">What is the inverse Conway maneuver?</H3>
                <P>
                  It means changing your team structure on purpose to get the architecture you want, instead of letting
                  the existing org chart decide it. For AI, that usually means creating a small platform team to own the
                  gateway, eval harness and tracing, and giving product teams ownership of their own AI features.
                </P>

                <H3 id="faq-team-types">What are the four team types in Team Topologies?</H3>
                <P>
                  Stream-aligned teams own a flow of user value, platform teams offer internal services, complicated
                  subsystem teams own parts that need deep specialist knowledge, and enabling teams coach other teams and
                  then step away. They work together through three modes: collaboration, X-as-a-Service and facilitating.
                </P>

                <H3 id="faq-central">Should AI be a central team or embedded in product teams?</H3>
                <P>
                  Both, for different parts. AI features, prompts and eval cases belong in product teams; the shared
                  gateway, eval harness, tracing and guardrail enforcement belong in a platform team that offers them as a
                  service. A central team that builds every AI feature becomes a bottleneck, and fully separate teams end up
                  duplicating the stack.
                </P>

                <H3 id="faq-evals">Who should own AI evals?</H3>
                <P>
                  Split it. The platform team owns the eval harness, the CI gate and the dashboards so results are
                  comparable across features. Each product team owns its own eval cases, because only it knows what a good
                  answer looks like for its users.
                </P>
              </section>

              <section className="mb-6 sm:mb-8">
                <H2 id="sources">12. Sources</H2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <A href="https://www.melconway.com/Home/Conways_Law.html">Melvin Conway — Conway's Law</A></li>
                  <li>• <A href="https://dash.harvard.edu/handle/1/34403525">MacCormack, Rusnak, Baldwin — Exploring the Duality between Product and Organizational Architectures (HBS)</A></li>
                  <li>• <A href="https://econpapers.repec.org/RePEc:hbs:wpaper:10-058">Colfer, Baldwin — The Mirroring Hypothesis: Theory, Evidence and Exceptions (HBS)</A></li>
                  <li>• <A href="https://www.cs.umd.edu/users/basili/publications/proceedings/P125.pdf">Nagappan, Murphy, Basili — The Influence of Organizational Structure on Software Quality (ICSE 2008)</A></li>
                  <li>• <A href="https://martinfowler.com/bliki/ConwaysLaw.html">Martin Fowler — Conway's Law</A> · <A href="https://www.thoughtworks.com/radar/techniques/inverse-conway-maneuver">Thoughtworks Radar — Inverse Conway Maneuver</A></li>
                  <li>• <A href="https://teamtopologies.com/key-concepts">Team Topologies — Key concepts</A> · <A href="https://teamtopologies.com/news-blogs-newsletters/the-second-edition-of-team-topologies-is-now-available">Second edition announcement</A></li>
                  <li>• <A href="https://teamtopologies.com/news-blogs-newsletters/2025/1/28/how-team-topologies-can-transform-generative-ai-integration">Team Topologies — How Team Topologies can transform generative AI integration</A></li>
                  <li>• <A href="https://jedi.be/blog/2025/talk-2025-why-ai-needs-a-platform-team-platformcon/">Patrick Debois — Why AI needs a platform team (PlatformCon 2025)</A></li>
                  <li>• <A href="https://www.infoq.com/news/2026/03/ai-agency-team-topologies">InfoQ — Matthew Skelton on AI agency and Team Topologies (2026)</A></li>
                  <li>• <A href="https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/center-of-excellence">Microsoft — Establish an AI Center of Excellence</A> · <A href="https://learn.microsoft.com/en-us/agents/center-of-excellence/operating-models">Agent CoE operating models</A></li>
                  <li>• <A href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value">McKinsey — The state of AI: How organizations are rewiring to capture value (2025)</A></li>
                  <li>• <A href="https://cdn.openai.com/business-guides-and-resources/building-an-ai-native-engineering-team.pdf">OpenAI — Building an AI-Native Engineering Team</A></li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4 text-xs sm:text-sm italic">
                  Team type names and interaction modes are from Team Topologies by Matthew Skelton and Manuel Pais; the
                  mapping to AI components is our own. Sources checked November 11, 2026.
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

export default ConwaysLawAIPost;
