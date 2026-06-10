import { useState } from 'react'
import { generateExercise, checkAnswer } from '../services/claude'
import './Exercises.css'

const TOPICS = {
  primaria: ['Sumas y restas', 'Multiplicación', 'Fracciones', 'Geometría básica', 'Problemas de lógica'],
  secundaria: ['Álgebra', 'Ecuaciones', 'Geometría', 'Estadística', 'Porcentajes'],
  preparatoria: ['Funciones', 'Trigonometría', 'Derivadas', 'Integrales', 'Logaritmos'],
}

export default function Exercises({ level }) {
  const [topic, setTopic] = useState(TOPICS[level][0])
  const [exercise, setExercise] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY || ''
  const [apiKey] = useState(localStorage.getItem('anthropic_key') || envKey)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const getExercise = async () => {
    if (!apiKey) {
      alert('Primero configura tu API Key en la pestaña de Chat 🔑')
      return
    }
    setLoading(true)
    setFeedback(null)
    setUserAnswer('')
    setExercise(null)
    try {
      const ex = await generateExercise(apiKey, level, topic)
      setExercise(ex)
    } catch (err) {
      alert('Error al generar ejercicio: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const check = async () => {
    if (!userAnswer.trim()) return
    setChecking(true)
    try {
      const result = await checkAnswer(apiKey, exercise, userAnswer, level)
      setFeedback(result)
      setScore(prev => ({
        correct: prev.correct + (result.correct ? 1 : 0),
        total: prev.total + 1,
      }))
    } catch (err) {
      setFeedback({ correct: false, explanation: 'Error al verificar: ' + err.message })
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="exercises">
      <div className="exercise-controls">
        <div className="topic-selector">
          <label className="control-label">Tema:</label>
          <div className="topic-buttons">
            {TOPICS[level].map(t => (
              <button
                key={t}
                className={`topic-btn ${topic === t ? 'active' : ''}`}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="score-badge">
          ✅ {score.correct}/{score.total}
        </div>
      </div>

      <button
        className="generate-btn"
        onClick={getExercise}
        disabled={loading}
      >
        {loading ? '⏳ Generando...' : '🎲 Nuevo Ejercicio'}
      </button>

      {exercise && (
        <div className="exercise-card">
          <div className="exercise-topic-tag">{topic}</div>
          <p className="exercise-text">{exercise.question}</p>

          {exercise.hint && (
            <details className="hint">
              <summary>💡 Ver pista</summary>
              <p>{exercise.hint}</p>
            </details>
          )}

          <div className="answer-section">
            <label className="answer-label">Tu respuesta:</label>
            <textarea
              className="answer-input"
              placeholder="Escribe tu respuesta aquí..."
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              rows={3}
              disabled={!!feedback}
            />
            {!feedback && (
              <button
                className="check-btn"
                onClick={check}
                disabled={checking || !userAnswer.trim()}
              >
                {checking ? '⏳ Verificando...' : '✅ Verificar Respuesta'}
              </button>
            )}
          </div>

          {feedback && (
            <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
              <div className="feedback-icon">
                {feedback.correct ? '🎉' : '💪'}
              </div>
              <div className="feedback-content">
                <p className="feedback-title">
                  {feedback.correct ? '¡Correcto!' : 'Casi, sigue intentando'}
                </p>
                <p className="feedback-explanation">{feedback.explanation}</p>
              </div>
            </div>
          )}

          {feedback && (
            <button className="next-btn" onClick={getExercise} disabled={loading}>
              {loading ? '⏳ Cargando...' : '→ Siguiente ejercicio'}
            </button>
          )}
        </div>
      )}

      {!exercise && !loading && (
        <div className="empty-state">
          <span className="empty-icon">✏️</span>
          <p>Presiona <strong>Nuevo Ejercicio</strong> para comenzar a practicar.</p>
        </div>
      )}
    </div>
  )
}
