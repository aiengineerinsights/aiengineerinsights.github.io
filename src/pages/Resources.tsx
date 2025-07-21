import { BookOpen, Play, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Resources = () => {
  const books = [
    {
      title: "Hands-On Machine Learning",
      author: "Aurélien Géron",
      description: "A comprehensive guide to building intelligent systems using Scikit-Learn, Keras, and TensorFlow.",
      rating: 4.8,
      category: "Machine Learning",
      level: "Beginner to Intermediate",
      link: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
      cover: "🤖"
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      description: "The big ideas behind reliable, scalable, and maintainable data systems.",
      rating: 4.9,
      category: "Data Engineering",
      level: "Intermediate to Advanced",
      link: "https://dataintensive.net/",
      cover: "📊"
    },
    {
      title: "Building Machine Learning Pipelines",
      author: "Hannes Hapke & Catherine Nelson",
      description: "Automating model life cycles with TensorFlow Extended and Apache Beam.",
      rating: 4.6,
      category: "MLOps",
      level: "Intermediate",
      link: "https://www.oreilly.com/library/view/building-machine-learning/9781492053187/",
      cover: "⚙️"
    },
    {
      title: "Deep Learning",
      author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville",
      description: "The definitive textbook on deep learning fundamentals and advanced techniques.",
      rating: 4.7,
      category: "Deep Learning",
      level: "Advanced",
      link: "https://www.deeplearningbook.org/",
      cover: "🧠"
    },
    {
      title: "The Hundred-Page Machine Learning Book",
      author: "Andriy Burkov",
      description: "A concise yet comprehensive overview of machine learning concepts and algorithms.",
      rating: 4.5,
      category: "Machine Learning",
      level: "Beginner",
      link: "http://themlbook.com/",
      cover: "📖"
    },
    {
      title: "Machine Learning Engineering",
      author: "Andriy Burkov",
      description: "A practical guide to productionizing machine learning systems.",
      rating: 4.7,
      category: "MLOps",
      level: "Intermediate to Advanced",
      link: "http://www.mlebook.com/",
      cover: "🔧"
    }
  ];

  const videos = [
    {
      title: "Machine Learning Engineering for Production (MLOps) Specialization",
      creator: "Andrew Ng - DeepLearning.AI",
      description: "Complete specialization covering the full ML production lifecycle.",
      duration: "4 courses",
      category: "MLOps",
      level: "Intermediate",
      link: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
      thumbnail: "🎓"
    },
    {
      title: "Fast.ai Practical Deep Learning for Coders",
      creator: "Jeremy Howard",
      description: "Learn practical deep learning techniques and apply them to real problems.",
      duration: "22 hours",
      category: "Deep Learning",
      level: "Beginner to Intermediate",
      link: "https://course.fast.ai/",
      thumbnail: "🚀"
    },
    {
      title: "CS229: Machine Learning",
      creator: "Stanford University",
      description: "Comprehensive machine learning course covering theory and applications.",
      duration: "20 lectures",
      category: "Machine Learning",
      level: "Intermediate to Advanced",
      link: "https://cs229.stanford.edu/",
      thumbnail: "🏫"
    },
    {
      title: "Data Engineering Zoomcamp",
      creator: "DataTalks.Club",
      description: "Free course covering the entire data engineering stack.",
      duration: "12 weeks",
      category: "Data Engineering",
      level: "Beginner to Intermediate",
      link: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
      thumbnail: "🔄"
    },
    {
      title: "MLOps Tools and Techniques",
      creator: "Full Stack Deep Learning",
      description: "Practical guide to MLOps tools and best practices.",
      duration: "8 hours",
      category: "MLOps",
      level: "Intermediate",
      link: "https://fullstackdeeplearning.com/",
      thumbnail: "🛠️"
    },
    {
      title: "Large Language Models: Application and Engineering",
      creator: "Berkeley AI Research",
      description: "Latest developments in LLM engineering and deployment.",
      duration: "15 lectures",
      category: "LLMs",
      level: "Advanced",
      link: "https://rdi.berkeley.edu/llm-course/",
      thumbnail: "🤖"
    }
  ];

  const categories = ["All", "Machine Learning", "Deep Learning", "MLOps", "Data Engineering", "LLMs"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learning <span className="bg-gradient-hero bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated collection of books, courses, and videos to accelerate your AI engineering journey.
            </p>
          </div>

          {/* Books Section */}
          <section className="mb-20">
            <div className="flex items-center mb-8">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold">Essential Books</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{book.cover}</div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <Badge variant="secondary" className="mb-2">{book.category}</Badge>
                      <Badge variant="outline" className="ml-2">{book.level}</Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {book.description}
                    </p>
                    
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full group/btn">
                        View Book
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Videos Section */}
          <section>
            <div className="flex items-center mb-8">
              <Play className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold">Video Courses</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-gradient-card border-border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{video.thumbnail}</div>
                      <Badge variant="secondary">{video.duration}</Badge>
                    </div>
                    
                    <div className="mb-3">
                      <Badge variant="secondary" className="mb-2">{video.category}</Badge>
                      <Badge variant="outline" className="ml-2">{video.level}</Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">by {video.creator}</p>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {video.description}
                    </p>
                    
                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full group/btn">
                        Watch Course
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;