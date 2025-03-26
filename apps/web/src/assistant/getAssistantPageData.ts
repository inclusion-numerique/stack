import { assistantMessagesToUiMessages } from '@app/web/assistant/assistantMessagesToUiMessages'
import {
  getChatSession,
  getUserChatSessions,
} from '@app/web/assistant/getChatSession'

export const getAssistantPageData = async ({
  userId,
  chatSessionId,
}: {
  userId: string
  chatSessionId?: string
}) => {
  const chatSession = chatSessionId ? await getChatSession(chatSessionId) : null

  const chatSessionHistory = await getUserChatSessions(userId)

  return {
    chatSessionHistory,
    chatSession, // null if not found, undefined if not required in params
    uiMessages: chatSession
      ? assistantMessagesToUiMessages(chatSession.messages)
      : null,
  }
}

export type AssistantPageData = Awaited<ReturnType<typeof getAssistantPageData>>

export type AssistantPageDataChatSessionHistoryItem =
  AssistantPageData['chatSessionHistory'][number]
