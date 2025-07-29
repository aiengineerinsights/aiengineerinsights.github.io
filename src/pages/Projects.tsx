
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "PyTorch",
      description: "Open source machine learning framework that accelerates the path from research prototyping to production deployment.",
      url: "https://github.com/pytorch/pytorch",
      stars: "82k",
      forks: "22k",
      topics: ["Deep Learning", "Neural Networks", "Research"],
      highlight: "Most popular research-focused ML framework"
    },
    {
      title: "vLLM",
      description: "High-throughput and memory-efficient inference and serving engine for Large Language Models (LLMs).",
      url: "https://github.com/vllm-project/vllm", 
      stars: "28k",
      forks: "4.1k",
      topics: ["LLMs", "Inference", "Performance"],
      highlight: "Fastest LLM inference engine available"
    },
    {
      title: "AutoGen",
      description: "Framework that enables development of LLM applications using multiple agents that can converse with each other.",
      url: "https://github.com/microsoft/autogen",
      stars: "31k",
      forks: "4.5k",
      topics: ["Multi-Agent", "LLMs", "Automation"],
      highlight: "Leading multi-agent conversation framework"
    },
    {
      title: "LangGraph",
      description: "Library for building stateful, multi-actor applications with LLMs, used to create agent and multi-agent workflows.",
      url: "https://github.com/langchain-ai/langgraph",
      stars: "6.2k",
      forks: "950",
      topics: ["Agents", "Workflows", "State Management"],
      highlight: "Build complex LLM-powered applications"
    },
    {
      title: "Transformers",
      description: "State-of-the-art machine learning for PyTorch, TensorFlow, and JAX with thousands of pretrained models.",
      url: "https://github.com/huggingface/transformers",
      stars: "133k",
      forks: "26k",
      topics: ["Transformers", "Pre-trained Models", "NLP"],
      highlight: "Most comprehensive transformer model library"
    },
    {
      title: "LangChain",
      description: "Framework for developing applications powered by large language models with memory, context, and tool usage.",
      url: "https://github.com/langchain-ai/langchain",
      stars: "93k",
      forks: "15k",
      topics: ["LLM Apps", "Chains", "Tools"],
      highlight: "Popular framework for LLM application development"
    },
    {
      title: "Ollama",
      description: "Get up and running with large language models locally. Run Llama 2, Mistral, and other models with ease.",
      url: "https://github.com/ollama/ollama",
      stars: "98k",
      forks: "7.8k",
      topics: ["Local LLMs", "Inference", "CLI"],
      highlight: "Simplest way to run LLMs locally"
    },
    {
      title: "CrewAI",
      description: "Framework for orchestrating role-playing, autonomous AI agents. Foster collaborative intelligence.",
      url: "https://github.com/crewAIInc/crewAI",
      stars: "19k",
      forks: "2.6k",
      topics: ["Multi-Agent", "Orchestration", "AI Crews"],
      highlight: "Revolutionary approach to AI agent collaboration"
    },
    {
      title: "Unstructured",
      description: "Open source libraries and APIs to build custom preprocessing pipelines for labeling, training, or production.",
      url: "https://github.com/Unstructured-IO/unstructured",
      stars: "8.5k",
      forks: "700",
      topics: ["Data Processing", "ETL", "Document Processing"],
      highlight: "Essential tool for document data extraction"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Explore <span className="bg-gradient-hero bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Essential open-source libraries and frameworks that power modern AI engineering and development. From deep learning frameworks to agent orchestration tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden h-full flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1">
                        {project.title}
                      </h3>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Highlight */}
                    <div className="bg-gradient-accent rounded-lg p-3 mb-4 border border-border">
                      <p className="text-sm font-medium">{project.highlight}</p>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats and Action */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-4 w-4" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="group/btn"
                        onClick={() => window.open(project.url, '_blank')}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* GitHub Note */}
            <div className="text-center mt-12">
              <div className="bg-gradient-accent rounded-lg p-6 border border-border max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Open Source Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  These projects represent the cutting edge of AI engineering. Star them, contribute, and stay updated with the latest developments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
