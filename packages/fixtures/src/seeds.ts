import type { Prisma } from '@prisma/client'
import { fixtureUsers, teamAdministrateurs } from '@app/fixtures/users'
import { seedStructures } from '@app/fixtures/structures'
import { fixtureBeneficiaires } from '@app/fixtures/beneficiaires'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/activites'
import { upsertCraFixtures } from '@app/fixtures/upsertCraFixtures'

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
