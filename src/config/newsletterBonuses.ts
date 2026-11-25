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

export const CONWAYS_LAW_AI_CHEAT_SHEET: NewsletterBonus = {
  label: "Conway's law for AI cheat sheet (PDF)",
  href: "/downloads/conways-law-ai-cheat-sheet.pdf",
};

export const LLM_FALLACIES_CHEAT_SHEET: NewsletterBonus = {
  label: "Fallacies of LLM systems cheat sheet (PDF)",
  href: "/downloads/fallacies-of-llm-systems-cheat-sheet.pdf",
};

export const AI_ARCHITECT_READING_MAP: NewsletterBonus = {
  label: "AI architect reading map (PDF)",
  href: "/downloads/ai-architect-reading-map.pdf",
};

export const CLAUDE_CODE_CHEAT_SHEET: NewsletterBonus = {
  label: "Claude Code cheat sheet (PDF)",
  href: "/downloads/claude-code-cheat-sheet.pdf",
};

export const CLAUDE_CODE_STARTER_KIT: NewsletterBonus = {
  label: "Claude Code starter kit (zip)",
  href: "/downloads/claude-code-starter-kit.zip",
};

export const AI_ENGINEER_INTERVIEW_QUESTIONS: NewsletterBonus = {
  label: "AI engineer interview questions (PDF)",
  href: "/downloads/ai-engineer-interview-questions.pdf",
};

export const AI_ENGINEER_RESUME_TEMPLATE: NewsletterBonus = {
  label: "AI engineer resume template (Word + PDF)",
  href: "/downloads/ai-engineer-resume-template.zip",
};
