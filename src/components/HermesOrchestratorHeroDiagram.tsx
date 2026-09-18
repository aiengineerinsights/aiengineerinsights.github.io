// Hero diagram for the "Hermes + Claude Code orchestration" post. Pure inline
// SVG so it prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows the orchestrator + agent-runtime pattern: Hermes is
// the persistent brain (memory, skills, cron, model routing) that dispatches
// coding work to runtimes it officially ships skills for — Claude Code, Codex,
// OpenCode — while routing models (DeepSeek and any provider) underneath.
const HermesOrchestratorHeroDiagram = () => {
  const runtimes = [
    { y: 120, t: "Claude Code", d: "the primary coder — edits, runs, git" },
    { y: 196, t: "Codex CLI", d: "alt runtime, same delegate pattern" },
    { y: 272, t: "OpenCode", d: "open-source BYO-key runtime" },
    { y: 348, t: "Computer use", d: "drive a real browser / desktop" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Hermes as an orchestrator paired with agent runtimes. On the left, Hermes is the persistent brain: memory and skills, a cron scheduler, a kanban task board, and model routing (Mixture of Agents). It dispatches coding tasks — via bundled skills and print-mode or tmux — to agent runtimes on the right: Claude Code (the primary coder that edits, runs, and manages git), Codex CLI, OpenCode, and computer use. Underneath, a model layer routes any provider, including DeepSeek and its R1 reasoning model, so cheap models can handle orchestration while a strong model does the hard coding. Hermes plans, remembers, and schedules; the runtime writes and runs the code."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="hoBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="hoArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#hoBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          HERMES AS AN ORCHESTRATOR
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          the persistent brain plans, remembers, and schedules — the runtime writes and runs the code
        </text>

        {/* Hermes orchestrator box (left) */}
        <rect x="48" y="120" width="360" height="300" rx="16" fill="#150e24" stroke="#a855f7" strokeWidth="2" />
        <text x="228" y="152" textAnchor="middle" fill="#e9d5ff" fontSize="17" fontWeight="800">HERMES · orchestrator</text>
        {[
          ["Memory + skills", "compounds across runs"],
          ["Cron scheduler", "runs unattended"],
          ["Kanban + delegate", "decompose & dispatch"],
          ["Model routing (MoA)", "cheap model to plan"],
        ].map(([t, d], i) => (
          <g key={t}>
            <rect x="72" y={176 + i * 58} width="312" height="46" rx="9" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="88" y={198 + i * 58} fill="#eaf4fb" fontSize="13.5" fontWeight="700">{t}</text>
            <text x="88" y={214 + i * 58} fill="#9db6c6" fontSize="11">{d}</text>
          </g>
        ))}

        {/* dispatch arrows */}
        <g stroke="#5b7488" strokeWidth="1.8" fill="none" markerEnd="url(#hoArrow)">
          {runtimes.map((r) => (
            <line key={r.y} x1="408" y1="270" x2="726" y2={r.y + 28} />
          ))}
        </g>
        <text x="567" y="256" textAnchor="middle" fill="#7fb0c8" fontSize="11">bundled skill · print mode / tmux</text>

        {/* runtimes (right) */}
        {runtimes.map((r) => (
          <g key={r.t}>
            <rect x="728" y={r.y} width="424" height="56" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
            <rect x="728" y={r.y} width="6" height="56" rx="3" fill="#059669" />
            <text x="752" y={r.y + 24} fill="#eaf4fb" fontSize="14.5" fontWeight="700">{r.t}</text>
            <text x="752" y={r.y + 43} fill="#9db6c6" fontSize="11.5">{r.d}</text>
          </g>
        ))}

        {/* model layer band */}
        <rect x="48" y="470" width="1104" height="58" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="70" y="494" fill="#5eead4" fontSize="12.5" fontWeight="800">MODEL LAYER · any provider</text>
        <text x="70" y="514" fill="#9fe8da" fontSize="11.5">route DeepSeek (incl. R1 reasoning), a local model, or a frontier model per step — cheap to plan, strong to code</text>

        <text x="1152" y="560" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default HermesOrchestratorHeroDiagram;
