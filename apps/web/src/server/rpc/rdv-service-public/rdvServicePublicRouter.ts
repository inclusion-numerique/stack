import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { createRdvServicePublicAccount } from '@app/web/rdv-service-public/createRdvServicePublicAccount'
import {
  OAuthRdvApiCallInputValidation,
  OauthRdvApiMeInputValidation,
  type OauthRdvApiMeResponse,
} from '@app/web/rdv-service-public/OAuthRdvApiCallInput'
import { executeOAuthRdvApiCall } from '@app/web/rdv-service-public/executeOAuthRdvApiCall'
import type { SessionUser } from '@app/web/auth/sessionUser'

const getContextForOAuthApiCall = async ({
  user,
}: {
  user: Pick<SessionUser, 'id' | 'rdvAccount'>
}) => {
  const userWithSecretData = await prismaClient.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      rdvAccount: true,
    },
  })

  if (!userWithSecretData) {
    throw invalidError('Utilisateur introuvable')
  }

  const { rdvAccount } = userWithSecretData

  if (!rdvAccount || !user.rdvAccount?.hasOauthTokens) {
    throw invalidError('Compte RDV Aide Numérique non connecté')
  }

  return { ...userWithSecretData, rdvAccount }
}

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
  executeOauthApiCall: protectedProcedure
    .input(OAuthRdvApiCallInputValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const oAuthCallUser = await getContextForOAuthApiCall({ user })

      const result = await executeOAuthRdvApiCall({
        path: input.endpoint,
        rdvAccount: oAuthCallUser.rdvAccount,
        config: {
          data: input.data,
        },
      })

      return result
    }),
  oAuthApiMe: protectedProcedure
    .input(OauthRdvApiMeInputValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const oAuthCallUser = await getContextForOAuthApiCall({ user })

      const result = await executeOAuthRdvApiCall<OauthRdvApiMeResponse>({
        path: input.endpoint,
        rdvAccount: oAuthCallUser.rdvAccount,
        config: {
          data: input.data,
        },
      })

      return result
    }),
})
