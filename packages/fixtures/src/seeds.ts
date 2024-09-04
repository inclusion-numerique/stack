import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { output } from '@app/fixtures/output'
import { fixtureUsers, teamAdministrateurs } from '@app/fixtures/users'
import { seedStructures } from '@app/fixtures/structures'
import { fixtureBeneficiaires } from '@app/fixtures/beneficiaires'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/activites'
import { upsertCraFixtures } from '@app/fixtures/upsertCraFixtures'

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
  await seedStructures(transaction)

  await Promise.all(
    fixtureUsers.map((user) =>
      transaction.user.upsert({
        where: { id: user.id },
        create: user,
        update: user,
      }),
    ),
  )

  await Promise.all(
    teamAdministrateurs.map((team) =>
      transaction.user.upsert({
        where: { id: team.id },
        create: team,
        update: team,
      }),
    ),
  )

  await Promise.all(
    fixtureBeneficiaires.map((beneficiaire) =>
      transaction.beneficiaire.upsert({
        where: { id: beneficiaire.id },
        create: beneficiaire,
        update: beneficiaire,
      }),
    ),
  )

  await upsertCraFixtures({
    transaction,
    crasIndividuels: fixtureCrasIndividuels,
    crasDemarchesAdministratives: fixtureCrasDemarchesAdministratives,
    crasCollectifs: fixtureCrasCollectifs,
  })
}

const main = async (eraseAllData: boolean) => {
  if (eraseAllData) {
    output.log('Erasing all data...')
    await deleteAll(prismaClient)
  }

  output.log(`Generating fixtures data`)
  await seed(prismaClient)
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
