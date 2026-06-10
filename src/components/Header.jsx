import './Header.css'

const LEVELS = [
  { value: 'primaria', label: '🎒 Primaria' },
  { value: 'secundaria', label: '📚 Secundaria' },
  { value: 'preparatoria', label: '🎓 Preparatoria' },
]

export default function Header({ level, setLevel }) {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">📐</span>
        <div>
          <h1 className="title">Profesor de Matemáticas</h1>
          <p className="subtitle">Tu tutor personal con IA</p>
        </div>
      </div>
      <div className="level-picker">
        <span className="level-label">Nivel:</span>
        <div className="level-buttons">
          {LEVELS.map(l => (
            <button
              key={l.value}
              className={`level-btn ${level === l.value ? 'active' : ''}`}
              onClick={() => setLevel(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
