import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { createRdvServicePublicAccount } from '@app/web/rdv-service-public/createRdvServicePublicAccount'
import {
  OAuthRdvApiCallInputValidation,
  OauthRdvApiCreateRdvPlanInput,
  OauthRdvApiCreateRdvPlanMutationInputValidation,
  OauthRdvApiCreateRdvPlanResponse,
  OauthRdvApiMeInputValidation,
  type OauthRdvApiMeResponse,
} from '@app/web/rdv-service-public/OAuthRdvApiCallInput'
import { executeOAuthRdvApiCall } from '@app/web/rdv-service-public/executeOAuthRdvApiCall'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { getBeneficiaireAdresseString } from '@app/web/beneficiaire/getBeneficiaireAdresseString'

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
    throw invalidError('Compte RDV Service Public non connecté')
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
  oAuthApiCreateRdvPlan: protectedProcedure
    .input(OauthRdvApiCreateRdvPlanMutationInputValidation)
    .mutation(
      async ({
        input: { beneficiaireId, returnUrl: _returnUrl },
        ctx: { user },
      }) => {
        const beneficiaire = await prismaClient.beneficiaire.findUnique({
          where: {
            id: beneficiaireId,
          },
        })

        if (!beneficiaire || beneficiaire.mediateurId !== user.mediateur?.id) {
          throw invalidError('Bénéficiaire introuvable')
        }

        const oAuthCallUser = await getContextForOAuthApiCall({ user })

        const apiData = {
          endpoint: '/rdv_plans',
          data: {
            user: {
              id: beneficiaire.rdvServicePublicId ?? undefined,
              first_name: beneficiaire.prenom ?? undefined,
              last_name: beneficiaire.nom ?? undefined,
              email: beneficiaire.telephone ?? undefined,
              address: getBeneficiaireAdresseString(beneficiaire),
              phone_number: beneficiaire.telephone ?? undefined,
              // birth_date: beneficiaire.anneeNaissance // We don't have this field in the beneficiaire
            },
            // return_url: _returnUrl, // TODO return_url -> 422 from rdv api
          },
        } satisfies OauthRdvApiCreateRdvPlanInput

        const result =
          await executeOAuthRdvApiCall<OauthRdvApiCreateRdvPlanResponse>({
            path: apiData.endpoint,
            rdvAccount: oAuthCallUser.rdvAccount,
            config: {
              method: 'POST',
              data: apiData.data,
            },
          })

        //  Update beneficiaire with RDV Service Public ID if needed
        if (result.rdv_plan.user_id !== beneficiaire.rdvServicePublicId) {
          await prismaClient.beneficiaire.update({
            where: { id: beneficiaireId },
            data: { rdvServicePublicId: result.rdv_plan.user_id },
          })
        }

        return result
      },
    ),
})
