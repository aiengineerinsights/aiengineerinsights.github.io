import { Link } from "@/components/SiteLink";
import { insights } from "@/components/LatestInsights";

const LatestBlogBanner = () => {
  // Always the newest post — insights is ordered newest-first (single source
  // of truth shared with the homepage feed), so no static edits needed.
  const latest = insights[0];
  if (!latest) return null;

  return (
    <Link
      to={latest.link}
      className="fixed top-16 w-full z-40 bg-primary text-primary-foreground hover:bg-primary-glow transition-colors"
    >
      <div className="container mx-auto px-4 h-10 flex items-center justify-center gap-3 text-sm font-semibold">
        <span className="label-mono text-[12px] shrink-0">New</span>
        <span className="truncate">{latest.title}</span>
        <span className="underline shrink-0">Read it</span>
      </div>
    </Link>
  );
};

export default LatestBlogBanner;
