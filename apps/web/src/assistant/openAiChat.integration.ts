import {
  executeOpenAiChat,
  executeOpenAiChatStream,
  OpenAiChunkChoice,
} from '@app/web/assistant/openAiChat'
import { weatherTool } from '@app/web/assistant/tools'
import { chatSystemMessage } from '@app/web/assistant/systemMessages'

describe('openAiChat', () => {
  it('should trigger functions tools', async () => {
    const response = await executeOpenAiChat({
      messages: [
        chatSystemMessage,
        {
          role: 'user',
          content: 'Je veux savoir la météo pour Lyon',
        },
      ],
      tools: [weatherTool],
    })

    const firstChoice = response.choices.at(0)

    expect(firstChoice).toEqual(
      expect.objectContaining({
        finish_reason: 'tool_calls',
        index: 0,
        logprobs: null,
        message: {
          content: null,
          role: 'assistant',
          tool_calls: [
            {
              function: {
                arguments: '{"location": "Lyon, France"}',
                name: 'get_current_weather',
              },
              id: expect.toBeString() as string,
              type: 'function',
            },
          ],
        },
        stop_reason: null,
      }),
    )

    expect(response.choices.length).toBe(1)
  })

  it('should trigger functions tools in streaming mode', async () => {
    const chunksList: OpenAiChunkChoice[] = []
    const toolCallsList: OpenAiChunkChoice[] = []

    const { message, toolCalls } = await executeOpenAiChatStream({
      onChunk: (chunk) => {
        chunksList.push(chunk)
      },
      onToolCall: (chunk) => {
        toolCallsList.push(chunk)
      },
      messages: [
        chatSystemMessage,
        {
          role: 'user',
          content: 'Je veux savoir la météo pour Lyon',
        },
      ],
      tools: [weatherTool],
    })

    console.log('CHUNKS', chunksList)
    console.log('TOOL CALLS', toolCalls)

    expect(chunksList).not.toHaveLength(0)
    expect(toolCallsList).toHaveLength(1)
    expect(toolCalls).toHaveLength(1)
    expect(message).toBe('')
  })
})
