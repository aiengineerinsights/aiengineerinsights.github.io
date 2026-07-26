import { ArrowLeft, Clock, User, Calendar, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import MLOpsHeroDiagram from "@/components/MLOpsHeroDiagram";

const practices = [
  {
    id: "versioning",
    title: "1. Version everything — code, data, models, and config",
    tier: "Foundation",
    what: "Put every input that shapes a model under version control: source code, the exact dataset, the trained model artifact, and the config/hyperparameters. Tools: Git for code, DVC or lakeFS for data, a model registry for artifacts.",
    when: "Most valuable the moment more than one person touches the system, or when you need to reproduce or roll back a model that's been in production for months.",
    example: "A fraud model starts flagging good transactions. Because the training data snapshot and config were versioned, you diff last week's model against this week's, spot a corrupted feature in the new data pull, and roll back in minutes — instead of guessing for days.",
  },
  {
    id: "monitoring",
    title: "2. Monitor models in production (not just infra)",
    tier: "Reliability",
    what: "Track model-level signals continuously: prediction distribution, input-data drift, feature quality, latency, and — where you can get labels — live accuracy. Alert on drift, not just on 500s.",
    when: "Critical for any model facing a changing world: user behavior, markets, seasonality, adversaries. Uptime dashboards will say 'healthy' while the model quietly rots.",
    example: "A demand-forecasting model looks fine on Grafana (CPU, latency normal) but a drift alert fires: input distributions shifted after a pricing change. You catch degrading forecasts a week before finance would have noticed in the numbers.",
  },
  {
    id: "cicd",
    title: "3. Automate the training-to-deployment pipeline (CI/CD for ML)",
    tier: "Reliability",
    what: "Make training, testing, packaging, and deployment a repeatable pipeline triggered by code or data changes — not a sequence of manual notebook runs. Tools: GitHub Actions, GitLab CI, Kubeflow Pipelines, or Airflow.",
    when: "Pays off as soon as you retrain regularly or have more than a couple of models. Manual deploys don't scale and are where most production incidents are born.",
    example: "A new labeled batch lands weekly. The pipeline auto-trains, runs evaluation gates, and — only if metrics pass — promotes the model to staging for a one-click prod release. What used to be a nervous half-day is now a green checkmark.",
  },
  {
    id: "environments",
    title: "4. Make environments reproducible",
    tier: "Foundation",
    what: "Pin dependencies and containerize training and serving so the same code produces the same result anywhere. Tools: Docker, uv/Poetry lockfiles, and identical base images across train and serve.",
    when: "Essential when 'works on my machine' meets a different GPU driver, CUDA version, or library minor-bump in production. Also the backbone of reproducibility for audits.",
    example: "A model trains fine locally but gives different outputs in prod. The cause: a silently upgraded library. A pinned, containerized environment eliminates the whole class of 'it changed under me' bugs.",
  },
  {
    id: "experiment-tracking",
    title: "5. Track experiments systematically",
    tier: "Foundation",
    what: "Log every run's parameters, metrics, datasets, and artifacts so results are comparable and searchable. Tools: MLflow, Weights & Biases.",
    when: "Invaluable during active model development and whenever someone asks 'which run produced the model we shipped?' six weeks later.",
    example: "Three engineers try 40 configurations for a recommender. Because every run is tracked, you sort by offline NDCG, find the winner, and know exactly which data and hyperparameters produced it — no lost notebooks, no re-running.",
  },
  {
    id: "data-validation",
    title: "6. Validate data at the gates (train and serve)",
    tier: "Reliability",
    what: "Automatically check schema, ranges, nulls, and distributions on data entering training and inference. Reject or quarantine bad data before it reaches the model. Tools: Great Expectations, Pandera, TFX Data Validation.",
    when: "Highest value with upstream data you don't control — third-party feeds, event streams, other teams' tables — where a silent format change can poison a model.",
    example: "An upstream service starts sending prices in cents instead of dollars. A serving-time validation rule catches the 100x range violation and fails safe, instead of the model confidently producing garbage predictions for a day.",
  },
  {
    id: "eval-gates",
    title: "7. Put automated evaluation gates before every deploy",
    tier: "Reliability",
    what: "Block promotion unless a candidate model clears thresholds: offline metrics, regression tests against a fixed benchmark set, fairness checks, and slice-level performance. No green, no ship.",
    when: "Crucial once retraining is automated — otherwise automation happily ships a worse model. Also protects vulnerable slices from silent regressions.",
    example: "A retrained model improves overall accuracy but the gate flags a 6-point drop on a key customer segment. Deployment is blocked automatically, and you fix the imbalance before any user is affected.",
  },
  {
    id: "model-registry",
    title: "8. Use a model registry with staged promotion",
    tier: "Reliability",
    what: "Register models as versioned artifacts and move them through explicit stages (dev → staging → production) with approvals and metadata. Tools: MLflow Model Registry, SageMaker Model Registry.",
    when: "Important as soon as you have multiple models, multiple environments, or any compliance need to know exactly what's serving and who approved it.",
    example: "An incident asks 'what model was live at 2pm Tuesday?' The registry answers instantly — version, training run, approver — and gives you a one-click rollback to the previous production stage.",
  },
  {
    id: "safe-rollouts",
    title: "9. Roll out safely — canary, shadow, and instant rollback",
    tier: "Scale",
    what: "Never flip 100% of traffic to a new model. Use shadow mode (score live traffic without acting), canaries (small % first), or blue-green, and keep rollback one command away.",
    when: "Essential for high-traffic or high-stakes models where a bad deploy is expensive. Shadow mode is especially useful before you trust a model at all.",
    example: "A new pricing model runs in shadow for a week: you compare its prices to production without charging anyone. It looks great in aggregate but over-prices one region — caught with zero customer impact before the real rollout.",
  },
  {
    id: "feature-consistency",
    title: "10. Kill train-serve skew with consistent features",
    tier: "Scale",
    what: "Compute features the same way in training and serving — ideally from one shared pipeline or a feature store — so the model sees at inference what it saw during training.",
    when: "A top cause of 'great offline, bad online' models. Most dangerous when training features are computed in batch SQL and serving features in application code.",
    example: "A churn model uses a 30-day rolling average computed one way in the training warehouse and slightly differently in the live app. A feature store makes both read the identical definition, and online accuracy jumps to match offline.",
  },
  {
    id: "lineage",
    title: "11. Capture lineage and end-to-end observability",
    tier: "Scale",
    what: "Trace every prediction back through the model version, features, and source data that produced it, and keep logs/traces for debugging. Tools: OpenLineage, tracing on your serving layer.",
    when: "Indispensable during incidents and audits — when you must explain why a specific prediction happened, or which downstream models a bad dataset touched.",
    example: "A customer disputes an automated decision. Lineage lets you reconstruct the exact model version and feature values used for their case in minutes, satisfying both the customer and a compliance reviewer.",
  },
  {
    id: "retraining",
    title: "12. Close the loop — feedback and scheduled retraining",
    tier: "Scale",
    what: "Capture ground-truth outcomes and feed them back into retraining on a cadence (or triggered by drift), with the same gates as any other deploy. Automate the loop, don't retrain by heroics.",
    when: "Vital for models in fast-moving domains (recommendations, fraud, forecasting) where last quarter's model is already out of date.",
    example: "A fraud model retrains nightly on freshly labeled outcomes and auto-promotes only if it beats the incumbent on a held-out set — staying ahead of adversaries without an engineer babysitting it.",
  },
  {
    id: "cost",
    title: "13. Manage cost and compute deliberately",
    tier: "Governance",
    what: "Right-size training and serving, use spot/preemptible instances for interruptible jobs, autoscale inference, cache and batch where possible, and quantize models that don't need full precision.",
    when: "Matters most at scale, on GPUs, or with LLM inference — where a naive setup can 10x the bill for the same output.",
    example: "An LLM feature serves every request at full precision on always-on GPUs. Quantizing the model and autoscaling to demand cuts the monthly inference bill by 60% with no measurable quality loss.",
  },
  {
    id: "governance",
    title: "14. Bake in governance, security, and compliance",
    tier: "Governance",
    what: "Control access to data and models, log who did what, protect PII, document models (model cards), and keep an audit trail. Treat models and their data as first-class security assets.",
    when: "Non-negotiable in regulated domains (finance, healthcare) and increasingly expected everywhere under regimes like the EU AI Act.",
    example: "An auditor asks how a credit model handles protected attributes. Because model cards, access logs, and evaluation slices were maintained from day one, you produce the evidence the same afternoon instead of scrambling for weeks.",
  },
];

const faqs = [
  {
    q: "What is MLOps in simple terms?",
    a: "MLOps is DevOps for machine learning: the practices and tooling that take a model from a notebook to a reliable, monitored, repeatable production system — covering versioning, automated pipelines, deployment, monitoring, and governance.",
  },
  {
    q: "Where should a small team start?",
    a: "Start at the foundation: version your code, data, and models, make environments reproducible, and track experiments. Those three unlock everything above them and prevent the most painful failures — reproducing or rolling back a model — with the least effort.",
  },
  {
    q: "How is MLOps different from DevOps?",
    a: "DevOps ships code; MLOps ships code plus data plus a trained model, all three of which change independently. That's why MLOps adds data validation, model monitoring for drift, experiment tracking, and evaluation gates that plain DevOps doesn't need.",
  },
  {
    q: "Do I need all 14 practices to have good MLOps?",
    a: "No. Adopt them by impact and by your situation. A low-stakes internal model may need only the foundation and basic monitoring; a regulated, high-traffic model needs the full stack including safe rollouts, lineage, and governance.",
  },
];

const BlogPost1 = () => {
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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full px-3 py-1">
                  <Settings className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">MLOps</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                14 MLOps Best Practices, Ordered by Impact — With Examples of When Each One Saves You
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Most MLOps advice is a flat checklist. This is an impact-ordered one: start at the foundation, add
                reliability, then scale — with a concrete example of the exact production failure each practice prevents.
              </p>

              <Card className="p-4 sm:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
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
                      Practical Guide
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jul 25, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <MLOpsHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-read" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to read this list</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The practices below are ordered roughly by impact — how much production pain they prevent per unit of
                  effort. The <strong>foundation</strong> (versioning, reproducible environments, experiment tracking) comes
                  first because everything above it depends on it. Then a <strong>reliability</strong> layer that keeps a
                  live model trustworthy, a <strong>scale</strong> layer for when you have many models or high traffic, and
                  a <strong>governance</strong> cap for cost, security, and compliance. You don't need all 14 on day one —
                  adopt them as your stakes and scale grow. Each item says <em>what</em> it is, <em>when</em> it matters
                  most, and gives a concrete <em>example</em> of the failure it prevents.
                </p>
              </section>

              {practices.map((p) => (
                <section key={p.id} className="mb-6 sm:mb-8">
                  <h2 id={p.id} className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{p.title}</h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">{p.tier}</p>
                  <p className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base">{p.what}</p>
                  <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-3">
                    <p className="text-sm sm:text-base mb-2">
                      <strong className="text-foreground">When it matters most:</strong>{" "}
                      <span className="text-muted-foreground">{p.when}</span>
                    </p>
                    <p className="text-sm sm:text-base">
                      <strong className="text-foreground">Example:</strong>{" "}
                      <span className="text-muted-foreground">{p.example}</span>
                    </p>
                  </div>
                </section>
              ))}

              <section className="mb-6 sm:mb-8">
                <h2 id="putting-it-together" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Putting it together</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  If you do nothing else, do the foundation:{" "}
                  <Link to="/blog/what-makes-llms-agentic" className="text-primary hover:underline">building anything non-trivial</Link>{" "}
                  on ML — including modern LLM and agent systems — falls apart without reproducibility and tracking. Layer on
                  monitoring and evaluation gates before you automate retraining, or you'll automate your way into shipping
                  worse models. Add safe rollouts, feature consistency, and lineage as traffic and stakes rise. And treat
                  governance not as paperwork but as the thing that lets you move fast without fear when the auditor — or the
                  incident — arrives.
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
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/mlops-best-practices" />
      <Footer />
    </div>
  );
};

export default BlogPost1;
