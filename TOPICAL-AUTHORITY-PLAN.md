# Topical Authority Plan — Hermes & AI Engineering

How we go from "a page that ranks" to "the source Google and the answer engines
trust on this topic." Read with CONTENT-AEO-PLAYBOOK.md (on-page answer quality)
and CONTENT-DISTRIBUTION-PLAYBOOK.md (off-site reach). This doc is the *map*: what
to cover, how to link it, and in what order.

> Definition we're building toward: topical authority = **comprehensive coverage of
> a topic cluster + tight internal linking + a consistent entity + off-site
> citations.** No single post earns it; the cluster does.

---

## 1. The five levers (what actually moves authority)

1. **Coverage (breadth × depth).** Own every sub-question of the topic, each on its
   own well-answered page. Gaps are where competitors out-rank us.
2. **Hub-and-spoke internal linking.** One pillar page per topic links to every
   spoke; every spoke links back to the pillar and to 1–2 sibling spokes. This is
   the highest-ROI SEO lever we're currently under-using.
3. **Entity consistency (E-E-A-T).** Same author identity, same naming, machine-
   readable `Person`/`Organization` schema with `sameAs` links. Teaches Google/LLMs
   *who* the authority is.
4. **Off-site citations.** Backlinks + being referenced on HN/Reddit/dev.to + being
   cited by answer engines. Authority is partly conferred, not just claimed.
5. **Freshness + consistency.** Regular publishing on the same topics compounds; the
   LLM-based rankers (search and X's Phoenix) key on a consistent semantic identity.

## 2. The Hermes cluster (our beachhead — win this first)

We already rank for Hermes with heavy impressions. Convert that into a full cluster.

**Pillar (hub):** `/blog/hermes-agent-nous-research-guide` — upgrade it into the
canonical "everything about Hermes Agent" page that links out to every spoke below.

**Spokes to write** (each maps to real GSC / keyword demand we already see):

| Spoke | Captures (revealed demand) | Status |
|---|---|---|
| How to Install Hermes Agent (Win/Mac/Linux, pip, Docker) | install.ps1, pip package, docker, windows, "official install" | **next — highest** |
| Hermes Agent vs OpenClaw | hermes vs openclaw (~2.9k/mo) | ✅ done |
| Hermes Agent Skills: how self-improving skills work | self-improving ai agent, skills | to write |
| Hermes Desktop & Web UI guide | hermes desktop (3.6k), hermes-webui (1k), dashboard | to write |
| Which LLM to run with Hermes (models) | hermes models (390) | to write |
| Hermes Agent security & sandboxing | (differentiator + agentic-security link) | to write |
| Hermes Agent alternatives | "hermes alternative", OpenClaw + others | to write |
| Hermes Agent troubleshooting / common errors | support-intent long tail | to write |

Note: many Hermes queries are **navigational toward the official docs** ("official
documentation nous research github"). We won't win pure-navigational clicks — don't
chase those. Win the informational/how-to/comparison slices, which we can own.

## 3. The AI-engineering topic map (the broader territory)

Hermes is one cluster inside our real subject: **AI engineering.** Organize the whole
site as pillars → spokes so authority accrues to the domain, not just one post.

- **AI Agents** (pillar: "what makes LLMs agentic") → Hermes cluster, OpenClaw, A2A,
  multi-agent orchestration, agent memory, MCP, agent frameworks compared.
- **RAG & retrieval** (pillar to write) → RAG vs fine-tuning, vector DB comparisons,
  chunking, evals — none written yet; a clear gap.
- **LLM deployment / MLOps** (pillar: mlops-best-practices) → deployment challenges,
  data pipelines, inference serving, cost optimization.
- **Agentic security** (pillar to write) → HuggingFace breach, bug-bounty AI slop,
  sandbox escapes, prompt injection.
- **AI-engineering careers** (pillar: roadmap) → salary, forward-deployed engineer,
  CCA exam + traps. (Already our strongest-linked cluster.)
- **AI tooling / context engineering** → GrapeRoot, Claude Code, coding agents.

Each pillar: a comprehensive page that links to all its spokes; each new post gets
slotted under a pillar and cross-linked on publish.

## 4. Internal linking rules (do this on every post)

- Every spoke links **up** to its pillar and to **1–2 sibling spokes** in the same
  cluster, with descriptive anchor text (not "click here" — use the target's topic).
- The pillar links **down** to every spoke (a living index).
- Add contextual in-body links, not just a related-posts footer. `RelatedPosts.tsx`
  already does same-tag grouping — keep tags accurate so clusters form automatically.
- Retro-fit: when a new spoke ships, add a link to it from the pillar and older
  siblings (not just forward links). This is where most sites leave authority on the
  table.

## 5. Entity / E-E-A-T (make the authority machine-readable)

- **One consistent author identity** everywhere: "Gurram Poorna Prudhvi — Lead AI
  Engineer." Never vary it.
- **`Person` schema with `sameAs`** pointing to the author's X, LinkedIn, and GitHub
  (once those exist — see distribution playbook). This links the site's expertise to
  a real, verifiable person — a core E-E-A-T signal, especially for LLM rankers.
- **Consistent entity naming.** Always "Hermes Agent (Nous Research)" on first use,
  so search/LLMs bind our pages to the right entity and disambiguate from Hermès /
  Hermes the LLM family (we already do this — keep it).
- Keep the author page (`/authors`) current and specific about the AI-engineering
  focus and experience.

## 6. Off-site authority (authority is partly conferred)

- **Get cited, not just linked.** Syndicate to HN / dev.to / relevant subreddits
  (distribution playbook); each pickup is a citation trail back to the pillar.
- **A public diagram repo** (à la ByteByteGo's `system-design-101`): publish our hero
  diagrams on GitHub with links back. It attracts stars, backlinks, and reuse — pure
  authority accrual for the AI-engineering entity.
- **Answer-engine citations** (AEO playbook): the front-loaded-answer + cited-sources
  format is what gets us quoted by ChatGPT/Perplexity/Google AI — the modern version
  of a backlink.
- **Consistent X/LinkedIn presence** on the same topics reinforces the entity across
  the web, which the LLM rankers correlate.

## 7. Sequencing (prioritize by revealed demand, not guesses)

1. **Finish the Hermes cluster** — it's where we already have impressions and the
   lowest difficulty. Start with the Install how-to (highest transactional demand),
   then Skills, then Desktop/Web-UI.
2. **Convert existing posts into explicit pillars** and back-link the clusters (a
   one-time internal-linking pass — cheap, high ROI).
3. **Fill the obvious gap: a RAG pillar + spokes** — high-demand AI-engineering
   territory we don't cover at all yet.
4. **Stand up the entity signals** (author sameAs schema) once the social accounts
   exist.
5. Let `data/gsc-intent.md` re-order everything weekly — write next whatever has
   impressions but no strong page.

## 8. How to measure it's working

- Striking-distance queries in `data/gsc-intent.md` moving up (pos 10 → 3) and
  starting to get clicks.
- More queries per page (a page ranking for a topic, not one keyword) — the signature
  of topical authority.
- Appearing in answer-engine citations for cluster questions.
- New posts indexing and ranking *faster* than old ones (earned domain trust).

## Sources / basis
- Our own `data/gsc-intent.md` (revealed Hermes + AI-engineering demand)
- CONTENT-AEO-PLAYBOOK.md (§4 reverse-engineering intent), CONTENT-DEEPDIVE-PLAYBOOK.md,
  CONTENT-DISTRIBUTION-PLAYBOOK.md, X-ALGORITHM-NOTE.md
