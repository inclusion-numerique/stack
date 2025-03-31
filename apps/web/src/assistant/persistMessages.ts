import { aiSdkMessageToChatMessage } from '@app/web/assistant/chatMessageToAiSdkMessage'
import { filterMessagesWithDiff } from '@app/web/assistant/messageHasDiff'
import { prismaClient } from '@app/web/prismaClient'
import type { Message } from 'ai'

export const persistMessages = async ({
  initialMessages,
  messages,
  threadId,
}: {
  initialMessages: Message[] // Reference of already persisted messages
  messages: Message[] // Will not be persisted if identical to item in initialMessages
  threadId: string
}) => {
  // TODO In case of regeneration from a previous message, we should remove the previous messages ?

  const messagesWithDiff = filterMessagesWithDiff({
    initialMessages,
    messages,
  })

  const result = await prismaClient.$transaction(async (transaction) => {
    const persistedMessages = await Promise.all(
      messagesWithDiff.map(async (message) => {
        const { id, ...data } = aiSdkMessageToChatMessage(message)

        return await transaction.assistantChatMessage.upsert({
          where: { id },
          create: {
            id,
            ...data,
            threadId,
          },
          update: data,
        })
      }),
    )

    const updatedSession = await transaction.assistantChatThread.update({
      where: { id: threadId },
      data: {
        updated: new Date(),
      },
    })

    return { updatedSession, persistedMessages }
  })

  return result
}
