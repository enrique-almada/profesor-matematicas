// ── Simple syntax tree (subject / predicate) ─────────────────────────────────
export function SyntaxTree({ sentence = '', subject = '', predicate = '' }) {
  const W = 320, H = 160
  const rootX = W / 2, rootY = 30
  const subjX = W / 4, predX = (W / 4) * 3
  const leafY = 100

  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        <text x={rootX} y={rootY - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">
          {sentence}
        </text>
        <circle cx={rootX} cy={rootY} r="4" fill="#4f46e5" />

        <line x1={rootX} y1={rootY} x2={subjX} y2={leafY - 20} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={rootX} y1={rootY} x2={predX} y2={leafY - 20} stroke="#94a3b8" strokeWidth="1.5" />

        <rect x={subjX - 55} y={leafY - 20} width="110" height="34" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x={subjX} y={leafY - 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">Sujeto</text>
        <text x={subjX} y={leafY + 28} textAnchor="middle" fontSize="12" fill="#334155">{subject}</text>

        <rect x={predX - 55} y={leafY - 20} width="110" height="34" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x={predX} y={leafY - 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">Predicado</text>
        <text x={predX} y={leafY + 28} textAnchor="middle" fontSize="12" fill="#334155">{predicate}</text>
      </svg>
    </div>
  )
}
