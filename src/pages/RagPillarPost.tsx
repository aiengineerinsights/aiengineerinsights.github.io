import { ArrowLeft, Clock, User, Calendar, Database, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/components/SiteLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import ExploreWithAI from "@/components/ExploreWithAI";
import TableOfContents from "@/components/TableOfContents";
import RagPillarHeroDiagram from "@/components/RagPillarHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const paradigmRows = [
  { paradigm: "Naive RAG", flow: "Index → retrieve → generate, one pass, sequential", limitation: "No query rewriting or reranking; brittle on ambiguous or multi-hop questions" },
  { paradigm: "Advanced RAG", flow: "Adds pre-retrieval (query rewriting) and post-retrieval (reranking, compression) steps", limitation: "More moving parts to tune; still mostly a single retrieve-then-generate pass" },
  { paradigm: "Modular RAG", flow: "Interchangeable retriever/reranker/generator modules, orchestrated (sequential, iterative, conditional, parallel, hybrid)", limitation: "Highest flexibility and quality ceiling, but the most engineering to build and operate" },
];

const stackRows = [
  { layer: "Chunking", role: "Splits source documents into retrievable units", spoke: "/blog/rag-chunking-strategies", label: "RAG chunking strategies" },
  { layer: "Embedding model", role: "Turns text chunks and queries into comparable vectors", spoke: "/blog/embedding-model-for-rag", label: "Choosing an embedding model for RAG" },
  { layer: "Vector database", role: "Stores vectors and runs approximate nearest-neighbor search at query time", spoke: "/blog/vector-database-for-rag", label: "Picking a vector database for RAG" },
  { layer: "Generator (LLM)", role: "Produces the final answer from the query plus retrieved context", spoke: "/blog/rag-vs-fine-tuning", label: "RAG vs fine-tuning" },
  { layer: "Evaluation", role: "Measures retrieval precision/recall and answer faithfulness", spoke: "/blog/rag-evaluation-metrics", label: "RAG evaluation metrics" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is RAG in simple terms?",
    a: "RAG (Retrieval-Augmented Generation) is a way to make an LLM's answers more accurate by giving it relevant documents to read at the moment it answers, instead of relying only on what it memorized during training. The model retrieves the most relevant passages from a knowledge base, then generates its answer grounded in that retrieved text.",
  },
  {
    q: "Why does RAG reduce hallucinations?",
    a: "Because the model is answering from text placed directly in its context window rather than purely from parameters learned during training, it has a concrete source to draw from and can be asked to cite it. NIST's AI glossary and IBM both describe RAG's core value this way: it lets an LLM's knowledge be updated or corrected without retraining, which keeps answers closer to the actual source documents.",
  },
  {
    q: "Is RAG the same as fine-tuning?",
    a: "No. RAG changes what the model sees at inference time (retrieved context); fine-tuning changes the model's weights in a training run. They solve different problems and are often combined — see our full breakdown in RAG vs fine-tuning.",
  },
  {
    q: "What are the three core components of a RAG system?",
    a: "Academic surveys of RAG architecture (e.g. the 2024 'RAG for LLMs' survey and 2026's 'Survey on RAG Architectures and Applications') formalize RAG as three parts: retrieval (fetching relevant chunks for a query), generation (the LLM producing a response from query plus context), and augmentation (indexing, fine-tuning, and embedding refinements that improve the pipeline end to end).",
  },
  {
    q: "What's the difference between Naive, Advanced, and Modular RAG?",
    a: "Naive RAG is a single retrieve-then-generate pass. Advanced RAG adds pre-retrieval steps (query rewriting, routing) and post-retrieval steps (reranking, context compression) around that pass. Modular RAG goes further, treating retriever, reranker, and generator as swappable modules an orchestrator can run sequentially, iteratively, conditionally, or in parallel — the pattern most production agentic-RAG systems now use.",
  },
  {
    q: "Do I need a vector database to build RAG?",
    a: "You need some retrieval index — a vector database is the most common choice because it supports fast approximate nearest-neighbor search over embeddings, but keyword search (BM25) and hybrid retrieval (vector + keyword) are also valid and often outperform pure vector search on exact-term queries like product codes or names.",
  },
  {
    q: "How do I know if my RAG system is working well?",
    a: "Measure retrieval quality (precision/recall of the chunks returned, e.g. with metrics like context precision and context recall) separately from generation quality (faithfulness — does the answer actually match the retrieved context — and answer relevance). Our RAG evaluation metrics guide covers the frameworks (RAGAS and others) teams use for this.",
  },
];

