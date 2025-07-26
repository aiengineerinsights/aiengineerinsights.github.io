
import { ExternalLink, BookOpen, Play, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const FeaturedResources = () => {
  const resources = [
    {
      title: "Deep Learning Book",
      description: "Comprehensive textbook covering mathematical foundations, practical machine learning techniques, and deep learning research.",
      url: "https://www.deeplearningbook.org/",
      type: "book",
      rating: "4.8/5",
      reviews: "2.1k",
      topics: ["Deep Learning", "Mathematics", "Theory"],
      highlight: "Essential theoretical foundation for AI practitioners"
    },
    {
      title: "Fast.ai Course",
      description: "Practical deep learning course focusing on real-world applications and cutting-edge techniques for practitioners.",
      url: "https://course.fast.ai/", 
      type: "video",
      rating: "4.9/5",
      reviews: "15k",
      topics: ["Practical ML", "PyTorch", "Applications"],
      highlight: "Top-down approach to learning deep learning"
    },
    {
      title: "Hands-On ML Book",
      description: "Practical guide using Scikit-Learn, Keras, and TensorFlow for building end-to-end machine learning systems.",
      url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
      type: "book",
      rating: "4.7/5", 
      reviews: "3.2k",
      topics: ["Practical ML", "Scikit-Learn", "TensorFlow"],
      highlight: "Best hands-on approach to ML implementation"
    }
  ];

  return (
    <section id="resources-featured" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Resources</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully curated books and video courses that provide essential knowledge for your AI engineering journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1">
                    {resource.title}
                  </h3>
                  <div className="flex items-center space-x-2 ml-2">
                    {resource.type === "book" ? (
                      <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    ) : (
                      <Play className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed flex-1">
                  {resource.description}
                </p>

                {/* Highlight */}
                <div className="bg-gradient-accent rounded-lg p-3 mb-4 border border-border">
                  <p className="text-sm font-medium">{resource.highlight}</p>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Rating and Action */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>({resource.reviews})</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group/btn"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    {resource.type === "book" ? <BookOpen className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explore More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group" asChild>
            <Link to="/resources">
              Explore All Resources
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
