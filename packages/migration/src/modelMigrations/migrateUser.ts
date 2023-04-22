import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { v4 } from 'uuid'
import { Prisma } from '@prisma/client'
import TransactionClient = Prisma.TransactionClient

export const getLegacyUsers = () => migrationPrismaClient.main_user.findMany()

export type LegacyUser = FindManyItemType<typeof getLegacyUsers>

export type MigrateUserInput = {
  legacyUser: LegacyUser
  transaction: { user: Pick<TransactionClient['user'], 'upsert'> }
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
  }

  return transaction.user.upsert({
    where: { legacyId },
    create: { id: v4(), legacyId, ...data },
    update: data,
    select: { id: true },
  })
}
