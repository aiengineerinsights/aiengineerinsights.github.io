// Hero diagram for the Inkling-Small post. Pure inline SVG: prerenders to
// static markup, zero runtime cost, crawler-visible.
const InklingSmallHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Inkling-Small architecture: Inkling, a 975 billion parameter, 41 billion active parameter mixture-of-experts teacher model, is distilled on-policy plus two weeks of agentic coding reinforcement learning into Inkling-Small, a 276 billion parameter, 12 billion active parameter student that matches or beats the teacher on SWE-bench, Humanity's Last Exam, and instruction following at roughly a quarter of the compute and a third of the price"
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="inklingBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" />
          <stop offset="55%" stopColor="#120a26" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="teacherGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
        <linearGradient id="studentGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="inklingGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <marker id="inklingArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#inklingBg)" />
      <g fill="#a78bfa" opacity="0.08">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="44" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="700" letterSpacing="2">
        ON-POLICY DISTILLATION + 2 WEEKS AGENTIC-CODING RL
      </text>

      {/* ── Teacher (left) ── */}
      <rect x="46" y="90" width="286" height="300" rx="18" fill="#150e2b" stroke="url(#teacherGrad)" strokeWidth="2" />
      <rect x="46" y="90" width="286" height="50" rx="18" fill="url(#teacherGrad)" opacity="0.35" />
      <text x="189" y="122" textAnchor="middle" fill="#f5f3ff" fontSize="18" fontWeight="800">
        Inkling (teacher)
      </text>
      {[
        { y: 168, t: "975B total params" },
        { y: 194, t: "41B active (MoE)" },
        { y: 220, t: "1M token context" },
        { y: 246, t: "text · image · audio" },
      ].map((row) => (
        <g key={row.y}>
          <circle cx="72" cy={row.y - 5} r="4" fill="#a78bfa" />
          <text x="88" y={row.y} fill="#d6cff0" fontSize="14">{row.t}</text>
        </g>
      ))}
      <rect x="70" y="270" width="236" height="42" rx="10" fill="#1c1330" stroke="#6d28d9" strokeWidth="1.2" />
      <text x="189" y="296" textAnchor="middle" fill="#e9e4f8" fontSize="14" fontWeight="700">
        $4.05 / 1M output tok
      </text>
      <text x="189" y="366" textAnchor="middle" fill="#8b7fb8" fontSize="12" fontStyle="italic">
        released Jul 15, 2026
      </text>

      {/* ── Arrow + glow ── */}
      <ellipse cx="600" cy="240" rx="180" ry="130" fill="url(#inklingGlow)" />
      <path d="M 332 240 L 468 240" stroke="#8b5cf6" strokeWidth="2.4" fill="none" markerEnd="url(#inklingArrow)" />
      <text x="400" y="226" textAnchor="middle" fill="#c4b5fd" fontSize="12.5" fontWeight="700">
        distills into
      </text>

      {/* ── Student (center) ── */}
      <rect x="470" y="90" width="286" height="300" rx="18" fill="#170f2e" stroke="url(#studentGrad)" strokeWidth="2.5" />
      <rect x="470" y="90" width="286" height="50" rx="18" fill="url(#studentGrad)" opacity="0.3" />
      <text x="613" y="122" textAnchor="middle" fill="#f5f3ff" fontSize="18" fontWeight="800">
        Inkling-Small (student)
      </text>
      {[
        { y: 168, t: "276B total params" },
        { y: 194, t: "12B active — 6 of 256 experts" },
        { y: 220, t: "1M token context" },
        { y: 246, t: "text · image · audio" },
      ].map((row) => (
        <g key={row.y}>
          <circle cx="496" cy={row.y - 5} r="4" fill="#c4b5fd" />
          <text x="512" y={row.y} fill="#e9e4f8" fontSize="14">{row.t}</text>
        </g>
      ))}
      <rect x="494" y="270" width="236" height="42" rx="10" fill="#241a40" stroke="#a78bfa" strokeWidth="1.2" />
      <text x="613" y="296" textAnchor="middle" fill="#f5f3ff" fontSize="14" fontWeight="700">
        $1.20 / 1M output tok
      </text>
      <text x="613" y="366" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontStyle="italic">
        released Jul 30, 2026 · Apache 2.0
      </text>

      {/* ── Benchmark deltas (right) ── */}
      <rect x="800" y="90" width="352" height="300" rx="18" fill="#150e2b" stroke="#4c1d95" strokeWidth="1.6" />
      <text x="976" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700" letterSpacing="1">
        SMALL vs. TEACHER
      </text>
      {[
        { y: 152, label: "SWE-bench Verified", a: "77.6%", b: "80.2%", up: true },
        { y: 190, label: "Humanity's Last Exam", a: "29.7%", b: "31.6%", up: true },
        { y: 228, label: "IFBench", a: "79.8%", b: "82.2%", up: true },
        { y: 266, label: "AIME 2026", a: "97.1%", b: "95.5%", up: false },
        { y: 304, label: "Audio MC", a: "56.6%", b: "54.9%", up: false },
      ].map((row) => (
        <g key={row.label}>
          <text x="826" y={row.y} fill="#d6cff0" fontSize="13">{row.label}</text>
          <text x="826" y={row.y + 18} fill="#8b7fb8" fontSize="12">{row.a} → </text>
          <text x="876" y={row.y + 18} fill={row.up ? "#86efac" : "#fca5a5"} fontSize="12" fontWeight="700">
            {row.b} {row.up ? "▲" : "▼"}
          </text>
        </g>
      ))}
      <text x="976" y="352" textAnchor="middle" fill="#8b7fb8" fontSize="11.5" fontStyle="italic">
        wins on coding &amp; reasoning, trails on breadth
      </text>

      {/* ── Bottom deploy strip ── */}
      <text x="600" y="432" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700" letterSpacing="1.5">
        DEPLOY: 180GB VRAM (NVFP4) TO 600GB (BF16)
      </text>
      {[
        { x: 210, label: "vLLM / SGLang" },
        { x: 430, label: "llama.cpp + Unsloth" },
        { x: 680, label: "HF Endpoints ($22/hr)" },
        { x: 950, label: "Fine-tune on Tinker" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 108} y="456" width="216" height="34" rx="17" fill="#171226" stroke="#6d28d9" strokeWidth="1.2" />
          <text x={s.x} y="478" textAnchor="middle" fill="#e9e4f8" fontSize="13" fontWeight="600">
            {s.label}
          </text>
        </g>
      ))}

      <text x="1148" y="540" textAnchor="end" fill="#6d5f9e" fontSize="11.5">
        Released July 2026 · Thinking Machines Lab
      </text>
    </svg>
  </div>
);

export default InklingSmallHeroDiagram;
