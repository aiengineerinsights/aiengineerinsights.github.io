import { ArrowLeft, Clock, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";
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

      <main className="container mx-auto px-4 py-20">
        <div className="flex gap-8">
          <TableOfContents />
          <div className="flex-1 max-w-4xl">
            {/* Back Button */}
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-glow rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Agentic AI</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                What Makes LLMs Agentic?
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Exploring the key capabilities of tool calling, reasoning, and advanced coding that makes LLMs agentic in nature.
              </p>

              {/* Author Info */}
              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center space-x-4">
                  <img
                    src={profilePic}
                    alt="Vishnu Vardhan Sai Lanka"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-lg hover-underline">Vishnu Vardhan Sai Lanka</h3>
                    </Link>
                    <p className="text-muted-foreground">AI Engineer</p>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      August 26, 2025
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Intro (original) */}
            <section className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                There is great interest in agentic LLMs, large language models that act as agents. Recent LLM launches lean hard on agentic claims, like Mistral AI&apos;s Agentic LLMs for software development (
                <RefLink href="https://mistral.ai/news/codestral/">Mistral AI</RefLink>
                ) and OpenAI&apos;s Designed for agentic tasks (
                <RefLink href="https://openai.com/open-models/">OpenAI Open Models</RefLink>
                ). So, what actually makes an LLM agentic? In short, Agentic LLMs are LLMs that act, reason, and interact. In practice, it is the ability to <strong>use tools</strong>, <strong>plan (CoT)</strong>, and <strong>write code</strong>. This post attempts to unpack the agentic LLMs.
              </p>
              <p className="text-sm mt-3 text-muted-foreground">
                For a broad survey, see{" "}
                <RefLink href="https://arxiv.org/abs/2503.23037">Agentic Large Language Models, a survey</RefLink>
                .
              </p>
            </section>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none text-justify">
              {/* Overview image */}
              <div className="mb-8">
                <img
                  src={coverPic}
                  alt="Agentic LLMs Illustration"
                  className="w-full rounded-xl shadow-md object-cover"
                />
              </div>

              {/* Standalone vs Agentic */}
              <section className="mb-10">
                <h2 id="standalone-vs-agentic" className="text-2xl font-bold mb-4">Standalone and Agentic LLMs</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A standalone model answers once and stops. An agentic system runs a loop that thinks, decides, acts, observes, and revises. This enables multistep goals, tool use, memory, and collaboration. For methods see{" "}
                  <RefLink href="https://arxiv.org/abs/2210.03629">ReAct</RefLink>
                  ,{" "}
                  <RefLink href="https://arxiv.org/abs/2303.11366">Reflexion</RefLink>
                  , and{" "}
                  <RefLink href="https://arxiv.org/abs/2305.10601">Tree of Thoughts</RefLink>
                  .
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/40">
                      <tr>
                        <th className="p-3">Dimension</th>
                        <th className="p-3">Standalone LLM</th>
                        <th className="p-3">Agentic LLM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Control loop</td>
                        <td className="p-3">Single forward pass from prompt to response</td>
                        <td className="p-3">Plan then act then observe then revise</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Actions and tools</td>
                        <td className="p-3">Text only</td>
                        <td className="p-3">
                          Structured tool calls, code execution, browsing, and file IO, see{" "}
                          <RefLink href="https://arxiv.org/pdf/2302.04761">Toolformer</RefLink>{" "}
                          and{" "}
                          <RefLink href="https://platform.openai.com/docs/guides/function-calling">Function Calling</RefLink>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Memory and state</td>
                        <td className="p-3">Context window only</td>
                        <td className="p-3">
                          Episodic logs and long term memory with retrieval and reflection, see{" "}
                          <RefLink href="https://arxiv.org/abs/2304.03442">Generative Agents</RefLink>{" "}
                          and{" "}
                          <RefLink href="https://arxiv.org/abs/2310.08560">MemGPT</RefLink>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Planning</td>
                        <td className="p-3">Inline next token prediction</td>
                        <td className="p-3">
                          Search over thoughts and retrieval augmented planning, see{" "}
                          <RefLink href="https://arxiv.org/abs/2402.03610">RAP</RefLink>{" "}
                          and{" "}
                          <RefLink href="https://arxiv.org/abs/2501.08603">MCTS AHD</RefLink>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Evaluation</td>
                        <td className="p-3">Static question answering</td>
                        <td className="p-3">
                          Interactive benchmarks for web, operating systems, and software engineering, see{" "}
                          <RefLink href="https://arxiv.org/abs/2310.06770">SWE bench</RefLink>{" "}
                          and{" "}
                          <RefLink href="https://arxiv.org/abs/2307.13854">WebArena</RefLink>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Example */}
              <section className="mb-10">
                <h2 id="example-walkthrough" className="text-2xl font-bold mb-4">A Simple Task, Two Ways</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Example query to an LLM: Fix the failing tests in this open source repository, write a minimal patch, and open a pull request with a clear summary.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-border p-4">
                    <h3 id="example-standalone" className="font-semibold mb-2">Standalone model</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Reads the prompt and returns a text suggestion</li>
                      <li>Cannot run tests or edit files</li>
                      <li>Relies on the user to copy edits and verify the result</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <h3 id="example-agentic" className="font-semibold mb-2">Agentic system</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Plans steps and picks tools</li>
                      <li>Runs tests, reads error traces, edits files, and reruns tests</li>
                      <li>Writes the patch summary and opens the pull request</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Memory and State */}
              <section className="mb-10">
                <h2 id="memory" className="text-2xl font-bold mb-4">Memory and State</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Agentic LLMs benefit from memory beyond the current context. A useful pattern is a two tier design. Keep a small set of core memories in context and a larger store outside the model. Retrieve by similarity, recency, and importance. See{" "}
                  <RefLink href="https://arxiv.org/abs/2310.08560">MemGPT</RefLink>{" "}
                  and the production framework{" "}
                  <RefLink href="https://github.com/letta-ai/letta">Letta</RefLink>
                  .
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
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
              <section className="mb-10">
                <h2 id="evaluation" className="text-2xl font-bold mb-4">How to Evaluate Agentic LLMs</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Prefer execution based tasks over static questions. Measure success, safety, and efficiency.
                </p>
                <div className="rounded-xl border border-border p-4">
                  <h3 id="benchmarks" className="font-semibold mb-2">Benchmarks that matter</h3>
                  <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
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
              <section className="mb-8">
                <h2 id="tool-calling" className="text-2xl font-bold mb-4">Tool Calling</h2>

                <p className="text-muted-foreground leading-relaxed">
                  When ChatGPT browses the web to answer a question, that is tool calling in action. The model outputs a{" "}
                  <code>&lt;tool_calling&gt;</code> marker, or a function call object, the runtime pauses, runs a web search, returns the results into context, and the model continues the answer.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  This pattern became popular with{" "}
                  <RefLink href="https://arxiv.org/pdf/2302.04761">Toolformer</RefLink>
                  , which showed how to teach models when to call a tool and how to fill arguments, rather than calling everything all the time.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  In agentic systems, tool calls are how LLMs act. The system invokes APIs, runs code, queries a database, or reads and writes files, then observes the outcome and takes the next step. That turns a one shot reply into a simple loop, plan then act then observe then revise.
                </p>

                <h3 id="tool-calling-how-to-train" className="text-xl font-semibold mt-6 mb-2">How to train</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Supervised finetuning and RL with human or AI feedback shape both the decision to call and the argument schema. Datasets include structured function calling pairs, for example{" "}
                  <RefLink href="https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k/">
                    xlam function calling 60k
                  </RefLink>
                  .
                </p>
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4">
                  <code>{toolCallingExample}</code>
                </pre>

                <div className="mt-6">
                  <h3 id="tool-calling-practical-notes" className="text-xl font-semibold mb-2">Practical notes</h3>
                  <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
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
              <section className="mb-8">
                <h2 id="planning" className="text-2xl font-bold mb-4">Planning</h2>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Another important agentic characteristic is to make goal driven autonomous decisions without the user giving a step by step guide. This is unlocked with chain of thought reasoning. Thinking out loud in a multistep way gives the model context about what to do next, which is exactly what a plan is.
                </p>
                <h3 id="planning-how-to-train" className="text-xl font-semibold mt-6 mb-2">How to train</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Reinforcement learning can reward both the outcome and the reasoning process. See{" "}
                  <RefLink href="https://arxiv.org/pdf/2412.14135">Chain of Thought as Policy</RefLink>
                  .
                </p>
                <div className="mb-8">
                  <img
                    src={cotPic}
                    alt=""
                    className="w-full rounded-xl shadow-md object-cover"
                  />
                  <p className="text-center text-muted-foreground text-sm italic mt-2">
                    Outcome reward and process reward
                  </p>
                </div>

                <div className="mt-6">
                  <h3 id="planning-patterns" className="text-xl font-semibold mb-2">Patterns that work in practice</h3>
                  <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
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
              <section className="mb-8">
                <h2 id="coding-abilities" className="text-2xl font-bold mb-4">Coding Abilities</h2>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Most applications today automate software workflows, so coding skill matters. For how labs train models to excel at coding see{" "}
                  <RefLink href="https://arxiv.org/pdf/2409.12186">StarCoder 3</RefLink>
                  . This involves changes at every stage.
                </p>
                <h3 id="coding-tokenization" className="text-xl font-semibold mt-6 mb-2">Tokenization</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Special tokens support code tasks. For example, <code>&lt;|endoftext|&gt;</code> marks the end of a sequence. <code>&lt;|fim_prefix|&gt;</code>, <code>&lt;|fim_middle|&gt;</code>, and <code>&lt;|fim_suffix|&gt;</code> enable Fill in the Middle. <code>&lt;|fim_pad|&gt;</code> is for padding. <code>&lt;|repo_name|&gt;</code> identifies repositories, and <code>&lt;|file_sep|&gt;</code> separates files for repository level learning.
                </p>
                <h3 id="coding-pretraining" className="text-xl font-semibold mt-6 mb-2">Pretraining</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mix general language data with code specific data. Use public repositories, pull requests, commits, notebooks, and Kaggle sets. Balance code, math, and text for a coding oriented base model.
                </p>
                <h4 className="text-lg font-semibold mt-4 mb-2">File level pretraining</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Learn from single files.
                </p>
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4">
                  <code>{fileLevelPretrainingExample}</code>
                </pre>
                <h4 className="text-lg font-semibold mt-4 mb-2">Repository level pretraining</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Extend context across many files and learn project structure.
                </p>
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4">
                  <code>{repoLevelPretrainingExample}</code>
                </pre>
                <h3 id="coding-instruction-finetuning" className="text-xl font-semibold mt-6 mb-2">Instruction finetuning</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stage one uses many diverse but lower quality instructions. Stage two adds filtered high quality data with rejection sampling and supervised finetuning.
                </p>
                <h3 id="coding-rl-exec-feedback" className="text-xl font-semibold mt-6 mb-2">RL with execution feedback</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For algorithmic tasks, run tests for correctness in Python, Java, and other languages. For complex snippets, use LLM as a judge.
                </p>

                <div className="mt-6">
                  <h3 id="coding-agentic-in-practice" className="text-xl font-semibold mb-2">Agentic coding in practice</h3>
                  <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
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
              <section className="mb-10">
                <h2 id="safety-governance" className="text-2xl font-bold mb-4">Safety and Governance</h2>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
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

              {/* Conclusion */}
              <section>
                <h2 id="conclusion" className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  So in conclusion, for an LLM to be agentic, it needs to be good at coding, and good at knowing when, plan, and how, tool usage, to call code for execution.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgenticLLMsBlogPost;
