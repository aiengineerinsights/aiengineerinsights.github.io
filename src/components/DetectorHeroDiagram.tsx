// Hero diagram for the "AI detectors vs humanizers" review. Pure inline SVG:
// prerenders to static markup, crawler-visible, zero runtime cost. Left = the
// detectors (claimed vs independently-measured accuracy, plus the false-positive
// and OpenAI-quit facts); center = the quarterly cat-and-mouse loop; right = the
// evasion side (academic paraphrase actually works and is free, commercial
// humanizers are paraphrasers, GitHub "removers" only strip metadata). Bottom is
// the verdict band. viewBox is 1200x630 so the same markup rasterizes to the OG.
const DetectorHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#07100c]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      aria-label="AI detectors versus humanizers. Detectors like GPTZero, Turnitin and Originality claim about 99% accuracy but independent tests measure roughly 80%, with false positives that flag around 61% of non-native English essays; OpenAI retired its own detector in 2023. It is a quarterly cat-and-mouse arms race. On the evasion side, academic paraphrasing actually defeats watermarks and is free, commercial humanizers are just paraphrasers that fail current detectors, and GitHub 'watermark removers' only strip file metadata, not the statistical text mark. Verdict: no detector is proof, paraphrase beats them all, and removing a mark does not prove you wrote it."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="dtBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#07100c" />
          <stop offset="55%" stopColor="#0a1a14" />
          <stop offset="100%" stopColor="#0c2320" />
        </linearGradient>
        <linearGradient id="dtGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="dtAmber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <marker id="dtArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="1200" height="630" fill="url(#dtBg)" />
      <g fill="#34d399" opacity="0.05">
        {Array.from({ length: 13 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
          ))
        )}
      </g>

      {/* Title */}
      <text x="600" y="46" textAnchor="middle" fill="#e6fff4" fontSize="19" fontWeight="800" letterSpacing="1">
        AI DETECTORS vs. “HUMANIZERS”: DOES EITHER WORK?
      </text>

      {/* ───────── Left: detectors ───────── */}
      <rect x="48" y="78" width="470" height="300" rx="16" fill="#0a1f18" stroke="#059669" strokeWidth="1.6" />
      <text x="283" y="108" textAnchor="middle" fill="#6ee7b7" fontSize="15" fontWeight="800">THE DETECTORS</text>
      <text x="283" y="128" textAnchor="middle" fill="#a7f3d0" fontSize="12">GPTZero · Turnitin · Originality · Copyleaks</text>

      {/* claim vs real bars */}
      <text x="78" y="164" fill="#a7f3d0" fontSize="12">Marketing claim</text>
      <rect x="78" y="172" width="410" height="20" rx="6" fill="#0c2a20" stroke="#134e4a" strokeWidth="1" />
      <rect x="78" y="172" width="406" height="20" rx="6" fill="url(#dtGreen)" opacity="0.85" />
      <text x="470" y="187" textAnchor="end" fill="#052018" fontSize="12" fontWeight="800">~99%</text>

      <text x="78" y="216" fill="#a7f3d0" fontSize="12">Independent tests</text>
      <rect x="78" y="224" width="410" height="20" rx="6" fill="#0c2a20" stroke="#134e4a" strokeWidth="1" />
      <rect x="78" y="224" width="330" height="20" rx="6" fill="#fbbf24" opacity="0.9" />
      <text x="398" y="239" textAnchor="end" fill="#3a2a06" fontSize="12" fontWeight="800">~80%</text>

      <text x="78" y="278" fill="#fca5a5" fontSize="12.5" fontWeight="700">✗ false positives hit real people</text>
      <text x="78" y="298" fill="#f5d9a0" fontSize="11.5">~61% of non-native-English essays flagged as AI (Stanford, 2023)</text>
      <text x="78" y="320" fill="#fca5a5" fontSize="12.5" fontWeight="700">✗ OpenAI shut down its own detector (2023)</text>
      <text x="78" y="340" fill="#f5d9a0" fontSize="11.5">26% true-positive rate · “low accuracy” · universities disabling them</text>
      <text x="78" y="366" fill="#7fd6bf" fontSize="11">none of them read a real model watermark — all guess from patterns</text>

      {/* ───────── Center: arms race ───────── */}
      <circle cx="600" cy="228" r="58" fill="#0c2320" stroke="#475569" strokeWidth="1.6" />
      <path d="M 600 176 A 52 52 0 1 1 552 200" stroke="#94a3b8" strokeWidth="2.4" fill="none" markerEnd="url(#dtArrow)" />
      <text x="600" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="12.5" fontWeight="800">cat &amp;</text>
      <text x="600" y="240" textAnchor="middle" fill="#cbd5e1" fontSize="12.5" fontWeight="800">mouse</text>
      <text x="600" y="306" textAnchor="middle" fill="#94a3b8" fontSize="10.5">detectors patch</text>
      <text x="600" y="320" textAnchor="middle" fill="#94a3b8" fontSize="10.5">every quarter</text>

      {/* ───────── Right: evasion ───────── */}
      <rect x="682" y="78" width="470" height="300" rx="16" fill="#1a1206" stroke="#b45309" strokeWidth="1.6" />
      <text x="917" y="108" textAnchor="middle" fill="#fbbf24" fontSize="15" fontWeight="800">THE “REMOVERS” &amp; HUMANIZERS</text>
      <text x="917" y="128" textAnchor="middle" fill="#f5d9a0" fontSize="12">what actually happens when you pay</text>

      {[
        { y: 146, tag: "✓ works", tagc: "#34d399", t: "Academic paraphrase research", s: "DIPPER, recursive rewrite — defeats watermarks. And it's FREE." },
        { y: 220, tag: "~ meh", tagc: "#fbbf24", t: "Commercial humanizers", s: "Undetectable AI, StealthGPT… = paraphrasers; fail current detectors." },
        { y: 294, tag: "✗ fake", tagc: "#f87171", t: "GitHub “watermark removers”", s: "Strip file metadata / hidden chars — not the statistical text mark." },
      ].map((r, i) => (
        <g key={i}>
          <rect x="704" y={r.y} width="426" height="64" rx="11" fill="#241706" stroke="#7c5310" strokeWidth="1.1" />
          <rect x="716" y={r.y + 12} width="66" height="22" rx="11" fill="#12100a" stroke={r.tagc} strokeWidth="1.2" />
          <text x="749" y={r.y + 27} textAnchor="middle" fill={r.tagc} fontSize="11" fontWeight="800">{r.tag}</text>
          <text x="796" y={r.y + 26} fill="#f8ecd2" fontSize="13" fontWeight="700">{r.t}</text>
          <text x="796" y={r.y + 47} fill="#d9c39a" fontSize="11">{r.s}</text>
        </g>
      ))}

      {/* ───────── Verdict band ───────── */}
      <rect x="48" y="398" width="1104" height="66" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.4" />
      <text x="600" y="424" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800" letterSpacing="0.5">
        NO DETECTOR IS PROOF · PARAPHRASE BEATS THEM ALL · REMOVING A MARK ≠ PROVING YOU WROTE IT
      </text>
      <text x="600" y="448" textAnchor="middle" fill="#9fe8da" fontSize="12">
        and under the EU AI Act (Aug 2026) marketing a mark-circumvention tool is itself a finable act
      </text>

      {/* ───────── Ranking one-liner strip ───────── */}
      <text x="600" y="492" textAnchor="middle" fill="#a7f3d0" fontSize="12.5" fontWeight="700" letterSpacing="1">THE HONEST RANKING</text>
      {[
        { x: 48, rank: "Best you can do", body: "Open-source detectors (Binoculars, DetectGPT) — transparent, free, still not proof", col: "#34d399", bd: "#059669" },
        { x: 324, rank: "Use with care", body: "Commercial detectors — one weak signal; never sole evidence for a grade or job", col: "#fbbf24", bd: "#b45309" },
        { x: 600, rank: "Don't pay", body: "“Humanizers” — overpriced paraphrasers; a free LLM does the same thing", col: "#fbbf24", bd: "#b45309" },
        { x: 876, rank: "Avoid",  body: "“Watermark removers” — metadata strippers / vaporware, some fabricate scores", col: "#f87171", bd: "#b91c1c" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="504" width="276" height="96" rx="13" fill="#08130f" stroke={c.bd} strokeWidth="1.3" />
          <text x={c.x + 18} y="530" fill={c.col} fontSize="13.5" fontWeight="800">{c.rank}</text>
          <text x={c.x + 18} y="554" fill="#cfeee3" fontSize="10.6">
            <tspan x={c.x + 18} dy="0">{c.body.slice(0, 42)}</tspan>
            <tspan x={c.x + 18} dy="15">{c.body.slice(42, 84)}</tspan>
            <tspan x={c.x + 18} dy="15">{c.body.slice(84)}</tspan>
          </text>
        </g>
      ))}

      <text x="1152" y="620" textAnchor="end" fill="#4b6f63" fontSize="11">aiengineerinsights.com</text>
    </svg>
  </div>
);

export default DetectorHeroDiagram;
