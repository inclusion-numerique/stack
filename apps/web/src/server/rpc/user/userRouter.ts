import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { ServerUserSignupValidation } from '@app/web/server/rpc/user/userSignup.server'
import { UpdateProfileValidation } from '@app/web/app/user/UpdateProfileValidation'

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
      async ({ input: { firstName, lastName, phone }, ctx: { user } }) =>
        prismaClient.user.update({
          where: { id: user.id },
          data: {
            firstName,
            lastName,
            phone,
            name: `${firstName} ${lastName}`,
          },
        }),
    ),
  markOnboardingAsSeen: protectedProcedure.mutation(({ ctx: { user } }) =>
    prismaClient.user.update({
      where: { id: user.id },
      data: { hasSeenOnboarding: new Date() },
    }),
  ),
})
