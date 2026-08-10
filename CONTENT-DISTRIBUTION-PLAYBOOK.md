# Content Distribution Playbook — aiengineerinsights.com

We already produce the hard part: original, diagrammed, cited posts. This lane is
about getting each one in front of people on the channels where our niche
actually hangs out — so the same asset earns 5–10× the reach. Read alongside
CONTENT-AEO-PLAYBOOK.md (search/answer engines) and CONTENT-DEEPDIVE-PLAYBOOK.md
(the ByteByteGo-style visual deep-dives). Publishing to the site is step one, not
the finish line.

> Thesis: our unfair advantage is the **hero diagram**. It's already built for
> every post, it already rasterizes to a 1200×630 card, and a strong technical
> diagram is the single most shareable unit on X and LinkedIn. Lead distribution
> with the picture, not the link.

---

## 1. What the niche rewards (evidence, not vibes)

From how comparable technical brands grew (see Sources) — directional, since live
follower counts are gated and these come from secondary analyses:

- **Visual-first wins.** ByteByteGo (Alex Xu) reached ~334k subscribers in under
  two years off diagram threads; his first breakout was a single "how HTTPS works"
  diagram. The diagram *is* the content; the caption is the wrapper.
- **LinkedIn is underrated for us.** For ByteByteGo, LinkedIn drove ~half of social
  traffic — more than X. We currently do neither; LinkedIn is the bigger miss.
- **Threads → PDF/carousel → newsletter** is the compounding ladder. Tweets become
  a carousel, carousels become a lead magnet, the audience becomes a list you own.
- **2026 X algorithm rewards conversation, not spikes.** 50 thoughtful replies beat
  500 empty likes. Consistency compounds: creators posting most weeks saw multiples
  more engagement than sporadic posters. Half your writing time goes to the hook.
- **Borrowed reach beats cold reach.** A thoughtful reply under an account 10× your
  size puts you in front of their whole audience. A small pod of mutual sharers
  multiplies first-hour distribution (the window the algorithm scores).

## 2. Channel priority (where each post goes)

1. **LinkedIn (primary growth engine).** Native image post: the hero diagram +
   a 120–200 word breakdown + one link in the first comment (not the body — links
   in-body suppress reach). This is the channel we're most underinvested in.
2. **X / Twitter (primary conversation engine).** A thread: hook post with the
   diagram, 5–9 posts walking the stages, last post = takeaway + link. Reply to
   your own thread with the link rather than putting it in the hook.
3. **Syndication (borrowed audiences).** Hacker News (Show/《title》), the right
   subreddit (r/LocalLLaMA, r/MachineLearning, r/AI_Agents, r/cscareerquestions for
   career posts), and dev.to / Medium canonical-linked back to us.
4. **Newsletter (the asset we own).** Every post feeds a weekly issue; the CTA on
   each post captures the visitor before they leave. (Blocked until a subscribe CTA
   exists — see §6.)

## 3. The atomic unit: one post → five native assets

Every published post should spin out, from parts it already has:

| Asset | Source in the post | Channel |
|---|---|---|
| Hero diagram PNG | `public/og-<slug>.png` (already built) | LinkedIn image, X hook |
| Thread (7–10 posts) | section H2s = the beats; FAQ = the replies | X |
| LinkedIn breakdown | front-loaded answer + the verdict/table | LinkedIn |
| Carousel (opt.) | the comparison/decision tables as slides | LinkedIn, X |
| Syndication post | intro + "read the full breakdown" canonical link | HN / Reddit / dev.to |

Never post the identical text to two channels — adapt the hook to each. (Cross-post
skill `ecc:crosspost` / `ecc:content-engine` can help draft platform-native variants.)

## 4. Repurpose recipes by post type

- **Deep-dive / "how X works"** → diagram-led thread, one post per data-flow stage.
  This is the ByteByteGo format and our strongest fit.
- **Comparison (e.g. Hermes vs OpenClaw)** → lead with the split diagram, then the
  side-by-side table as a carousel, end on the "pick X when…" verdict. Comparisons
  travel far because people tag whoever they're arguing with.
- **Data post (e.g. AI Engineer Salary)** → the number is the hook ("US AI engineers
  earn $X — here's the breakdown"), each level/city a post, chart as the card.
- **Contrarian/objection (e.g. CCA traps, AI-slop bounties)** → a strong claim as the
  hook, the traps/points as the thread body. These over-index on replies.

## 5. Cadence & engagement (the unglamorous part that works)

- **Post most weeks, not in bursts.** Consistency is the growth variable; the
  algorithm trusts steady accounts. Aim: 1 thread per new post + a few standalone
  diagram/insight posts a week.
- **Spend 50% on the hook.** First line decides distribution. Lead with the answer,
  the number, or the tension — never "I wrote a new blog post."
- **Engage up.** A few thoughtful replies a week under in-niche accounts larger than
  us (see list) — that borrowed reach compounds faster than posting alone.
- **Protect the first hour.** Reply to early comments; that conversation is what the
  ranking rewards.

## 6. Accounts to learn from and engage in-niche

Study their formats; reply where we add real signal (not for the sake of it):

- **AI-engineering movement / practitioners:** @swyx (Latent Space, the "AI Engineer"
  framing), @simonw (LLM capabilities, prompt-injection/security), @rasbt (Sebastian
  Raschka, implementation breakdowns), Lilian Weng (agents/reasoning long-form).
- **Systems-design visual model (our template):** @bytebytego and the system-design-101
  format — the bar for diagram-led explainers.
- **Skeptics / signal:** @fchollet. **Labs (for newsjacking):** @AnthropicAI and the
  other official accounts — our daily lane already tracks their releases.

Peer up, don't punch up blindly: the highest-ROI replies are under accounts a few×
our size in the exact sub-niche (agents, RAG, local LLMs), not the megastars.

## 7. Wire it into the routines (so distribution isn't manual)

Both content routines should, after writing the post, also emit a
`distribution/<slug>.md` containing: (a) the X thread (hook + stage posts +
CTA-in-reply), (b) the LinkedIn breakdown (link-in-first-comment), (c) 2–3
syndication targets with a one-line pitch each. The hero PNG is already generated.
That turns every publish into a ready-to-paste distribution kit — the human just
posts (or we automate posting later via an X/LinkedIn integration).

Missing prerequisites to close the loop:
- **A subscribe/newsletter CTA on posts** (the "capture the visitor" step) — still
  not built; it's the highest-leverage gap for owning the audience.
- **A LinkedIn presence** — currently unused and, per the evidence, our biggest
  untapped channel.

## 8. Honest caveats

- Live X/LinkedIn follower and growth numbers are gated; the tactics here are from
  secondary analyses and comparable-brand teardowns. Treat as direction, verify with
  our own analytics once we're posting.
- Distribution amplifies quality; it doesn't replace it. A weak post distributed
  widely just burns reach. Keep the bar where the AEO/deep-dive playbooks set it.
- No engagement-pods-for-hire, no follow/unfollow churn, no identical cross-posting —
  those get flagged and don't build a real audience. Genuine replies + consistent
  original assets are the only durable engine.

## Sources
- Growth In Reverse — How ByteByteGo grew to 334k subscribers in under 2 years
- ByteByteGo `system-design-101` (the visual-explainer format)
- 2026 X growth/algorithm teardowns (consistency, hooks, conversation-weighting, borrowed reach)
- AI Accelerator Institute — "25 AI engineers to follow in 2026"; verified AI-X-accounts lists
