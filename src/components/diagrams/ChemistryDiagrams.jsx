const ELEMENT_COLORS = {
  H: '#f8fafc', C: '#475569', O: '#ef4444', N: '#3b82f6',
  S: '#eab308', P: '#f97316', Cl: '#22c55e', Na: '#a78bfa', default: '#94a3b8',
}

const CATEGORY_COLORS = {
  metal: '#fde68a',
  nonmetal: '#bfdbfe',
  metalloid: '#bbf7d0',
  'noble-gas': '#e9d5ff',
  'alkali-metal': '#fecaca',
  halogen: '#fed7aa',
  default: '#e2e8f0',
}

// ── Molecule (2D ball-and-stick) ─────────────────────────────────────────────
export function MoleculeDiagram({ atoms = [], bonds = [] }) {
  const W = 260, H = 220, scale = 45
  const xs = atoms.map(a => a.x), ys = atoms.map(a => a.y)
  const cx = (Math.max(...xs, 0) + Math.min(...xs, 0)) / 2
  const cy = (Math.max(...ys, 0) + Math.min(...ys, 0)) / 2
  const toSvgX = x => W / 2 + (x - cx) * scale
  const toSvgY = y => H / 2 - (y - cy) * scale

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {bonds.map(([i, j], idx) => {
          const a = atoms[i], b = atoms[j]
          if (!a || !b) return null
          return (
            <line key={idx} x1={toSvgX(a.x)} y1={toSvgY(a.y)} x2={toSvgX(b.x)} y2={toSvgY(b.y)}
              stroke="#94a3b8" strokeWidth="4" />
          )
        })}
        {atoms.map((a, i) => (
          <g key={i}>
            <circle cx={toSvgX(a.x)} cy={toSvgY(a.y)} r={a.element === 'H' ? 14 : 20}
              fill={ELEMENT_COLORS[a.element] || ELEMENT_COLORS.default}
              stroke="#1e293b" strokeWidth="1.5" />
            <text x={toSvgX(a.x)} y={toSvgY(a.y)} textAnchor="middle" dominantBaseline="middle"
              fontSize="13" fontWeight="bold" fill={a.element === 'C' ? '#fff' : '#1e293b'}>
              {a.element}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ── Bohr atomic model ─────────────────────────────────────────────────────────
export function BohrModel({ element = '', shells = [] }) {
  const W = 260, H = 260
  const cx = W / 2, cy = H / 2
  const shellGap = 28
  const baseRadius = 30

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <circle cx={cx} cy={cy} r="18" fill="#4f46e5" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
          fontSize="13" fontWeight="bold" fill="white">{element}</text>

        {shells.map((count, shellIndex) => {
          const r = baseRadius + shellIndex * shellGap
          return (
            <g key={shellIndex}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
              {Array.from({ length: count }).map((_, e) => {
                const angle = (2 * Math.PI * e) / count - Math.PI / 2
                const ex = cx + Math.cos(angle) * r
                const ey = cy + Math.sin(angle) * r
                return <circle key={e} cx={ex} cy={ey} r="4.5" fill="#3b82f6" stroke="white" strokeWidth="1" />
              })}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Periodic table element card ──────────────────────────────────────────────
export function PeriodicElementCard({ symbol = '', name = '', atomicNumber, atomicMass, category }) {
  const W = 160, H = 180
  const bg = CATEGORY_COLORS[category] || CATEGORY_COLORS.default

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <rect x="4" y="4" width={W - 8} height={H - 8} rx="10" fill={bg} stroke="#475569" strokeWidth="2" />
        <text x="16" y="28" fontSize="14" fontWeight="bold" fill="#334155">{atomicNumber}</text>
        <text x={W / 2} y="92" textAnchor="middle" fontSize="42" fontWeight="bold" fill="#1e293b">{symbol}</text>
        <text x={W / 2} y="130" textAnchor="middle" fontSize="14" fontWeight="600" fill="#334155">{name}</text>
        <text x={W / 2} y="152" textAnchor="middle" fontSize="12" fill="#64748b">{atomicMass}</text>
      </svg>
    </div>
  )
}
