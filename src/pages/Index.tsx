
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const featuredPosts = [
    {
      title: "From Software Engineer to AI Engineer: My Journey",
      excerpt: "Practical insights on making the transition, including skills to develop and common pitfalls to avoid.",
      date: "December 2024",
      readTime: "8 min read"
    },
    {
      title: "LLM Deployment Patterns That Actually Work",
      excerpt: "Real-world deployment strategies for large language models in production environments.",
      date: "November 2024", 
      readTime: "12 min read"
    },
    {
      title: "The AI Engineer's Toolkit: Essential Resources for 2025",
      excerpt: "Curated list of tools, frameworks, and resources that every AI engineer should know about.",
      date: "November 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-slate-900">
              AIEngineerInsights
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors">About</Link>
              <Link to="/role-roadmap" className="text-slate-700 hover:text-blue-600 transition-colors">Role & Roadmap</Link>
              <Link to="/blogs" className="text-slate-700 hover:text-blue-600 transition-colors">Blogs</Link>
              <Link to="/projects" className="text-slate-700 hover:text-blue-600 transition-colors">Projects</Link>
              <Link to="/notes" className="text-slate-700 hover:text-blue-600 transition-colors">Notes</Link>
              <Link to="/resources" className="text-slate-700 hover:text-blue-600 transition-colors">Resources</Link>
              <Link to="/contact" className="text-slate-700 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Your Companion on the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              AI Engineering Journey
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Practical roadmaps, real-world projects, and curated resources for aspiring and current AI engineers. 
            No fluff, just actionable insights from the trenches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/role-roadmap">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-slate-300">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What Awaits You Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Awaits You Here</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to navigate your AI engineering career with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-blue-600">Role Clarity</CardTitle>
                <CardDescription>
                  Demystify what AI engineers actually do and how they fit into modern tech teams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Clear breakdown of responsibilities, skills, and career paths in AI engineering.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-teal-600">Practical Roadmaps</CardTitle>
                <CardDescription>
                  Step-by-step guides from beginner to advanced AI engineering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Actionable learning paths with real milestones and practical projects.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-purple-600">Real Projects</CardTitle>
                <CardDescription>
                  Hands-on projects and insights from production AI systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Learn from real implementations, failures, and successes in AI engineering.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Insights</h2>
            <p className="text-lg text-slate-600">
              Fresh perspectives and practical advice from the AI engineering frontlines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-slate-500">{post.date}</span>
                    <span className="text-sm text-blue-600">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blogs">
              <Button variant="outline" size="lg">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Built by AI Engineers, for AI Engineers</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            This isn't another corporate blog or course platform. It's a personal journey shared openly, 
            with real experiences, honest insights, and practical advice that actually works in the field.
          </p>
          <p className="text-slate-600 mb-8">
            Whether you're making the transition from software engineering or looking to level up your AI skills, 
            you'll find actionable guidance without the fluff.
          </p>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Learn More About Our Mission
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Dive In?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start exploring projects, dive into technical notes, or map out your learning journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-slate-100">
                Explore Projects
              </Button>
            </Link>
            <Link to="/notes">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-slate-100">
                Technical Notes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">AIEngineerInsights</h3>
              <p className="text-slate-400 mb-4">
                Your companion on the AI engineering journey. Practical insights, real projects, and actionable roadmaps.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <div className="space-y-2">
                <Link to="/about" className="block hover:text-white transition-colors">About</Link>
                <Link to="/blogs" className="block hover:text-white transition-colors">Blogs</Link>
                <Link to="/projects" className="block hover:text-white transition-colors">Projects</Link>
                <Link to="/resources" className="block hover:text-white transition-colors">Resources</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="space-y-2">
                <Link to="/contact" className="block hover:text-white transition-colors">Contact</Link>
                <a href="#" className="block hover:text-white transition-colors">GitHub</a>
                <a href="#" className="block hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 AIEngineerInsights. Built with passion for the AI engineering community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
