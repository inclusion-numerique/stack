import { output } from '@app/cli/output'
import { FixCoordinationsV1Job } from '@app/web/jobs/fix-coordinations-v1/FixCoordinationsV1Job'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { prismaClient } from '@app/web/prismaClient'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { runPromisesSequentially } from '@app/web/utils/runPromisesSequentially'

export const executeFixCoordinationsV1 = async (
  _job: FixCoordinationsV1Job,
) => {
  const coordinateurs = await prismaClient.coordinateur.findMany({
    where: {
      mediateursCoordonnes: { some: {} },
    },
    select: {
      id: true,
      conseillerNumeriqueId: true,
      user: { select: { email: true, firstName: true, lastName: true } },
      mediateursCoordonnes: {
        select: {
          id: true,
          mediateur: { select: { conseillerNumerique: true, user: true } },
        },
      },
    },
  })

  const mongoCoordinateurs = await runPromisesSequentially(
    coordinateurs.map(({ conseillerNumeriqueId }) =>
      fetchConseillerNumeriqueV1Data({
        v1ConseillerId: conseillerNumeriqueId,
      }),
    ),
  ).then((coordinateursFromMongo) =>
    coordinateursFromMongo.filter(onlyDefinedAndNotNull),
  )

  // coordinations from our DB
  const coordinations = coordinateurs.flatMap((coordinateur) =>
    coordinateur.mediateursCoordonnes.map(({ id, mediateur }) => ({
      id,
      coordinateur: {
        id: coordinateur.id,
        conseillerNumeriqueV1Id: coordinateur.conseillerNumeriqueId,
        prenom: coordinateur.user.firstName,
        nom: coordinateur.user.lastName,
        email: coordinateur.user.email,
      },
      mediateur: {
        id: mediateur.conseillerNumerique?.mediateurId ?? '',
        conseillerNumeriqueV1Id: mediateur.conseillerNumerique?.id ?? '',
        prenom: mediateur.user.firstName,
        nom: mediateur.user.lastName,
        email: mediateur.user.email,
      },
    })),
  )

  const coordinationsFromMongo = mongoCoordinateurs.flatMap(
    (mongoCoordinateur) =>
      mongoCoordinateur.conseillersCoordonnes?.map(
        ({ id, prenom, nom, emailPro }) => ({
          coordinateurConseillerNumeriqueV1Id: mongoCoordinateur.conseiller.id,
          coordinateur: {
            id: mongoCoordinateur.conseiller.id,
            email: mongoCoordinateur.conseiller.emailPro,
            prenom: mongoCoordinateur.conseiller.prenom,
            nom: mongoCoordinateur.conseiller.nom,
          },
          conseillerNumerique: {
            id,
            prenom,
            nom,
            emailPro,
          },
        }),
      ) ?? [],
  )

  output(`We have ${coordinations.length} coordinations in our DB`)
  output(`There is ${coordinationsFromMongo.length} coordinations in mongo`)

  // Find all coordinations that are in our DB but not in mongo

  const deltaToDelete = coordinations.filter(
    (coordination) =>
      !coordinationsFromMongo.some(
        (mongoCoordination) =>
          // find the mongo coordination where both conseiller and coordinateur id are the same
          coordination.mediateur.conseillerNumeriqueV1Id ===
            mongoCoordination.conseillerNumerique.id &&
          coordination.coordinateur.conseillerNumeriqueV1Id ===
            mongoCoordination.coordinateur.id,
      ),
  )

  output(`We have a delta of ${deltaToDelete.length} coordinations to delete`)

  await closeMongoClient()

  await Promise.all(
    deltaToDelete.map(async ({ id }) => {
      await prismaClient.mediateurCoordonne.delete({
        where: {
          id,
        },
      })
    }),
  )

  output(`Deleted ${deltaToDelete.length} coordinations`)
}
