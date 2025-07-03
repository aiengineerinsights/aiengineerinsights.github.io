
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

const RoleRoadmap = () => {
  const roadmapSteps = [
    {
      phase: "Foundation",
      duration: "2-4 months",
      skills: ["Python", "Git/Version Control", "Linux/Command Line", "Statistics & Probability", "Data Structures & Algorithms"],
      description: "Building the essential technical foundation"
    },
    {
      phase: "AI/ML Fundamentals",
      duration: "3-6 months", 
      skills: ["Machine Learning Basics", "Neural Networks", "PyTorch/TensorFlow", "Data Preprocessing", "Model Evaluation"],
      description: "Core AI/ML concepts and frameworks"
    },
    {
      phase: "AI Engineering Core",
      duration: "4-8 months",
      skills: ["MLOps", "Model Deployment", "API Development", "Docker/Containers", "Cloud Platforms (AWS/GCP/Azure)"],
      description: "Production-ready AI system development"
    },
    {
      phase: "Specialization",
      duration: "6+ months",
      skills: ["LLM Engineering", "Computer Vision", "NLP", "Recommender Systems", "AI Infrastructure"],
      description: "Choose your specialized track"
    }
  ];

  const tools = [
    { category: "Languages", items: ["Python", "SQL", "JavaScript/TypeScript", "Go/Rust (optional)"] },
    { category: "ML Frameworks", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face"] },
    { category: "MLOps", items: ["MLflow", "Weights & Biases", "DVC", "Kubeflow", "Airflow"] },
    { category: "Cloud", items: ["AWS SageMaker", "Google AI Platform", "Azure ML", "Vertex AI"] },
    { category: "Infrastructure", items: ["Docker", "Kubernetes", "Terraform", "NGINX", "Redis"] },
    { category: "Monitoring", items: ["Prometheus", "Grafana", "DataDog", "New Relic"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            AI Engineer Role & Roadmap
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Demystifying the AI Engineer role and providing a clear, actionable roadmap for your journey
          </p>
        </div>

        {/* Role Definition */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">What is an AI Engineer?</CardTitle>
              <CardDescription>Understanding the role and its unique value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Core Responsibilities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">System Design & Architecture</h4>
                    <p className="text-sm text-slate-600">Design scalable AI systems that integrate seamlessly into existing infrastructure</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">Model Deployment & Operations</h4>
                    <p className="text-sm text-slate-600">Take models from research to production with proper monitoring and maintenance</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">Data Pipeline Engineering</h4>
                    <p className="text-sm text-slate-600">Build robust data processing pipelines for training and inference</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">Performance Optimization</h4>
                    <p className="text-sm text-slate-600">Optimize models and systems for latency, throughput, and cost efficiency</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">How AI Engineers Differ From...</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">vs ML Engineers</div>
                    <p className="text-slate-700 text-sm">More focus on production systems and less on research/experimentation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">vs Data Scientists</div>
                    <p className="text-slate-700 text-sm">More engineering-focused, less statistical analysis and business insights</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">vs Software Engineers</div>
                    <p className="text-slate-700 text-sm">Specialized in AI/ML systems, model lifecycle, and domain-specific challenges</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Roadmap */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your AI Engineering Journey</h2>
            <p className="text-lg text-slate-600">A step-by-step roadmap with realistic timelines</p>
          </div>

          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      Phase {index + 1}
                    </Badge>
                    <span className="text-sm text-slate-500">{step.duration}</span>
                  </div>
                  <CardTitle className="text-xl">{step.phase}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {step.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-slate-100 text-slate-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tools & Technologies You'll Encounter</h2>
            <p className="text-lg text-slate-600">The essential toolkit for modern AI engineering</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((toolCategory, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">{toolCategory.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {toolCategory.items.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-slate-700 text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-900">Ready to Start Your Journey?</CardTitle>
              <CardDescription className="text-lg">
                Take the next step with practical projects and detailed guides
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Explore Projects
                </a>
                <a href="/resources" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors">
                  View Learning Resources
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default RoleRoadmap;
