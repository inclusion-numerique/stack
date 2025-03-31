import { chatMessageToAiSdkMessage } from '@app/web/assistant/chatMessageToAiSdkMessage'
import {
  getChatThread,
  getUserChatThreads,
} from '@app/web/assistant/getChatThread'

export const getAssistantPageData = async ({
  userId,
  threadId,
}: {
  userId: string
  threadId?: string
}) => {
  const chatThread = threadId ? await getChatThread(threadId) : null

  const chatThreadHistory = await getUserChatThreads(userId)

  return {
    chatThreadHistory,
    chatThread, // null if not found, undefined if not required in params
    messages: chatThread?.messages.map(chatMessageToAiSdkMessage) ?? [],
  }
}

export type AssistantPageData = Awaited<ReturnType<typeof getAssistantPageData>>

export type AssistantPageDataChatThreadHistoryItem =
  AssistantPageData['chatThreadHistory'][number]
