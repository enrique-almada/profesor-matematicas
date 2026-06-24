const PIE_COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa']

// ── Histogram ────────────────────────────────────────────────────────────────
export function Histogram({ bins = [] }) {
  const W = 320, H = 240, pad = 40
  const maxCount = Math.max(...bins.map(b => b.count), 1)
  const barW = (W - pad * 2) / bins.length

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <line x1={pad} y1={20} x2={pad} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        <line x1={pad} y1={H - pad} x2={W - 10} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />

        {bins.map((b, i) => {
          const barH = (b.count / maxCount) * (H - pad - 30)
          const x = pad + i * barW
          const y = H - pad - barH
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW - 2} height={barH} fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">{b.count}</text>
              <text x={x + barW / 2} y={H - pad + 14} textAnchor="middle" fontSize="10" fill="#64748b">{b.range}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Normal distribution curve ─────────────────────────────────────────────────
export function NormalCurve({ mean = 0, stdDev = 1, highlight }) {
  const W = 320, H = 220, pad = 40
  const xMin = mean - 4 * stdDev, xMax = mean + 4 * stdDev
  const toSvgX = x => pad + ((x - xMin) / (xMax - xMin)) * (W - pad * 2)
  const density = x => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2))
  const peak = density(mean)
  const toSvgY = y => H - pad - (y / peak) * (H - pad - 20)

  const N = 80
  const points = Array.from({ length: N + 1 }, (_, i) => {
    const x = xMin + (i / N) * (xMax - xMin)
    return [toSvgX(x), toSvgY(density(x))]
  })
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

  let highlightPath = null
  if (Array.isArray(highlight) && highlight.length === 2) {
    const [a, b] = highlight
    const hPoints = points.filter((_, i) => {
      const x = xMin + (i / N) * (xMax - xMin)
      return x >= a && x <= b
    })
    if (hPoints.length > 1) {
      const base = H - pad
      highlightPath = `M ${hPoints[0][0]} ${base} ` +
        hPoints.map(p => `L ${p[0]} ${p[1]}`).join(' ') +
        ` L ${hPoints[hPoints.length - 1][0]} ${base} Z`
    }
  }

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <line x1={pad} y1={H - pad} x2={W - 10} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        {highlightPath && <path d={highlightPath} fill="#c7d2fe" opacity="0.7" />}
        <path d={pathD} fill="none" stroke="#4f46e5" strokeWidth="2.5" />
        <text x={toSvgX(mean)} y={H - pad + 16} textAnchor="middle" fontSize="11" fill="#64748b">μ={mean}</text>
        <text x={W / 2} y={16} textAnchor="middle" fontSize="12" fill="#64748b">σ={stdDev}</text>
      </svg>
    </div>
  )
}

// ── Scatter plot ───────────────────────────────────────────────────────────────
export function ScatterPlot({ points = [], xLabel = '', yLabel = '' }) {
  const W = 300, H = 260, pad = 44
  const xs = points.map(p => p[0]), ys = points.map(p => p[1])
  const xMin = Math.min(...xs, 0), xMax = Math.max(...xs, 1)
  const yMin = Math.min(...ys, 0), yMax = Math.max(...ys, 1)
  const toSvgX = x => pad + ((x - xMin) / (xMax - xMin || 1)) * (W - pad * 2)
  const toSvgY = y => H - pad - ((y - yMin) / (yMax - yMin || 1)) * (H - pad * 2)

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <line x1={pad} y1={20} x2={pad} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        <line x1={pad} y1={H - pad} x2={W - 10} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={toSvgX(x)} cy={toSvgY(y)} r="5" fill="#4f46e5" stroke="white" strokeWidth="1.5" />
        ))}
        {xLabel && <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="#64748b">{xLabel}</text>}
        {yLabel && (
          <text x={14} y={H / 2} textAnchor="middle" fontSize="11" fill="#64748b"
            transform={`rotate(-90 14 ${H / 2})`}>{yLabel}</text>
        )}
      </svg>
    </div>
  )
}

// ── Pie chart ────────────────────────────────────────────────────────────────
export function PieChart({ data = [], title = '' }) {
  const W = 260, H = 240
  const cx = W / 2, cy = H / 2 + 10, r = 80
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1

  const sliceAngles = data.map(d => (d.value / total) * 2 * Math.PI)
  const startAngles = sliceAngles.map((_, i) =>
    -Math.PI / 2 + sliceAngles.slice(0, i).reduce((a, b) => a + b, 0)
  )

  const slices = data.map((d, i) => {
    const start = startAngles[i]
    const sliceAngle = sliceAngles[i]
    const end = start + sliceAngle
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const largeArc = sliceAngle > Math.PI ? 1 : 0
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    const midAngle = start + sliceAngle / 2
    const labelX = cx + (r + 18) * Math.cos(midAngle)
    const labelY = cy + (r + 18) * Math.sin(midAngle)
    return { path, color: PIE_COLORS[i % PIE_COLORS.length], label: d.label, value: d.value, labelX, labelY }
  })

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {title && <text x={W / 2} y={16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">{title}</text>}
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="1.5" />
        ))}
        {slices.map((s, i) => (
          <text key={i} x={s.labelX} y={s.labelY} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
            {s.label} ({s.value})
          </text>
        ))}
      </svg>
    </div>
  )
}
