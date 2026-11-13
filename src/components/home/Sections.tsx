import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/SiteLink";
import { SubscribeForm } from "@/components/NewsletterSignup";
import { insights } from "@/components/LatestInsights";
import { ALL_POSTS } from "@/components/RelatedPosts";
import { trackEvent } from "@/lib/analytics";
import { FREE_PDFS, PATHS, ROADMAP_PATH, TOPICS, TOPMATE_URL, WALL_ROWS, infographicFor, topicFor } from "@/config/site";

const WRAP = "max-w-[1200px] mx-auto px-4 sm:px-6";
const H2 = "m-0 font-bold text-[28px] sm:text-4xl lg:text-[42px] leading-[1.1] tracking-[-0.02em]";

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="label-mono text-primary m-0 mb-3">{children}</p>
);

const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

const titleOf = (path: string) => ALL_POSTS.find((p) => p.slug === path)?.title ?? "AI Engineer Roadmap";
const GUIDE_COUNT = ALL_POSTS.length;
const INFOGRAPHIC_COUNT = ALL_POSTS.filter((p) => infographicFor(p.slug)).length;

/* ---------- proof, as a passing eval run ---------- */
export const EvalStrip = () => {
  const checks = [`${GUIDE_COUNT} guides indexed`, "sources cited", "figures dated", "5.0 on Topmate, 18 reviews"];
  return (
    <section className="border-b border-border bg-[#111110]" aria-label="Site checks">
      <div className={`${WRAP} py-5 flex flex-wrap items-center gap-x-9 gap-y-2.5 font-mono text-sm`}>
        <span className="text-muted-foreground">$ run evals --site</span>
        {checks.map((c, i) => (
          <span key={c} style={{ animation: `aei-in 0.4s ease-out ${0.4 + i * 0.45}s both` }}>
            <span className="bg-primary text-primary-foreground font-bold px-[7px] py-px mr-2">PASS</span>
            {c}
          </span>
        ))}
        <span className="text-primary font-bold" style={{ animation: "aei-in 0.4s ease-out 2.4s both" }}>
          {checks.length}/{checks.length} passing
        </span>
      </div>
    </section>
  );
};

/* ---------- two paths + the reading-plan agent ---------- */
const ROLES = ["Student", "Software engineer", "Data scientist"];
const ROLE_NOTES = [
  "plan() → start at phase 1 of the roadmap",
  "plan() → you can skip roadmap phases 1 and 4",
  "plan() → you can skip roadmap phase 2",
];
const GOALS: { name: string; steps: string[] }[] = [
  { name: "Get hired", steps: [ROADMAP_PATH, "/blog/ai-engineer-salary", "/blog/ai-engineer-interview-questions"] },
  { name: "Ship an agent", steps: ["/blog/what-are-ai-agents", "/blog/what-is-an-agent-harness", "/blog/ai-agent-observability"] },
  { name: "Add RAG to a product", steps: ["/blog/retrieval-augmented-generation-guide", "/blog/rag-chunking-strategies", "/blog/rag-evaluation-metrics"] },
];

const chip = (on: boolean) =>
  `min-h-[44px] px-3.5 rounded-sm text-sm font-semibold border transition-colors ${
    on ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-foreground border-input hover:border-primary"
  }`;

