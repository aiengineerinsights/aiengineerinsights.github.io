// Hero diagram for the "MCP Server Trust" post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630). Shows an MCP server sitting between an agent and three
// attack classes (tool poisoning, rug pulls, token passthrough), with the
// scoping controls that neutralize each one.
const MCPTrustHeroDiagram = () => {
  const risks = [
    { y: 130, t: "Tool description poisoning" },
    { y: 210, t: "Rug-pull (tool changes post-approval)" },
    { y: 290, t: "Token passthrough / confused deputy" },
    { y: 370, t: "Shadow / unvetted MCP servers" },
  ];
  const controls = [
    { y: 150, t: "Static scan before connect" },
    { y: 250, t: "Pin + diff tool manifests" },
    { y: 350, t: "Scoped, audience-bound tokens" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="How to scope trust for an MCP server before connecting it to an AI agent. On the left, four risk classes: tool description poisoning, rug-pull attacks where a tool's behavior changes after approval, OAuth token passthrough causing confused-deputy access, and shadow or unvetted MCP servers. In the middle, the MCP server sits between the agent and its tools. On the right, three scoping controls neutralize each risk: a static scan of tool descriptions before connecting, pinning and diffing tool manifests to catch silent changes, and issuing scoped, audience-bound tokens instead of broad standing credentials. The lesson: treat every MCP server as untrusted supply chain until it's vetted and scoped, the same discipline as a new npm dependency."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="mcpBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1222" />
            <stop offset="100%" stopColor="#101025" />
          </linearGradient>
          <marker id="mcpArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#mcpBg)" />
        <g fill="#818cf8" opacity="0.06">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          HOW TO SCOPE TRUST FOR AN MCP SERVER
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          treat every new MCP server like an unvetted dependency, not a trusted extension
        </text>

        <text x="150" y="112" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="800">RISK CLASS</text>
        <text x="600" y="112" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">MCP SERVER</text>
        <text x="1010" y="96" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="800">SCOPING CONTROL</text>

        <rect x="520" y="128" width="160" height="300" rx="16" fill="#0e1a24" stroke="#4f46e5" strokeWidth="1.8" />
        <text x="600" y="262" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="800">MCP</text>
        <text x="600" y="280" textAnchor="middle" fill="#a5b4fc" fontSize="13" fontWeight="800">SERVER</text>
        <text x="600" y="300" textAnchor="middle" fill="#93c5fd" fontSize="10.5">tools + schema</text>
        <text x="600" y="316" textAnchor="middle" fill="#93c5fd" fontSize="10.5">exposed to agent</text>

        {risks.map((s) => (
          <g key={s.t}>
            <rect x="40" y={s.y} width="260" height="60" rx="12" fill="#1a1012" stroke="#dc2626" strokeWidth="1.6" />
            <rect x="40" y={s.y} width="6" height="60" rx="3" fill="#dc2626" />
            <text x="64" y={s.y + 34} fill="#fecaca" fontSize="12.5" fontWeight="700">{s.t}</text>
            <line x1="300" y1={s.y + 30} x2="518" y2="278" stroke="#5a3030" strokeWidth="1.6" markerEnd="url(#mcpArrow)" />
          </g>
        ))}

        {controls.map((d) => (
          <g key={d.t}>
            <rect x="800" y={d.y} width="352" height="60" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
            <rect x="800" y={d.y} width="6" height="60" rx="3" fill="#059669" />
            <text x="824" y={d.y + 34} fill="#eaf4fb" fontSize="13.5" fontWeight="700">{d.t}</text>
            <line x1="682" y1="278" x2="798" y2={d.y + 30} stroke="#2f5347" strokeWidth="1.6" markerEnd="url(#mcpArrow)" />
          </g>
        ))}

        <rect x="48" y="470" width="1104" height="60" rx="14" fill="#10172e" stroke="#4338ca" strokeWidth="1.3" />
        <text x="600" y="496" textAnchor="middle" fill="#a5b4fc" fontSize="13.5" fontWeight="800">
          UNSCOPED MCP TRUST = THE AGENT INHERITS WHATEVER THE SERVER TELLS IT
        </text>
        <text x="600" y="516" textAnchor="middle" fill="#c7d2fe" fontSize="12">
          OWASP MCP Top 10 and the official spec both say the same thing: least privilege, verified tokens, pinned manifests
        </text>

        <text x="1152" y="560" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default MCPTrustHeroDiagram;
