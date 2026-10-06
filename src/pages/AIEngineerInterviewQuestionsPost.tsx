import { ArrowLeft, Clock, User, Calendar, ListChecks, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import InterviewQuestionsHeroDiagram from "@/components/InterviewQuestionsHeroDiagram";
import NewsletterSignup from "@/components/NewsletterSignup";
import TopmateCTA from "@/components/TopmateCTA";

/** Underlined, high-contrast external reference link. */
const RefLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
    {children}
  </a>
);

type InterviewQuestion = { q: string; cover: React.ReactNode };

/** Styled list of example interview questions with a "what a strong answer covers" note. */
const QuestionList = ({ items }: { items: InterviewQuestion[] }) => (
  <ol className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 list-none pl-0">
    {items.map((item, i) => (
      <li key={item.q} className="border border-border rounded-lg p-3 sm:p-4 bg-card/50">
        <p className="font-semibold text-sm sm:text-base mb-1">
          <span className="text-primary mr-2">Q{i + 1}.</span>
          {item.q}
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
          <span className="font-medium text-foreground">What to cover: </span>
          {item.cover}
        </p>
      </li>
    ))}
  </ol>
);

const rounds = [
  { name: "Recruiter screen", what: "Role fit, a walk through your resume and one or two projects, logistics and expectations. Short, but it decides whether the rest of the loop happens." },
  { name: "Coding", what: "Usually one or two sessions. Standard data-structures-and-algorithms problems still appear, increasingly mixed with practical tasks around calling, parsing, and orchestrating LLMs." },
  { name: "ML / DL fundamentals", what: "Can you reason about models, data, training, and evaluation — not recite definitions. This is where candidates who only know APIs get exposed." },
  { name: "LLM & GenAI depth", what: "RAG, embeddings, vector search, agents and tool calling, prompting, evaluation, hallucination, context windows, cost and latency. The round that most distinguishes an AI engineer loop in 2026." },
  { name: "System design for AI apps", what: "Design a real LLM-powered system end to end. Interviewers probe data flow, retrieval, evaluation, failure modes, cost, and safety." },
  { name: "Take-home or project deep-dive", what: "Either a small build you complete on your own time, or a long walkthrough of something you already shipped — with hard follow-up questions on every decision." },
  { name: "Behavioral & role fit", what: "How you work, how you handle ambiguity and failures, how you decide what to build versus buy, and how you keep up with a field that changes monthly." },
];

const mlQuestions: InterviewQuestion[] = [
  {
    q: "Explain the bias-variance trade-off. How would you diagnose which one your model suffers from?",
    cover: "High bias shows as poor training and validation performance together (underfitting); high variance shows as a large gap between training and validation (overfitting). Mention the remedies for each — more capacity or features versus regularization, more data, or simpler models — and that you diagnose it from learning curves, not intuition.",
  },
  {
    q: "What is overfitting and what are three concrete ways to reduce it?",
    cover: "Define it as fitting noise instead of signal. Then name real levers: L1/L2 regularization, dropout, early stopping, data augmentation, cross-validation for model selection, and simply collecting more or better data. Strong answers mention that the right lever depends on whether you are data-limited or capacity-limited.",
  },
  {
    q: "How do you split data into train, validation, and test sets, and what is data leakage?",
    cover: "Explain the role of each split and why the test set is touched once. Leakage is any information from outside the training fold influencing the model — target leakage, pre-processing fit on the whole dataset, time-ordered data shuffled randomly, duplicates across splits. Give one example you have actually caught.",
  },
  {
    q: "Walk me through gradient descent. Why do people use Adam instead of plain SGD?",
    cover: "Describe the update step and the role of the learning rate. Contrast batch, mini-batch, and stochastic variants. For Adam, explain per-parameter adaptive learning rates from first and second moment estimates, and be honest that SGD with momentum sometimes generalizes better — this shows you know it is a trade-off, not a default.",
  },
  {
    q: "Accuracy is 97%. Why might that be a terrible result?",
    cover: "Class imbalance. Walk through precision, recall, F1, ROC-AUC, PR-AUC, and when each matters (fraud and medical screening want recall; spam wants precision). Mention calibration and the confusion matrix. Bonus: tie it back to how you would pick a threshold for the business problem.",
  },
  {
    q: "What is an embedding? How would you check whether an embedding model is good for your task?",
    cover: "A learned dense vector where geometric distance reflects semantic similarity. Good answers distinguish word, sentence, and document embeddings, mention cosine versus dot-product similarity, and describe evaluating on a retrieval benchmark built from your own data rather than trusting a leaderboard.",
  },
  {
    q: "Explain attention and why transformers replaced RNNs for sequence tasks.",
    cover: (
      <>
        Attention lets every token weigh every other token directly, so long-range dependencies are not squeezed through a recurrent bottleneck and the computation parallelizes across the sequence (
        <RefLink href="https://arxiv.org/abs/1706.03762">Vaswani et al., 2017</RefLink>
        ). Mention queries, keys, values, multi-head attention, and the quadratic cost in sequence length — that last point sets up the context-window questions later.
      </>
    ),
  },
  {
    q: "What is the difference between a generative and a discriminative model?",
    cover: "Discriminative models learn P(y|x) directly — the decision boundary. Generative models learn the joint P(x, y) or P(x) and can sample new data. Give an example of each and when you would choose one, then connect it to LLMs as autoregressive generative models over tokens.",
  },
  {
    q: "How does fine-tuning differ from training from scratch, and when would you do neither?",
    cover: (
      <>
        Fine-tuning adapts pretrained weights with a small labeled set; training from scratch is rarely justified outside foundation labs. The "neither" answer is prompting or retrieval — see{" "}
        <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs fine-tuning</Link>{" "}
        for the decision framework interviewers expect you to articulate.
      </>
    ),
  },
];

