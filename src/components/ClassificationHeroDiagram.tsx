// Hero diagram for the "LLM vs traditional ML for classification" post. Pure
// inline SVG so it prerenders to crawler-visible markup and doubles as the OG
// image (viewBox 1200x630). Shows the three ways to classify with AI in 2026 —
// a traditional ML classifier, an LLM used as a classifier, and a decision
// model like Jev — and the thing that actually decides between them: whether
// the confidence you get back is a probability you can trust (calibration).
const ClassificationHeroDiagram = () => {
  const columns = [
    {
      x: 40,
      accent: "#7CC4F2",
      accentText: "#7CC4F2",
      fill: "#10100f",
      title: "Traditional ML classifier",
      sub: "logistic regression · XGBoost · small fine-tuned model",
      output: "P(fraud) = 0.91",
      outputNote: "a real probability",
      bullets: [
        "calibrated with Platt / isotonic",
        "needs labeled training data",
        "cheap · fast · deterministic",
        "interpretable and auditable",
      ],
    },
    {
      x: 425,
      accent: "#815e31",
      accentText: "#FFB454",
      fill: "#0c0c0b",
      title: "LLM as classifier",
      sub: "prompt: “classify and give a confidence 0–100”",
      output: "\"confidence: 0.9\"",
      outputNote: "generated text, not a probability",
      bullets: [
        "uncalibrated — RLHF overconfident",
        "no training data needed",
        "slow · costly · non-deterministic",
        "prompt-sensitive, drifts by version",
      ],
    },
    {
      x: 810,
      accent: "#225a41",
      accentText: "#6FD6A8",
      fill: "#0c0c0b",
      title: "Jev (decision model)",
      sub: "typed decision · one non-autoregressive pass",
      output: "{ label: fraud, p: 0.91 }",
      outputNote: "RLCD-calibrated confidence",
      bullets: [
        "trained so confidence tracks accuracy",
        "zero-shot — labels defined at runtime",
        "cheap · fast · no text generated",
        "below a trained classifier in-distribution",
      ],
    },
  ];
  const cardY = 132;
  const cardH = 318;
  const cardW = 350;
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="Three ways to classify with AI, compared on calibration. Left column, a traditional ML classifier such as logistic regression, XGBoost, or a small fine-tuned model: it outputs a real class probability like P(fraud) = 0.91, can be calibrated with Platt scaling or isotonic regression, needs labeled training data, and is cheap, fast, deterministic, interpretable, and auditable. Middle column, shown with a warning tint, an LLM used as a classifier by prompting it to classify and give a confidence from 0 to 100: its output 'confidence: 0.9' is generated text, not a probability — it is uncalibrated and RLHF-overconfident, needs no training data, but is slow, costly, non-deterministic, prompt-sensitive, and drifts across model versions. Right column, Jev, a decision model from TypeSafe AI: it returns a typed decision plus a confidence in one non-autoregressive pass, trained with RLCD so confidence tracks accuracy, works zero-shot with labels defined at runtime, is cheap and fast and generates no text, but still sits below a trained in-distribution classifier on raw accuracy. Bottom banner: the real question is a probability you can actually trust."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="clsBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="60%" stopColor="#0e0e0d" />
            <stop offset="100%" stopColor="#10100f" />
          </linearGradient>
        </defs>

        <rect width="1200" height="630" fill="url(#clsBg)" />
        <g fill="#7CC4F2" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="46" textAnchor="middle" fill="#f3f3f2" fontSize="19" fontWeight="800" letterSpacing="1">
          THREE WAYS TO CLASSIFY WITH AI
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#b3b0a8" fontSize="12.5">
          same input, same label — but only some of them hand back a probability you can threshold on
        </text>

        {/* shared input pill */}
        <rect x="440" y="90" width="320" height="26" rx="13" fill="#10100f" stroke="#545149" strokeWidth="1.2" />
        <text x="600" y="107" textAnchor="middle" fill="#b7b4ac" fontSize="11.5" fontWeight="700">
          INPUT: “is this transaction fraud?”
        </text>

        {columns.map((col) => (
          <g key={col.title}>
            <rect x={col.x} y={cardY} width={cardW} height={cardH} rx="14" fill={col.fill} stroke={col.accent} strokeWidth="1.6" />
            <rect x={col.x} y={cardY} width={cardW} height="6" rx="3" fill={col.accent} />
            <text x={col.x + 20} y={cardY + 36} fill="#f3f3f2" fontSize="16" fontWeight="800">{col.title}</text>
            <text x={col.x + 20} y={cardY + 56} fill={col.accentText} fontSize="11">{col.sub}</text>

            {/* output box */}
            <rect x={col.x + 20} y={cardY + 74} width={cardW - 40} height="58" rx="10" fill="#0c0c0b" stroke={col.accent} strokeWidth="1.2" strokeDasharray={col.title === "LLM as classifier" ? "5 4" : undefined} />
            <text x={col.x + 34} y={cardY + 98} fill="#f3f3f2" fontSize="14" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
              {col.output}
            </text>
            <text x={col.x + 34} y={cardY + 120} fill={col.accentText} fontSize="11.5" fontWeight="700">
              {col.title === "LLM as classifier" ? "⚠ " : "→ "}{col.outputNote}
            </text>

            {col.bullets.map((b, i) => (
              <g key={b}>
                <circle cx={col.x + 30} cy={cardY + 160 + i * 34} r="3.5" fill={col.accent} />
                <text x={col.x + 44} y={cardY + 164 + i * 34} fill="#d9d8d4" fontSize="12.5">{b}</text>
              </g>
            ))}
          </g>
        ))}

        {/* column verdict labels */}
        <text x="215" y="478" textAnchor="middle" fill="#7CC4F2" fontSize="12" fontWeight="800">THE TRAINED BASELINE</text>
        <text x="600" y="478" textAnchor="middle" fill="#FFB454" fontSize="12" fontWeight="800">THE COMMON MISTAKE</text>
        <text x="985" y="478" textAnchor="middle" fill="#6FD6A8" fontSize="12" fontWeight="800">THE ZERO-SHOT CALIBRATED MIDDLE</text>

        {/* bottom spine */}
        <rect x="48" y="500" width="1104" height="60" rx="14" fill="#0c0c0b" stroke="#1d4d38" strokeWidth="1.3" />
        <text x="600" y="526" textAnchor="middle" fill="#6FD6A8" fontSize="13.5" fontWeight="800">
          THE REAL QUESTION: A PROBABILITY YOU CAN ACTUALLY TRUST
        </text>
        <text x="600" y="546" textAnchor="middle" fill="#6FD6A8" fontSize="12">
          calibrated = among cases called ~90% likely, about 90% really are · measure it with ECE and a reliability diagram
        </text>

        <text x="1152" y="590" textAnchor="end" fill="#6c695e" fontSize="11">aiengineerinsights.com</text>
      </svg>
    </div>
  );
};

export default ClassificationHeroDiagram;
