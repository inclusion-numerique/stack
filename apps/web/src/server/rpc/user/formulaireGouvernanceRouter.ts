import Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ChooseGouvernancePersonaValidation } from '@app/web/gouvernance/ChooseGouvernancePersona'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { sendGouvernanceWelcomeEmail } from '@app/web/gouvernance/sendGouvernanceWelcomeEmail'

export const formulaireGouvernanceRouter = router({
  choosePersona: protectedProcedure
    .input(ChooseGouvernancePersonaValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const updatedUser = await prismaClient.user.update({
        where: { id: user.id },
        data: {
          gouvernancePersona: input.gouvernancePersonaId,
        },
        select: sessionUserSelect,
      })

      sendGouvernanceWelcomeEmail({
        user: {
          ...updatedUser,
          gouvernancePersona: input.gouvernancePersonaId,
        },
      }).catch((error) => {
        Sentry.captureException(error)
      })

      return updatedUser
    }),
})
