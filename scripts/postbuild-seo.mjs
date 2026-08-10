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
    title: 'AI Engineering Roadmap 2026: How to Become an AI Engineer (Free PDF)',
    seoTitle: 'AI Engineer Roadmap 2026: How to Become One (Free PDF)',
    description:
      'How to become an AI engineer in 2026 — a step-by-step roadmap from Python and math to ML, MLOps, and LLMs/agents. Six phases, curated resources, and a free PDF.',
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
    path: '/blog/how-to-install-hermes-agent',
    title: 'How to Install Hermes Agent (macOS, Windows, Linux, pip, Docker)',
    seoTitle: 'How to Install Hermes Agent (Mac, Windows, Linux)',
    description:
      'Step-by-step: install Hermes Agent on macOS, Windows (PowerShell or WSL2), and Linux, plus pip and Docker. First-run model setup, the exact commands, and fixes for common install errors.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-how-to-install-hermes-agent.png',
  },
  {
    path: '/blog/hermes-agent-skills',
    title: 'Hermes Agent Skills: How Self-Improving Skills Actually Work',
    seoTitle: 'Hermes Agent Skills: How Self-Improving Skills Work',
    description:
      'How Hermes Agent skills work: self-improving procedures stored as SKILL.md in ~/.hermes/skills/, auto-created from your workflows, managed and loaded from the CLI, with write_approval for control.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-skills.png',
  },
  {
    path: '/blog/hermes-agent-desktop-web-ui',
    title: 'Hermes Agent Desktop App & Web UI: The Visual Way to Run Your Agent',
    seoTitle: 'Hermes Agent Desktop App & Web UI (Dashboard) Guide',
    description:
      'Hermes Agent beyond the terminal: the Desktop app and the browser dashboard (hermes dashboard at 127.0.0.1:9119) to manage sessions, keys, skills, memory, and schedules — no YAML editing.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-desktop-web-ui.png',
  },
  {
    path: '/blog/hermes-agent-models',
    title: 'Which LLM Should You Run With Hermes Agent? Models, Providers, and Nous Portal',
    seoTitle: 'Which LLM to Run With Hermes Agent (Models Guide)',
    description:
      'Hermes Agent is model-agnostic: use Nous Portal, OpenRouter, OpenAI, Anthropic, or any endpoint. How to set a model with hermes model, the 64k-context minimum, and how to choose one.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-models.png',
  },
  {
    path: '/blog/hermes-agent-security',
    title: 'Is Hermes Agent Safe? Its Security Model and Sandboxing, Explained',
    seoTitle: 'Is Hermes Agent Safe? Security & Sandboxing Explained',
    description:
      "Hermes Agent's security model: five layers of defense-in-depth defaults, sandboxed execution across Docker/SSH/Modal backends, credential filtering, and how to run untrusted tasks safely.",
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-security.png',
  },
  {
    path: '/blog/hermes-agent-alternatives',
    title: 'The Best Hermes Agent Alternatives in 2026 (Open-Source AI Agents Compared)',
    seoTitle: 'Best Hermes Agent Alternatives in 2026 (Compared)',
    description:
      'The best open-source Hermes Agent alternatives in 2026: OpenClaw, LangGraph, CrewAI, AutoGen, Open Interpreter, and Agent Zero — with a clear "best for" for each and when to pick which.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-alternatives.png',
  },
  {
    path: '/blog/hermes-agent-troubleshooting',
    title: 'Hermes Agent Troubleshooting: Fixing the Most Common Errors',
    seoTitle: 'Hermes Agent Troubleshooting: Fix Common Errors',
    description:
      'Fix the most common Hermes Agent errors: command not found, context-window errors, Windows/WSL2 install issues, provider/auth failures, and Docker persistence — starting with hermes doctor.',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-troubleshooting.png',
  },
  {
    path: '/blog/hermes-agent-vs-openclaw',
    title: 'Hermes Agent vs OpenClaw: Which Open-Source AI Agent Should You Run?',
    seoTitle: 'Hermes Agent vs OpenClaw: Which to Run (2026)',
    description:
      'Hermes Agent vs OpenClaw compared, with real user reviews from Reddit and forums: architecture, skills, memory, security, cost, and a clear pick-by-need verdict (and why many run both).',
    date: '2026-08-10',
    author: 'poorna',
    image: '/og-hermes-agent-vs-openclaw.png',
  },
  {
    path: '/blog/claude-certified-architect-exam-traps',
    title: 'Why Good Engineers Fail the Claude Certified Architect Exam: 11 Traps to Avoid',
    seoTitle: 'Claude Certified Architect Exam: 11 Traps to Avoid',
    description:
      "The Claude Certified Architect (CCA-F) exam's wrong answers are designed to sound like best practice. The 11 traps — judgment and technical — with the correct pattern for each.",
    date: '2026-08-07',
    author: 'poorna',
    image: '/og-claude-certified-architect-exam-traps.png',
  },
  {
    path: '/blog/claude-certified-architect-exam',
    title: "Claude Certified Architect (CCA) Exam: Everything You Need to Know (2026)",
    seoTitle: 'Claude Certified Architect Exam: Everything to Know 2026',
    description:
      "Anthropic's Claude Certified Architect exam (CCAR-F): ~60 scenario questions, 120 min, $125, pass 720/1000 — the 5 domains, registration, and honest prep tips.",
    date: '2026-08-07',
    author: 'poorna',
    image: '/og-claude-certified-architect-exam.png',
  },
  {
    path: '/blog/context-engineering-graperoot',
    title: 'Context Engineering for AI Coding: How GrapeRoot Cuts Claude Code Token Cost 30–45%',
    seoTitle: 'Context Engineering: How GrapeRoot Cuts AI Coding Cost',
    description:
      "Context engineering means curating what's in the model's context window. GrapeRoot preloads the right code into every prompt — cutting Claude Code cost from $0.49 to $0.27 per prompt.",
    date: '2026-08-05',
    author: 'poorna',
    image: '/og-context-engineering-graperoot.png',
  },
  {
    path: '/blog/ai-engineer-salary',
    title: 'AI Engineer Salary in 2026: What US Engineers Actually Earn, by Level, Company, and City',
    seoTitle: 'AI Engineer Salary 2026: US Pay by Level, Company & City',
    description:
      'US AI engineers earn roughly $100K–$250K in 2026 — Glassdoor avg $144K, Levels.fyi ~$244K total comp, $850K+ at frontier labs. By level, company, and city.',
    date: '2026-08-03',
    author: 'poorna',
    image: '/og-ai-engineer-salary.png',
  },
  {
    path: '/blog/forward-deployed-ai-engineer',
    title: 'The Forward-Deployed AI Engineer: What the Role Actually Is, What It Pays, and Whether You Should Go For It',
    seoTitle: 'Forward-Deployed AI Engineer: Role, Pay, and Path (2026)',
    description:
      "OpenAI, Anthropic, and Google are hiring forward-deployed AI engineers on Palantir's playbook. What the job is, how it pays, and how to break in.",
    date: '2026-07-29',
    author: 'poorna',
    image: '/og-forward-deployed-ai-engineer.png',
  },
  {
    path: '/blog/github-bug-bounty-ai-slop',
    title: 'GitHub\'s Bug Bounty Overhaul: What "AI Slop" Vulnerability Reports Are Doing to Security Research',
    seoTitle: 'GitHub Bug Bounty Overhaul: The "AI Slop" Problem, Explained',
    description:
      "GitHub's July 2026 bug bounty restructuring — a VIP tier and a new-researcher submission cap — is a direct response to AI-generated vulnerability reports. What it means for engineers.",
    date: '2026-07-24',
    author: 'poorna',
    image: '/og-github-bug-bounty-ai-slop.png',
  },
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
    seoTitle: 'Hermes Agent: What It Is, How to Install It, Free?',
    description:
      'What Hermes Agent by Nous Research is, whether it is free, and how to install the open-source self-improving AI agent on Mac, Windows, and Linux (desktop app + one-line terminal install).',
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
    title: '14 MLOps Best Practices, Ordered by Impact — With Examples of When Each One Saves You',
    seoTitle: '14 MLOps Best Practices Ordered by Impact (2026)',
    description:
      'An impact-ordered guide to 14 MLOps best practices — versioning, monitoring, CI/CD, eval gates, safe rollouts, and more — each with when it matters most and a concrete example.',
    date: '2026-07-25',
    author: 'poorna',
    image: '/og-mlops-best-practices.png',
  },
  {
    path: '/blog/llm-deployment-challenges',
    title: '12 LLM Deployment Challenges — And How to Handle Each One in Production',
    seoTitle: '12 LLM Deployment Challenges & How to Handle Them (2026)',
    description:
      'The LLM deployment challenges that actually bite in production — cost, latency, hallucinations, prompt injection, and more — each with when it hits hardest and how to handle it.',
    date: '2026-07-25',
    author: 'poorna',
    image: '/og-llm-deployment-challenges.png',
  },
  {
    path: '/blog/building-robust-ai-data-pipelines',
    title: 'Building Robust AI Data Pipelines: 12 Practices, Ordered by Impact',
    seoTitle: 'Building Robust AI Data Pipelines: 12 Practices (2026)',
    description:
      'The 12 practices that make AI data pipelines robust — validation gates, idempotency, schema contracts, medallion layers, observability — each with when it matters and an example.',
    date: '2026-07-26',
    author: 'poorna',
    image: '/og-building-robust-ai-data-pipelines.png',
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
  // Canonical/og:url use the TRAILING-SLASH form because GitHub Pages serves
  // directory URLs (/blog/x/) with 200 and 301-redirects the no-slash form to
  // it. Pointing canonical at the no-slash URL (a redirect) made Google index
  // both and split authority. Match the actually-served URL instead.
  const url = path === '/' ? `${SITE}/` : `${SITE}${path}/`
  const ogImage = image ? `${SITE}${image}` : OG_IMAGE
  // <title> uses the short seoTitle (~50-60 chars, avoids SERP truncation)
  // when provided; og/twitter titles keep the fuller headline for social.
  const tabTitle = seoTitle || title
  // NOTE: use replacer FUNCTIONS, never a template-string replacement. In
  // String.replace, "$" in the replacement string is a special backreference,
  // so a value like "$100K" or "$0.27" in a title/description would be mangled
  // into broken HTML (and break social link previews). A function's return
  // value is used verbatim, with no "$" interpretation.
  const put = (re, value) => {
    html = html.replace(re, (_m, p1, p2) => (p1 ?? '') + value + (p2 ?? ''))
  }
  let html = template
  put(/(<meta property="og:image" content=")[^"]*(")/, ogImage)
  put(/(<meta name="twitter:image" content=")[^"]*(")/, ogImage)
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(tabTitle)}</title>`)
  put(/(<meta name="description" content=")[^"]*(")/, esc(description))
  put(/(<link rel="canonical" href=")[^"]*(")/, url)
  put(/(<meta property="og:title" content=")[^"]*(")/, esc(title))
  put(/(<meta property="og:description" content=")[^"]*(")/, esc(description))
  put(/(<meta property="og:url" content=")[^"]*(")/, url)
  put(/(<meta name="twitter:title" content=")[^"]*(")/, esc(title))
  put(/(<meta name="twitter:description" content=")[^"]*(")/, esc(description))

  if (date) {
    html = html.replace(/(<meta property="og:type" content=")website(")/, (_m, p1, p2) => p1 + 'article' + p2)
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
