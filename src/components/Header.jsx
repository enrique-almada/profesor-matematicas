import { SUBJECT_LIST } from '../subjects'
import './Header.css'

const LEVELS = [
  { value: 'primaria', label: '🎒 Primaria' },
  { value: 'secundaria', label: '📚 Secundaria' },
  { value: 'preparatoria', label: '🎓 Preparatoria' },
]

export default function Header({ subjectId, setSubjectId, level, setLevel }) {
  const activeSubject = SUBJECT_LIST.find(s => s.id === subjectId)

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">{activeSubject?.icon ?? '🎓'}</span>
        <div>
          <h1 className="title">Tutor IA</h1>
          <p className="subtitle">Tu tutor personal con IA</p>
        </div>
      </div>

      <div className="picker">
        <span className="picker-label">Materia:</span>
        <div className="picker-buttons">
          {SUBJECT_LIST.map(s => (
            <button
              key={s.id}
              className={`picker-btn ${subjectId === s.id ? 'active' : ''}`}
              onClick={() => setSubjectId(s.id)}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="picker">
        <span className="picker-label">Nivel:</span>
        <div className="picker-buttons">
          {LEVELS.map(l => (
            <button
              key={l.value}
              className={`picker-btn ${level === l.value ? 'active' : ''}`}
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