const llmQuestions: InterviewQuestion[] = [
  {
    q: "When would you use RAG instead of fine-tuning, and when the reverse?",
    cover: (
      <>
        RAG when knowledge changes often, must be cited, or is private and large; fine-tuning when you need to change behavior, format, or style, or when latency and token cost from stuffing context are too high. Say that they are not mutually exclusive. Our{" "}
        <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs fine-tuning guide</Link>{" "}
        walks through the exact decision tree.
      </>
    ),
  },
  {
    q: "Walk me through a RAG pipeline end to end. Where does quality usually break?",
    cover: (
      <>
        Ingestion → chunking → embedding → indexing → query → retrieval → re-ranking → prompt assembly → generation → evaluation (the original formulation is{" "}
        <RefLink href="https://arxiv.org/abs/2005.11401">Lewis et al., 2020</RefLink>
        ). Quality usually breaks at retrieval, not generation: bad chunking, wrong embedding model, no re-ranker, or a query that does not resemble the stored text. Interviewers want to hear that you debug retrieval first.
      </>
    ),
  },
  {
    q: "How do you choose a chunking strategy and chunk size?",
    cover: (
      <>
        Explain fixed-size, recursive, semantic, and document-aware chunking, and why too-small chunks lose context while too-large chunks dilute the match. Say that chunk size is a hyperparameter you tune against a retrieval eval set, not a constant. Our{" "}
        <Link to="/blog/rag-chunking-strategies" className="text-primary hover:underline">chunking strategies post</Link>{" "}
        covers the trade-offs in depth.
      </>
    ),
  },
  {
    q: "How would you pick a vector database? Do you even need one?",
    cover: (
      <>
        Start with the honest answer: for small corpora, a library in-process or a Postgres extension is enough. Then cover the real criteria — index type (HNSW, IVF), filtering and metadata support, hybrid search with keyword retrieval, scaling and operational cost. See{" "}
        <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">how to choose a vector database for RAG</Link>.
      </>
    ),
  },
  {
    q: "What causes hallucination and how do you reduce it in a production system?",
    cover: "Hallucination is the model producing fluent but unsupported output; in RAG it often means the answer is not grounded in the retrieved context. Reduce it with better retrieval, instructing the model to abstain, citation requirements, constrained output, and — crucially — measuring faithfulness so you know whether your fixes worked.",
  },
  {
    q: "How do you evaluate a RAG system? What metrics would you report?",
    cover: (
      <>
        Separate retrieval metrics (context precision, context recall, hit rate, MRR) from generation metrics (faithfulness, answer relevance, correctness against a golden set). Mention LLM-as-judge and its pitfalls, and that you need a labeled eval set before you change anything. Our{" "}
        <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">RAG evaluation metrics guide</Link>{" "}
        is the reference here.
      </>
    ),
  },
  {
    q: "What is an AI agent, and how does tool calling actually work?",
    cover: (
      <>
        An agent is an LLM in a loop that decides which tools to call, observes results, and continues until a goal is met. Explain tool schemas, how the model emits a structured call, how you execute it and feed the result back, and why you need step limits, timeouts, and guardrails. Compare the trade-offs of the frameworks you have used — see{" "}
        <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">open-source AI agent frameworks</Link>.
      </>
    ),
  },
  {
    q: "How do you design a prompt you can actually maintain in production?",
    cover: "Treat prompts as code: version them, test them against a fixed eval set, separate system instructions from user content, use few-shot examples sparingly and deliberately, and prefer structured output (JSON schemas, function calling) over parsing free text. Mention prompt injection and how you isolate untrusted content.",
  },
  {
    q: "A longer context window is available. Does that make RAG unnecessary?",
    cover: "No. Cover the cost and latency of filling a large context on every request, the degradation of recall for information buried in the middle of long inputs, and the lack of citations or freshness. Long context and retrieval are complementary — a strong answer describes using retrieval to decide what goes into the window.",
  },
  {
    q: "How do you reduce cost and latency in an LLM application without hurting quality?",
    cover: "Model routing (small model for easy requests, large for hard ones), caching of embeddings and responses, prompt compression, streaming for perceived latency, batching, shorter outputs via structured formats, and evaluating smaller or open-weight models against your eval set. Always say how you would measure the quality impact.",
  },
];

