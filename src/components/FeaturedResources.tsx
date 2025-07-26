
import { BookOpen, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const FeaturedResources = () => {
  const resources = [
    {
      title: "Hands-On Machine Learning",
      author: "Aurélien Géron",
      type: "Book",
      description: "A comprehensive guide to building intelligent systems using Scikit-Learn, Keras, and TensorFlow.",
      category: "Machine Learning",
      level: "Beginner to Intermediate",
      icon: BookOpen,
      rating: "4.8/5"
    },
    {
      title: "Machine Learning Engineering for Production",
      author: "Andrew Ng - DeepLearning.AI",
      type: "Video Course",
      description: "Complete specialization covering the full ML production lifecycle and MLOps practices.",
      category: "MLOps",
      level: "Intermediate",
      icon: Play,
      rating: "4.9/5"
    },
    {
      title: "Building Machine Learning Pipelines",
      author: "Hannes Hapke & Catherine Nelson",
      type: "Book",
      description: "Automating model life cycles with TensorFlow Extended and Apache Beam for production systems.",
      category: "MLOps",
      level: "Intermediate",
      icon: BookOpen,
      rating: "4.6/5"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Resources</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked books and courses that provide exceptional value for AI engineers at every stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <resource.icon className="h-8 w-8 text-primary" />
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">{resource.type}</Badge>
                    <div className="text-sm text-muted-foreground">{resource.rating}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">by {resource.author}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed flex-1">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{resource.category}</Badge>
                  <Badge variant="outline">{resource.level}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="text-center mt-12">
          <Link to="/resources">
            <Button variant="outline" size="lg" className="group">
              Explore All Resources
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
