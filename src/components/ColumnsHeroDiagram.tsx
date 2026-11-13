// Reusable 1200x630 hero diagram: a title, 2-4 coloured columns of bullet
// lines, and a footer bar. Pure inline SVG so it prerenders to crawler-visible
// markup and doubles as the post's OG image (rasterised to public/og-<slug>.png).
// Used by comparison/pricing/alternatives posts that share this layout.
export type HeroColumn = {
  name: string;
  tag: string;
  color: string;
  lines: string[];
  best: string;
};

type Props = {
  title: string;
  subtitle: string;
  columns: HeroColumn[];
  footer: string;
  ariaLabel: string;
  source: string;
  gradientId: string;
};

const ColumnsHeroDiagram = ({ title, subtitle, columns, footer, ariaLabel, source, gradientId }: Props) => {
  const n = columns.length;
  const gap = 20;
  const width = (1120 - gap * (n - 1)) / n;
  const nameSize = n >= 4 ? 18 : 22;
  const lineSize = n >= 4 ? 13.5 : 15;
  return (
    <div className="rounded-sm border border-border overflow-hidden mb-8 sm:mb-12 bg-[#0c0c0b]">
      <svg
        viewBox="0 0 1200 630"
        role="img"
        fontFamily="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        aria-label={ariaLabel}
        className="w-full h-auto block"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="100%" stopColor="#111110" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill={`url(#${gradientId})`} />

        <text x="600" y="52" textAnchor="middle" fill="#f7f7f6" fontSize="25" fontWeight="800" letterSpacing="1">
          {title}
        </text>
        <text x="600" y="80" textAnchor="middle" fill="#b9b6ae" fontSize="14">
          {subtitle}
        </text>

        {columns.map((c, idx) => {
          const x = 40 + idx * (width + gap);
          const cx = x + width / 2;
          return (
            <g key={c.name}>
              <rect x={x} y="116" width={width} height="380" rx="14" fill="#121211" stroke={c.color} strokeWidth="1.8" />
              <rect x={x} y="116" width={width} height="7" rx="3" fill={c.color} />
              <text x={cx} y="166" textAnchor="middle" fill={c.color} fontSize={nameSize} fontWeight="800" letterSpacing="0.8">{c.name}</text>
              <text x={cx} y="194" textAnchor="middle" fill="#ebeae7" fontSize="14" fontStyle="italic">{c.tag}</text>
              <line x1={x + 24} y1="216" x2={x + width - 24} y2="216" stroke="#373530" strokeWidth="1" />
              {c.lines.map((l, i) => (
                <g key={l}>
                  <circle cx={x + 30} cy={252 + i * 44} r="4" fill={c.color} />
                  <text x={x + 44} y={257 + i * 44} fill="#e4e3e0" fontSize={lineSize}>{l}</text>
                </g>
              ))}
              <rect x={x + 18} y="432" width={width - 36} height="44" rx="10" fill="#0d0d0c" stroke="#373530" />
              <text x={cx} y="460" textAnchor="middle" fill="#fafafa" fontSize={n >= 4 ? 12.5 : 14} fontWeight="700">{c.best}</text>
            </g>
          );
        })}

        <rect x="160" y="522" width="880" height="50" rx="12" fill="#0f0f0e" stroke="#FFB454" strokeWidth="1.4" />
        <text x="600" y="553" textAnchor="middle" fill="#FFB454" fontSize="15.5" fontWeight="700">
          {footer}
        </text>

        <text x="600" y="608" textAnchor="middle" fill="#807c6f" fontSize="12">
          {source}
        </text>
      </svg>
    </div>
  );
};

export default ColumnsHeroDiagram;
