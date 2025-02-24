import {
  AssistantChatStreamChunk,
  deserializeAssistantChatStreamChunk,
} from '@app/web/assistant/assistantChatStream'

export const decodeStreamChunk = (
  chunk: Uint8Array<ArrayBufferLike>,
): AssistantChatStreamChunk[] => {
  const decoder = new TextDecoder()
  const rawChunk = decoder.decode(chunk)

  // Chunks can be concatenated, we need to split them
  // remove first and last char for the first and last {}
  const chunks = rawChunk
    .slice(1, -1)
    .split('}{')
    .map((item) => `{${item}}`)

  return chunks.map(deserializeAssistantChatStreamChunk)
}
