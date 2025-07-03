
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            About AIEngineerInsights
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            A personal journey through the world of AI engineering, shared openly and honestly
          </p>
        </div>

        {/* Personal Introduction */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">My Story</CardTitle>
              <CardDescription>How this blog came to be</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Like many of you, I started as a software engineer who became fascinated by the potential of AI. 
                The transition wasn't straightforward – there were moments of confusion, imposter syndrome, and 
                countless hours spent trying to understand not just the technical concepts, but how they fit 
                together in real-world systems.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                What I discovered was a gap between theoretical AI/ML content and practical engineering guidance. 
                There were plenty of courses on machine learning algorithms, and plenty of business-focused AI content, 
                but not enough honest, practical advice for engineers building AI systems in production.
              </p>
              <p className="text-slate-700 leading-relaxed">
                This blog is my attempt to fill that gap. It's a collection of lessons learned, mistakes made, 
                and insights gained from working on real AI engineering problems. No corporate speak, no sales pitches – 
                just one engineer sharing what they've learned with others on the same journey.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600">
              What we're trying to achieve with this community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-blue-600">Clarity Over Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  We break down complex AI engineering concepts into understandable, actionable insights. 
                  No jargon for the sake of jargon – just clear explanations of what matters and why.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-teal-600">Actionable Roadmaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Generic advice doesn't help anyone. We provide specific, step-by-step guidance 
                  with real milestones, practical projects, and honest timelines for skill development.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-purple-600">Real-World Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Theory is important, but application is everything. We focus on projects, patterns, 
                  and practices that work in production environments, not just in notebooks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-orange-600">Community Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  AI engineering shouldn't be a solo journey. We curate the best resources, 
                  connect you with valuable communities, and foster meaningful connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-900">What We Believe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">Honesty First</h3>
                  <p className="text-slate-700 text-sm">
                    We share failures alongside successes, challenges alongside solutions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-teal-600 mb-2">Practical Value</h3>
                  <p className="text-slate-700 text-sm">
                    Every piece of content should help you build better AI systems.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-600 mb-2">Continuous Learning</h3>
                  <p className="text-slate-700 text-sm">
                    The field evolves rapidly, and so should our understanding and practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Connect */}
        <section className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Let's Connect</h2>
            <p className="text-lg text-slate-600 mb-6">
              This journey is better together. Whether you have questions, want to share your own insights, 
              or just want to connect with fellow AI engineers, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get In Touch
                </Button>
              </Link>
              <Link to="/blogs">
                <Button size="lg" variant="outline">
                  Start Reading
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
