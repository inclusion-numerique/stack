import { AssistantPageDataChatSessionHistoryItem } from '@app/web/assistant/getAssistantPageData'
import {
  ChatCompletionMessageWithToolCalls,
  ChatSessionData,
} from '@app/web/assistant/getChatSession'
import { createStore } from '@xstate/store'

// Create a store
export const chatStore = createStore({
  context: {
    initialized: false,
    chatSessionHistory: [] as AssistantPageDataChatSessionHistoryItem[],
    chatSession: null as ChatSessionData | null,
    chatSessionId: null as string | null,
    messages: [] as ChatCompletionMessageWithToolCalls[],
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
  },
})
