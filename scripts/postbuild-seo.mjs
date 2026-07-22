// Post-build SEO: create a real index.html for every SPA route so deep links
// return HTTP 200 (not 404) and each URL carries its own title, description,
// canonical, Open Graph tags, and JSON-LD — readable by crawlers that do not
// execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, Bingbot's first pass).
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'

const SITE = 'https://aiengineerinsights.com'
const SITE_NAME = 'AI Engineer Insights'

const pages = [
  {
    path: '/',
    title: 'AIEngineerInsights.com - Your Companion on the AI Engineering Journey',
    h1: 'Your Companion on the AI Engineering Journey',
    description:
      'Providing clarity, practical roadmaps, real-world projects, and curated resources for individuals navigating their AI engineering career journey.',
  },
  {
    path: '/blogs',
    title: 'Blog | AI Engineer Insights',
    description:
      'Deep-dive articles on AI engineering: local LLMs, agent protocols, MLOps, LLM deployment, and data pipelines.',
  },
  {
    path: '/resources',
    title: 'Resources | AI Engineer Insights',
    description:
      'Curated resources, roadmaps, and learning paths for aspiring and practicing AI engineers.',
  },
  {
    path: '/projects',
    title: 'Projects | AI Engineer Insights',
    description: 'Real-world AI engineering project showcases and walkthroughs.',
  },
  {
    path: '/authors',
    title: 'Authors | AI Engineer Insights',
    description: 'The engineers behind AI Engineer Insights.',
  },
]

const posts = [
  {
    path: '/blog/ollama-mac-local-ai-2025',
    title: 'Ollama on Mac: The Perfect Local AI Stack for 2025',
    description:
      'Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — unlock it with Ollama and Apple Silicon unified memory.',
    date: '2025-08-01',
  },
  {
    path: '/blog/google-a2a',
    title: 'Architectural Insights: A2A as a Protocol for Peer AI Agents',
    description:
      'An open standard from Google for inter-agent communication, enabling AI agents to collaborate as peers without exposing their internal workings.',
    date: '2025-07-30',
  },
  {
    path: '/blog/what-makes-llms-agentic',
    title: 'What Makes LLMs Agentic?',
    description:
      'Exploring the key capabilities of tool calling, reasoning, and advanced coding that make LLMs agentic in nature.',
    date: '2025-08-26',
  },
  {
    path: '/blog/openai-gdpval',
    title: "OpenAI GDPval: The Evaluation of AI's Economic Potential",
    description:
      'The methodology behind GDPval, its key findings, and what they signal for the future of knowledge work.',
    date: '2025-10-14',
  },
  {
    path: '/blog/mlops-best-practices',
    title: 'MLOps Best Practices: From Prototype to Production',
    description:
      'How to bridge the gap between experimentation and production-ready ML systems with proven MLOps strategies.',
    date: '2024-12-10',
  },
  {
    path: '/blog/llm-deployment-challenges',
    title: 'LLM Deployment Challenges and Solutions',
    description:
      'Real-world insights into the common pitfalls when deploying large language models and how to overcome them.',
    date: '2024-12-08',
  },
  {
    path: '/blog/building-robust-ai-data-pipelines',
    title: 'Building Robust AI Data Pipelines',
    description:
      'A practical guide to creating reliable, scalable data pipelines that power modern AI applications.',
    date: '2024-12-05',
  },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

function renderRoute({ path, title, h1, description, date }) {
  const url = `${SITE}${path === '/' ? '/' : path}`
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)

  if (date) {
    html = html.replace(/(<meta property="og:type" content=")website(")/, '$1article$2')
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url,
      datePublished: date,
      dateModified: date,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      publisher: { '@id': `${SITE}/#organization` },
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE },
    }
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
    )
  }

  // Static h1 + intro inside #root so crawlers that skip JavaScript still see
  // the page's primary heading (Bing flags "H1 tag missing" otherwise).
  // React replaces this placeholder as soon as the bundle hydrates.
  const heading = h1 || title.replace(/ \| AI Engineer Insights$/, '')
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><main><h1>${esc(heading)}</h1><p>${esc(description)}</p></main></div>`
  )

  const outFile =
    path === '/'
      ? join(dist, 'index.html')
      : join(dist, path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  console.log(`SEO: wrote ${outFile}`)
}

;[...pages, ...posts].forEach(renderRoute)
console.log(`SEO: ${pages.length + posts.length} routes prerendered with static meta`)
