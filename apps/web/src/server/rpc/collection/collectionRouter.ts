import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'

export const collectionRouter = router({
  create: protectedProcedure
    .input(CreateCollectionCommandValidation)
    .mutation(
      async ({ input: { addResourceId, ...collectionData }, ctx: { user } }) =>
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
