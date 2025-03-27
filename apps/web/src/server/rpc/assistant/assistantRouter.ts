import { AssistantConfigurationValidation } from '@app/web/assistant/configuration/AssistantConfigurationValidation'
import { saveAssistantConfiguration } from '@app/web/assistant/configuration/assistantConfiguration'
import { generateChatSessionTitle } from '@app/web/assistant/tasks/generateChatSessionTitle'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { z } from 'zod'

export const assistantRouter = router({
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
  persistMessages: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string().uuid(),
        messages: z.array(z.any()),
      }),
    )
    .mutation(async ({ input: { messages, chatSessionId }, ctx: { user } }) => {
      if (user.role !== 'Admin') throw forbiddenError('User is not an admin')

      const chatSession = await prismaClient.assistantChatSession.findUnique({
        where: { id: chatSessionId, deleted: null },
      })

      if (!chatSession) throw invalidError('Chat session not found')

      if (chatSession.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      const result = await prismaClient.$transaction(async (transaction) => {
        const persistedMessages = await Promise.all(
          messages.map(
            async (message) =>
              await transaction.assistantChatMessage.upsert({
                where: { id: message.id },
                create: {
                  id: message.id,
                  sessionId: chatSessionId,
                  role: message.role,
                  content: message.content,
                },
                update: {
                  role: message.role,
                  content: message.content,
                },
              }),
          ),
        )

        const updatedSession = await transaction.assistantChatSession.update({
          where: { id: chatSessionId },
        })

        return { updatedSession, persistedMessages }
      })

      return result
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
