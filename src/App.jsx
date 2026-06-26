import { useState } from 'react'
import Chat from './components/Chat'
import Exercises from './components/Exercises'
import Sidebar from './components/Sidebar'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [subjectId, setSubjectId] = useState('matematicas')
  const [level, setLevel] = useState('secundaria')

  return (
    <div className="app-shell">
      <Sidebar subjectId={subjectId} setSubjectId={setSubjectId} level={level} setLevel={setLevel} />
      <div className="app-main">
        <nav className="tabs">
          <button
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Pregúntale al Tutor
          </button>
          <button
            className={`tab ${activeTab === 'exercises' ? 'active' : ''}`}
            onClick={() => setActiveTab('exercises')}
          >
            ✏️ Practicar
          </button>
        </nav>
        <main className="main">
          {activeTab === 'chat' ? (
            <Chat subjectId={subjectId} level={level} />
          ) : (
            <Exercises key={`${subjectId}-${level}`} subjectId={subjectId} level={level} />
          )}
        </main>
      </div>
    </div>
  )
}
