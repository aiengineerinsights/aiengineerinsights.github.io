# Note: How the X Algorithm Works (2026) and How We Leverage It

A working note for distributing aiengineerinsights.com content on X. Grounded in
the open-sourced algorithm plus current teardowns. Read with
CONTENT-DISTRIBUTION-PLAYBOOK.md — that's the channel plan; this is the ranking
mechanics behind it.

> One-line takeaway: X now ranks with an LLM that *understands* your post, and the
> highest-value signal by far is **a reply that makes the author reply back**.
> So write substantive, on-topic posts that start a conversation you're present
> for — not link-drops that farm likes.

---

## 1. How it's actually built (2026)

X open-sourced the recommendation system at `github.com/xai-org/x-algorithm`
(Jan 2026, updated roughly every 4 weeks). It's a **full rewrite from the old
Scala stack into Rust + Python** (~63% Rust), and the ranking brain changed kind,
not just code:

- **Old (2023): "Heavy Ranker"** — a ~48M-param neural net scoring hand-picked
  engagement features with fixed weights.
- **New (2026): "Phoenix"** — an **LLM ranker built on the same transformer
  architecture as Grok**. Instead of hand-tuned features, it reads the content and
  predicts engagement/value. Practical effect: **semantic understanding of the post
  matters now**, and pure follower-graph tricks matter less.

The pipeline is still three stages:

1. **Candidate sourcing** — ~500M daily posts pruned to ~1,500 candidates per user,
   split between in-network (who you follow) and out-of-network (ML discovery via
   embeddings/graph). This is why a good post can escape your follower count.
2. **Ranking (Phoenix)** — the transformer predicts how valuable each candidate is
   for that user and orders them.
3. **Filtering** — dedupe, drop blocked/muted/low-quality/negative-flagged content,
   enforce author diversity and safety.

## 2. The signal hierarchy (what to optimize for)

Exact weights are from the open-source drop + analyst teardowns — treat as
**direction, not gospel** (Phoenix's internals aren't fully exposed). The ordering
is consistent across sources:

| Signal | Rough value vs a like | Why it matters |
|---|---|---|
| **Reply that the author replies back to** | ~75–150× | The single strongest signal. Conversation the author joins. |
| **Reply** | ~13.5–27× | Conversation > vanity. Phoenix weights discussion heavily. |
| **Bookmark** | high (serious-interest) | "I'll come back to this" = reference-grade content. Our sweet spot. |
| **Profile click** | high | Signals you're worth following, not just this post. |
| **Retweet / repost** | ~1–20× | Real distribution, but below conversation. |
| **Dwell time / video watch** | measured precisely | LLM can measure attention; long looks = quality. Diagrams win here. |
| **Like** | 1× (baseline, cheapest) | Nice, nearly worthless for ranking. |
| **Negative (Not-interested / mute / block / report)** | ~ **−74×**, and recent flags filter the post | Catastrophic. One "not interested" undoes dozens of likes. |

Two consequences fall straight out of this table:
- **Likes are noise. Replies-with-reply-back and bookmarks are the game.**
- **Never risk a negative.** Off-topic bait, rage-farming, and link-spam draw
  mutes/not-interested that nuke reach for ~14 days.

## 3. What the LLM (Phoenix) shift changes for us

Because ranking now *reads* the post:

- **Substance beats gaming.** Coherent, genuinely informative posts get understood
  and surfaced; keyword-stuffing and engagement-bait read as low-value.
- **Topical consistency builds an entity.** Posting consistently about AI
  engineering / agents / RAG teaches the model what we're about, improving
  out-of-network targeting to the right readers. Drift dilutes it.
- **Out-of-network is winnable.** A strong standalone post (self-contained diagram,
  clear claim) travels beyond followers because Phoenix can judge it on merit.
- **Threads are dwell machines.** Multi-post, diagram-led threads hold attention —
  exactly the signal the LLM measures well.

## 4. How we leverage it — concrete levers

Mapped to what we already make (diagram-per-post, tables, cited claims):

1. **Engineer for the reply-back.** End the hook or thread with a real, answerable
   question ("Which would you run — the control plane or the learning runtime?").
   Then **be present the first 60–90 minutes and reply to every early comment.** The
   author reply-back is the top signal; we control it.
2. **Design for bookmarks.** Reference-grade beats hot-take for us. A clean
   comparison table, a "pick X when…" decision list, an architecture diagram = the
   stuff people save. Our posts are already built this way — say "bookmark this"
   only when it's genuinely reference material.
3. **Lead with the diagram, hold the dwell.** Native image (never a bare link in the
   hook — links suppress reach and cut dwell). The hero PNG we already generate is
   the attention magnet.
4. **Thread the deep-dives.** One post per data-flow stage / comparison row. Put the
   link in a reply at the end, not the first post.
5. **Stay on-topic, every time.** Keep the account semantically "AI engineering."
   Consistency compounds in an LLM ranker more than in the old one.
6. **Borrow candidate sourcing.** Thoughtful replies under bigger in-niche accounts
   (@swyx, @simonw, @rasbt, lab accounts) put us in their out-of-network pools.
7. **Never trip a negative.** No cross-posting identical text, no reply-bait, no
   off-niche hijacks. One mute cluster costs more than ten likes earn.

## 5. Per-post checklist (operational)

Before posting any thread/card:
- [ ] Hook is the answer/number/tension — not "new blog post" (50% of effort here).
- [ ] Native diagram attached; no link in the first post.
- [ ] Ends with a genuine question to invite replies.
- [ ] Contains something save-worthy (table, checklist, diagram) → earns bookmarks.
- [ ] On-niche (AI engineering/agents/RAG/LLMs).
- [ ] I'm free for the next ~90 min to reply to every comment.
- [ ] Link is in a reply, and the CTA is one clear next step.

## 6. Honest caveats

- Phoenix is an LLM; its exact scoring isn't fully public. The weights above are
  from the open-source code and third-party analysis — directionally reliable, not
  precise constants. Re-check against our own analytics once we're posting.
- The repo updates ~monthly; specifics drift. The *principles* (conversation >
  likes, negatives are lethal, dwell/bookmarks matter, semantic on-topic content
  wins) have been stable across versions and are the safe things to build on.
- No shortcuts survive an LLM ranker for long. The durable strategy is the boring
  one: consistent, on-topic, genuinely useful posts we show up to discuss.

## Sources
- `github.com/xai-org/x-algorithm` — the open-sourced 2026 (Phoenix/Grok) recommendation code
- `github.com/twitter/the-algorithm` + igorbrigadir/awesome-twitter-algo — the 2023 Heavy Ranker, annotated
- 2026 X-algorithm teardowns (SocialPilot, Sprout Social, OpenTweet, Teract) — signal weights, Phoenix rewrite, three-stage pipeline
