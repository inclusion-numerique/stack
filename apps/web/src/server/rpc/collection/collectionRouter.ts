import { v4 } from 'uuid'
import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'
import { SaveCollectionValidation } from '@app/web/server/collections/SaveCollection'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import {
  UpdateCollectionImageCommandValidation,
  UpdateCollectionInformationsCommandValidation,
  UpdateCollectionVisibilityCommandValidation,
} from '@app/web/server/collections/updateCollection'

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
  updateInformations: protectedProcedure
    .input(UpdateCollectionInformationsCommandValidation)
    .mutation(async ({ input: { id, ...informations } }) =>
      prismaClient.collection.update({
        where: { id },
        data: informations,
      }),
    ),
  updateImage: protectedProcedure
    .input(UpdateCollectionImageCommandValidation)
    .mutation(async ({ input: { id, imageId } }) =>
      prismaClient.collection.update({
        where: { id },
        data: { imageId },
      }),
    ),
  updateVisibility: protectedProcedure
    .input(UpdateCollectionVisibilityCommandValidation)
    .mutation(async ({ input: { id, isPublic } }) =>
      prismaClient.collection.update({
        where: { id },
        data: { isPublic },
      }),
    ),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const timestamp = new Date()
      return prismaClient.collection.update({
        where: { id: input.id },
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
      })
    }),
})
