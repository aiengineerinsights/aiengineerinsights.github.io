
import { ArrowLeft, Clock, User, Calendar, Brain, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";

const OllamaBlogPost = () => {
  const performanceData = [
    { model: "MacBook Pro M3", ram: "36GB", modelSize: "Llama 3.2 Vision 11B", tokensPerSecond: "25-30", gpuMemory: "24GB" },
    { model: "Mac Studio M2 Ultra", ram: "64GB", modelSize: "DeepSeek-R1 32B", tokensPerSecond: "18-22", gpuMemory: "48GB" },
    { model: "Mac Studio M2 Ultra", ram: "96GB", modelSize: "Llama 3.3 70B", tokensPerSecond: "12-15", gpuMemory: "72GB" }
  ];

  const modelStackData = [
    { model: "DeepSeek-R1", params: "7B-14B", useCase: "Advanced reasoning, mathematical problem-solving", version: "deepseek-r1:14b-instruct-q4_K_M", memory: "24GB", tips: "Use temperature 0.1-0.3 for reasoning, excels at step-by-step logical thinking" },
    { model: "DeepSeek Coder V2", params: "16B", useCase: "Specialized coding, debugging, code review", version: "deepseek-coder-v2:16b-instruct-q4_K_M", memory: "24GB", tips: "Rivals GitHub Copilot, excellent for complex refactoring tasks" },
    { model: "Qwen 2.5 Coder", params: "7B-32B", useCase: "Multi-language coding, general development", version: "qwen2.5-coder:7b-instruct-q4_K_M", memory: "16GB", tips: "Supports 40+ languages, rivals GPT-4 for complex coding tasks" },
    { model: "Llama 3.2 Vision", params: "11B-90B", useCase: "Multimodal vision+text analysis", version: "llama3.2-vision:11b-instruct-q4_K_M", memory: "24GB", tips: "Best for image analysis, OCR, and document processing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        <div className="flex gap-8">
        <TableOfContents /> {/* <-- Add TOC here */}
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Back Button */}
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Local AI</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ollama on Mac: The Perfect Local AI Stack for 2025
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — you just need to unlock it with Ollama and Mac Silicon's unified memory architecture.
              </p>

              {/* Author Info */}
              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-lg hover:underline">Gurram Poorna Prudhvi</h3>
                    </Link>
                    <p className="text-muted-foreground">Lead AI Engineer & Local AI Specialist</p>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Beginner-Friendly
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Aug 1, 2025
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      18 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <section className="mb-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — you just need to unlock it. Here's how to build an enterprise-grade local AI stack that outperforms cloud services while keeping your data completely private.
                </p>
              </section>

              <section className="mb-8">
                <h2 id="ollama-mac-silicon" className="text-2xl font-bold mb-4">1. Ollama + Mac Silicon: A Match Made in Heaven</h2>
                
                <h3 id="unified-memory-architecture" className="text-xl font-semibold mb-3">Unified Memory Architecture Advantage</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mac Silicon's revolutionary design makes it uniquely suited for AI workloads. Unlike traditional systems where CPU and GPU have separate memory pools, <strong>Mac's unified memory architecture allows both processors to share the same memory space</strong>. This eliminates the typical 16-24GB GPU memory bottleneck that plagues other systems.
                </p>

                <div className="bg-muted/50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Performance Benefits:</h4>
                  <ul className="space-y-2">
                    <li>• <strong>No memory copying overhead</strong> between CPU and GPU</li>
                    <li>• <strong>Models can use full system RAM</strong> (up to 96GB on Mac Studio)</li>
                    <li>• <strong>Seamless memory scaling</strong> as model size increases</li>
                    <li>• <strong>Instant model switching</strong> without data transfer delays</li>
                  </ul>
                </div>

                <h3 id="token-generation-performance" className="text-xl font-semibold mb-3">Token Generation Performance</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Real-world benchmarks show impressive token generation speeds on Mac Silicon:
                </p>

                <div className="overflow-x-auto mb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mac Model</TableHead>
                        <TableHead>RAM</TableHead>
                        <TableHead>Model Size</TableHead>
                        <TableHead>Tokens/Second</TableHead>
                        <TableHead>GPU Memory Usage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.model}</TableCell>
                          <TableCell>{row.ram}</TableCell>
                          <TableCell>{row.modelSize}</TableCell>
                          <TableCell>{row.tokensPerSecond}</TableCell>
                          <TableCell>{row.gpuMemory}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>

              <section className="mb-8">
                <h2 id="essential-setup-commands" className="text-2xl font-bold mb-4">2. Essential Setup Commands</h2>
                
                <h3 id="install-ollama" className="text-xl font-semibold mb-3">Install Ollama</h3>
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto mb-4">
{`# Method 1: Direct download (recommended)
# Download from ollama.com and drag to Applications

# Method 2: Homebrew
brew install ollama

# Method 3: Terminal
curl -fsSL https://ollama.com/install.sh | sh

# Verify installation
ollama --version`}
                </pre>

                <h3 id="download-optimal-models" className="text-xl font-semibold mb-3">Download Optimal Models for Your Mac</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">For 16GB Macs:</h4>
                    <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto">
{`ollama pull qwen2.5-coder:7b-instruct-q4_K_M
ollama pull mistral:7b-instruct-q4_K_M
ollama pull phi4:14b-instruct-q4_K_M`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">For 32-36GB Macs:</h4>
                    <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto">
{`ollama pull deepseek-r1:14b-instruct-q4_K_M
ollama pull qwen2.5-coder:7b-instruct-q4_K_M
ollama pull llama3.2-vision:11b-instruct-q4_K_M
ollama pull mistral:7b-instruct-q4_K_M`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">For 64GB+ Macs:</h4>
                    <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto">
{`ollama pull deepseek-r1:32b-instruct-q4_K_M
ollama pull llama3.3:70b-instruct-q4_K_M
ollama pull qwq:32b-instruct-q4_K_M
ollama pull llama3.2-vision:11b-instruct-q4_K_M`}
                    </pre>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 id="complete-model-stack" className="text-2xl font-bold mb-4">3. Complete Model Stack for Mac (36GB Optimized)</h2>
                <div className="overflow-x-auto mb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model Name</TableHead>
                        <TableHead>Parameters</TableHead>
                        <TableHead>Best Use Case</TableHead>
                        <TableHead>Memory Requirements</TableHead>
                        <TableHead>Tips</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {modelStackData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.model}</TableCell>
                          <TableCell>{row.params}</TableCell>
                          <TableCell>{row.useCase}</TableCell>
                          <TableCell>{row.memory}</TableCell>
                          <TableCell className="text-sm">{row.tips}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-primary/10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Recommended Configuration Priority:</h4>
                  <ol className="space-y-2">
                    <li>1. <strong>DeepSeek-R1 14B</strong> + <strong>Qwen 2.5 Coder 7B</strong> (Core reasoning + coding)</li>
                    <li>2. <strong>Llama 3.2 Vision 11B</strong> (Add multimodal capabilities)</li>
                    <li>3. <strong>Mistral 7B</strong> (Lightweight backup for quick tasks)</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h2 id="best-practices" className="text-2xl font-bold mb-4">4. Mac + Ollama Best Practices</h2>
                
                <h3 id="environment-configuration" className="text-xl font-semibold mb-3">Optimal Environment Configuration</h3>
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto mb-4">
{`# Set environment variables for maximum performance
export OLLAMA_GPU_PERCENT="80"
export OLLAMA_MODELS="/path/to/fast/storage"
export OLLAMA_NUM_PARALLEL=1
export OLLAMA_FLASH_ATTENTION=1`}
                </pre>

                <h3 id="performance-optimization" className="text-xl font-semibold mb-3">Performance Optimization</h3>
                <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto mb-4">
{`# Optimal settings for reasoning tasks
ollama run deepseek-r1:14b --num-ctx 4096 --temperature 0.2 --top-p 0.9

# Coding task optimization
ollama run qwen2.5-coder:7b --num-ctx 8192 --temperature 0.3 --repeat-penalty 1.1

# Vision task configuration
ollama run llama3.2-vision:11b --keep-alive 15m --num-ctx 4096`}
                </pre>
              </section>

              <section className="mb-8">
                <h2 id="conclusion" className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your Mac is already a powerhouse AI machine — Ollama simply unlocks its potential. The combination of Mac Silicon's unified memory architecture and Ollama's intelligent model management creates a local AI experience that rivals cloud services while maintaining complete privacy and eliminating ongoing costs.
                </p>

                <div className="bg-accent/10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Key advantages you gain:</h4>
                  <ul className="space-y-2">
                    <li>• <strong>Save $200+ monthly</strong> on AI subscriptions</li>
                    <li>• <strong>Complete data privacy</strong> with zero cloud dependencies</li>
                    <li>• <strong>Unlimited usage</strong> without token counting or rate limits</li>
                    <li>• <strong>Superior performance</strong> leveraging Mac's optimized hardware</li>
                    <li>• <strong>Professional capabilities</strong> across coding, reasoning, and multimodal tasks</li>
                  </ul>
                </div>

                <p className="text-muted-foreground leading-relaxed mt-6">
                  Start with the recommended model stack for your Mac's RAM configuration, follow the optimization guidelines, and you'll have an enterprise-grade AI assistant that runs entirely on your device. The future of AI is local, private, and already sitting on your desk.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mt-4 italic">
                  Ready to build your local AI stack? Download Ollama today and reclaim control of your AI capabilities.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OllamaBlogPost;
