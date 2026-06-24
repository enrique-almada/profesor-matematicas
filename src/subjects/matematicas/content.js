export const TOPICS = {
  primaria: ['Sumas y restas', 'Multiplicación', 'Fracciones', 'Geometría básica', 'Problemas de lógica'],
  secundaria: ['Álgebra', 'Ecuaciones', 'Geometría', 'Estadística', 'Porcentajes'],
  preparatoria: ['Funciones', 'Trigonometría', 'Derivadas', 'Integrales', 'Logaritmos'],
}

export const SUGGESTED = {
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

const GREETING = `¡Hola! Soy tu Profesor de Matemáticas 🎓\n\nEstoy aquí para ayudarte con cualquier duda de matemáticas de nivel **{level}**. Puedes preguntarme cualquier cosa: desde conceptos básicos hasta problemas difíciles. ¡Vamos a aprender juntos!`

export const GREETINGS = {
  primaria: GREETING,
  secundaria: GREETING,
  preparatoria: GREETING,
}
