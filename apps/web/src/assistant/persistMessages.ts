import { aiSdkMessageToChatMessage } from '@app/web/assistant/chatMessageToAiSdkMessage'
import { prismaClient } from '@app/web/prismaClient'
import type { Message } from 'ai'

export const persistMessages = async ({
  messages,
  threadId,
}: {
  messages: Message[]
  threadId: string
}) => {
  // TODO Remove the persist operations for already persisted messages ?
  // TODO In case of regeneratino from a previous message, we should remove the previous messages

  const result = await prismaClient.$transaction(async (transaction) => {
    const persistedMessages = await Promise.all(
      messages.map(async (message) => {
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
