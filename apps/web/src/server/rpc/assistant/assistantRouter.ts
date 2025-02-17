import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { generateChatSessionTitle } from '@app/web/assistant/tasks/generateChatSessionTitle'
import {
  getCurrentAssistantConfigurationForUser,
  saveAssistantConfiguration,
} from '@app/web/assistant/configuration/assistantConfiguration'
import { getUserChatSessions } from '@app/web/assistant/getChatSession'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { AssistantConfigurationValidation } from '@app/web/assistant/configuration/AssistantConfigurationValidation'

export const assistantRouter = router({
  createSession: protectedProcedure.mutation(async ({ ctx: { user } }) => {
    if (user.role !== 'Admin') throw forbiddenError('User is not an admin')

    const configuration = await getCurrentAssistantConfigurationForUser({
      userId: user.id,
    })

    const chatSession = await prismaClient.assistantChatSession.create({
      data: {
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
        messages: true,
        configuration: true,
      },
    })

    const chatSessionHistory = await getUserChatSessions(user.id)

    return {
      chatSessionHistory,
      chatSession,
    } satisfies AssistantPageData
  }),
  changeSessionTitle: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string().uuid(),
        title: z.string().min(1).max(80),
      }),
    )
    .mutation(async ({ input: { chatSessionId, title }, ctx: { user } }) => {
      const chatSession = await prismaClient.assistantChatSession.findUnique({
        where: { id: chatSessionId, deleted: null },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatSession) throw invalidError('Chat session not found')

      if (chatSession.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      await prismaClient.assistantChatSession.update({
        where: { id: chatSessionId },
        data: {
          title,
        },
      })

      return chatSession
    }),
  deleteSession: protectedProcedure
    .input(z.object({ chatSessionId: z.string().uuid() }))
    .mutation(async ({ input: { chatSessionId }, ctx: { user } }) => {
      const chatSession = await prismaClient.assistantChatSession.findUnique({
        where: { id: chatSessionId, deleted: null },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatSession) throw invalidError('Chat session not found')

      if (chatSession.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      await prismaClient.assistantChatSession.update({
        where: { id: chatSessionId },
        data: {
          deleted: new Date(),
        },
      })

      return chatSession
    }),
  generateSessionTitle: protectedProcedure
    .input(z.object({ chatSessionId: z.string().uuid() }))
    .mutation(async ({ input: { chatSessionId }, ctx: { user } }) => {
      const chatSession = await prismaClient.assistantChatSession.findUnique({
        where: { id: chatSessionId, deleted: null },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatSession) throw invalidError('Chat session not found')

      if (chatSession.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      const newTitle = await generateChatSessionTitle(chatSession)

      return prismaClient.assistantChatSession.update({
        where: { id: chatSessionId },
        data: {
          title: newTitle,
        },
        select: {
          id: true,
          title: true,
          created: true,
        },
      })
    }),
  updateAssistantConfiguration: protectedProcedure
    .input(AssistantConfigurationValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (user.role !== 'Admin') throw forbiddenError('User is not an admin')

      await saveAssistantConfiguration({
        userId: user.id,
        configuration: input,
        setAsCurrent: true,
      })
    }),
})
