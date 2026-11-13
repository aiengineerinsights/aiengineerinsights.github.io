import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "@/components/SiteLink";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 bg-grid border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col gap-4">
          <p className="m-0 font-mono font-bold text-[96px] sm:text-[160px] lg:text-[220px] leading-[0.9] tracking-[-0.06em] text-primary">404</p>
          <h1 className="m-0 font-mono font-bold text-[28px] sm:text-[46px] tracking-[-0.04em]">This page was hallucinated.</h1>
          <p className="m-0 font-mono text-[15px] text-muted-foreground">confidence: 0.97 · sources: none · grounded: false</p>
          <p className="m-0 text-secondary-foreground">Page not found. The link may be old or mistyped.</p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Link to="/blogs" className="inline-flex items-center min-h-[52px] px-6 rounded-sm bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition-colors">
              Retrieve a real guide
            </Link>
            <Link to="/" className="inline-flex items-center min-h-[52px] px-6 rounded-sm border border-input text-foreground font-semibold hover:border-primary transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
