# Content AEO Playbook — aiengineerinsights.com

How we write posts so AI answer engines (ChatGPT, Perplexity, Gemini, Google
AI) *cite* them, and so they rank in classic search too. Distilled from our
internal "Intent, User Obsession & Invisible Prompts" AEO model, scoped to what
a content blog actually controls: **owned-content optimization**.

> One-line thesis: AI search returns a single synthesized answer chosen for a
> user's **intent** (the job they're getting done), not the keyword they typed.
> Visibility = being the source the engine picks to justify its answer. So write
> for the job, answer it so explicitly the engine can't not cite you, and infer
> intent from what engines actually cite (you can't see users' prompts).

---

## 1. Write for intent, not keywords

Every post targets a **job-to-be-done**, classified two ways:

- **Funnel stage:** Awareness → Consideration → Decision → Post-purchase
- **Job type (pick one primary):**
  1. Informational / definitional — "what is X", "how does X work"
  2. Comparison / evaluation — "X vs Y", "best X for Z"
  3. Trust / verification — "is X safe / legit / production-ready"
  4. Transactional — "X pricing", "download X"
  5. Troubleshooting — "fix X", "X not working"
  6. Recommendation / shortlist — "top X for Y use-case"
  7. Navigational — "X docs", "X login"
  8. Negative / objection — "X problems", "X alternatives", "X limitations"
  9. Product-spec / sourcing — "X requirements", "X specs"
  10. Decision-support — "is X worth it", "X vs price"
  11. How-to / educational — "how to do Y with X"
  12. Local / near-me (rarely relevant here)

**The keyword is an artifact of intent, not the target.** Decide the job first;
the title, headings, and structure follow from it.

## 2. The user-obsession checklist (apply to every post)

Answer the job so explicitly and machine-scannably the engine can extract it.

1. **Front-loaded answer.** Put the direct answer in the first sentence or a
   TL;DR box — never buried below the fold. Engines quote the top.
2. **Question-mirroring headings.** H2/H3 phrased as the user's actual question
   ("Is Hermes Agent free?", "How do I reduce LLM inference cost?"), with the
   answer immediately below. These double as FAQ-schema fodder.
3. **Justification structures.** Give the engine a reason to pick you: comparison
   tables vs alternatives, pros/cons, explicit "best for X" value props, spec
   tables. Machine-scannable justification beats prose.
4. **Cite sources + use statistics + short quotations.** Back claims with named,
   linked sources and concrete numbers. Keep quotes 1–2 sentences, attributed.
   (These are the highest-lift GEO methods in the literature — see §6 caveat.)
5. **E-E-A-T signals.** Real byline (Gurram Poorna Prudhvi / the author), date,
   and where relevant the author's experience. Matters most for trust/YMYL topics.
6. **A concrete example per point.** Show the situation where the advice bites —
   it's more citable and more useful than an abstract claim.

## 3. Match the method to the job type

Not every technique helps every intent. Lead with the right one:

| Job type | Lead with |
|---|---|
| Informational / definitional | Clear definition first, then Cite-Sources |
| Comparison / evaluation | Comparison table + explicit "best for X" |
| Trust / verification | Authoritative sources, citations, E-E-A-T |
| Troubleshooting | Step-by-step, the exact fix up top |
| Recommendation / shortlist | Ranked shortlist with a one-line "why" each |
| Negative / objection | Honest limitations + alternatives, sourced |
| How-to / educational | Numbered steps, code/commands, expected result |
| Decision-support | Trade-off table + a clear recommendation |

*(Directional, from Aggarwal KDD 2024. Trust the direction; re-check magnitudes
against our own GSC/citation data — see §6.)*

## 4. Reverse-engineer intent — you can't see the prompts

You cannot query the prompts users type into an LLM. Infer them:

- **GSC top queries** — real Google demand is the strongest intent signal we
  have. Impressions-but-no-clicks on a topic = a job we should answer better.
- **What gets cited** — where we or competitors are already cited (Perplexity
  Sources, engine browsing refs), study the structure/citations/entities that won.
- **People-Also-Ask + autocomplete** — cheap map of the real question space.
- **Community taxonomy** — how people phrase the job on Reddit/forums.

Real prompts are intent-heavy: not "project management tool" but "best PM tool
for a remote team of 50 that integrates with Slack and Jira." Write for that.

**Weekly GSC intent refresh (closes the loop):** the file `data/gsc-intent.md`
holds real Search Console demand — top queries, striking-distance opportunities
(pages that rank 4–20 but get ~no clicks), and low-CTR pages. Regenerate it
weekly: in GSC → Performance → Export (last 28 days) → download the ZIP, then
run `node scripts/gsc-ingest.mjs ~/Downloads/<export>.zip` and commit the
updated `data/gsc-intent.md`. Both content routines read it and prefer topics /
angles that serve the revealed demand — this beats any guess about intent.

## 5. How this maps to our post template

Our React post components already support this — use them deliberately:

- **TL;DR / front-loaded answer** → the intro paragraph under the H1 states the
  answer directly (not just a teaser).
- **Question-mirroring H2s** → section `id`s and headings phrased as questions;
  always include an FAQ section (feeds FAQPage JSON-LD).
- **Justification tables** → use the `Table` component for comparisons, specs,
  and "when it matters / example" grids.
- **Cite-sources** → a Sources section with linked references; inline links to
  primary sources in the body.
- **E-E-A-T** → the author card (real byline + date) and Person JSON-LD, already
  emitted by `scripts/postbuild-seo.mjs`.
- **Internal links** → contextual links to related posts build the topic cluster.

## 6. Evidence caveats (don't over-trust magnitudes)

- The "highest-lift methods" ranking (Quotation / Statistics / Cite-Sources) is
  from a 2023–24 benchmark against a *constructed* engine, not live 2026 engines.
  Trust the **direction**, not the exact numbers. Our own GSC + citation data
  overrides any third-party effect size.
- Engines change. Any performance claim should be re-checked against our own
  measurement over time, not treated as a constant.
- Intent is **necessary, not sufficient.** A perfectly intent-matched post on a
  low-authority page can still be invisible — earned-media authority and entity
  consistency decide whether the engine trusts you enough to cite. For a blog,
  that means: keep publishing genuinely useful, original, cited content and
  build the topic cluster; there is no structural shortcut around trust.

## 7. Anti-patterns — never do these

- Keyword stuffing or unique-word padding (proven not to work in generative
  engines; risks spam classification).
- Burying the answer below setup/preamble.
- Uncited claims or invented statistics — especially under a real byline.
- Writing for a keyword instead of a job.
- One giant wall of prose with no scannable structure (tables, lists, headings).
