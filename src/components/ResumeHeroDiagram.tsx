// Hero diagram for "AI Engineer Resume". Pure inline SVG so it prerenders to
// crawler-visible markup and doubles as the OG image (viewBox 1200x630).
// Left: a one-page resume drawn as a sheet with its six sections. Right: one
// annotation per section saying what a reviewer looks for there.
const ResumeHeroDiagram = () => {
  // y = top of the section on the sheet; h = its height. Notes sit on an even grid on the right.
  const sections = [
    { n: 1, y: 112, h: 44, label: "HEADER", note: "Name, city, email, LinkedIn, GitHub", sub: "One line. No photo, no full address.", c: "#94a3b8" },
    { n: 2, y: 164, h: 46, label: "SUMMARY", note: "Two lines: title, years, what you ship", sub: "Use the job title from the posting.", c: "#38bdf8" },
    { n: 3, y: 218, h: 62, label: "SKILLS", note: "Grouped, and only what you can interview in", sub: "Languages, retrieval, agents, evaluation, infrastructure.", c: "#a78bfa" },
    { n: 4, y: 288, h: 142, label: "EXPERIENCE", note: "What you built + measured result + how", sub: "Most of the page. Newest first. A number in most bullets.", c: "#fbbf24" },
    { n: 5, y: 438, h: 66, label: "PROJECTS", note: "One or two, with a link and an evaluation", sub: "Matters most when the job history has little AI in it.", c: "#34d399" },
    { n: 6, y: 512, h: 46, label: "EDUCATION", note: "Degree, certifications, papers, open source", sub: "Short. Goes first only for new graduates.", c: "#fb7185" },
  ];
  const sheetX = 70;
  const sheetW = 430;
  const noteX = 600;
  const noteY = (i: number) => 128 + i * 76;
  // deterministic "text line" widths so the sheet looks written, not random per render
  const lineW = [0.92, 0.78, 0.86, 0.64, 0.9, 0.72, 0.84, 0.6];
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0a0f14]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        aria-label="An annotated one-page AI engineer resume with six sections. Header: name, city, email, LinkedIn and GitHub on one line, no photo or full address. Summary: two lines with title, years and what you ship, using the job title from the posting. Skills: grouped, and only what you can interview in, covering languages, retrieval, agents, evaluation and infrastructure. Experience: what you built plus the measured result plus how; it takes most of the page, newest first, with a number in most bullets. Projects: one or two, each with a link and an evaluation; they matter most when the job history has little AI in it. Education: degree, certifications, papers and open source, kept short, first only for new graduates."
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id="rsBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0f14" />
            <stop offset="60%" stopColor="#120f0b" />
            <stop offset="100%" stopColor="#1a1208" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#rsBg)" />
        <g fill="#fbbf24" opacity="0.05">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 49} cy={24 + r * 46} r="1.6" />
            ))
          )}
        </g>

        <text x="600" y="44" textAnchor="middle" fill="#fff4e0" fontSize="19" fontWeight="800" letterSpacing="1">
          THE AI ENGINEER RESUME, SECTION BY SECTION
        </text>
        <text x="600" y="68" textAnchor="middle" fill="#fcd34d" fontSize="12.5">
          one page if you can, two at most: what goes where and what a reviewer looks for
        </text>

        {/* the sheet */}
        <rect x={sheetX} y="94" width={sheetW} height="482" rx="8" fill="#f8fafc" />
        {sections.map((s, i) => {
          const rows = Math.max(1, Math.floor((s.h - 22) / 12));
          const mid = s.y + s.h / 2;
          const ny = noteY(i);
          return (
            <g key={s.label}>
              {/* section block on the sheet */}
              <rect x={sheetX + 14} y={s.y} width={sheetW - 28} height={s.h} rx="5" fill={s.c} opacity="0.13" />
              <rect x={sheetX + 14} y={s.y} width="4" height={s.h} rx="2" fill={s.c} />
              <text x={sheetX + 28} y={s.y + 15} fill="#0f172a" fontSize="10.5" fontWeight="800" letterSpacing="1">
                {s.label}
              </text>
              {Array.from({ length: rows }).map((_, r) => (
                <rect
                  key={r}
                  x={sheetX + 28}
                  y={s.y + 23 + r * 12}
                  width={(sheetW - 70) * lineW[(i * 3 + r) % lineW.length]}
                  height="4.5"
                  rx="2"
                  fill="#64748b"
                  opacity={s.label === "EXPERIENCE" && r % 3 === 0 ? 0.85 : 0.4}
                />
              ))}
              {/* numbered marker and connector */}
              <circle cx={sheetX + sheetW - 2} cy={mid} r="11" fill={s.c} />
              <text x={sheetX + sheetW - 2} y={mid + 4} textAnchor="middle" fill="#0a0f14" fontSize="11" fontWeight="800">
                {s.n}
              </text>
              <path
                d={`M${sheetX + sheetW + 10},${mid} C${sheetX + sheetW + 55},${mid} ${noteX - 55},${ny} ${noteX - 12},${ny}`}
                fill="none"
                stroke={s.c}
                strokeWidth="1.4"
                opacity="0.7"
              />
              {/* annotation */}
              <rect x={noteX - 12} y={ny - 26} width="560" height="58" rx="8" fill="#0e1a24" stroke={s.c} strokeWidth="1.3" opacity="0.95" />
              <text x={noteX + 6} y={ny - 5} fill={s.c} fontSize="10.5" fontWeight="800" letterSpacing="1">
                {s.n}. {s.label}
              </text>
              <text x={noteX + 128} y={ny - 5} fill="#eaf4fb" fontSize="13.5" fontWeight="700">
                {s.note}
              </text>
              <text x={noteX + 128} y={ny + 16} fill="#8fb8cc" fontSize="11.5">
                {s.sub}
              </text>
            </g>
          );
        })}

        <text x="600" y="606" textAnchor="middle" fill="#6b8699" fontSize="11">
          Single column, standard headings, real text. Use only numbers you measured and can explain in an interview.
        </text>
      </svg>
    </div>
  );
};

export default ResumeHeroDiagram;
