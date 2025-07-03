
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'MLOps', 'LLM Deployment', 'Career', 'System Design', 'Debugging'];
  
  const blogPosts = [
    {
      title: "From Software Engineer to AI Engineer: My Journey",
      excerpt: "Practical insights on making the transition, including skills to develop and common pitfalls to avoid.",
      date: "December 15, 2024",
      readTime: "8 min read",
      category: "Career",
      tags: ["career-transition", "skills", "advice"]
    },
    {
      title: "LLM Deployment Patterns That Actually Work",
      excerpt: "Real-world deployment strategies for large language models in production environments.",
      date: "December 10, 2024",
      readTime: "12 min read",
      category: "LLM Deployment",
      tags: ["llm", "deployment", "production"]
    },
    {
      title: "The AI Engineer's Toolkit: Essential Resources for 2025",
      excerpt: "Curated list of tools, frameworks, and resources that every AI engineer should know about.",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Career",
      tags: ["tools", "resources", "2025"]
    },
    {
      title: "MLOps Pipelines: Lessons from Production Failures",
      excerpt: "What I learned from ML pipeline failures and how to build more robust systems.",
      date: "November 28, 2024",
      readTime: "10 min read",
      category: "MLOps",
      tags: ["mlops", "pipelines", "failures"]
    },
    {
      title: "Debugging AI Models: A Systematic Approach",
      excerpt: "Step-by-step methodology for debugging AI models when they misbehave in production.",
      date: "November 20, 2024",
      readTime: "9 min read",
      category: "Debugging",
      tags: ["debugging", "models", "production"]
    },
    {
      title: "Designing Scalable AI Systems: Architecture Patterns",
      excerpt: "Common architectural patterns for building AI systems that scale with your business.",
      date: "November 15, 2024",
      readTime: "14 min read",
      category: "System Design",
      tags: ["architecture", "scalability", "design-patterns"]
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Insights & Experiences
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Honest insights, practical advice, and lessons learned from building AI systems in production
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-slate-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-slate-500">
                  {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-900">More Content Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                New insights and deep dives published regularly
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6">
                Want to be notified when new posts are published? Connect with us to stay updated.
              </p>
              <Button asChild>
                <a href="/contact">Get Notified</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
