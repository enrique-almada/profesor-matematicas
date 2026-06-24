import { SYSTEM_PROMPTS } from './prompts'
import { DIAGRAM_INSTRUCTIONS } from './diagramInstructions'
import { TOPICS, SUGGESTED, GREETINGS } from './content'

export const lenguaLiteratura = {
  id: 'lengua-literatura',
  label: 'Lengua y Literatura',
  icon: '📚',
  systemPrompts: SYSTEM_PROMPTS,
  diagramInstructions: DIAGRAM_INSTRUCTIONS,
  diagramTypes: ['syntax-tree'],
  topics: TOPICS,
  suggestedQuestions: SUGGESTED,
  greetings: GREETINGS,
}
