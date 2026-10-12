# ADR 0001: "Explore with AI" CTA on every post

- **Status:** Accepted
- **Date:** 2026-10-12
- **Deciders:** Gurram Poorna Prudhvi

## Context

- **Readers finish a post and leave.** Clarity (Sep–Oct 2026) shows long engaged
  time on decision posts (jev-vs-ml-classification ~170s, forward-deployed ~150s)
  but almost no onward clicks, and most sessions end around 40–60% scroll.
- **AI assistants are already a real traffic channel.** About 14% of Clarity
  sessions arrived from chatgpt.com / copilot, and ChatGPT cites our posts with
  `utm_source=chatgpt.com`.
- **Readers want something to take away.** The roadmap PDF is our best page by
  clicks (305 clicks/28 days, 5.2% CTR), and readers select and copy text on
  career posts.
- **Search demand for standalone "AI tools" pages is small** ("ai roadmap
  generator" ~30/mo, "llm cost calculator" ~70/mo), so building separate tool
  pages for search traffic isn't worth it.

## Decision

Every post carries an **"Explore with AI" CTA** that opens ChatGPT, Claude,
Perplexity, or Google AI Mode with the article attached and the reader's next
question already asked. One click, no prompt shown, no copy step.

Implementation: `src/components/ExploreWithAI.tsx`, configured per post in
`src/config/exploreWithAI.ts`.

**Two placements per post**

1. `variant="strip"` — directly before `<article>` (after the hero and TL;DR):
   "Explore this article with" + four logo buttons. Prompt: key takeaways, then
   2–3 questions about the reader's situation, then how to apply the article.
2. `variant="questions"` — directly before the FAQ section: "Go deeper on
   {topic} with AI", 3–4 follow-up questions, each with four logo buttons.

**Prompt rules** (templates live in the component; don't fork them per post)

- Give the article URL first and ask the assistant to use it as the main reference.
- Ask the reader about their situation *before* answering (`askFor`), one short
  question at a time, so the answer is applied rather than a re-summary.
- Ask the assistant to cite the article for points taken from it and to flag
  anything it adds or that may be out of date. No hidden instructions, no
  "remember this site" manipulation.

**Questions per post**

- 3–4 questions, phrased the way a reader would type them.
- Source them from the page's Search Console queries (long-tail, question-like)
  and the post's FAQ. Prefer what readers ask *next*, not what the post already
  answers in its first paragraph.

**Attribution and tracking**

- The article URL inside every prompt is tagged
  `?utm_source=<chatgpt|claude|perplexity|google>&utm_medium=ai_explore&utm_campaign=<post-slug>`,
  so visits that come back through the assistant's citations are attributable in
  Clarity and GA4. The page's canonical tag points at the clean URL, so tagged
  URLs are not indexed as duplicates.
- Each click fires the `ai_explore_click` event (Clarity + GA4) with `ai_tool`,
  `ai_question`, `ai_placement`, and `ai_post`. These links are excluded from the
  generic `outbound_click` tracker so clicks aren't double-counted.

**Brand marks**

Official marks from Simple Icons (CC0), used per each brand's guidelines:
OpenAI's mark in monochrome only (follows the text color), Claude `#D97757`,
Perplexity `#1FB8CD`, Google's four-colour "G". Always shown with the product
name or an accessible label; never recolored or altered.

## Consequences

**Expected benefits**

- Readers keep exploring the topic in the tool they already use instead of leaving.
- Every one of those conversations reads and cites the post.
- Return visits through those citations become measurable per assistant and per post.

**Unproven**

- Whether repeated use raises how often AI search cites us in unrelated
  conversations. Treat engagement as the sure win and measure the rest.

**Risks and mitigations**

- *An assistant changes or drops its pre-fill URL* → clicks land on an empty
  chat. Re-test the four URL patterns quarterly; remove a tool that stops working.
- *Assistants rewrite or strip query strings when citing* → UTM return visits
  are a lower bound, not a complete count.
- *Link-heavy HTML* (prompts are URL-encoded into ~20 hrefs per post) → each href
  stays under ~1 KB; keep prompts short.

**Review**

After 4 weeks, compare `ai_explore_click` rate per session and `utm_medium=ai_explore`
return visits by assistant and post. Drop a placement or assistant that gets under
~0.5% of sessions; keep questions that get clicks and rewrite those that don't.
