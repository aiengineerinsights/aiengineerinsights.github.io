
import { ArrowLeft, Clock, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ExploreWithAI from "@/components/ExploreWithAI";
import profilePic from "@/assets/vishnu_lanka.jpg";
import coverPic from "@/assets/agentic_llms_cover.png";
import cotPic from "@/assets/agentic_llms_cot.png";

/** Underlined, high contrast link for dark backgrounds */
const RefLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-4 decoration-2 text-primary hover:opacity-90"
  >
    {children}
  </a>
);

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is agentic AI?",
    a: "Agentic AI is an AI system, usually built around a large language model, that pursues a goal over multiple steps with limited human supervision: it plans, calls tools such as APIs, code execution, search, or file access, observes the results, and decides what to do next. OpenAI's governance paper defines agenticness as the degree to which a system can adaptably achieve complex goals in complex environments with limited direct supervision, so it is a matter of degree, not a yes-or-no label.",
  },
  {
    q: "What is the difference between agentic AI and AI agents?",
    a: "Agentic AI is the property or the category; an AI agent is one system that has it. In Anthropic's terms, agentic systems include both workflows, where LLMs and tools follow predefined code paths, and agents, where the LLM dynamically directs its own process and tool use. So every AI agent is agentic AI, but an agentic workflow with fixed steps is not an agent in that stricter sense.",
  },
  {
    q: "What is the difference between agentic AI and generative AI?",
    a: "Generative AI produces content in response to a prompt: text, code, or images, in one pass, and a human decides what to do with it. Agentic AI uses a generative model as its reasoning engine but adds a loop around it, so the system can act on its output: run the code it wrote, call an API, read the result, and try again until the goal is met.",
  },
  {
    q: "What makes an LLM agentic?",
    a: "Three trained capabilities: reliable tool calling (choosing when to call a tool and filling its arguments correctly), multi-step planning and reasoning (chain of thought shaped by reinforcement learning), and strong coding, because code is the most general action an agent can take. Around the model, an agentic system adds a control loop, memory beyond the context window, and permissions and sandboxes that limit what it can do.",
  },
  {
    q: "What are examples of agentic AI?",
    a: "Coding agents such as Claude Code, Cursor's agent mode, and OpenAI Codex that run tests, edit files, and open pull requests; deep-research assistants that search, read, and write a cited report; computer-use and browser agents that operate websites and desktop apps; and open-source agent runtimes such as Hermes Agent and OpenClaw that run tasks on a schedule with skills and memory.",
  },
  {
    q: "When should you use agentic AI instead of a single LLM call?",
    a: "Only when simpler solutions fall short. Anthropic's guidance is that for many applications, optimizing a single LLM call with retrieval and in-context examples is enough, and that you should add multi-step agentic systems only when they demonstrably improve outcomes. Agents trade latency, cost, and predictability for flexibility, so they fit open-ended tasks where the steps cannot be known in advance.",
  },
];

