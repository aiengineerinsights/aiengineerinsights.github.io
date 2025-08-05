
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LatestBlogBanner = () => {
  return (
    <div className="fixed top-16 w-full z-40 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">Latest:</span>
          </div>
          <span className="flex-1 text-center md:text-left truncate">
            Architectural Insights: A2A as a Protocol for Peer AI Agents
          </span>
          <Link to="blog/google-a2a">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 flex-shrink-0"
            >
              Read Now
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogBanner;
