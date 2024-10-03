import type { Prisma } from '@prisma/client'
import { fixtureUsers } from '@app/fixtures/users'

export const deleteAll = async (transaction: Prisma.TransactionClient) => {
  const tables = await transaction.$queryRaw<
    { table_name: string }[]
  >`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations'
      AND table_name != '_prisma_migrations_lock'`

  await transaction.$queryRawUnsafe(
    `TRUNCATE TABLE "${tables
      .map(({ table_name }) => table_name)
      .join('", "')}" CASCADE`,
  )

  return tables.map(({ table_name }) => table_name)
}

export const seed = async (transaction: Prisma.TransactionClient) => {
  await Promise.all(
    fixtureUsers.map((user) =>
      transaction.user.upsert({
        where: { id: user.id },
        create: user,
        update: user,
      }),
    ),
  )
}
