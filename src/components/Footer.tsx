
import { Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    window.open('mailto:aiengineerinsights@gmail.com', '_blank');
  };

  const handleAnchorNavigation = (href: string) => {
    if (window.location.pathname !== '/') {
      // Navigate to home first, then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AIEngineerInsights
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your companion on the AI engineering journey
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleAnchorNavigation('#about')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <Link to="/blogs" className="text-muted-foreground hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleAnchorNavigation('#projects')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleAnchorNavigation('#roadmap')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Career Roadmap
                </button>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Learning Materials
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-muted-foreground hover:text-primary transition-colors">
                  Latest Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/aiengineerinsights" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <button 
                onClick={handleEmailClick}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleEmailClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
