import { ArrowLeft, Clock, User, Calendar, Scissors, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import RagChunkingHeroDiagram from "@/components/RagChunkingHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const strategyTable = [
  { strategy: "Fixed-size", how: "Split every N tokens/characters with a fixed overlap.", pros: "Simple, fast, predictable cost", cons: "Ignores structure — can cut a sentence or table row in half" },
  { strategy: "Recursive (LangChain default)", how: "Try paragraph breaks first, fall back to sentences, then words, then raw characters.", pros: "Keeps natural boundaries most of the time; no extra API calls", cons: "Chunk size still varies; can still split mid-idea occasionally" },
  { strategy: "Semantic", how: "Embed consecutive sentences and start a new chunk where similarity drops.", pros: "Chunks track topic shifts, not arbitrary length", cons: "Needs an embedding call per sentence at ingest time — slower, costs more" },
  { strategy: "Document-aware (Markdown/HTML/code)", how: "Split on structural units the format already provides — headings, functions, table rows.", pros: "Best fit for structured docs and code", cons: "Needs a format-specific splitter per source type" },
];

const sizeTable = [
  { size: "~50–100 tokens", effect: "Fragments — each chunk is often an incomplete thought", risk: "Retrieval returns pieces the generator can't answer from" },
  { size: "~200–500 tokens", effect: "Sweet spot for most prose — a self-contained idea per chunk", risk: "Still document-dependent; test against your own corpus" },
  { size: "~1000+ tokens", effect: "More context per chunk, but more irrelevant text riding along", risk: "Noisy retrieval dilutes precision and can push the answer off-topic" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is chunking in RAG?",
    a: "Chunking is splitting a source document into smaller pieces before embedding and storing them in a vector database. It matters because retrieval can only return whatever unit you indexed — if a chunk is too small it's an incomplete fragment, and if it's too large it buries the relevant sentence in irrelevant text, so how you chunk directly caps how good retrieval can ever be.",
  },
  {
    q: "What is the best chunk size for RAG?",
    a: "There's no universal number, but 200–500 tokens with roughly 10–20% overlap is a commonly cited starting point for prose. The right size depends on document type: code, tables, and long-form prose behave differently, so treat it as a hyperparameter to tune against your own eval set rather than a fixed rule.",
  },
  {
    q: "What is recursive chunking?",
    a: "Recursive chunking (LangChain's default text splitter) tries to split on the most meaningful boundary first — paragraph breaks — and only falls back to sentences, then words, then raw characters if a chunk is still too big. It keeps natural structure most of the time without requiring extra embedding calls at ingest time.",
  },
  {
    q: "What is semantic chunking?",
    a: "Semantic chunking embeds consecutive sentences and starts a new chunk when the similarity between them drops below a threshold, so boundaries track actual topic shifts instead of a fixed length. It typically retrieves more coherent chunks than fixed-size splitting, but costs an embedding call per sentence at ingestion time, which makes it slower and more expensive to index.",
  },
  {
    q: "Does chunk overlap matter?",
    a: "Yes — without overlap, information that falls exactly on a chunk boundary can be split across two chunks and effectively lost to retrieval, since neither chunk alone contains the full idea. A common starting point is overlap equal to about 10% of the chunk size; too much overlap just duplicates content and wastes storage and retrieval budget.",
  },
  {
    q: "How do I know if my chunking strategy is working?",
    a: "Measure it, don't guess — run retrieval evaluation (context precision and context recall) against a labeled eval set for each candidate chunking configuration and compare scores, the same way you'd evaluate any other RAG pipeline change. See our guide to RAG evaluation metrics for how to set that up.",
  },
];

