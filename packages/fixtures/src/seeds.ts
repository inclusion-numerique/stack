import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { output } from '@app/web/utils/output'
import { collections } from '@app/fixtures/collections'
import { resourceContributors } from '@app/fixtures/resourceContributors'
import { baseMembers } from '@app/fixtures/baseMembers'
import { bases } from './bases'
import { resources } from './resources'
import { users } from './users'

const deleteAll = async (transaction: Prisma.TransactionClient) => {
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

const seed = async (transaction: Prisma.TransactionClient) => {
  await Promise.all(
    users.map((user) =>
      transaction.user.upsert({
        where: { id: user.id },
        create: user,
        update: user,
      }),
    ),
  )

  await Promise.all(
    bases.map((base) =>
      transaction.base.upsert({
        where: { id: base.id },
        create: base,
        update: base,
      }),
    ),
  )

  await Promise.all(
    baseMembers.map((baseMember) =>
      transaction.baseMembers.upsert({
        where: { id: baseMember.id },
        create: baseMember,
        update: baseMember,
      }),
    ),
  )

  await Promise.all(
    resources.map((resource) =>
      transaction.resource.upsert({
        where: { id: resource.id },
        create: resource,
        update: resource,
      }),
    ),
  )

  await Promise.all(
    resourceContributors.map((resourceContributor) =>
      transaction.resourceContributors.upsert({
        where: { id: resourceContributor.id },
        create: resourceContributor,
        update: resourceContributor,
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) =>
      transaction.collection.upsert({
        where: { id: collection.id },
        create: collection,
        update: collection,
      }),
    ),
  )
}

const main = async (eraseAllData: boolean) => {
  await prismaClient.$transaction(
    async (transaction) => {
      if (eraseAllData) {
        output.log('Erasing all data...')
        await deleteAll(transaction)
      }

      output.log(`Generating fixtures data`)
      await seed(transaction)
    },
    { maxWait: 60_000 },
  )
  output.log(`Fixtures loaded successfully`)
}

const program = new Command().option(
  '-e, --erase-all-data',
  'Erase all data from the database before seeding',
  false,
)

program.parse()

const { eraseAllData } = program.opts()

main(eraseAllData)
  // eslint-disable-next-line promise/always-return
  .then(() => prismaClient.$disconnect())
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    output.error(error)
    await prismaClient.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
