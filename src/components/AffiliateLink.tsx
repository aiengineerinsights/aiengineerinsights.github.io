import { affiliates } from "@/config/affiliates";

// A fixed-link affiliate CTA (tools: Cursor, Pinecone, Exponent, DigitalOcean…).
// While the program is not configured, it links to `fallback` (the plain public
// URL) as a normal link — so the content is useful immediately. Once you paste
// your referral URL into src/config/affiliates.ts, it becomes a tracked link
// with rel="sponsored". No per-post edits needed to activate.
interface AffiliateLinkProps {
  program: string;
  fallback: string;
  children: React.ReactNode;
  className?: string;
}

const AffiliateLink = ({ program, fallback, children, className }: AffiliateLinkProps) => {
  const prog = affiliates[program];
  const active = Boolean(prog?.enabled && prog?.url);
  const href = active ? (prog!.url as string) : fallback;
  return (
    <a
      href={href}
      target="_blank"
      rel={active ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
      className={className ?? "text-primary hover:underline"}
    >
      {children}
    </a>
  );
};

export default AffiliateLink;
