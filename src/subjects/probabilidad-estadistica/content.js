export const TOPICS = {
  primaria: ['Conteo y combinaciones simples', 'Probabilidad de eventos', 'Gráficas de datos', 'Promedios simples', 'Tablas de frecuencia'],
  secundaria: ['Media, mediana y moda', 'Probabilidad de eventos simples', 'Diagramas de árbol', 'Gráficas estadísticas', 'Rango y desviación'],
  preparatoria: ['Distribución normal', 'Combinatoria y permutaciones', 'Probabilidad condicional', 'Varianza y desviación estándar', 'Inferencia estadística'],
}

export const SUGGESTED = {
  primaria: [
    '¿Qué es más probable al lanzar un dado?',
    '¿Cómo se saca un promedio?',
    'Ayúdame a leer una gráfica de barras',
    '¿Qué es la moda de un conjunto de datos?',
  ],
  secundaria: [
    '¿Cómo se calcula la media, mediana y moda?',
    '¿Cuál es la probabilidad de sacar un as de una baraja?',
    'Ayúdame con un diagrama de árbol',
    '¿Qué es la desviación estándar?',
  ],
  preparatoria: [
    '¿Cómo se usa la distribución normal?',
    'Explícame permutaciones y combinaciones',
    '¿Qué es la probabilidad condicional?',
    'Ayúdame con varianza y desviación estándar',
  ],
}

const GREETING = `¡Hola! Soy tu Profesor de Probabilidad y Estadística 📊\n\nEstoy aquí para ayudarte con cualquier duda de probabilidad y estadística de nivel **{level}**. Puedes preguntarme cualquier cosa: desde qué tan probable es algo hasta cómo interpretar datos. ¡Vamos a descubrir los patrones juntos!`

export const GREETINGS = {
  primaria: GREETING,
  secundaria: GREETING,
  preparatoria: GREETING,
}
