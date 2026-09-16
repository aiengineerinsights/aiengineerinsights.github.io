// Sitemap <lastmod> sync — the ONLY legitimate signal Google uses to schedule
// recrawls (the old sitemap ping endpoint was deprecated in 2023, and the
// Indexing API is restricted to JobPosting/BroadcastEvent — not blog posts).
//
// Reads the per-post `date` values already declared in scripts/postbuild-seo.mjs
// and writes a matching <lastmod> onto that URL in public/sitemap.xml.
//
// IMPORTANT: only bump a lastmod when the content genuinely changed. Inflating
// it on every page erodes the signal and Google starts ignoring it.
//
// Usage: node scripts/sitemap-lastmod.mjs [--check]
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const checkOnly = process.argv.includes('--check')

const seoSrc = readFileSync(join('scripts', 'postbuild-seo.mjs'), 'utf8')
const sitemapPath = join('public', 'sitemap.xml')
let sitemap = readFileSync(sitemapPath, 'utf8')

// Pull every { path: '/blog/...', ... date: 'YYYY-MM-DD' } pair.
const dates = new Map()
for (const m of seoSrc.matchAll(/path:\s*'(\/blog\/[^']+)'[\s\S]{0,2000}?date:\s*'(\d{4}-\d{2}-\d{2})'/g)) {
  dates.set(m[1], m[2])
}

if (dates.size === 0) {
  console.error('sitemap-lastmod: no post dates found in scripts/postbuild-seo.mjs')
  process.exit(1)
}

let added = 0
let updated = 0
let missing = 0

for (const [path, date] of dates) {
  const loc = `https://aiengineerinsights.com${path}/`
  const esc = loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // <url><loc>…</loc></url>  → add lastmod
  const bare = new RegExp(`<url><loc>${esc}</loc></url>`)
  // <url><loc>…</loc><lastmod>…</lastmod></url> → update if different
  const withMod = new RegExp(`<url><loc>${esc}</loc><lastmod>(\\d{4}-\\d{2}-\\d{2})</lastmod></url>`)

  const existing = sitemap.match(withMod)
  if (existing) {
    if (existing[1] !== date) {
      sitemap = sitemap.replace(withMod, `<url><loc>${loc}</loc><lastmod>${date}</lastmod></url>`)
      updated++
    }
  } else if (bare.test(sitemap)) {
    sitemap = sitemap.replace(bare, `<url><loc>${loc}</loc><lastmod>${date}</lastmod></url>`)
    added++
  } else {
    console.warn(`sitemap-lastmod: URL not in sitemap — ${loc}`)
    missing++
  }
}

if (checkOnly) {
  console.log(`sitemap-lastmod (check): ${added} would be added, ${updated} would change, ${missing} missing from sitemap`)
  process.exit(missing > 0 ? 1 : 0)
}

writeFileSync(sitemapPath, sitemap)
console.log(`sitemap-lastmod: ${added} added, ${updated} updated, ${missing} missing (of ${dates.size} posts)`)
