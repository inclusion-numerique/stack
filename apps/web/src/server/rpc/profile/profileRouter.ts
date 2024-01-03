import { z } from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  UpdateProfileImageCommandValidation,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { searchMember } from '@app/web/server/profiles/searchMember'
import { handleResourceMutationCommand } from '../../resources/feature/handleResourceMutationCommand'

export const profileRouter = router({
  getMatchingUsers: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        notInBaseId: z.string().optional(),
        notInResourceId: z.string().optional(),
      }),
    )
    .query(async ({ input: { query, notInBaseId, notInResourceId } }) =>
      query.length > 1
        ? searchMember({
            query,
            notInBaseId,
            notInResourceId,
          })
        : [],
    ),
  mutate: protectedProcedure
    .input(UpdateProfileVisibilityCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (input.isPublic === false) {
        // All public resources not in a base must be made private
        const resources = await prismaClient.resource.findMany({
          select: { id: true },
          where: { createdById: user.id, baseId: null, isPublic: true },
        })

        // All public collections not in a base must be made private
        const collections = await prismaClient.collection.findMany({
          select: { id: true },
          where: { ownerId: user.id, baseId: null, isPublic: true },
        })

        return prismaClient.$transaction(async (transaction) => {
          await Promise.all(
            resources.map((resource) =>
              handleResourceMutationCommand(
                {
                  name: 'ChangeVisibility',
                  payload: { resourceId: resource.id, isPublic: false },
                },
                { user },
                transaction,
              ),
            ),
          )

          await Promise.all(
            collections.map((collection) =>
              transaction.collection.update({
                where: { id: collection.id },
                data: { isPublic: false },
              }),
            ),
          )

          return transaction.user.update({
            where: { id: user.id },
            data: input,
          })
        })
      }
      return prismaClient.user.update({ where: { id: user.id }, data: input })
    }),
  updateImage: protectedProcedure
    .input(UpdateProfileImageCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.user.update({
        where: { id: user.id },
        data: { imageId: input.imageId },
      }),
    ),
})
