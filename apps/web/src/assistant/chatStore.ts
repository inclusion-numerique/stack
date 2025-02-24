import type { AssistantChatStreamChunk } from '@app/web/assistant/assistantChatStream'
import { AssistantPageDataChatSessionHistoryItem } from '@app/web/assistant/getAssistantPageData'
import {
  ChatCompletionMessageWithToolCalls,
  ChatSessionData,
} from '@app/web/assistant/getChatSession'
import { createStore } from '@xstate/store'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'

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
      currentToolResults: [],
    }),
    completionStreamStarted: (context, event: { prompt: string }) => {
      // Append the sent user message to the chat session
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
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log('EVENT: COMPLETION STREAM ENDED')

      let updatedMessages = context.messages

      // Append the tool calls to messages
      const toolMessages = context.currentToolCalls.map((message, index) => ({
        type: 'call' as const,
        index,
        message,
      }))
      const toolResultsMessages = context.currentToolResults.map(
        (message, index) => ({
          type: 'result' as const,
          index,
          message,
        }),
      )

      // Merge toolCalls and toolResults by index
      const toolMessagesAndResults = [
        ...toolMessages,
        ...toolResultsMessages,
      ].sort((a, b) => a.index - b.index || a.type.localeCompare(b.type))

      updatedMessages = [
        ...updatedMessages,
        ...toolMessagesAndResults.map(({ type, message }) =>
          type === 'call'
            ? {
                id: `${new Date().toISOString()}-tool-calls`,
                content: null,
                role: 'Assistant' as const,
                sessionId: context.chatSessionId ?? 'not-created',
                created: new Date(),
                name: null,
                refusal: null,
                toolCalls: [message],
                toolCallId: null,
                finishReason: null,
              }
            : {
                id: `${new Date().toISOString()}-tool-results`,
                content: message,
                role: 'Tool' as const,
                sessionId: context.chatSessionId ?? 'not-created',
                created: new Date(),
                name: null,
                refusal: null,
                toolCalls: [],
                toolCallId: null,
                finishReason: null,
              },
        ),
      ]

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
        currentToolResults: [],
        messages: updatedMessages,
      }
    },
  },
})
