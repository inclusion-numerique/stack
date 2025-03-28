import { chatStore } from '@app/web/assistant/chatStore'
import type { AssistantPageDataChatThreadHistoryItem } from '@app/web/assistant/getAssistantPageData'
import {
  ChatThreadData,
  UserChatThreadsList,
} from '@app/web/assistant/getChatThread'
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
export const initialiseChatUi = ({
  chatThread,
  chatThreadHistory,
}: {
  chatThread: ChatThreadData | null
  // For history, null means empty, undefined means "do not reset"
  chatThreadHistory: AssistantPageDataChatThreadHistoryItem[] | null | undefined
}) => {
  chatStore.send({
    type: 'initializeChatUi',
    chatThread,
    chatThreadHistory,
  })
}

/**
 * QUERIES
 */

export const useChatContext = <T>(
  selector: (snapshot: SnapshotFromStore<typeof chatStore>['context']) => T,
  compare?: (a: T | undefined, b: T) => boolean,
) => useSelector(chatStore, ({ context }) => selector(context), compare)

export const useChatThreadHistory = (
  initialChatThreadHistory?: UserChatThreadsList,
) =>
  useChatContext(({ chatThreadHistory, initialized }) =>
    initialized ? chatThreadHistory : (initialChatThreadHistory ?? []),
  )

export const useIsChatThreadEmpty = () =>
  useChatContext((context) => !context.chatThread)
