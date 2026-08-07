# Deep-Dive Playbook — ByteByteGo-style AI systems posts

A second content lane for aiengineerinsights.com, alongside the daily news/trend
posts. Modeled on how ByteByteGo (Alex Xu) scaled: not keyword-chasing, but
**visual-first, evergreen system deep-dives** that engineers share. Cadence:
~one per week. This lane plays to our strength — we already draw clean inline-SVG
architecture diagrams; here the **diagram is the product**, not decoration.

> Read this alongside CONTENT-AEO-PLAYBOOK.md. The AEO rules still apply
> (front-loaded answer, question headings, FAQ, cited sources). What's different
> here is topic selection, depth, and that the piece is built around a diagram.

---

## The three topic pillars

Pick topics from these — not from a search-volume tool.

### 1. Reconstruct a real-world AI system ("the inside look")
How a platform engineers actually built something at scale. Condense dense
engineering blogs / papers / talks into one digestible, diagrammed post.
- Format: "How Cursor loads codebase context", "How Perplexity builds a cited answer", "How ChatGPT serves inference at scale".
- Sources: official engineering blogs (OpenAI, Anthropic, Cursor, Perplexity, Meta/Uber/Netflix eng), papers (RAG, FlashAttention, PagedAttention/vLLM), conference talks. Cite them; synthesize, never copy.

### 2. AI-engineering interview / system-design patterns
The topics engineers cram 48h before a senior AI/ML system-design interview.
- Format: "Design a RAG system", "Design an LLM inference serving platform", "Design a multi-agent orchestrator", "Design an LLM gateway".
- Angle: requirements → high-level architecture → component deep-dive → scaling → trade-offs. The interview framing is the hook.

### 3. Deep trade-off comparisons
Experienced devs want architecture-level trade-offs, not definitions.
- Format: "vLLM vs TGI vs Ollama for serving", "Pinecone vs pgvector vs Weaviate", "RAG vs fine-tuning vs long-context", "LangGraph vs CrewAI vs Agent SDK".
- Angle: decision criteria + a comparison table + a clear "pick X when…" verdict.

---

## The format (what makes it a deep-dive, not a listicle)

1. **The diagram IS the centerpiece.** A detailed architecture / data-flow hero
   diagram showing the real components (LLM, vector DB, cache, queue, gateway,
   UI…) and how data moves between them. Build it as a rich inline SVG (same
   pattern as the hero diagrams in `src/components/*HeroDiagram.tsx`), and it
   doubles as the OG share card — the thing that makes it go viral on LinkedIn/X.
2. **Walk the data flow stage by stage.** Numbered request lifecycle: "request →
   gateway → retrieval → prompt assembly → inference → post-processing →
   response", each stage explained with the real engineering decision.
3. **Surface the hard trade-offs.** The decisions that separate a demo from
   production (cost, latency, consistency, failure modes). A comparison table
   where relevant.
4. **Front-loaded answer + question headings + FAQ + cited sources** (AEO
   playbook). Original synthesis of official sources; quote sparingly, attribute.
5. **Length/depth:** substantial (10–15 min). This lane is depth, not speed.

## Distribution (the growth loop, not just publish-and-wait)
- The hero diagram is designed to be posted **natively on LinkedIn and X** with a
  concise breakdown — that's the traction engine, not Google.
- Syndicate to **Hacker News, dev.to, and relevant subreddits** (r/MachineLearning,
  r/LocalLLaMA, r/cscareerquestions for the interview ones).
- Every post links into the career cluster (roadmap, salary) and offers a clear
  next step (subscribe / read next). Capture the visitor before they leave.

---

## Where to research from (authoritative sources)

Accuracy is the whole game — reconstruct from primary sources, never from other
blogs. Prefer, in order:

- **Vendor engineering blogs & docs:** OpenAI (openai.com/research, /news), Anthropic
  (anthropic.com/engineering, /research; code.claude.com/docs; platform.claude.com/docs),
  Google (research.google, blog.google/technology/ai, ai.google/discover), Meta AI
  (ai.meta.com/blog), Hugging Face (huggingface.co/blog), Cursor, Perplexity,
  LangChain/LlamaIndex/vLLM/Weaviate/Pinecone docs & blogs.
- **Papers:** arXiv (cs.AI/cs.CL/cs.LG), Papers with Code, and the canonical ones
  (RAG, FlashAttention, PagedAttention/vLLM, MoE, the lab model cards).
- **Practitioner deep-dives:** Simon Willison, Latent Space, Chip Huyen, sebastianraschka,
  eugeneyan — good for framing, but verify their claims against primary sources.
- **Talks:** AWS re:Invent, QCon, lab tech talks (for the "how they built it" detail).

Cross-check every load-bearing number against 2+ sources; attribute; synthesize,
never copy. If the primary source is thin, pick a different backlog topic rather
than guess.

## Topic backlog (pick the highest-value un-written one)

**Pillar 1 — Reconstruct real AI systems**
- How Cursor loads and ranks codebase context for its AI
- How Perplexity builds a cited answer (its RAG pipeline)
- How ChatGPT serves inference at scale (batching, KV cache, routing)
- How GitHub Copilot delivers low-latency completions
- How image models (Midjourney/SD) scale GPU inference queues
- How enterprise RAG works over private data (Glean/Notion-style)

**Pillar 2 — Interview / system-design patterns**
- Design a RAG system (the system-design-interview version)
- Design an LLM inference serving platform
- Design a multi-agent orchestration system
- Design an LLM gateway (routing, rate limits, fallback, cost, caching)
- Design a semantic search / vector database
- Design a real-time AI voice agent
- Design an evals + observability platform for LLMs

**Pillar 3 — Trade-off comparisons**
- vLLM vs TGI vs Ollama for LLM serving
- Pinecone vs pgvector vs Weaviate vs Qdrant
- RAG vs fine-tuning vs long-context — when to use which
- Fine-tuning vs LoRA/QLoRA vs prompt engineering
- LangGraph vs CrewAI vs the Claude/OpenAI Agents SDK
- Embedding models compared (OpenAI vs open-weight)

> When one is written, note it and pick the next. Prefer topics with strong
> official-source material (so the reconstruction is accurate) and a clean
> diagram (so it shares).
