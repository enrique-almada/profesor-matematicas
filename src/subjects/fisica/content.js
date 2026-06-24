export const TOPICS = {
  primaria: ['Fuerzas y movimiento', 'Flotación y densidad', 'Luz y sombras', 'Sonido', 'Imanes'],
  secundaria: ['Velocidad y aceleración', 'Leyes de Newton', 'Energía cinética y potencial', 'Calor y temperatura', 'Ondas'],
  preparatoria: ['Cinemática', 'Dinámica', 'Trabajo y energía', 'Electricidad y magnetismo', 'Movimiento ondulatorio'],
}

export const SUGGESTED = {
  primaria: [
    '¿Por qué flotan los barcos?',
    '¿Cómo funciona un imán?',
    '¿Por qué se hace sombra?',
    '¿Qué es el sonido?',
  ],
  secundaria: [
    '¿Cómo se calcula la velocidad?',
    'Explícame las leyes de Newton',
    '¿Qué es la energía cinética?',
    'Ayúdame con caída libre',
  ],
  preparatoria: [
    '¿Cómo se calcula la aceleración?',
    'Explícame las leyes de Newton',
    '¿Qué es la energía cinética?',
    'Ayúdame con tiro parabólico',
  ],
}

const GREETING = `¡Hola! Soy tu Profesor de Física 🚀\n\nEstoy aquí para ayudarte con cualquier duda de física de nivel **{level}**. Puedes preguntarme cualquier cosa: desde por qué pasan las cosas hasta problemas de cinemática y dinámica. ¡Vamos a explorar el mundo juntos!`

export const GREETINGS = {
  primaria: GREETING,
  secundaria: GREETING,
  preparatoria: GREETING,
}
