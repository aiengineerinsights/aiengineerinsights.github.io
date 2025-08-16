import { ArrowLeft, Clock, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import profilePic from '@/assets/vishnu_lanka.jpg';
import coverPic from '@/assets/agentic_llms_cover.png';
import cotPic from '@/assets/agentic_llms_cot.png';
import { BarChart3 } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";

const AgenticLLMsBlogPost = () => {
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
              Exploring the key capabilities of tool calling, reasoning, and advanced coding, that makes LLMs agentic in nature.
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
                    <h3 className="font-semibold text-lg hover-underline">
                      Vishnu Vardhan Sai Lanka
                    </h3>
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
                    August 18, 2025
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    7 min read
                  </div>
                </div>
              </div>
            </Card>

          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none text-justify">
            <section className="mb-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Recent announcements of LLMs include lines like:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>“Agentic LLMs for software development” <sup>[1]</sup></li>
                <li>“Designed for agentic tasks” <sup>[2]</sup></li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We all know what LLMs are capable of, and what ”agentic” means but what exactly do these Labs do to make agentic LLMs? Couple of things stand out:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>Tool calling</li>
                <li>Reasoning and hence planning in the form of CoT</li>
                <li>Coding: end of the day everything is a piece of code in the world of software and that's where most agentic stuff is happening.</li>
              </ul>
            </section>

            {/* Representative Image */}
            <div className="mb-8">
                <img
                  src={coverPic}
                  alt="A2A Protocol Illustration"
                  className="w-full rounded-xl shadow-md object-cover"
                />

            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Tool Calling</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This is straightforward and hasn't changed much ever since Meta’s Toolformer paper <sup>[3]</sup>. LLMs are trained to emit a <code>&lt;tool_calling&gt;</code> special tag at which point the generation stops and a piece of code is executed to fetch a result which is then augmented to the context of the LLM for further generation.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2">How do labs train for this?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This is accounted for in the SFT and RLHF training to penalise or reward when to emit and when not to emit tool calling tags by looking at the available tools at the disposal and their descriptions along with passing the right set of valid parameters to the function. <sup>[4]</sup>
              </p>
              <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4"><code>{toolCallingExample}</code></pre>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Planning</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Another important agentic characteristic is to make goal driven autonomous decisions without the user giving a step by step guide. This is unlocked with the advent of chain of thought reasoning. Thinking out loud in a multi-step reasoning fashion enabled the models to have larger context on what to do next, which is exactly what a plan is.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2">How do labs do this?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Through RL. CoT training is primarily done during the RL stage where the reward signal not only considers the outcome, but also the reasoning that was generated to get to that outcome. <sup>[5]</sup>
              </p>
              <div className="mb-8">
                <img
                  src={cotPic}
                  alt=""
                  className="w-full rounded-xl shadow-md object-cover"
                />
                <p className="text-center text-muted-foreground text-sm italic mt-2">
                Outcome reward vs Process reward
                </p>

            </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Coding Abilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most of the current applications of LLMs are aimed at automating software workflows, for which LLMs have to be very good at coding. So how do Labs train models to excel at coding? <sup>[6]</sup> This involves changes at all levels of training to adapt LLMs to excel at coding.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2">Tokenization</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                New special tokens specific to coding are included here. These tokens serve specific purposes in the code-processing pipeline. For instance, <code>&lt;|endoftext|&gt;</code> marks the end of a text or sequence, while the <code>&lt;|fim_prefix|&gt;</code>, <code>&lt;|fim_middle|&gt;</code>, and <code>&lt;|fim_suffix|&gt;</code> tokens are used to implement the Fill-in-the-Middle (FIM) technique, where a model predicts the missing parts of a code block. Additionally, <code>&lt;|fim_pad|&gt;</code> is used for padding during FIM operations. Other tokens include <code>&lt;|repo_name|&gt;</code>, which identifies repository names, and <code>&lt;|file_sep|&gt;</code>, used as a file separator to better manage repository-level information. These tokens are essential in helping the model learn from diverse code structures and enable it to handle longer and more complex contexts during both file-level and repo-level pretraining.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2">Pretraining</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Traditionally this involves general language data like the web. But for coding models pretraining also heavily incorporates coding specific data like public repositories from GitHub, Pull Requests, Commits, Jupyter Notebooks, and Kaggle datasets. Balancing Code, Math, and Text data is crucial for building a coding oriented foundational model.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">File-Level Pretraining</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                File-level pretraining focuses on learning from individual code files.
              </p>
              <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4"><code>{fileLevelPretrainingExample}</code></pre>
              <h4 className="text-lg font-semibold mt-4 mb-2">Repo-Level Pretraining</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                After file-level pretraining, then comes the repo-level pretraining, aimed at enhancing the model’s long-context capabilities.
              </p>
              <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto my-4"><code>{repoLevelPretrainingExample}</code></pre>
              <h3 className="text-xl font-semibold mt-6 mb-2">Instruction Finetuning (IF)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The recipe for IF remains the same here. But the data would typically be of the form of an instruction associated with what type of code snippet needs to be generated and in which language. Typically tens of millions of low-quality but diverse instruction samples are considered to fine-tune the base model. In the second stage, millions of high-quality instruction samples are adopted to improve the performance of the instruction model with rejection sampling and supervised fine-tuning.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2">RL with Feedback</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This seems innately scalable for coding tasks. You don't need a Human to provide feedback here; you have code execution engines. For the algorithm-like and self-contained code snippets, one can generate the test cases to check the correctness of the code as the code execution feedback, including Python, Java, and other languages. For other complex code snippets, one can always use LLM-as-a-judge.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                So in conclusion, for an LLM to be agentic, it needs to be good at coding, and good at knowing when (plan) and how (tool usage) to call code for execution.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Citations</h2>
              <ul className="list-none pl-0 space-y-3 text-muted-foreground">
                <li>
                  [1] Mistral AI. (2024). <strong>Codestral: A New Era for Code Generation</strong>. 
                  <a 
                    href="https://mistral.ai/news/codestral/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    Mistral AI Blog
                  </a>.
                </li>
                <li>
                  [2] OpenAI. (2024). <strong>OpenAI Open Models</strong>. 
                  <a 
                    href="https://openai.com/open-models/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    openai.com
                  </a>.
                </li>
                <li>
                  [3] Schick, T., et al. (2023). <strong>Toolformer: Language Models Can Teach Themselves to Use Tools</strong>. 
                  <a 
                    href="https://arxiv.org/pdf/2302.04761"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    arXiv:2302.04761
                  </a>.
                </li>
                <li>
                  [4] Salesforce. (2023). <strong>xlam-function-calling-60k Dataset</strong>. 
                  <a 
                    href="https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    Hugging Face
                  </a>.
                </li>
                <li>
                  [5] Pang, B., et al. (2024). <strong>Chain-of-Thought Reasoning is a Policy</strong>. 
                  <a 
                    href="https://arxiv.org/pdf/2412.14135"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    arXiv:2412.14135
                  </a>.
                </li>
                <li>
                  [6] Li, R., et al. (2024). <strong>StarCoder 3: A 16B Model for Code and Math</strong>. 
                  <a 
                    href="https://arxiv.org/pdf/2409.12186"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors ml-1"
                  >
                    arXiv:2409.12186
                  </a>.
                </li>
              </ul>
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