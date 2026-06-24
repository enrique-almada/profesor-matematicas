import { getSubject, getSystemPrompt } from '../subjects'

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5-20251001'

async function callClaude(apiKey, { system, messages, maxTokens }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      ...(system ? { system } : {}),
      messages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

function parseJsonResponse(text) {
  const jsonMatch = text.trim().match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Respuesta inesperada del modelo')
  return JSON.parse(jsonMatch[0])
}

export async function sendMessage(apiKey, subjectId, level, history, newMessage) {
  const system = getSystemPrompt(subjectId, level)
  const messages = [
    ...history,
    { role: 'user', content: newMessage },
  ]
  return callClaude(apiKey, { system, messages, maxTokens: 1024 })
}

export async function generateExercise(apiKey, subjectId, level, topic) {
  const subjectLabel = getSubject(subjectId).label
  const prompt = `Genera un ejercicio de ${subjectLabel} de nivel ${level} sobre el tema: "${topic}".

Responde SOLO con un JSON válido con esta estructura exacta:
{
  "question": "El enunciado del ejercicio aquí",
  "hint": "Una pista útil (sin dar la respuesta)",
  "answer": "La respuesta correcta"
}

El ejercicio debe ser apropiado para el nivel ${level}. No incluyas texto fuera del JSON.`

  const text = await callClaude(apiKey, { messages: [{ role: 'user', content: prompt }], maxTokens: 512 })
  return parseJsonResponse(text)
}

export async function checkAnswer(apiKey, subjectId, exercise, userAnswer, level) {
  const prompt = `Ejercicio: ${exercise.question}
Respuesta esperada: ${exercise.answer}
Respuesta del estudiante: ${userAnswer}
Nivel: ${level}

¿Es correcta la respuesta del estudiante? Responde SOLO con JSON:
{
  "correct": true o false,
  "explanation": "Explicación breve. Si es correcto, felicita. Si no, explica el error y da la solución correcta paso a paso."
}

No incluyas texto fuera del JSON.`

  const text = await callClaude(apiKey, { messages: [{ role: 'user', content: prompt }], maxTokens: 512 })
  return parseJsonResponse(text)
}