export const Paths = () => {
  const [role, setRole] = useState(1);
  const [goal, setGoal] = useState(0);
  const pick = (kind: "role" | "goal", i: number) => {
    if (kind === "role") setRole(i);
    else setGoal(i);
    trackEvent("reading_plan", { plan_role: ROLES[kind === "role" ? i : role], plan_goal: GOALS[kind === "goal" ? i : goal].name });
  };
  return (
    <section id="paths" className="scroll-mt-28">
      <div className={`${WRAP} pt-16 pb-14 lg:pt-20 lg:pb-[72px]`}>
        <Label>01 / Pick your path</Label>
        <h2 className={`${H2} max-w-[20ch] mb-8`}>Two ways in. Both end with you shipping.</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {PATHS.map((p) => (
            <div key={p.id} className="relative overflow-hidden border border-input rounded-sm bg-card p-6 sm:p-[30px] flex flex-col gap-4">
              <span aria-hidden="true" className="absolute right-3.5 -top-8 font-mono font-bold text-[170px] leading-none text-secondary select-none">
                {p.letter}
              </span>
              <p className="label-mono text-primary m-0 relative">{p.tag}</p>
              <h3 className="m-0 font-bold text-2xl sm:text-[28px] leading-[1.15] relative">{p.title}</h3>
              <p className="m-0 text-secondary-foreground max-w-[44ch] relative">{p.desc}</p>
              <ol className="m-0 p-0 list-none flex flex-col relative">
                {p.steps.map((s, i) => (
                  <li key={s.to}>
                    <Link to={s.to} className="flex gap-3.5 items-baseline py-3 border-t border-border font-medium text-foreground hover:text-primary">
                      <span className="font-mono text-[13px] text-muted-foreground">{i + 1}</span>
                      <span className="flex-1">{s.title}</span>
                      <span className="text-muted-foreground text-sm font-normal whitespace-nowrap hidden sm:inline">{s.note}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link
                to={p.steps[0].to}
                className="self-start inline-flex items-center min-h-[48px] px-[22px] rounded-sm border border-primary text-primary font-semibold relative hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-5 border border-primary bg-card p-6 sm:p-[26px] flex flex-wrap gap-x-12 gap-y-6">
          <div className="flex-[1_1_380px] min-w-0 flex flex-col gap-3">
            <p className="label-mono text-primary m-0">Or ask the agent</p>
            <h3 className="m-0 font-bold text-2xl sm:text-[26px] leading-[1.15]">Tell it who you are. It plans your reading.</h3>
            <p className="text-sm text-muted-foreground m-0">I am a</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r, i) => (
                <button key={r} type="button" aria-pressed={role === i} onClick={() => pick("role", i)} className={chip(role === i)}>
                  {r}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground m-0">and I want to</p>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g, i) => (
                <button key={g.name} type="button" aria-pressed={goal === i} onClick={() => pick("goal", i)} className={chip(goal === i)}>
                  {g.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-[1_1_380px] min-w-0 flex flex-col gap-2 border border-input bg-background px-5 py-[18px]" aria-live="polite">
            <p className="font-mono text-xs text-muted-foreground m-0">{goal === 0 ? ROLE_NOTES[role] : "plan() → three guides, in reading order"}</p>
            {GOALS[goal].steps.map((to, i) => (
              <Link key={to} to={to} className="flex gap-3.5 items-baseline min-h-[44px] border-t border-border pt-2 font-semibold text-lg text-foreground hover:text-primary">
                <span className="font-mono text-[13px] text-primary">0{i + 1}</span>
                <span>{titleOf(to)}</span>
              </Link>
            ))}
            <Link
              to="/newsletter"
              className="self-start mt-2 inline-flex items-center min-h-[48px] px-[22px] rounded-sm bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition-colors"
            >
              Get new guides for this path by email
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- infographic wall ---------- */
const WallRow = ({ paths, reverse }: { paths: string[]; reverse?: boolean }) => {
  const items = paths.map((p) => ({ path: p, img: infographicFor(p), title: titleOf(p) })).filter((x) => x.img);
  const card = (x: (typeof items)[number], dup: boolean) => (
    <Link
      key={`${x.path}-${dup ? "b" : "a"}`}
      to={x.path}
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      className="shrink-0 block border border-input hover:border-primary transition-colors"
    >
      <img src={x.img!} alt={dup ? "" : `Infographic: ${x.title}`} width={400} height={210} loading="lazy" decoding="async" className="block w-[300px] h-[158px] sm:w-[400px] sm:h-[210px] object-cover bg-card" />
    </Link>
  );
  return (
    <div className="overflow-hidden marquee">
      <div className="flex gap-4 w-max" style={{ animation: `${reverse ? "aei-marq-r" : "aei-marq"} ${reverse ? 64 : 56}s linear infinite` }}>
        {items.map((x) => card(x, false))}
        {items.map((x) => card(x, true))}
      </div>
    </div>
  );
};

export const InfographicWall = () => (
  <section className="border-t border-border py-14 lg:py-[72px]">
    <div className={`${WRAP} pb-7`}>
      <Label>02 / The infographics</Label>
      <div className="flex flex-wrap justify-between items-baseline gap-3">
        <h2 className={H2}>{INFOGRAPHIC_COUNT} guides come with one</h2>
        <Link to="/blogs" className="font-semibold text-primary hover:text-primary-glow py-2">Browse the gallery</Link>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <WallRow paths={WALL_ROWS[0]} />
      <WallRow paths={WALL_ROWS[1]} reverse />
    </div>
  </section>
);

/* ---------- the guide map ---------- */
// Cluster centres (percent of the map box) and spread, one per topic, in TOPICS order.
const CENTRES: [number, number, number][] = [
  [30, 38, 13], [62, 26, 8], [80, 68, 8], [56, 60, 7], [22, 76, 7], [44, 86, 6], [84, 32, 5],
];

export const GuideMap = () => {
  const [sel, setSel] = useState(0);
  // Dots start scattered (also what the server renders) and glide into clusters.
  const [clustered, setClustered] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setClustered(true);
      return;
    }
    // Cluster when the map is actually on screen, so the glide is seen.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          window.setTimeout(() => setClustered(true), 250);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const groups = TOPICS.map((t) => ALL_POSTS.filter((p) => topicFor(p.tag) === t.name));
  let k = 0;
  const topic = TOPICS[sel];
  return (
    <section className="border-t border-border bg-[#111110]">
      <div className={`${WRAP} py-14 lg:py-[72px]`}>
        <Label>03 / The guide space</Label>
        <h2 className={`${H2} mb-2`}>{GUIDE_COUNT} guides, embedded</h2>
        <p className="m-0 mb-7 text-secondary-foreground max-w-[60ch]">Every dot is a guide. Similar ones sit together. Pick a cluster to see what's in it.</p>
        {/* Phone: the labels would overlap on the map, so they sit above it. */}
        <div className="flex flex-wrap gap-2 mb-3 sm:hidden">
          {TOPICS.map((t, ti) => (
            <button key={t.name} type="button" aria-pressed={ti === sel} onClick={() => setSel(ti)} className={chip(ti === sel)}>
              {t.name} · {groups[ti].length}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 items-stretch">
          <div ref={mapRef} className="flex-[999_1_520px] min-w-0 relative min-h-[320px] sm:min-h-[440px] border border-input bg-background bg-grid overflow-hidden">
            {groups.map((posts, ti) =>
              posts.map((p) => {
                k += 1;
                const [cx, cy, spread] = CENTRES[ti];
                const on = ti === sel;
                const left = clustered ? cx + jitter(k) * spread : 50 + jitter(k + 400) * 46;
                const top = clustered ? cy + jitter(k + 100) * spread * 1.3 : 50 + jitter(k + 500) * 44;
                return (
                  <span
                    key={p.slug}
                    aria-hidden="true"
                    className={`absolute rounded-full ${on ? "bg-primary w-[11px] h-[11px]" : "bg-[#57544d] w-2 h-2"}`}
                    style={{
                      left: `${left.toFixed(1)}%`,
                      top: `${top.toFixed(1)}%`,
                      transition: "left 1100ms cubic-bezier(0.2,0.8,0.2,1), top 1100ms cubic-bezier(0.2,0.8,0.2,1), background-color 200ms ease-out",
                    }}
                  />
                );
              }),
            )}
            {TOPICS.map((t, ti) => {
              const [cx, cy, spread] = CENTRES[ti];
              const on = ti === sel;
              return (
                <button
                  key={t.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSel(ti)}
                  className={`hidden sm:block absolute -translate-x-1/2 min-h-[44px] px-3 whitespace-nowrap text-[13px] font-semibold rounded-sm border transition-colors ${
                    on ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-input hover:border-primary"
                  }`}
                  style={{ left: `${Math.min(Math.max(cx, 22), 78)}%`, top: `${cy - spread * 1.3 - 9}%` }}
                >
                  {t.name} · {groups[ti].length}
                </button>
              );
            })}
            <span className="absolute left-3 bottom-2.5 font-mono text-[11px] text-muted-foreground">2-D projection, illustrative</span>
          </div>
          <div className="flex-[1_1_320px] min-w-0 border border-primary bg-card p-6 flex flex-col gap-2.5" aria-live="polite">
            <p className="label-mono text-primary m-0">Nearest neighbours</p>
            <p className="font-bold text-[26px] leading-[1.15] m-0">{topic.name}</p>
            <p className="text-muted-foreground text-[15px] m-0">{topic.desc}</p>
            <div className="flex flex-col mt-1.5">
              {groups[sel].slice(0, 4).map((p) => (
                <Link key={p.slug} to={p.slug} className="flex items-center min-h-[48px] py-1.5 border-t border-border font-semibold text-foreground hover:text-primary leading-snug">
                  {p.title}
                </Link>
              ))}
            </div>
            <Link
              to={`/blogs?topic=${encodeURIComponent(topic.name)}`}
              className="mt-auto self-start inline-flex items-center min-h-[48px] px-5 rounded-sm bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition-colors"
            >
              See all {groups[sel].length} guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- latest ---------- */
export const Latest = () => (
  <section className="border-t border-border">
    <div className={`${WRAP} py-14 lg:py-[72px]`}>
      <div className="flex flex-wrap justify-between items-baseline gap-3 mb-5">
        <div>
          <Label>04 / Latest</Label>
          <h2 className={H2}>Fresh off the bench</h2>
        </div>
        <Link to="/blogs" className="font-semibold text-primary hover:text-primary-glow py-2">All guides</Link>
      </div>
      <div className="flex flex-col">
        {insights.slice(0, 5).map((p) => (
          <Link key={p.link} to={p.link} className="group flex flex-wrap gap-x-6 gap-y-1.5 items-baseline py-5 border-t border-border text-foreground">
            <span className="font-mono text-[13px] text-muted-foreground min-w-[96px]">{p.date}</span>
            <span className="flex-[999_1_420px] min-w-0 flex flex-col gap-1">
              <span className="font-bold text-xl leading-[1.3] group-hover:text-primary transition-colors">{p.title}</span>
              <span className="text-[15px] text-muted-foreground max-w-[72ch] line-clamp-2">{p.excerpt}</span>
            </span>
            <span className="font-mono text-[13px] text-muted-foreground whitespace-nowrap">
              {topicFor(p.category)} · {p.readTime.replace(" read", "")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- free PDF library ---------- */
export const FreeLibrary = () => (
  <section id="library" className="border-t border-border bg-[#111110] scroll-mt-28">
    <div className={`${WRAP} py-14 lg:py-[72px]`}>
      <Label>05 / Free library</Label>
      <h2 className={`${H2} mb-2`}>Four PDFs. One email. Yours to keep.</h2>
      <p className="m-0 mb-7 text-secondary-foreground max-w-[60ch]">
        Subscribe once. The roadmap arrives by email, and each cheat sheet unlocks on its guide.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FREE_PDFS.map((d) => (
          <div key={d.title} className="paper p-[22px] flex flex-col gap-2.5 min-h-[230px]">
            <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#5c5850]">{d.kind}</span>
            <span className="font-mono font-bold text-xl leading-[1.15] tracking-[-0.02em]">{d.title}</span>
            <span className="text-sm text-[#45433e] flex-1">{d.desc}</span>
            <span className="font-mono text-xs font-bold text-[#7a4700]">FREE WITH NEWSLETTER</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- author, as a model card ---------- */
const CARD: [string, string][] = [
  ["Role", "Lead AI Engineer"],
  ["Trained on", "Production systems, and what broke in them"],
  ["Intended use", "Guides, roadmaps, 1:1 career calls"],
  ["Evals", "5.0 on Topmate, 18 reviews"],
  ["Limitations", "Will ask for your eval set"],
];

export const ModelCard = () => (
  <section id="about" className="border-t border-border scroll-mt-28">
    <div className={`${WRAP} py-14 lg:py-[72px] flex flex-wrap gap-10 items-center`}>
      <div className="flex-[999_1_460px] min-w-0 flex flex-col gap-3.5">
        <Label>06 / Model card</Label>
        <h2 className="m-0 font-bold text-[26px] sm:text-4xl leading-[1.15] tracking-[-0.02em]">
          <Link to="/authors" className="hover:text-primary">Gurram Poorna Prudhvi</Link>, Lead AI Engineer
        </h2>
        <dl className="m-0 mt-1.5 flex flex-col border border-border bg-[#111110] px-[18px] py-1 max-w-[640px]">
          {CARD.map(([k, v]) => (
            <div key={k} className="flex gap-4 py-[11px] border-b border-border last:border-b-0">
              <dt className="flex-[0_0_124px] font-mono text-xs uppercase tracking-[0.04em] text-muted-foreground pt-[3px]">{k}</dt>
              <dd className="m-0">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex-[1_1_320px] min-w-0 border border-input rounded-sm bg-card p-[26px] flex flex-col gap-3">
        <p className="font-bold text-[21px] m-0 leading-snug">Stuck on a career move or an architecture call?</p>
        <p className="text-secondary-foreground m-0">Book a 1:1 call and bring the specifics. Start with a free 30-minute chat.</p>
        <a
          href={TOPMATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center min-h-[48px] px-[22px] rounded-sm border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Book a 1:1 call
        </a>
      </div>
    </div>
  </section>
);

/* ---------- every guide, as plain links ---------- */
export const FullIndex = () => (
  <section className="border-t border-border">
    <div className={`${WRAP} py-14 lg:py-[72px]`}>
      <Label>07 / The full index</Label>
      <div className="flex flex-wrap justify-between items-baseline gap-3 mb-7">
        <h2 className={H2}>Every guide, one click away</h2>
        <Link to="/blogs" className="font-semibold text-primary hover:text-primary-glow py-2">Search and filter all {GUIDE_COUNT}</Link>
      </div>
      <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.map((t) => {
          const posts = ALL_POSTS.filter((p) => topicFor(p.tag) === t.name);
          return (
            <div key={t.name} className="flex flex-col">
              <div className="flex justify-between items-baseline gap-3 pb-2 border-b-2 border-primary">
                <h3 className="m-0 font-bold text-lg">{t.name}</h3>
                <span className="font-mono text-[13px] text-primary">{posts.length}</span>
              </div>
              {posts.map((p) => (
                <Link key={p.slug} to={p.slug} className="flex items-center min-h-[40px] py-1.5 border-b border-border text-[15px] leading-snug text-secondary-foreground hover:text-primary">
                  {p.title}
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------- token stream divider ---------- */
const STREAM = ["The", " Fall", "acies", " of", " LLM", " Systems", " ·", " Con", "way", "’s", " Law", " for", " AI", " ·", " AI", " Agent", " Observ", "ability", " ·", " RAG", " Ch", "unking", " Strategies", " ·"];

export const TokenDivider = () => (
  <div aria-hidden="true" className="overflow-hidden border-t border-border py-3">
    <div className="flex gap-1.5 w-max" style={{ animation: "aei-marq 40s linear infinite" }}>
      {[...STREAM, ...STREAM, ...STREAM, ...STREAM].map((t, i) => (
        <span key={i} className={`shrink-0 whitespace-pre px-2 py-1 font-mono text-[13px] text-foreground ${i % 2 ? "bg-[#3a2a10]" : "bg-border"}`}>
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* ---------- final sign-up ---------- */
export const FinalCTA = () => (
  <section id="join" className="bg-primary text-primary-foreground scroll-mt-28">
    <div className={`${WRAP} py-16 lg:py-[84px] flex flex-col gap-5`}>
      <h2 className="m-0 font-mono font-bold text-3xl sm:text-5xl lg:text-[58px] leading-[1.05] tracking-[-0.045em] max-w-[18ch]">
        Get the roadmap. Stay ahead of the field.
      </h2>
      <p className="m-0 font-semibold">Your email. The roadmap PDF arrives right after you confirm.</p>
      <div className="max-w-[620px] bg-background text-foreground p-4 sm:p-5 rounded-sm">
        <SubscribeForm placement="home_footer" />
      </div>
    </div>
  </section>
);
