import { getChatSession } from '@app/web/assistant/getChatSession'

export const getAssistantPageData = async ({
  chatSessionId,
}: {
  chatSessionId: string
}) => {
  const chatSession = await getChatSession(chatSessionId)

  return {
    chatSession,
  }
}

export type AssistantPageData = Awaited<ReturnType<typeof getAssistantPageData>>