const designPrompts = [
  { prompt: "Design a chatbot that answers questions over your company's internal documents.", probes: "Ingestion and permissions, chunking, embedding and index choice, hybrid retrieval, re-ranking, citation, abstaining when nothing relevant is found, evaluation set and metrics, cost per query." },
  { prompt: "Design an agent that books meetings on behalf of a user across calendars and email.", probes: "Tool definitions, planning loop, confirmation before irreversible actions, state and memory, handling partial failures, auditing every action, limiting steps and spend." },
  { prompt: "Design a customer-support assistant that must never leak PII or make commitments the company cannot honor.", probes: "PII detection and redaction before the model sees data, guardrails on inputs and outputs, escalation to humans, logging, red-teaming, and how you measure safety regressions." },
  { prompt: "Design a code-review assistant that runs on every pull request for a large engineering org.", probes: "Rate limits and queueing, caching across identical diffs, context selection from a large repo, structured output, false-positive rate, developer feedback loop, cost at scale." },
  { prompt: "Design an LLM-powered search for an e-commerce catalog of millions of products.", probes: "Hybrid search (keyword plus dense), latency budget, re-ranking, query understanding, evaluation with click or relevance data, index refresh for changing inventory." },
  { prompt: "You have an existing RAG system whose answers users rate poorly. How would you find out why and fix it?", probes: "Separating retrieval failures from generation failures, building an eval set from real logs, measuring context recall and faithfulness, prioritizing fixes by measured impact rather than guesswork." },
];

const codingTasks = [
  { task: "Implement a retry-with-exponential-backoff wrapper around an LLM API call.", note: "Handle rate-limit errors differently from bad-request errors, cap retries, add jitter, and make it reusable across providers. Interviewers watch whether you think about idempotency and timeouts." },
  { task: "Parse a document and split it into chunks with a configurable size and overlap.", note: "Respect sentence or paragraph boundaries where possible; discuss what happens at the edges and why overlap exists. Write it so it is testable." },
  { task: "Write a function that computes cosine similarity and returns the top-k most similar vectors.", note: "Get the math right, handle zero vectors, and talk about why you would use a vectorized library or an approximate index as the corpus grows." },
  { task: "Given a stream of tokens from a model, assemble and validate a JSON object as it arrives.", note: "Shows you have dealt with structured output in practice — partial parsing, schema validation, and what to do when the model returns malformed output." },
  { task: "Implement a simple rate limiter or token-bucket for outbound API requests.", note: "A classic that is doubly relevant because provider rate limits are a daily reality in LLM systems." },
  { task: "Deduplicate near-identical documents before indexing.", note: "Exact hashing first, then discuss embeddings or MinHash for near-duplicates and the trade-off between precision and cost." },
];

