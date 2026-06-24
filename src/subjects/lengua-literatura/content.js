export const TOPICS = {
  primaria: ['Sustantivos y verbos', 'Cuentos y fábulas', 'Comprensión de lectura', 'Ortografía básica', 'Rimas y poesía'],
  secundaria: ['Análisis de oraciones', 'Géneros literarios', 'Figuras retóricas', 'Comprensión de textos', 'Ortografía y acentuación'],
  preparatoria: ['Análisis literario', 'Movimientos literarios', 'Ensayo argumentativo', 'Métrica y figuras retóricas', 'Literatura hispanoamericana'],
}

export const SUGGESTED = {
  primaria: [
    '¿Qué es un sustantivo?',
    'Cuéntame una fábula con moraleja',
    '¿Cómo se escribe correctamente "haber"?',
    'Ayúdame a entender una rima',
  ],
  secundaria: [
    '¿Cómo identifico el sujeto y el predicado?',
    '¿Qué géneros literarios existen?',
    'Explícame qué es una metáfora',
    'Ayúdame con acentuación',
  ],
  preparatoria: [
    '¿Cómo escribo un ensayo argumentativo?',
    '¿Qué caracteriza al Realismo literario?',
    'Explícame la métrica de un poema',
    'Ayúdame a analizar un cuento',
  ],
}

const GREETING = `¡Hola! Soy tu Profesor de Lengua y Literatura 📚\n\nEstoy aquí para ayudarte con cualquier duda de lengua y literatura de nivel **{level}**. Puedes preguntarme cualquier cosa: desde gramática y ortografía hasta análisis de textos y literatura. ¡Vamos a leer y escribir juntos!`

export const GREETINGS = {
  primaria: GREETING,
  secundaria: GREETING,
  preparatoria: GREETING,
}
