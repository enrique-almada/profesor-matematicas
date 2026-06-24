import { SYSTEM_PROMPTS } from './prompts'
import { DIAGRAM_INSTRUCTIONS } from './diagramInstructions'
import { TOPICS, SUGGESTED, GREETINGS } from './content'

export const probabilidadEstadistica = {
  id: 'probabilidad-estadistica',
  label: 'Probabilidad y Estadística',
  icon: '📊',
  systemPrompts: SYSTEM_PROMPTS,
  diagramInstructions: DIAGRAM_INSTRUCTIONS,
  diagramTypes: ['histogram', 'normal-curve', 'scatter-plot', 'pie-chart'],
  topics: TOPICS,
  suggestedQuestions: SUGGESTED,
  greetings: GREETINGS,
}
