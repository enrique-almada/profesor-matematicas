import { SYSTEM_PROMPTS } from './prompts'
import { DIAGRAM_INSTRUCTIONS } from './diagramInstructions'
import { TOPICS, SUGGESTED, GREETINGS } from './content'

export const matematicas = {
  id: 'matematicas',
  label: 'Matemáticas',
  icon: '📐',
  systemPrompts: SYSTEM_PROMPTS,
  diagramInstructions: DIAGRAM_INSTRUCTIONS,
  diagramTypes: ['right-triangle', 'circle', 'coordinate-plane', 'bar-chart'],
  topics: TOPICS,
  suggestedQuestions: SUGGESTED,
  greetings: GREETINGS,
}
