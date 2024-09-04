import type { Prisma } from '@prisma/client'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/activites'

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

  // First we upsert all the activites
  await Promise.all(
    allCras.map(({ activite }) =>
      transaction.activite.upsert({
        where: { id: activite.id },
        create: activite,
        update: activite,
      }),
    ),
  )

  // Then we delete and recreate the accompagnements
  const activiteIds = allCras.map(({ activite }) => activite.id)

  await transaction.accompagnement.deleteMany({
    where: {
      activiteId: {
        in: activiteIds,
      },
    },
  })

  // Delete the anonymous beneficiaires created for the participants anonymes
  // of the cra collectifs
  await transaction.beneficiaire.deleteMany({
    where: {
      anonyme: true,
      attributionsAleatoires: true,
      accompagnements: {
        every: {
          activiteId: {
            in: activiteIds,
          },
        },
      },
    },
  })

  // Recreate the anonymous beneficiaires created for the participants anonymes

  const beneficiairesAnonymesData = crasCollectifs.flatMap(
    ({ beneficiairesAnonymes }) => beneficiairesAnonymes,
  )

  await transaction.beneficiaire.createMany({
    data: beneficiairesAnonymesData,
  })

  const accompagnementsData = allCras.flatMap(
    ({ accompagnements }) => accompagnements,
  )

  // Recreate the accompagnements
  await transaction.accompagnement.createMany({
    data: accompagnementsData,
  })
}
