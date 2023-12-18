import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'
import { SaveCollectionValidation } from '@app/web/server/collections/SaveCollection'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'

export const collectionRouter = router({
  save: protectedProcedure
    .input(SaveCollectionValidation)
    .mutation(
      ({ input: { collectionId, savedById, baseId }, ctx: { user } }) => {
        // TODO Security based on collection visibility for the ctx user

        if (savedById !== user.id) {
          throw forbiddenError()
        }

        return prismaClient.savedCollection.create({
          data: { collectionId, savedById, baseId },
          select: {
            id: true,
            base: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        })
      },
    ),
  unsave: protectedProcedure
    .input(SaveCollectionValidation)
    .mutation(async ({ input: { collectionId, savedById, baseId } }) => {
      // TODO Security based on collection visibility and base membership for (the ctx user
      // TODO If collection is saved in a base, then the user must be a member of that base

      if (baseId) {
        return prismaClient.savedCollection.deleteMany({
          where: { collectionId, baseId },
        })
      }

      // Collection is saved in profile
      return prismaClient.savedCollection.deleteMany({
        where: { collectionId, savedById, baseId: null },
      })
    }),
  create: protectedProcedure
    .input(CreateCollectionCommandValidation)
    .mutation(
      async ({ input: { addResourceId, ...collectionData }, ctx: { user } }) =>
        // TODO Security on baseId
        prismaClient.collection.create({
          data: {
            ...collectionData,
            ownerId: user.id,
            resources: addResourceId
              ? {
                  create: {
                    id: v4(),
                    resourceId: addResourceId,
                    added: new Date(),
                  },
                }
              : undefined,
          },
        }),
    ),
})
