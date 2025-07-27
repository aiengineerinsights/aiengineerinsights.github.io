import { Heart, Users, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="bg-gradient-hero bg-clip-text text-transparent">This Journey</span>
          </h2>
          
          <div className="text-lg text-muted-foreground leading-relaxed mb-12 space-y-6">
            <p>
              Welcome to a space where AI engineering becomes clearer, more approachable, and deeply practical. 
              This isn't just another tech blog—it's your companion on the winding path of AI engineering mastery.
            </p>
            
            <p>
              Having navigated the transition from traditional software engineering to the fascinating world of AI, 
              I understand the challenges of keeping up with rapidly evolving technologies, unclear role definitions, 
              and the gap between theoretical knowledge and real-world application.
            </p>
            
            <p>
              Here, you'll find honest discussions about what's working now, practical roadmaps that actually make sense, 
              and insights from the trenches of building AI systems that matter.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-card rounded-lg p-6 border border-border">
              <Heart className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-3">Personal Touch</h3>
              <p className="text-muted-foreground">
                Real experiences, honest reflections, and practical wisdom from an engineer's perspective
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border">
              <Users className="h-8 w-8 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-3">Community Focused</h3>
              <p className="text-muted-foreground">
                Building a supportive network where AI engineers can learn, share, and grow together
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border">
              <Lightbulb className="h-8 w-8 text-primary-glow mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-3">Practical Insights</h3>
              <p className="text-muted-foreground">
                Actionable advice, real projects, and curated resources that actually move the needle
              </p>
            </div>
          </div>

          <div className="bg-gradient-accent rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground mb-6">
              Whether you're just starting your AI journey or you're a seasoned practitioner, 
              I'd love to hear from you. Share your experiences, ask questions, or just say hello.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => window.location.href = 'mailto:aiengineeringinsights@gmail.com'}
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
