import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'

export type AssistantChatStreamChunk =
  | {
      role: 'assistant'
      content: string
      toolCall?: undefined
    }
  | {
      role: 'assistant'
      content?: undefined
      toolCall: ChatCompletionMessageToolCall
    }
  | {
      role: 'tool'
      content: string // yaml encoded tool result
      toolCall?: undefined
    }

export const serializeAssistantChatStreamChunk = (
  chunk: AssistantChatStreamChunk,
) => JSON.stringify(chunk)

export const deserializeAssistantChatStreamChunk = (
  chunk: string,
): AssistantChatStreamChunk => JSON.parse(chunk) as AssistantChatStreamChunk
