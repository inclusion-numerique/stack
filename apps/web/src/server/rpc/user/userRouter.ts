import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { ServerUserSignupValidation } from '@app/web/server/rpc/user/userSignup.server'
import { UpdateProfileValidation } from '@app/web/app/user/UpdateProfileValidation'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { enforceIsAdmin } from '@app/web/server/rpc/enforceIsAdmin'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { ResetInscriptionUtilisateurValidation } from '@app/web/server/rpc/user/ResetInscriptionUtilisateur'

export const userRouter = router({
  signup: publicProcedure
    .input(ServerUserSignupValidation)
    .mutation(({ input: { firstName, lastName, email } }) =>
      prismaClient.user.create({
        data: {
          id: v4(),
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          email,
        },
        select: {
          id: true,
          email: true,
        },
      }),
    ),
  updateProfile: protectedProcedure
    .input(UpdateProfileValidation)
    .mutation(
      async ({ input: { firstName, lastName, phone }, ctx: { user } }) => {
        const stopwatch = createStopwatch()
        const updated = await prismaClient.user.update({
          where: { id: user.id },
          data: {
            firstName,
            lastName,
            phone,
            name: `${firstName} ${lastName}`,
          },
        })
        addMutationLog({
          userId: user.id,
          nom: 'ModifierUtilisateur',
          duration: stopwatch.stop().duration,
          data: {
            id: user.id,
            firstName,
            lastName,
            phone,
          },
        })
        return updated
      },
    ),
  markOnboardingAsSeen: protectedProcedure.mutation(({ ctx: { user } }) =>
    prismaClient.user.update({
      where: { id: user.id },
      data: { hasSeenOnboarding: new Date() },
    }),
  ),
  resetInscription: protectedProcedure
    .input(ResetInscriptionUtilisateurValidation)
    .mutation(async ({ input: { userId }, ctx: { user: sessionUser } }) => {
      enforceIsAdmin(sessionUser)

      const stopwatch = createStopwatch()

      const updated = await prismaClient.user.update({
        where: {
          id: userId,
          role: 'User',
        },
        data: {
          hasSeenOnboarding: null,
          acceptationCgu: null,
          inscriptionValidee: null,
          donneesConseillerNumeriqueV1Importees: null,
          profilInscription: null,
          structureEmployeuseRenseignee: null,
          checkedProfilInscription: null,
        },
      })

      if (!updated) {
        throw invalidError('User not found or user is admin')
      }

      addMutationLog({
        userId,
        nom: 'ResetInscription',
        duration: stopwatch.stop().duration,
        data: {
          id: userId,
        },
      })

      return updated
    }),
})
