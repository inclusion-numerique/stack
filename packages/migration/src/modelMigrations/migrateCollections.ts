import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { output } from '@app/cli/output'
import {
  createLegacyToNewIdHelper,
  LegacyToNewIdHelper,
} from '@app/migration/legacyToNewIdHelper'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { legacyBasesIdsToTransformToProfile } from '@app/migration/modelMigrations/legacyBasesToTransformToProfile'
import { LegacyBaseOwnerFromLegacyBaseId } from '@app/migration/modelMigrations/getLegacyBaseOwnerFromLegacyBaseId'

export const getLegacyCollections = async () => {
  const collections = await migrationPrismaClient.main_collection.findMany({
    include: {
      main_collection_resources: true,
      main_resizableimage: true,
    },
  })

  /**
   * Pinned collections will be migrated as "Collection enregistrée"
   */
  const pinnedCollections =
    await migrationPrismaClient.main_base_pinned_collections.findMany({})
  const pinnedResources =
    await migrationPrismaClient.main_base_pinned_resources.findMany({})

  // We also need legacy user ids for bases that have been transformed into profiles
  const legacyTransformedBases = await migrationPrismaClient.main_base.findMany(
    {
      where: {
        id: {
          in: [...legacyBasesIdsToTransformToProfile].map(BigInt),
        },
      },
      select: {
        id: true,
        owner_id: true,
      },
    },
  )

  const legacyProfileForTransformedBaseId = new Map(
    legacyTransformedBases.map(({ id, owner_id }) => [id, owner_id]),
  )

  /**
   * Legacy bases with pinned resource will have a new collection "Resources enregistrées"
   * If transformed into profile, it will be a collection
   */
  const legacyBasesWithPinnedResources = new Set(
    pinnedResources.map(({ base_id }) => base_id),
  )

  const legacyCollectionResources = collections.flatMap(
    (collection) => collection.main_collection_resources,
  )

  const legacyCollectionResourcesIds = new Set(
    legacyCollectionResources.map(({ resource_id }) => resource_id),
  )

  return {
    collections,
    pinnedCollections,
    pinnedResources,
    legacyBasesWithPinnedResources,
    legacyTransformedBases,
    legacyProfileForTransformedBaseId,
    legacyCollectionResources,
    legacyCollectionResourcesIds,
  }
}

export type LegacyCollectionsData = Awaited<
  ReturnType<typeof getLegacyCollections>
>

export type LegacyCollection = LegacyCollectionsData['collections'][number]

export const getExistingCollections = async () => {
  const collections = await prismaClient.collection.findMany({
    select: {
      id: true,
      legacyId: true,
      isFavorites: true,
      legacyPinnedResourcesBaseId: true,
      resources: {
        select: {
          id: true,
          legacyId: true,
          resourceId: true,
          legacyPinnedResourcesId: true,
        },
        where: {
          OR: [
            {
              legacyId: {
                not: null,
              },
            },
            {
              legacyPinnedResourcesId: {
                not: null,
              },
            },
          ],
        },
      },
    },
    where: {
      OR: [
        {
          legacyId: {
            not: null,
          },
        },
        {
          legacyPinnedResourcesBaseId: {
            not: null,
          },
        },
      ],
    },
  })

  const savedCollections = await prismaClient.savedCollection.findMany({
    select: {
      id: true,
      collectionId: true,
      legacyId: true,
    },
    where: {
      legacyId: {
        not: null,
      },
    },
  })

  const idMap = new Map<number, string>(
    collections
      .filter(
        (
          collection,
        ): collection is (typeof collections)[0] & { legacyId: number } =>
          !!collection.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  const pinnedCollections = collections.filter(
    (collection) => !!collection.legacyPinnedResourcesBaseId,
  )

  return { idMap, pinnedCollections, collections, savedCollections }
}

export type ExistingCollections = Awaited<
  ReturnType<typeof getExistingCollections>
>

export type MigrateCollectionInput = {
  legacyCollection: LegacyCollection
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  legacyBaseOwnerFromLegacyBaseId: LegacyBaseOwnerFromLegacyBaseId
}

export const migrateCollection = async ({
  legacyCollection,
  transaction,
  userIdFromLegacyId,
  imageIdFromLegacyId,
  baseIdFromLegacyId,
  legacyBaseOwnerFromLegacyBaseId,
}: MigrateCollectionInput) => {
  const legacyId = Number(legacyCollection.id)

  // Get the owner by geting the id of the owner of the base
  const ownerId = userIdFromLegacyId(
    Number(legacyBaseOwnerFromLegacyBaseId(legacyCollection.base_id)),
  )

  // If base have been transformed into profile, the collection will be migrated in a profile only
  const baseId = legacyBasesIdsToTransformToProfile.has(
    Number(legacyCollection.base_id),
  )
    ? null
    : baseIdFromLegacyId(Number(legacyCollection.base_id))

  const data = {
    legacyId,
    title: legacyCollection.name,
    description: legacyCollection.description,
    ownerId,
    baseId,
    imageId: legacyCollection.profile_image_id
      ? imageIdFromLegacyId(Number(legacyCollection.profile_image_id))
      : null,
    created: legacyCollection.created,
    updated: legacyCollection.modified,
    isPublic: false,
  } satisfies Parameters<typeof transaction.collection.upsert>[0]['update']

  return transaction.collection.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      ...data,
    },
    update: data,
    select: { id: true, ownerId: true, legacyId: true },
  })
}

