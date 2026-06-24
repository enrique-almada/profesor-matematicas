export const TOPICS = {
  primaria: ['Estados de la materia', 'Mezclas y soluciones', 'Materiales y sus propiedades', 'Experimentos simples', 'El agua'],
  secundaria: ['Tabla periódica', 'Átomos y moléculas', 'Enlaces químicos', 'Reacciones químicas', 'Ácidos y bases'],
  preparatoria: ['Estequiometría', 'Configuración electrónica', 'Enlace iónico y covalente', 'Equilibrio químico', 'Termoquímica'],
}

export const SUGGESTED = {
  primaria: [
    '¿Por qué el hielo se derrite?',
    '¿Qué pasa si mezclo agua y aceite?',
    '¿De qué está hecho el aire?',
    '¿Por qué el agua de mar es salada?',
  ],
  secundaria: [
    '¿Cómo funciona la tabla periódica?',
    '¿Qué es un enlace químico?',
    'Ayúdame a balancear una ecuación',
    '¿Qué es un ácido y qué es una base?',
  ],
  preparatoria: [
    '¿Cómo se hace estequiometría?',
    'Explícame la configuración electrónica',
    '¿Qué diferencia hay entre enlace iónico y covalente?',
    'Ayúdame con equilibrio químico',
  ],
}

const GREETING = `¡Hola! Soy tu Profesor de Química 🧪\n\nEstoy aquí para ayudarte con cualquier duda de química de nivel **{level}**. Puedes preguntarme cualquier cosa: desde por qué pasan las reacciones hasta estequiometría y enlaces. ¡Vamos a experimentar juntos!`

export const GREETINGS = {
  primaria: GREETING,
  secundaria: GREETING,
  preparatoria: GREETING,
}
