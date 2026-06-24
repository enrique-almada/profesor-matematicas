import { SYSTEM_PROMPTS } from './prompts'
import { DIAGRAM_INSTRUCTIONS } from './diagramInstructions'
import { TOPICS, SUGGESTED, GREETINGS } from './content'

export const quimica = {
  id: 'quimica',
  label: 'Química',
  icon: '🧪',
  systemPrompts: SYSTEM_PROMPTS,
  diagramInstructions: DIAGRAM_INSTRUCTIONS,
  diagramTypes: ['molecule', 'bohr-model', 'periodic-element'],
  topics: TOPICS,
  suggestedQuestions: SUGGESTED,
  greetings: GREETINGS,
}
