// Hero diagram for the "Anthropic Certifications" hub post. Pure inline SVG so it
// prerenders to crawler-visible markup and doubles as the OG image
// (viewBox 1200x630, rasterised to public/og-anthropic-certifications.png).
// Shows the free Claude Academy courses as the base layer, the five proctored
// Claude certifications above it (Associate, Developer and Architect at Foundations
// and Professional level), and the nomination-only Claude Frontier Academy on top.
// Targets "anthropic certifications" / "anthropic academy courses" intent.
const certs = [
  { x: 40, code: "CCAO-F", name: "Associate", tier: "Foundations", who: "Business users of Claude", note: "No code needed", price: "$99", color: "#38bdf8" },
  { x: 267, code: "CCDV-F", name: "Developer", tier: "Foundations", who: "Engineers building on the API", note: "Python / TypeScript", price: "$125", color: "#a78bfa" },
  { x: 494, code: "CCDV-P", name: "Developer", tier: "Professional", who: "Running Claude in production", note: "Reliability, evals, cost", price: "$175", color: "#818cf8" },
  { x: 721, code: "CCAR-F", name: "Architect", tier: "Foundations", who: "Builders of agent systems", note: "Agents, MCP, Claude Code", price: "$125", color: "#f472b6" },
  { x: 948, code: "CCAR-P", name: "Architect", tier: "Professional", who: "Senior solution architects", note: "Full solution lifecycle", price: "$175", color: "#fb923c" },
];
const CARD_W = 212;

const AnthropicCertificationsHeroDiagram = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0d0b14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Map of Anthropic's Claude certifications in 2026. Bottom layer: the free Claude Academy courses at academy.claude.com, open to anyone, such as Claude 101, AI Fluency, Building with the Claude API, Model Context Protocol, and Claude Code in action; they give completion badges, not certifications. Middle layer: five proctored Claude certification exams delivered by Pearson VUE and open to organizations in the Claude Partner Network: Claude Certified Associate Foundations (CCAO-F) for business users, $99; Claude Certified Developer Foundations (CCDV-F) for engineers building on the API, $125; Claude Certified Developer Professional (CCDV-P) for engineers running Claude in production, $175; Claude Certified Architect Foundations (CCAR-F) for builders of agent systems, $125; and Claude Certified Architect Professional (CCAR-P) for senior solution architects, $175. Each is a 120-minute exam, pass mark 720 of 1000, valid 12 months, up to 4 attempts in 12 months. Top layer: Claude Frontier Academy, nomination only, which awards the Claude Resident Engineer badge followed by a 12-week residency."
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="anthCertBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d0b14" />
            <stop offset="60%" stopColor="#14101f" />
            <stop offset="100%" stopColor="#1a1326" />
          </linearGradient>
        </defs>

        <rect width="1200" height="630" fill="url(#anthCertBg)" />

        <text x="600" y="48" textAnchor="middle" fill="#f5f0ff" fontSize="22" fontWeight="800" letterSpacing="1">
          ANTHROPIC CERTIFICATIONS 2026: THE FULL MAP
        </text>
        <text x="600" y="74" textAnchor="middle" fill="#b9a9d6" fontSize="13">
          free courses for anyone → five proctored Claude exams (partner-gated) → nomination-only Frontier Academy
        </text>

        {/* top: Frontier Academy */}
        <rect x="300" y="100" width="600" height="74" rx="12" fill="#1f1530" stroke="#eab308" strokeWidth="1.6" strokeDasharray="6 4" />
        <text x="600" y="128" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="800">CLAUDE FRONTIER ACADEMY · nomination only</text>
        <text x="600" y="152" textAnchor="middle" fill="#e9dcc0" fontSize="12.5">
          in-person program + graded practical → Claude Resident Engineer badge → 12-week residency
        </text>

        {/* middle band label */}
        <text x="600" y="210" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800" letterSpacing="0.8">
          CLAUDE CERTIFICATION EXAMS · Pearson VUE · open to Claude Partner Network organizations
        </text>

        {certs.map((c) => (
          <g key={c.code}>
            <rect x={c.x} y="226" width={CARD_W} height="190" rx="12" fill="#171225" stroke={c.color} strokeWidth="1.6" />
            <rect x={c.x} y="226" width={CARD_W} height="6" rx="3" fill={c.color} />
            <text x={c.x + 16} y="262" fill={c.color} fontSize="13" fontWeight="800" fontFamily="ui-monospace, monospace">{c.code}</text>
            <text x={c.x + CARD_W - 16} y="262" textAnchor="end" fill="#f5f0ff" fontSize="14" fontWeight="800">{c.price}</text>
            <text x={c.x + 16} y="294" fill="#f5f0ff" fontSize="20" fontWeight="800">{c.name}</text>
            <text x={c.x + 16} y="316" fill="#cbbfe3" fontSize="13">{c.tier}</text>
            <line x1={c.x + 16} y1="334" x2={c.x + CARD_W - 16} y2="334" stroke="#2e2542" />
            <text x={c.x + 16} y="360" fill="#e7defa" fontSize="12.5">{c.who}</text>
            <text x={c.x + 16} y="384" fill="#a596c2" fontSize="12">{c.note}</text>
          </g>
        ))}

        <text x="600" y="446" textAnchor="middle" fill="#b9a9d6" fontSize="12.5">
          each exam: 120 min · scaled pass 720 / 1000 · valid 12 months · up to 4 attempts per 12 months · OnVUE online or test center
        </text>

        {/* bottom: Academy */}
        <rect x="40" y="470" width="1120" height="104" rx="12" fill="#11161f" stroke="#22c55e" strokeWidth="1.6" />
        <rect x="40" y="470" width="6" height="104" rx="3" fill="#22c55e" />
        <text x="66" y="500" fill="#86efac" fontSize="15" fontWeight="800">CLAUDE ACADEMY · free for anyone · academy.claude.com</text>
        <text x="66" y="526" fill="#d6f5e0" fontSize="12.5">
          Claude 101 · AI Fluency · Claude Platform 101 · Building with the Claude API · Intro to MCP · MCP Advanced topics
        </text>
        <text x="66" y="548" fill="#d6f5e0" fontSize="12.5">
          Claude Code 101 · Claude Code in action · Intro to agent skills · Intro to subagents · Intro to evals · and more
        </text>
        <text x="1140" y="500" textAnchor="end" fill="#86efac" fontSize="12" fontWeight="700">completion badge ≠ certification</text>

        <text x="600" y="606" textAnchor="middle" fill="#7d6f99" fontSize="12">
          aiengineerinsights.com · prices from Anthropic's certification FAQ, Nov 2026 · three exams update on Dec 7, 2026
        </text>
      </svg>
    </div>
  );
};

export default AnthropicCertificationsHeroDiagram;
