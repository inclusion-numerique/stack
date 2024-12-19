import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'

export const assistantRouter = router({
  createSession: protectedProcedure.mutation(async ({ ctx: { user } }) => {
    if (user.role !== 'Admin') throw forbiddenError('User is not an admin')

    const chatSession = await prismaClient.assistantChatSession.create({
      data: {
        createdById: user.id,
        context: '',
      },
    })

    return chatSession
  }),
  generateSessionTitle: protectedProcedure
    .input(z.object({ chatSessionId: z.string().uuid() }))
    .mutation(async ({ input: { chatSessionId }, ctx: { user } }) => {
      const chatSession = await prismaClient.assistantChatSession.findUnique({
        where: { id: chatSessionId },
        include: {
          messages: {
            orderBy: { created: 'asc' },
          },
        },
      })

      if (!chatSession) throw invalidError('Chat session not found')

      // TODO add logic to call LLM to generate a title

      if (chatSession.createdById !== user.id)
        throw forbiddenError('User is not the creator of this chat session')

      return chatSession
    }),
})