const RagPillarPost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />

          <div className="flex-1 w-full max-w-none lg:max-w-4xl">
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 sm:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Insights</span>
              </Button>
            </Link>

            <header className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Database className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">RAG & Retrieval</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Retrieval-Augmented Generation (RAG): The Complete Guide for AI Engineers
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                RAG pairs an LLM with a retrieval system so it answers from your actual documents instead of guessing
                from memorized training data. This guide is the hub for everything on this site about RAG: how the
                pipeline works, the three architecture paradigms, every layer of the stack, and links to the deep
                dives on chunking, embeddings, vector databases, evaluation, and RAG vs fine-tuning.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Intermediate
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 28, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      9 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <RagPillarHeroDiagram />

            <div className="bg-muted/50 border-l-4 border-primary p-4 sm:p-6 rounded-lg mb-8 sm:mb-10">
              <p className="text-sm sm:text-base leading-relaxed m-0">
                <strong>TL;DR:</strong> RAG (Retrieval-Augmented Generation) retrieves relevant passages from an
                external knowledge base at inference time and feeds them to an LLM alongside the user's query, so
                the model's answer is grounded in current, inspectable sources rather than only its training weights.
                NIST and IBM both define it this way, and it's the standard first move for giving an LLM facts it
                wasn't trained on — see <RefLink href="https://csrc.nist.gov/glossary/term/retrieval_augmented_generation">NIST's AI glossary entry on RAG</RefLink> and{" "}
                <RefLink href="https://www.ibm.com/think/topics/retrieval-augmented-generation">IBM's RAG explainer</RefLink>.
              </p>
            </div>

            <ExploreWithAI path="/blog/retrieval-augmented-generation-guide" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is-rag" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. What Is RAG?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Retrieval-Augmented Generation connects an LLM to an external knowledge base at inference
                  time</strong>, so it can answer using information it was never trained on — your internal docs, a
                  live product catalog, this week's news. NIST's AI glossary formalizes it as "a type of GenAI system
                  in which a model is paired with a separate information retrieval system... RAG systems allow the
                  internal knowledge of a GenAI model to be modified without the need for retraining" (
                  <RefLink href="https://csrc.nist.gov/glossary/term/retrieval_augmented_generation">NIST AI 100-2e2025</RefLink>).
                  AWS describes the same mechanism from the engineering side: RAG "optimiz[es] the output of a large
                  language model, so it references an authoritative knowledge base outside of its training data
                  sources before generating a response" (
                  <RefLink href="https://aws.amazon.com/what-is/retrieval-augmented-generation/">AWS, What is RAG?</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In practice that means: no retraining to add a new fact, a citable source for every answer, and
                  knowledge that's current the moment you re-index a document — not frozen at a training cutoff.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-rag-works" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. How RAG Works, Step by Step</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A 2024 survey on RAG for LLMs and a newer 2026 architecture survey both formalize the same three
                  core components:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>
                      • <strong>Retrieval</strong> — the query is embedded into a vector and used to fetch the most
                      relevant document chunks from an index (vector store, keyword index, or hybrid of both).
                    </li>
                    <li>
                      • <strong>Augmentation</strong> — indexing strategy, chunking, query rewriting, and reranking
                      that improve what actually reaches the model.
                    </li>
                    <li>
                      • <strong>Generation</strong> — the LLM fuses the retrieved context with the original query to
                      produce a coherent, grounded answer.
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Sources: <RefLink href="https://arxiv.org/html/2312.10997v1">"Retrieval-Augmented Generation for
                  Large Language Models: A Survey" (arXiv 2312.10997)</RefLink> and{" "}
                  <RefLink href="https://arxiv.org/html/2610.01936v2">"A Survey on RAG Architectures and
                  Applications" (arXiv 2610.01936)</RefLink>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="naive-advanced-modular-rag" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Naive RAG vs. Advanced RAG vs. Modular RAG</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The same two surveys above independently converge on the same three-paradigm taxonomy for how RAG
                  systems have evolved:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Paradigm</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How It Flows</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Main Limitation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paradigmRows.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.paradigm}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.flow}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.limitation}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most production systems being built today — especially agentic ones — target Modular RAG: a
                  retriever, reranker, and generator as swappable pieces behind an orchestrator that can run
                  sequential, conditional, iterative, parallel, or hybrid retrieval depending on the query. The{" "}
                  <RefLink href="https://arxiv.org/html/2412.15529v4">XRAG benchmark paper (arXiv 2412.15529)</RefLink>{" "}
                  documents this shift and benchmarks the components involved.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="rag-stack" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. The RAG Stack: Every Layer, and Where to Go Deeper</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Each layer below is a real decision with real tradeoffs — this page is the hub; each row links to a
                  full spoke on that decision:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Layer</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Role</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Read Next</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stackRows.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{row.layer}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{row.role}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">
                                <Link to={row.spoke} className="text-primary hover:underline">{row.label}</Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <NewsletterSignup
                heading="Get a practical RAG build checklist"
                subtext="Chunking, embeddings, vector DB picks, and eval metrics on one page — free when you join. Plus one practical AI engineering email a week."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="when-to-use-rag" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. When Should You Use RAG?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  RAG is the right default when your knowledge changes often, you need to cite where an answer came
                  from, your knowledge base is large or proprietary, or you have no labeled training examples to
                  fine-tune with. It's the wrong tool when the problem is <em>behavior</em> — tone, refusal style, a
                  strict output format — rather than facts; that's a fine-tuning problem instead. We cover the full
                  decision framework, cost comparison, and the RAFT pattern that combines both in{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs. fine-tuning</Link>.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="explore-the-cluster" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. The Full RAG Guide: Every Spoke in One Place</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This page is the hub. Each guide below goes deep on one decision in building a RAG system:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                  <li>• <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs fine-tuning</Link> — which one solves your problem, and when to combine both</li>
                  <li>• <Link to="/blog/rag-chunking-strategies" className="text-primary hover:underline">RAG chunking strategies</Link> — how to split documents without destroying context</li>
                  <li>• <Link to="/blog/embedding-model-for-rag" className="text-primary hover:underline">Choosing an embedding model for RAG</Link> — dimensions, cost, and retrieval quality tradeoffs</li>
                  <li>• <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">Picking a vector database for RAG</Link> — the real differences between the popular options</li>
                  <li>• <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">RAG evaluation metrics</Link> — measuring retrieval and generation quality separately</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  RAG also underpins most practical{" "}
                  <Link to="/blog/what-is-mcp" className="text-primary hover:underline">agent tool-use via MCP</Link>{" "}
                  and{" "}
                  <Link to="/blog/ai-agent-memory" className="text-primary hover:underline">agent memory</Link>{" "}
                  designs — retrieval is the same mechanism whether the thing being retrieved is a document chunk or
                  a past conversation.
                </p>
              </section>

              <ExploreWithAI path="/blog/retrieval-augmented-generation-guide" variant="questions" />

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Frequently Asked Questions</h2>

                {faqs.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.q}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{item.a}</p>
                  </div>
                ))}
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="resources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Resources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://csrc.nist.gov/glossary/term/retrieval_augmented_generation">NIST AI glossary — Retrieval-Augmented Generation</RefLink></li>
                  <li>• <RefLink href="https://www.ibm.com/think/topics/retrieval-augmented-generation">IBM — What is RAG?</RefLink></li>
                  <li>• <RefLink href="https://aws.amazon.com/what-is/retrieval-augmented-generation/">AWS — What is RAG?</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/html/2312.10997v1">Retrieval-Augmented Generation for Large Language Models: A Survey (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/html/2610.01936v2">A Survey on RAG Architectures and Applications (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/html/2412.15529v4">XRAG: Benchmarking Foundational Components in Advanced RAG (arXiv)</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/retrieval-augmented-generation-guide" />
      <Footer />
    </div>
  );
};

export default RagPillarPost;
