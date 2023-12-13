import { prismaClient } from '@app/web/prismaClient'

/**
 * All collections are public in v1.
 * During migration we set all collection to private by default to be safe.
 * In this pass we make relevant collections public.
 */
export const updateCollectionVisibility = () =>
  prismaClient.collection.updateMany({
    where: {
      AND: [
        {
          // Only affect migrated collections
          OR: [
            { legacyId: { not: null } },
            { legacyPinnedResourcesBaseId: { not: null } },
          ],
        },
        {
          OR: [
            // Collection in public profile
            { baseId: null, owner: { isPublic: true } },
            // Collection in public base
            { baseId: { not: null }, base: { isPublic: true } },
          ],
        },
      ],
    },
    data: {
      isPublic: true,
    },
  })
