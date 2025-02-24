import {
  OpenAiChunkChoice,
  executeOpenAiChat,
  executeOpenAiChatStream,
} from '@app/web/assistant/openAiChat'
import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'
import { mediationAssistantSystemMessage } from '@app/web/assistant/systemMessages'
import { weatherTestTool } from '@app/web/assistant/tools/weatherTestTool'

describe('openAiChat', () => {
  it('should trigger functions tools', async () => {
    const response = await executeOpenAiChat({
      messages: [
        mediationAssistantSystemMessage,
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
        stop_reason: expect.toBeOneOf([null, 128_008]) as string | null,
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
        mediationAssistantSystemMessage,
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
          arguments: expect.toBeOneOf([
            '{"location": "Lyon, FR"}',
            '{"location": "Lyon, France"}',
            '{"location": "Lyon"}',
          ]) as string,
        },
      },
    ])
    expect(message).toBe('')
    expect(finishReason).toBe('tool_calls')
  }, 40_000)

  it('run tools using openai sdk', async () => {
    const runner = openAiClient.beta.chat.completions.runTools({
      model: openAiClientConfiguration.chatModel,
      messages: [
        mediationAssistantSystemMessage,
        {
          role: 'user',
          content: 'Je veux savoir la météo pour Lyon',
        },
      ],
      tools: [weatherTestTool],
      stream: true,
    })

    const result = await runner.finalChatCompletion()

    // Tools should have been called conditionally
    expect(result).toEqual({
      object: 'chat.completion',
      id: expect.any(String) as string,
      choices: [
        {
          stop_reason: null,
          message: {
            role: 'assistant',
            parsed: null,
            refusal: null,
            content: expect.toBeString() as string,
          },
          finish_reason: 'stop',
          index: 0,
          logprobs: null,
        },
      ],
      created: expect.any(Number) as number,
      model: expect.any(String) as string,
    })
  }, 60_000)
})