const AgenticLLMsBlogPost = () => {
  // Original examples (kept as is)
  const toolCallingExample = `
query: Where can I find live giveaways for beta access and games?

answer: [{"name": "live_giveaways_by_type", "arguments": {"type": "beta"}}, {"name": "live_giveaways_by_type", "arguments": {"type": "game"}}]

Tools: [{"name": "live_giveaways_by_type", "description": "Retrieve live giveaways from the GamerPower API based on the specified type.", "parameters": {"type": {"description": "The type of giveaways to retrieve (e.g., game, loot, beta).", "type": "str", "default": "game"}}}]
`;

  const fileLevelPretrainingExample = `
<|fim_prefix|>{code_pre}<|fim_suffix|>{code_suf}<|fim_middle|>{code_mid}<|endoftext|>
`;

  const repoLevelPretrainingExample = `
<|repo_name|>{repo_name}
<|file_sep|>{file_path1}
{file_content1}
<|file_sep|>{file_path2}
{file_content2}
<|file_sep|>{file_path3}
<|fim_prefix|>{code_pre}<|fim_suffix|>{code_suf}<|fim_middle|>{code_fim}<|endoftext|>
`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />
          
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-glow rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Agentic AI</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                What Is Agentic AI? What Makes LLMs Agentic (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                A clear definition of agentic AI, how it differs from AI agents and generative AI, and the capabilities (tool calling, planning, and coding) that make an LLM agentic.
              </p>

              {/* Author Info */}
              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img
                    src={profilePic}
                    alt="Vishnu Vardhan Sai Lanka"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <span className="block font-semibold text-base sm:text-lg hover-underline">Vishnu Vardhan Sai Lanka</span>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      August 26, 2025 · Updated Oct 13, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> Agentic AI is an AI system, usually built on a large language model, that works
                toward a goal over several steps with limited human supervision: it plans, calls tools (APIs, code
                execution, search, files), observes the results, and decides what to do next. Generative AI produces an
                answer; agentic AI acts on it. An LLM becomes agentic through three trained capabilities, reliable tool
                calling, multi-step planning, and strong coding, wrapped in a loop with memory and permissions. Use it
                only when a single well-prompted LLM call is not enough.
              </p>
            </div>

            <ExploreWithAI path="/blog/what-makes-llms-agentic" variant="strip" />

            {/* Intro */}
            <section className="mb-6 sm:mb-8">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                There is great interest in agentic LLMs, large language models that act as agents. Recent LLM launches lean hard on agentic claims, like Mistral AI&apos;s Agentic LLMs for software development (
                <RefLink href="https://mistral.ai/news/codestral/">Mistral AI</RefLink>
                ) and OpenAI&apos;s Designed for agentic tasks (
                <RefLink href="https://openai.com/open-models/">OpenAI Open Models</RefLink>
                ). So, what actually makes an LLM agentic? In short, Agentic LLMs are LLMs that act, reason, and interact. In practice, it is the ability to <strong>use tools</strong>, <strong>plan (CoT)</strong>, and <strong>write code</strong>. This post attempts to unpack the agentic LLMs.
              </p>
              <p className="text-xs sm:text-sm mt-3 text-muted-foreground">
                For a broad survey, see{" "}
                <RefLink href="https://arxiv.org/abs/2503.23037">Agentic Large Language Models, a survey</RefLink>
                .
              </p>
            </section>

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-justify">
              <section className="mb-8 sm:mb-10">
                <h2 id="what-is-agentic-ai" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is agentic AI?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Agentic AI is an AI system that pursues a goal over multiple steps with limited human
                  supervision, deciding for itself which actions to take along the way.</strong> In practice it is a
                  large language model running in a loop: it plans, calls a tool, reads the result, and plans again
                  until the task is done or it needs to ask a human.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The most careful definition comes from OpenAI's{" "}
                  <RefLink href="https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf">Practices for Governing Agentic AI Systems</RefLink>,
                  which treats agenticness as a matter of degree: "the degree to which a system can adaptably achieve
                  complex goals in complex environments with limited direct supervision." It breaks that into goal
                  complexity, environmental complexity, adaptability, and independent execution. A chatbot scores low on
                  all four; a coding agent that fixes a failing test suite on its own scores high.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Anthropic's{" "}
                  <RefLink href="https://www.anthropic.com/research/building-effective-agents">Building Effective Agents</RefLink>{" "}
                  draws the line engineers use day to day. It calls all of these <em>agentic systems</em>, then splits
                  them in two: "Workflows are systems where LLMs and tools are orchestrated through predefined code
                  paths," while agents "are systems where LLMs dynamically direct their own processes and tool usage,
                  maintaining control over how they accomplish tasks." The more decisions the model makes instead of
                  your code, the more agentic the system is.
                </p>
              </section>

              <section className="mb-8 sm:mb-10">
                <h2 id="agentic-ai-vs-ai-agents" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Agentic AI vs AI agents vs generative AI</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The three terms overlap, and most confusion comes from using them interchangeably:
                </p>
                <div className="overflow-x-auto rounded-xl border border-border -mx-4 sm:mx-0 mb-4">
                  <div className="min-w-full inline-block align-middle">
                    <table className="w-full text-left text-xs sm:text-sm mx-4 sm:mx-0">
                      <thead className="bg-muted/40">
                        <tr>
                          <th className="p-2 sm:p-3 font-medium">Term</th>
                          <th className="p-2 sm:p-3 font-medium">What it means</th>
                          <th className="p-2 sm:p-3 font-medium">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Generative AI</td>
                          <td className="p-2 sm:p-3">A model that produces content from a prompt in one pass; a human decides what to do with it</td>
                          <td className="p-2 sm:p-3">Asking a chatbot to draft a SQL query</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Agentic AI</td>
                          <td className="p-2 sm:p-3">The property, or the category of systems, that act toward a goal with limited supervision; includes fixed workflows and full agents</td>
                          <td className="p-2 sm:p-3">A pipeline that drafts the query, runs it, and fixes errors in a loop</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">AI agent</td>
                          <td className="p-2 sm:p-3">One system where the LLM chooses its own steps and tools at run time</td>
                          <td className="p-2 sm:p-3">A data agent that decides which tables to inspect, which queries to run, and when it is done</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For the anatomy of a single agent (the model, tools, memory, and loop) see our guide to{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents are</Link>.
                  For the frameworks that implement the loop, see{" "}
                  <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source AI agent frameworks compared</Link>,
                  and for the production layer underneath them,{" "}
                  <Link to="/blog/agent-runtimes-explained" className="text-primary hover:underline">agent runtimes explained</Link>.
                  The rest of this post looks one level down: what has to be true of the <em>model</em> for any of this
                  to work.
                </p>
              </section>

              {/* Overview image */}
              <div className="mb-6 sm:mb-8">
                <img
                  src={coverPic}
                  alt="Agentic LLMs Illustration"
                  className="w-full rounded-xl shadow-md object-cover"
                />
              </div>

              {/* Standalone vs Agentic */}
              <section className="mb-8 sm:mb-10">
                <h2 id="standalone-vs-agentic" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Standalone and Agentic LLMs</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A standalone model answers once and stops. An agentic system runs a loop that thinks, decides, acts, observes, and revises. This enables multistep goals, tool use, memory, and collaboration. For methods see{" "}
                  <RefLink href="https://arxiv.org/abs/2210.03629">ReAct</RefLink>
                  ,{" "}
                  <RefLink href="https://arxiv.org/abs/2303.11366">Reflexion</RefLink>
                  , and{" "}
                  <RefLink href="https://arxiv.org/abs/2305.10601">Tree of Thoughts</RefLink>
                  .
                </p>
                <div className="overflow-x-auto rounded-xl border border-border -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <table className="w-full text-left text-xs sm:text-sm mx-4 sm:mx-0">
                      <thead className="bg-muted/40">
                        <tr>
                          <th className="p-2 sm:p-3 font-medium">Dimension</th>
                          <th className="p-2 sm:p-3 font-medium">Standalone LLM</th>
                          <th className="p-2 sm:p-3 font-medium">Agentic LLM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Control loop</td>
                          <td className="p-2 sm:p-3">Single forward pass from prompt to response</td>
                          <td className="p-2 sm:p-3">Plan then act then observe then revise</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Actions and tools</td>
                          <td className="p-2 sm:p-3">Text only</td>
                          <td className="p-2 sm:p-3">
                            Structured tool calls, code execution, browsing, and file IO, see{" "}
                            <RefLink href="https://arxiv.org/pdf/2302.04761">Toolformer</RefLink>{" "}
                            and{" "}
                            <RefLink href="https://platform.openai.com/docs/guides/function-calling">Function Calling</RefLink>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Memory and state</td>
                          <td className="p-2 sm:p-3">Context window only</td>
                          <td className="p-2 sm:p-3">
                            Episodic logs and long term memory with retrieval and reflection, see{" "}
                            <RefLink href="https://arxiv.org/abs/2304.03442">Generative Agents</RefLink>{" "}
                            and{" "}
                            <RefLink href="https://arxiv.org/abs/2310.08560">MemGPT</RefLink>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Planning</td>
                          <td className="p-2 sm:p-3">Inline next token prediction</td>
                          <td className="p-2 sm:p-3">
                            Search over thoughts and retrieval augmented planning, see{" "}
                            <RefLink href="https://arxiv.org/abs/2402.03610">RAP</RefLink>{" "}
                            and{" "}
                            <RefLink href="https://arxiv.org/abs/2501.08603">MCTS AHD</RefLink>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 sm:p-3 font-medium">Evaluation</td>
                          <td className="p-2 sm:p-3">Static question answering</td>
                          <td className="p-2 sm:p-3">
                            Interactive benchmarks for web, operating systems, and software engineering, see{" "}
                            <RefLink href="https://arxiv.org/abs/2310.06770">SWE bench</RefLink>{" "}
                            and{" "}
                            <RefLink href="https://arxiv.org/abs/2307.13854">WebArena</RefLink>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Example */}
              <section className="mb-8 sm:mb-10">
                <h2 id="example-walkthrough" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">A Simple Task, Two Ways</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Example query to an LLM: Fix the failing tests in this open source repository, write a minimal patch, and open a pull request with a clear summary.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="rounded-xl border border-border p-3 sm:p-4">
                    <h3 id="example-standalone" className="font-semibold mb-2 text-sm sm:text-base">Standalone model</h3>
                    <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
                      <li>Reads the prompt and returns a text suggestion</li>
                      <li>Cannot run tests or edit files</li>
                      <li>Relies on the user to copy edits and verify the result</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border p-3 sm:p-4">
                    <h3 id="example-agentic" className="font-semibold mb-2 text-sm sm:text-base">Agentic system</h3>
                    <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
                      <li>Plans steps and picks tools</li>
                      <li>Runs tests, reads error traces, edits files, and reruns tests</li>
                      <li>Writes the patch summary and opens the pull request</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Memory and State */}
              <section className="mb-8 sm:mb-10">
                <h2 id="memory" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Memory and State</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Agentic LLMs benefit from memory beyond the current context. A useful pattern is a two tier design. Keep a small set of core memories in context and a larger store outside the model. Retrieve by similarity, recency, and importance. See{" "}
                  <RefLink href="https://arxiv.org/abs/2310.08560">MemGPT</RefLink>{" "}
                  and the production framework{" "}
                  <RefLink href="https://github.com/letta-ai/letta">Letta</RefLink>
                  .
                </p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                  <li>
                    Episodic memory and reflection. Store observations and actions, then summarize and abstract. See{" "}
                    <RefLink href="https://arxiv.org/abs/2304.03442">Generative Agents</RefLink>
                    .
                  </li>
                  <li>
                    Dynamic organization. Link related memories and let new memories update older ones. See{" "}
                    <RefLink href="https://arxiv.org/abs/2502.12110">A MEM</RefLink>
                    .
                  </li>
                  <li>
                    Practical tips. Separate user profile, project knowledge, and tool history. Age memories that are stale. Log tool inputs and outputs for provenance.
                  </li>
                </ul>
              </section>

              {/* Evaluation of Agentic LLMs */}
              <section className="mb-8 sm:mb-10">
                <h2 id="evaluation" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to Evaluate Agentic LLMs</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Prefer execution based tasks over static questions. Measure success, safety, and efficiency.
                </p>
                <div className="rounded-xl border border-border p-3 sm:p-4">
                  <h3 id="benchmarks" className="font-semibold mb-2 text-sm sm:text-base">Benchmarks that matter</h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                    <li>
                      Software engineering.{" "}
                      <RefLink href="https://openai.com/index/introducing-swe-bench-verified/">
                        SWE bench Verified
                      </RefLink>{" "}
                      shows that careful scaffolds and verification reveal stronger coding ability than earlier setups.
                    </li>
                    <li>
                      Web agents.{" "}
                      <RefLink href="https://arxiv.org/abs/2307.13854">WebArena</RefLink>{" "}
                      and{" "}
                      <RefLink href="https://github.com/web-arena-x/visualwebarena">
                        VisualWebArena
                      </RefLink>{" "}
                      evaluate realistic browsing and visually grounded tasks.
                    </li>
                    <li>
                      Computer use.{" "}
                      <RefLink href="https://arxiv.org/abs/2404.07972">OSWorld</RefLink>{" "}
                      runs tasks across desktop systems and reports a large gap between human and agent success.
                    </li>
                    <li>
                      Safety.{" "}
                      <RefLink href="https://arxiv.org/abs/2412.13178">SafeAgentBench</RefLink>{" "}
                      and{" "}
                      <RefLink href="https://arxiv.org/abs/2412.14470">Agent SafetyBench</RefLink>{" "}
                      test rejection of hazardous requests and safe planning.
                    </li>
                    <li>
                      Browsing. See{" "}
                      <RefLink href="https://arxiv.org/pdf/2504.12516">BrowseComp</RefLink>{" "}
                      for a focused measure of web navigation and retrieval.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Tool Calling */}
              <section className="mb-6 sm:mb-8">
                <h2 id="tool-calling" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Tool Calling</h2>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  When ChatGPT browses the web to answer a question, that is tool calling in action. The model outputs a{" "}
                  <code>&lt;tool_calling&gt;</code> marker, or a function call object, the runtime pauses, runs a web search, returns the results into context, and the model continues the answer.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3 text-sm sm:text-base">
                  This pattern became popular with{" "}
                  <RefLink href="https://arxiv.org/pdf/2302.04761">Toolformer</RefLink>
                  , which showed how to teach models when to call a tool and how to fill arguments, rather than calling everything all the time.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3 text-sm sm:text-base">
                  In agentic systems, tool calls are how LLMs act. The system invokes APIs, runs code, queries a database, or reads and writes files, then observes the outcome and takes the next step. That turns a one shot reply into a simple loop, plan then act then observe then revise.
                </p>

                <h3 id="tool-calling-how-to-train" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">How to train</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Supervised finetuning and RL with human or AI feedback shape both the decision to call and the argument schema. Datasets include structured function calling pairs, for example{" "}
                  <RefLink href="https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k/">
                    xlam function calling 60k
                  </RefLink>
                  .
                </p>
                <div className="bg-muted text-muted-foreground p-3 sm:p-4 rounded-md overflow-x-auto my-3 sm:my-4">
                  <pre className="text-xs sm:text-sm whitespace-pre-wrap break-all sm:break-normal">
                    <code>{toolCallingExample}</code>
                  </pre>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 id="tool-calling-practical-notes" className="text-lg sm:text-xl font-semibold mb-2">Practical notes</h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                    <li>
                      Structured outputs via JSON schema reduce parsing errors, see{" "}
                      <RefLink href="https://platform.openai.com/docs/guides/structured-outputs">
                        Structured Outputs
                      </RefLink>
                      .
                    </li>
                    <li>
                      Parallel tool calls can reduce latency, see{" "}
                      <RefLink href="https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/implement-tool-use">
                        Anthropic Tool Use
                      </RefLink>
                      .
                    </li>
                    <li>
                      Use sandboxes and least privilege scopes for code and browsers, see{" "}
                      <RefLink href="https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf">
                        Governing Agentic AI
                      </RefLink>
                      .
                    </li>
                    <li>
                      Interfaces matter. Agent computer interfaces improve results, see{" "}
                      <RefLink href="https://arxiv.org/pdf/2405.15793">SWE agent</RefLink>
                      .
                    </li>
                    <li>
                      Browsing with citation rewards gives cleaner outputs, see{" "}
                      <RefLink href="https://arxiv.org/abs/2112.09332">WebGPT</RefLink>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* Planning */}
              <section className="mb-6 sm:mb-8">
                <h2 id="planning" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Planning</h2>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Another important agentic characteristic is to make goal driven autonomous decisions without the user giving a step by step guide. This is unlocked with chain of thought reasoning. Thinking out loud in a multistep way gives the model context about what to do next, which is exactly what a plan is.
                </p>
                <h3 id="planning-how-to-train" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">How to train</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Reinforcement learning can reward both the outcome and the reasoning process. See{" "}
                  <RefLink href="https://arxiv.org/pdf/2412.14135">Chain of Thought as Policy</RefLink>
                  .
                </p>
                <div className="mb-6 sm:mb-8">
                  <img
                    src={cotPic}
                    alt=""
                    className="w-full rounded-xl shadow-md object-cover"
                  />
                  <p className="text-center text-muted-foreground text-xs sm:text-sm italic mt-2">
                    Outcome reward and process reward
                  </p>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 id="planning-patterns" className="text-lg sm:text-xl font-semibold mb-2">Patterns that work in practice</h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                    <li>
                      ReAct interleaves reasoning and actions, see{" "}
                      <RefLink href="https://arxiv.org/abs/2210.03629">ReAct</RefLink>
                      .
                    </li>
                    <li>
                      Reflexion uses self reflection across attempts, see{" "}
                      <RefLink href="https://arxiv.org/abs/2303.11366">Reflexion</RefLink>
                      .
                    </li>
                    <li>
                      Tree of Thoughts branches and self evaluates, see{" "}
                      <RefLink href="https://arxiv.org/abs/2305.10601">Tree of Thoughts</RefLink>
                      .
                    </li>
                    <li>
                      Retrieval augmented planning pulls in prior experience, see{" "}
                      <RefLink href="https://arxiv.org/abs/2402.03610">RAP</RefLink>
                      .
                    </li>
                    <li>
                      Search with MCTS gives stronger global optimization, see{" "}
                      <RefLink href="https://arxiv.org/abs/2501.08603">MCTS AHD</RefLink>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* Coding Abilities */}
              <section className="mb-6 sm:mb-8">
                <h2 id="coding-abilities" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Coding Abilities</h2>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most applications today automate software workflows, so coding skill matters. For how labs train models to excel at coding see{" "}
                  <RefLink href="https://arxiv.org/pdf/2409.12186">StarCoder 3</RefLink>
                  . This involves changes at every stage.
                </p>
                <h3 id="coding-tokenization" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Tokenization</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Special tokens support code tasks. For example, <code>&lt;|endoftext|&gt;</code> marks the end of a sequence. <code>&lt;|fim_prefix|&gt;</code>, <code>&lt;|fim_middle|&gt;</code>, and <code>&lt;|fim_suffix|&gt;</code> enable Fill in the Middle. <code>&lt;|fim_pad|&gt;</code> is for padding. <code>&lt;|repo_name|&gt;</code> identifies repositories, and <code>&lt;|file_sep|&gt;</code> separates files for repository level learning.
                </p>
                <h3 id="coding-pretraining" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Pretraining</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Mix general language data with code specific data. Use public repositories, pull requests, commits, notebooks, and Kaggle sets. Balance code, math, and text for a coding oriented base model.
                </p>
                <h4 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-2">File level pretraining</h4>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Learn from single files.
                </p>
                <div className="bg-muted text-muted-foreground p-3 sm:p-4 rounded-md overflow-x-auto my-3 sm:my-4">
                  <pre className="text-xs sm:text-sm whitespace-pre-wrap break-all sm:break-normal">
                    <code>{fileLevelPretrainingExample}</code>
                  </pre>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-2">Repository level pretraining</h4>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Extend context across many files and learn project structure.
                </p>
                <div className="bg-muted text-muted-foreground p-3 sm:p-4 rounded-md overflow-x-auto my-3 sm:my-4">
                  <pre className="text-xs sm:text-sm whitespace-pre-wrap break-all sm:break-normal">
                    <code>{repoLevelPretrainingExample}</code>
                  </pre>
                </div>
                <h3 id="coding-instruction-finetuning" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Instruction finetuning</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Stage one uses many diverse but lower quality instructions. Stage two adds filtered high quality data with rejection sampling and supervised finetuning.
                </p>
                <h3 id="coding-rl-exec-feedback" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">RL with execution feedback</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For algorithmic tasks, run tests for correctness in Python, Java, and other languages. For complex snippets, use LLM as a judge.
                </p>

                <div className="mt-4 sm:mt-6">
                  <h3 id="coding-agentic-in-practice" className="text-lg sm:text-xl font-semibold mb-2">Agentic coding in practice</h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                    <li>
                      SWE bench resolves real issues and requires patches that pass tests, see{" "}
                      <RefLink href="https://arxiv.org/abs/2310.06770">SWE bench</RefLink>
                      .
                    </li>
                    <li>
                      SWE agent gives the model a usable computer interface, see{" "}
                      <RefLink href="https://arxiv.org/pdf/2405.15793">SWE agent</RefLink>
                      .
                    </li>
                    <li>
                      Fill in the Middle improves code infilling and editing, see{" "}
                      <RefLink href="https://arxiv.org/pdf/2207.14255">OpenAI FIM</RefLink>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* Safety and governance */}
              <section className="mb-8 sm:mb-10">
                <h2 id="safety-governance" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Safety and Governance</h2>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                  <li>
                    Use least privilege tools and scopes. Start read only and ask before escalation, see{" "}
                    <RefLink href="https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf">
                      Governing Agentic AI
                    </RefLink>
                    .
                  </li>
                  <li>
                    Sandbox code and browsers. Use network allow lists and secrets isolation, see{" "}
                    <RefLink href="https://docs.anthropic.com/en/docs/claude-code/security">
                      Claude Code Security
                    </RefLink>
                    .
                  </li>
                  <li>
                    Add verifiers before actions and auditors after actions. Keep tool logs with provenance. Structured outputs help, see{" "}
                    <RefLink href="https://platform.openai.com/docs/guides/structured-outputs">
                      Structured Outputs
                    </RefLink>
                    .
                  </li>
                </ul>
              </section>

              <ExploreWithAI path="/blog/what-makes-llms-agentic" variant="questions" />

              <section className="mb-8 sm:mb-10">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
              </section>

              {/* Conclusion */}
              <section>
                <h2 id="conclusion" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base">
                  So in conclusion, for an LLM to be agentic, it needs to be good at coding, and good at knowing when, plan, and how, tool usage, to call code for execution.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/what-makes-llms-agentic" />
      <Footer />
    </div>
  );
};

export default AgenticLLMsBlogPost;
