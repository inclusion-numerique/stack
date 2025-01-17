import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { createRdvServicePublicAccount } from '@app/web/rdv-service-public/createRdvServicePublicAccount'

export const rdvServicePublicRouter = router({
  createAccount: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { userId }, ctx: { user } }) => {
      if (user.id !== userId) {
        throw forbiddenError("Vous n'avez pas accès à cette action")
      }

      const userWithSecretData = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          rdvAccount: true,
        },
      })

      if (!userWithSecretData) {
        throw invalidError('Utilisateur introuvable')
      }

      const rdvAccount = await createRdvServicePublicAccount({
        user,
      })

      return {
        rdvAccount,
        hasOauthTokens: !!(
          userWithSecretData.rdvAccount?.accessToken &&
          userWithSecretData.rdvAccount?.refreshToken
        ),
      }
    }),
})
