import { SUBJECT_LIST } from '../subjects'
import './Sidebar.css'

const LEVELS = [
  { value: 'primaria', label: '🎒 Primaria' },
  { value: 'secundaria', label: '📚 Secundaria' },
  { value: 'preparatoria', label: '🎓 Preparatoria' },
]

export default function Sidebar({ subjectId, setSubjectId, level, setLevel }) {
  const activeSubject = SUBJECT_LIST.find(s => s.id === subjectId)

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="logo">{activeSubject?.icon ?? '🎓'}</span>
        <div>
          <h1 className="title">Tutor IA</h1>
          <p className="subtitle">Tu tutor personal con IA</p>
        </div>
      </div>

      <div className="nav-section">
        <span className="nav-label">Materia</span>
        <nav className="subject-nav">
          {SUBJECT_LIST.map(s => (
            <button
              key={s.id}
              className={`subject-btn ${subjectId === s.id ? 'active' : ''}`}
              onClick={() => setSubjectId(s.id)}
            >
              <span className="subject-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="nav-section">
        <span className="nav-label">Nivel</span>
        <div className="level-switch">
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

      <p className="sidebar-footer">Impulsado por Claude</p>
    </aside>
  )
}
