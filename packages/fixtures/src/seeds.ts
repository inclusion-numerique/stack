import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { output } from '@app/fixtures/output'
import { fixtureUsers, teamAdministrateurs } from '@app/fixtures/users'
import { fixtureStructures } from '@app/fixtures/structures'
import { fixtureBeneficiaires } from '@app/fixtures/beneficiaires'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/cras'

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

export const upsertCrasFixtures = async ({
  transaction,
  crasCollectifs,
  crasDemarchesAdministratives,
  crasIndividuels,
}: {
  transaction: Prisma.TransactionClient
  crasIndividuels: typeof fixtureCrasIndividuels
  crasDemarchesAdministratives: typeof fixtureCrasDemarchesAdministratives
  crasCollectifs: typeof fixtureCrasCollectifs
}) => {
  const allCras = [
    ...crasIndividuels,
    ...crasDemarchesAdministratives,
    ...crasCollectifs,
  ]

  await Promise.all(
    crasIndividuels.map(({ cra }) =>
      transaction.craIndividuel.upsert({
        where: { id: cra.id },
        create: cra,
        update: cra,
      }),
    ),
  )

  await Promise.all(
    crasDemarchesAdministratives.map(({ cra }) =>
      transaction.craDemarcheAdministrative.upsert({
        where: { id: cra.id },
        create: cra,
        update: cra,
      }),
    ),
  )

  await Promise.all(
    crasCollectifs.map(({ participantsAnonymes }) =>
      transaction.participantsAnonymesCraCollectif.upsert({
        where: { id: participantsAnonymes.id },
        create: participantsAnonymes,
        update: participantsAnonymes,
      }),
    ),
  )

  await Promise.all(
    crasCollectifs.map(({ cra, participantsAnonymes }) =>
      transaction.craCollectif.upsert({
        where: { id: cra.id },
        create: { ...cra, participantsAnonymesId: participantsAnonymes.id },
        update: cra,
      }),
    ),
  )

  // Create participations for beneficiaires
  await Promise.all(
    crasCollectifs.flatMap(({ participants }) =>
      participants.map((participant) =>
        transaction.participantAtelierCollectif.upsert({
          where: { id: participant.id },
          create: participant,
          update: participant,
        }),
      ),
    ),
  )

  // Create activités for mediateurs
  await Promise.all(
    allCras.map(({ activiteMediateur }) =>
      transaction.activiteMediateur.upsert({
        where: { id: activiteMediateur.id },
        create: activiteMediateur,
        update: activiteMediateur,
      }),
    ),
  )

  // Create activités for beneficiaires
  await Promise.all(
    allCras.flatMap((fixture) =>
      'activiteBeneficiaire' in fixture
        ? [
            transaction.activiteBeneficiaire.upsert({
              where: { id: fixture.activiteBeneficiaire.id },
              create: fixture.activiteBeneficiaire,
              update: fixture.activiteBeneficiaire,
            }),
          ]
        : fixture.activitesBeneficiaire.map((activiteBeneficiaire) =>
            transaction.activiteBeneficiaire.upsert({
              where: { id: activiteBeneficiaire.id },
              create: activiteBeneficiaire,
              update: activiteBeneficiaire,
            }),
          ),
    ),
  )
}

const seed = async (transaction: Prisma.TransactionClient) => {
  await Promise.all(
    fixtureStructures.map((structure) =>
      transaction.structure.upsert({
        where: { id: structure.id },
        create: structure,
        update: structure,
      }),
    ),
  )

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

  await upsertCrasFixtures({
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
