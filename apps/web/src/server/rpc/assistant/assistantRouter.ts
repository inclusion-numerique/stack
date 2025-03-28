import { AssistantConfigurationValidation } from '@app/web/assistant/configuration/AssistantConfigurationValidation'
import { saveAssistantConfiguration } from '@app/web/assistant/configuration/assistantConfiguration'
import { generateChatThreadTitle } from '@app/web/assistant/tasks/generateChatThreadTitle'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { z } from 'zod'

export const assistantRouter = router({
  changeSessionTitle: protectedProcedure
    .input(
      z.object({
        threadId: z.string().uuid(),
        title: z.string().min(1).max(80),
      }),
    )
    .mutation(async ({ input: { threadId, title }, ctx: { user } }) => {
      const chatThread = await prismaClient.assistantChatThread.findUnique({
        where: { id: threadId, deleted: null },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatThread) throw invalidError('Chat session not found')

      if (chatThread.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      await prismaClient.assistantChatThread.update({
        where: { id: threadId },
        data: {
          title,
        },
      })

      return chatThread
    }),
  deleteSession: protectedProcedure
    .input(z.object({ threadId: z.string().uuid() }))
    .mutation(async ({ input: { threadId }, ctx: { user } }) => {
      const chatThread = await prismaClient.assistantChatThread.findUnique({
        where: { id: threadId, deleted: null },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatThread) throw invalidError('Chat session not found')

      if (chatThread.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      await prismaClient.assistantChatThread.update({
        where: { id: threadId },
        data: {
          deleted: new Date(),
        },
      })

      return chatThread
    }),
  generateSessionTitle: protectedProcedure
    .input(z.object({ threadId: z.string().uuid() }))
    .mutation(async ({ input: { threadId }, ctx: { user } }) => {
      const chatThread = await prismaClient.assistantChatThread.findUnique({
        where: { id: threadId, deleted: null },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatThread) throw invalidError('Chat session not found')

      if (chatThread.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      const newTitle = await generateChatThreadTitle(chatThread)

      return prismaClient.assistantChatThread.update({
        where: { id: threadId },
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
