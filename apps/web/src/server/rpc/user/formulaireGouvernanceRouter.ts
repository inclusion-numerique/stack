import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ChooseGouvernancePersonaValidation } from '@app/web/gouvernance/ChooseGouvernancePersona'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { sendGouvernanceWelcomeEmail } from '@app/web/gouvernance/sendGouvernanceWelcomeEmail'
import { ChooseIntentionValidation } from '@app/web/gouvernance/ChooseIntention'
import { canUpdateFormulaireGouvernance } from '@app/web/security/securityRules'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'

export const formulaireGouvernanceRouter = router({
  choosePersona: protectedProcedure
    .input(ChooseGouvernancePersonaValidation)
    .mutation(async ({ input: { gouvernancePersonaId }, ctx: { user } }) => {
      const formulaireGouvernanceId = v4()

      const updatedUser = await prismaClient.user.update({
        where: { id: user.id },
        data: {
          gouvernancePersona: gouvernancePersonaId,
          formulaireGouvernance: {
            create: {
              id: formulaireGouvernanceId,
              gouvernancePersona: gouvernancePersonaId,
              createurId: user.id,
            },
          },
        },
        select: sessionUserSelect,
      })

      if (user.gouvernancePersona === gouvernancePersonaId) {
        // Do not send same email to user
        return updatedUser
      }

      // Send welcome email with new persona
      sendGouvernanceWelcomeEmail({
        user: {
          ...updatedUser,
          gouvernancePersona: gouvernancePersonaId,
        },
      }).catch((error) => {
        Sentry.captureException(error)
      })

      return updatedUser
    }),

  chooseIntention: protectedProcedure
    .input(ChooseIntentionValidation)
    .mutation(
      async ({
        input: { intention, formulaireGouvernanceId },
        ctx: { user },
      }) => {
        if (!canUpdateFormulaireGouvernance(user, formulaireGouvernanceId)) {
          throw forbiddenError()
        }

        const updatedFormulaireGouvernance =
          await prismaClient.formulaireGouvernance.update({
            where: { id: formulaireGouvernanceId },
            data: {
              intention,
            },
            select: {
              id: true,
              intention: true,
              gouvernancePersona: true,
            },
          })

        return updatedFormulaireGouvernance
      },
    ),
})
