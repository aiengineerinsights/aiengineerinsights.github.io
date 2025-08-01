
import { useState } from "react";
import { Clock, Search, Filter, TrendingUp, Zap, Database, ArrowRight, X, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "Ollama on Mac: The Perfect Local AI Stack for 2025",
      excerpt: "Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — you just need to unlock it with Ollama and Mac Silicon's unified memory architecture.",
      readTime: "18 min read",
      date: "Aug 1, 2025",
      category: "Local AI",
      icon: Brain,
      gradient: "from-purple-600 to-purple-800",
      link: "/blog/ollama-mac-local-ai-2025"
    },
    {
      id: 2,
      title: "A2A Protocol: Subtle Design Decisions in Agent Communication",
      excerpt: "A deep dive into Google's open Agent2Agent (A2A) standard—why its seemingly simple choices matter and what they mean for real‑world multi‑agent systems.",
      readTime: "15 min read",
      date: "Jul 28, 2025",
      category: "Agentic AI",
      icon: TrendingUp,
      gradient: "from-primary to-primary-glow",
      link: "/blog/google-a2a"
    },
    // {
    //   id: 3,
    //   title: "MLOps Best Practices: From Development to Production",
    //   excerpt: "Essential strategies for deploying machine learning models at scale, covering CI/CD pipelines, monitoring, and version control for ML workflows.",
    //   readTime: "12 min read",
    //   date: "Jul 25, 2025",
    //   category: "MLOps",
    //   icon: Zap,
    //   gradient: "from-secondary to-secondary/80",
    //   link: "/blog/mlops-best-practices"
    // },
    // {
    //   id: 4,
    //   title: "LLM Deployment Challenges: Lessons from the Field",
    //   excerpt: "Real-world insights on deploying large language models, including performance optimization, cost management, and scaling considerations.",
    //   readTime: "18 min read",
    //   date: "Jul 22, 2025",
    //   category: "LLM Deployment",
    //   icon: Database,
    //   gradient: "from-accent to-accent/80",
    //   link: "/blog/llm-deployment-challenges"
    // },
    // {
    //   id: 5,
    //   title: "Building Robust AI Data Pipelines",
    //   excerpt: "Architecture patterns and best practices for creating reliable data pipelines that power AI applications in production environments.",
    //   readTime: "14 min read",
    //   date: "Jul 20, 2025",
    //   category: "Data Engineering",
    //   icon: Database,
    //   gradient: "from-muted to-muted-foreground/20",
    //   link: "/blog/building-robust-ai-data-pipelines"
    // }
  ];

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              All <span className="bg-gradient-hero bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our complete collection of AI engineering insights, best practices, and real-world experiences.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Filter Button */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredPosts.length} of {blogPosts.length} articles
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden">
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${post.gradient} rounded-full px-3 py-1`}>
                          <post.icon className="h-4 w-4 text-primary-foreground" />
                          <span className="text-sm font-medium text-primary-foreground">{post.category}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <Link to={post.link}>
                          <Button variant="ghost" size="sm" className="group/btn">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogsPage;
