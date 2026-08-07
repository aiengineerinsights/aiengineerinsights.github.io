// Trend radar — fetches AI-news RSS feeds and ranks recent items so we can spot
// what's trending and write our OWN original take on the best topic.
//
// This script is a SIGNAL source, not a content source. It never republishes
// feed text; it surfaces topics + links so an original, cited analysis can be
// written (the winning newsjacking pattern). Read-only; publishes nothing.
//
// Usage: node scripts/trend-radar.mjs [--json] [--hours=48] [--top=10]

// High-signal AI-engineering sources, spread across categories so cross-source
// coverage is a real "hotness" signal (a story 4 outlets cover outranks a solo
// one). Per-feed failures are swallowed, so adding more is safe. This is a
// SIGNAL source only — we write our own original, cited take, never republish.
const FEEDS = [
  // AI-news aggregators
  'https://zdpdvwhvukelzzbzbjvh.supabase.co/functions/v1/rss-feed', // Analytics India (user proxy)
  'https://the-decoder.com/feed/',
  'https://www.marktechpost.com/feed/',
  'https://venturebeat.com/category/ai/feed/',
  // Practitioner / thought leaders (closest to our niche's intent)
  'https://simonwillison.net/atom/everything/',
  'https://www.latent.space/feed',
  // Labs & vendor engineering
  'https://huggingface.co/blog/feed.xml',
  'https://blog.google/technology/ai/rss/',
  // Community (what practitioners actually discuss)
  'https://hnrss.org/newest?q=LLM+OR+agents+OR+RAG&count=40', // Hacker News, niche-filtered
  'https://www.reddit.com/r/LocalLLaMA/.rss',
  'https://www.reddit.com/r/MachineLearning/.rss',
  // NOTE: arXiv is intentionally NOT here. Raw preprints flood the daily
  // news signal and aren't ideal daily-post material; research/papers are
  // sourced directly by the weekly deep-dive lane instead.
]

const args = process.argv.slice(2)
const asJson = args.includes('--json')
const hoursArg = args.find((a) => a.startsWith('--hours='))
const topArg = args.find((a) => a.startsWith('--top='))
const MAX_AGE_HOURS = hoursArg ? Number(hoursArg.split('=')[1]) : 48
const TOP_N = topArg ? Number(topArg.split('=')[1]) : 10

const NOW = Date.now()

const decode = (s) =>
  (s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;|&#x2019;/g, "'")
    .replace(/&#8216;|&#x2018;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
  return m ? decode(m[1]) : ''
}

// Normalize a title for cross-source dedupe (same story, different outlet).
const normTitle = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\b(the|a|an|to|of|in|on|for|and|with|says|amid)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()

async function fetchFeed(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'aiengineerinsights-trend-radar/1.0' } })
    if (!res.ok) {
      console.error(`radar: ${url} -> HTTP ${res.status}`)
      return []
    }
    const xml = await res.text()
    const source = tag(xml.split('<item')[0], 'title') || url
    const items = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map((m) => m[0])
    return items.map((block) => {
      const title = tag(block, 'title')
      const link = tag(block, 'link')
      const pub = tag(block, 'pubDate')
      const desc = tag(block, 'description')
      const ts = pub ? Date.parse(pub) : NaN
      return { title, link, source, desc, pubDate: pub, ts: Number.isNaN(ts) ? null : ts }
    })
  } catch (err) {
    console.error(`radar: ${url} failed — ${err.message}`)
    return []
  }
}

const all = (await Promise.all(FEEDS.map(fetchFeed))).flat()

// Filter to fresh items, dedupe by normalized title (keep the earliest source).
const fresh = all.filter((it) => it.title && (it.ts === null || NOW - it.ts <= MAX_AGE_HOURS * 3600e3))
const byKey = new Map()
for (const it of fresh) {
  const key = normTitle(it.title)
  if (!key) continue
  const existing = byKey.get(key)
  if (!existing) byKey.set(key, { ...it, sources: [it.source] })
  else if (!existing.sources.includes(it.source)) existing.sources.push(it.source)
}

// Rank: cross-source coverage first (more outlets = hotter), then recency.
const ranked = [...byKey.values()]
  .map((it) => {
    const ageH = it.ts ? (NOW - it.ts) / 3600e3 : 999
    const recency = Math.max(0, 1 - ageH / MAX_AGE_HOURS)
    const coverage = it.sources.length
    const score = coverage * 10 + recency * 5
    return { ...it, ageH: Math.round(ageH), score: Math.round(score * 10) / 10 }
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, TOP_N)

if (asJson) {
  console.log(JSON.stringify(ranked, null, 2))
} else {
  console.log(`\nTrend radar — top ${ranked.length} of ${byKey.size} unique stories (last ${MAX_AGE_HOURS}h)\n`)
  ranked.forEach((it, i) => {
    console.log(`${String(i + 1).padStart(2)}. [score ${it.score} · ${it.ageH}h · ${it.sources.length} src] ${it.title}`)
    console.log(`    ${it.link}`)
    if (it.desc) console.log(`    ${it.desc.slice(0, 140)}${it.desc.length > 140 ? '…' : ''}`)
    console.log()
  })
}
