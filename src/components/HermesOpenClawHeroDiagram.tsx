// Hero diagram for the Hermes Agent vs OpenClaw post. Pure inline SVG:
// prerenders to static markup, zero runtime cost, crawler-visible. It contrasts
// the two philosophies side by side — OpenClaw's gateway/control-plane with a
// human-curated skill marketplace vs Hermes's agent-runtime with self-authored
// skills — over a shared MIT / local-first / bring-your-own-model foundation.
const HermesOpenClawHeroDiagram = () => (
  <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0714]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Hermes Agent vs OpenClaw: OpenClaw is a resident gateway control plane routing 20+ messaging channels with a human-curated ClawHub skill marketplace; Hermes Agent is an agent-runtime loop that writes its own skills from repeated work. Both are MIT-licensed, self-hosted, local-first, and model-agnostic."
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="hocBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0714" />
          <stop offset="55%" stopColor="#120a26" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="hocClaw" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="hocHermes" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <marker id="hocArrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
        </marker>
        <marker id="hocArrowPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="1200" height="560" fill="url(#hocBg)" />
      <g fill="#a78bfa" opacity="0.07">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={26 + r * 46} r="1.6" />
          ))
        )}
      </g>

      {/* Title */}
      <text x="600" y="44" textAnchor="middle" fill="#e9e4f8" fontSize="18" fontWeight="800" letterSpacing="1">
        TWO OPEN-SOURCE AGENTS, TWO PHILOSOPHIES
      </text>

      {/* Center divider */}
      <line x1="600" y1="70" x2="600" y2="452" stroke="#3b2f63" strokeWidth="1.5" strokeDasharray="5 6" />

      {/* ───────── OpenClaw (left) ───────── */}
      <rect x="40" y="72" width="520" height="378" rx="18" fill="#0c1526" stroke="#1e40af" strokeWidth="1.6" />
      <text x="300" y="104" textAnchor="middle" fill="#7dd3fc" fontSize="19" fontWeight="800">OpenClaw</text>
      <text x="300" y="126" textAnchor="middle" fill="#8bb6d6" fontSize="12.5">control plane · &quot;operate it&quot;</text>

      {/* Channels fan-in */}
      {[
        { x: 96, label: "Telegram" },
        { x: 190, label: "Discord" },
        { x: 284, label: "Slack" },
        { x: 378, label: "WhatsApp" },
        { x: 476, label: "Signal +" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 44} y="148" width="88" height="30" rx="15" fill="#0f1e33" stroke="#2563eb" strokeWidth="1.1" />
          <text x={s.x} y="168" textAnchor="middle" fill="#dbeafe" fontSize="12" fontWeight="600">{s.label}</text>
          <path d={`M ${s.x} 178 C ${s.x} 200, 300 202, 300 224`} stroke="#1d4ed8" strokeWidth="1.2" fill="none" opacity="0.85" />
        </g>
      ))}
      <text x="300" y="142" textAnchor="middle" fill="#7aa7cc" fontSize="11" letterSpacing="1">20+ MESSAGING CHANNELS</text>

      {/* Gateway daemon */}
      <rect x="150" y="228" width="300" height="70" rx="14" fill="#0f1e33" stroke="url(#hocClaw)" strokeWidth="2.2" />
      <text x="300" y="256" textAnchor="middle" fill="#eaf4ff" fontSize="16" fontWeight="800">Resident Gateway</text>
      <text x="300" y="280" textAnchor="middle" fill="#a9c9e4" fontSize="12">sessions · routing · tools · state</text>

      {/* ClawHub marketplace */}
      <path d="M 300 298 L 300 322" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#hocArrowBlue)" />
      <rect x="120" y="326" width="360" height="60" rx="12" fill="#0f1e33" stroke="#2563eb" strokeWidth="1.3" />
      <text x="300" y="352" textAnchor="middle" fill="#eaf4ff" fontSize="14.5" fontWeight="700">ClawHub skill marketplace</text>
      <text x="300" y="372" textAnchor="middle" fill="#a9c9e4" fontSize="12">human-authored SKILL.md, installed</text>

      {/* Impl note */}
      <text x="300" y="416" textAnchor="middle" fill="#7aa7cc" fontSize="12.5">TypeScript · npm i -g openclaw · Docker / Railway</text>
      <text x="300" y="436" textAnchor="middle" fill="#6f93b3" fontSize="11.5" fontStyle="italic">breadth of integrations, mature multi-channel</text>

      {/* ───────── Hermes (right) ───────── */}
      <rect x="640" y="72" width="520" height="378" rx="18" fill="#150e2b" stroke="#6d28d9" strokeWidth="1.6" />
      <text x="900" y="104" textAnchor="middle" fill="#c4b5fd" fontSize="19" fontWeight="800">Hermes Agent</text>
      <text x="900" y="126" textAnchor="middle" fill="#b9aede" fontSize="12.5">agent runtime · &quot;it learns&quot;</text>

      {/* Runtime loop core */}
      <rect x="700" y="150" width="400" height="86" rx="14" fill="#1a1136" stroke="url(#hocHermes)" strokeWidth="2.2" />
      <text x="900" y="180" textAnchor="middle" fill="#f5f3ff" fontSize="16" fontWeight="800">Agent Loop (the core)</text>
      <text x="900" y="204" textAnchor="middle" fill="#cabff0" fontSize="12">plan → call tools → run in sandbox</text>
      <text x="900" y="224" textAnchor="middle" fill="#cabff0" fontSize="12">gateway is a thin surface, not the center</text>

      {/* Self-improving skills loop */}
      <path d="M 900 236 L 900 260" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#hocArrowPurple)" />
      <circle cx="900" cy="326" r="60" fill="#1a1136" stroke="url(#hocHermes)" strokeWidth="2" />
      <path d="M 900 276 A 50 50 0 1 1 852 340" stroke="#a78bfa" strokeWidth="2.2" fill="none" markerEnd="url(#hocArrowPurple)" />
      <text x="900" y="320" textAnchor="middle" fill="#f5f3ff" fontSize="13" fontWeight="800">Self-authored</text>
      <text x="900" y="338" textAnchor="middle" fill="#f5f3ff" fontSize="13" fontWeight="800">skills</text>
      <text x="900" y="402" textAnchor="middle" fill="#b9aede" fontSize="11.5">solve → distill → reuse (no marketplace needed)</text>

      {/* Impl note */}
      <text x="900" y="424" textAnchor="middle" fill="#9c8fce" fontSize="12.5">Python · curl install.sh · desktop app · 6 sandboxes</text>
      <text x="900" y="440" textAnchor="middle" fill="#8b7fb8" fontSize="11.5" fontStyle="italic">leaner footprint, learns as it works</text>

      {/* ───────── Shared foundation (bottom) ───────── */}
      <rect x="120" y="470" width="960" height="58" rx="14" fill="#100b22" stroke="#4c3a86" strokeWidth="1.4" />
      <text x="600" y="493" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="700" letterSpacing="1">SHARED FOUNDATION</text>
      <text x="600" y="515" textAnchor="middle" fill="#b9aede" fontSize="13">
        MIT-licensed · self-hosted · local-first files &amp; memory · bring-your-own model · migrate with `hermes claw migrate`
      </text>

      <text x="1152" y="548" textAnchor="end" fill="#6d5f9e" fontSize="11">
        aiengineerinsights.com
      </text>
    </svg>
  </div>
);

export default HermesOpenClawHeroDiagram;
