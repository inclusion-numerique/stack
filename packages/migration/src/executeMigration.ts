import {
  getLegacyUsers,
  migrateUser,
} from '@app/migration/modelMigrations/migrateUser'
import { prismaClient } from '@app/web/prismaClient'

export const executeMigration = async () => {
  const legacyUsers = await getLegacyUsers()
  // TODO Get other relevant data from legacy database

  const start = new Date()

  const result = await prismaClient.$transaction(async (transaction) => {
    const migratedUsers = await Promise.all(
      legacyUsers.map((legacyUser) => migrateUser({ legacyUser, transaction })),
    )
    // TODO Run other migrations

    return { migratedUsers }
  })

  const end = new Date()

  return { result, time: end.getTime() - start.getTime() }
}
