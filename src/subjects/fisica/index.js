import { SYSTEM_PROMPTS } from './prompts'
import { DIAGRAM_INSTRUCTIONS } from './diagramInstructions'
import { TOPICS, SUGGESTED, GREETINGS } from './content'

export const fisica = {
  id: 'fisica',
  label: 'Física',
  icon: '🚀',
  systemPrompts: SYSTEM_PROMPTS,
  diagramInstructions: DIAGRAM_INSTRUCTIONS,
  diagramTypes: ['vector', 'free-body', 'motion-graph'],
  topics: TOPICS,
  suggestedQuestions: SUGGESTED,
  greetings: GREETINGS,
}
