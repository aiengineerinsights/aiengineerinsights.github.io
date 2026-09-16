# Daily content cron — operating spec

The scheduled publishing job reads this file first, every run. It is the single
source of truth for cadence, topic selection, writing style, and the publish
checklist. Update this file to change the job's behaviour.

Repo: `~/PycharmProjects/aiengineerinsights.github.io` (site: aiengineerinsights.com)

---

## 1. Cadence

| Day | Lane |
|---|---|
| Mon, Wed, Fri | **NEW post** |
| Tue, Thu | **REFRESH** an existing post |
| Sat, Sun | No publish — report only |

Why not a new post every day: 30 new posts/month on a young domain is the
pattern Google's *scaled content abuse* policy targets, and this site already
took an impressions correction on 2026-08-07. Refreshes carry zero penalty
risk, were the highest-ROI move in this program (the salary post), and
legitimately bump `<lastmod>` — the only recrawl signal Google still honours.

---

## 2. Topic selection

No static backlog file — stale topic lists rot. Every run computes fresh:

1. **Published posts** — read `scripts/postbuild-seo.mjs` for the current list.
   Never duplicate or cannibalise an existing page.
2. **Live keyword validation** — openseo / DataForSEO (`get_keyword_metrics`,
   `research_keywords`).
3. **`data/gsc-intent.md`** — real Search Console demand. **Ignore it if the
   generated date in its header is more than 30 days old.**
4. **`node scripts/trend-radar.mjs --hours=48 --top=10`** — 11 RSS feeds, for
   timely topics. Signal only: never republish feed text, always write an
   original cited take.
5. **Cluster gaps** — `TOPICAL-AUTHORITY-PLAN.md` vs what is published.
6. **Own previous run** (cron `continuity`) — prefer the next piece of the
   cluster just started over an unrelated one-off. Clusters beat scattered posts.

### Hard gate — write only if ALL hold
- Search volume **≥ 300/mo**
- Keyword difficulty **≤ 35**
- Not already covered by an existing post
- **Not navigational or brand-name traffic.** Learned the hard way: the Hermes
  post drew 14,820 impressions and 9 clicks (0.06% CTR) because people
  searching a product name want that product's site, not a blog.
- Fits the ICP: AI engineers, and people becoming one

No topic clears the gate → do a REFRESH instead. Never force a weak post.

### Refresh targets (Tue/Thu)
Prefer pages with real demand but poor placement: high impressions and low
clicks, or position 11–30. Refresh = new data, a new section that captures an
adjacent keyword, updated `date` in `postbuild-seo.mjs`, re-run lastmod sync.
Substantive change only — never a cosmetic date bump.

---

## 3. House style

Match the existing posts exactly (`src/pages/MCPvsAPIPost.tsx` and
`src/pages/WhatAreAIAgentsPost.tsx` are the reference implementations).

**Page structure**

```
Navigation → back link → header (category chip, H1, lede, author card)
→ hero SVG diagram → <article className="prose">
   numbered <section id="..."> blocks
   → FAQ → References
→ NewsletterSignup (mid/late) → TopmateCTA (career posts only)
→ RelatedPosts → Footer
```

**Writing rules**
- BLUF: answer the query in the first paragraph, before any preamble.
- H2s mirror the question a reader would type, each with an `id` (feeds the TOC).
- At least one comparison table.
- FAQ section in the page **and** matching `faqs` in `postbuild-seo.mjs`
  (emits FAQPage schema — a rich-result and CTR lever).
- Cite sources inline with the `RefLink` component.
- Byline: Gurram Poorna Prudhvi. This is a real person's name, so **every claim
  needs 2+ independent sources or it gets cut.** Never invent a statistic,
  benchmark, quote, price, or date.
- Internal links to related posts in the cluster.

**Assets**
- Hero: inline SVG component, `viewBox="0 0 1200 560"`, dark/violet theme,
  descriptive `aria-label`.
- OG image: rasterise the hero to `public/og-<slug>.png` (1200×630) with
  `rsvg-convert`.

---

## 4. Registration — all 7 places

A post is invisible unless every one of these is updated. (Missing the last two
has already shipped posts that existed at their URL but were linked nowhere.)

1. `src/routes.tsx` — lazy import + `<Route>`
2. `scripts/postbuild-seo.mjs` — entry with `path, title, seoTitle, description, date, author, image, faqs`
3. `public/sitemap.xml` — `<url><loc>…/</loc></url>` (trailing slash)
4. `public/llms.txt`
5. `src/components/RelatedPosts.tsx`
6. `src/pages/BlogsPage.tsx` — newest first, unique `id`
7. `src/components/LatestInsights.tsx` — newest first (homepage)

---

## 5. Run sequence

```
1. git pull --rebase origin main
2. Read this spec + CONTENT-AEO-PLAYBOOK.md + TOPICAL-AUTHORITY-PLAN.md
3. Pick lane by weekday; select topic / refresh target; validate against the gate
4. Research — 2+ sources per factual claim, collect URLs for References
5. Write post + hero diagram + OG image
6. Register in all 7 places
7. node scripts/sitemap-lastmod.mjs
8. npm run build          ← HARD GATE
9. Verify prerender: title, H1, FAQPage schema, og:image, canonical
10. git commit && git push origin main   ← CI deploys, then pings IndexNow
11. Report
```

**Build fails → do not push.** Report the error instead. A broken build breaks
the live site.

---

## 6. Indexing — what is real

- **Bing, Yandex, Seznam, Naver** — automatic. `.github/workflows/deploy.yml`
  runs `scripts/indexnow.mjs` after every successful deploy. Nothing to do.
- **Google** — cannot be pushed programmatically, and attempts to fake it are
  worse than useless:
  - The sitemap ping endpoint was **deprecated in 2023** and returns 404.
  - The **Indexing API is restricted to JobPosting and BroadcastEvent**. Using
    it for blog posts violates Google's terms and risks losing API access.
  - What actually works: accurate **`<lastmod>`** (handled by
    `scripts/sitemap-lastmod.mjs`), internal links from already-indexed pages
    (the homepage and /blogs listings — hence step 4 above), and a manual
    **Request Indexing** in Search Console for priority URLs.

Every report must therefore end with the GSC reminder — it is the one step a
human has to do.

---

## 7. Failure handling

| Situation | Action |
|---|---|
| Build fails | Do not push. Report the error. |
| Research too thin to source properly | Skip the topic. Never fabricate. |
| No topic clears the gate | Do a refresh instead. |
| Git conflict | `git pull --rebase`, retry once, then report. |
| Keyword API unavailable | Fall back to trend-radar + cluster gaps; say so in the report. |

---

## 8. Report format

```
📝 <NEW | REFRESH | NO-PUBLISH> — <title>
🔗 https://aiengineerinsights.com/blog/<slug>/
🎯 <primary keyword> — <volume>/mo, KD <n>
🧩 Cluster: <cluster> · next: <what should follow>
✅ Build passed · pushed <sha> · IndexNow fired for Bing/Yandex
👉 Your step: GSC → URL Inspection → Request Indexing for the URL above
```

Keep it short. If nothing published, say why in one line.
