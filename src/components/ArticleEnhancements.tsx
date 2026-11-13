import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Link } from "@/components/SiteLink";
import { infographicFor } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

// Reader-facing extras added to every article from one place (Navigation mounts
// this on /blog/* pages), so the 60+ hand-written post files don't each need
// editing. Everything here is client-only chrome: it renders nothing on the
// server and attaches after hydration, so article HTML stays exactly as written.

const SITE = "https://aiengineerinsights.com";
// Hero infographics are inline SVGs at one of these two sizes.
const HERO_SVG = 'main svg[viewBox="0 0 1200 630"], main svg[viewBox="0 0 1200 560"]';

/** Reading progress in percent, plus a rough token count for the article. */
export const useReadingProgress = () => {
  const [state, setState] = useState({ pct: 0, tokens: 0 });
  const { pathname } = useLocation();
  useEffect(() => {
    const words = (document.querySelector("article")?.textContent ?? "").trim().split(/\s+/).length;
    const tokens = Math.round((words * 1.3) / 100) * 100;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ pct: max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0, tokens });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return state;
};

const k = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);
export const contextLabel = (pct: number, tokens: number) =>
  tokens > 0 ? `${pct}% read · about ${k(Math.round((tokens * pct) / 100))} of ${k(tokens)} tokens` : `${pct}% read`;

// Split a headline into rough "tokens": whole short words, long words in two.
const tokenize = (text: string): string[] =>
  text.trim().split(/\s+/).flatMap((w, i) => {
    const lead = i === 0 ? "" : " ";
    if (w.length <= 7) return [lead + w];
    const cut = Math.ceil(w.length * 0.55);
    return [lead + w.slice(0, cut), w.slice(cut)];
  });

const btn = "inline-flex items-center min-h-[44px] px-3.5 rounded-sm border border-input bg-transparent text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition-colors";

const ArticleEnhancements = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "");
  const [slots, setSlots] = useState<{ title: HTMLElement; tools: HTMLElement | null; h1: HTMLElement; text: string } | null>(null);
  const [tokens, setTokens] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Find the headline and the hero infographic, and make a slot after each.
  useEffect(() => {
    setTokens(false);
    const h1 = document.querySelector<HTMLElement>("main h1");
    if (!h1) return;
    const title = document.createElement("div");
    h1.insertAdjacentElement("afterend", title);
    const svg = document.querySelector<SVGElement>(HERO_SVG);
    const frame = svg?.parentElement ?? null;
    let tools: HTMLElement | null = null;
    if (frame) {
      tools = document.createElement("div");
      frame.insertAdjacentElement("afterend", tools);
      // The frame's own bottom margin would push the tools away from it.
      frame.style.marginBottom = "0";
    }
    setSlots({ title, tools, h1, text: h1.textContent ?? "" });
    return () => {
      h1.style.display = "";
      title.remove();
      tools?.remove();
      if (frame) frame.style.marginBottom = "";
      setSlots(null);
    };
  }, [pathname]);

  useEffect(() => {
    if (slots) slots.h1.style.display = tokens ? "none" : "";
  }, [tokens, slots]);

  // Sticky sign-up bar: appears a third of the way in, hides near the footer.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShowBar(p > 0.3 && p < 0.92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!slots) return null;
  const url = `${SITE}${path}/`;
  const image = infographicFor(path);
  const pieces = tokenize(slots.text);
  const embed = image
    ? `<a href="${url}"><img src="${SITE}${image}" alt="${slots.text.replace(/"/g, "&quot;")}" width="1200" height="630" style="max-width:100%;height:auto"></a>\n<p>Source: <a href="${url}">AI Engineer Insights</a></p>`
    : "";
  const copyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embed);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
      trackEvent("infographic_action", { infographic_action: "copy_embed", infographic_page: path });
    } catch {
      setCopied(false);
    }
  };
  const hasBonus = !!document.getElementById("free-pdf");

  return (
    <>
      {createPortal(
        <div className="mb-4 sm:mb-6">
          {tokens && (
            <p className={`${slots.h1.className} !mb-3`} aria-hidden="true" style={{ lineHeight: 1.45 }}>
              {pieces.map((t, i) => (
                <span key={i} className={`whitespace-pre-wrap py-0.5 shadow-[inset_0_-2px_0_hsl(var(--primary))] ${i % 2 ? "bg-[#3a2a10]" : "bg-border"}`}>
                  {t}
                </span>
              ))}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" aria-pressed={tokens} onClick={() => setTokens(!tokens)} className="inline-flex items-center min-h-[44px] px-3.5 rounded-sm border border-input font-mono text-[13px] text-primary hover:border-primary transition-colors">
              {tokens ? "Show as text" : "Show as tokens"}
            </button>
            {tokens && <span className="font-mono text-[13px] text-muted-foreground">about {pieces.length} tokens, as a model reads it</span>}
          </div>
        </div>,
        slots.title,
      )}

      {slots.tools &&
        image &&
        createPortal(
          <div className="not-prose flex flex-wrap items-center gap-2.5 border border-t-0 border-border bg-[#111110] px-4 py-3 mb-8 sm:mb-12">
            <span className="basis-full sm:basis-auto sm:flex-1 text-sm text-secondary-foreground">Free to share with a link back.</span>
            <a href={image} download className={btn} onClick={() => trackEvent("infographic_action", { infographic_action: "save", infographic_page: path })}>
              Save image
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={btn}
              onClick={() => trackEvent("infographic_action", { infographic_action: "share_linkedin", infographic_page: path })}
            >
              Share on LinkedIn
            </a>
            <button type="button" onClick={copyEmbed} className="inline-flex items-center min-h-[44px] px-3.5 rounded-sm bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-glow transition-colors">
              <span aria-live="polite">{copied ? "Embed code copied" : "Copy embed code"}</span>
            </button>
          </div>,
          slots.tools,
        )}

      {/* Portalled to <body>: this component is mounted inside the fixed nav,
          whose backdrop blur makes it the containing block for fixed children,
          which would pin the bar to the nav instead of the viewport. */}
      {showBar &&
        !dismissed &&
        createPortal(
          <div className="fixed bottom-0 inset-x-0 z-30 bg-card border-t border-input" style={{ animation: "aei-in 0.25s ease-out both" }}>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
              <p className="flex-1 m-0 font-semibold text-sm sm:text-base">
                {hasBonus ? "Get the cheat sheet for this guide, plus the AI engineer roadmap." : "Get the free AI engineer roadmap (PDF)."}
              </p>
              {hasBonus ? (
                <a href="#free-pdf" className="shrink-0 inline-flex items-center min-h-[44px] px-4 rounded-sm bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:bg-primary-glow">
                  Get the PDFs
                </a>
              ) : (
                <Link to="/newsletter" className="shrink-0 inline-flex items-center min-h-[44px] px-4 rounded-sm bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:bg-primary-glow">
                  Get the PDF
                </Link>
              )}
              <button type="button" aria-label="Dismiss" onClick={() => setDismissed(true)} className="shrink-0 inline-flex items-center justify-center h-11 w-11 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ArticleEnhancements;
