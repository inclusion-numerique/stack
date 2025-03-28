import type {
  ChatCompletionMessageWithToolCalls,
  ChatThreadData,
  UserChatThreadsList,
} from '@app/web/assistant/getChatThread'
import { createStore } from '@xstate/store'

// Create a store
export const chatStore = createStore({
  context: {
    initialized: false,
    chatThreadHistory: [] as UserChatThreadsList,
    chatThread: null as ChatThreadData | null,
    threadId: null as string | null,
    messages: [] as ChatCompletionMessageWithToolCalls[],
  },
  on: {
    initializeChatUi: (
      context,
      event: {
        chatThread: ChatThreadData | null
        // null means empty, undefined means "do not change"
        chatThreadHistory: UserChatThreadsList | null | undefined
      },
    ) => ({
      initialized: true,
      chatThreadHistory:
        event.chatThreadHistory === undefined
          ? context.chatThreadHistory
          : (event.chatThreadHistory ?? []),
      chatThread: event.chatThread,
      threadId: event.chatThread?.id,
      messages:
        (event.chatThread?.messages as
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
