import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { prismaClient } from '@app/web/prismaClient'

export const getLegacyBases = () => migrationPrismaClient.main_base.findMany()

export type LegacyBase = FindManyItemType<typeof getLegacyBases>

export const getExistingBaseSlugs = () =>
  prismaClient.base
    .findMany({ select: { slug: true } })
    .then((bases) => new Set(bases.map((base) => base.slug)))

export type MigrateBaseInput = {
  legacyBase: LegacyBase
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  // Deduplicated slug
  slug: string
}

export const migrateBase = async ({
  legacyBase,
  slug,
  transaction,
  userIdFromLegacyId,
}: MigrateBaseInput) => {
  const legacyId = Number(legacyBase.id)
  const data = {
    ownerId: userIdFromLegacyId(Number(legacyBase.owner_id)),
    title: legacyBase.title,
    description: legacyBase.description,
    slug,
    created: legacyBase.created,
    updated: legacyBase.modified,
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
