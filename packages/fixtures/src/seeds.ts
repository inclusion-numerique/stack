import { Command, InvalidArgumentError } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { bases } from './bases'
import { resources } from './resources'
import { users } from './users'

import TransactionClient = Prisma.TransactionClient

function myParseInt(value: string) {
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
}

const deleteAll = async (transaction: TransactionClient) => {
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

const seed = async (transaction: TransactionClient, random?: number) => {
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
    users.map((user) =>
      transaction.collection.create({
        data: {
          id: faker.string.uuid(),
          title: 'Mes favoris',
          ownerId: user.id as string,
          isPublic: false,
          isFavorites: true,
        },
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
    resources.map((resource) =>
      transaction.resource.upsert({
        where: { id: resource.id },
        create: resource,
        update: resource,
      }),
    ),
  )
}

const main = async (eraseAllData: boolean) => {
  await prismaClient.$transaction(
    async (transaction) => {
      if (eraseAllData) {
        console.log('Erasing all data...')
        await deleteAll(transaction)
      }

      console.log(`Generating fixtures data`)
      await seed(transaction)
    },
    { maxWait: 60_000 },
  )
  console.log(`Fixtures loaded successfully`)
}

const program = new Command()
  .option('-e, --erase-all-data', 'Erase all data', false)
  .option(
    '-r, --random [number]',
    'Number of random items to seed',
    myParseInt,
    0,
  )

program.parse()

const { eraseAllData } = program.opts()

main(eraseAllData)
  // eslint-disable-next-line promise/always-return
  .then(() => prismaClient.$disconnect())
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error)
    await prismaClient.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
