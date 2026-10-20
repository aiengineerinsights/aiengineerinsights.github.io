// Hero diagram for the "What Is an Agent Harness?" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-what-is-an-agent-harness.png).
// Shows a frozen model in the centre, the eight harness components around it
// (Harness² README list), the runtime underneath, and the Harness² optimisation
// loop (propose → probe → compose) that edits the harness, not the weights.
// Targets "agent harness" / "harness engineering" intent.
const components = [
  { x: 330, y: 150, label: "System prompt" },
  { x: 600, y: 120, label: "Tool guidance" },
  { x: 870, y: 150, label: "Guardrails" },
  { x: 900, y: 270, label: "Memory" },
  { x: 870, y: 390, label: "Skills" },
  { x: 600, y: 420, label: "Subagents" },
  { x: 330, y: 390, label: "Scripts" },
  { x: 300, y: 270, label: "Plugins" },
];

const AgentHarnessHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0b0f17]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        aria-label="An agent harness is everything around the model that lets it act as an agent. In the centre is the model with frozen weights. Around it are the eight harness components named in Google's Harness² README: system prompt, tool guidance, guardrails, memory, skills, subagents, scripts and plugins. Underneath sits the agent runtime, which keeps the agent running reliably: durable state, sandboxes, retries, observability and approval gates. On the left, harness engineering is done by people writing docs, rules, tests and feedback loops. On the right, Google's Harness² automates harnessing with a propose, probe, compose loop that edits the harness, not the model weights."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="harnessBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b0f17" />
            <stop offset="100%" stopColor="#111a2b" />
          </linearGradient>
          <marker id="harnessArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
          </marker>
        </defs>
        <rect width="1200" height="630" fill="url(#harnessBg)" />

        <text x="600" y="46" textAnchor="middle" fill="#eef4ff" fontSize="22" fontWeight="800" letterSpacing="1">
          WHAT IS AN AGENT HARNESS?
        </text>
        <text x="600" y="72" textAnchor="middle" fill="#9fb3d1" fontSize="13">
          everything around the model that lets it act as an agent · same model + better harness = better agent
        </text>

        {/* harness ring */}
        <ellipse cx="600" cy="270" rx="330" ry="170" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 6" />
        <text x="600" y="463" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="800" letterSpacing="1">THE HARNESS</text>

        {components.map((c) => (
          <g key={c.label}>
            <rect x={c.x - 72} y={c.y - 20} width="144" height="40" rx="10" fill="#13203a" stroke="#3b82f6" strokeWidth="1.3" />
            <text x={c.x} y={c.y + 5} textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="700">{c.label}</text>
          </g>
        ))}

        {/* model */}
        <circle cx="600" cy="270" r="86" fill="#1c1530" stroke="#a78bfa" strokeWidth="2" />
        <text x="600" y="262" textAnchor="middle" fill="#f5f0ff" fontSize="22" fontWeight="800">MODEL</text>
        <text x="600" y="286" textAnchor="middle" fill="#c4b5fd" fontSize="13">weights frozen</text>

        {/* runtime */}
        <rect x="240" y="476" width="720" height="58" rx="12" fill="#0f1d17" stroke="#22c55e" strokeWidth="1.5" />
        <text x="600" y="500" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="800">AGENT RUNTIME (underneath)</text>
        <text x="600" y="521" textAnchor="middle" fill="#cfeedd" fontSize="12.5">durable state · sandboxed tools · retries · observability · approval gates</text>

        {/* left: harness engineering */}
        <rect x="24" y="150" width="190" height="240" rx="12" fill="#151b26" stroke="#64748b" strokeWidth="1.2" />
        <text x="119" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="13.5" fontWeight="800">HARNESS ENGINEERING</text>
        <text x="119" y="200" textAnchor="middle" fill="#94a3b8" fontSize="11.5">people build it by hand</text>
        {["AGENTS.md / docs", "golden rules + linters", "tests as feedback", "progress logs + git", "review loops"].map((t, i) => (
          <text key={t} x="40" y={232 + i * 30} fill="#cbd5e1" fontSize="12.5">• {t}</text>
        ))}

        {/* right: Harness² loop */}
        <rect x="986" y="150" width="190" height="240" rx="12" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.4" />
        <text x="1081" y="180" textAnchor="middle" fill="#fde68a" fontSize="13.5" fontWeight="800">GOOGLE HARNESS²</text>
        <text x="1081" y="200" textAnchor="middle" fill="#e5d3a8" fontSize="11.5">automates harnessing</text>
        <text x="1081" y="240" textAnchor="middle" fill="#fef3c7" fontSize="14" fontWeight="700">Propose</text>
        <line x1="1081" y1="248" x2="1081" y2="268" stroke="#f59e0b" strokeWidth="1.6" markerEnd="url(#harnessArrow)" />
        <text x="1081" y="288" textAnchor="middle" fill="#fef3c7" fontSize="14" fontWeight="700">Probe</text>
        <line x1="1081" y1="296" x2="1081" y2="316" stroke="#f59e0b" strokeWidth="1.6" markerEnd="url(#harnessArrow)" />
        <text x="1081" y="336" textAnchor="middle" fill="#fef3c7" fontSize="14" fontWeight="700">Compose</text>
        <text x="1081" y="370" textAnchor="middle" fill="#e5d3a8" fontSize="11">edits the harness, not the weights</text>

        <text x="600" y="600" textAnchor="middle" fill="#64748b" fontSize="12">
          aiengineerinsights.com · components from the Harness² README (google-research/harness2), Oct 2026
        </text>
      </svg>
    </div>
  );
};

export default AgentHarnessHeroDiagram;
