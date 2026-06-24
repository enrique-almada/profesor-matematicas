const VECTOR_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
const DIRECTION_ANGLES = { up: 90, down: 270, left: 180, right: 0 }

// ── Vector diagram ───────────────────────────────────────────────────────────
export function VectorDiagram({ vectors = [] }) {
  const W = 300, H = 280, pad = 40
  const maxMag = Math.max(...vectors.map(v => Math.max(Math.abs(v.x), Math.abs(v.y))), 1)
  const bound = Math.ceil(maxMag * 1.2)
  const toSvgX = x => pad + ((x + bound) / (bound * 2)) * (W - pad * 2)
  const toSvgY = y => H - pad - ((y + bound) / (bound * 2)) * (H - pad * 2)
  const originX = toSvgX(0), originY = toSvgY(0)

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <defs>
          {vectors.map((v, i) => (
            <marker key={i} id={`vec-arrow-${i}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={v.color || VECTOR_COLORS[i % VECTOR_COLORS.length]} />
            </marker>
          ))}
        </defs>

        {/* Axes */}
        <line x1={pad} y1={originY} x2={W - pad} y2={originY} stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1={originX} y1={pad} x2={originX} y2={H - pad} stroke="#cbd5e1" strokeWidth="1.5" />

        {vectors.map((v, i) => {
          const color = v.color || VECTOR_COLORS[i % VECTOR_COLORS.length]
          const x2 = toSvgX(v.x), y2 = toSvgY(v.y)
          return (
            <g key={i}>
              <line x1={originX} y1={originY} x2={x2} y2={y2}
                stroke={color} strokeWidth="2.5" markerEnd={`url(#vec-arrow-${i})`} />
              <text
                x={x2 + (v.x >= 0 ? 8 : -8)} y={y2 - (v.y >= 0 ? 6 : -16)}
                textAnchor={v.x >= 0 ? 'start' : 'end'}
                fontSize="12" fontWeight="bold" fill={color}>
                {v.label || `V${i + 1}`}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Free-body diagram ────────────────────────────────────────────────────────
export function FreeBodyDiagram({ forces = [] }) {
  const W = 280, H = 280
  const cx = W / 2, cy = H / 2
  const boxSize = 50
  const maxLen = 95
  const maxMag = Math.max(...forces.map(f => f.magnitude ?? 1), 1)

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <defs>
          {forces.map((_, i) => (
            <marker key={i} id={`fb-arrow-${i}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" />
            </marker>
          ))}
        </defs>

        {/* Object */}
        <rect x={cx - boxSize / 2} y={cy - boxSize / 2} width={boxSize} height={boxSize}
          fill="#fef3c7" stroke="#b45309" strokeWidth="2" rx="4" />

        {forces.map((f, i) => {
          const angleDeg = typeof f.direction === 'number' ? f.direction : (DIRECTION_ANGLES[f.direction] ?? 90)
          const rad = (angleDeg * Math.PI) / 180
          const len = ((f.magnitude ?? 1) / maxMag) * maxLen
          const x2 = cx + Math.cos(rad) * len
          const y2 = cy - Math.sin(rad) * len
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={x2} y2={y2}
                stroke="#dc2626" strokeWidth="2.5" markerEnd={`url(#fb-arrow-${i})`} />
              <text
                x={x2 + (Math.cos(rad) >= 0 ? 6 : -6)}
                y={y2 - (Math.sin(rad) >= 0 ? 8 : -16)}
                textAnchor={Math.cos(rad) >= 0 ? 'start' : 'end'}
                fontSize="12" fontWeight="bold" fill="#b91c1c">
                {f.label}{f.magnitude !== undefined ? ` (${f.magnitude}N)` : ''}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Motion graph (position/velocity vs time) ─────────────────────────────────
export function MotionGraph({ kind = 'position', data = [] }) {
  const W = 300, H = 240, pad = 40
  const ts = data.map(d => d.t)
  const vs = data.map(d => d.v)
  const tMax = Math.max(...ts, 1)
  const vMax = Math.max(...vs, 0)
  const vMin = Math.min(...vs, 0)
  const range = vMax - vMin || 1
  const toSvgX = t => pad + (t / tMax) * (W - pad * 2)
  const toSvgY = v => H - pad - ((v - vMin) / range) * (H - pad * 2)
  const yLabel = kind === 'velocity' ? 'v (m/s)' : 'posición (m)'
  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(d.t)} ${toSvgY(d.v)}`).join(' ')

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <line x1={pad} y1={pad - 10} x2={pad} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        <line x1={pad} y1={H - pad} x2={W - 10} y2={H - pad} stroke="#64748b" strokeWidth="1.5" />
        <text x={4} y={pad - 16} fontSize="11" fill="#64748b">{yLabel}</text>
        <text x={W - 38} y={H - pad + 24} fontSize="11" fill="#64748b">t (s)</text>

        {data.length > 1 && <path d={pathD} fill="none" stroke="#4f46e5" strokeWidth="2.5" />}
        {data.map((d, i) => (
          <circle key={i} cx={toSvgX(d.t)} cy={toSvgY(d.v)} r="4" fill="#4f46e5" stroke="white" strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  )
}
