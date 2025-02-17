import { createStore } from '@xstate/store'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import {
  ChatCompletionMessageWithToolCalls,
  ChatSessionData,
} from '@app/web/assistant/getChatSession'
import type { AssistantChatStreamChunk } from '@app/web/assistant/assistantChatStream'
import { AssistantPageDataChatSessionHistoryItem } from '@app/web/assistant/getAssistantPageData'

// Create a store
export const chatStore = createStore({
  context: {
    initialized: false,
    chatSessionHistory: [] as AssistantPageDataChatSessionHistoryItem[],
    chatSession: null as ChatSessionData | null,
    chatSessionId: null as string | null,
    messages: [] as ChatCompletionMessageWithToolCalls[],
    currentToolCalls: [] as ChatCompletionMessageToolCall[], // tool calls currently being executed
    currentToolResults: [] as string[], // tool results currently being executed. Should be yaml encoded
    streamingMessage: null as string | null, // null if not currently streaming, can be empty string if streaming
    isSendingUserMessage: false,
    isGenerating: false,
    completionError: null as string | null,
  },
  on: {
    initializeChatSession: (
      context,
      event: {
        chatSession: ChatSessionData | null
        // null means empty, undefined means "do not change"
        chatSessionHistory:
          | AssistantPageDataChatSessionHistoryItem[]
          | null
          | undefined
      },
    ) => ({
      initialized: true,
      chatSessionHistory:
        event.chatSessionHistory === undefined
          ? context.chatSessionHistory
          : (event.chatSessionHistory ?? []),
      chatSession: event.chatSession,
      chatSessionId: event.chatSession?.id,
      messages:
        (event.chatSession?.messages as
          | ChatCompletionMessageWithToolCalls[]
          | undefined) ?? [],
      currentToolCalls: [],
      streamingMessage: null,
      isSendingUserMessage: false,
      isGenerating: false,
      completionError: null,
    }),
    chatSessionCreated: (_context, event: { chatSessionId: string }) => ({
      chatSessionId: event.chatSessionId,
    }),
    userMessageSubmitted: () => ({
      isSendingUserMessage: true,
      completionError: null,
    }),
    completionErrored: (_context, event: { error: string }) => ({
      isSendingUserMessage: false,
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
        isSendingUserMessage: false,
        isGenerating: true,
        completionError: null,
      }
    },
    completionStreamChunkReceived: (
      context,
      event: { chunk: AssistantChatStreamChunk },
    ) => {
      console.log('CHUNK', event.chunk)

      const { role, content, toolCall } = event.chunk

      if (role === 'tool') {
        return {
          currentToolResults: [...context.currentToolResults, content],
        }
      }

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
