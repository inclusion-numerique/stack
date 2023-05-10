import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import { ServerUserSignupValidation } from '@app/web/server/rpc/user/userSignup.server'

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
})
