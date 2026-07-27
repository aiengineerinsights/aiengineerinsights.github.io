import { ArrowLeft, Clock, User, Calendar, Database, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import DataPipelineHeroDiagram from "@/components/DataPipelineHeroDiagram";

const practices = [
  {
    id: "validation",
    title: "1. Validate data at the gates — fail bad data before the model sees it",
    tier: "Correctness",
    what: "Automatically check schema, ranges, nulls, uniqueness, and distributions at ingestion and before serving. Reject or quarantine violations instead of letting them flow downstream. Tools: Great Expectations, Pandera, dbt tests.",
    when: "Highest value with upstream data you don't control — third-party feeds, event streams, other teams' tables — where one silent format change poisons every model downstream.",
    example: "An upstream service switches a price field from dollars to cents. A range check at the gate catches the 100x jump and quarantines the batch, instead of a model training on corrupted data for a week.",
  },
  {
    id: "idempotency",
    title: "2. Make every step idempotent and re-runnable",
    tier: "Correctness",
    what: "Re-running a pipeline (or a single task) on the same input must produce the same output — no duplicates, no drift. Use deterministic transforms, upserts/merge instead of blind inserts, and partition overwrites.",
    when: "Essential the first time a job fails halfway and you have to re-run it — which is always. Non-idempotent pipelines create silent duplicates that corrupt aggregates and features.",
    example: "A nightly job dies after loading half a partition. Because writes are idempotent merges keyed by id, the retry safely completes the partition with zero duplicates — no manual cleanup.",
  },
  {
    id: "schema",
    title: "3. Treat schema as a contract, and version it",
    tier: "Correctness",
    what: "Define explicit schemas and data contracts between producers and consumers, and manage evolution deliberately (add columns backward-compatibly; never silently change types). Tools: schema registries, dbt contracts, Avro/Protobuf.",
    when: "Critical when different teams own the producer and the consumer — the classic 'they changed the column and broke our model' failure.",
    example: "A producer renames a field. A contract test in CI fails the change before it ships, forcing a coordinated migration instead of a 3am pipeline break.",
  },
  {
    id: "layers",
    title: "4. Separate raw, cleaned, and modeled layers (medallion)",
    tier: "Reliability",
    what: "Land source data immutably (bronze), produce a validated/cleaned layer (silver), and build modeled features/aggregates (gold). Each layer is reproducible from the one before it.",
    when: "Pays off the moment you need to reprocess history with new logic — you rebuild from immutable raw instead of having destroyed the original.",
    example: "A bug in feature logic shipped last month. Because raw data was preserved, you fix the transform and backfill correct features for the whole period — impossible if you'd overwritten the source.",
  },
  {
    id: "orchestration",
    title: "5. Orchestrate with real dependencies, retries, and backfills",
    tier: "Reliability",
    what: "Model the pipeline as a DAG with explicit dependencies, automatic retries with backoff, and first-class backfill support — not a chain of cron jobs that assume the previous one finished. Tools: Airflow, Dagster, Prefect.",
    when: "Necessary as soon as tasks depend on each other or you need to reprocess a date range. Cron chains fail silently and can't backfill.",
    example: "A source is late by two hours. The orchestrator waits on the dependency and retries rather than running the downstream job on missing data and producing a wrong daily report.",
  },
  {
    id: "observability",
    title: "6. Monitor data quality continuously (freshness, volume, distribution)",
    tier: "Reliability",
    what: "Track freshness (is today's data here?), volume (row counts within expected bounds?), and distribution (did a column's stats shift?) and alert on anomalies. Tools: dbt tests + freshness, Monte Carlo, custom checks.",
    when: "Indispensable for pipelines feeding production models — a silent 'no data today' or a distribution shift degrades models with no error thrown.",
    example: "An event tracker breaks and row counts silently halve. A volume alert fires within the hour, instead of the drop surfacing days later as mysteriously worse model performance.",
  },
  {
    id: "late-data",
    title: "7. Handle late and out-of-order data explicitly",
    tier: "Reliability",
    what: "In streaming or event data, records arrive late or out of order. Use event-time processing, watermarks, and windowing so results are correct rather than whatever happened to arrive first.",
    when: "Critical for real-time and event-driven pipelines (clickstreams, IoT, logs) where processing-time logic silently drops or misassigns late events.",
    example: "Mobile events arrive hours late from offline devices. Event-time windowing attributes them to the correct day, instead of dropping them and undercounting.",
  },
  {
    id: "feature-consistency",
    title: "8. Guarantee train-serve feature consistency",
    tier: "Reliability",
    what: "Compute features the same way for training and for inference — ideally from one shared definition or a feature store — so the model sees at serving time exactly what it saw in training.",
    when: "A top cause of 'great offline, bad online' models, and it lives squarely in the data pipeline. Most dangerous when training features come from batch SQL and serving features from app code.",
    example: "A 30-day rolling average is computed slightly differently in the warehouse and the live service. A shared feature definition makes both identical and online accuracy jumps to match offline. (More in our MLOps guide.)",
  },
  {
    id: "lineage",
    title: "9. Capture lineage and metadata",
    tier: "Reliability",
    what: "Record where each dataset came from, what transformed it, and what depends on it, so you can trace an issue forward and backward. Tools: OpenLineage, dbt docs/exposures, data catalogs.",
    when: "Invaluable during incidents ('what did this bad table feed?') and audits ('where did this number come from?').",
    example: "A corrupted source is discovered. Lineage instantly shows the five downstream tables and two models it touched, so you reprocess exactly those instead of guessing or rebuilding everything.",
  },
  {
    id: "cost-performance",
    title: "10. Design for cost and performance (formats, partitioning, small files)",
    tier: "Scale & Cost",
    what: "Use columnar formats (Parquet), partition by query patterns, compact small files, and prune/cluster to scan less. Storage and scan cost dominate data-pipeline bills.",
    when: "Matters most at scale and on pay-per-scan warehouses (BigQuery, Snowflake, Athena), where a naive layout can 10x cost and runtime for the same result.",
    example: "A table stored as thousands of tiny JSON files is slow and expensive to query. Converting to partitioned Parquet cuts query time and cost dramatically for identical results.",
  },
  {
    id: "governance",
    title: "11. Bake in governance, privacy, and security",
    tier: "Governance",
    what: "Control access, classify and protect PII, encrypt data at rest and in transit, and keep an audit trail. Treat data as a first-class security asset, not an afterthought.",
    when: "Non-negotiable with personal, health, or financial data and under regimes like GDPR and the EU AI Act.",
    example: "A pipeline is about to copy raw customer records into an analytics table anyone can query. Column-level masking and access controls keep the analytics useful while protecting PII.",
  },
  {
    id: "testing",
    title: "12. Test pipelines like software (CI on data logic)",
    tier: "Governance",
    what: "Unit-test transformations, run data tests in CI, and validate on sample data before merging. Pipelines are code and deserve the same discipline as any service.",
    when: "Prevents the 'it ran fine locally' class of breakage, especially as the number of models and transformations grows.",
    example: "A refactor of a join subtly changes row counts. A CI data test catches the regression on sample data before it reaches production and silently skews a model's training set.",
  },
];

const faqs = [
  {
    q: "What makes an AI data pipeline 'robust'?",
    a: "Robustness comes from gates and guarantees, not fancier transforms: validate data before the model sees it, make steps idempotent and re-runnable, treat schema as a versioned contract, and monitor freshness, volume, and distribution continuously. Those four prevent the majority of production data failures.",
  },
  {
    q: "Where should I start if my pipeline is fragile?",
    a: "Start with data validation gates and idempotency. Validation stops bad data from reaching models; idempotency lets you safely re-run failed jobs. Together they eliminate the two most common sources of silent corruption with modest effort.",
  },
  {
    q: "What is the medallion (bronze/silver/gold) architecture?",
    a: "It's a layering pattern: land raw source data immutably (bronze), produce a validated and cleaned layer (silver), then build modeled features and aggregates (gold). Because each layer is reproducible from the one before it, you can reprocess history with new logic instead of losing the original data.",
  },
  {
    q: "How do data pipelines relate to MLOps?",
    a: "The data pipeline is the foundation MLOps sits on. Feature consistency, data validation, and lineage are shared concerns — a model is only as reliable as the pipeline feeding it. See our MLOps best-practices guide for the model-side of the same discipline.",
  },
];

const BlogPost3 = () => {
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
                  <Database className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Data Engineering</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Building Robust AI Data Pipelines: 12 Practices, Ordered by Impact
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                A robust AI data pipeline comes from gates and guarantees — validation, idempotency, contracts, and
                observability — not from a fancier transform. Here are the 12 practices that keep the data feeding your
                models correct and reliable, ordered by impact, each with when it matters most and a concrete example.
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
                      Jul 26, 2026
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      11 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            <DataPipelineHeroDiagram />

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 id="how-to-read" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">How to read this list</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The practices are grouped into <strong>Correctness</strong>, <strong>Reliability</strong>,{" "}
                  <strong>Scale &amp; Cost</strong>, and <strong>Governance</strong>, and ordered roughly by how much
                  production pain they prevent per unit of effort. If you do only a few things, do the first three —
                  validation, idempotency, and schema contracts — because a model is only as trustworthy as the data
                  feeding it. Each item says <em>what</em> it is, <em>when</em> it matters most, and gives a concrete{" "}
                  <em>example</em> of the failure it prevents.
                </p>
              </section>

              {practices.map((p) => (
                <section key={p.id} className="mb-6 sm:mb-8">
                  <h2 id={p.id} className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{p.title}</h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">{p.tier}</p>
                  <p className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base">{p.what}</p>
                  <div className="bg-muted/50 p-4 sm:p-5 rounded-lg mb-3 space-y-2">
                    <p className="text-sm sm:text-base">
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
                  A robust pipeline is boring by design: bad data fails loudly at the gate, every step can be safely
                  re-run, schemas are contracts, and quality is monitored continuously. That reliability is the foundation
                  your models stand on — the same discipline continues on the model side in our{" "}
                  <Link to="/blog/mlops-best-practices" className="text-primary hover:underline">MLOps best-practices guide</Link>,
                  and the data-quality failures here are exactly the ones that surface later as the{" "}
                  <Link to="/blog/llm-deployment-challenges" className="text-primary hover:underline">LLM and model deployment challenges</Link>{" "}
                  teams struggle with in production.
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

              <section className="mb-6 sm:mb-8">
                <h2 id="sources" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Further reading &amp; sources</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>• <a href="https://docs.getdbt.com/docs/build/tests" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dbt — data tests &amp; contracts</a></li>
                  <li>• <a href="https://greatexpectations.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Great Expectations — data validation</a></li>
                  <li>• <a href="https://airflow.apache.org/docs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apache Airflow — orchestration docs</a></li>
                  <li>• <a href="https://openlineage.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenLineage — data lineage standard</a></li>
                  <li>• <a href="https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google — MLOps &amp; data pipeline architecture</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <RelatedPosts current="/blog/building-robust-ai-data-pipelines" />
      <Footer />
    </div>
  );
};

export default BlogPost3;
