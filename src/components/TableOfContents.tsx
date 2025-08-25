
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const handleClick = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // Adjust based on your Navigation bar height
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const TableOfContents = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("article h2, article h3")).map(el => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      if (!el.id) el.setAttribute("id", id); // Auto-generate IDs if missing
      return { id, text: el.textContent || "", level: el.tagName === "H2" ? 2 : 3 };
    });

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((h) => {
      const element = document.getElementById(h.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Mobile TOC Toggle Button
  const MobileTocButton = () => (
    <div className="lg:hidden fixed top-20 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle table of contents</span>
      </Button>
    </div>
  );

  // Mobile TOC Overlay
  const MobileTocOverlay = () => (
    <div className={`lg:hidden fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`}>
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute top-20 right-4 w-64 bg-background border rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-4 text-muted-foreground">On This Page</h3>
        <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  handleClick(e, h.id);
                  setIsOpen(false);
                }}
                className={`block hover:text-primary transition-colors text-sm py-1 ${
                  activeId === h.id ? "text-primary font-medium" : "text-muted-foreground/70"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile TOC */}
      <MobileTocButton />
      <MobileTocOverlay />
      
      {/* Desktop TOC */}
      <aside className="hidden lg:block w-48 pr-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto text-xs">
        <h3 className="font-semibold mb-4 text-muted-foreground">On This Page</h3>
        <ul className="space-y-2">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`block hover:text-primary transition-colors ${
                  activeId === h.id ? "text-primary font-medium" : "text-muted-foreground/70"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default TableOfContents;
