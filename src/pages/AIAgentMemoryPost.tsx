import { ArrowLeft, Clock, User, Calendar, Brain, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import AgentMemoryHeroDiagram from "@/components/AgentMemoryHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";
import ExploreWithAI from "@/components/ExploreWithAI";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

const toolsTable = [
  { tool: "Mem0", arch: "Extraction pipeline: an LLM call pulls facts out of each conversation turn and stores them with embeddings; retrieval fuses semantic, keyword (BM25), and entity matching", os: "Open source (Apache-2.0 library/server) plus a managed cloud platform", best: "Drop-in user/session/agent memory for assistants and chatbots — add a search+write call around any existing LLM call" },
  { tool: "Letta (MemGPT)", arch: "Agent self-edits its own memory via tool calls: fixed \"core memory\" blocks stay in the prompt, \"archival\" memory is a vector store the agent queries, \"recall\" memory is the full message log", os: "Open source (Apache-2.0), runs as a self-hosted FastAPI+Postgres server with a hosted cloud option", best: "Long-running assistants that need to decide for themselves what to keep in context vs. page out to storage" },
  { tool: "Zep (Graphiti)", arch: "Builds a temporal knowledge graph from conversation and business data: entities and relationships as graph edges, each with a validity window, so contradicted facts are invalidated rather than overwritten", os: "Graphiti (the graph engine) is open source; Zep itself is a managed/enterprise memory service built on it", best: "Agents where relationships and how facts changed over time matter — not just \"what is true now\"" },
  { tool: "LangMem", arch: "A library of memory primitives (semantic, episodic, procedural) on top of LangGraph's long-term memory store; memories are JSON documents under a namespace, written either inline (\"hot path\") or by a background extractor", os: "Open source, part of the LangChain/LangGraph ecosystem", best: "Teams already building on LangGraph who want memory tools and a store wired into the same framework, not a separate service" },
];

const faqs = [
  {
    q: "What is agent memory in AI?",
    a: "Agent memory is how an AI agent keeps and reuses information beyond what fits in a single prompt. Short-term memory is the context window for the current session — managed with sliding windows and summarization — and long-term memory persists across sessions, usually in a vector store, a knowledge graph, or both, so the agent can recall relevant facts about a user or task without re-reading its entire history.",
  },
  {
    q: "What is the difference between short-term and long-term memory in AI agents?",
    a: "Short-term memory is the model's context window for the current conversation: it holds recent turns and disappears when the session ends or the window fills up, so it's managed with sliding windows and summarization/compression. Long-term memory is stored outside the context window — typically as embeddings in a vector database or facts in a knowledge graph — and is retrieved and injected back into the prompt only when relevant, which is what lets an agent remember a user across days or sessions.",
  },
  {
    q: "Do AI agents need long-term memory, or is a big context window enough?",
    a: "A bigger context window helps but doesn't substitute for memory: cramming everything into the prompt is expensive, slow, and research on long-context models (e.g. the \"lost in the middle\" findings) shows retrieval quality over a huge context degrades, it doesn't just get free. Long-term memory earns its place when an agent needs to recall facts across sessions, personalize to a specific user, or keep straight which facts changed over time — things a stateless context window can't do no matter how large it is.",
  },
  {
    q: "What is the difference between RAG and agent memory?",
    a: "RAG retrieves from a mostly static external knowledge corpus — docs, a wiki, a codebase — that the agent didn't create. Agent memory is built from the agent's own interactions: facts extracted from conversations, user preferences, and task history, which get written as the agent runs, not pre-indexed ahead of time. Mechanically they often look the same (embed, store, retrieve by similarity), and a production agent typically uses RAG for domain knowledge and a memory layer for personalization and continuity, side by side.",
  },
  {
    q: "What is Mem0 used for?",
    a: "Mem0 is an open-source memory layer you drop into an existing LLM application: it extracts facts from conversation turns with an LLM call, stores them with embeddings, and exposes a search call you run before generating a response so the model sees relevant prior facts. It is aimed at adding user/session memory to assistants and chatbots without building a memory pipeline from scratch.",
  },
  {
    q: "What is Letta (MemGPT) and how is it different from Mem0?",
    a: "Letta is the productized successor to the MemGPT research project. Its defining idea is that the agent itself edits its memory through tool calls — it decides what stays in a fixed \"core memory\" block in the prompt versus what gets paged out to an \"archival\" vector store it can query. That's a different bet from Mem0, where an extraction pipeline (not the agent) decides what to remember; Letta runs as a self-hostable server rather than a library you call.",
  },
  {
    q: "What is a knowledge graph for agent memory, and when do I need one?",
    a: "A knowledge-graph memory stores facts as entities and relationships (e.g. \"Alice — works at — Acme\") instead of unstructured text chunks, and a temporal implementation like Graphiti timestamps each relationship so a later contradicting fact invalidates the old one instead of silently overwriting it. Reach for it when relationships between entities matter and you need to answer \"what was true then\" as well as \"what's true now\" — a vector store alone can tell you a fact is similar to your query, but not whether it's still valid.",
  },
];

const chromaMemoryExample = `# A minimal long-term memory layer: embed, store, retrieve.
# Swap chromadb for Mem0/Letta/Zep's SDK and the shape is the same.
import chromadb
from openai import OpenAI

client = chromadb.PersistentClient(path="./agent_memory")
memory = client.get_or_create_collection(name="user_facts")
llm = OpenAI()

def extract_facts(conversation_turn: str) -> list[str]:
    # One LLM call: pull out durable facts worth remembering.
    # ("User prefers concise answers", "User's timezone is IST", ...)
    resp = llm.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"Extract durable facts worth remembering, one per line:\\n{conversation_turn}",
        }],
    )
    return [f.strip("- ") for f in resp.choices[0].message.content.splitlines() if f.strip()]

def remember(conversation_turn: str, user_id: str):
    for fact in extract_facts(conversation_turn):
        memory.add(
            ids=[f"{user_id}-{hash(fact)}"],
            documents=[fact],
            metadatas=[{"user_id": user_id}],
        )

def recall(query: str, user_id: str, k: int = 3) -> list[str]:
    results = memory.query(query_texts=[query], n_results=k, where={"user_id": user_id})
    return results["documents"][0]

# At response time: pull relevant facts into the system prompt before calling the LLM.
relevant = recall("What does this user prefer?", user_id="u1")
system_prompt = "Known facts about the user:\\n" + "\\n".join(relevant)`;

const AIAgentMemoryPost = () => {
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
                  <Brain className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Agents</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Agent Memory: Short-Term vs Long-Term, and How to Actually Implement It (2026)
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>A context window is not memory — it's working space that disappears when the session ends.</strong>{" "}
                Short-term memory means managing that window with sliding windows and summarization; long-term memory
                means persisting facts outside it, in a vector store, a knowledge graph, or both, so an agent can recall
                a user or task across sessions. This guide covers what agent memory actually is, how Mem0, Letta
                (MemGPT), Zep (Graphiti), and LangMem each implement it, a working code example, and when you need
                long-term memory versus when{" "}
                <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG or context alone</Link>{" "}
                is enough.
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
                      Oct 14, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      12 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <AgentMemoryHeroDiagram />

            <div className="bg-muted/50 border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <p className="font-semibold mb-2 text-sm sm:text-base">TL;DR</p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Agent memory splits into two layers: <strong>short-term</strong> (the context window, kept in bounds
                with sliding windows and summarization) and <strong>long-term</strong> (facts persisted outside the
                window and retrieved on demand, via a vector store, a knowledge graph, or both). Mem0 extracts and
                embeds facts automatically; Letta (MemGPT) lets the agent self-edit tiered memory blocks; Zep/Graphiti
                stores facts as a temporal knowledge graph that tracks when things changed; LangMem adds memory
                primitives on top of LangGraph's store. Use RAG/context alone for single-session tasks; reach for
                long-term memory once an agent needs to persist across sessions or personalize to a user.
              </p>
            </div>

            <ExploreWithAI path="/blog/ai-agent-memory" variant="strip" />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-is" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What is AI agent memory, and why isn't a context window enough?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An{" "}
                  <Link to="/blog/what-are-ai-agents" className="text-primary hover:underline">AI agent</Link>{" "}
                  runs a loop — perceive, plan, act, observe — and every one of those steps needs to know what
                  happened before. The context window is where that information lives during a single call, but it
                  is bounded, and it is <em>not</em> memory in any durable sense: close the session, or push enough
                  new turns through it, and anything not actively re-sent is gone. That's the problem agent memory
                  solves — giving an agent a way to keep and recall information that outlives any single context
                  window.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The useful split, used across the tools in this guide, is <strong>short-term memory</strong> (how
                  you manage what's inside the current context window) versus <strong>long-term memory</strong>{" "}
                  (what's persisted outside it and pulled back in only when relevant). A big context window makes
                  the short-term side more forgiving, but it doesn't replace the long-term side — an agent with a
                  1M-token window still has no way to recall a fact from a session that ended yesterday unless
                  something wrote that fact down somewhere it can search later.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="short-term" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Short-term memory: managing the context window</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Short-term memory is about keeping the current conversation inside the model's context limit
                  without losing what matters. Three patterns do most of the work:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Sliding window.</strong> Keep only the most recent N turns and drop the rest. Simple and cheap, but anything outside the window is simply gone — no recall, no summary.</li>
                    <li>• <strong>Summarization / compression.</strong> Periodically ask an LLM to compress older turns into a shorter summary, then keep the summary plus recent raw turns. This is how LangGraph's checkpointing and most production chat agents handle long sessions — it trades detail for token budget.</li>
                    <li>• <strong>Structured scratchpad / tiered blocks.</strong> Letta's "core memory" is the sharpest version of this: a small set of named, size-limited blocks (e.g. <code>human</code>, <code>persona</code>) that stay in the prompt at all times, which the agent itself edits with tool calls rather than a background process deciding for it.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  All three are still working <em>inside</em> the context window — they decide what's in it, not
                  where information goes once it falls out. That's where long-term memory comes in.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="long-term" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Long-term memory: vector retrieval, knowledge graphs, and hybrids</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Long-term memory persists facts outside the context window and retrieves only what's relevant to
                  the current turn, the same retrieve-then-inject shape as{" "}
                  <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">RAG</Link>. Two
                  storage approaches dominate:
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Vector-based retrieval.</strong> Facts (often extracted from raw conversation by an LLM call, as Mem0 does) are embedded and stored; at query time the agent embeds its question and retrieves the nearest facts by similarity. Good at "what does this remind me of," weak at representing how facts relate to each other or when they changed.</li>
                    <li>• <strong>Knowledge graphs.</strong> Facts are stored as entities and relationships — an edge, not a blob of text. Zep's open-source engine, Graphiti, adds a <em>temporal</em> layer: each edge carries a validity window, so when a new fact contradicts an old one, the old edge is invalidated rather than silently overwritten, and the agent can query "what was true on date X" as well as "what's true now" (<RefLink href="https://arxiv.org/html/2501.13956v1">Rasmussen et al., "Zep: A Temporal Knowledge Graph Architecture for Agent Memory," arXiv 2025</RefLink>).</li>
                    <li>• <strong>Hybrid retrieval.</strong> Several of these tools don't pick one mechanism — Mem0's newer releases fuse semantic (vector), keyword (BM25), and entity-match scoring, and Graphiti combines vector similarity, full-text search, and graph traversal into one ranked result, because no single signal catches everything a query might need.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The common thread across all of them: write happens continuously as the agent runs (not as a
                  one-time ingest like a RAG corpus), and read happens selectively — only the facts relevant to the
                  current turn get pulled back into the context window.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="tools" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Mem0 vs Letta vs Zep vs LangMem: how they compare</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  These four show up constantly in agent-memory discussions, and they take genuinely different bets
                  on who decides what gets remembered.
                </p>
                <div className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg mx-4 sm:mx-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Tool</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Architecture</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Open source?</TableHead>
                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Best-fit use case</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {toolsTable.map((r) => (
                            <TableRow key={r.tool}>
                              <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4">{r.tool}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.arch}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.os}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{r.best}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>Mem0</strong> is a library/server you call around an existing LLM app — install it, call{" "}
                  <code>add()</code> after a turn and <code>search()</code> before the next response, and an
                  extraction pipeline decides what's worth keeping (<RefLink href="https://github.com/mem0ai/mem0">Mem0 GitHub README</RefLink>).{" "}
                  <strong>Letta</strong>, the productized successor to the MemGPT research project, instead gives the
                  agent itself the tools to edit its own memory blocks and decide what stays in context vs. gets
                  paged to an archival store (<RefLink href="https://github.com/letta-ai/letta">Letta GitHub repository</RefLink>). <strong>Zep</strong>'s
                  differentiator is time: its open-source Graphiti engine builds a bi-temporal knowledge graph so
                  facts that change don't just get overwritten — the history is queryable (
                  <RefLink href="https://help.getzep.com/graphiti/getting-started/overview">Graphiti documentation</RefLink>
                  ). <strong>LangMem</strong> is the lightest-weight of the four if you're already in the
                  LangChain/LangGraph ecosystem: it's a set of memory primitives and tools (
                  <code>create_manage_memory_tool</code>, <code>create_search_memory_tool</code>) wired into
                  LangGraph's existing long-term memory store rather than a separate service (
                  <RefLink href="https://github.com/langchain-ai/langmem">LangMem GitHub repository</RefLink>;{" "}
                  <RefLink href="https://docs.langchain.com/oss/python/langchain/long-term-memory">LangChain docs — long-term memory</RefLink>
                  ).
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Agent memory, RAG, agents, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="implement" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to implement a basic memory layer</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  You don't need any of the tools above to get the core pattern working. A minimal long-term memory
                  layer is three functions: extract facts from a turn, store them with embeddings, and retrieve the
                  relevant ones before the next response. Here it is with Chroma, the same way our{" "}
                  <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">vector database for RAG</Link>{" "}
                  guide builds the retrieval side:
                </p>
                <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto text-xs sm:text-sm mb-4 sm:mb-6">
                  <code>{chromaMemoryExample}</code>
                </pre>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Three things worth noting. <strong>Extraction is its own LLM call</strong> — you're not embedding
                  the raw conversation, you're asking a model to decide what's durable first, which is exactly what
                  Mem0's pipeline does under the hood. <strong>Writes are scoped</strong> — every fact carries a{" "}
                  <code>user_id</code> in its metadata, the same pattern pgvector or any filtered vector search uses,
                  so one user's facts never leak into another's retrieval. <strong>Retrieval happens before
                  generation</strong>, not during it — the facts get folded into the system prompt, not fetched by
                  the model mid-answer, which keeps the pattern simple to reason about and test.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Moving from this to Mem0, Letta, or Zep mainly swaps who does the extraction and what the store
                  looks like underneath — a graph instead of flat vectors for Zep, agent-driven tool calls instead of
                  a background pipeline for Letta — but the write → embed/structure → retrieve → inject loop stays
                  the same.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="when" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">When do you actually need long-term memory vs RAG/context alone?</h2>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>• <strong>Context/RAG alone is enough</strong> when the task is single-session — a research assistant answering questions about a fixed document set doesn't need to remember you personally, it needs good retrieval over that corpus.</li>
                    <li>• <strong>Reach for long-term memory</strong> when the agent needs to persist across sessions: a personal assistant that should remember your preferences next week, a support bot that shouldn't make the customer re-explain their issue, or any agent whose facts genuinely change over time (a user's role, a project's status).</li>
                    <li>• <strong>Reach specifically for a knowledge graph</strong> over flat vector memory when relationships between entities matter to the answer, or when you need to reason about <em>when</em> something became true, not just whether it's similar to the query.</li>
                    <li>• <strong>Most production agents end up hybrid:</strong> RAG for static domain knowledge, short-term context management for the live conversation, and a long-term memory layer for anything that should outlive the session.</li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  See our{" "}
                  <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs fine-tuning guide</Link>{" "}
                  for the adjacent decision of whether to retrieve knowledge at all versus bake it into model
                  weights — memory is a third axis on top of that, about what persists from the agent's own
                  interactions rather than from a static corpus.
                </p>
              </section>

              <ExploreWithAI path="/blog/ai-agent-memory" variant="questions" />

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
                  <li>• <RefLink href="https://github.com/mem0ai/mem0">Mem0 — GitHub repository and README</RefLink></li>
                  <li>• <RefLink href="https://github.com/letta-ai/letta">Letta (formerly MemGPT) — GitHub repository</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/html/2501.13956v1">Rasmussen et al. — "Zep: A Temporal Knowledge Graph Architecture for Agent Memory" (arXiv, 2025)</RefLink></li>
                  <li>• <RefLink href="https://help.getzep.com/graphiti/getting-started/overview">Graphiti — official documentation</RefLink></li>
                  <li>• <RefLink href="https://github.com/langchain-ai/langmem">LangMem — GitHub repository</RefLink></li>
                  <li>• <RefLink href="https://docs.langchain.com/oss/python/langchain/long-term-memory">LangChain docs — long-term memory</RefLink></li>
                  <li>• <RefLink href="https://www.langchain.com/blog/langmem-sdk-launch">LangChain — LangMem SDK launch post (memory types)</RefLink></li>
                  <li>• <RefLink href="https://docs.trychroma.com/">Chroma — documentation</RefLink></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/ai-agent-memory" />
      <Footer />
    </div>
  );
};

export default AIAgentMemoryPost;
