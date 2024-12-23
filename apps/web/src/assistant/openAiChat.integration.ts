import {
  executeOpenAiChat,
  executeOpenAiChatStream,
  OpenAiChunkChoice,
} from '@app/web/assistant/openAiChat'
import { chatSystemMessage } from '@app/web/assistant/systemMessages'
import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'
import { weatherTestTool } from '@app/web/assistant/tools/weatherTestTool'

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
      tools: [weatherTestTool],
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
                arguments: expect.toBeOneOf([
                  '{"location": "Lyon, FR"}',
                  '{"location": "Lyon, France"}',
                ]) as string,
                name: 'get_current_weather',
              },
              id: expect.any(String) as string,
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

    const { message, toolCalls, finishReason } = await executeOpenAiChatStream({
      onChunk: (chunk) => {
        chunksList.push(chunk)
      },
      messages: [
        chatSystemMessage,
        {
          role: 'user',
          content: 'Je veux savoir la météo pour Lyon',
        },
      ],
      tools: [weatherTestTool],
    })

    expect(chunksList).not.toHaveLength(0)
    expect(toolCalls).toEqual([
      {
        id: expect.toBeString() as string,
        type: 'function',
        function: {
          name: 'get_current_weather',
          arguments: '{"location": "Lyon, France"}',
        },
      },
    ])
    expect(message).toBe('')
    expect(finishReason).toBe('tool_calls')
  })

  it('run tools using openai sdk', async () => {
    const runner = openAiClient.beta.chat.completions
      .runTools({
        model: openAiClientConfiguration.chatModel,
        messages: [
          chatSystemMessage,
          {
            role: 'user',
            content: 'Je veux savoir la météo pour Lyon',
          },
        ],
        tools: [weatherTestTool],
        stream: true,
      })
      .on('message', (message) => {
        console.log('runner message', message)
        console.log(
          'runner message tool call',
          'tool_calls' in message ? message.tool_calls?.at(0) : null,
        )
      })
      .on('content', (content) => {
        console.log('runner content', content)
      })

    const result = await runner.finalChatCompletion()
    console.log('final result', result)
  })
})
