import { matematicas } from './matematicas'
import { fisica } from './fisica'
import { quimica } from './quimica'
import { probabilidadEstadistica } from './probabilidad-estadistica'
import { lenguaLiteratura } from './lengua-literatura'

export const SUBJECTS = {
  matematicas,
  fisica,
  quimica,
  'probabilidad-estadistica': probabilidadEstadistica,
  'lengua-literatura': lenguaLiteratura,
}

export const SUBJECT_LIST = Object.values(SUBJECTS)

export function getSubject(subjectId) {
  return SUBJECTS[subjectId] || SUBJECTS.matematicas
}

export function getSystemPrompt(subjectId, level) {
  const subject = getSubject(subjectId)
  const base = subject.systemPrompts[level] || subject.systemPrompts.secundaria
  return `${base}\n${subject.diagramInstructions}`
}

export function getGreeting(subjectId, level) {
  const subject = getSubject(subjectId)
  const template = subject.greetings[level] || subject.greetings.secundaria
  return template.replace('{level}', level)
}
