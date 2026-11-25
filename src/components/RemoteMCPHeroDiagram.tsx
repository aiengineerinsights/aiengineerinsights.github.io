// Hero diagram for the "Remote MCP Servers" post. Pure inline SVG, prerenders
// to crawler-visible markup, viewBox 1200x560 (rasterized to the OG image).
// Shows the two deployment shapes side by side: local stdio (same machine,
// env-var credentials) vs remote Streamable HTTP (network hop, OAuth 2.1
// bearer tokens via a separate authorization server). Targets "remote mcp
// server" / "mcp oauth" intent.
const RemoteMCPHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 560"
        role="img"
        aria-label="Local stdio MCP server vs remote MCP server. On the left, a local setup: an MCP host spawns a server as a child process on the same machine over stdio, and the server reads credentials straight from the environment — no network hop, no OAuth. On the right, a remote setup: an MCP client on the host connects over Streamable HTTP across the network to a server acting as an OAuth 2.1 resource server, which validates a bearer access token issued by a separate authorization server before running any tool. Remote servers add one more moving part — the authorization server — but let one hosted server serve many users and devices at once."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="rmcpBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="rmcpArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
        </defs>

        <rect width="1200" height="560" fill="url(#rmcpBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 42} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="42" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          LOCAL (stdio) vs REMOTE (Streamable HTTP) MCP SERVERS
        </text>
        <text x="600" y="64" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          same protocol, two very different deployment and auth stories
        </text>

        {/* divider */}
        <line x1="600" y1="86" x2="600" y2="500" stroke="#1c2b38" strokeWidth="1.4" strokeDasharray="4 6" />

        {/* LEFT: local stdio */}
        <text x="300" y="104" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="800">LOCAL — stdio</text>
        <rect x="90" y="130" width="220" height="56" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="200" y="154" textAnchor="middle" fill="#eaf4fb" fontSize="13.5" fontWeight="700">MCP host</text>
        <text x="200" y="174" textAnchor="middle" fill="#93c5fd" fontSize="11">Claude Desktop / IDE</text>

        <line x1="200" y1="186" x2="200" y2="226" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#rmcpArrow)" />
        <text x="230" y="210" fill="#6b8a9e" fontSize="10.5">spawns child process</text>

        <rect x="90" y="226" width="220" height="56" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
        <text x="200" y="250" textAnchor="middle" fill="#eaf4fb" fontSize="13.5" fontWeight="700">MCP server</text>
        <text x="200" y="270" textAnchor="middle" fill="#6ee7b7" fontSize="11">same machine, same process tree</text>

        <rect x="90" y="310" width="220" height="48" rx="10" fill="#161016" stroke="#92400e" strokeWidth="1.4" />
        <text x="200" y="330" textAnchor="middle" fill="#fbbf86" fontSize="11" fontWeight="700">reads credentials from</text>
        <text x="200" y="346" textAnchor="middle" fill="#fbbf86" fontSize="11" fontWeight="700">the local environment</text>

        <rect x="60" y="392" width="280" height="86" rx="12" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="200" y="414" textAnchor="middle" fill="#5eead4" fontSize="12" fontWeight="800">NO OAuth, NO network hop</text>
        <text x="200" y="434" textAnchor="middle" fill="#9fe8da" fontSize="11">one user, one machine —</text>
        <text x="200" y="452" textAnchor="middle" fill="#9fe8da" fontSize="11">spec says skip the auth flow,</text>
        <text x="200" y="468" textAnchor="middle" fill="#9fe8da" fontSize="11">use env-var secrets instead</text>

        {/* RIGHT: remote HTTP */}
        <text x="900" y="104" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">REMOTE — Streamable HTTP</text>
        <rect x="700" y="130" width="220" height="56" rx="12" fill="#0e1a24" stroke="#2563eb" strokeWidth="1.6" />
        <text x="810" y="154" textAnchor="middle" fill="#eaf4fb" fontSize="13.5" fontWeight="700">MCP client</text>
        <text x="810" y="174" textAnchor="middle" fill="#93c5fd" fontSize="11">inside the host app</text>

        <line x1="810" y1="186" x2="810" y2="226" stroke="#7c3aed" strokeWidth="1.8" markerEnd="url(#rmcpArrow)" />
        <text x="848" y="210" fill="#b7a6e8" fontSize="10.5">HTTPS, network hop</text>

        <rect x="700" y="226" width="220" height="56" rx="12" fill="#150e24" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="810" y="250" textAnchor="middle" fill="#eaf4fb" fontSize="13.5" fontWeight="700">MCP server</text>
        <text x="810" y="270" textAnchor="middle" fill="#d6c7f5" fontSize="11">OAuth 2.1 resource server</text>

        <line x1="920" y1="254" x2="1010" y2="254" stroke="#7c3aed" strokeWidth="1.6" strokeDasharray="3 4" markerEnd="url(#rmcpArrow)" />
        <rect x="1012" y="226" width="150" height="56" rx="12" fill="#1a1024" stroke="#a855f7" strokeWidth="1.4" />
        <text x="1087" y="250" textAnchor="middle" fill="#eaf4fb" fontSize="12" fontWeight="700">Auth server</text>
        <text x="1087" y="268" textAnchor="middle" fill="#c9b6ef" fontSize="10.5">issues tokens</text>

        <rect x="700" y="310" width="220" height="48" rx="10" fill="#161016" stroke="#92400e" strokeWidth="1.4" />
        <text x="810" y="330" textAnchor="middle" fill="#fbbf86" fontSize="11" fontWeight="700">validates a bearer token</text>
        <text x="810" y="346" textAnchor="middle" fill="#fbbf86" fontSize="11" fontWeight="700">on every request — never issues one</text>

        <rect x="730" y="392" width="300" height="86" rx="12" fill="#1a1024" stroke="#a855f7" strokeWidth="1.3" />
        <text x="880" y="414" textAnchor="middle" fill="#d6c7f5" fontSize="12" fontWeight="800">OAuth 2.1 + RFC 9728</text>
        <text x="880" y="434" textAnchor="middle" fill="#c9b6ef" fontSize="11">many users, many devices —</text>
        <text x="880" y="452" textAnchor="middle" fill="#c9b6ef" fontSize="11">one hosted server, scoped per-user</text>
        <text x="880" y="468" textAnchor="middle" fill="#c9b6ef" fontSize="11">tokens instead of shared secrets</text>

        <text x="1152" y="520" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default RemoteMCPHeroDiagram;
