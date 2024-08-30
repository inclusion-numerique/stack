import type { Prisma } from '@prisma/client'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/cras'

export const upsertCraFixtures = async ({
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
