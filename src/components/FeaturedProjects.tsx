import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "AI Notes by swyx",
      description: "Comprehensive notes for software engineers on new AI developments, covering text generation, chat, search, prompts, and more.",
      url: "https://github.com/swyxio/ai-notes",
      stars: "2.1k",
      forks: "180",
      topics: ["AI Development", "LLMs", "Infrastructure"],
      highlight: "Essential reading for staying current with AI trends"
    },
    {
      title: "Awesome AI Engineering",
      description: "Curated list of resources covering practical tools, LLM platforms, development optimization, and infrastructure for AI engineers.",
      url: "https://github.com/boxabirds/awesome-ai-engineering", 
      stars: "800+",
      forks: "95",
      topics: ["Tools", "Platforms", "Best Practices"],
      highlight: "Comprehensive toolkit for AI engineering"
    },
    {
      title: "AI Engineering Reads",
      description: "Essential reading material for building AI applications, including evaluation, architectures, business considerations, and engineering practices.",
      url: "https://github.com/aipengineer/awesome-ai-engineering-reads",
      stars: "500+", 
      forks: "60",
      topics: ["Learning", "Architecture", "Evaluation"],
      highlight: "Curated learning resources for practitioners"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Inspiring repositories and projects that showcase the best of AI engineering practices and resources.
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
                  <Button variant="ghost" size="sm" className="group/btn">
                    <Github className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explore More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            Explore All Projects
            <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;