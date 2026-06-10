const API_URL = 'https://api.anthropic.com/v1/messages'

const DIAGRAM_INSTRUCTIONS = `
## Diagramas visuales
Cuando sea útil, puedes insertar diagramas SVG usando estas etiquetas especiales:

- Triángulo rectángulo: <diagram type="right-triangle" a="3" b="4" c="5"/>
  (usa los valores reales del problema)

- Plano cartesiano con línea: <diagram type="coordinate-plane" slope="2" intercept="-1" points="[[0,-1],[1,1]]"/>
  (slope e intercept son opcionales; points es un array JSON de [x,y])

- Círculo: <diagram type="circle" r="5"/>

- Gráfica de barras: <diagram type="bar-chart" title="Título" data='[{"label":"A","value":4},{"label":"B","value":7}]'/>

Inserta el diagrama en el lugar apropiado de tu explicación. No uses ASCII art.

## Formato
- Usa **negrita** para términos importantes
- Usa LaTeX para fórmulas: inline con $formula$ y display con $$formula$$
- Usa listas con - para pasos
`

const SYSTEM_PROMPTS = {
  primaria: `Eres un profesor de matemáticas amigable y paciente para niños de primaria (6-12 años).
- Usa lenguaje simple y ejemplos del día a día (frutas, juguetes, dinero)
- Explica paso a paso con mucha paciencia
- Usa emojis para hacer las explicaciones más divertidas 🎉
- Celebra los logros del estudiante
- Si el niño se equivoca, anímalo con gentileza
${DIAGRAM_INSTRUCTIONS}`,

  secundaria: `Eres un profesor de matemáticas claro y motivador para estudiantes de secundaria (12-15 años).
- Explica conceptos con ejemplos prácticos y cotidianos
- Muestra el procedimiento paso a paso
- Usa notación matemática con LaTeX cuando sea necesario
- Haz preguntas para verificar la comprensión
- Conecta los temas con aplicaciones del mundo real
${DIAGRAM_INSTRUCTIONS}`,

  preparatoria: `Eres un profesor de matemáticas riguroso y claro para estudiantes de preparatoria (15-18 años).
- Usa notación matemática correcta con LaTeX
- Explica el razonamiento detrás de cada paso
- Menciona demostraciones o justificaciones cuando sea relevante
- Conecta los temas con cálculo, física u otras materias
- Prepara al estudiante para exámenes de nivel universitario
${DIAGRAM_INSTRUCTIONS}`,
}

export async function sendMessage(apiKey, level, history, newMessage) {
  const systemPrompt = SYSTEM_PROMPTS[level] || SYSTEM_PROMPTS.secundaria

  const messages = [
    ...history,
    { role: 'user', content: newMessage },
  ]

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
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

export async function generateExercise(apiKey, level, topic) {
  const prompt = `Genera un ejercicio de matemáticas de nivel ${level} sobre el tema: "${topic}".

Responde SOLO con un JSON válido con esta estructura exacta:
{
  "question": "El enunciado del ejercicio aquí",
  "hint": "Una pista útil (sin dar la respuesta)",
  "answer": "La respuesta correcta"
}

El ejercicio debe ser apropiado para el nivel ${level}. No incluyas texto fuera del JSON.`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${response.status}`)
  }

  const data = await response.json()
  const text = data.content[0].text.trim()

  // Extract JSON even if there's extra text
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Respuesta inesperada del modelo')

  return JSON.parse(jsonMatch[0])
}

export async function checkAnswer(apiKey, exercise, userAnswer, level) {
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

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${response.status}`)
  }

  const data = await response.json()
  const text = data.content[0].text.trim()

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Respuesta inesperada del modelo')

  return JSON.parse(jsonMatch[0])
}
