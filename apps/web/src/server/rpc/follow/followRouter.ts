import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  BaseFollowValidation,
  ProfileFollowValidation,
} from '@app/web/follows/follows'

export const followRouter = router({
  base: protectedProcedure
    .input(BaseFollowValidation)
    .mutation(async ({ input: { baseId }, ctx: { user } }) => {
      // TODO Security check on base visibility
      const follow = await prismaClient.baseFollow.create({
        data: {
          baseId,
          followerId: user.id,
        },
        select: {
          id: true,
        },
      })

      return follow
    }),

  profile: protectedProcedure
    .input(ProfileFollowValidation)
    .mutation(async ({ input: { profileId }, ctx: { user } }) => {
      // TODO Security check on profile visibility
      const follow = await prismaClient.profileFollow.create({
        data: {
          profileId,
          followerId: user.id,
        },
        select: {
          id: true,
        },
      })

      return follow
    }),
})
