import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'

export const getLegacyUsers = () => migrationPrismaClient.main_user.findMany()

export type LegacyUser = FindManyItemType<typeof getLegacyUsers>

export type MigrateUserInput = {
  legacyUser: LegacyUser
  transaction: Prisma.TransactionClient
}

export const migrateUser = async ({
  legacyUser,
  transaction,
}: MigrateUserInput) => {
  const legacyId = Number(legacyUser.id)

  const data = {
    email: legacyUser.email,
    firstName: legacyUser.first_name,
    lastName: legacyUser.last_name,
    name: `${legacyUser.first_name} ${legacyUser.last_name}`.trim(),
    created: legacyUser.created,
    updated: legacyUser.modified,
  }

  return transaction.user.upsert({
    where: { legacyId },
    create: { id: v4(), legacyId, ...data },
    update: data,
    select: { id: true, legacyId: true },
  })
}
