import { Calendar, Clock } from "lucide-react";
import { Link } from "@/components/SiteLink";

// One-line byline. Replaces the large author card where the first screen is
// better spent on the answer; the author page still carries the full profile.
interface PostBylineProps {
  date: string;
  readTime: string;
}

const PostByline = ({ date, readTime }: PostBylineProps) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
    <span>
      By{" "}
      <Link to="/authors" className="font-medium text-foreground hover:text-primary hover:underline">
        Gurram Poorna Prudhvi
      </Link>
      , AI Engineering Lead
    </span>
    <span className="inline-flex items-center">
      <Calendar className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
      {date}
    </span>
    <span className="inline-flex items-center">
      <Clock className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
      {readTime}
    </span>
  </div>
);

export default PostByline;
