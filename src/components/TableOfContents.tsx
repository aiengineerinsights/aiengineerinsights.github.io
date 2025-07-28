import { useEffect, useState } from "react";

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

  return (
    <aside className="hidden lg:block w-48 pr-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto text-xs">
      <h3 className="font-semibold mb-4 text-muted-foreground">On This Page</h3>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
            href={`#${h.id}`}
            onClick={(e) => handleClick(e, h.id)} // 👈 CUSTOM SCROLL
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
  );
};

export default TableOfContents;
