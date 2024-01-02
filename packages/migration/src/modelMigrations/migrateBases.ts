import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { createSlug } from '@app/web/utils/createSlug'
import type { Prisma } from '@prisma/client'
import { output } from '@app/cli/output'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import {
  computeSlugAndUpdateExistingSlugs,
  SlugToLegacyIdMap,
} from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { legacyBasesIdsToTransformToProfile } from '@app/migration/modelMigrations/legacyBasesToTransformToProfile'
import { sanitizeLegacyHtml } from '@app/migration/sanitizeLegacyHtml'

export const getLegacyBases = () => migrationPrismaClient.main_base.findMany()

export type LegacyBase = FindManyItemType<typeof getLegacyBases>

export const getExistingBases = async (): Promise<{
  slugMap: SlugToLegacyIdMap
  idMap: LegacyIdMap
}> => {
  const bases = await prismaClient.base.findMany({
    select: { slug: true, legacyId: true, id: true },
  })

  const slugMap = new Map<string, number | null>(
    bases.map(({ slug, legacyId }) => [slug, legacyId]),
  )

  const idMap = new Map<number, string>(
    bases
      .filter(
        (base): base is (typeof bases)[0] & { legacyId: number } =>
          !!base.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  return { slugMap, idMap }
}

export type ExistingBases = Awaited<ReturnType<typeof getExistingBases>>

export type MigrateBaseInput = {
  legacyBase: LegacyBase
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  userEmailFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  // Deduplicated slug
  slug: string
}

export const migrateBase = async ({
  legacyBase,
  slug,
  transaction,
  userIdFromLegacyId,
  userEmailFromLegacyId,
  imageIdFromLegacyId,
}: MigrateBaseInput) => {
  const legacyId = Number(legacyBase.id)

  const hasEmail = !!legacyBase.contact
  const email =
    legacyBase.contact || userEmailFromLegacyId(Number(legacyBase.owner_id))

  const data = {
    ownerId: userIdFromLegacyId(Number(legacyBase.owner_id)),
    title: legacyBase.title,
    description: legacyBase.description
      ? sanitizeLegacyHtml(legacyBase.description)
      : null,
    slug,
    titleDuplicationCheckSlug: createSlug(legacyBase.title),
    imageId: legacyBase.profile_image_id
      ? imageIdFromLegacyId(Number(legacyBase.profile_image_id))
      : null,
    coverImageId: legacyBase.cover_image_id
      ? imageIdFromLegacyId(Number(legacyBase.cover_image_id))
      : null,
    created: legacyBase.created,
    updated: legacyBase.modified,
    isPublic: legacyBase.state === 'public',
    email,
    emailIsPublic: hasEmail,
    facebook: legacyBase.social_media_facebook,
    linkedin: legacyBase.social_media_linkedin,
    twitter: legacyBase.social_media_twitter,
    website: legacyBase.website,
  } satisfies Parameters<typeof transaction.base.upsert>[0]['update']

  return transaction.base.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, ownerId: true, legacyId: true },
  })
}

export type MigrateBasesInput = {
  legacyBases: LegacyBase[]
  existingBases: ExistingBases
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  userEmailFromLegacyId: LegacyToNewIdHelper
}

export const migrateBases = async ({
  legacyBases,
  existingBases,
  userIdFromLegacyId,
  userEmailFromLegacyId,
  imageIdFromLegacyId,
}: MigrateBasesInput) => {
  // Filter out bases that will be migrated as profile only
  const legacyBasesNotTransformedToProfile = legacyBases.filter(
    (legacyBase) =>
      !legacyBasesIdsToTransformToProfile.has(Number(legacyBase.id)),
  )

  const legacyBasesIdsNotTransformedToProfile = new Set(
    legacyBasesNotTransformedToProfile.map((legacyBase) =>
      Number(legacyBase.id),
    ),
  )

  // Delete bases that exist and
  // - Are not in the legacy bases list
  // - Are in the list of bases to transform to profile
  const basesToDelete = [...existingBases.idMap].filter(([legacyId]) => {
    // Remove bases that will be migrated as profile only from migrations
    if (legacyBasesIdsToTransformToProfile.has(Number(legacyId))) {
      return true
    }
    // Remove bases that are not in the legacy bases list
    if (!legacyBasesIdsNotTransformedToProfile.has(legacyId)) {
      return true
    }
    return false
  })

  output(`-- Deleting ${basesToDelete.length} bases`)

  // Execute delete operation
  await prismaClient.base.deleteMany({
    where: {
      id: {
        in: basesToDelete.map(([, newId]) => newId),
      },
    },
  })

  output(`-- Upserting ${legacyBasesNotTransformedToProfile.length} bases`)

  // Create or update legacy bases
  const upsertOperations = await Promise.all(
    legacyBasesNotTransformedToProfile.map((legacyBase) => {
      const slug = computeSlugAndUpdateExistingSlugs(
        legacyBase,
        existingBases.slugMap,
      )
      return migrateBase({
        legacyBase,
        transaction: prismaClient,
        slug,
        userIdFromLegacyId,
        userEmailFromLegacyId,
        imageIdFromLegacyId,
      })
    }),
  )
  return upsertOperations
}
