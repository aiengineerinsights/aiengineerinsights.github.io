// Hero diagram for the GitHub bug bounty / "AI slop" post.
// Pure inline SVG: prerenders to static markup, crawler-visible, zero JS.
const BugBountyHeroDiagram = () => (
  <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
    <svg
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Diagram: AI agents and scanners generate a flood of low-effort vulnerability reports into bug bounty programs, overwhelming maintainer triage capacity, which forces curl to end its bounty program, Google to require proof-of-concept exploits, and GitHub to launch an invite-only VIP tier while capping new researcher submissions to four, effective July 27, 2026"
      className="w-full h-auto block"
    >
      <defs>
        <linearGradient id="bbBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0b" />
          <stop offset="55%" stopColor="#0d0d0c" />
          <stop offset="100%" stopColor="#151413" />
        </linearGradient>
        <linearGradient id="bbSourceGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4A6F5" />
          <stop offset="100%" stopColor="#3a245f" />
        </linearGradient>
        <linearGradient id="bbOutcomeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#225a41" />
          <stop offset="100%" stopColor="#1c4a35" />
        </linearGradient>
        <radialGradient id="bbGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFB454" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFB454" stopOpacity="0" />
        </radialGradient>
        <marker id="bbArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#dcdad6" />
        </marker>
        <marker id="bbArrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#FFB454" />
        </marker>
      </defs>

      <rect width="1200" height="560" fill="url(#bbBg)" />
      <g fill="#dcdad6" opacity="0.05">
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 24 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 49} cy={30 + r * 46} r="1.6" />
          ))
        )}
      </g>

      <text x="600" y="44" textAnchor="middle" fill="#ebebe9" fontSize="15" fontWeight="700" letterSpacing="2">
        THE AI-SLOP PIPELINE — FROM AUTOMATED SCANS TO BROKEN TRUST
      </text>

      {/* ── Source column (left) ── */}
      <rect x="46" y="82" width="328" height="336" rx="18" fill="#10100f" stroke="url(#bbSourceGrad)" strokeWidth="2" strokeDasharray="7 5" />
      <text x="210" y="112" textAnchor="middle" fill="#dcdad6" fontSize="13.5" fontWeight="700" letterSpacing="1">
        REPORT VOLUME, 2025–26
      </text>

      {[
        { y: 138, h: 58, t1: "curl (Stenberg)", t2: "~20% of 2025 reports were AI slop" },
        { y: 204, h: 58, t1: "HackerOne 2025 report", t2: "AI vuln reports up 210% YoY" },
        { y: 270, h: 58, t1: "Screenly", t2: "39 of 331 reports confirmed real" },
        { y: 336, h: 66, t1: "curl, 6-yr sample", t2: "0 genuine bugs from AI-only submissions" },
      ].map((row) => (
        <g key={row.y}>
          <rect x="70" y={row.y} width="280" height={row.h} rx="12" fill="#161514" stroke="#C4A6F5" strokeWidth="1.2" />
          <text x="86" y={row.y + 24} fill="#f9f9f9" fontSize="13.5" fontWeight="700">{row.t1}</text>
          <text x="86" y={row.y + 44} fill="#C4A6F5" fontSize="12">{row.t2}</text>
        </g>
      ))}

      {/* Arrow into triage */}
      <path d="M 374 250 C 430 250, 430 250, 484 250" stroke="#dcdad6" strokeWidth="2.4" fill="none" markerEnd="url(#bbArrow)" />

      {/* ── Triage bottleneck (center) ── */}
      <ellipse cx="600" cy="250" rx="130" ry="160" fill="url(#bbGlow)" />
      <rect x="486" y="150" width="228" height="200" rx="16" fill="#0c0c0b" stroke="#FFB454" strokeWidth="2" />
      <text x="600" y="182" textAnchor="middle" fill="#FFB454" fontSize="14.5" fontWeight="800">
        MAINTAINER
      </text>
      <text x="600" y="202" textAnchor="middle" fill="#FFB454" fontSize="14.5" fontWeight="800">
        TRIAGE
      </text>
      <text x="600" y="230" textAnchor="middle" fill="#FFB454" fontSize="12.5">
        every report needs a
      </text>
      <text x="600" y="248" textAnchor="middle" fill="#FFB454" fontSize="12.5">
        human to read it —
      </text>
      <text x="600" y="266" textAnchor="middle" fill="#FFB454" fontSize="12.5">
        real or hallucinated
      </text>
      <rect x="510" y="286" width="180" height="46" rx="10" fill="#0f0f0e" stroke="#815e31" strokeWidth="1.2" />
      <text x="600" y="314" textAnchor="middle" fill="#FFB454" fontSize="12.5" fontWeight="700">
        ~5% genuine, rest noise
      </text>

      {/* Arrow into outcomes */}
      <path d="M 714 250 L 826 250" stroke="#FFB454" strokeWidth="2.4" fill="none" markerEnd="url(#bbArrowAmber)" />

      {/* ── Outcomes column (right) ── */}
      <rect x="828" y="82" width="326" height="336" rx="18" fill="#0c0c0b" stroke="url(#bbOutcomeGrad)" strokeWidth="2" />
      <text x="991" y="112" textAnchor="middle" fill="#6FD6A8" fontSize="13.5" fontWeight="700" letterSpacing="1">
        PROGRAMS RESPOND
      </text>

      {[
        { y: 138, h: 58, t1: "curl — Jan 2026", t2: "Ended its bug bounty entirely", t3: "" },
        { y: 204, h: 58, t1: "Google — Mar 2026", t2: "Rejects AI-generated-only reports", t3: "" },
        { y: 270, h: 78, t1: "GitHub — Jul 27, 2026", t2: "Invite-only VIP tier;", t3: "new researchers capped at 4 reports" },
      ].map((row) => (
        <g key={row.y}>
          <rect x="852" y={row.y} width="280" height={row.h} rx="12" fill="#0f0f0e" stroke="#225a41" strokeWidth="1.2" />
          <text x="868" y={row.y + 24} fill="#f5f5f4" fontSize="13.5" fontWeight="700">{row.t1}</text>
          <text x="868" y={row.y + 44} fill="#6FD6A8" fontSize="12">{row.t2}</text>
          {row.t3 && <text x="868" y={row.y + 62} fill="#6FD6A8" fontSize="12">{row.t3}</text>}
        </g>
      ))}

      {/* ── Bottom lesson ── */}
      <text x="600" y="452" textAnchor="middle" fill="#ebebe9" fontSize="14" fontWeight="700" letterSpacing="1.5">
        THE FIX ISN'T "BAN AI" — IT'S REWARDING VERIFICATION OVER VOLUME
      </text>
      {[
        { x: 158, label: "Working PoC required" },
        { x: 453, label: "Reputation-gated access" },
        { x: 747, label: "Fixed, no-haggle payouts" },
        { x: 1042, label: "AI-assisted, human-verified" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 112} y="478" width="224" height="34" rx="17" fill="#0c0c0b" stroke="#C4A6F5" strokeWidth="1.2" />
          <text x={s.x} y="500" textAnchor="middle" fill="#e8e7e5" fontSize="12.5" fontWeight="600">
            {s.label}
          </text>
        </g>
      ))}

      <text x="1148" y="540" textAnchor="end" fill="#837e71" fontSize="11.5">
        GitHub bug bounty restructuring effective July 27, 2026
      </text>
    </svg>
  </div>
);

export default BugBountyHeroDiagram;
