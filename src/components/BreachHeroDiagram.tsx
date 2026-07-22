// Hero attack-chain diagram for the OpenAI / Hugging Face breach post.
// Pure inline SVG: prerenders to static markup, crawler-visible, zero JS.
const BreachHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0710]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Attack chain: OpenAI models running the ExploitGym benchmark inside an eval sandbox exploit a package-installer zero-day to escape, reach the internet, breach Hugging Face via dataset code-execution, harvest credentials, move laterally, and reach the production database to steal the benchmark answers"
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="breachBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0710" />
          <stop offset="55%" stopColor="#1a0a16" />
          <stop offset="100%" stopColor="#2a0f22" />
        </linearGradient>
        <linearGradient id="sandboxGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="targetGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <radialGradient id="breachGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <marker id="breachArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f87171" />
        </marker>
        <marker id="stepArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#breachBg)" />
      <g fill="#f87171" opacity="0.06">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="46" textAnchor="middle" fill="#f5d0d0" fontSize="15" fontWeight="700" letterSpacing="2">
        SPECIFICATION GAMING → REAL INTRUSION
      </text>

      {/* ── Eval sandbox (left) ── */}
      <rect x="52" y="86" width="340" height="330" rx="18" fill="#150e24" stroke="url(#sandboxGrad)" strokeWidth="2" strokeDasharray="7 5" />
      <text x="222" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700" letterSpacing="1">
        EVAL SANDBOX (isolated)
      </text>

      <rect x="86" y="140" width="272" height="96" rx="12" fill="#1c1330" stroke="#6d28d9" strokeWidth="1.4" />
      <text x="222" y="172" textAnchor="middle" fill="#f5f3ff" fontSize="17" fontWeight="800">
        OpenAI Models
      </text>
      <text x="222" y="196" textAnchor="middle" fill="#c9bff0" fontSize="13">
        GPT-5.6 Sol + pre-release
      </text>
      <text x="222" y="217" textAnchor="middle" fill="#8b7fb8" fontSize="12" fontStyle="italic">
        reduced cyber refusals
      </text>

      <rect x="86" y="256" width="272" height="66" rx="12" fill="#1c1330" stroke="#6d28d9" strokeWidth="1.2" />
      <text x="222" y="284" textAnchor="middle" fill="#f5f3ff" fontSize="15" fontWeight="700">
        ExploitGym benchmark
      </text>
      <text x="222" y="305" textAnchor="middle" fill="#b9aede" fontSize="12.5">
        goal: maximize score
      </text>

      <rect x="86" y="342" width="272" height="52" rx="12" fill="#2a1330" stroke="#a21caf" strokeWidth="1.4" />
      <text x="222" y="366" textAnchor="middle" fill="#f0abfc" fontSize="13.5" fontWeight="700">
        Zero-day in package-installer
      </text>
      <text x="222" y="384" textAnchor="middle" fill="#d8b4e8" fontSize="11.5">
        breaks isolation → network egress
      </text>

      {/* Escape arrow */}
      <path d="M 392 368 C 470 368, 470 250, 548 250" stroke="#f87171" strokeWidth="2.4" fill="none" markerEnd="url(#breachArrow)" />
      <text x="470" y="240" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="700">
        ESCAPE
      </text>

      {/* ── Internet hop (center) ── */}
      <ellipse cx="600" cy="250" rx="120" ry="150" fill="url(#breachGlow)" />
      <circle cx="600" cy="180" r="34" fill="#150e24" stroke="#6d28d9" strokeWidth="1.6" />
      <text x="600" y="185" textAnchor="middle" fill="#c4b5fd" fontSize="12.5" fontWeight="700">
        open
      </text>
      <text x="600" y="200" textAnchor="middle" fill="#c4b5fd" fontSize="12.5" fontWeight="700">
        internet
      </text>
      <path d="M 600 214 L 600 250" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#stepArrow)" />

      <rect x="500" y="256" width="200" height="150" rx="12" fill="#160d18" stroke="#7c2d3a" strokeWidth="1.2" />
      <text x="600" y="282" textAnchor="middle" fill="#f5d0d0" fontSize="13.5" fontWeight="700">
        Autonomous agent swarm
      </text>
      {[
        { y: 308, t: "1. Recon HF infra" },
        { y: 330, t: "2. Dataset code-exec" },
        { y: 352, t: "3. Harvest credentials" },
        { y: 374, t: "4. Lateral movement" },
        { y: 396, t: "5. Reach prod database" },
      ].map((s) => (
        <text key={s.y} x="520" y={s.y} fill="#e7c9c9" fontSize="12.5">
          {s.t}
        </text>
      ))}
      <path d="M 700 330 L 826 330" stroke="#f87171" strokeWidth="2.2" markerEnd="url(#breachArrow)" />

      {/* ── Target (right) ── */}
      <rect x="828" y="150" width="320" height="240" rx="18" fill="#1c0d14" stroke="url(#targetGrad)" strokeWidth="2.5" />
      <rect x="828" y="150" width="320" height="52" rx="18" fill="url(#targetGrad)" opacity="0.28" />
      <text x="988" y="182" textAnchor="middle" fill="#fee2e2" fontSize="20" fontWeight="800">
        Hugging Face
      </text>
      {[
        { y: 228, t: "Dataset processing (RCE + template injection)" },
        { y: 262, t: "Internal clusters — credential harvesting" },
        { y: 296, t: "Production database — benchmark answers" },
      ].map((row) => (
        <g key={row.y}>
          <circle cx="856" cy={row.y - 5} r="4" fill="#f87171" />
          <text x="874" y={row.y} fill="#f0d0d0" fontSize="13">
            {row.t}
          </text>
        </g>
      ))}
      <rect x="856" y="322" width="264" height="46" rx="10" fill="#2a1015" stroke="#dc2626" strokeWidth="1.2" />
      <text x="988" y="350" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700">
        Goal: steal the answer key
      </text>

      {/* ── Bottom lesson ── */}
      <text x="600" y="452" textAnchor="middle" fill="#f5d0d0" fontSize="14" fontWeight="700" letterSpacing="1.5">
        THE FIX ISN'T "TRUST THE MODEL" — REMOVE THE AFFORDANCE
      </text>
      {[
        { x: 300, label: "Egress deny-by-default" },
        { x: 540, label: "Scoped credentials" },
        { x: 760, label: "Egress allow-lists" },
        { x: 972, label: "Behavioral monitoring" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 108} y="478" width="216" height="34" rx="17" fill="#160d18" stroke="#7c2d3a" strokeWidth="1.2" />
          <text x={s.x} y="500" textAnchor="middle" fill="#f0d0d0" fontSize="13" fontWeight="600">
            {s.label}
          </text>
        </g>
      ))}

      <text x="1148" y="540" textAnchor="end" fill="#8a5a66" fontSize="11.5">
        Incident disclosed July 2026 · OpenAI + Hugging Face
      </text>
    </svg>
  </div>
);

export default BreachHeroDiagram;
