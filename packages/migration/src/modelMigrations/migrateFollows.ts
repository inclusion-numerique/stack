import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { output } from '@app/cli/output'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { legacyBasesIdsToTransformToProfile } from '@app/migration/modelMigrations/legacyBasesToTransformToProfile'
import { LegacyBaseOwnerFromLegacyBaseId } from '@app/migration/modelMigrations/getLegacyBaseOwnerFromLegacyBaseId'

export const getLegacyFollows = async () => {
  const follows = await migrationPrismaClient.main_basebookmark.findMany({})

  return follows
}

export type LegacyFollowsData = Awaited<ReturnType<typeof getLegacyFollows>>

export type LegacyFollow = LegacyFollowsData[number]

export const getExistingFollows = async () => {
  const baseFollows = await prismaClient.baseFollow.findMany({
    where: {
      legacyId: {
        not: null,
      },
    },
  })

  const profileFollows = await prismaClient.profileFollow.findMany({
    where: {
      legacyId: {
        not: null,
      },
    },
  })

  return {
    baseFollows,
    profileFollows,
  }
}

export type ExistingFollows = Awaited<ReturnType<typeof getExistingFollows>>

export type MigrateFollowInput = {
  legacyFollow: LegacyFollow
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  legacyBaseOwnerFromLegacyBaseId: LegacyBaseOwnerFromLegacyBaseId
}

export const migrateFollow = async ({
  legacyFollow,
  transaction,
  userIdFromLegacyId,
  baseIdFromLegacyId,
  legacyBaseOwnerFromLegacyBaseId,
}: MigrateFollowInput) => {
  const legacyId = Number(legacyFollow.id)

  const followerId = userIdFromLegacyId(Number(legacyFollow.user_id))

  if (legacyBasesIdsToTransformToProfile.has(Number(legacyFollow.base_id))) {
    // If base have been transformed into profile, the follow will be migrated to a profile follow

    const profileId = userIdFromLegacyId(
      Number(legacyBaseOwnerFromLegacyBaseId(legacyFollow.base_id)),
    )
    return transaction.profileFollow.upsert({
      where: {
        profileId_followerId: {
          profileId,
          followerId,
        },
      },
      create: {
        id: v4(),
        followerId,
        profileId,
        legacyId,
      },
      // maybe v2 has new follow so we merge them
      update: {
        legacyId,
      },
    })
  }

  // Same thing for base that have not been migrated to profile
  const baseId = baseIdFromLegacyId(Number(legacyFollow.base_id))

  return transaction.baseFollow.upsert({
    where: {
      baseId_followerId: {
        baseId,
        followerId,
      },
    },
    create: {
      id: v4(),
      followerId,
      baseId,
      legacyId,
    },
    // maybe v2 has new follow so we merge them
    update: {
      legacyId,
    },
  })
}

export type MigrateFollowsInput = {
  legacyFollows: LegacyFollowsData
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  legacyBaseOwnerFromLegacyBaseId: LegacyBaseOwnerFromLegacyBaseId
}

export const migrateFollows = async ({
  legacyFollows,
  userIdFromLegacyId,
  baseIdFromLegacyId,
  transaction,
  legacyBaseOwnerFromLegacyBaseId,
}: MigrateFollowsInput) => {
  const existingFollows = await getExistingFollows()

  const baseFollowsToDelete = existingFollows.baseFollows.filter(
    ({ legacyId }) =>
      !legacyFollows.some(
        (legacyFollow) => Number(legacyFollow.id) === legacyId,
      ),
  )
  const profileFollowsToDelete = existingFollows.profileFollows.filter(
    ({ legacyId }) =>
      !legacyFollows.some(
        (legacyFollow) => Number(legacyFollow.id) === legacyId,
      ),
  )

  output(`-- Deleting ${baseFollowsToDelete.length} base follows`)

  // Execute delete operation
  await transaction.baseFollow.deleteMany({
    where: {
      id: {
        in: baseFollowsToDelete.map(({ id }) => id),
      },
    },
  })

  output(`-- Deleting ${profileFollowsToDelete.length} profile follows`)

  // Execute delete operation
  await transaction.profileFollow.deleteMany({
    where: {
      id: {
        in: profileFollowsToDelete.map(({ id }) => id),
      },
    },
  })

  output(`-- Migrating ${legacyFollows.length} follows`)

  const follows = await Promise.all(
    legacyFollows.map((legacyFollow) =>
      migrateFollow({
        legacyFollow,
        transaction,
        userIdFromLegacyId,
        baseIdFromLegacyId,
        legacyBaseOwnerFromLegacyBaseId,
      }),
    ),
  )

  return { follows }
}
