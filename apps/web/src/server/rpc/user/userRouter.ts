import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
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
  updateProfile: publicProcedure
    .input(UpdateProfileValidation)
    .mutation(
      async ({ input: { firstName, lastName, phone }, ctx: { user } }) => {
        if (!user) {
          throw forbiddenError(
            'Vous devez être connecté pour modifier votre profil',
          )
        }

        return prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            firstName,
            lastName,
            phone,
            name: `${firstName} ${lastName}`,
          },
        })
      },
    ),
})
