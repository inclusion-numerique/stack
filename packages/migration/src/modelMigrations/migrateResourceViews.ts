import { prismaClient } from '@app/web/prismaClient'
import { output } from '@app/cli/output'
import { chunk } from 'lodash'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { createVisitHash } from '@app/web/server/visitHash/createVisitHash'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'

export const getLegacyResourceViews = async () =>
  migrationPrismaClient.main_resourcevisit.findMany({})

export type LegacyResourceView = FindManyItemType<typeof getLegacyResourceViews>

export const getExistingResourceViews = async () => {
  const resourceViews = await prismaClient.resourceView.findMany({
    select: {
      hash: true,
      legacyId: true,
    },
    where: {
      legacyId: {
        not: null,
      },
    },
  })

  return { legacyIds: new Set(resourceViews.map(({ legacyId }) => legacyId)) }
}

export const transformResourceView = ({
  legacyResourceView,
  resourceIdFromLegacyId,
}: {
  legacyResourceView: LegacyResourceView
  resourceIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const newHash = createVisitHash(
    `${legacyResourceView.ip_hash}#${
      legacyResourceView.date.toISOString().split('T')[0]
    }`,
  )

  // It's ok to miss views on non migrated resources, we try catch
  try {
    const data = {
      hash: newHash,
      resourceId: resourceIdFromLegacyId(
        Number(legacyResourceView.instance_id),
      ),
      legacyId: Number(legacyResourceView.id),
      timestamp: legacyResourceView.date,
    } satisfies UpsertCreateType<typeof prismaClient.resourceView.create>

    return data
  } catch {
    // resourceIdFromLegacyId throws if resource does not exist
    return null
  }
}

export const migrateResourceViews = async ({
  resourceIdFromLegacyId,
}: {
  resourceIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const legacyResourceViews = await getLegacyResourceViews()
  output(`- Found ${legacyResourceViews.length} resourceViews to migrate`)
  const existingResourceViews = await getExistingResourceViews()
  output(
    `- Found ${existingResourceViews.legacyIds.size} already migrated resourceViews`,
  )

  // Legacy views are immutable so we can just create missing ones
  const resourceViewsData = legacyResourceViews
    .filter(
      (legacyResourceView) =>
        !existingResourceViews.legacyIds.has(Number(legacyResourceView.id)),
    )
    .map((legacyResourceView) =>
      transformResourceView({
        legacyResourceView,
        resourceIdFromLegacyId,
      }),
    )
    .filter(isDefinedAndNotNull)
  const chunkSize = 1000
  let migratedResourceViewCount = 0
  const upserted = await Promise.all(
    chunk(resourceViewsData, chunkSize).map((resourceViewChunk) =>
      prismaClient.resourceView
        .createMany({
          data: resourceViewChunk,
        })
        .then((resourceViews) => {
          migratedResourceViewCount += resourceViewChunk.length
          output(
            `-- ${migratedResourceViewCount} ${(
              (migratedResourceViewCount * 100) /
              legacyResourceViews.length
            ).toFixed(0)}%`,
          )
          return resourceViews
        }),
    ),
  )
  return upserted.flat()
}
