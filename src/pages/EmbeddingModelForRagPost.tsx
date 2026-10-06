import { ArrowLeft, Clock, User, Calendar, BarChart3, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import EmbeddingModelHeroDiagram from "@/components/EmbeddingModelHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const shortlistTable = [
  { model: "OpenAI text-embedding-3-large", type: "API", dims: "3072 (reducible)", context: "8,192 tokens", notes: "Strong general-purpose default, widely documented" },
  { model: "Voyage voyage-3-large", type: "API", dims: "1024 (256-2048)", context: "32,000 tokens", notes: "Long-context, asymmetric query/document prefixes" },
  { model: "Cohere Embed v4", type: "API", dims: "256-1536", context: "~128,000 tokens", notes: "Multimodal (text + images), int8/binary output" },
  { model: "Google Gemini Embedding", type: "API", dims: "128-3072", context: "2,048 tokens", notes: "100+ languages, task_type for query vs document" },
  { model: "BAAI BGE-M3", type: "Open (MIT)", dims: "1024", context: "8,192 tokens", notes: "Dense + sparse + multi-vector in one self-hosted model" },
  { model: "Qwen3-Embedding-8B", type: "Open (Apache-2.0)", dims: "32-4096", context: "32,000 tokens", notes: "Strong multilingual MTEB scores, self-hosted" },
];

const tradeoffTable = [
  { axis: "Retrieval quality", why: "MTEB/BEIR scores are a shortlist signal, not a verdict for your corpus", risk: "Leaderboard winner can lose on your own eval set" },
  { axis: "Dimensions", why: "Directly drives vector database storage and query cost", risk: "A 3072-dim model costs 3x the storage of a 1024-dim one at the same corpus size" },
  { axis: "Max context", why: "Caps how big a chunk can be before silent truncation", risk: "512-token models truncate long chunks without erroring" },
  { axis: "Price / self-hosting", why: "API models bill per token; open models need GPU ops", risk: "Cheaper per-call can still cost more at scale than self-hosting" },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is an embedding model in RAG?",
    a: "An embedding model turns a chunk of text (or a query) into a fixed-length numerical vector such that semantically similar text ends up close together in vector space. In a RAG pipeline it runs at two points — once when documents are ingested into the vector database, and again on every user query — and the quality of that vector is what the retrieval step searches over, so a weak embedding model caps retrieval quality before generation ever runs.",
  },
  {
    q: "What is the best embedding model for RAG?",
    a: "There is no single best model — it depends on your corpus, language, chunk length, and budget. A reasonable 2026 shortlist is OpenAI text-embedding-3-large or Voyage voyage-3-large for English-heavy API use, Cohere Embed v4 or Gemini Embedding for multilingual or multimodal needs, and BGE-M3 or Qwen3-Embedding for self-hosted open-weight deployments. Treat the shortlist as a starting point and validate on your own labeled queries before committing.",
  },
  {
    q: "Do embedding dimensions matter for RAG?",
    a: "Yes — dimensions drive vector database storage and query cost directly, since every vector the database stores and searches is that many floats. Higher-dimensional embeddings are not automatically better retrieval; several current models support dimension reduction (e.g. via Matryoshka representation learning) so you can test lower dimensions against your own eval set before paying for the largest option.",
  },
  {
    q: "Should ingest and query use the same embedding model?",
    a: "Always. Vectors produced by two different embedding models are not comparable in the same vector space, so mixing models between ingestion and query silently breaks retrieval. The same applies to the input_type or task_type convention some models use to distinguish a query from a document — use it consistently or skip it consistently.",
  },
  {
    q: "API embedding model or self-hosted?",
    a: "API models (OpenAI, Voyage, Cohere, Gemini) need no infrastructure and get frequent updates, at the cost of per-token pricing and an external dependency on every ingest and query call. Self-hosted open-weight models (BGE-M3, Qwen3-Embedding) avoid that recurring cost and keep data in-house, but require GPU capacity and ops work. Teams with strict data-residency requirements or very high query volume are the ones where self-hosting usually pays off.",
  },
  {
    q: "How do I evaluate embedding models for my own RAG pipeline?",
    a: "Hold chunking and the vector database constant, embed the same corpus with two or three candidate models, and measure context precision and context recall against a hand-labeled set of 30-100 of your own queries. This routinely overturns the public MTEB leaderboard order because leaderboards average across tasks that are not yours. See our guide to RAG evaluation metrics for how those scores are computed.",
  },
];

