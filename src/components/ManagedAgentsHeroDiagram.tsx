// Hero diagram for the "Claude Managed Agents" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-claude-managed-agents.png).
// Shows the four API objects (Agent, Environment, Session, Events), Anthropic's
// brain / hands / session split, and the published price ($0.08 per session-hour
// plus tokens). Targets "claude managed agents" / "anthropic managed agents".
const objects = [
  { x: 60, title: "AGENT", color: "#a78bfa", lines: ["model + system prompt", "tools · MCP servers", "skills"] },
  { x: 340, title: "ENVIRONMENT", color: "#38bdf8", lines: ["cloud sandbox (Anthropic)", "or self-hosted sandbox", "networking rules"] },
  { x: 620, title: "SESSION", color: "#f472b6", lines: ["a running agent", "state kept server-side", "budget · permissions"] },
  { x: 900, title: "EVENTS", color: "#fbbf24", lines: ["user turns · tool results", "status updates", "streamed over SSE"] },
];

const ManagedAgentsHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0e0b16]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        aria-label="How Claude Managed Agents works. You define four objects through the API: an Agent (model, system prompt, tools, MCP servers, skills), an Environment (an Anthropic-managed cloud sandbox or your own self-hosted sandbox), a Session (a running agent whose state Anthropic keeps), and Events (user turns, tool results and status updates streamed over server-sent events). Underneath, Anthropic separates the brain (Claude plus the agent harness), the hands (sandboxes and tools) and the session log. Pricing is standard token rates plus 8 cents per session-hour of running time. It is in public beta since April 8, 2026."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="cmaBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0e0b16" />
            <stop offset="100%" stopColor="#1a1328" />
          </linearGradient>
          <marker id="cmaArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8b7fb0" />
          </marker>
        </defs>
        <rect width="1200" height="630" fill="url(#cmaBg)" />

        <text x="600" y="48" textAnchor="middle" fill="#f5f0ff" fontSize="23" fontWeight="800" letterSpacing="1">
          CLAUDE MANAGED AGENTS, EXPLAINED
        </text>
        <text x="600" y="74" textAnchor="middle" fill="#b9a9d6" fontSize="13.5">
          Anthropic hosts the agent loop, the sandbox and the session · public beta since April 8, 2026
        </text>

        <text x="600" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800" letterSpacing="0.8">
          WHAT YOU DEFINE THROUGH THE API
        </text>
        {objects.map((o, i) => (
          <g key={o.title}>
            <rect x={o.x} y="136" width="240" height="150" rx="12" fill="#171225" stroke={o.color} strokeWidth="1.6" />
            <rect x={o.x} y="136" width="240" height="6" rx="3" fill={o.color} />
            <text x={o.x + 120} y="178" textAnchor="middle" fill={o.color} fontSize="17" fontWeight="800">{o.title}</text>
            {o.lines.map((l, j) => (
              <text key={l} x={o.x + 120} y={212 + j * 24} textAnchor="middle" fill="#e7defa" fontSize="13">{l}</text>
            ))}
            {i < objects.length - 1 && (
              <line x1={o.x + 244} y1="211" x2={o.x + 276} y2="211" stroke="#8b7fb0" strokeWidth="1.6" markerEnd="url(#cmaArrow)" />
            )}
          </g>
        ))}

        <text x="600" y="334" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800" letterSpacing="0.8">
          WHAT ANTHROPIC RUNS FOR YOU · "BRAIN" SEPARATED FROM "HANDS"
        </text>
        <rect x="60" y="352" width="340" height="96" rx="12" fill="#1c1530" stroke="#a78bfa" strokeWidth="1.4" />
        <text x="230" y="386" textAnchor="middle" fill="#f5f0ff" fontSize="16" fontWeight="800">BRAIN</text>
        <text x="230" y="412" textAnchor="middle" fill="#d8ccf0" fontSize="13">Claude + the agent harness</text>
        <text x="230" y="432" textAnchor="middle" fill="#a596c2" fontSize="12">prompt caching · compaction</text>
        <rect x="430" y="352" width="340" height="96" rx="12" fill="#10202b" stroke="#38bdf8" strokeWidth="1.4" />
        <text x="600" y="386" textAnchor="middle" fill="#e0f2fe" fontSize="16" fontWeight="800">HANDS</text>
        <text x="600" y="412" textAnchor="middle" fill="#cde7f5" fontSize="13">sandboxes + tools</text>
        <text x="600" y="432" textAnchor="middle" fill="#8fb4c9" fontSize="12">bash · files · web · MCP · custom tools</text>
        <rect x="800" y="352" width="340" height="96" rx="12" fill="#26131f" stroke="#f472b6" strokeWidth="1.4" />
        <text x="970" y="386" textAnchor="middle" fill="#fde7f3" fontSize="16" fontWeight="800">SESSION LOG</text>
        <text x="970" y="412" textAnchor="middle" fill="#f3cfe2" fontSize="13">durable event history</text>
        <text x="970" y="432" textAnchor="middle" fill="#c99ab3" fontSize="12">resume · steer · interrupt</text>

        <rect x="230" y="482" width="740" height="70" rx="12" fill="#1f1a10" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="600" y="512" textAnchor="middle" fill="#fde68a" fontSize="17" fontWeight="800">PRICE = TOKENS + $0.08 PER SESSION-HOUR</text>
        <text x="600" y="536" textAnchor="middle" fill="#e5d3a8" fontSize="12.5">runtime billed to the millisecond, only while the session is running · replaces container-hour billing</text>

        <text x="600" y="602" textAnchor="middle" fill="#7d6f99" fontSize="12">
          aiengineerinsights.com · from Anthropic's Managed Agents docs and pricing page, Oct 2026
        </text>
      </svg>
    </div>
  );
};

export default ManagedAgentsHeroDiagram;
