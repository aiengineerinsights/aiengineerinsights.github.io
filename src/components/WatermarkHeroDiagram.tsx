// Hero diagram for the AI text-watermarking post. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. It shows the
// three-stage pipeline (model generates -> imperceptible watermark woven into the
// tokens, surviving copy-paste -> statistical detector), the fragility band
// (paraphrase / translate / heavy edit fades the signal), and a per-lab status
// strip. viewBox is 1200x630 so the same markup rasterizes 1:1 to the OG image.
const WatermarkHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 630"
      role="img"
      aria-label="How AI text watermarking works: a model generates text, an imperceptible statistical watermark is woven into the token choices and survives copy-paste, and a detector runs a statistical test to flag AI-generated text. Paraphrasing, translation, or heavy editing fades the signal. Status by lab: Google SynthID live in text, Anthropic Claude watermarking text since August 2026, OpenAI built but unreleased, Meta ships audio watermarking but no shipped text watermark."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="wmBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" />
          <stop offset="55%" stopColor="#120a26" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="wmPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="wmCyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="wmArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
        <marker id="wmArrowFade" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="1200" height="630" fill="url(#wmBg)" />
      <g fill="#a78bfa" opacity="0.06">
        {Array.from({ length: 13 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
          ))
        )}
      </g>

      {/* Title */}
      <text x="600" y="46" textAnchor="middle" fill="#e9e4f8" fontSize="19" fontWeight="800" letterSpacing="1">
        HOW AI TEXT WATERMARKING WORKS
      </text>

      {/* ───────── Stage 1: model generates ───────── */}
      <rect x="48" y="80" width="336" height="250" rx="16" fill="#150e2b" stroke="#6d28d9" strokeWidth="1.6" />
      <text x="216" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="14.5" fontWeight="800">1 · MODEL GENERATES</text>
      <text x="216" y="132" textAnchor="middle" fill="#b9aede" fontSize="12">at each token it picks from a distribution</text>
      {/* token chips: some nudged "green-list" (cyan) */}
      {[
        { x: 78, w: 66, t: "The", on: false },
        { x: 150, w: 74, t: "agent", on: true },
        { x: 230, w: 60, t: "then", on: false },
        { x: 296, w: 66, t: "runs", on: true },
        { x: 78, y: 208, w: 74, t: "tools", on: true },
        { x: 158, y: 208, w: 52, t: "in", on: false },
        { x: 216, y: 208, w: 60, t: "a", on: false },
        { x: 282, y: 208, w: 80, t: "sandbox", on: true },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y ?? 156} width={c.w} height="34" rx="8"
            fill={c.on ? "#0e2a33" : "#1a1136"} stroke={c.on ? "#22d3ee" : "#3b2f63"} strokeWidth="1.2" />
          <text x={c.x + c.w / 2} y={(c.y ?? 156) + 22} textAnchor="middle" fill={c.on ? "#67e8f9" : "#cabff0"} fontSize="12.5" fontWeight="600">{c.t}</text>
        </g>
      ))}
      <text x="216" y="270" textAnchor="middle" fill="#67e8f9" fontSize="11.5">watermark softly favors a secret "green" subset</text>
      <text x="216" y="290" textAnchor="middle" fill="#8b7fb8" fontSize="11">meaning unchanged · reads normally</text>
      <text x="216" y="312" textAnchor="middle" fill="#7aa7cc" fontSize="10.5" letterSpacing="0.5">Kirchenbauer green-list · SynthID tournament sampling</text>

      <path d="M 384 205 L 432 205" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#wmArrow)" />

      {/* ───────── Stage 2: watermark woven in ───────── */}
      <rect x="432" y="80" width="336" height="250" rx="16" fill="#0e2233" stroke="#0891b2" strokeWidth="1.6" />
      <text x="600" y="110" textAnchor="middle" fill="#7dd3fc" fontSize="14.5" fontWeight="800">2 · SIGNAL WOVEN IN</text>
      <text x="600" y="132" textAnchor="middle" fill="#a9d8ea" fontSize="12">imperceptible · in the words themselves</text>
      <rect x="470" y="156" width="260" height="72" rx="12" fill="#0b1a26" stroke="url(#wmCyan)" strokeWidth="2" />
      <text x="600" y="184" textAnchor="middle" fill="#eaf7ff" fontSize="13.5" fontWeight="700">statistical fingerprint</text>
      <text x="600" y="206" textAnchor="middle" fill="#9fd6ea" fontSize="12">not visible · not metadata you can strip</text>
      <text x="600" y="256" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="600">travels with copy · paste</text>
      <text x="600" y="278" textAnchor="middle" fill="#a9d8ea" fontSize="11.5">files also get signed C2PA provenance</text>
      <text x="600" y="308" textAnchor="middle" fill="#7aa7cc" fontSize="10.5" letterSpacing="0.5">EU AI Act Art. 50(2) transparency</text>

      <path d="M 768 205 L 816 205" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#wmArrow)" />

      {/* ───────── Stage 3: detector ───────── */}
      <rect x="816" y="80" width="336" height="250" rx="16" fill="#0c1f18" stroke="#059669" strokeWidth="1.6" />
      <text x="984" y="110" textAnchor="middle" fill="#6ee7b7" fontSize="14.5" fontWeight="800">3 · DETECTOR</text>
      <text x="984" y="132" textAnchor="middle" fill="#a7f3d0" fontSize="12">counts "green" tokens · runs a stat test</text>
      <circle cx="984" cy="205" r="52" fill="#07130e" stroke="#34d399" strokeWidth="2.4" />
      <text x="984" y="200" textAnchor="middle" fill="#d1fae5" fontSize="14" fontWeight="800">likely AI</text>
      <text x="984" y="222" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="700">p &lt; 0.01</text>
      <text x="984" y="286" textAnchor="middle" fill="#a7f3d0" fontSize="11.5">needs the matching key/detector</text>
      <text x="984" y="308" textAnchor="middle" fill="#7aa7cc" fontSize="10.5" letterSpacing="0.5">Turnitin / GPTZero do NOT read these marks</text>

      {/* ───────── Fragility band ───────── */}
      <rect x="48" y="356" width="1104" height="72" rx="14" fill="#1a1206" stroke="#b45309" strokeWidth="1.4" />
      <text x="72" y="384" fill="#fbbf24" fontSize="13" fontWeight="800" letterSpacing="0.5">FRAGILE:</text>
      <text x="150" y="384" fill="#f5d9a0" fontSize="13">paraphrase · translate · heavy rewrite · mix into other text</text>
      <path d="M 690 380 C 760 380, 800 380, 900 380" stroke="#64748b" strokeWidth="2" strokeDasharray="4 6" fill="none" markerEnd="url(#wmArrowFade)" />
      <text x="1128" y="384" textAnchor="end" fill="#94a3b8" fontSize="13" fontWeight="700">signal fades → undetectable</text>
      <text x="72" y="410" fill="#c8a15a" fontSize="11.5" fontStyle="italic">a watermark proves "this is AI" when present; absence never proves "this is human"</text>

      {/* ───────── Per-lab status strip ───────── */}
      <text x="600" y="456" textAnchor="middle" fill="#c4b5fd" fontSize="12.5" fontWeight="700" letterSpacing="1">WHO WATERMARKS TEXT TODAY</text>
      {[
        { x: 48, name: "Google · Gemini", mark: "✓ SynthID live", sub: "open-sourced · text+image+audio+video", col: "#34d399", bd: "#059669" },
        { x: 324, name: "Anthropic · Claude", mark: "✓ live Aug 2026", sub: "imperceptible text mark · C2PA files", col: "#34d399", bd: "#059669" },
        { x: 600, name: "OpenAI · ChatGPT", mark: "~ built, unreleased", sub: "~99.9% (WSJ) · DALL·E uses C2PA", col: "#fbbf24", bd: "#b45309" },
        { x: 876, name: "Meta · Llama", mark: "✗ no text mark", sub: "AudioSeal ships for audio only", col: "#f87171", bd: "#b91c1c" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="470" width="276" height="118" rx="14" fill="#100b22" stroke={c.bd} strokeWidth="1.4" />
          <text x={c.x + 20} y="500" fill="#e9e4f8" fontSize="14" fontWeight="800">{c.name}</text>
          <text x={c.x + 20} y="528" fill={c.col} fontSize="14.5" fontWeight="800">{c.mark}</text>
          <text x={c.x + 20} y="556" fill="#b9aede" fontSize="11.5">{c.sub}</text>
        </g>
      ))}

      <text x="1152" y="612" textAnchor="end" fill="#6d5f9e" fontSize="11">aiengineerinsights.com</text>
    </svg>
  </div>
);

export default WatermarkHeroDiagram;