export const migrateCollectionResource = async ({
  legacyCollectionResource,
  transaction,
  collectionIdFromLegacyId,
  resourceIdFromLegacyId,
}: {
  legacyCollectionResource: LegacyCollectionsData['legacyCollectionResources'][number]
  transaction: Prisma.TransactionClient
  collectionIdFromLegacyId: LegacyToNewIdHelper
  resourceIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const legacyId = Number(legacyCollectionResource.id)
  const collectionId = collectionIdFromLegacyId(
    Number(legacyCollectionResource.collection_id),
  )
  const resourceId = resourceIdFromLegacyId(
    Number(legacyCollectionResource.resource_id),
  )

  const data = {
    legacyId,
    collectionId,
    resourceId,
  } satisfies Parameters<
    typeof transaction.collectionResource.upsert
  >[0]['update']

  return transaction.collectionResource.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      ...data,
    },
    update: data,
    select: { id: true, resourceId: true, collectionId: true, legacyId: true },
  })
}

export type MigrateCollectionsInput = {
  legacyCollections: LegacyCollectionsData
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  resourceIdFromLegacyId: LegacyToNewIdHelper
  legacyBaseOwnerFromLegacyBaseId: LegacyBaseOwnerFromLegacyBaseId
}

export const migrateCollections = async ({
  legacyCollections,
  userIdFromLegacyId,
  imageIdFromLegacyId,
  baseIdFromLegacyId,
  resourceIdFromLegacyId,
  transaction,
  legacyBaseOwnerFromLegacyBaseId,
}: MigrateCollectionsInput) => {
  const existingCollections = await getExistingCollections()

  const collectionsToDelete = [...existingCollections.idMap.entries()].filter(
    ([legacyId]) =>
      !legacyCollections.collections.some(
        (legacyCollection) => Number(legacyCollection.id) === legacyId,
      ),
  )

  output(`-- Deleting ${collectionsToDelete.length} collections`)

  // Execute delete operation
  await transaction.collection.deleteMany({
    where: {
      id: {
        in: collectionsToDelete.map(([, newId]) => newId),
      },
    },
  })

  output(`-- Upserting ${legacyCollections.collections.length} collections`)

  const upserted = await Promise.all(
    legacyCollections.collections.map((legacyCollection) =>
      migrateCollection({
        legacyCollection,
        transaction,
        userIdFromLegacyId,
        imageIdFromLegacyId,
        baseIdFromLegacyId,
        legacyBaseOwnerFromLegacyBaseId,
      }),
    ),
  )

  const collectionIdFromLegacyId = createLegacyToNewIdHelper(
    upserted,
    ({ legacyId }) => `Collection with legacyId ${legacyId} not found`,
  )

  // Handling resources in collections
  const collectionResourcesToDelete = existingCollections.collections
    // Deleted collection will have cascaded delete
    .filter(
      (collection) =>
        !collectionsToDelete.some(([, id]) => id === collection.id),
    )
    .flatMap((collection) => collection.resources)
    .filter(
      (resource) =>
        !!resource.legacyId &&
        !legacyCollections.legacyCollectionResourcesIds.has(
          BigInt(resource.legacyId),
        ),
    )

  output(
    `-- Deleting ${collectionResourcesToDelete.length} collection resources`,
  )

  await transaction.collectionResource.deleteMany({
    where: {
      id: {
        in: collectionResourcesToDelete.map(({ id }) => id),
      },
    },
  })

  output(
    `-- Upserting ${legacyCollections.legacyCollectionResources.length} collection resources`,
  )

  const savedCollectionsToDelete = existingCollections.savedCollections.filter(
    (savedCollection) =>
      !legacyCollections.pinnedCollections.some(
        (legacyCollection) =>
          Number(legacyCollection.id) === savedCollection.legacyId,
      ),
  )

  output(`-- Deleting ${savedCollectionsToDelete.length} saved collections`)

  await transaction.savedCollection.deleteMany({
    where: {
      id: {
        in: savedCollectionsToDelete.map(({ id }) => id),
      },
    },
  })

  output(
    `-- Upserting ${legacyCollections.pinnedCollections.length} saved collections`,
  )

  const savedCollections = await Promise.all(
    legacyCollections.pinnedCollections.map((legacyPinnedCollection) => {
      const legacyId = Number(legacyPinnedCollection.collection_id)
      const collectionId = collectionIdFromLegacyId(legacyId)

      const savedById = userIdFromLegacyId(
        Number(legacyBaseOwnerFromLegacyBaseId(legacyPinnedCollection.base_id)),
      )

      // Base id is null if the base have been transformed into profile
      const baseId = legacyBasesIdsToTransformToProfile.has(
        Number(legacyPinnedCollection.base_id),
      )
        ? null
        : baseIdFromLegacyId(Number(legacyPinnedCollection.base_id))

      return transaction.savedCollection.upsert({
        where: { legacyId },
        create: {
          id: v4(),
          collectionId,
          legacyId,
          savedById,
          baseId,
        },
        update: {
          collectionId,
          savedById,
          baseId,
        },
        select: {
          id: true,
          collectionId: true,
        },
      })
    }),
  )

  await Promise.all(
    legacyCollections.legacyCollectionResources.map(
      (legacyCollectionResource) =>
        migrateCollectionResource({
          legacyCollectionResource,
          transaction,
          collectionIdFromLegacyId,
          resourceIdFromLegacyId,
        }),
    ),
  )

  // TODO get all pinned resources collections that should be created
  // Then upsert those that should be there
  // Then get all collectionResources that should be in those collections
  // Then delete those that should not be there anymore
  // Then create those that should be there

  const pinnedResourcesCollections = [
    ...legacyCollections.legacyBasesWithPinnedResources,
  ].map((legacyBaseId) => {
    const ownerId = userIdFromLegacyId(
      Number(legacyBaseOwnerFromLegacyBaseId(legacyBaseId)),
    )

    // baseId is null if the base have been transformed into profile
    const baseId = legacyBasesIdsToTransformToProfile.has(Number(legacyBaseId))
      ? null
      : baseIdFromLegacyId(Number(legacyBaseId))

    const collection = {
      legacyId: null,
      legacyPinnedResourcesBaseId: Number(legacyBaseId),
      title: 'Ressources enregistrées',
      description: '',
      ownerId,
      baseId,
      isPublic: false,
      updated: new Date(),
    } satisfies Parameters<typeof transaction.collection.upsert>[0]['update']

    const collectionResources = legacyCollections.pinnedResources
      .filter((pinnedResource) => pinnedResource.base_id === legacyBaseId)
      .map(
        (legacyPinnedResource) =>
          ({
            // This is a new collection, no legacy id
            legacyId: null,
            legacyPinnedResourcesId: Number(legacyPinnedResource.id),
            resourceId: resourceIdFromLegacyId(
              Number(legacyPinnedResource.resource_id),
            ),
          }) satisfies Parameters<
            typeof transaction.collectionResource.upsert
          >[0]['update'],
      )

    return {
      collection,
      collectionResources,
    }
  })

  output(
    `-- Upserting ${pinnedResourcesCollections.length} pinned resources collections`,
  )

  const upsertedPinnedResourcesCollections = await Promise.all(
    pinnedResourcesCollections.map(
      async ({ collection, collectionResources }) => {
        // Delete instead of upserting cikkectuibs
        await transaction.collectionResource.deleteMany({
          where: {
            collection: {
              legacyPinnedResourcesBaseId:
                collection.legacyPinnedResourcesBaseId,
            },
          },
        })

        const collectionResourcesCreateMany = {
          data: collectionResources.map((collectionResource) => ({
            id: v4(),
            ...collectionResource,
          })),
        }

        // Create the pinned collections
        const pinnedCollections = await transaction.collection.upsert({
          where: {
            legacyPinnedResourcesBaseId: collection.legacyPinnedResourcesBaseId,
          },
          create: {
            id: v4(),
            ...collection,
            resources: {
              createMany: collectionResourcesCreateMany,
            },
          },
          update: {
            ...collection,
            resources: {
              createMany: collectionResourcesCreateMany,
            },
          },
          select: { id: true, ownerId: true, legacyId: true },
        })

        return pinnedCollections
      },
    ),
  )

  return {
    collections: upserted,
    collectionIdFromLegacyId,
    savedCollections,
    upsertedPinnedResourcesCollections,
  }
}
