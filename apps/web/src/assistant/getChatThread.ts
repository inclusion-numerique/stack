import { getCurrentAssistantConfigurationForUser } from '@app/web/assistant/configuration/assistantConfiguration'
import { prismaClient } from '@app/web/prismaClient'
import { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'

export const getChatThread = async (threadId: string) => {
  const chatThread = await prismaClient.assistantChatThread.findUnique({
    where: { id: threadId, deleted: null },
    include: {
      messages: {
        orderBy: { created: 'asc' },
      },
      configuration: true,
    },
  })

  // TODO add logic stuff to have better representation ?

  return chatThread
}

export const getOrCreateChatThread = async ({
  threadId,
  user,
}: {
  threadId: string
  user: { id: string }
}) => {
  const existing = await getChatThread(threadId)
  if (existing) {
    return existing
  }

  const configuration = await getCurrentAssistantConfigurationForUser({
    userId: user.id,
  })

  return await prismaClient.assistantChatThread.create({
    data: {
      id: threadId,
      createdBy: { connect: { id: user.id } },
      context: '',
      configuration: {
        connectOrCreate: {
          where: { id: configuration.id },
          create: {
            ...configuration,
          },
        },
      },
    },
    include: {
      messages: {
        orderBy: { created: 'asc' },
      },
      configuration: true,
    },
  })
}

export type ChatThreadData = Exclude<
  Awaited<ReturnType<typeof getChatThread>>,
  null
>

export type ChatThreadMessage = ChatThreadData['messages'][number]

export type ChatCompletionMessageWithToolCalls = Omit<
  ChatThreadMessage,
  'toolCalls'
> & {
  toolCalls: ChatCompletionMessageToolCall[]
}

export const getUserChatThreads = async (userId: string) => {
  const chatThreads = await prismaClient.assistantChatThread.findMany({
    where: {
      createdById: userId,
      deleted: null,
    },
    select: {
      id: true,
      title: true,
      created: true,
      updated: true,
      _count: {
        select: {
          messages: true,
        },
      },
    },
    orderBy: {
      created: 'desc',
    },
  })

  return chatThreads
}

export type UserChatThreadsList = Awaited<ReturnType<typeof getUserChatThreads>>
