import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Lightweight cookie-consent gate. Stores the choice in localStorage and only
// loads non-essential analytics (Microsoft Clarity + Google Analytics 4) after
// the visitor accepts. This is the foundation for a full CMP later — when AdSense
// is added, the same consent signal should drive Google Consent Mode. It is NOT
// yet an IAB TCF / Google-certified CMP, which EEA personalized ads will require.
const STORAGE_KEY = "aei-cookie-consent";
const CLARITY_ID = "xqhw41e9ob";
const GA_ID = "G-144J8J650C";

type Consent = "accepted" | "declined";

let clarityLoaded = false;
function loadClarity() {
  if (clarityLoaded || typeof window === "undefined") return;
  clarityLoaded = true;
  /* eslint-disable */
  (function (c: any, l: any, a: any, r: any, i: any) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  /* eslint-enable */
}

// Google Analytics 4. Loaded only after consent. Because this is a client-side
// SPA, GA won't see route changes on its own — we disable the automatic first
// page_view (send_page_view:false) and emit one manually per route from the
// location effect below (and once on accept).
let gaLoaded = false;
function loadGA() {
  if (gaLoaded || typeof window === "undefined") return;
  gaLoaded = true;
  const w = window as any;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { send_page_view: false });
}

function trackPageview(path?: string) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", "page_view", {
    page_path: path ?? window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const existing = getConsent();
    if (existing === "accepted") {
      loadClarity();
      loadGA();
    } else if (existing === null) {
      setVisible(true);
    }

    // Footer "Cookie settings" link re-opens the banner via this event.
    const reopen = () => setVisible(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  // SPA pageview tracking: fire a GA page_view on every route change (and the
  // initial load) once consent is granted. trackPageview no-ops until gtag loads.
  useEffect(() => {
    if (getConsent() === "accepted") {
      trackPageview(location.pathname + location.search);
    }
  }, [location.pathname, location.search]);

  const choose = (consent: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, consent);
    if (consent === "accepted") {
      loadClarity();
      loadGA();
      trackPageview(location.pathname + location.search);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur px-4 py-4 sm:px-6"
    >
      <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground max-w-2xl">
          We use cookies for analytics to understand how the site is used and improve it. You can accept or decline
          non-essential cookies. See our{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => choose("declined")}>
            Decline
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => choose("accepted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
