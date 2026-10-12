// Subscriber-only downloads for <NewsletterSignup bonus={...} />. The download
// button appears in the success state right after submit. PDFs live in
// public/downloads/ and are disallowed in robots.txt so search doesn't bypass the form.

/** A subscriber-only download, unlocked on the success state right after submit. */
export interface NewsletterBonus {
  /** Shown on the download button, e.g. "Hermes Agent cheat sheet (PDF)". */
  label: string;
  href: string;
}

export const HERMES_CHEAT_SHEET: NewsletterBonus = {
  label: "Hermes Agent cheat sheet (PDF)",
  href: "/downloads/hermes-agent-cheat-sheet.pdf",
};
