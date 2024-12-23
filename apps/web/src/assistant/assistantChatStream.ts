import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'

export type AssistantChatStreamChunk =
  | {
      content: string
      toolCall?: undefined
    }
  | {
      content?: undefined
      toolCall: ChatCompletionMessageToolCall
    }

export const serializeAssistantChatStreamChunk = (
  chunk: AssistantChatStreamChunk,
) => JSON.stringify(chunk)

export const deserializeAssistantChatStreamChunk = (
  chunk: string,
): AssistantChatStreamChunk => JSON.parse(chunk) as AssistantChatStreamChunk
