import { CheckCircle, ArrowRight, Code, Brain, Database, Settings, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const RoadmapSection = () => {
  const roadmapSteps = [
    {
      phase: "Foundation",
      title: "Programming & Math Fundamentals", 
      description: "Build the core skills every AI engineer needs",
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
      description: "Master the theoretical and practical aspects of AI",
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
      description: "Learn to deploy and maintain AI systems at scale",
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
      description: "Handle the data backbone of AI applications",
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
      description: "Develop expertise in specific AI domains",
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
      description: "Lead AI initiatives and collaborate effectively", 
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

  return (
    <section id="roadmap" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your AI Engineering <span className="bg-gradient-hero bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive, step-by-step guide to building expertise in AI engineering, 
            from fundamentals to specialized mastery.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {roadmapSteps.map((step, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
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
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
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