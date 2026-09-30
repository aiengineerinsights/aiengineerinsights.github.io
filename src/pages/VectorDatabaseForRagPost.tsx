import { ArrowLeft, Clock, User, Calendar, Database, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import VectorDbRagHeroDiagram from "@/components/VectorDbRagHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const optionsTable = [
  { option: "pgvector", type: "Postgres extension (open source, PostgreSQL licence)", hosting: "Wherever your Postgres runs — self-hosted or any managed Postgres that ships the extension", best: "Teams already on Postgres who want vectors next to their relational data, with SQL joins and ACID transactions, without a second system" },
  { option: "Chroma", type: "Open-source vector database (Apache 2.0), embedded / local-first", hosting: "In-process with a persistent client, self-hosted server, or Chroma Cloud", best: "Prototyping and small-to-mid apps where a pip install and a local folder is the whole deployment story" },
  { option: "Qdrant", type: "Open-source vector database (Apache 2.0), written in Rust", hosting: "Self-host (Docker / Kubernetes) or Qdrant Cloud", best: "Production workloads that lean hard on metadata filtering alongside vector search, with an option to move to managed later" },
  { option: "Weaviate", type: "Open-source vector database (BSD-3-Clause) with a managed cloud", hosting: "Self-host or Weaviate Cloud", best: "Teams that want built-in hybrid (BM25 + vector) search and pluggable vectoriser modules out of the box" },
  { option: "Milvus", type: "Open-source vector database (Apache 2.0), LF AI & Data project", hosting: "Milvus Lite (pip), Standalone (Docker), Distributed (Kubernetes), or Zilliz Cloud", best: "Large-scale deployments that need a distributed architecture and a wide choice of index types, including disk- and GPU-based ones" },
  { option: "Pinecone", type: "Fully managed, closed-source vector database", hosting: "Managed service only — no self-host option", best: "Teams that want zero infrastructure to run and are comfortable with a vendor-hosted, proprietary store" },
];

const chromaExample = `import chromadb

# 1. Persistent client: vectors are stored on disk at ./rag_db and survive restarts
client = chromadb.PersistentClient(path="./rag_db")

# 2. A collection is a named index. Chroma embeds documents with its
#    default embedding function unless you pass embedding_function=...
collection = client.get_or_create_collection(name="docs")

# 3. Chunks from your chunking step (one string per chunk)
chunks = [
    "pgvector adds a vector type plus HNSW and IVFFlat indexes to Postgres.",
    "Chroma can run in-process with a persistent client, no server needed.",
    "Qdrant is an open-source vector database written in Rust.",
]

# 4. Add: each chunk is embedded, indexed, and stored with an id and metadata
collection.add(
    ids=[f"chunk-{i}" for i in range(len(chunks))],
    documents=chunks,
    metadatas=[{"source": "notes.md", "chunk": i} for i in range(len(chunks))],
)

# 5. Query: the question is embedded the same way, then the top-k nearest
#    chunks come back. 'where' applies an optional metadata filter.
results = collection.query(
    query_texts=["Which option runs inside Postgres?"],
    n_results=2,
    where={"source": "notes.md"},
)

for doc, dist in zip(results["documents"][0], results["distances"][0]):
    print(f"{dist:.3f}  {doc}")`;

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What is a vector database in RAG?",
    a: "A vector database is the store that holds the embeddings of your document chunks and answers nearest-neighbour queries against them. In a RAG pipeline it sits between chunking and generation: at ingest time each chunk is embedded and written to the database with an id and metadata, and at query time the user's question is embedded with the same model and the database returns the top-k most similar chunks, which become the context the language model answers from.",
  },
  {
    q: "Do I need a vector database for RAG?",
    a: "Not always. For small-to-mid scale — up to a few million vectors — pgvector inside Postgres is often enough, especially if you already run Postgres and want vectors next to your relational data. A dedicated vector database earns its place when you need to scale beyond what a single Postgres node handles comfortably, when you rely heavily on metadata filtering combined with vector search, or when you want hybrid (keyword plus vector) search and finer control over the ANN index.",
  },
  {
    q: "What is the best open-source vector database?",
    a: "There is no single winner — it depends on where you are. Chroma is the easiest to start with because it runs in-process from a pip install and persists to a local folder, which makes it ideal for local development and prototyping. Qdrant, Weaviate, and Milvus are all open-source options built for self-hosted production: Qdrant is known for filtering alongside vector search, Weaviate for built-in hybrid search and vectoriser modules, and Milvus for a distributed architecture and a wide choice of index types. Pick based on your deployment model and the features you will actually use, not on a leaderboard.",
  },
  {
    q: "Is pgvector good enough for RAG?",
    a: "Yes, for many production applications. pgvector adds a vector column type, exact nearest-neighbour search by default, and HNSW and IVFFlat indexes for approximate search, and it inherits Postgres transactions, joins, and backups. It is a strong choice up to millions of vectors, particularly if you are already on Postgres. The caveats are that ANN index build time and memory (especially for HNSW) grow with the table, and that scaling beyond one node is a Postgres scaling problem rather than a vector-database feature, so very large or very filter-heavy workloads may be better served by a dedicated store.",
  },
  {
    q: "Chroma vs Pinecone: which should I use for RAG?",
    a: "They solve different problems. Chroma is open source and local-first: it runs in-process with a persistent client, so it is great for development, prototyping, and small self-hosted apps, and it also offers a server mode and a managed cloud. Pinecone is a fully managed, closed-source service: you never run infrastructure, it scales without you operating anything, and in return you accept a proprietary store and a vendor dependency. Use Chroma to build and iterate; move to Pinecone (or a managed tier of an open-source database) when you want someone else to run production.",
  },
  {
    q: "How do I know if my vector database is returning good results?",
    a: "Measure retrieval directly rather than judging the final answers by eye. Build a small eval set of questions with the chunks that should be retrieved, then compute context precision (how much of what was retrieved is relevant) and context recall (how much of what was relevant was retrieved) for each configuration — index type, top-k, filters, embedding model. Our guide to RAG evaluation metrics covers how those scores are computed. The database choice only matters to the extent that retrieval quality you can measure improves.",
  },
];

