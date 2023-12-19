import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  BaseFollowValidation,
  ProfileFollowValidation,
} from '@app/web/follows/follows'

export const followRouter = router({
  followBase: protectedProcedure
    .input(BaseFollowValidation)
    .mutation(async ({ input: { baseId }, ctx: { user } }) =>
      // TODO Security check on base visibility
      prismaClient.baseFollow.create({
        data: {
          baseId,
          followerId: user.id,
        },
        select: {
          id: true,
        },
      }),
    ),
  followProfile: protectedProcedure
    .input(ProfileFollowValidation)
    .mutation(async ({ input: { profileId }, ctx: { user } }) =>
      // TODO Security check on profile visibility
      prismaClient.profileFollow.create({
        data: {
          profileId,
          followerId: user.id,
        },
        select: {
          id: true,
        },
      }),
    ),
  unfollowBase: protectedProcedure
    .input(BaseFollowValidation)
    .mutation(async ({ input: { baseId }, ctx: { user } }) =>
      // TODO Security check on base visibility
      prismaClient.baseFollow.delete({
        where: {
          baseId_followerId: {
            baseId,
            followerId: user.id,
          },
        },
      }),
    ),
  unfollowProfile: protectedProcedure
    .input(ProfileFollowValidation)
    .mutation(async ({ input: { profileId }, ctx: { user } }) =>
      // TODO Security check on profile visibility
      prismaClient.profileFollow.delete({
        where: {
          profileId_followerId: {
            profileId,
            followerId: user.id,
          },
        },
      }),
    ),
})
