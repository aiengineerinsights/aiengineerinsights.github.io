# Post structure

The layout every post on aiengineerinsights.com follows. Writing rules and
sourcing standards live in `CONTENT-CRON-SPEC.md` (§3 House style) and
`CONTENT-AEO-PLAYBOOK.md`; this file is the single reference for **what goes
where on the page**. Reference implementations: `src/pages/LLMRoutingPost.tsx`,
`src/pages/AIGuardrailsPost.tsx`.

## Page order

```
Navigation
→ back link
→ header: category chip · H1 · lede · author card (byline, published date, "Updated" date when refreshed, read time)
→ hero SVG diagram
→ TL;DR box                                   (2–4 sentences, self-contained answer)
→ <ExploreWithAI variant="strip" />           (ADR 0001)
→ <article className="prose">
     numbered question-style <section id="…"> blocks
     → NewsletterSignup                       (~35–40% down, copy tailored to the post)
     → … more sections …
     → <ExploreWithAI variant="questions" />  (ADR 0001)
     → FAQ section (id="faq")
     → TopmateCTA                             (career posts only)
     → References / Sources
  </article>
→ RelatedPosts
→ Footer
```

## Block rules

**TL;DR**
- Answers the main query on its own, naming the key entities.
- This is what AI assistants quote. Write it so it still makes sense pasted alone.

**Section headings**
- H2s phrased the way a reader would type the question, each with an `id` (feeds the TOC).

**Explore with AI** (`docs/adr/0001-explore-with-ai-cta.md`)
- Add the post to `src/config/exploreWithAI.ts`, keyed by its path with no trailing slash.
- `topic`: a short noun phrase used in the heading ("LLM routing").
- 3–4 `questions` the reader would ask *next*, taken from the page's Search
  Console queries and FAQ.
- `askFor`: what the assistant should find out about the reader before answering.
- Render `variant="strip"` right before `<article>` and `variant="questions"`
  right before the FAQ section.
- New posts with no Search Console data yet: draft questions from the FAQ and
  the closest existing post's queries, then revise after 4 weeks of data.

**FAQ**
- The in-page questions must match `faqs` in `scripts/postbuild-seo.mjs` exactly
  (that file emits the FAQPage schema).

**References**
- Primary sources only.
- Every number, quote, price, or date has a source.

**Dates**
- On a refresh, add "Updated <date>" next to the published date, set
  `dateModified` in `postbuild-seo.mjs`, and bump `lastmod` in `public/sitemap.xml`.

## Checklist before publishing

- [ ] TL;DR present and self-contained
- [ ] `ExploreWithAI` strip + questions placed; post added to `exploreWithAI.ts`
- [ ] FAQ in page matches `faqs` in `postbuild-seo.mjs`
- [ ] Registered in all 7 places (`CONTENT-CRON-SPEC.md` §4)
- [ ] Hero diagram + `public/og-<slug>.png`
- [ ] `npx tsc --noEmit -p .` and `npm run build` pass with no SEO warnings
