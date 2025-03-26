import { chatStore } from '@app/web/assistant/chatStore'
import type { AssistantPageDataChatSessionHistoryItem } from '@app/web/assistant/getAssistantPageData'
import type { ChatSessionData } from '@app/web/assistant/getChatSession'
import { replaceRouteWithoutRerender } from '@app/web/utils/replaceRouteWithoutRerender'
import type { SnapshotFromStore } from '@xstate/store/dist/declarations/src/types'
import { useSelector } from '@xstate/store/react'

/**
 * This files exports the actions and queries for the chat assistant features
 * It integrates trpc for server state and zustand chatStore for client state
 * And implements the business logic
 */

// Subscribe to snapshot changes for debugging
chatStore.subscribe((snapshot) => {
  // biome-ignore lint/suspicious/noConsole: used for debugging
  console.info(snapshot.context)
})

/**
 * ACTIONS
 */
export const initialiseChatSession = ({
  chatSession,
  chatSessionHistory,
}: {
  chatSession: ChatSessionData | null
  // For history, null means empty, undefined means "do not reset"
  chatSessionHistory:
    | AssistantPageDataChatSessionHistoryItem[]
    | null
    | undefined
}) => {
  if (chatSession?.id) {
    replaceRouteWithoutRerender(`/assistant/chat/${chatSession.id}`)
  } else {
    replaceRouteWithoutRerender(`/assistant/chat`)
  }
  chatStore.send({
    type: 'initializeChatSession',
    chatSession,
    chatSessionHistory,
  })
}

/**
 * QUERIES
 */

export const useChatContext = <T>(
  selector: (snapshot: SnapshotFromStore<typeof chatStore>['context']) => T,
  compare?: (a: T | undefined, b: T) => boolean,
) => useSelector(chatStore, ({ context }) => selector(context), compare)

export const useChatSessionHistory = () =>
  useChatContext(({ chatSessionHistory }) => chatSessionHistory)

export const useIsChatSessionEmpty = () =>
  useChatContext((context) => !context.chatSession)
