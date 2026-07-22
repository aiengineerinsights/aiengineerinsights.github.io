// Hero architecture diagram for the Hermes Agent post. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible.
const HermesHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Hermes Agent architecture: messaging surfaces connect to one agent core with planner, tools, and memory; models plug in from any provider; a self-improving skills loop distills solutions; execution runs in pluggable sandboxes"
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hermesBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" />
          <stop offset="55%" stopColor="#120a26" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="loopGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#8b5cf6" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="1200" height="560" fill="url(#hermesBg)" />
      {/* Dot grid */}
      <g fill="#a78bfa" opacity="0.08">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      {/* ── Surfaces row (top) ── */}
      <text x="600" y="52" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="700" letterSpacing="2">
        ONE AGENT · EVERY SURFACE
      </text>
      {[
        { x: 260, label: "CLI" },
        { x: 372, label: "Desktop" },
        { x: 484, label: "Telegram" },
        { x: 596, label: "Discord" },
        { x: 708, label: "Slack" },
        { x: 820, label: "WhatsApp" },
        { x: 932, label: "Email" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 48} y="70" width="96" height="34" rx="17" fill="#171226" stroke="#6d28d9" strokeWidth="1.2" />
          <text x={s.x} y="92" textAnchor="middle" fill="#e9e4f8" fontSize="14" fontWeight="600">
            {s.label}
          </text>
          <path d={`M ${s.x} 104 C ${s.x} 130, ${600 + (s.x - 600) * 0.25} 140, ${600 + (s.x - 600) * 0.25} 168`} stroke="#5b21b6" strokeWidth="1.4" fill="none" opacity="0.9" />
        </g>
      ))}

      {/* ── Core glow ── */}
      <ellipse cx="600" cy="300" rx="290" ry="150" fill="url(#coreGlow)" />

      {/* ── Agent core ── */}
      <rect x="400" y="172" width="400" height="216" rx="20" fill="#150e2b" stroke="url(#coreGrad)" strokeWidth="2.5" />
      <rect x="400" y="172" width="400" height="54" rx="20" fill="url(#coreGrad)" opacity="0.25" />
      <text x="600" y="206" textAnchor="middle" fill="#f5f3ff" fontSize="22" fontWeight="800">
        Hermes Agent Core
      </text>
      {[
        { y: 250, label: "Planner — natural-language tasks & cron scheduling" },
        { y: 286, label: "40+ tools — browser, search, images, voice, files" },
        { y: 322, label: "Persistent memory — projects + FTS5 session search" },
        { y: 358, label: "Subagents — own terminals & Python RPC" },
      ].map((row) => (
        <g key={row.y}>
          <circle cx="432" cy={row.y - 5} r="4" fill="#a78bfa" />
          <text x="450" y={row.y} fill="#d6cff0" fontSize="14.5">
            {row.label}
          </text>
        </g>
      ))}

      {/* ── Models (left) ── */}
      <rect x="52" y="216" width="240" height="128" rx="16" fill="#171226" stroke="#6d28d9" strokeWidth="1.4" />
      <text x="172" y="248" textAnchor="middle" fill="#f5f3ff" fontSize="16" fontWeight="700">
        Any LLM Provider
      </text>
      <text x="172" y="276" textAnchor="middle" fill="#b9aede" fontSize="13.5">
        OpenAI · Anthropic · OpenRouter
      </text>
      <text x="172" y="300" textAnchor="middle" fill="#b9aede" fontSize="13.5">
        Nous Portal — 300+ models
      </text>
      <text x="172" y="326" textAnchor="middle" fill="#8b7fb8" fontSize="12" fontStyle="italic">
        model-agnostic, no lock-in
      </text>
      <path d="M 292 280 L 392 280" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* ── Skills loop (right) ── */}
      <circle cx="1020" cy="280" r="86" fill="#171226" stroke="url(#loopGrad)" strokeWidth="2" />
      <path d="M 1020 208 A 72 72 0 1 1 950 300" stroke="#a78bfa" strokeWidth="2.4" fill="none" markerEnd="url(#arrow)" />
      <text x="1020" y="262" textAnchor="middle" fill="#f5f3ff" fontSize="15.5" fontWeight="800">
        Self-Improving
      </text>
      <text x="1020" y="284" textAnchor="middle" fill="#f5f3ff" fontSize="15.5" fontWeight="800">
        Skills Loop
      </text>
      <text x="1020" y="312" textAnchor="middle" fill="#b9aede" fontSize="12.5">
        solve → distill → reuse
      </text>
      <path d="M 808 280 L 926 280" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="867" y="268" textAnchor="middle" fill="#8b7fb8" fontSize="12">
        learns
      </text>

      {/* ── Sandboxes (bottom) ── */}
      <path d="M 600 388 L 600 432" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="600" y="462" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="700" letterSpacing="2">
        SANDBOXED EXECUTION
      </text>
      {[
        { x: 320, label: "Local" },
        { x: 432, label: "Docker" },
        { x: 544, label: "SSH" },
        { x: 656, label: "Singularity" },
        { x: 768, label: "Modal" },
        { x: 880, label: "Daytona" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 50} y="478" width="100" height="34" rx="17" fill="#171226" stroke="#6d28d9" strokeWidth="1.2" />
          <text x={s.x} y="500" textAnchor="middle" fill="#e9e4f8" fontSize="13.5" fontWeight="600">
            {s.label}
          </text>
        </g>
      ))}

      {/* Footer note */}
      <text x="1148" y="540" textAnchor="end" fill="#6d5f9e" fontSize="11.5">
        MIT licensed · github.com/NousResearch/hermes-agent
      </text>
    </svg>
  </div>
);

export default HermesHeroDiagram;
