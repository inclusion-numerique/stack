import { prismaClient } from '@app/web/prismaClient'
import { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'

export const getChatSession = async (chatSessionId: string) => {
  const chatSession = await prismaClient.assistantChatSession.findUnique({
    where: { id: chatSessionId, deleted: null },
    include: {
      messages: {
        orderBy: { created: 'asc' },
      },
      configuration: true,
    },
  })

  // TODO add logic stuff to have better representation ?

  return chatSession
}

export type ChatSessionData = Exclude<
  Awaited<ReturnType<typeof getChatSession>>,
  null
>

export type ChatSessionMessage = ChatSessionData['messages'][number]

export type ChatCompletionMessageWithToolCalls = Omit<
  ChatSessionMessage,
  'toolCalls'
> & {
  toolCalls: ChatCompletionMessageToolCall[]
}

export const getUserChatSessions = async (userId: string) => {
  const chatSessions = await prismaClient.assistantChatSession.findMany({
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

  return chatSessions
}

export type UserChatSessionsList = Awaited<
  ReturnType<typeof getUserChatSessions>
>
