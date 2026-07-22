// IndexNow submission — pings participating search engines (Bing, Yandex,
// Seznam, Naver, etc.) the moment content changes, instead of waiting for a
// crawl. One ping reaches all engines in the IndexNow network.
//
// Reads every <loc> from public/sitemap.xml and submits them in one bulk POST.
// Run AFTER the site is deployed and live — the engines fetch the URLs to
// confirm, so they must resolve. The key file (public/<key>.txt) proves
// ownership of the host.
import { readFileSync } from 'fs'
import { join } from 'path'

const HOST = 'aiengineerinsights.com'
const KEY = 'e5fd188f8601e92a351d2941f676a4f9'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const sitemap = readFileSync(join('public', 'sitemap.xml'), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())

if (urlList.length === 0) {
  console.error('IndexNow: no URLs found in public/sitemap.xml')
  process.exit(1)
}

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

// IndexNow returns 200 (accepted) or 202 (accepted, pending). 4xx means the
// key or host failed validation.
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`)
if (res.status >= 400) {
  const text = await res.text().catch(() => '')
  console.error(`IndexNow: submission failed — ${text}`)
  process.exit(1)
}
