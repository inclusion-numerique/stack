import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import type { Prisma } from '@prisma/client'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'
import { migrateContent } from '@app/migration/modelMigrations/migrateContent'

export const getLegacyResources = () =>
  migrationPrismaClient.main_resource.findMany({
    include: {
      main_basesection_resources: true,
      main_contentsection: true,
      main_contentblock: {
        include: {
          main_filecontent: true,
          main_linkcontent: true,
          main_linkedresourcecontent: true,
          main_textcontent: true,
          main_contentsection: {
            include: {
              main_contentblock: {
                include: {
                  main_contentsection: {
                    include: {
                      main_contentblock: {
                        include: {
                          main_contentsection: {
                            include: {
                              main_contentblock: {
                                include: {
                                  main_contentsection: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

export type LegacyResource = FindManyItemType<typeof getLegacyResources>

export const getExistingResourceSlugs = () =>
  prismaClient.resource
    .findMany({ select: { slug: true } })
    .then((resources) => new Set(resources.map((resource) => resource.slug)))

export type MigrateResourceInput = {
  legacyResource: LegacyResource
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  // Deduplicated slug
  slug: string
}

// I created a new resource with id 1336 in the legacy app to debug this migration
const debugLegacyResourceId = 1336

export const migrateResource = async ({
  legacyResource,
  slug,
  transaction,
  userIdFromLegacyId,
  baseIdFromLegacyId,
}: MigrateResourceInput) => {
  const legacyId = Number(legacyResource.id)

  if (debugLegacyResourceId === legacyId) {
    console.log('DEBUG RESOURCE')
    console.log('Resource', legacyResource)
    console.log('Sections', legacyResource.main_contentsection)
    console.log('Blocks', legacyResource.main_contentblock)
  }

  const data = {
    title: legacyResource.title,
    slug,
    description: legacyResource.description ?? '',
    createdById: userIdFromLegacyId(Number(legacyResource.creator_id)),
    baseId: legacyResource.root_base_id
      ? baseIdFromLegacyId(Number(legacyResource.root_base_id))
      : null,
    created: legacyResource.created,
    updated: legacyResource.modified,
  } satisfies Parameters<typeof transaction.resource.upsert>[0]['update']

  const resource = await transaction.resource.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, createdBy: true, legacyId: true },
  })

  // Instead of merging the content blocks, we delete all the existing ones and recreate them
  await transaction.content.deleteMany({ where: { resource: { legacyId } } })
  await Promise.all(
    legacyResource.main_contentblock
      .sort((a, b) => Number(a.order) - Number(b.order))
      .map((legacyContent, index) =>
        migrateContent({
          legacyResource,
          resource,
          legacyContent,
          transaction,
          order: index,
        }),
      ),
  )

  return resource
}
