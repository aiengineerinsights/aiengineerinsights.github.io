import { ArrowLeft, Clock, User, Calendar, Boxes, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import HermesModelsHeroDiagram from "@/components/HermesModelsHeroDiagram";

const HermesModelsPost = () => {
  const criteriaData = [
    {
      criterion: "Context window (≥64k)",
      why: "Hard requirement — Hermes needs at least 64,000 tokens or your first messages will error out",
      pick: "Any model advertising 64k+ context; more headroom helps long sessions",
    },
    {
      criterion: "Tool / function calling",
      why: "Hermes is an agent — it lives or dies on reliable tool and function calls",
      pick: "A model with strong, well-tested tool-calling support",
    },
    {
      criterion: "Cost per token",
      why: "Cost is model-driven; compounding conversation history inflates spend over a session",
      pick: "A cheaper model for routine work; reserve premium models for hard tasks",
    },
    {
      criterion: "Hosted API vs. your endpoint",
      why: "Decides who runs inference — a managed gateway or infrastructure you control",
      pick: "Nous Portal for hosted convenience; your own key/endpoint for control",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />

          {/* Main Content */}
          <div className="flex-1 w-full max-w-none lg:max-w-4xl">
            {/* Back Button */}
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 sm:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Insights</span>
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Boxes className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Which LLM Should You Run With Hermes Agent? Models, Providers, and Nous Portal
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Short answer: Hermes Agent is model-agnostic, so model choice is <strong>configuration, not lock-in</strong>.
                Run <code className="text-sm">hermes model</code> to point it at Nous Portal, OpenRouter, OpenAI, Anthropic,
                or any compatible endpoint. Pick a model with at least a <strong>64,000-token context window</strong> and
                strong tool-calling. New to it? <code className="text-sm">hermes setup --portal</code> bundles a model plus
                four tools and is the easiest start. Everything else is criteria and trade-offs, below.
              </p>

              {/* Author Info */}
              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
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
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 10, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      7 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Hero Diagram */}
            <HermesModelsHeroDiagram />

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="the-answer" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. The Short Answer: Model Choice Is Configuration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Hermes Agent doesn't ship its own mandatory model — it is <strong>model-agnostic</strong>. Which LLM you run
                  is a setting you can change any time, not a decision you're locked into. You point the agent at a provider,
                  it uses that model until you switch. That means the "right" model is whichever one clears two bars —
                  a <strong>64k-token minimum context window</strong> and dependable tool-calling — at a cost you're comfortable
                  with. If you just want to get moving, run <code>hermes setup --portal</code>; if you already have an API key,
                  run <code>hermes model</code> and paste it. For the bigger picture of what Hermes is, see our{" "}
                  <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">guide to Hermes Agent by Nous Research</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="supported-providers" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. What Models Does Hermes Support?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Effectively any capable LLM, because Hermes talks to providers, not a single model. The supported endpoints are:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Nous Portal</strong> — Nous Research's hosted gateway to 300+ models. One subscription, many models.</li>
                  <li>• <strong>OpenRouter</strong> — a single API key that fans out to many providers and models.</li>
                  <li>• <strong>OpenAI</strong> — bring your own OpenAI API key.</li>
                  <li>• <strong>Anthropic</strong> — bring your own Anthropic API key.</li>
                  <li>• <strong>Any compatible endpoint</strong> — point Hermes at your own OpenAI-compatible URL (self-hosted or otherwise).</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Because the model is decoupled from the agent, you can start on one provider and migrate later without
                  rebuilding anything — the skills, memory, and config in <code>~/.hermes/</code> stay put.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="change-the-model" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. How Do I Change the Model?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There are two commands you'll actually use. Run <code>hermes model</code> to choose (or switch) the provider
                  and model and paste an API key. For beginners, <code>hermes setup --portal</code> is the smoothest on-ramp:
                  it bundles a model together with four Tool Gateway tools — web search, image generation, text-to-speech, and
                  a browser — so the agent is useful out of the box.
                </p>
                <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div>hermes model            # choose / switch provider + model, paste key</div>
                  <div>hermes setup --portal   # easiest start: model + 4 Tool Gateway tools</div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Your API keys are written to <code>~/.hermes/.env</code> and the rest of your settings to{" "}
                  <code>~/.hermes/config.yaml</code>. Haven't installed Hermes yet? Start with our{" "}
                  <Link to="/blog/how-to-install-hermes-agent" className="text-primary hover:underline">step-by-step Hermes Agent install guide</Link>{" "}
                  and come back to pick a model.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="minimum-context" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. What's the Minimum Context Window?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>64,000 tokens.</strong> This is the one hard rule. Pick a model below that and your first messages
                  will error out — Hermes needs the headroom for its system prompt, tool definitions, and working memory before
                  you've even said anything substantial. So the very first filter on any candidate model is simple: does it
                  advertise at least a 64k context window? If not, skip it. More context is generally better for long,
                  tool-heavy sessions, but 64k is the floor you cannot go under.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-choose" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. How to Choose a Model: The Criteria Table</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There's no single "best" model — there's the best fit for your task and budget. Work down these four
                  criteria in order; the first one is a gate, the rest are trade-offs:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Criterion</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why it matters</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">What to pick</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {criteriaData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.criterion}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.why}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.pick}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="nous-portal-vs-byo" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Nous Portal vs. Bringing Your Own Key</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Nous Portal</strong> is Nous Research's hosted gateway to 300+ models. It has subscription tiers —
                  <strong> Free, Plus, Super, and Ultra</strong> — that bundle monthly credits, so you get access to a lot of
                  models without wiring up individual provider accounts. It's the path of least resistance, and pairs naturally
                  with <code>hermes setup --portal</code>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you'd rather <strong>bring your own API keys</strong> (OpenAI, Anthropic, OpenRouter, or a compatible
                  endpoint), you self-host and pay only for your own inference — nothing on top. That's the better fit when you
                  already have provider accounts, want direct control over which exact model runs, or need to keep inference on
                  infrastructure you manage.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="cost" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Keeping Cost Under Control</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A useful mental model: <strong>cost is model-driven, not agent-driven</strong>. Hermes itself is free and
                  open source — what you pay for is inference, and that's set by the model you chose. The subtle part is that
                  conversation history <strong>compounds</strong>: every turn, the agent re-sends prior context, so a long
                  session quietly inflates token spend even if each message looks small.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two general levers help. First, run a <strong>cheaper model</strong> for routine work and reserve pricier
                  ones for genuinely hard tasks. Second, use <strong>history compaction</strong> to trim the context the agent
                  carries forward. Both attack the same thing — the number of tokens flowing through the model — which is where
                  the money goes.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="recommendation" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. A Simple Way to Decide</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <strong>Just starting out?</strong> Run <code>hermes setup --portal</code>. You get a working model plus web search, image generation, TTS, and a browser without touching any provider dashboards.</li>
                  <li>• <strong>Already have an API key?</strong> Run <code>hermes model</code>, pick your provider, paste the key, and confirm the model clears 64k context.</li>
                  <li>• <strong>Cost-sensitive or high-volume?</strong> Default to a cheaper model, turn on history compaction, and only reach for a premium model when a task actually needs it.</li>
                  <li>• <strong>Need control over inference?</strong> Bring your own endpoint and self-host — you pay only for your own inference.</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Frequently Asked Questions</h2>

                <h3 id="faq-best-model" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">What's the best model for Hermes Agent?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There isn't one universal best — Hermes is model-agnostic, so the best model is the one that fits your task
                  and budget. Filter for a 64k+ context window and strong tool-calling first, then balance cost. Beginners can
                  let <code>hermes setup --portal</code> pick a sensible default.
                </p>

                <h3 id="faq-switch" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I switch models later?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes. Because model choice is configuration, run <code>hermes model</code> any time to switch providers or
                  models. Your skills, memory, and settings in <code>~/.hermes/</code> are unaffected.
                </p>

                <h3 id="faq-local" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Can I use my own local or self-hosted model?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Yes — point Hermes at any compatible endpoint with <code>hermes model</code>. As long as it exposes an
                  OpenAI-compatible API and meets the 64k-token context minimum, Hermes can drive it, and you pay only for your
                  own inference.
                </p>

                <h3 id="faq-portal-cost" className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Do I have to pay for Nous Portal?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Nous Portal has a Free tier alongside paid Plus, Super, and Ultra tiers that bundle monthly credits. If you'd
                  rather not use Portal at all, bring your own API keys and pay only your own provider for inference.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">10. Sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hermes Agent — official documentation</a></li>
                  <li>• <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hermes-agent on GitHub</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/hermes-agent-models" />
      <Footer />
    </div>
  );
};

export default HermesModelsPost;
