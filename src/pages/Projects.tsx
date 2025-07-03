
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Projects = () => {
  const projects = [
    {
      title: "Production LLM Deployment Pipeline",
      description: "End-to-end pipeline for deploying and scaling LLMs in production with monitoring and A/B testing.",
      tags: ["LLM", "MLOps", "Docker", "Kubernetes", "Monitoring"],
      status: "Complete",
      githubUrl: "#",
      demoUrl: "#",
      keyLearnings: ["Model serving optimization", "Traffic splitting", "Performance monitoring"],
      category: "MLOps"
    },
    {
      title: "AI-Powered Code Review Assistant",
      description: "Tool that analyzes code changes and provides intelligent suggestions using fine-tuned language models.",
      tags: ["NLP", "Code Analysis", "Fine-tuning", "API Development"],
      status: "In Progress", 
      githubUrl: "#",
      keyLearnings: ["Fine-tuning for domain-specific tasks", "Code understanding models", "Developer workflow integration"],
      category: "NLP"
    },
    {
      title: "Real-time ML Model Monitoring Dashboard",
      description: "Comprehensive monitoring solution for ML models in production with drift detection and alerting.",
      tags: ["Monitoring", "Data Drift", "React", "Python", "PostgreSQL"],
      status: "Complete",
      githubUrl: "#",
      demoUrl: "#",
      keyLearnings: ["Data drift detection algorithms", "Real-time metrics collection", "Alert system design"],
      category: "MLOps"
    },
    {
      title: "Multi-modal RAG System for Technical Documentation",
      description: "RAG system that can understand and answer questions about code, diagrams, and text documentation.",
      tags: ["RAG", "Multi-modal", "Vector DB", "FastAPI", "LangChain"],
      status: "Complete",
      githubUrl: "#",
      keyLearnings: ["Multi-modal embeddings", "Document parsing", "Context retrieval optimization"],
      category: "LLM"
    },
    {
      title: "Automated ML Pipeline for Time Series Forecasting",
      description: "Automated pipeline that handles data ingestion, feature engineering, model training, and deployment for time series.",
      tags: ["Time Series", "AutoML", "Apache Airflow", "MLflow", "AWS"],
      status: "In Progress",
      githubUrl: "#",
      keyLearnings: ["Time series feature engineering", "Model selection automation", "Pipeline orchestration"],
      category: "MLOps"
    }
  ];

  const repositories = [
    {
      name: "swyxio/ai-notes",
      description: "Notes for software engineers on new AI developments, text generation, chat, search, prompts, AI infrastructure, audio, codegen, image gen, agentic AI.",
      stars: "5.2k",
      url: "https://github.com/swyxio/ai-notes",
      tags: ["Notes", "AI Developments", "Engineering"]
    },
    {
      name: "boxabirds/awesome-ai-engineering", 
      description: "List of resources for AI engineers covering practical tools & techniques, LLM platforms/APIs, LLM development/optimization, infrastructure, GPUs, data curation.",
      stars: "2.1k",
      url: "https://github.com/boxabirds/awesome-ai-engineering",
      tags: ["Resources", "Tools", "LLM", "Infrastructure"]
    },
    {
      name: "aipengineer/awesome-ai-engineering-reads",
      description: "Essential reading material for building AI applications, including LLM building/deployment, evaluation, applications, architectures, business, data, embeddings.",
      stars: "1.8k", 
      url: "https://github.com/aipengineer/awesome-ai-engineering-reads",
      tags: ["Reading", "LLM", "Architecture", "Best Practices"]
    },
    {
      name: "dave-nachman/awesome-ai-engineering",
      description: "Curated list of learning resources and tools including frameworks, libraries, LLM APIs, open models, observability/evals, app building, inference, fine-tuning.",
      stars: "892",
      url: "https://github.com/dave-nachman/awesome-ai-engineering", 
      tags: ["Learning", "Tools", "Frameworks", "APIs"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Projects & Repositories
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Real-world AI engineering projects and valuable repositories to accelerate your learning
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600">
              End-to-end projects with detailed walkthroughs and lessons learned
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <Badge 
                      variant="outline" 
                      className={`${project.status === 'Complete' ? 'text-green-600 border-green-600' : 'text-orange-600 border-orange-600'}`}
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {project.title}
                  </CardTitle>
                  <CardDescription>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Key Learnings</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {project.keyLearnings.map((learning, learningIndex) => (
                          <li key={learningIndex} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {learning}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl}>View Code</a>
                      </Button>
                      {project.demoUrl && (
                        <Button size="sm" asChild>
                          <a href={project.demoUrl}>Live Demo</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Valuable Repositories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Valuable Repositories for AI Engineers</h2>
            <p className="text-lg text-slate-600">
              Curated collection of essential repositories for AI engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {repositories.map((repo, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-slate-900">
                      {repo.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-slate-500">
                      <span className="text-yellow-500 mr-1">★</span>
                      {repo.stars}
                    </div>
                  </div>
                  <CardDescription>
                    {repo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {repo.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        View Repository
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-900">Want to Contribute?</CardTitle>
              <CardDescription className="text-lg">
                Share your projects or suggest valuable repositories
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6">
                Have an interesting AI engineering project or know of a valuable repository that should be featured? 
                We'd love to showcase it to the community.
              </p>
              <Button asChild>
                <a href="/contact">Submit a Project</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Projects;