const behavioralQuestions = [
  { q: "Tell me about a time a model failed in production. What did you do?", note: "Describe detection (monitoring, user reports, eval drift), containment (fallbacks, rollback, abstaining), root cause, and the permanent fix. The interviewer is checking whether you own outcomes, not just models." },
  { q: "How do you decide between calling a hosted model API and building or hosting your own?", note: "Data privacy, latency, cost at your volume, need for fine-tuning, vendor lock-in, and the engineering capacity of your team. Give a concrete example where you chose each." },
  { q: "How do you handle hallucinations when a stakeholder asks you to 'just make the model stop lying'?", note: "Translate the request into measurable terms — faithfulness on an eval set — explain the realistic options and their costs, and set expectations about what can be guaranteed." },
  { q: "The field changes every month. How do you decide what to learn and what to ignore?", note: "Have a real system: a small set of sources, hands-on experiments with anything that could change your stack, and a bias toward fundamentals that survive tool churn. Name something recent you evaluated and chose not to adopt." },
  { q: "Describe a project where you had to ship with imperfect evaluation data.", note: "Show how you built a small golden set, used proxies, shipped behind a flag, and iterated. Interviewers want pragmatism plus intellectual honesty about uncertainty." },
  { q: "Tell me about a disagreement with a product manager or researcher about an AI feature.", note: "Focus on how you used data or a quick experiment to resolve it, and what you learned about communicating model limitations to non-engineers." },
];

// Q&A also emitted as FAQPage JSON-LD at build time (see postbuild-seo.mjs).
const faqs = [
  {
    q: "What questions are asked in an AI engineer interview?",
    a: "A typical AI engineer interview loop in 2026 has a recruiter screen, a coding round (standard data structures and algorithms plus practical tasks like wrapping an LLM call with retries or chunking a document), a machine learning and deep learning fundamentals round (bias-variance, overfitting, evaluation metrics, embeddings, attention), an LLM and generative AI depth round (RAG versus fine-tuning, chunking and vector search, hallucination and evaluation, agents and tool calling, prompting, cost and latency), a system design round where you design a real LLM application, often a take-home or project deep-dive, and a behavioral round with AI-specific questions about handling model failures in production and build-versus-API decisions.",
  },
  {
    q: "How do I prepare for an AI engineer interview?",
    a: "Ground your fundamentals first so you can explain models, training, and evaluation from first principles, then build one end-to-end portfolio project — a real RAG or agent system with retrieval, evaluation, and a deployed interface — that you know cold. Practice explaining trade-offs out loud (RAG versus fine-tuning, chunk size, vector database choice, model routing for cost), mock the AI system design round with a friend or mentor, and prepare behavioral stories about production failures and build-versus-buy decisions. Our AI engineer skills post and the AI engineering roadmap give you a structured path.",
  },
  {
    q: "Do AI engineer interviews still ask LeetCode/DSA questions?",
    a: "Often, yes. Most companies still include at least one coding round with standard data-structures-and-algorithms problems, but in AI engineer loops that round is weighted alongside machine learning fundamentals, LLM and RAG depth, and applied system design rather than being the whole interview. Many teams also replace or supplement pure algorithm problems with practical tasks such as implementing retry logic for an LLM call, chunking a document, or computing cosine similarity. The exact mix varies a lot by company, so ask your recruiter what the loop looks like.",
  },
  {
    q: "What is the difference between an AI engineer and ML engineer interview?",
    a: "The overlap is large and titles vary by company, but in 2026 AI engineer interviews lean toward LLMs, RAG, agents, prompting, evaluation of generative systems, and designing applied LLM applications end to end. Machine learning engineer interviews lean more toward classical machine learning, modeling and feature engineering, training pipelines, experiment design, and serving or MLOps infrastructure. Both will test fundamentals like bias-variance, evaluation metrics, and data leakage, and both usually include coding and system design rounds.",
  },
  {
    q: "What should I build to pass an AI engineer interview?",
    a: "Build one end-to-end project that demonstrates a real RAG or agent system rather than several shallow demos: ingest real documents or connect real tools, implement retrieval with a sensible chunking and embedding strategy, add an evaluation set with retrieval and generation metrics, handle failures and guardrails, and deploy a usable interface. Depth beats breadth — interviewers will probe every decision you made, so a project where you can explain why you chose each component, what you measured, and what went wrong is far more valuable than a long list of tutorials.",
  },
  {
    q: "How technical is the AI engineer system design round?",
    a: "Very. You are asked to design a real LLM or AI application — for example a chatbot over company documents or an agent that books meetings — and then probed on data flow, how retrieval works and why you chose that approach, how you evaluate quality and catch regressions, what failure modes exist and how you handle them, cost and latency at the expected scale, and safety including guardrails, PII handling, and preventing irreversible actions. Strong candidates draw the system, state their assumptions, name the trade-offs explicitly, and explain how they would measure whether it works.",
  },
];

