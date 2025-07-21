import { CheckCircle, ArrowRight, Code, Brain, Database, Settings, Users, Target, FileDown, BookOpen, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const resourceLinks = [
  // Foundation
  [
    { text: "Python Docs", url: "https://docs.python.org/3/tutorial/" },
    { text: "Real Python", url: "https://realpython.com/" },
    { text: "3Blue1Brown (Math)", url: "https://www.3blue1brown.com/" },
    { text: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
    { text: "Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" }
  ],
  // Core AI
  [
    { text: "Coursera ML (Andrew Ng)", url: "https://www.coursera.org/learn/machine-learning" },
    { text: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
    { text: "fast.ai Course", url: "https://course.fast.ai/" },
    { text: "PyTorch Docs", url: "https://pytorch.org/tutorials/" },
    { text: "Papers with Code", url: "https://paperswithcode.com/" }
  ],
  // Engineering
  [
    { text: "Google MLOps Guide", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning" },
    { text: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/" },
    { text: "Docker Curriculum", url: "https://docker-curriculum.com/" },
    { text: "AWS ML University", url: "https://aws.amazon.com/training/learning-paths/machine-learning/" }
  ],
  // Data
  [
    { text: "Data Engineering Zoomcamp", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp" },
    { text: "GCP Data Engineer Path", url: "https://cloud.google.com/certification/data-engineer" },
    { text: "dbt Docs", url: "https://docs.getdbt.com/docs/introduction" }
  ],
  // Specialization
  [
    { text: "Hugging Face Transformers", url: "https://huggingface.co/course/chapter1" },
    { text: "OpenAI Cookbook", url: "https://platform.openai.com/docs/overview" },
    { text: "Stanford CS231n", url: "https://cs231n.stanford.edu/" },
    { text: "MIT OpenCourseWare Robotics", url: "https://ocw.mit.edu/courses/6-141-robotic-science-and-systems-i-fall-2020/" }
  ],
  // Leadership
  [
    { text: "Wharton Communication Course", url: "https://www.coursera.org/learn/wharton-communication" },
    { text: "Google Guide to Engineering Mgmt", url: "https://rework.withgoogle.com/" },
    { text: "AI Ethics (DeepLearning.AI)", url: "https://learn.deeplearning.ai/ai-ethics" }
  ]
];

const roadmapSteps = [
  {
    phase: "Foundation",
    title: "Programming & Math Fundamentals",
    description: "Build the core skills every AI engineer needs.",
    items: [
      "Python proficiency & software engineering best practices",
      "Statistics, linear algebra, and calculus fundamentals",
      "Data structures, algorithms, and system design basics",
      "Version control (Git) and collaborative development"
    ],
    icon: Code,
    color: "text-primary"
  },
  {
    phase: "Core AI",
    title: "Machine Learning & Deep Learning",
    description: "Master the theoretical and practical aspects of AI.",
    items: [
      "ML algorithms, model selection, and evaluation metrics",
      "Neural networks, deep learning frameworks (PyTorch/TensorFlow)",
      "Computer vision, NLP, and other domain applications",
      "Model training, validation, and hyperparameter tuning"
    ],
    icon: Brain,
    color: "text-accent"
  },
  {
    phase: "Engineering",
    title: "MLOps & Production Systems",
    description: "Learn to deploy and maintain AI systems at scale.",
    items: [
      "Model versioning, experiment tracking, and reproducibility",
      "CI/CD pipelines for ML, automated testing, and monitoring",
      "Cloud platforms (AWS/GCP/Azure) and containerization",
      "Model serving, API design, and performance optimization"
    ],
    icon: Settings,
    color: "text-primary-glow"
  },
  {
    phase: "Data",
    title: "Data Engineering & Infrastructure",
    description: "Handle the data backbone of AI applications.",
    items: [
      "Data pipelines, ETL processes, and data quality",
      "Database design, data warehousing, and streaming systems",
      "Feature engineering, data preprocessing, and validation",
      "Privacy, security, and compliance considerations"
    ],
    icon: Database,
    color: "text-purple-400"
  },
  {
    phase: "Specialization",
    title: "Choose Your Focus Area",
    description: "Develop expertise in specific AI domains.",
    items: [
      "LLMs & conversational AI (prompt engineering, fine-tuning)",
      "Computer vision (object detection, image generation)",
      "Robotics & autonomous systems integration",
      "AI product management and business applications"
    ],
    icon: Target,
    color: "text-emerald-400"
  },
  {
    phase: "Leadership",
    title: "Team & Communication Skills",
    description: "Lead AI initiatives and collaborate effectively.",
    items: [
      "Technical communication and stakeholder management",
      "Code review, mentoring, and knowledge sharing",
      "Project planning, risk assessment, and timeline management",
      "Ethics, bias detection, and responsible AI practices"
    ],
    icon: Users,
    color: "text-orange-400"
  }
];

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your AI Engineering <span className="bg-gradient-hero bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive, step-by-step guide to building expertise in AI engineering,
            from fundamentals to specialized mastery. Download the full roadmap as PDF or join the discussion community.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild variant="outline">
              <a href="/downloads/ai-roadmap.pdf" target="_blank" rel="noopener noreferrer">
                <FileDown className="mr-2 h-5 w-5" />Download PDF
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://discord.gg/ai-learn" target="_blank" rel="noopener noreferrer">
                <UsersRound className="mr-2 h-5 w-5" />Join AI Discord
              </a>
            </Button>
          </div>
        </div>

        <nav className="mb-12 flex flex-wrap gap-2 justify-center">
          {roadmapSteps.map((step, idx) => (
            <a 
              key={step.phase} 
              href={`#phase-${idx + 1}`} 
              className="text-sm px-3 py-1 rounded bg-muted/30 hover:bg-muted transition-colors"
            >
              {step.phase}
            </a>
          ))}
        </nav>

        <div className="max-w-6xl mx-auto space-y-8">
          {roadmapSteps.map((step, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300" 
              id={`phase-${index + 1}`}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Left side - Icon and Phase */}
                  <div className="flex items-center space-x-4 md:w-1/4">
                    <div className="bg-muted/50 rounded-full p-3">
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium">
                        Phase {index + 1}
                      </div>
                      <div className="text-xs bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                        {step.phase.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Content */}
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Resource Links */}
                    <div className="border-t border-border/30 pt-4">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">Top Resources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {resourceLinks[index].map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-muted/30 rounded-md hover:bg-muted transition-colors text-sm"
                          >
                            <BookOpen className="h-3 w-3" />
                            {resource.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-accent rounded-lg p-8 border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Get detailed guidance, practical exercises, and curated resources for each phase of your AI engineering career.
            </p>
            <Button variant="hero" size="lg" className="group">
              Get the Complete Roadmap
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
