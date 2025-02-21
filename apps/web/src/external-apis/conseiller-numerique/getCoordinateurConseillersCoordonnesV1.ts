import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { prismaClient } from '@app/web/prismaClient'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

export type ConseillerV1Coordones = { prenom: string; nom: string; id: string }

export const getCoordinateurConseillersCoordonnesV1 = async ({
  coordinateur: { conseillerNumeriqueId: coordinateurV1Id },
}: {
  coordinateur: { conseillerNumeriqueId: string }
}) => {
  const v1Data = coordinateurV1Id
    ? await fetchConseillerNumeriqueV1Data({
        v1ConseillerId: coordinateurV1Id,
      })
    : null

  if (!v1Data || !coordinateurV1Id) {
    throw new Error('No coordinateur found')
  }

  const conseillersCoordonnesV1 = (v1Data.conseillersCoordonnes ??
    []) satisfies ConseillerV1Coordones[]

  const coordinateurData: ConseillerV1Coordones = v1Data.conseiller

  // We need conseillers coordonnés from v2 équipe
  const coordonneesV2 = await prismaClient.mediateurCoordonne.findMany({
    where: {
      coordinateur: {
        conseillerNumeriqueId: coordinateurV1Id,
      },
    },
    select: {
      mediateur: {
        select: {
          conseillerNumerique: {
            select: {
              id: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  })
  const conseillersCoordonnesV2: ConseillerV1Coordones[] = coordonneesV2
    .map(({ mediateur }) => {
      if (!mediateur.conseillerNumerique?.id) {
        return null
      }

      return {
        id: mediateur.conseillerNumerique.id,
        prenom: mediateur.user.firstName ?? '',
        nom: mediateur.user.lastName ?? '',
      }
    })
    .filter(onlyDefinedAndNotNull)

  // we add conseillers for manually added conseillers v1
  const coordinateur = await prismaClient.coordinateur.findUnique({
    where: {
      conseillerNumeriqueId: coordinateurV1Id,
    },
  })
  const manuallyAddedConseillersV1Ids: string[] =
    coordinateur?.autresConseillersV1Coordonnes ?? []

  const manuallyAddedConseillers = (await Promise.all(
    manuallyAddedConseillersV1Ids.map(async (v1ConseillerId) => {
      const v1data = await fetchConseillerNumeriqueV1Data({ v1ConseillerId })

      if (!v1data) {
        return null
      }

      return v1data.conseiller
    }),
  ).then((conseillers) =>
    conseillers.filter(onlyDefinedAndNotNull),
  )) satisfies ConseillerV1Coordones[]

  // We aggregate all conseillers v1 we need for the archive page
  // And deduplicate them using a Map
  const conseillersCoordonnes = [
    ...new Map(
      [
        ...conseillersCoordonnesV1,
        coordinateurData,
        ...conseillersCoordonnesV2,
        ...manuallyAddedConseillers,
      ].map((conseiller) => [conseiller.id, conseiller]),
    ).values(),
  ] satisfies ConseillerV1Coordones[]

  const conseillersV1CoordonnesIds = conseillersCoordonnes.map(({ id }) => id)

  return {
    conseillersV1Coordonnes: conseillersCoordonnes,
    conseillersV1CoordonnesIds,
    coordinateur: coordinateurData,
  }
}
