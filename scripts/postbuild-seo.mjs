// Post-build SEO/GEO: server-render every SPA route and write a real
// index.html per URL so crawlers that do not execute JavaScript (GPTBot,
// ClaudeBot, PerplexityBot, Bingbot first pass) see the complete page —
// full article content, unique meta, canonical, and JSON-LD. React
// re-renders over the static markup on load; UX unchanged.
//
// Also generates llms-full.txt (plain-text of all posts) for LLM ingestion.
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { createServer } from 'vite'

const SITE = 'https://aiengineerinsights.com'
const SITE_NAME = 'AI Engineer Insights'
const OG_IMAGE = `${SITE}/og-image.png`

const AUTHORS = {
  poorna: {
    '@type': 'Person',
    name: 'Poorna Prudhvi Gurram',
    url: `${SITE}/authors`,
  },
  vishnu: {
    '@type': 'Person',
    name: 'Vishnu Vardhan Sai Lanka',
    url: `${SITE}/authors`,
  },
  team: { '@type': 'Organization', name: SITE_NAME, url: SITE },
}

const pages = [
  {
    path: '/',
    title: 'AIEngineerInsights.com - Your Companion on the AI Engineering Journey',
    seoTitle: 'AI Engineer Insights — Practical AI Engineering Guides',
    description:
      'Practical roadmaps, real-world projects, and deep-dive articles for engineers building with LLMs, AI agents, and production machine learning.',
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
    description:
      'Real-world AI engineering projects and walkthroughs — from LLM apps and agents to MLOps pipelines — with the tools and patterns behind each build.',
  },
  {
    path: '/authors',
    title: 'Authors | AI Engineer Insights',
    description:
      'Meet the engineers behind AI Engineer Insights — practitioners writing about LLMs, AI agents, agentic security, and production machine learning.',
  },
  {
    path: '/ai-engineering-roadmap',
    title: 'AI Engineering Roadmap 2026: Step-by-Step Guide (Free PDF)',
    description:
      'A complete AI engineering roadmap for 2026 — from Python and math to ML, MLOps, and LLMs/agents. Six phases, curated resources, and a free downloadable PDF.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | AI Engineer Insights',
    description:
      'How AI Engineer Insights collects, uses, and protects your data, including cookies, analytics, advertising, and your privacy rights.',
  },
]

const posts = [
  {
    path: '/blog/openai-models-hacked-hugging-face',
    title: "OpenAI's Models Broke Out and Hacked Hugging Face During a Cyber Test: What Engineers Should Actually Take Away",
    seoTitle: 'OpenAI Models Hacked Hugging Face in a Cyber Test — Analysis',
    description:
      "OpenAI models escaped a test sandbox, chained a zero-day, and hacked Hugging Face to steal benchmark answers. The agentic-security lessons behind the headlines.",
    date: '2026-07-22',
    author: 'poorna',
    image: '/og-openai-hugging-face.png',
  },
  {
    path: '/blog/hermes-agent-nous-research-guide',
    title: 'Hermes Agent by Nous Research: The Self-Improving Open-Source AI Agent, Explained',
    seoTitle: 'Hermes Agent by Nous Research: A Practical Guide',
    description:
      "What Hermes AI is, how to install the desktop app on Mac, Windows, or Linux, and an engineer's read on the MIT-licensed agent framework's architecture.",
    date: '2026-07-22',
    author: 'poorna',
    image: '/og-hermes-agent.png',
  },
  {
    path: '/blog/ollama-mac-local-ai-2025',
    title: 'Ollama on Mac: The Perfect Local AI Stack for 2025',
    description:
      'Stop paying hundreds monthly for AI subscriptions. Your Mac is already the perfect AI powerhouse — unlock it with Ollama and Apple Silicon unified memory.',
    date: '2025-08-01',
    author: 'poorna',
  },
  {
    path: '/blog/google-a2a',
    title: 'Architectural Insights: A2A as a Protocol for Peer AI Agents',
    description:
      'An open standard from Google for inter-agent communication, enabling AI agents to collaborate as peers without exposing their internal workings.',
    date: '2025-07-30',
    author: 'vishnu',
  },
  {
    path: '/blog/what-makes-llms-agentic',
    title: 'What Makes LLMs Agentic?',
    description:
      'Exploring the key capabilities of tool calling, reasoning, and advanced coding that make LLMs agentic in nature.',
    date: '2025-08-26',
    author: 'vishnu',
  },
  {
    path: '/blog/openai-gdpval',
    title: "OpenAI GDPval: The Evaluation of AI's Economic Potential",
    description:
      'The methodology behind GDPval, its key findings, and what they signal for the future of knowledge work.',
    date: '2025-10-14',
    author: 'vishnu',
  },
  {
    path: '/blog/mlops-best-practices',
    title: 'MLOps Best Practices: From Prototype to Production',
    description:
      'How to bridge the gap between experimentation and production-ready ML systems with proven MLOps strategies.',
    date: '2024-12-10',
    author: 'team',
  },
  {
    path: '/blog/llm-deployment-challenges',
    title: 'LLM Deployment Challenges and Solutions',
    description:
      'Real-world insights into the common pitfalls when deploying large language models and how to overcome them.',
    date: '2024-12-08',
    author: 'team',
  },
  {
    path: '/blog/building-robust-ai-data-pipelines',
    title: 'Building Robust AI Data Pipelines',
    description:
      'A practical guide to creating reliable, scalable data pipelines that power modern AI applications.',
    date: '2024-12-05',
    author: 'team',
  },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const htmlToText = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim()

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

function writeRoute({ path, title, seoTitle, description, date, author, image }, appHtml) {
  const url = `${SITE}${path === '/' ? '/' : path}`
  const ogImage = image ? `${SITE}${image}` : OG_IMAGE
  // <title> uses the short seoTitle (~50-60 chars, avoids SERP truncation)
  // when provided; og/twitter titles keep the fuller headline for social.
  const tabTitle = seoTitle || title
  let html = template
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${ogImage}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${ogImage}$2`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(tabTitle)}</title>`)
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
      image: ogImage,
      datePublished: date,
      dateModified: date,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      publisher: { '@id': `${SITE}/#organization` },
      author: AUTHORS[author] || AUTHORS.team,
    }
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
    )
  }

  // Full server-rendered page content inside #root: crawlers see the real
  // article; React re-renders over it once the bundle loads.
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    path === '/'
      ? join(dist, 'index.html')
      : join(dist, path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  console.log(`SEO: wrote ${outFile}`)
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-prerender.tsx')

  const fullTexts = []
  for (const route of [...pages, ...posts]) {
    const appHtml = await render(route.path)
    writeRoute(route, appHtml)
    if (route.date) {
      fullTexts.push(
        `# ${route.title}\n\nURL: ${SITE}${route.path}\nDate: ${route.date}\nAuthor: ${(AUTHORS[route.author] || AUTHORS.team).name}\n\n${htmlToText(appHtml)}`
      )
    }
  }

  const llmsFull = `# ${SITE_NAME} — Full Content\n\n> Complete text of all articles on ${SITE} for LLM ingestion. Index: ${SITE}/llms.txt\n\n${fullTexts.join('\n\n---\n\n')}\n`
  writeFileSync(join(dist, 'llms-full.txt'), llmsFull)
  console.log(`SEO: wrote dist/llms-full.txt (${Math.round(llmsFull.length / 1024)} KB)`)
  console.log(`SEO: ${pages.length + posts.length} routes fully prerendered`)
} finally {
  await vite.close()
}
