import { createStore } from '@xstate/store'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import type { SnapshotFromStore } from '@xstate/store/dist/declarations/src/types'
import { useSelector } from '@xstate/store/react'
import {
  ChatCompletionMessageWithToolCalls,
  ChatSessionData,
} from '@app/web/assistant/getChatSession'
import type { AssistantChatStreamChunk } from '@app/web/assistant/assistantChatStream'

// Create a store
export const chatStore = createStore({
  context: {
    initialized: false,
    chatSessionId: null as string | null,
    messages: [] as ChatCompletionMessageWithToolCalls[],
    currentToolCalls: [] as ChatCompletionMessageToolCall[], // tool calls currently being executed
    streamingMessage: null as string | null, // null if not currently streaming, can be empty string if streaming
    isSendingMessage: false,
    isGenerating: false,
    completionError: null as string | null,
  },
  on: {
    resetChatSession: (
      _context,
      event: { chatSession: ChatSessionData | null | undefined },
    ) => ({
      initialized: true,
      chatSessionId: event.chatSession?.id,
      messages:
        (event.chatSession?.messages as
          | ChatCompletionMessageWithToolCalls[]
          | undefined) ?? [],
      currentToolCalls: [],
      streamingMessage: null,
      isSendingMessage: false,
      isGenerating: false,
      completionError: null,
    }),
    chatSessionCreated: (context, event: { chatSessionId: string }) => ({
      chatSessionId: event.chatSessionId,
    }),
    userMessageSubmitted: () => ({
      isSendingMessage: true,
      completionError: null,
    }),
    completionErrored: (_context, event: { error: string }) => ({
      isSendingMessage: false,
      isGenerating: false,
      completionError: event.error,
      streamingMessage: null,
      currentToolCalls: [],
    }),
    completionStreamStarted: (context, event: { prompt: string }) => {
      // Append the sent user message to the chat session
      console.log('EVENT: COMPLETION STREAM STARTED', event.prompt)

      const userMessage = {
        id: new Date().toISOString(), // no need to use a uuid here
        content: event.prompt,
        role: 'User',
        sessionId: context.chatSessionId ?? 'not-created',
        created: new Date(),
        name: null,
        refusal: null,
        toolCalls: [],
        toolCallId: null,
        finishReason: null,
      } satisfies ChatCompletionMessageWithToolCalls

      return {
        messages: [...context.messages, userMessage],
        isSendingMessage: false,
        isGenerating: true,
        completionError: null,
      }
    },
    completionStreamChunkReceived: (
      context,
      event: { chunk: AssistantChatStreamChunk },
    ) => {
      const { content, toolCall } = event.chunk

      if (toolCall) {
        context.currentToolCalls.push(toolCall)
      }

      return {
        streamingMessage: content
          ? (context.streamingMessage ?? '') + content
          : context.streamingMessage,
        currentToolCalls: context.currentToolCalls,
      }
    },
    completionStreamEnded: (context) => {
      console.log('EVENT: COMPLETION STREAM ENDED')

      let updatedMessages = context.messages

      // Append the current tool calls to messages
      if (context.currentToolCalls.length > 0) {
        updatedMessages = [
          ...updatedMessages,
          {
            id: `${new Date().toISOString()}-tool-calls`,
            content: null,
            role: 'Assistant',
            sessionId: context.chatSessionId ?? 'not-created',
            created: new Date(),
            name: null,
            refusal: null,
            toolCalls: context.currentToolCalls,
            toolCallId: null,
            finishReason: null,
          },
        ]
      }

      // Append the current streaming message to the messages
      if (context.streamingMessage) {
        updatedMessages = [
          ...updatedMessages,
          {
            id: new Date().toISOString(),
            content: context.streamingMessage,
            role: 'Assistant',
            sessionId: context.chatSessionId ?? 'not-created',
            created: new Date(),
            name: null,
            refusal: null,
            toolCalls: [],
            toolCallId: null,
            finishReason: null,
          },
        ]
      }

      return {
        isGenerating: false,
        completionError: null,
        streamingMessage: null,
        currentToolCalls: [],
        messages: updatedMessages,
      }
    },
  },
})

// Subscribe to snapshot changes for debugging
// chatStore.subscribe((snapshot) => {
//   console.info(snapshot.context)
// })

export const useChatContext = <T>(
  selector: (snapshot: SnapshotFromStore<typeof chatStore>['context']) => T,
  compare?: (a: T | undefined, b: T) => boolean,
) => useSelector(chatStore, ({ context }) => selector(context), compare)
