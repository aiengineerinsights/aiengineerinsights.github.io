import { FileDown, Code, Brain, Settings, Database, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

const PDF = "/downloads/ai-roadmap.pdf";

const phases = [
  {
    phase: "Phase 1 · Foundation",
    duration: "2–4 months",
    title: "Programming & Math Fundamentals",
    icon: Code,
    summary:
      "Every AI engineer stands on solid software and math foundations. Get fluent in Python and comfortable with the math that makes models tick before touching a neural network.",
    items: [
      "Python proficiency and software-engineering best practices",
      "Statistics, linear algebra, and calculus fundamentals",
      "Data structures, algorithms, and basic system design",
      "Version control (Git) and collaborative development",
    ],
    resources: [
      { text: "Python Docs", url: "https://docs.python.org/3/tutorial/" },
      { text: "Real Python", url: "https://realpython.com/" },
      { text: "3Blue1Brown (Math)", url: "https://www.3blue1brown.com/" },
      { text: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
    ],
  },
  {
    phase: "Phase 2 · Core AI",
    duration: "3–6 months",
    title: "Machine Learning & Deep Learning",
    icon: Brain,
    summary:
      "Learn how models actually learn. Work through classical ML first, then deep learning, always pairing theory with hands-on training so the intuition sticks.",
    items: [
      "ML algorithms, model selection, and evaluation metrics",
      "Neural networks and a framework (PyTorch or TensorFlow)",
      "Computer vision, NLP, and other domain applications",
      "Model training, validation, and hyperparameter tuning",
    ],
    resources: [
      { text: "Coursera ML (Andrew Ng)", url: "https://www.coursera.org/learn/machine-learning" },
      { text: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
      { text: "fast.ai Course", url: "https://course.fast.ai/" },
      { text: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" },
    ],
  },
  {
    phase: "Phase 3 · Engineering",
    duration: "3–5 months",
    title: "MLOps & Production Systems",
    icon: Settings,
    summary:
      "The gap between a notebook and a product is engineering. This is where most aspiring AI engineers stall — and where the real jobs are. Learn to ship, monitor, and maintain models in production.",
    items: [
      "Model versioning, experiment tracking, and reproducibility",
      "CI/CD for ML, automated testing, and monitoring",
      "Cloud platforms (AWS/GCP/Azure) and containerization",
      "Model serving, API design, and performance optimization",
    ],
    resources: [
      { text: "Google MLOps Guide", url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning" },
      { text: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/" },
      { text: "Docker Curriculum", url: "https://docker-curriculum.com/" },
    ],
  },
  {
    phase: "Phase 4 · Data",
    duration: "2–4 months",
    title: "Data Engineering & Infrastructure",
    icon: Database,
    summary:
      "Models are only as good as their data. Learn to build reliable pipelines and feature stores so your systems are fed clean, well-governed data at scale.",
    items: [
      "Data pipelines, ETL, and data-quality checks",
      "Database design, warehousing, and streaming systems",
      "Feature engineering, preprocessing, and validation",
      "Privacy, security, and compliance considerations",
    ],
    resources: [
      { text: "Data Engineering Zoomcamp", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp" },
      { text: "GCP Data Engineer Path", url: "https://cloud.google.com/certification/data-engineer" },
      { text: "dbt Docs", url: "https://docs.getdbt.com/docs/introduction" },
    ],
  },
  {
    phase: "Phase 5 · Specialization",
    duration: "Ongoing",
    title: "Choose Your Focus Area",
    icon: Target,
    summary:
      "Generalists get hired; specialists get promoted. Pick a lane — LLMs and agents are the hottest right now — and go deep enough to build non-trivial systems in it.",
    items: [
      "LLMs and agents (prompt engineering, fine-tuning, RAG)",
      "Computer vision (detection, segmentation, generation)",
      "Robotics and autonomous-systems integration",
      "AI product management and business applications",
    ],
    resources: [
      { text: "Hugging Face Course", url: "https://huggingface.co/course/chapter1" },
      { text: "OpenAI Cookbook", url: "https://platform.openai.com/docs/overview" },
      { text: "Stanford CS231n", url: "https://cs231n.stanford.edu/" },
    ],
  },
  {
    phase: "Phase 6 · Leadership",
    duration: "Ongoing",
    title: "Team & Communication Skills",
    icon: Users,
    summary:
      "Senior AI engineering is as much about judgment and communication as code. Learn to align stakeholders, mentor others, and build AI responsibly.",
    items: [
      "Technical communication and stakeholder management",
      "Code review, mentoring, and knowledge sharing",
      "Project planning, risk assessment, and timelines",
      "Ethics, bias detection, and responsible-AI practices",
    ],
    resources: [
      { text: "re:Work by Google", url: "https://rework.withgoogle.com/" },
      { text: "AI Ethics (DeepLearning.AI)", url: "https://learn.deeplearning.ai/ai-ethics" },
    ],
  },
];

const faqs = [
  {
    q: "How long does it take to become an AI engineer?",
    a: "For someone starting from basic programming, a focused path through this roadmap typically takes 12–18 months to reach a hireable level, and longer to reach senior. The Foundation and Core AI phases are the heaviest; Engineering and Specialization are where you become employable.",
  },
  {
    q: "Is there a free AI engineering roadmap PDF?",
    a: "Yes. You can download the full AI engineering roadmap as a free PDF from this page — no signup required. It summarizes all six phases and the recommended resources so you can follow along offline.",
  },
  {
    q: "Do I need a degree to become an AI engineer?",
    a: "No. A degree helps but is not required. What matters is demonstrable skill: shipped projects, a portfolio, and the ability to take a model to production. This roadmap is built around building things, not collecting credentials.",
  },
  {
    q: "What should I specialize in for 2026?",
    a: "LLMs and agentic systems have the strongest demand right now, followed by applied computer vision. Whichever you pick, go deep enough to build and deploy non-trivial systems — depth beats breadth for getting hired.",
  },
  {
    q: "How much do AI engineers make?",
    a: "In the US in 2026, AI engineers earn roughly $100K–$250K, with a Glassdoor average around $144K and big-tech total compensation well above that (often $250K+). See our full 2026 AI engineer salary breakdown by level, company, and city for the details.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "AI Engineering Roadmap",
  description:
    "A step-by-step roadmap to become an AI engineer, from programming and math fundamentals through machine learning, MLOps, data engineering, specialization, and leadership.",
  totalTime: "P18M",
  step: phases.map((p, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: p.title,
    text: p.summary,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const RoadmapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              AI Engineering Roadmap 2026: Step-by-Step Guide (Free PDF)
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A complete, practical roadmap to become an AI engineer — from Python and math fundamentals through
              machine learning, MLOps, data engineering, and specializing in LLMs and agents. Six phases, curated
              resources, and a free downloadable PDF. Built by practitioners, not theorists.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={PDF} download="ai-engineering-roadmap.pdf">
                  <FileDown className="mr-2 h-5 w-5" />
                  Download the free roadmap PDF
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blogs">Read the latest AI engineering articles</Link>
              </Button>
            </div>
          </header>

          <section className="mb-10">
            <h2 id="how-to-become" className="text-2xl font-bold mb-3">How do you become an AI engineer?</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              In short: <strong>learn Python and the math fundamentals, get hands-on with machine learning and deep
              learning, then — the step most people skip — build and ship real projects to production</strong> (MLOps),
              and specialize in a high-demand area like LLMs and agents. You do not need a formal degree; a portfolio of
              shipped work is what actually gets you hired. The six phases below are that path in order, and you can grab
              the whole thing as a <a href={PDF} download="ai-engineering-roadmap.pdf" className="text-primary hover:underline">free AI engineer roadmap PDF</a>.
              Curious what it pays? See our{" "}
              <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">2026 AI engineer salary breakdown</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">How to use this roadmap</h2>
            <p className="text-muted-foreground leading-relaxed">
              Work the phases roughly in order, but treat them as overlapping, not strictly sequential — you will
              revisit fundamentals as you specialize. The single biggest differentiator between people who stall and
              people who get hired is <strong>Phase 3 (MLOps &amp; Production)</strong>: the ability to take a model out
              of a notebook and into a running product. Don't skip it.
            </p>
          </section>

          <div className="space-y-6">
            {phases.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.phase} className="p-6 bg-gradient-card border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.phase}</span>
                        <span className="text-xs text-muted-foreground">{p.duration}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-3">{p.summary}</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
                        {p.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {p.resources.map((r) => (
                          <a
                            key={r.url}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {r.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <section className="my-10 rounded-xl border border-border bg-muted/40 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Get the full roadmap as a PDF</h2>
            <p className="text-muted-foreground mb-4">
              Prefer to follow along offline? Download the complete AI engineering roadmap — all six phases and
              resources — as a free PDF.
            </p>
            <Button asChild size="lg">
              <a href={PDF} download="ai-engineering-roadmap.pdf">
                <FileDown className="mr-2 h-5 w-5" />
                Download the roadmap PDF
              </a>
            </Button>
          </section>

          <NewsletterSignup
            heading="Want the roadmap sent to you — plus what's next?"
            subtext="Join the AI engineering newsletter for practical breakdowns on agents, LLMs, and breaking into the field. Subscribe and we'll email you the roadmap PDF too."
          />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Where to go next</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once you reach the specialization phase, our articles go deep on the highest-demand tracks: running{" "}
              <Link to="/blog/ollama-mac-local-ai-2025" className="text-primary hover:underline">
                local LLMs on your own machine
              </Link>
              , understanding{" "}
              <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">
                what makes an LLM agentic
              </Link>
              , and the{" "}
              <Link to="/blog/hermes-agent-nous-research-guide" className="text-primary hover:underline">
                open-source agent frameworks
              </Link>{" "}
              engineers are building on today.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-semibold mb-1">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
