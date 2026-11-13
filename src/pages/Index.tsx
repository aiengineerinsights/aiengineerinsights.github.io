import Navigation from "@/components/Navigation";
import LatestBlogBanner from "@/components/LatestBlogBanner";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import { EvalStrip, FinalCTA, FreeLibrary, FullIndex, GuideMap, InfographicWall, Latest, ModelCard, Paths, TokenDivider } from "@/components/home/Sections";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <LatestBlogBanner />
      <main>
        <Hero />
        <EvalStrip />
        <Paths />
        <InfographicWall />
        <GuideMap />
        <Latest />
        <FreeLibrary />
        <ModelCard />
        <FullIndex />
        <TokenDivider />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
