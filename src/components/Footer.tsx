import { Brain, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";

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

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AIEngineerInsights
              </span>
            </div>
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
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
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
                  <a 
                    href={resource.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                    {...(resource.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {resource.name}
                    {resource.external && <ExternalLink className="h-3 w-3 ml-1" />}
                  </a>
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
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;