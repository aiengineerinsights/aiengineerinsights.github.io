// Hero diagram for the "Jev vs LLMs" post. Pure inline SVG so it prerenders to
// crawler-visible markup and doubles as the OG image (viewBox 1200x630). Split
// view: an LLM (System Two) turns a prompt into a token-by-token text stream —
// flexible reasoning and language, slower and costlier per decision. Jev
// (System One) turns an input into one typed decision plus a calibrated
// confidence in a single parallel forward pass — fast, cheap, typed, no text.
const JevVsLLMHeroDiagram = () => {
  const tokens = ["This", "looks", "like", "fraud", "because", "…"];
  const llmTraits = [
    { ok: true, t: "open-ended reasoning and language" },
    { ok: true, t: "explanations, novel and multi-step tasks" },
    { ok: false, t: "slower and costlier per decision" },
    { ok: false, t: "confidence is not natively calibrated" },
  ];
  const jevTraits = [
    { ok: true, t: "one typed decision + calibrated confidence" },
    { ok: true, t: "~70–500 ms, output tokens free (TypeSafe claims)" },
    { ok: false, t: "no text, no reasoning, no explanation" },
    { ok: false, t: "can still be wrong inside a valid type" },
  ];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Jev versus LLMs: two kinds of model, two kinds of job. Left side, an LLM (System Two): a prompt such as 'Is this transaction fraudulent? Explain.' is turned into free-form text generated one token at a time — 'This looks like fraud because…' — where each token depends on the last. Strengths: open-ended reasoning and language, explanations, novel multi-step tasks. Costs: slower and more expensive per decision, and confidence is not natively calibrated. Right side, Jev (System One): a transaction record plus a set of labels goes through one parallel forward pass and returns a single typed decision with a calibrated confidence, for example label 'fraud' with confidence 0.87. Strengths: typed output that is always the right shape, roughly 70 to 500 milliseconds latency and free output tokens according to TypeSafe. Costs: no text, no reasoning, no explanation, and it can still be wrong inside a valid type. Bottom band: they are not competitors — use an LLM when you need language or reasoning, use Jev when software needs a fast, typed decision it can act on, and most real systems use both."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="jevBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#0b1420" />
            <stop offset="100%" stopColor="#0c1a26" />
          </linearGradient>
          <marker id="jevArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b7488" />
          </marker>
          <marker id="jevArrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#34d399" />
          </marker>
        </defs>

        <rect width="1200" height="630" fill="url(#jevBg)" />
        <g fill="#38bdf8" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#e6f6ff" fontSize="19" fontWeight="800" letterSpacing="1">
          TWO KINDS OF MODEL, TWO KINDS OF JOB
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#8fb8cc" fontSize="12.5">
          an LLM generates text and reasons · Jev returns one typed, calibrated decision
        </text>

        {/* column headers + divider */}
        <text x="310" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="800">LLM · SYSTEM TWO</text>
        <text x="890" y="112" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="800">JEV · SYSTEM ONE</text>
        <line x1="600" y1="96" x2="600" y2="452" stroke="#1f3340" strokeWidth="1.4" strokeDasharray="4 6" />

        {/* ---------- LEFT: LLM ---------- */}
        <rect x="60" y="132" width="500" height="54" rx="12" fill="#0e1a24" stroke="#7c3aed" strokeWidth="1.6" />
        <rect x="60" y="132" width="6" height="54" rx="3" fill="#7c3aed" />
        <text x="84" y="155" fill="#c4b5fd" fontSize="11.5">prompt</text>
        <text x="84" y="175" fill="#eaf4fb" fontSize="14" fontWeight="700">"Is this transaction fraudulent? Explain."</text>

        <line x1="310" y1="186" x2="310" y2="222" stroke="#33506a" strokeWidth="1.6" markerEnd="url(#jevArrow)" />

        {/* token stream */}
        {tokens.map((tk, i) => {
          const x = 70 + i * 82;
          return (
            <g key={tk}>
              <rect x={x} y="230" width="72" height="44" rx="9" fill="#150e24" stroke="#a78bfa" strokeWidth="1.3" />
              <text x={x + 36} y="258" textAnchor="middle" fill="#e9dfff" fontSize="13.5" fontWeight="700">{tk}</text>
              {i < tokens.length - 1 && (
                <line x1={x + 72} y1="252" x2={x + 82} y2="252" stroke="#6d5aa0" strokeWidth="1.4" markerEnd="url(#jevArrow)" />
              )}
            </g>
          );
        })}
        <text x="310" y="298" textAnchor="middle" fill="#a99cc8" fontSize="11.5">
          one token at a time (autoregressive) · each step depends on the last
        </text>

        <rect x="60" y="316" width="500" height="44" rx="10" fill="#0d1520" stroke="#3b3060" strokeWidth="1.2" />
        <text x="310" y="343" textAnchor="middle" fill="#cbb8f7" fontSize="12.5" fontWeight="700">
          free-form text — flexible, but your software still has to parse it
        </text>

        {llmTraits.map((tr, i) => (
          <text key={tr.t} x="76" y={392 + i * 20} fill={tr.ok ? "#c4b5fd" : "#8a95a3"} fontSize="12.5">
            {tr.ok ? "✓" : "−"}  {tr.t}
          </text>
        ))}

        {/* ---------- RIGHT: JEV ---------- */}
        <rect x="640" y="132" width="500" height="54" rx="12" fill="#0e1a24" stroke="#059669" strokeWidth="1.6" />
        <rect x="640" y="132" width="6" height="54" rx="3" fill="#059669" />
        <text x="664" y="155" fill="#6ee7b7" fontSize="11.5">input</text>
        <text x="664" y="175" fill="#eaf4fb" fontSize="14" fontWeight="700">transaction record + labels [fraud, legit, review]</text>

        <line x1="890" y1="186" x2="890" y2="222" stroke="#34d399" strokeWidth="1.8" markerEnd="url(#jevArrowGreen)" />
        <text x="905" y="210" fill="#9fe8da" fontSize="11.5">one parallel forward pass</text>

        <rect x="690" y="230" width="400" height="44" rx="9" fill="#0b1a15" stroke="#34d399" strokeWidth="1.6" />
        <text x="890" y="258" textAnchor="middle" fill="#d1fae5" fontSize="15" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          {'{ label: "fraud", confidence: 0.87 }'}
        </text>
        <text x="890" y="298" textAnchor="middle" fill="#8fc9b8" fontSize="11.5">
          a Choice, a Score, or a calibrated probability · never text
        </text>

        <rect x="640" y="316" width="500" height="44" rx="10" fill="#0d1520" stroke="#1f5a48" strokeWidth="1.2" />
        <text x="890" y="343" textAnchor="middle" fill="#9fe8da" fontSize="12.5" fontWeight="700">
          typed output — always the right shape, so code can act on it directly
        </text>

        {jevTraits.map((tr, i) => (
          <text key={tr.t} x="656" y={392 + i * 20} fill={tr.ok ? "#6ee7b7" : "#8a95a3"} fontSize="12.5">
            {tr.ok ? "✓" : "−"}  {tr.t}
          </text>
        ))}

        {/* bottom band */}
        <rect x="48" y="480" width="1104" height="60" rx="14" fill="#0b1a15" stroke="#0f766e" strokeWidth="1.3" />
        <text x="600" y="506" textAnchor="middle" fill="#5eead4" fontSize="13.5" fontWeight="800">
          NOT COMPETITORS — MOST REAL SYSTEMS USE BOTH
        </text>
        <text x="600" y="526" textAnchor="middle" fill="#9fe8da" fontSize="12">
          LLM when you need language or reasoning · Jev when software needs a fast, typed decision it can act on
        </text>

        <text x="1152" y="570" textAnchor="end" fill="#4b6f7f" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default JevVsLLMHeroDiagram;
