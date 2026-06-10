import './MathDiagram.css'

// Renders structured math diagrams as SVG based on type
export default function MathDiagram({ type, params = {} }) {
  switch (type) {
    case 'right-triangle':
      return <RightTriangle {...params} />
    case 'circle':
      return <Circle {...params} />
    case 'coordinate-plane':
      return <CoordinatePlane {...params} />
    case 'bar-chart':
      return <BarChart {...params} />
    default:
      return null
  }
}

// ── Right Triangle (Pythagorean Theorem) ────────────────────────────────────
function RightTriangle({ a = 3, b = 4, c = 5, label = true }) {
  const scale = 50
  const pad = 40
  const W = b * scale + pad * 2
  const H = a * scale + pad * 2
  const x0 = pad, y0 = H - pad
  const x1 = pad, y1 = pad
  const x2 = pad + b * scale, y2 = H - pad
  const sq = 14 // right-angle square size

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {/* Triangle fill */}
        <polygon
          points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`}
          fill="#ede9fe" stroke="#4f46e5" strokeWidth="2.5"
        />
        {/* Right angle square */}
        <rect x={x0} y={y0 - sq} width={sq} height={sq}
          fill="none" stroke="#4f46e5" strokeWidth="1.5" />

        {/* Side labels */}
        {label && <>
          {/* a (vertical, left side) */}
          <text x={x0 - 18} y={(y0 + y1) / 2} textAnchor="middle"
            dominantBaseline="middle" fontSize="16" fontWeight="bold" fill="#4f46e5">
            a={a}
          </text>
          {/* b (horizontal, bottom) */}
          <text x={(x0 + x2) / 2} y={y0 + 20} textAnchor="middle"
            fontSize="16" fontWeight="bold" fill="#4f46e5">
            b={b}
          </text>
          {/* c (hypotenuse) */}
          <text
            x={(x1 + x2) / 2 + 18}
            y={(y1 + y2) / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="16" fontWeight="bold" fill="#7c3aed">
            c={c}
          </text>
          {/* Formula */}
          <text x={W / 2} y={16} textAnchor="middle"
            fontSize="13" fill="#64748b">
            a² + b² = c²  →  {a}² + {b}² = {c}²
          </text>
        </>}
      </svg>
    </div>
  )
}

// ── Circle ───────────────────────────────────────────────────────────────────
function Circle({ r = 5, label = true }) {
  const pad = 50
  const cx = 120, cy = 120
  const scale = Math.min(70 / r, 20)
  const sr = r * scale
  const W = sr * 2 + pad * 2
  const H = sr * 2 + pad * 2
  const cxs = W / 2, cys = H / 2

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <circle cx={cxs} cy={cys} r={sr} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" />
        {/* Radius line */}
        <line x1={cxs} y1={cys} x2={cxs + sr} y2={cys}
          stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />
        <circle cx={cxs} cy={cys} r="4" fill="#3b82f6" />
        {label && <>
          <text x={(cxs + cxs + sr) / 2} y={cys - 8} textAnchor="middle"
            fontSize="14" fontWeight="bold" fill="#1d4ed8">r={r}</text>
          <text x={cxs} y={H - 8} textAnchor="middle" fontSize="13" fill="#64748b">
            Área = πr² = π·{r}² ≈ {(Math.PI * r * r).toFixed(2)}
          </text>
          <text x={cxs} y={H - 24} textAnchor="middle" fontSize="13" fill="#64748b">
            Perímetro = 2πr = 2π·{r} ≈ {(2 * Math.PI * r).toFixed(2)}
          </text>
        </>}
      </svg>
    </div>
  )
}

// ── Coordinate Plane ─────────────────────────────────────────────────────────
function CoordinatePlane({ points = [], slope, intercept, xmin = -5, xmax = 5 }) {
  const W = 300, H = 280, pad = 40
  const toSvgX = x => pad + ((x - xmin) / (xmax - xmin)) * (W - pad * 2)
  const toSvgY = y => H - pad - ((y - xmin) / (xmax - xmin)) * (H - pad * 2)
  const ticks = []
  for (let i = xmin; i <= xmax; i++) ticks.push(i)

  // Build line points if slope/intercept given
  const linePoints = slope !== undefined
    ? [[xmin, slope * xmin + intercept], [xmax, slope * xmax + intercept]]
    : []

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {/* Grid */}
        {ticks.map(t => (
          <g key={t}>
            <line x1={toSvgX(t)} y1={pad} x2={toSvgX(t)} y2={H - pad}
              stroke="#e2e8f0" strokeWidth="1" />
            <line x1={pad} y1={toSvgY(t)} x2={W - pad} y2={toSvgY(t)}
              stroke="#e2e8f0" strokeWidth="1" />
          </g>
        ))}
        {/* Axes */}
        <line x1={pad} y1={toSvgY(0)} x2={W - pad} y2={toSvgY(0)}
          stroke="#64748b" strokeWidth="2" />
        <line x1={toSvgX(0)} y1={pad} x2={toSvgX(0)} y2={H - pad}
          stroke="#64748b" strokeWidth="2" />
        {/* Axis labels */}
        {ticks.filter(t => t !== 0).map(t => (
          <g key={t}>
            <text x={toSvgX(t)} y={toSvgY(0) + 16} textAnchor="middle"
              fontSize="11" fill="#94a3b8">{t}</text>
            <text x={toSvgX(0) - 10} y={toSvgY(t) + 4} textAnchor="end"
              fontSize="11" fill="#94a3b8">{t}</text>
          </g>
        ))}
        {/* Axis arrows */}
        <polygon points={`${W - pad},${toSvgY(0)} ${W - pad - 7},${toSvgY(0) - 4} ${W - pad - 7},${toSvgY(0) + 4}`} fill="#64748b" />
        <polygon points={`${toSvgX(0)},${pad} ${toSvgX(0) - 4},${pad + 7} ${toSvgX(0) + 4},${pad + 7}`} fill="#64748b" />
        <text x={W - pad + 4} y={toSvgY(0) + 4} fontSize="13" fontWeight="bold" fill="#64748b">x</text>
        <text x={toSvgX(0) + 6} y={pad + 4} fontSize="13" fontWeight="bold" fill="#64748b">y</text>

        {/* Line */}
        {linePoints.length === 2 && (
          <line
            x1={toSvgX(linePoints[0][0])} y1={toSvgY(linePoints[0][1])}
            x2={toSvgX(linePoints[1][0])} y2={toSvgY(linePoints[1][1])}
            stroke="#4f46e5" strokeWidth="2.5"
          />
        )}

        {/* Points */}
        {points.map(([px, py], i) => (
          <g key={i}>
            <circle cx={toSvgX(px)} cy={toSvgY(py)} r="5"
              fill="#4f46e5" stroke="white" strokeWidth="1.5" />
            <text x={toSvgX(px) + 8} y={toSvgY(py) - 6}
              fontSize="11" fill="#4f46e5" fontWeight="bold">
              ({px},{py})
            </text>
          </g>
        ))}

        {slope !== undefined && (
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="12" fill="#4f46e5">
            y = {slope}x {intercept >= 0 ? '+' : ''}{intercept}
          </text>
        )}
      </svg>
    </div>
  )
}

// ── Bar Chart ────────────────────────────────────────────────────────────────
function BarChart({ data = [], title = '' }) {
  const W = 320, H = 240, pad = 40
  const maxVal = Math.max(...data.map(d => d.value), 1)
  const barW = (W - pad * 2) / data.length - 8

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {title && <text x={W / 2} y={16} textAnchor="middle" fontSize="13"
          fontWeight="bold" fill="#1e293b">{title}</text>}
        {/* Y axis */}
        <line x1={pad} y1={20} x2={pad} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        <line x1={pad} y1={H - pad} x2={W - 10} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />

        {data.map((d, i) => {
          const barH = ((d.value / maxVal) * (H - pad - 30))
          const x = pad + i * (barW + 8) + 4
          const y = H - pad - barH
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH}
                fill="#818cf8" rx="3" />
              <text x={x + barW / 2} y={y - 5} textAnchor="middle"
                fontSize="11" fontWeight="bold" fill="#4f46e5">{d.value}</text>
              <text x={x + barW / 2} y={H - pad + 14} textAnchor="middle"
                fontSize="11" fill="#64748b">{d.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