const EmbeddingModelForRagPost = () => {
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
                  <Boxes className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">RAG & Retrieval</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                How to Choose an Embedding Model for RAG (2026 Guide)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>The embedding model decides what retrieval can ever find</strong> — not the MTEB leaderboard
                topper, but the model that best fits your corpus, chunk length, language mix, and budget. This guide
                covers what an embedding model actually does, the four trade-offs that matter (quality, dimensions,
                context length, price), a 2026 shortlist of API and open-weight models, and how to validate the
                choice on your own{" "}
                <Link to="/blog/rag-chunking-strategies" className="text-primary hover:underline">chunks</Link>{" "}
                instead of a public benchmark.
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
                      Oct 5, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      9 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <EmbeddingModelHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What does an embedding model actually do?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An embedding model maps text into a fixed-length numerical vector such that semantically similar
                  text lands close together in that vector space — "cardiac arrest" and "heart attack" end up near
                  each other, while "cardiac arrest" and "car arrest" don't, despite sharing letters. In a{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">retrieval-augmented generation pipeline</Link>,
                  every document chunk is embedded once at ingest time and stored in a{" "}
                  <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">vector database</Link>;
                  every user query is embedded with the same model at query time, and nearest-neighbour search
                  returns the chunks whose vectors are closest to the query's vector.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most RAG retrieval is <strong>asymmetric</strong>: a short question needs to retrieve a longer
                  passage that answers it. Several embedding models handle this with separate query/document input
                  conventions rather than treating both the same way.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tradeoffs" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Four things to trade off when picking a model</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The MTEB leaderboard is a shortlist tool, not a verdict — its own authors note no single method
                  dominates across tasks, and BEIR has shown dense retrievers losing to plain keyword search (BM25)
                  out of domain. Four axes decide the real-world choice:
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Axis</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Why it matters</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Risk if ignored</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tradeoffTable.map((r) => (
                            <TableRow key={r.axis}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.axis}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.why}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.risk}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="RAG, agents, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="shortlist" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2026 shortlist: API and open-weight models</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Filter the universe by whether you need to self-host, need multilingual or multimodal input, or
                  just want a strong English-only default with zero ops work (
                  <RefLink href="https://ragstackguide.com/posts/best-embedding-model-for-rag">RAG Stack Guide — Best Embedding Model for RAG 2026</RefLink>
                  ; <RefLink href="https://heycc.cn/en/posts/choosing-an-embedding-model-2026">How to Choose an Embedding Model in 2026</RefLink>):
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Model</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Type</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Dimensions</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Max context</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shortlistTable.map((r) => (
                            <TableRow key={r.model}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.model}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.type}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.dims}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.context}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Prices and exact dimension options change often — treat this table as a shortlist to validate,
                  not a final answer, and check each vendor's current docs before committing (
                  <RefLink href="https://teachyou.ai/blog/embedding-model-selection">TeachYou.ai — How to Choose an Embedding Model for RAG in 2026</RefLink>
                  ; <RefLink href="https://dev.to/dublecc/how-to-choose-an-embedding-model-in-2026-rag-semantic-search-3jij">dev.to — How to Choose an Embedding Model in 2026</RefLink>).
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="validate" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to validate the choice on your own corpus</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Before committing, hand-label 30-100 of your own queries with the chunk(s) that should be
                  retrieved, embed your corpus with two or three candidate models, and measure{" "}
                  <strong>recall@k</strong> or context recall for each. This takes an afternoon and routinely
                  overturns the public leaderboard order, because a leaderboard averages across someone else's tasks
                  (<RefLink href="https://dev.to/dublecc/how-to-choose-an-embedding-model-in-2026-rag-semantic-search-3jij">dev.to — the blunt rule</RefLink>
                  ; <RefLink href="https://medium.com/@ravindranathporandlaedu/how-to-choose-a-vector-embedding-model-for-rag-a-practical-guide-a94552527c97">Medium — How to Choose a Vector Embedding Model for RAG</RefLink>).
                  See our{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">guide to RAG evaluation metrics</Link>{" "}
                  for how context precision and context recall are computed.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Ingest and query must use the same model.</strong> Vectors from two different models are not comparable in the same space — mixing them silently breaks retrieval.</li>
                    <li>• <strong>Use the model's input_type/task_type convention consistently.</strong> Query vs document prefixes exist precisely because RAG retrieval is asymmetric.</li>
                    <li>• <strong>Test lower dimensions before paying for the largest option.</strong> Several current models support Matryoshka-style dimension reduction (e.g. 256 or 512 instead of 3072) at a small, measurable quality cost and a large storage saving.</li>
                    <li>• <strong>Re-embedding the whole corpus is required to switch models</strong> — budget for that migration cost before swapping mid-project, not after.</li>
                  </ul>
                </div>
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
                  <li>• <RefLink href="https://teachyou.ai/blog/embedding-model-selection">TeachYou.ai — How to Choose an Embedding Model for RAG in 2026</RefLink></li>
                  <li>• <RefLink href="https://ragstackguide.com/posts/best-embedding-model-for-rag">RAG Stack Guide — Best Embedding Model for RAG: How to Choose in 2026</RefLink></li>
                  <li>• <RefLink href="https://dev.to/dublecc/how-to-choose-an-embedding-model-in-2026-rag-semantic-search-3jij">dev.to — How to Choose an Embedding Model in 2026 (RAG &amp; Semantic Search)</RefLink></li>
                  <li>• <RefLink href="https://medium.com/@ravindranathporandlaedu/how-to-choose-a-vector-embedding-model-for-rag-a-practical-guide-a94552527c97">Medium — How to Choose a Vector Embedding Model for RAG: A Practical Guide</RefLink></li>
                  <li>• <RefLink href="https://heycc.cn/en/posts/choosing-an-embedding-model-2026">heycc.cn — How to Choose an Embedding Model in 2026</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/embedding-model-for-rag" />
      <Footer />
    </div>
  );
};

export default EmbeddingModelForRagPost;
