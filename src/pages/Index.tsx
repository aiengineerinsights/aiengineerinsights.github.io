
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoadmapSection from "@/components/RoadmapSection";
import LatestInsights from "@/components/LatestInsights";
import FeaturedResources from "@/components/FeaturedResources";
import ExploreProjects from "@/components/ExploreProjects";
import Footer from "@/components/Footer";
import LatestBlogBanner from "@/components/LatestBlogBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <LatestBlogBanner />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <LatestInsights />
      <FeaturedResources />
      <ExploreProjects />
      <Footer />
    </div>
  );
};

export default Index;
