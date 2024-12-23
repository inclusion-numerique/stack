import { z } from 'zod'
import { zodFunction } from 'openai/helpers/zod'

export const weatherTestTool = zodFunction({
  name: 'get_current_weather',
  description: 'Get the current weather in a given location',
  parameters: z.object({
    location: z
      .string()
      .describe('The city and country, e.g. San Francisco, USA'),
  }),
  function: (args) => {
    console.log('ZOD ARGS', args)
    return {
      weather: {
        unit: '°C',
        temperatures: {
          min: 43,
          max: 50,
        },
        description: 'end of world scorching hot',
      },
    }
  },
})
