import { prismaClient } from '@app/web/prismaClient'
import { dataTablesToKeep } from '../support/helpers'

export const deleteAllData = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _emptyParametersNeededForTypesafety: Record<string, string>,
) => {
  const tables = await prismaClient.$queryRaw<
    { table_name: string }[]
  >`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations' 
      AND table_name != '_prisma_migrations_lock'
      AND table_name != 'app_data'
      `

  await prismaClient.$queryRawUnsafe(
    `TRUNCATE TABLE "${tables
      .map(({ table_name }) => table_name)
      .filter((table) => !dataTablesToKeep.includes(table))
      .join('", "')}" CASCADE`,
  )

  return tables.map(({ table_name }) => table_name)
}
