import { Clock, ArrowRight, TrendingUp, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LatestInsights = () => {
  const insights = [
    {
      title: "MLOps Best Practices: From Prototype to Production",
      excerpt: "Learn how to bridge the gap between experimentation and production-ready ML systems with proven MLOps strategies.",
      readTime: "8 min read",
      date: "Dec 10, 2024",
      category: "MLOps",
      icon: TrendingUp,
      gradient: "from-primary to-primary-glow"
    },
    {
      title: "LLM Deployment Challenges and Solutions",
      excerpt: "Real-world insights into the common pitfalls when deploying large language models and how to overcome them.",
      readTime: "12 min read", 
      date: "Dec 8, 2024",
      category: "LLMs",
      icon: Zap,
      gradient: "from-accent to-purple-400"
    },
    {
      title: "Building Robust AI Data Pipelines",
      excerpt: "A practical guide to creating reliable, scalable data pipelines that power modern AI applications.",
      readTime: "10 min read",
      date: "Dec 5, 2024", 
      category: "Data Engineering",
      icon: Database,
      gradient: "from-primary-glow to-accent"
    }
  ];

  return (
    <section id="blogs" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="bg-gradient-hero bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fresh perspectives on AI engineering challenges, solutions, and industry trends from the trenches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {insights.map((insight, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden">
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${insight.gradient} rounded-full px-3 py-1`}>
                    <insight.icon className="h-4 w-4 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">{insight.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {insight.readTime}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {insight.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{insight.date}</span>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Insights
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;