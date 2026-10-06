// Conversion events for Microsoft Clarity (smart events / segments) and GA4.
// Clarity's queue stub exists from page load, so calls before the tag finishes
// loading are buffered. GA4 events obey Consent Mode (set in CookieConsent.tsx).

type AnalyticsWindow = Window & {
  clarity?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export type ConversionEvent =
  | "roadmap_pdf_download"
  | "newsletter_signup"
  | "affiliate_click"
  | "outbound_click";

export function trackEvent(name: ConversionEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  if (typeof w.clarity === "function") {
    w.clarity("event", name);
    for (const [key, value] of Object.entries(params)) w.clarity("set", key, value);
  }
  if (typeof w.gtag === "function") w.gtag("event", name, params);
}

const ROADMAP_PDF = /\/downloads\/ai-roadmap\.pdf$/;

// One delegated listener classifies every link click on the site, so individual
// links don't need wiring: roadmap PDF downloads, affiliate (rel="sponsored")
// and other outbound links.
export function installClickTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;

    let url: URL;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    const page = window.location.pathname;
    if (ROADMAP_PDF.test(url.pathname)) {
      trackEvent("roadmap_pdf_download", { pdf_source_page: page });
    } else if (url.host !== window.location.host && /^https?:$/.test(url.protocol)) {
      const sponsored = (link.getAttribute("rel") || "").split(/\s+/).includes("sponsored");
      trackEvent(sponsored ? "affiliate_click" : "outbound_click", { outbound_host: url.host });
    }
  };

  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