const RagChunkingStrategiesPost = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-800 rounded-full px-3 py-1">
                  <Scissors className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">RAG & Retrieval</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                RAG Chunking Strategies: Fixed-Size vs Recursive vs Semantic (And How to Pick a Chunk Size)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Chunking caps what your retriever can ever find</strong> — split a document too small and you
                get incomplete fragments; too large and irrelevant text dilutes the match. This guide covers the four
                common chunking strategies (fixed-size, recursive, semantic, document-aware), what chunk size and
                overlap to start with, how each choice shows up in{" "}
                <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">retrieval evaluation scores</Link>,
                and the mistakes that quietly cap a RAG pipeline's ceiling before generation even runs.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-800 flex items-center justify-center flex-shrink-0">
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
                      Technical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Sep 28, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <RagChunkingHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is chunking in RAG?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In a{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">retrieval-augmented generation pipeline</Link>,
                  chunking is the step where a source document gets split into smaller pieces before each piece is
                  embedded and stored in a vector database. It happens before retrieval even starts, but it silently
                  caps what retrieval can ever return: the retriever can only hand back whatever unit you indexed, so
                  a badly chosen chunk boundary is a ceiling nothing downstream can fix (
                  <RefLink href="https://redis.io/blog/chunking-strategy-rag-pipelines">Redis — Chunking for RAG</RefLink>
                  ; <RefLink href="https://developer.ibm.com/articles/awb-enhancing-rag-performance-chunking-strategies">IBM Developer — Enhancing RAG performance with chunking</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The core trade-off is size. Chunks that are too small are incomplete fragments — a sentence like
                  "the transformer architecture was" carries no useful meaning on its own, and the model can't
                  construct a good answer from disconnected pieces. Chunks that are too large add noise: irrelevant
                  sentences ride along with the one that matters, diluting the match and sometimes pulling the
                  generator off-topic.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="strategies" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The four common chunking strategies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most RAG pipelines pick from four approaches, in roughly increasing order of sophistication and
                  ingestion cost (
                  <RefLink href="https://www.ibm.com/think/tutorials/chunking-strategies-for-rag-with-langchain-watsonx-ai">IBM — Chunking strategies for RAG with LangChain</RefLink>
                  ; <RefLink href="https://arxiv.org/pdf/2603.25333">Adaptive Chunking: Optimizing Chunking-Method Selection for RAG</RefLink>):
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Strategy</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">How it works</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Pros</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Cons</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {strategyTable.map((r) => (
                            <TableRow key={r.strategy}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.strategy}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.how}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.pros}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.cons}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Recursive chunking is the practical default</strong> for most teams: LangChain's{" "}
                  <code>RecursiveCharacterTextSplitter</code> tries paragraph breaks first, then sentences, then
                  words, then raw characters as a last resort, so it usually respects natural structure without
                  needing an embedding call at ingest time (
                  <RefLink href="https://developer.ibm.com/articles/awb-enhancing-rag-performance-chunking-strategies">IBM Developer</RefLink>
                  ; <RefLink href="https://medium.com/@adityaa9971/chunking-strategies-for-rag-why-how-you-split-your-documents-changes-everything-487a0d842769">Chunking Strategies for RAG — worked example</RefLink>).
                  Semantic chunking scores better on topic coherence in benchmarks but adds an embedding call per
                  sentence during ingestion, which is a real latency and cost trade-off worth measuring before
                  defaulting to it everywhere.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="RAG, agents, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="chunk-size" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What chunk size should I use?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  There's no universal number — the right size depends on your document type and query patterns — but
                  practitioner write-ups converge on <strong>200–500 tokens</strong> as a reasonable starting point
                  for general prose, with roughly <strong>10–20% overlap</strong> between adjacent chunks (
                  <RefLink href="https://medium.com/@adityaa9971/chunking-strategies-for-rag-why-how-you-split-your-documents-changes-everything-487a0d842769">Chunking Strategies for RAG</RefLink>
                  ; <RefLink href="https://developer.ibm.com/articles/awb-enhancing-rag-performance-chunking-strategies">IBM Developer — chunking guidelines</RefLink>).
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Chunk size</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Effect</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Risk</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sizeTable.map((r) => (
                            <TableRow key={r.size}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.size}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.effect}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.risk}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Overlap exists because a boundary can land in the middle of a fact — without it, that fact can be
                  split across two chunks and effectively lost to retrieval, since neither chunk alone contains it
                  intact. Too much overlap just duplicates content across chunks, wasting storage and retrieval
                  budget without adding coverage (
                  <RefLink href="https://medium.com/@adityaa9971/chunking-strategies-for-rag-why-how-you-split-your-documents-changes-everything-487a0d842769">Chunking Strategies for RAG — overlap section</RefLink>).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="doc-types" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Chunking different document types</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Prose / documentation.</strong> Recursive chunking on paragraph and sentence boundaries works well; semantic chunking is worth the extra cost for high-value, low-volume corpora.</li>
                    <li>• <strong>Code.</strong> Split on function/class boundaries where possible, not fixed character counts — a function cut in half is worse than a slightly oversized chunk.</li>
                    <li>• <strong>Tables.</strong> Fixed-size or naive splitting routinely breaks rows apart; keep each row (or a coherent group of rows) intact and consider serializing tables to a row-per-chunk format.</li>
                    <li>• <strong>Markdown/HTML.</strong> Use the format's own structure — headings, list items — as chunk boundaries before falling back to generic splitting.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the case for <strong>document-aware chunking</strong>: a splitter that understands the
                  source format's structure (Markdown headers, code AST, table rows) generally out-performs a
                  size-only splitter on the same corpus, because it aligns chunk boundaries with the boundaries the
                  format already gives you for free (
                  <RefLink href="https://www.ibm.com/think/tutorials/chunking-strategies-for-rag-with-langchain-watsonx-ai">IBM — Chunking strategies tutorial</RefLink>).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="measure" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to know if your chunking strategy is actually working</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Chunk size and strategy are hyperparameters — treat them like any other pipeline change and measure
                  the effect on retrieval, not just eyeball a few examples. Run the same eval set through each
                  candidate configuration and compare <strong>context precision</strong> and{" "}
                  <strong>context recall</strong> — the two retrieval-side metrics from RAGAS and similar frameworks —
                  since chunking only affects the retrieval half of the pipeline, not generation. See our{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">
                    guide to RAG evaluation metrics
                  </Link>{" "}
                  for how those scores are computed and what thresholds are commonly used.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A pattern worth adopting: rebuild the vector index with two or three chunk-size candidates
                  (e.g. 200, 400, 800 tokens) against the exact same source documents and the exact same eval
                  questions, then pick the configuration with the best context recall at the retrieval depth you
                  actually query with. A chunking change that looks good on paper but wasn't measured against your
                  own corpus is a guess, not a decision.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <TopmateCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://redis.io/blog/chunking-strategy-rag-pipelines">Redis — Chunking for RAG: Strategies, Tradeoffs &amp; Common Mistakes</RefLink></li>
                  <li>• <RefLink href="https://developer.ibm.com/articles/awb-enhancing-rag-performance-chunking-strategies">IBM Developer — Enhancing RAG Performance with Intelligent Chunking Strategies</RefLink></li>
                  <li>• <RefLink href="https://www.ibm.com/think/tutorials/chunking-strategies-for-rag-with-langchain-watsonx-ai">IBM — Chunking Strategies for RAG Tutorial (LangChain + Granite)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/pdf/2603.25333">Adaptive Chunking: Optimizing Chunking-Method Selection for RAG (arXiv)</RefLink></li>
                  <li>• <RefLink href="https://medium.com/@adityaa9971/chunking-strategies-for-rag-why-how-you-split-your-documents-changes-everything-487a0d842769">Chunking Strategies for RAG — Why How You Split Your Documents Changes Everything</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/rag-chunking-strategies" />
      <Footer />
    </div>
  );
};

export default RagChunkingStrategiesPost;
