import { Github, Mail } from "lucide-react";
import { Link } from "@/components/SiteLink";
import { ROADMAP_PATH, TOPICS, TOPMATE_URL } from "@/config/site";

const linkClass = "flex items-center min-h-[40px] text-secondary-foreground hover:text-primary transition-colors";

const Footer = () => (
  <footer className="bg-background border-t border-border">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to="/" className="font-bold text-lg text-foreground hover:text-primary">AI Engineer Insights</Link>
          <p className="text-muted-foreground text-sm mt-3 max-w-[30ch]">Field notes for engineers building with LLMs and agents.</p>
          <div className="flex gap-2 mt-4">
            <a href="https://github.com/aiengineerinsights" target="_blank" rel="noopener noreferrer" aria-label="AI Engineer Insights on GitHub" className="inline-flex items-center justify-center h-11 w-11 border border-input rounded-sm text-foreground hover:border-primary hover:text-primary transition-colors">
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="mailto:aiengineerinsights@gmail.com" aria-label="Email AI Engineer Insights" className="inline-flex items-center justify-center h-11 w-11 border border-input rounded-sm text-foreground hover:border-primary hover:text-primary transition-colors">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <nav aria-label="Topics">
          <h2 className="label-mono text-muted-foreground mb-2">Topics</h2>
          <ul className="text-sm m-0 p-0 list-none">
            {TOPICS.map((t) => (
              <li key={t.name}>
                <Link to={`/blogs?topic=${encodeURIComponent(t.name)}`} className={linkClass}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Start here">
          <h2 className="label-mono text-muted-foreground mb-2">Start here</h2>
          <ul className="text-sm m-0 p-0 list-none">
            <li><Link to={ROADMAP_PATH} className={linkClass}>AI Engineer Roadmap 2026</Link></li>
            <li><Link to="/blog/ai-engineer-salary" className={linkClass}>AI engineer salary</Link></li>
            <li><Link to="/blogs" className={linkClass}>All guides</Link></li>
            <li><Link to="/newsletter" className={linkClass}>Newsletter and free PDFs</Link></li>
            <li><a href={TOPMATE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>1:1 mentorship</a></li>
          </ul>
        </nav>
        <nav aria-label="Site">
          <h2 className="label-mono text-muted-foreground mb-2">Site</h2>
          <ul className="text-sm m-0 p-0 list-none">
            <li><Link to="/authors" className={linkClass}>Authors</Link></li>
            <li><Link to="/resources" className={linkClass}>Learning resources</Link></li>
            <li><Link to="/projects" className={linkClass}>Open-source projects</Link></li>
            <li><Link to="/privacy" className={linkClass}>Privacy policy</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border mt-10 pt-6 text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>© {new Date().getFullYear()} AI Engineer Insights</span>
        <Link to="/privacy" className="min-h-[40px] inline-flex items-center hover:text-primary transition-colors">Privacy policy</Link>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
          className="min-h-[40px] inline-flex items-center hover:text-primary transition-colors"
        >
          Cookie settings
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
