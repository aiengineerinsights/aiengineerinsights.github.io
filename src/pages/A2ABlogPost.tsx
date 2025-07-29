
import { ArrowLeft, Clock, User, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import profilePic from '@/assets/vishnu_lanka.jpg';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const A2ABlogPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/blogs">
              <Button variant="ghost" className="mb-6 -ml-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Insights
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Agentic AI</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Architectural Insights: A2A as a Protocol for Peer AI Agents
            </h1>
            
            <div className="flex items-center space-x-6 text-muted-foreground mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Jul 28, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>15 min read</span>
              </div>
            </div>

            {/* Author Card */}
            <Link to="/authors">
              <Card className="p-4 hover:shadow-glow transition-all duration-300 cursor-pointer bg-gradient-card border-border">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profilePic} alt="Vishnu Lanka" />
                    <AvatarFallback>VL</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">Vishnu Lanka</span>
                    </div>
                    <p className="text-sm text-muted-foreground">AI Engineer & Technical Writer</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A deep dive into Google's open Agent2Agent (A2A) standard—why its seemingly simple choices matter and what they mean for real‑world multi‑agent systems.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Introduction</h2>
            <p className="mb-6 leading-relaxed">
              The landscape of AI agents is rapidly evolving, and with it comes the critical need for standardized communication protocols. Google's recent introduction of the Agent2Agent (A2A) protocol represents a significant step toward solving one of the most fundamental challenges in multi-agent systems: how agents should talk to each other.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">What is Agent2Agent (A2A)?</h2>
            <p className="mb-6 leading-relaxed">
              Agent2Agent (A2A) is an open standard proposed by Google that defines how AI agents can communicate with each other in a structured, reliable manner. At its core, A2A is built on Server-Sent Events (SSE), a web standard that enables real-time, unidirectional communication from server to client.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Key Architectural Decisions</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">1. Server-Sent Events (SSE) as the Transport Layer</h3>
            <p className="mb-4 leading-relaxed">
              The choice of SSE over WebSockets or HTTP polling is particularly interesting. SSE provides:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Automatic reconnection capabilities</li>
              <li>Built-in event streaming</li>
              <li>Simple HTTP-based protocol</li>
              <li>Excellent firewall and proxy compatibility</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. JSON-Based Message Format</h3>
            <p className="mb-6 leading-relaxed">
              A2A uses a structured JSON format for messages, providing type safety and clear semantics. This approach ensures that agents can understand and validate incoming messages before processing them.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. Event-Driven Architecture</h3>
            <p className="mb-6 leading-relaxed">
              The protocol embraces an event-driven approach where agents emit events that other agents can subscribe to. This decoupling allows for more flexible and scalable multi-agent systems.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Real-World Implications</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Standardization Benefits</h3>
            <p className="mb-6 leading-relaxed">
              The introduction of A2A addresses several critical challenges in the multi-agent ecosystem:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Interoperability:</strong> Agents from different providers can communicate seamlessly</li>
              <li><strong>Debugging:</strong> Standardized message formats make it easier to trace communication flows</li>
              <li><strong>Scaling:</strong> Event-driven architecture naturally supports horizontal scaling</li>
              <li><strong>Reliability:</strong> Built-in reconnection and error handling mechanisms</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Implementation Considerations</h3>
            <p className="mb-6 leading-relaxed">
              When implementing A2A in production systems, several factors need consideration:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Network latency and connection stability</li>
              <li>Message ordering and delivery guarantees</li>
              <li>Security and authentication mechanisms</li>
              <li>Rate limiting and backpressure handling</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Code Example: Basic A2A Implementation</h2>
            <pre className="bg-muted p-4 rounded-lg mb-6 overflow-x-auto">
              <code>{`
// A2A Agent Example
class A2AAgent {
  constructor(agentId, endpoint) {
    this.agentId = agentId;
    this.endpoint = endpoint;
    this.eventSource = null;
  }

  connect() {
    this.eventSource = new EventSource(this.endpoint);
    
    this.eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };
    
    this.eventSource.onerror = (error) => {
      console.error('A2A connection error:', error);
      this.reconnect();
    };
  }

  sendMessage(targetAgent, messageType, payload) {
    const message = {
      from: this.agentId,
      to: targetAgent,
      type: messageType,
      payload: payload,
      timestamp: new Date().toISOString()
    };
    
    // Send via HTTP POST to A2A endpoint
    fetch(this.endpoint + '/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });
  }

  handleMessage(message) {
    // Process incoming A2A message
    console.log('Received A2A message:', message);
    
    switch(message.type) {
      case 'task_request':
        this.handleTaskRequest(message);
        break;
      case 'task_response':
        this.handleTaskResponse(message);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }
}
              `}</code>
            </pre>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Future Implications</h2>
            <p className="mb-6 leading-relaxed">
              The adoption of A2A could fundamentally change how we build multi-agent systems. As more platforms and frameworks adopt this standard, we can expect to see:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Emergence of agent marketplaces and ecosystems</li>
              <li>Standardized agent orchestration platforms</li>
              <li>Cross-platform agent collaboration</li>
              <li>Simplified debugging and monitoring tools</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Conclusion</h2>
            <p className="mb-6 leading-relaxed">
              Google's A2A protocol represents more than just another communication standard—it's a vision for the future of agent-based systems. By choosing SSE as the transport layer and embracing event-driven architecture, A2A provides a solid foundation for building scalable, reliable multi-agent applications.
            </p>
            <p className="mb-6 leading-relaxed">
              As AI engineers, understanding and adopting standards like A2A will be crucial for building the next generation of intelligent systems. The protocol's simplicity and pragmatic design choices make it an excellent starting point for anyone looking to implement agent-to-agent communication in their applications.
            </p>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default A2ABlogPost;
