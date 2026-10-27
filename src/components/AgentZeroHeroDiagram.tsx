// Hero diagram for the "Agent Zero vs Hermes Agent vs OpenClaw" post. Pure inline
// SVG so it prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-agent-zero-vs-hermes-agent.png).
// Shows where each agent puts its center of gravity: Agent Zero = a full Linux
// computer in Docker driven from a web UI, Hermes = a learning agent loop on your
// machine, OpenClaw = a gateway that routes messaging channels.
// Targets "agent zero vs hermes" / "agent zero vs openclaw".
const agents = [
  {
    x: 40,
    name: "AGENT ZERO",
    tag: "a full Linux computer for the agent",
    color: "#22d3ee",
    lines: ["runs inside Docker", "web UI + Linux desktop + browser", "projects, memory, 100+ plugins", "Python · MIT · ~20k stars"],
    best: "best for: hands-on work in a sandbox",
  },
  {
    x: 420,
    name: "HERMES AGENT",
    tag: "an agent loop that learns",
    color: "#a78bfa",
    lines: ["runs on your machine (TUI / desktop)", "writes its own skills from work", "SQLite session search + memory", "Python · MIT · Nous Research"],
    best: "best for: a personal agent that improves",
  },
  {
    x: 800,
    name: "OPENCLAW",
    tag: "a gateway for your chat apps",
    color: "#f97316",
    lines: ["resident gateway daemon", "20+ messaging channels", "ClawHub skill marketplace", "TypeScript · MIT"],
    best: "best for: one assistant in every channel",
  },
];

const AgentZeroHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f16]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        aria-label="Agent Zero vs Hermes Agent vs OpenClaw. Agent Zero gives the agent a full Linux computer: it runs inside Docker and you drive it from a web UI with a Linux desktop and browser, plus projects, memory and 100+ plugins; Python, MIT licensed. Hermes Agent is an agent loop that learns: it runs on your machine from a terminal or desktop app and writes its own skills from completed work, with searchable session memory; Python, MIT, from Nous Research. OpenClaw is a gateway for your chat apps: a resident daemon connecting 20+ messaging channels with the ClawHub skill marketplace; TypeScript, MIT. All three are free and self-hosted; you pay for model usage."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="a0Bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f16" />
            <stop offset="100%" stopColor="#111a24" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#a0Bg)" />

        <text x="600" y="52" textAnchor="middle" fill="#eef6ff" fontSize="25" fontWeight="800" letterSpacing="1">
          AGENT ZERO vs HERMES AGENT vs OPENCLAW
        </text>
        <text x="600" y="80" textAnchor="middle" fill="#9fb3c8" fontSize="14">
          three free, self-hosted AI agents, three different centers of gravity
        </text>

        {agents.map((a) => (
          <g key={a.name}>
            <rect x={a.x} y="116" width="360" height="380" rx="14" fill="#121b27" stroke={a.color} strokeWidth="1.8" />
            <rect x={a.x} y="116" width="360" height="7" rx="3" fill={a.color} />
            <text x={a.x + 180} y="166" textAnchor="middle" fill={a.color} fontSize="22" fontWeight="800" letterSpacing="0.8">{a.name}</text>
            <text x={a.x + 180} y="194" textAnchor="middle" fill="#e2e8f0" fontSize="14.5" fontStyle="italic">{a.tag}</text>
            <line x1={a.x + 30} y1="216" x2={a.x + 330} y2="216" stroke="#263241" strokeWidth="1" />
            {a.lines.map((l, i) => (
              <g key={l}>
                <circle cx={a.x + 38} cy={252 + i * 44} r="4" fill={a.color} />
                <text x={a.x + 54} y={257 + i * 44} fill="#d6e1ee" fontSize="15">{l}</text>
              </g>
            ))}
            <rect x={a.x + 24} y="432" width="312" height="44" rx="10" fill="#0c131c" stroke="#263241" />
            <text x={a.x + 180} y="460" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700">{a.best}</text>
          </g>
        ))}

        <rect x="200" y="522" width="800" height="50" rx="12" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.4" />
        <text x="600" y="553" textAnchor="middle" fill="#fde68a" fontSize="15.5" fontWeight="700">
          all three: MIT licensed · self-hosted · bring your own model · you pay only for tokens
        </text>

        <text x="600" y="608" textAnchor="middle" fill="#64748b" fontSize="12">
          aiengineerinsights.com · from each project's GitHub and docs, Oct 2026
        </text>
      </svg>
    </div>
  );
};

export default AgentZeroHeroDiagram;
