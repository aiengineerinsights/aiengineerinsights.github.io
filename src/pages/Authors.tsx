
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profilePic from '@/assets/vishnu_lanka.jpg';

const Authors = () => {
  const authors = [
    {
      id: "vishnu-lanka",
      name: "Vishnu Lanka",
      role: "AI Engineer & Technical Writer",
      avatar: profilePic,
      bio: "Passionate AI engineer with extensive experience in machine learning, deep learning, and MLOps. Focuses on building production-ready AI systems and sharing knowledge through technical writing.",
      expertise: ["Machine Learning", "Deep Learning", "MLOps", "Python", "TensorFlow", "PyTorch"],
      experience: "5+ years",
      location: "San Francisco, CA",
      email: "aiengineerinsights@gmail.com",
      github: "https://github.com/aiengineerinsights",
      linkedin: "https://linkedin.com/in/vishnu-lanka",
      website: "https://aiengineerinsights.com",
      achievements: [
        "Published 50+ technical articles on AI engineering",
        "Contributor to multiple open-source ML projects",
        "Speaker at AI/ML conferences",
        "Mentored 100+ aspiring AI engineers"
      ],
      currentFocus: "Multi-agent systems and LLM deployment strategies"
    },
    {
      id: "gurram-poorna-prudhvi",
      name: "Gurram Poorna Prudhvi",
      role: "Lead AI Engineer & Local AI Specialist",
      avatar: null, // No profile picture provided
      bio: "Lead AI engineer specializing in local AI deployment and optimization. Expert in Mac Silicon architectures, Ollama, and building privacy-first AI solutions that rival cloud services.",
      expertise: ["Local AI", "Mac Silicon", "Ollama", "Model Optimization", "Edge AI", "Privacy-First AI"],
      experience: "6+ years",
      location: "Seattle, WA",
      email: "aiengineerinsights@gmail.com",
      github: "https://github.com/aiengineerinsights",
      linkedin: "https://linkedin.com/in/gurram-poorna-prudhvi",
      website: "https://aiengineerinsights.com",
      achievements: [
        "Pioneer in Mac Silicon AI optimization techniques",
        "Created enterprise-grade local AI stacks for 20+ companies",
        "Expert in unified memory architecture utilization",
        "Reduced AI infrastructure costs by 80% for clients"
      ],
      currentFocus: "Next-generation local AI architectures and Mac Silicon optimization"
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
                Meet Our <span className="bg-gradient-hero bg-clip-text text-transparent">Authors</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate AI engineers and technical writers behind AIEngineerInsights, sharing their expertise and insights from the trenches.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {authors.map((author) => (
                <Card key={author.id} className="mb-8 overflow-hidden bg-gradient-card border-border">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                      <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                        {author.avatar ? (
                          <AvatarImage src={author.avatar} alt={author.name} />
                        ) : null}
                        <AvatarFallback className="text-2xl">{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-2">{author.name}</h2>
                        <p className="text-xl text-primary mb-3">{author.role}</p>
                        <p className="text-muted-foreground mb-4">{author.bio}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                          {author.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(`mailto:${author.email}`, '_blank')}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(author.github, '_blank')}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(author.linkedin, '_blank')}
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(author.website, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Website
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Professional Details</h3>
                        <div className="space-y-2 text-sm">
                          <div><strong>Experience:</strong> {author.experience}</div>
                          <div><strong>Location:</strong> {author.location}</div>
                          <div><strong>Current Focus:</strong> {author.currentFocus}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Key Achievements</h3>
                        <ul className="space-y-2 text-sm">
                          {author.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Authors;
