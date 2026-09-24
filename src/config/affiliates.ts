// Central affiliate config. Nothing here is live until you fill it in — every
// link falls back to the plain (untracked) destination while `enabled` is false,
// so the site works exactly as before until you paste your real tracking details.
//
// HOW TO ACTIVATE a program once you've signed up:
//  - Domain programs (courses): set `enabled: true` and a `wrap` that turns a
//    plain course URL into your tracked deep-link. Every course link on the site
//    that points at that domain then earns automatically.
//  - Fixed-link programs (tools): set `enabled: true` and paste your `url`.
// Then rebuild + deploy. That's the only change needed.

export type AffiliateProgram = {
  enabled: boolean;
  /** Domain programs: turn a plain destination URL into your tracked link. */
  wrap?: (url: string) => string;
  /** Fixed-link programs (a single referral/affiliate URL). */
  url?: string;
};

export const affiliates: Record<string, AffiliateProgram> = {
  // COURSES (domain-based). Example wrap for Coursera via Impact once you have it:
  //   wrap: (u) => `https://imp.i384100.net/c/XXXXXX/YYYYYY/ZZZZ?u=${encodeURIComponent(u)}`,
  coursera: { enabled: false },
  educative: { enabled: false },
  datacamp: { enabled: false },
  edx: { enabled: false },
  // AMAZON Associates (append your tag): wrap: (u) => u + (u.includes("?") ? "&" : "?") + "tag=YOURTAG-20",
  amazon: { enabled: false },

  // TOOLS / FIXED LINKS. Paste your referral/affiliate URL into `url`.
  cursor: { enabled: false, url: "" },
  pinecone: { enabled: false, url: "" },
  exponent: { enabled: false, url: "" },
  digitalocean: { enabled: false, url: "" },
};

// Course-domain programs, checked in order against an outbound URL.
const DOMAIN_PROGRAMS: [string, string][] = [
  ["coursera.org", "coursera"],
  ["educative.io", "educative"],
  ["datacamp.com", "datacamp"],
  ["edx.org", "edx"],
  ["amazon.", "amazon"],
];

/**
 * Wrap a plain outbound URL through the matching affiliate program if it's
 * enabled; otherwise return it unchanged. `sponsored` tells the caller whether
 * to add rel="sponsored". Safe to call on ANY url — non-affiliate urls pass through.
 */
export function affiliateUrl(url: string): { href: string; sponsored: boolean } {
  for (const [domain, key] of DOMAIN_PROGRAMS) {
    const prog = affiliates[key];
    if (url.includes(domain) && prog?.enabled && prog.wrap) {
      return { href: prog.wrap(url), sponsored: true };
    }
  }
  return { href: url, sponsored: false };
}
