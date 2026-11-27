import { ArrowRight, Briefcase, Map, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/SiteLink";
import heroBg from "@/assets/hero-bg.jpg";

// Three doors by what the visitor came to do. Each links straight to the guides
// that already get the most search traffic for that goal.
const doors = [
  {
    icon: Map,
    title: "I want to become an AI engineer",
    blurb: "What to learn, in what order, and how to prove it.",
    links: [
      { label: "The 2026 roadmap (free PDF)", to: "/ai-engineering-roadmap" },
      { label: "Skills checklist", to: "/blog/ai-engineer-skills" },
      { label: "How to become an AI engineer", to: "/blog/how-to-become-an-ai-engineer" },
    ],
  },
  {
    icon: Briefcase,
    title: "I have interviews coming up",
    blurb: "The questions by round, the resume, and what to ask for.",
    links: [
      { label: "Interview questions (free PDF)", to: "/blog/ai-engineer-interview-questions" },
      { label: "Resume template and examples", to: "/blog/ai-engineer-resume" },
      { label: "Salary by level, company and city", to: "/blog/ai-engineer-salary" },
    ],
  },
  {
    icon: TerminalSquare,
    title: "I'm building with agents",
    blurb: "Pick the tools, then set them up so they hold up.",
    links: [
      { label: "Best AI coding agents: which to pick", to: "/blog/best-ai-coding-agents" },
      { label: "Claude Code best practices", to: "/blog/claude-code-best-practices" },
      { label: "Agent frameworks compared", to: "/blog/open-source-ai-agent-frameworks" },
    ],
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-36 sm:pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="absolute inset-0 bg-background/75"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">AI Engineer Insights</span>
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Practical guides to get hired as an AI engineer{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">and build agents that hold up.</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Written by an AI Engineering Lead. A free 2026 roadmap, and one email a week. Start where you are:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {doors.map((door) => (
            <div
              key={door.title}
              className="bg-gradient-card rounded-lg p-5 sm:p-6 border border-border shadow-card hover:shadow-glow transition-all duration-300 text-left"
            >
              <door.icon className="h-7 w-7 text-primary mb-3" aria-hidden="true" />
              <h2 className="text-lg font-semibold mb-1">{door.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{door.blurb}</p>
              <ul className="space-y-2">
                {door.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-start text-sm sm:text-base font-medium text-foreground hover:text-primary"
                    >
                      <ArrowRight className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
          <Link to="/ai-engineering-roadmap">
            <Button variant="hero" size="lg" className="group">
              Get the free roadmap
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/blogs">
            <Button variant="outline" size="lg">
              Browse all guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
