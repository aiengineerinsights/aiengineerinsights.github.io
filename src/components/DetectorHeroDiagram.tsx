// Hero diagram for the "AI detectors vs humanizers" review. Pure inline SVG:
// prerenders to static markup, crawler-visible, zero runtime cost. Left = the
// detectors (claimed vs independently-measured accuracy, plus the false-positive
// and OpenAI-quit facts); center = the quarterly cat-and-mouse loop; right = the
// evasion side (academic paraphrase actually works and is free, commercial
// humanizers are paraphrasers, GitHub "removers" only strip metadata). Bottom is
// the verdict band. viewBox is 1200x630 so the same markup rasterizes to the OG.
// Greedy word wrap: break only at spaces so words stay whole.
const wrapWords = (text: string, max: number): string[] => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? line + " " + word : word;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const DetectorHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      aria-label="AI detectors versus humanizers. Detectors like GPTZero, Turnitin and Originality claim about 99% accuracy but independent tests measure roughly 80%, with false positives that flag around 61% of non-native English essays; OpenAI retired its own detector in 2023. It is a quarterly cat-and-mouse arms race. On the evasion side, academic paraphrasing actually defeats watermarks and is free, commercial humanizers are just paraphrasers that fail current detectors, and GitHub 'watermark removers' only strip file metadata, not the statistical text mark. Verdict: no detector is proof, paraphrase beats them all, and removing a mark does not prove you wrote it."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="dtBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0c0c0b" />
          <stop offset="100%" stopColor="#0f0f0e" />
        </linearGradient>
        <linearGradient id="dtGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6FD6A8" />
          <stop offset="100%" stopColor="#225a41" />
        </linearGradient>
        <linearGradient id="dtAmber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB454" />
          <stop offset="100%" stopColor="#6e502a" />
        </linearGradient>
        <marker id="dtArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#aca9a0" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="1200" height="630" fill="url(#dtBg)" />
      <g fill="#6FD6A8" opacity="0.05">
        {Array.from({ length: 13 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
          ))
        )}
      </g>

      {/* Title */}
      <text x="600" y="46" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
        AI DETECTORS vs. “HUMANIZERS”: DOES EITHER WORK?
      </text>

      {/* ───────── Left: detectors ───────── */}
      <rect x="48" y="78" width="470" height="300" rx="16" fill="#0d0d0c" stroke="#225a41" strokeWidth="1.6" />
      <text x="283" y="108" textAnchor="middle" fill="#6FD6A8" fontSize="15" fontWeight="800">THE DETECTORS</text>
      <text x="283" y="128" textAnchor="middle" fill="#6FD6A8" fontSize="12">GPTZero · Turnitin · Originality · Copyleaks</text>

      {/* claim vs real bars */}
      <text x="78" y="164" fill="#6FD6A8" fontSize="12">Marketing claim</text>
      <rect x="78" y="172" width="410" height="20" rx="6" fill="#111110" stroke="#1c4a35" strokeWidth="1" />
      <rect x="78" y="172" width="406" height="20" rx="6" fill="url(#dtGreen)" opacity="0.85" />
      <text x="470" y="187" textAnchor="end" fill="#0c0c0b" fontSize="12" fontWeight="800">~99%</text>

      <text x="78" y="216" fill="#6FD6A8" fontSize="12">Independent tests</text>
      <rect x="78" y="224" width="410" height="20" rx="6" fill="#111110" stroke="#1c4a35" strokeWidth="1" />
      <rect x="78" y="224" width="330" height="20" rx="6" fill="#FFB454" opacity="0.9" />
      <text x="398" y="239" textAnchor="end" fill="#151413" fontSize="12" fontWeight="800">~80%</text>

      <text x="78" y="278" fill="#FF8F73" fontSize="12.5" fontWeight="700">✗ false positives hit real people</text>
      <text x="78" y="298" fill="#FFB454" fontSize="11.5">~61% of non-native-English essays flagged as AI (Stanford, 2023)</text>
      <text x="78" y="320" fill="#FF8F73" fontSize="12.5" fontWeight="700">✗ OpenAI shut down its own detector (2023)</text>
      <text x="78" y="340" fill="#FFB454" fontSize="11.5">26% true-positive rate · “low accuracy” · universities disabling them</text>
      <text x="78" y="366" fill="#6FD6A8" fontSize="11">none of them read a real model watermark — all guess from patterns</text>

      {/* ───────── Center: arms race ───────── */}
      <circle cx="600" cy="228" r="58" fill="#0f0f0e" stroke="#5e5b52" strokeWidth="1.6" />
      <path d="M 600 176 A 52 52 0 1 1 552 200" stroke="#aca9a0" strokeWidth="2.4" fill="none" markerEnd="url(#dtArrow)" />
      <text x="600" y="222" textAnchor="middle" fill="#d9d7d3" fontSize="12.5" fontWeight="800">cat &amp;</text>
      <text x="600" y="240" textAnchor="middle" fill="#d9d7d3" fontSize="12.5" fontWeight="800">mouse</text>
      <text x="600" y="306" textAnchor="middle" fill="#aca9a0" fontSize="10.5">detectors patch</text>
      <text x="600" y="320" textAnchor="middle" fill="#aca9a0" fontSize="10.5">every quarter</text>

      {/* ───────── Right: evasion ───────── */}
      <rect x="682" y="78" width="470" height="300" rx="16" fill="#0c0c0b" stroke="#6e502a" strokeWidth="1.6" />
      <text x="917" y="108" textAnchor="middle" fill="#FFB454" fontSize="15" fontWeight="800">THE “REMOVERS” &amp; HUMANIZERS</text>
      <text x="917" y="128" textAnchor="middle" fill="#FFB454" fontSize="12">what actually happens when you pay</text>

      {[
        { y: 146, tag: "✓ works", tagc: "#6FD6A8", t: "Academic paraphrase research", s: "DIPPER, recursive rewrite — defeats watermarks. And it's FREE." },
        { y: 220, tag: "~ meh", tagc: "#FFB454", t: "Commercial humanizers", s: "Undetectable AI, StealthGPT… = paraphrasers; fail current detectors." },
        { y: 294, tag: "✗ fake", tagc: "#FF8F73", t: "GitHub “watermark removers”", s: "Strip file metadata / hidden chars — not the statistical text mark." },
      ].map((r, i) => (
        <g key={i}>
          <rect x="704" y={r.y} width="426" height="64" rx="11" fill="#0e0d0c" stroke="#513b1f" strokeWidth="1.1" />
          <rect x="716" y={r.y + 12} width="66" height="22" rx="11" fill="#0c0c0b" stroke={r.tagc} strokeWidth="1.2" />
          <text x="749" y={r.y + 27} textAnchor="middle" fill={r.tagc} fontSize="11" fontWeight="800">{r.tag}</text>
          <text x="796" y={r.y + 26} fill="#e7e6e3" fontSize="13" fontWeight="700">{r.t}</text>
          <text x="796" y={r.y + 47} fill="#FFB454" fontSize="11">{r.s}</text>
        </g>
      ))}

      {/* ───────── Verdict band ───────── */}
      <rect x="48" y="398" width="1104" height="66" rx="14" fill="#0c0c0b" stroke="#1d4d38" strokeWidth="1.4" />
      <text x="600" y="424" textAnchor="middle" fill="#6FD6A8" fontSize="13.5" fontWeight="800" letterSpacing="0.5">
        NO DETECTOR IS PROOF · PARAPHRASE BEATS THEM ALL · REMOVING A MARK ≠ PROVING YOU WROTE IT
      </text>
      <text x="600" y="448" textAnchor="middle" fill="#6FD6A8" fontSize="12">
        and under the EU AI Act (Aug 2026) marketing a mark-circumvention tool is itself a finable act
      </text>

      {/* ───────── Ranking one-liner strip ───────── */}
      <text x="600" y="492" textAnchor="middle" fill="#6FD6A8" fontSize="12.5" fontWeight="700" letterSpacing="1">THE HONEST RANKING</text>
      {[
        { x: 48, rank: "✓ Best you can do", body: "Open-source detectors (Binoculars, DetectGPT) — transparent, free, still not proof", col: "#6FD6A8", bd: "#6FD6A8", fill: "#0c0c0b", sw: 1.3 },
        { x: 328, rank: "~ Use with care", body: "Commercial detectors — one weak signal; never sole evidence for a grade or job", col: "#FFB454", bd: "#FFB454", fill: "#0c0c0b", sw: 1.3 },
        { x: 608, rank: "Don't pay", body: "“Humanizers” — overpriced paraphrasers; a free LLM does the same thing", col: "#FF8F73", bd: "#7c3e2f", fill: "#0c0c0b", sw: 1.3 },
        { x: 888, rank: "✗ Avoid", body: "“Watermark removers” — metadata strippers / vaporware, some fabricate scores", col: "#FF8F73", bd: "#FF8F73", fill: "#2a1611", sw: 2.2 },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="504" width="264" height="96" rx="13" fill={c.fill} stroke={c.bd} strokeWidth={c.sw} />
          <text x={c.x + 18} y="530" fill={c.col} fontSize="13.5" fontWeight="800">{c.rank}</text>
          <text x={c.x + 18} y="554" fill="#e1e0dc" fontSize="10.6">
            {wrapWords(c.body, 44).map((ln, k) => (
              <tspan key={k} x={c.x + 18} dy={k === 0 ? 0 : 15}>{ln}</tspan>
            ))}
          </text>
        </g>
      ))}

      <text x="1152" y="620" textAnchor="end" fill="#646056" fontSize="11">aiengineerinsights.com</text>
    </svg>
  </div>
);

export default DetectorHeroDiagram;
