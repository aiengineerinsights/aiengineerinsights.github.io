import { ArrowDown } from "lucide-react";

// The answer, before the article. Readers reach about a third of a long post, so
// comparison and "which one" guides open with the pick and link down to the detail.
// Every row must repeat a recommendation the article itself makes further down.
interface QuickPickRow {
  you: string;
  pick: string;
}

interface JumpLink {
  label: string;
  href: string;
}

interface PostQuickPickProps {
  heading?: string;
  rows: QuickPickRow[];
  jumps?: JumpLink[];
}

const PostQuickPick = ({ heading = "Quick pick", rows, jumps = [] }: PostQuickPickProps) => (
  <div className="rounded-lg border border-primary/30 bg-muted/40 p-4 sm:p-5 mb-6 sm:mb-8" aria-label={heading}>
    <p className="text-xs font-semibold uppercase tracking-wide text-primary m-0 mb-3">{heading}</p>
    <dl className="m-0 divide-y divide-border">
      {rows.map((row) => (
        <div key={row.you} className="py-2 first:pt-0 last:pb-0 sm:grid sm:grid-cols-5 sm:gap-4">
          <dt className="text-sm text-muted-foreground sm:col-span-3">{row.you}</dt>
          <dd className="m-0 text-sm sm:text-base font-semibold sm:col-span-2">{row.pick}</dd>
        </div>
      ))}
    </dl>
    {jumps.length > 0 && (
      <nav aria-label="Jump to a section" className="mt-4 flex flex-wrap gap-2">
        {jumps.map((jump) => (
          <a
            key={jump.href}
            href={jump.href}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs sm:text-sm text-foreground no-underline hover:border-primary hover:text-primary transition-colors"
          >
            {jump.label}
            <ArrowDown className="h-3 w-3" aria-hidden="true" />
          </a>
        ))}
      </nav>
    )}
  </div>
);

export default PostQuickPick;
