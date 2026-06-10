import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../services/claude'
import MessageRenderer from './MessageRenderer'
import { useSpeech } from '../hooks/useSpeech'
import './Chat.css'

const SUGGESTED = {
  primaria: [
    '¿Cómo se hacen las fracciones?',
    'Explícame la multiplicación',
    '¿Qué es un número par?',
    'Ayúdame con las tablas del 7',
  ],
  secundaria: [
    '¿Cómo resuelvo una ecuación de primer grado?',
    'Explícame el Teorema de Pitágoras',
    '¿Qué es una función lineal?',
    'Ayúdame con porcentajes',
  ],
  preparatoria: [
    '¿Cómo se calcula una derivada?',
    'Explícame los logaritmos',
    '¿Qué es una integral?',
    'Ayúdame con trigonometría',
  ],
}

export default function Chat({ level }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `¡Hola! Soy tu Profesor de Matemáticas 🎓\n\nEstoy aquí para ayudarte con cualquier duda de matemáticas de nivel **${level}**. Puedes preguntarme cualquier cosa: desde conceptos básicos hasta problemas difíciles. ¡Vamos a aprender juntos!`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [speakingIndex, setSpeakingIndex] = useState(null)
  const { speak, stop, supported: speechSupported } = useSpeech()
  const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY || ''
  const [apiKey, setApiKey] = useState(localStorage.getItem('anthropic_key') || envKey)
  const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('anthropic_key') && !envKey)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `¡Hola! Soy tu Profesor de Matemáticas 🎓\n\nEstoy aquí para ayudarte con cualquier duda de matemáticas de nivel **${level}**. Puedes preguntarme cualquier cosa: desde conceptos básicos hasta problemas difíciles. ¡Vamos a aprender juntos!`,
    }])
  }, [level])

  const saveKey = () => {
    localStorage.setItem('anthropic_key', apiKey)
    setShowKeyInput(false)
  }

  const send = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg) return
    if (!apiKey) { setShowKeyInput(true); return }

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const reply = await sendMessage(apiKey, level, history, userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${err.message}. Verifica tu API key de Anthropic.`,
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="chat">
      {showKeyInput && (
        <div className="api-key-banner">
          <div className="api-key-inner">
            <span className="key-icon">🔑</span>
            <div className="key-content">
              <p><strong>Necesitas una API Key de Anthropic</strong></p>
              <p className="key-hint">Consíguela en <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a></p>
              <div className="key-input-row">
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveKey()}
                />
                <button onClick={saveKey} disabled={!apiKey}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && <span className="avatar">📐</span>}
            <div className="bubble">
              <MessageRenderer content={msg.content} />
              {msg.role === 'assistant' && speechSupported && (
                <button
                  className={`speak-btn ${speakingIndex === i ? 'speaking' : ''}`}
                  title={speakingIndex === i ? 'Detener audio' : 'Escuchar explicación'}
                  onClick={() => {
                    if (speakingIndex === i) {
                      stop()
                      setSpeakingIndex(null)
                    } else {
                      stop()
                      setSpeakingIndex(i)
                      speak(msg.content)
                      // Reset index when speech ends
                      const synth = window.speechSynthesis
                      const check = setInterval(() => {
                        if (!synth.speaking) {
                          setSpeakingIndex(null)
                          clearInterval(check)
                        }
                      }, 300)
                    }
                  }}
                >
                  {speakingIndex === i ? '⏹' : '🔊'}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <span className="avatar">📐</span>
            <div className="bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="suggestions">
        {SUGGESTED[level]?.map((s, i) => (
          <button key={i} className="suggestion" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="input-row">
        <textarea
          className="chat-input"
          placeholder="Escribe tu pregunta de matemáticas..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={2}
        />
        <button
          className="send-btn"
          onClick={() => send()}
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </div>
      <p className="input-hint">Enter para enviar · Shift+Enter para nueva línea</p>

      {!showKeyInput && (
        <button className="change-key" onClick={() => setShowKeyInput(true)}>
          🔑 Cambiar API Key
        </button>
      )}
    </div>
  )
}
