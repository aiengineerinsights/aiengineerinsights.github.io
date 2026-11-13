import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/SiteLink";
import { ROADMAP_PATH, TOPMATE_URL } from "@/config/site";
import ArticleEnhancements, { contextLabel, useReadingProgress } from "@/components/ArticleEnhancements";

const NAV_ITEMS = [
  { name: "Guides", to: "/blogs" },
  { name: "Roadmap", to: ROADMAP_PATH },
  { name: "Salaries", to: "/blog/ai-engineer-salary" },
  { name: "Free PDFs", to: "/newsletter" },
];

// Reading progress on article pages, shown as a "context window" filling up.
const ContextMeter = () => {
  const { pct, tokens } = useReadingProgress();
  return (
    <>
      <div className="hidden xl:flex items-center gap-2.5 font-mono text-xs text-muted-foreground whitespace-nowrap" aria-hidden="true">
        <span className="text-primary">CONTEXT WINDOW</span>
        <span>{contextLabel(pct, tokens)}</span>
      </div>
    </>
  );
};

const ProgressBar = () => {
  const { pct } = useReadingProgress();
  return (
    <div role="progressbar" aria-label="Reading progress" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="h-0.5 w-full">
      <div className="h-0.5 bg-primary" style={{ width: `${pct}%` }} />
    </div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isArticle = pathname.startsWith("/blog/");
  const isActive = (to: string) => pathname.replace(/\/$/, "") === to || (to === "/blogs" && isArticle);

  return (
    <nav aria-label="Main" className={`fixed top-0 w-full z-50 border-b border-border ${isOpen ? "bg-background" : "bg-background/95 backdrop-blur-sm"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-6 h-16">
          <Link to="/" className="inline-flex items-center min-h-[44px] font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors shrink-0">
            AI Engineer Insights
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-7 flex-1 whitespace-nowrap">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`text-[15px] py-2 transition-colors hover:text-primary ${
                  isActive(item.to) ? "text-foreground font-semibold" : "text-secondary-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={TOPMATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] py-2 text-secondary-foreground transition-colors hover:text-primary"
            >
              1:1 calls
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {isArticle && <ContextMeter />}
            <Link
              to="/blogs#search"
              className={`${isArticle ? "hidden" : "hidden lg:inline-flex"} items-center gap-2 h-11 px-3.5 border border-border rounded-sm text-sm text-muted-foreground hover:border-input hover:text-foreground transition-colors`}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search guides
            </Link>
            <Link
              to="/newsletter"
              className="inline-flex items-center h-11 px-4 rounded-sm bg-primary text-primary-foreground font-semibold text-[15px] hover:bg-primary-glow transition-colors"
            >
              Get the roadmap
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 border border-input rounded-sm text-foreground"
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border pb-4 bg-background h-[calc(100dvh-4rem)] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center min-h-[48px] px-1 text-base text-foreground border-b border-border"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={TOPMATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center min-h-[48px] px-1 text-base text-foreground border-b border-border"
            >
              1:1 calls
            </a>
            <Link
              to="/newsletter"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center min-h-[48px] rounded-sm bg-primary text-primary-foreground font-semibold"
            >
              Get the roadmap
            </Link>
          </div>
        )}
      </div>
      {isArticle && <ProgressBar />}
      {isArticle && <ArticleEnhancements />}
    </nav>
  );
};

export default Navigation;
