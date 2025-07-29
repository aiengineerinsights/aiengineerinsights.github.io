
import { ArrowRight, Sparkles, Target, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-accent rounded-full px-4 py-2 mb-8 border border-border">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Your Companion on the AI Engineering Journey</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              AI Engineer
            </span>
            <br />
            <span className="text-foreground">Insights</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Providing clarity, practical roadmaps, real-world projects, and curated resources 
            for individuals navigating their AI engineering career journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="lg" className="group" onClick={scrollToAbout}>
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/resources">
              <Button variant="outline" size="lg">
                Explore Resources
              </Button>
            </Link>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-card rounded-lg p-6 border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <Target className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Role Clarity</h3>
              <p className="text-muted-foreground">
                Demystify what AI engineers actually do and how you fit into the ecosystem
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <Map className="h-8 w-8 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Practical Roadmaps</h3>
              <p className="text-muted-foreground">
                Step-by-step guidance from fundamentals to specializations
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-8 w-8 text-primary-glow mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Real Projects</h3>
              <p className="text-muted-foreground">
                Hands-on projects from actual AI engineering work and implementations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