const VectorDatabaseForRagPost = () => {
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
                  <Database className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">RAG & Retrieval</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Vector Databases for RAG: How to Choose One and Wire It In (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>The vector database is the one component of a RAG pipeline you can't skip</strong> — but
                you may not need a dedicated one. This guide explains what a vector database for RAG actually does,
                when pgvector inside Postgres is enough, how the main open-source and managed options compare
                (Chroma, Qdrant, Weaviate, Milvus, Pinecone), a minimal working example with Chroma, and how to
                check the retrieval it returns is any good using{" "}
                <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">retrieval evaluation metrics</Link>.
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
                      Sep 30, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <VectorDbRagHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What a vector database does in a RAG pipeline</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In a{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">retrieval-augmented generation pipeline</Link>,
                  the vector database is the store that sits between your{" "}
                  <Link to="/blog/rag-chunking-strategies" className="text-primary hover:underline">chunking step</Link>{" "}
                  and the language model. It does two jobs. At <strong>ingest time</strong>, each chunk is run
                  through an embedding model to produce a vector, and that vector is written to the database
                  together with an id, the original text, and whatever metadata you attach (source file, section,
                  tenant, date). At <strong>query time</strong>, the user's question is embedded with the same
                  model, and the database returns the top-k stored vectors closest to it under a distance metric
                  such as cosine, inner product, or L2. Those k chunks are the "context" that gets pasted into the
                  prompt.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The part that makes a vector database more than a table with a float array column is the
                  <strong> approximate nearest-neighbour (ANN) index</strong>. Exact search compares the query
                  against every stored vector, which is fine for thousands of chunks and painful for millions. ANN
                  indexes like HNSW (a graph-based index) and IVFFlat (a clustering-based index) trade a little
                  recall for a large speed-up, and every option in this guide is built around one or more of them (
                  <RefLink href="https://github.com/pgvector/pgvector">pgvector README — indexing</RefLink>
                  ; <RefLink href="https://qdrant.tech/documentation/concepts/indexing/">Qdrant docs — indexing</RefLink>).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two consequences follow. First, the database can only return what you indexed, so chunking
                  quality caps retrieval quality before the database is ever involved. Second, the database's
                  filtering and index behaviour directly shape what "top-k" means in practice — which is why the
                  choice matters more than "it stores vectors" suggests.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="do-you-need" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Do you actually need a dedicated vector database?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the decision most teams get wrong in one of two directions: either they stand up a new
                  distributed system for a corpus of ten thousand chunks, or they bolt vectors onto an existing
                  database and only discover its limits under production filtering load. The honest answer is that
                  <strong> a Postgres extension is enough for a lot of RAG apps</strong>, and a dedicated database
                  earns its place under specific, nameable conditions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>The case for pgvector.</strong> pgvector adds a <code>vector</code> column type to
                  Postgres, performs exact nearest-neighbour search by default (perfect recall), and lets you add
                  an HNSW or IVFFlat index for approximate search when the table grows. It supports L2, inner
                  product, and cosine distance, and — because it is just Postgres — you keep ACID transactions,
                  joins against your existing tables, point-in-time recovery, and every client library you already
                  use (<RefLink href="https://github.com/pgvector/pgvector">pgvector README</RefLink>). If your
                  chunks live next to the rows they came from, a single <code>SELECT ... ORDER BY embedding
                  &lt;=&gt; $1 LIMIT 10</code> with a <code>WHERE</code> clause on tenant or document id is a
                  complete retrieval layer with no second system to operate.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <p className="font-semibold mb-2 text-sm sm:text-base">A dedicated vector database earns its keep when:</p>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Scale.</strong> Your vector count is heading past what a single Postgres node's memory and HNSW build time handle comfortably, and you need horizontal sharding or a distributed deployment designed around vectors (Milvus's distributed mode, for example — <RefLink href="https://milvus.io/docs">Milvus docs</RefLink>).</li>
                    <li>• <strong>Filtering at scale.</strong> Most real queries combine "nearest to this vector" with "and only from this tenant / date range / document type". Dedicated databases design their ANN index around payload filtering so the filter doesn't collapse recall; Qdrant's filterable HNSW is the canonical example (<RefLink href="https://qdrant.tech/documentation/concepts/filtering/">Qdrant docs — filtering</RefLink>).</li>
                    <li>• <strong>Hybrid search.</strong> You want keyword (BM25) and vector scores fused in one query, which Weaviate ships natively (<RefLink href="https://weaviate.io/developers/weaviate/search/hybrid">Weaviate docs — hybrid search</RefLink>). In Postgres you can combine <code>tsvector</code> full-text search with pgvector, but you are assembling the fusion yourself.</li>
                    <li>• <strong>Index tuning.</strong> You need to pick between HNSW, IVF, product quantisation, disk-based, or GPU indexes per collection and tune them independently of the rest of your database workload.</li>
                    <li>• <strong>Zero ops.</strong> Nobody on the team wants to run or tune a database at all, and a managed service is worth the vendor dependency.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If none of those apply yet, start with pgvector (or Chroma for a local prototype) and keep the
                  retrieval interface behind a thin function, so swapping the store later is a contained change
                  rather than a rewrite.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="options" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The main options compared</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Below are the six options that come up in almost every "best vector database for RAG"
                  conversation. The table sticks to documented characteristics — licence, hosting model, and what
                  each is designed for — rather than benchmark rankings, which vary wildly with dataset,
                  dimensionality, filter selectivity, and hardware.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Option</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Type</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Hosting</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best for</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {optionsTable.map((r) => (
                            <TableRow key={r.option}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.option}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.type}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.hosting}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.best}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A few details worth knowing beyond the table. <strong>Chroma</strong> can run entirely
                  in-process (ephemeral or persisted to a directory) or as a client-server deployment, and its
                  query API supports metadata filters via <code>where</code> and document-text filters via{" "}
                  <code>where_document</code> (<RefLink href="https://docs.trychroma.com/">Chroma docs</RefLink>).{" "}
                  <strong>Qdrant</strong> stores a JSON "payload" alongside each vector and supports sparse vectors
                  and quantisation to shrink memory (<RefLink href="https://qdrant.tech/documentation/">Qdrant docs</RefLink>).{" "}
                  <strong>Weaviate</strong> offers HNSW, flat, and dynamic index types plus vectoriser modules that
                  call an embedding provider for you at import time (<RefLink href="https://weaviate.io/developers/weaviate">Weaviate docs</RefLink>).{" "}
                  <strong>Milvus</strong> exposes the broadest index menu — FLAT, IVF variants, HNSW, DiskANN, and
                  GPU indexes — and three deployment modes from a pip-installable Lite to a Kubernetes cluster (<RefLink href="https://milvus.io/docs">Milvus docs</RefLink>).{" "}
                  <strong>Pinecone</strong> is serverless and managed only, with namespaces for tenant isolation
                  and metadata filtering on query (<RefLink href="https://docs.pinecone.io/">Pinecone docs</RefLink>).
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="RAG, agents, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="open-source-vs-managed" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Open source vs managed: the real trade-off</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Five of the six options above are open-source vector databases or extensions, and four of those
                  (Chroma, Qdrant, Weaviate, Milvus via Zilliz) also sell a managed cloud tier. That makes the
                  choice less "open source vs managed" than "who runs it, and what do you give up either way".
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Self-hosting an open source vector database</strong> gives you control over index
                  parameters, data locality (the vectors never leave your VPC), and predictable infrastructure
                  cost at steady load. The price is operations: you own upgrades, backups, replication, memory
                  sizing for HNSW graphs, and re-indexing when you change embedding models. For a team that
                  already runs Postgres or Kubernetes this is often marginal work; for a two-person team shipping
                  a product it can be the largest single chunk of non-feature effort.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>A managed service</strong> — Pinecone, or the cloud tier of an open-source option —
                  removes that operational load entirely and usually scales without a re-architecture. What you
                  give up is control and portability: index internals are the vendor's, cost scales with usage
                  rather than with hardware, and migrating out means re-embedding or bulk-exporting your corpus.
                  Choosing a managed tier of an <em>open-source</em> database keeps an exit hatch open, since the
                  same API is available self-hosted; a closed-source service does not.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A reasonable rule: prototype on something you can run locally, and make the self-host vs
                  managed call when you know your actual query volume, filter patterns, and who will be on-call.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="example" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">A minimal vector database example for RAG (Chroma)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Here is the entire chunk → embed → store → query loop using the Chroma vector database, because
                  it needs nothing but <code>pip install chromadb</code> and runs in-process. The same four calls —
                  create a client, get a collection, add documents, query — map almost one-to-one onto every
                  other option in this guide (<RefLink href="https://docs.trychroma.com/">Chroma docs — getting started</RefLink>).
                </p>
                <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto text-xs sm:text-sm mb-4 sm:mb-6">
                  <code>{chromaExample}</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Three things to notice. <strong>You never called an embedding model directly</strong> — Chroma
                  applies a default embedding function to <code>documents</code> on both <code>add</code> and{" "}
                  <code>query</code>, and you can swap in OpenAI, Sentence Transformers, or your own function by
                  passing <code>embedding_function=</code> when you create the collection. Whatever you choose,
                  ingest and query must use the same model or the distances are meaningless.{" "}
                  <strong>Metadata is not optional in practice</strong> — the <code>where</code> filter is how you
                  scope retrieval to a tenant, a document, or a date range, and it is the feature you will lean on
                  most as the corpus grows. <strong>The distances come back with the documents</strong>, which is
                  what you will log when you start measuring retrieval quality in the next section.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Swapping this for pgvector means a <code>CREATE EXTENSION vector</code>, a table with a{" "}
                  <code>vector(n)</code> column, an <code>INSERT</code> per chunk, and an{" "}
                  <code>ORDER BY embedding &lt;=&gt; query_vector LIMIT k</code> query — with the embedding call
                  done in your own code (<RefLink href="https://github.com/pgvector/pgvector">pgvector README</RefLink>).
                  For Qdrant, Weaviate, Milvus, and Pinecone the shape is the same: a client, a
                  collection/index, an upsert of vectors plus payload, and a search with a filter.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="choosing" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to choose: a decision guide by stage</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Prototype / local development.</strong> Chroma with a persistent client, or pgvector if you already have Postgres running. Optimise for iteration speed — you will change chunking and embedding models several times, and re-indexing a local store is free.</li>
                    <li>• <strong>Already on Postgres, up to millions of vectors.</strong> pgvector with an HNSW index. You get joins against your application data, one backup story, and no new system. Revisit when index build time, memory, or filtered-query recall becomes a measurable problem rather than a hypothetical one.</li>
                    <li>• <strong>Production with heavy metadata filtering or hybrid search.</strong> Qdrant (filterable HNSW, payloads, sparse vectors), Weaviate (native hybrid search, vectoriser modules), or Milvus (distributed deployment, wide index choice). All three are open source, so you can self-host now and move to their managed cloud later without changing the client code.</li>
                    <li>• <strong>Zero-ops, willing to accept a vendor.</strong> Pinecone, or the managed tier of one of the open-source databases. Pick the managed tier of an open-source option if you want the ability to self-host later; pick Pinecone if you never intend to.</li>
                    <li>• <strong>Very large scale (hundreds of millions of vectors and up).</strong> Milvus Distributed or a managed service designed for that scale. This is the only tier where a dedicated distributed architecture is a requirement rather than a preference.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Whatever you pick, put the retrieval call behind a single function that takes a query string and
                  filter and returns chunks with scores. Every option here fits that interface, and it is the
                  difference between a one-afternoon migration and a week of untangling.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="measure" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to know your vector DB retrieval is actually good</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The database returns top-k vectors by distance — that is a mechanical guarantee, not a quality
                  one. Whether those k chunks are the <em>right</em> chunks depends on the embedding model, the
                  chunking, the index's recall at your settings, and how well filters interact with the index.
                  None of that is visible from the query response, so treat the store the way you'd treat any
                  other pipeline component: hold everything else constant and measure retrieval.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The two retrieval-side metrics to track are <strong>context precision</strong> (of the chunks
                  returned, how many were relevant) and <strong>context recall</strong> (of the chunks that were
                  relevant, how many were returned), computed against a labelled eval set of questions and their
                  expected source chunks. Frameworks such as RAGAS implement both (
                  <RefLink href="https://docs.ragas.io/">RAGAS docs</RefLink>), and our{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">
                    guide to RAG evaluation metrics
                  </Link>{" "}
                  walks through how they're calculated and what thresholds teams commonly use.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Two database-specific checks are worth adding. First, compare ANN recall against exact search on
                  a sample: pgvector lets you drop the index (or raise <code>hnsw.ef_search</code>) and re-run the
                  same query to see how much recall the index is costing you (<RefLink href="https://github.com/pgvector/pgvector">pgvector README — query options</RefLink>);
                  Qdrant and the others expose equivalent search-time parameters. Second, re-run your eval set with
                  your most selective production filter applied — a store that scores well unfiltered and badly
                  filtered is telling you something important about how its index handles that filter. A vector
                  database is only as good as the retrieval quality you can measure through it.
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
                  <li>• <RefLink href="https://github.com/pgvector/pgvector">pgvector — Open-source vector similarity search for Postgres (GitHub README)</RefLink></li>
                  <li>• <RefLink href="https://docs.trychroma.com/">Chroma — Documentation</RefLink></li>
                  <li>• <RefLink href="https://qdrant.tech/documentation/">Qdrant — Documentation</RefLink></li>
                  <li>• <RefLink href="https://qdrant.tech/documentation/concepts/indexing/">Qdrant — Indexing concepts</RefLink></li>
                  <li>• <RefLink href="https://qdrant.tech/documentation/concepts/filtering/">Qdrant — Filtering concepts</RefLink></li>
                  <li>• <RefLink href="https://weaviate.io/developers/weaviate">Weaviate — Documentation</RefLink></li>
                  <li>• <RefLink href="https://weaviate.io/developers/weaviate/search/hybrid">Weaviate — Hybrid search</RefLink></li>
                  <li>• <RefLink href="https://milvus.io/docs">Milvus — Documentation</RefLink></li>
                  <li>• <RefLink href="https://docs.pinecone.io/">Pinecone — Documentation</RefLink></li>
                  <li>• <RefLink href="https://docs.ragas.io/">RAGAS — Documentation (context precision and context recall)</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/vector-database-for-rag" />
      <Footer />
    </div>
  );
};

export default VectorDatabaseForRagPost;
