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
  const chatSession = chatSessionId
    ? await getChatSession(chatSessionId)
    : undefined

  const chatSessions = await getUserChatSessions(userId)

  return {
    chatSessions,
    chatSession, // null if not found, undefined if not required in params
  }
}

export type AssistantPageData = Awaited<ReturnType<typeof getAssistantPageData>>
