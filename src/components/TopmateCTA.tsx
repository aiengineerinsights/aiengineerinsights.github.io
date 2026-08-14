import { Video, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Paid 1:1 booking CTA (Topmate). This is the BoFu step below the free roadmap
// PDF: readers on career posts who want personal help book a session. Warm/amber
// styling deliberately signals "premium" vs the free roadmap CTA's cool palette.
const TOPMATE_URL = "https://topmate.io/poorna_prudhvi_gurram";

const TopmateCTA = () => (
  <Card className="my-6 sm:my-8 p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border-amber-500/30">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-base sm:text-lg m-0">Want 1:1 help? Book a session</h3>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            5.0 · 18 reviews
          </span>
        </div>
        <p className="text-sm text-muted-foreground m-0">
          Career guidance, resume &amp; interview prep, or tech consulting — 1:1 with a Lead AI Engineer.
          Start with a free 30-min quick chat.
        </p>
      </div>
      <a href={TOPMATE_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
        <Button className="bg-amber-600 text-white hover:bg-amber-700">
          <Video className="mr-2 h-4 w-4" />
          Book on Topmate
        </Button>
      </a>
    </div>
  </Card>
);

export default TopmateCTA;
