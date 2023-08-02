import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import { ServerUserSignupValidation } from '@app/web/server/rpc/user/userSignup.server'
import { UserGouvernanceSignupValidation } from '@app/web/server/rpc/user/userSignup'

export const userRouter = router({
  signup: publicProcedure
    .input(ServerUserSignupValidation)
    .mutation(
      ({ input: { firstName, lastName, email, gouvernancePersonaId } }) =>
        prismaClient.user.create({
          data: {
            id: v4(),
            firstName,
            lastName,
            name:
              firstName && lastName ? `${firstName} ${lastName}` : undefined,
            email,
            gouvernancePersona: gouvernancePersonaId,
          },
          select: {
            id: true,
            email: true,
            gouvernancePersona: true,
          },
        }),
    ),
  // While signing up to a gouvernance, we allow an existing user to sign up.
  // It will change its gouvernancePersona if this is the case
  gouvernanceSignup: publicProcedure
    .input(UserGouvernanceSignupValidation)
    .mutation(
      async ({
        input: { firstName, lastName, email, gouvernancePersonaId },
      }) => {
        const user = await prismaClient.user.upsert({
          where: { email },
          update: {
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            name:
              firstName && lastName ? `${firstName} ${lastName}` : undefined,
            gouvernancePersona: gouvernancePersonaId,
            gouvernanceSignupEmailSent: null,
          },
          create: {
            id: v4(),
            firstName,
            lastName,
            name:
              firstName && lastName ? `${firstName} ${lastName}` : undefined,
            email,
            gouvernancePersona: gouvernancePersonaId,
          },
          select: {
            id: true,
            email: true,
            gouvernancePersona: true,
            formulaireGouvernanceId: true,
          },
        })

        // Create a formulaireGouvernance (as participant AND createur) if it does not exist (new signup)
        if (!user.formulaireGouvernanceId) {
          const formulaireId = v4()
          await prismaClient.user.update({
            where: { id: user.id },
            data: {
              formulaireGouvernance: {
                create: {
                  id: formulaireId,
                  gouvernancePersona: gouvernancePersonaId,
                  createurId: user.id,
                },
              },
            },
          })
        }

        return user
      },
    ),
})
