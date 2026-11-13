import { Fragment, useState } from "react";
import { Link } from "@/components/SiteLink";
import { SubscribeForm } from "@/components/NewsletterSignup";
import { ROADMAP_PATH } from "@/config/site";

// Deterministic pseudo-random in (-1, 1): the server render and the browser
// must agree, so nothing here may use Math.random().
const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

// The headline changes with the "temperature" slider. Index 0 is what crawlers
// and first paint see.
const HEADLINES: { max: number; lead: string; accent: string; mood: string }[] = [
  { max: 0.5, lead: "Go from curious about AI to", accent: "shipping it.", mood: "deterministic (allegedly)" },
  { max: 1.0, lead: "Go from AI-curious to shipping", accent: "agents people trust.", mood: "balanced" },
  { max: 1.6, lead: "Go from vibes to production.", accent: "Mostly production.", mood: "creative" },
  { max: 9, lead: "Ship it. The model said it is fine.", accent: "It is not fine.", mood: "hallucinating" },
];

const SPANS: { op: string; name: string; left: number; width: number; delay: number; dur: string; child: boolean }[] = [
  { op: "invoke_agent", name: "career_planner", left: 0, width: 100, delay: 0.3, dur: "3.2 s", child: false },
  { op: "chat", name: "plan", left: 1, width: 20, delay: 0.9, dur: "0.6 s", child: true },
  { op: "retrieve", name: "roadmap.phases", left: 22, width: 18, delay: 1.4, dur: "0.5 s", child: true },
  { op: "execute_tool", name: "salary_lookup", left: 41, width: 22, delay: 1.9, dur: "0.7 s", child: true },
  { op: "execute_tool", name: "render_pdf", left: 64, width: 34, delay: 2.4, dur: "1.1 s", child: true },
];

const Hero = () => {
  const [temp, setTemp] = useState(0.2);
  const line = HEADLINES.find((h) => temp <= h.max) ?? HEADLINES[0];
  const word = (w: string, i: number, accent: boolean) => (
    // The space lives between the spans as real text, so crawlers and screen
    // readers get "Go from curious…", not one run-together word.
    <Fragment key={`${accent ? "a" : "l"}-${i}`}>
    <span
      className={`inline-block transition-transform duration-200 ease-out ${accent ? "text-primary" : ""}`}
      style={{
        transform: `rotate(${(jitter(i + (accent ? 20 : 0)) * temp * 4).toFixed(2)}deg) translateY(${(jitter(i + 7) * temp * 5).toFixed(1)}px)`,
      }}
    >
      {w}
    </span>{" "}
    </Fragment>
  );

  return (
    <section className="pt-[104px] border-b border-border bg-background bg-grid">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-16 lg:pb-20 flex flex-wrap gap-12 lg:gap-14 items-center">
        <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-6">
          <div className="self-start flex flex-wrap items-center gap-x-4 gap-y-2 border border-input bg-card px-3.5 py-2 font-mono text-[13px] text-muted-foreground">
            <label htmlFor="temperature" className="text-primary tracking-[0.04em]">temperature</label>
            <input
              id="temperature"
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className="w-[150px] h-7 cursor-pointer accent-[hsl(var(--primary))]"
            />
            <span className="text-foreground min-w-[28px]">{temp.toFixed(1)}</span>
            <span>{line.mood}</span>
          </div>

          <h1 className="m-0 font-mono font-bold text-[34px] sm:text-5xl lg:text-[64px] leading-[1.06] tracking-[-0.045em] min-h-[3.2em]">
            {line.lead.split(" ").map((w, i) => word(w, i, false))}
            {line.accent.split(" ").map((w, i) => word(w, i, true))}
          </h1>

          <p className="m-0 text-lg sm:text-xl text-secondary-foreground max-w-[52ch]">
            The roadmap, salary data and build guides I wish I'd had. Written by a working Lead AI Engineer. Every claim sourced, every number dated.
          </p>

          <div className="max-w-[580px]">
            <p className="font-semibold text-[15px] m-0 mb-2">Start with the free AI engineer roadmap (PDF)</p>
            <SubscribeForm placement="home_hero" defer />
          </div>
          <Link to={ROADMAP_PATH} className="self-start font-semibold text-primary hover:text-primary-glow py-2">
            Or read the roadmap online, no sign-up
          </Link>
        </div>

        {/* Decorative: an agent run whose output is the roadmap PDF. */}
        <div className="flex-[1_1_400px] min-w-0 flex flex-col" aria-hidden="true">
          <div className="border border-input bg-[#111110] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between gap-3 px-4 py-3 border-b border-border font-mono text-xs text-muted-foreground tracking-[0.04em]">
              <span>TRACE · career_planner</span>
              <span className="text-primary">LIVE</span>
            </div>
            <div className="px-4 pt-3.5 pb-1.5 font-mono text-[13px] text-secondary-foreground">
              <div className="inline-block max-w-full">
                <div className="overflow-hidden whitespace-nowrap" style={{ animation: "aei-type 1.4s steps(34) both" }}>
                  &gt; plan my path to AI engineer
                  <span className="text-primary" style={{ animation: "aei-blink 1s step-end infinite" }}>▍</span>
                </div>
              </div>
            </div>
            <div className="px-4 pt-1.5 pb-4 flex flex-col gap-2.5">
              {SPANS.map((s) => (
                <div key={s.name} className="flex flex-col gap-[5px]">
                  <div className="flex justify-between gap-2.5 font-mono text-xs">
                    <span className={`text-secondary-foreground ${s.child ? "pl-4" : ""}`}>
                      <span className="text-primary">{s.op}</span> {s.name}
                    </span>
                    <span className="text-muted-foreground">{s.dur}</span>
                  </div>
                  <div className="relative h-2 bg-secondary">
                    <div
                      className={`absolute top-0 h-2 origin-left ${s.child ? "bg-primary" : "bg-[#6b675f]"}`}
                      style={{ left: `${s.left}%`, width: `${s.width}%`, animation: `aei-grow 0.5s ease-out ${s.delay}s both` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="paper self-end w-[78%] -mt-3.5 -mr-2 px-5 py-[18px] shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
            style={{ transform: "rotate(-2deg)", animation: "aei-in 0.6s ease-out 3.3s both" }}
          >
            <div className="flex justify-between font-mono text-[11px] tracking-[0.06em] text-[#5c5850]">
              <span>OUTPUT · 200 OK</span>
              <span>PDF</span>
            </div>
            <div className="font-mono font-bold text-[21px] leading-[1.1] tracking-[-0.03em] mt-2">The AI Engineer Roadmap</div>
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {["01", "02", "03", "04", "05", "06"].map((n) => (
                <span key={n} className="font-mono text-[11px] font-bold border border-[#b9b3a6] px-[7px] py-[3px]">{n}</span>
              ))}
              <span className="text-[13px] font-semibold ml-1">6 phases, ready to download</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
