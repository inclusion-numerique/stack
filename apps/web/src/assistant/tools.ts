import { OpenAiTool } from '@app/web/assistant/openAiChat'

export const testTool = {
  type: 'function',
  function: {
    name: 'get_statistics',
    description:
      'invoque toujours cette fonction pour avoir du contexte sur l’utilisateur et pouvoir mieux répondre',
    parameters: {
      type: 'object',
      properties: {
        topic: { type: 'string' },
      },
    },
  },
} satisfies OpenAiTool

export const weatherTool = {
  type: 'function',
  function: {
    name: 'get_current_weather',
    description: 'Get the current weather in a given location',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g. San Francisco, CA',
        },
      },
      required: ['location'],
    },
  },
} satisfies OpenAiTool

export const tools = [testTool, weatherTool] satisfies OpenAiTool[]
