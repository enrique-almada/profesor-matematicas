import { useState } from 'react'
import Chat from './components/Chat'
import Exercises from './components/Exercises'
import Header from './components/Header'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [level, setLevel] = useState('secundaria')

  return (
    <div className="app">
      <Header level={level} setLevel={setLevel} />
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Pregúntale al Profesor
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
          <Chat level={level} />
        ) : (
          <Exercises level={level} />
        )}
      </main>
    </div>
  )
}