const AIEngineerInterviewQuestionsPost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <TableOfContents />

          <div className="flex-1 w-full max-w-none lg:max-w-4xl">
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 sm:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Insights</span>
              </Button>
            </Link>

            <header className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-800 rounded-full px-3 py-1">
                  <ListChecks className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Engineering Careers</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                AI Engineer Interview Questions (2026): What Gets Asked, Round by Round
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>AI engineer interview questions in 2026 are not the same as a generic software loop</strong> —
                you still get a coding round, but the weight has shifted to LLM and RAG depth, applied system design
                for AI applications, and whether you can explain real trade-offs out loud. This guide walks through
                every round of a typical AI engineer interview, gives realistic example questions with notes on what a
                strong answer covers, and ends with a concrete prep plan built on our{" "}
                <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">AI engineer skills</Link>{" "}
                breakdown and the{" "}
                <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <div className="font-semibold text-base sm:text-lg hover:underline">Gurram Poorna Prudhvi</div>
                    </Link>
                    <p className="text-muted-foreground text-sm sm:text-base">Lead AI Engineer</p>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1 flex-shrink-0">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Career Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Oct 7, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      14 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <InterviewQuestionsHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="what-to-expect" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What to expect: the shape of an AI engineer loop in 2026</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Most AI engineer interview loops follow a recognizable sequence, even though the order, the number
                  of sessions, and the names vary from company to company. Knowing the shape in advance lets you
                  prepare for each round deliberately instead of treating the whole thing as one undifferentiated
                  "AI interview."
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    {rounds.map((r, i) => (
                      <li key={r.name}>
                        <strong>{i + 1}. {r.name}.</strong>{" "}
                        <span className="text-muted-foreground">{r.what}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>How this differs from other loops.</strong> Compared with a generic software engineering
                  interview, an AI engineer interview spends far less of its total time on algorithm puzzles and far
                  more on whether you can build, evaluate, and operate systems whose core component is probabilistic.
                  Compared with a research scientist loop, it cares much less about novel methods or paper-level
                  math and much more about shipping: retrieval quality, evaluation harnesses, cost, latency, and
                  failure handling in production. If you are coming from either side, the{" "}
                  <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">skills breakdown</Link>{" "}
                  shows where the gaps usually are, and{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">how to become an AI engineer</Link>{" "}
                  covers the transition itself.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="ml-fundamentals" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Machine learning and deep learning fundamentals questions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This round overlaps heavily with classic machine learning engineer interview questions, and it is
                  where candidates who learned AI entirely through LLM APIs tend to struggle. Interviewers are not
                  testing memorized definitions — they want to see you reason about why a model behaves the way it
                  does and what you would change. Expect follow-ups on every answer.
                </p>
                <QuestionList items={mlQuestions} />
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A useful habit while preparing: for each concept, be ready with one definition, one diagnostic
                  ("how would I know this is happening?"), and one fix. That three-part structure is exactly what a
                  strong answer sounds like in the room.
                </p>
              </section>

              <NewsletterSignup
                heading="Get the weekly AI engineering brief"
                subtext="Interview prep, career moves, RAG, agents, evals, and the tools worth using — one practical email a week. Plus the free roadmap PDF."
              />

              <section className="mb-6 sm:mb-8">
                <h2 id="llm-genai" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">LLM and generative AI questions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This is the round that separates an AI engineer interview from everything else in 2026. The
                  questions are practical: have you actually built retrieval-augmented systems, agents, and
                  evaluation harnesses, and do you understand why they fail? Vague answers that could have come from
                  a product page get exposed quickly, because every question has a "why" and a "how did you measure
                  it" behind it.
                </p>
                <QuestionList items={llmQuestions} />
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Notice the pattern across these: almost every strong answer ends with <em>how you would measure
                  it</em>. If you internalize nothing else from this section, internalize that evaluation is the
                  connective tissue of LLM engineering — it is what turns "I tried a few prompts" into engineering.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="system-design" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">System design for AI and LLM applications</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The AI system design round takes the format of a traditional design interview — whiteboard, open
                  prompt, forty-five to sixty minutes — but the components and the failure modes are different. You
                  are expected to drive: clarify requirements, draw the data flow, make choices, and name the
                  trade-offs before the interviewer has to pull them out of you.
                </p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {designPrompts.map((d) => (
                    <div key={d.prompt} className="border border-border rounded-lg p-3 sm:p-4 bg-card/50">
                      <p className="font-semibold text-sm sm:text-base mb-1">{d.prompt}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        <span className="font-medium text-foreground">What gets probed: </span>
                        {d.probes}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  <strong>What interviewers are really probing.</strong> Across all of these prompts the same six
                  things come up: <strong>data flow</strong> (where documents, queries, and tool results move and
                  what is stored), <strong>retrieval</strong> (chunking, embeddings, index, hybrid search,
                  re-ranking — see{" "}
                  <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">choosing a vector database</Link>
                  ), <strong>evaluation</strong> (how you know it works and how you catch regressions — see{" "}
                  <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">RAG evaluation metrics</Link>
                  ), <strong>failure modes</strong> (empty retrieval, tool errors, malformed output, prompt
                  injection), <strong>cost and latency</strong> (model routing, caching, streaming, batching), and{" "}
                  <strong>safety</strong> (guardrails, PII, confirmation before irreversible actions). Walk through
                  all six unprompted and you will be ahead of most candidates.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="coding" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The coding round</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Standard data-structures-and-algorithms problems have not disappeared from AI engineer interviews
                  — arrays, hash maps, trees, graphs, and the usual dynamic-programming suspects still show up, and
                  you should be comfortable solving medium-difficulty problems cleanly while talking through
                  complexity. What has changed is that many teams now add or substitute practical tasks drawn from
                  the daily work of an AI engineer. These test whether you can write robust glue code around
                  non-deterministic, rate-limited, occasionally failing services.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    {codingTasks.map((c) => (
                      <li key={c.task}>
                        <strong>{c.task}</strong>{" "}
                        <span className="text-muted-foreground">{c.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  In both styles of coding question, the evaluation criteria are the same: correctness, clarity, and
                  how you handle edge cases and errors. In the practical tasks specifically, interviewers pay close
                  attention to whether you think about timeouts, retries, idempotency, and observability without
                  being prompted — because in production those are the things that page you at 2 a.m.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="behavioral" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Behavioral and role-fit questions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The behavioral round covers the usual ground — collaboration, conflict, ownership, ambiguity — but
                  AI engineer interviews add a layer of questions that only make sense for someone who has shipped
                  probabilistic systems. Prepare two or three detailed stories from your own work that you can
                  adapt; interviewers can tell the difference between a lived example and a rehearsed hypothetical.
                </p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {behavioralQuestions.map((b) => (
                    <div key={b.q} className="border border-border rounded-lg p-3 sm:p-4 bg-card/50">
                      <p className="font-semibold text-sm sm:text-base mb-1">{b.q}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        <span className="font-medium text-foreground">What to cover: </span>
                        {b.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-prepare" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to prepare for an AI engineer interview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  AI engineer interview prep is most effective when it mirrors the loop itself. Here is the plan we
                  recommend, roughly in order — adjust the time you spend on each based on where the rounds above
                  felt weakest.
                </p>
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    <li>
                      • <strong>Ground your fundamentals.</strong> Work through the{" "}
                      <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">AI engineer skills breakdown</Link>{" "}
                      and the{" "}
                      <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI engineering roadmap</Link>{" "}
                      and be honest about which items you can explain from first principles versus only use. For
                      each ML concept, prepare a definition, a diagnostic, and a fix.
                    </li>
                    <li>
                      • <strong>Build one end-to-end portfolio project.</strong> A real RAG or agent system over
                      real data: ingestion, chunking, retrieval, a tool or two, an evaluation set with retrieval
                      and generation metrics, basic guardrails, and a deployed interface. One deep project you can
                      defend beats five tutorials you cannot.
                    </li>
                    <li>
                      • <strong>Practice explaining trade-offs out loud.</strong> RAG versus fine-tuning, chunk
                      size, vector database choice, hosted API versus self-hosted model, model routing for cost.
                      Record yourself; the gap between knowing and articulating is bigger than you expect.
                    </li>
                    <li>
                      • <strong>Know your own projects cold.</strong> Every number on your resume will be probed:
                      why that embedding model, why that chunk size, what the eval set looked like, what went
                      wrong, what you would do differently. If you cannot answer, remove the claim.
                    </li>
                    <li>
                      • <strong>Mock the system design round.</strong> Take two or three of the prompts above,
                      set a timer, and design them on a whiteboard with a friend or mentor playing a skeptical
                      interviewer. Force yourself to hit data flow, retrieval, evaluation, failure modes, cost,
                      and safety every time.
                    </li>
                    <li>
                      • <strong>Prepare behavioral stories.</strong> A production failure, a build-versus-buy
                      decision, a disagreement resolved with data, and a time you shipped with imperfect
                      evaluation. Structure each as situation, action, measured result, and lesson.
                    </li>
                    <li>
                      • <strong>Understand levels and compensation before the offer stage.</strong> Knowing how
                      AI engineer roles are leveled and what drives pay helps you answer the recruiter's
                      expectation question and negotiate later — see our{" "}
                      <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">AI engineer salary guide</Link>{" "}
                      for the factors that matter.
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you are earlier in the journey and the rounds above feel out of reach, start with{" "}
                  <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">how to become an AI engineer</Link>{" "}
                  — it lays out the path from wherever you are now to being ready for this loop.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="faq" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{f.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{f.a}</p>
                  </div>
                ))}
                <TopmateCTA />
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 id="references" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">References and related guides</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <RefLink href="https://arxiv.org/abs/1706.03762">Vaswani et al. — Attention Is All You Need (arXiv, 2017)</RefLink></li>
                  <li>• <RefLink href="https://arxiv.org/abs/2005.11401">Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (arXiv, 2020)</RefLink></li>
                  <li>• <Link to="/blog/ai-engineer-skills" className="text-primary hover:underline">AI Engineer Skills: What You Actually Need</Link></li>
                  <li>• <Link to="/blog/how-to-become-an-ai-engineer" className="text-primary hover:underline">How to Become an AI Engineer</Link></li>
                  <li>• <Link to="/blog/ai-engineer-salary" className="text-primary hover:underline">AI Engineer Salary Guide</Link></li>
                  <li>• <Link to="/ai-engineering-roadmap" className="text-primary hover:underline">AI Engineering Roadmap</Link></li>
                  <li>• <Link to="/blog/rag-vs-fine-tuning" className="text-primary hover:underline">RAG vs Fine-Tuning</Link></li>
                  <li>• <Link to="/blog/vector-database-for-rag" className="text-primary hover:underline">Choosing a Vector Database for RAG</Link></li>
                  <li>• <Link to="/blog/rag-evaluation-metrics" className="text-primary hover:underline">RAG Evaluation Metrics</Link></li>
                  <li>• <Link to="/blog/open-source-ai-agent-frameworks" className="text-primary hover:underline">Open-Source AI Agent Frameworks</Link></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/ai-engineer-interview-questions" />
      <Footer />
    </div>
  );
};

export default AIEngineerInterviewQuestionsPost;
