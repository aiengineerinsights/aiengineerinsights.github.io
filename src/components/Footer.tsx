
import { Brain, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Role & Roadmap", href: "#roadmap" },
    { name: "Latest Blogs", href: "#blogs" },
    { name: "Featured Projects", href: "#projects" }
  ];

  const resources = [
    { name: "Learning Resources", href: "/resources" },
    { name: "AI Engineer Summit", href: "https://www.ai.engineer/", external: true },
    { name: "Latent Space", href: "https://latent.space/", external: true },
    { name: "GitHub Resources", href: "#projects" }
  ];

  const handleAnchorClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AIEngineerInsights
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your companion on the AI engineering journey. Providing clarity, practical roadmaps, 
              and real-world insights for aspiring and current AI engineers.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  {resource.external ? (
                    <a 
                      href={resource.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : resource.href.startsWith('#') ? (
                    <button
                      onClick={() => handleAnchorClick(resource.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                    >
                      {resource.name}
                    </button>
                  ) : (
                    <Link
                      to={resource.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {resource.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest insights and resources delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full px-3 py-2 bg-muted rounded-md text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 AIEngineerInsights. Empowering the next generation of AI engineers.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <button onClick={() => handleAnchorClick('#contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
