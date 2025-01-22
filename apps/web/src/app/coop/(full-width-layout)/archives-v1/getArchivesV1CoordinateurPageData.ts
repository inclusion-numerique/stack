import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import {
  getArchivesV1PageData,
  getArchivesV1PageDataWithCras,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'
import { getCrasV1Communes } from '@app/web/app/coop/(full-width-layout)/archives-v1/crasConseillerNumeriqueV1Queries'
import { prismaClient } from '@app/web/prismaClient'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

type ConseillerCoordoneListData = { prenom: string; nom: string; id: string }

export const getArchivesV1CoordinateurPageData = async ({
  coordinateurV1Id,
}: {
  coordinateurV1Id: string
}) => {
  const v1Data = await fetchConseillerNumeriqueV1Data({
    v1ConseillerId: coordinateurV1Id,
  })

  if (!v1Data) {
    throw new Error('No coordinateur found')
  }

  const ownData = await getArchivesV1PageDataWithCras({
    conseillerNumeriqueIds: [coordinateurV1Id],
  })

  const conseillersCoordonnesV1 = (v1Data.conseillersCoordonnes ??
    []) satisfies ConseillerCoordoneListData[]

  const coordinateurData: ConseillerCoordoneListData = v1Data.conseiller

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
  const conseillersCoordonnesV2: ConseillerCoordoneListData[] = coordonneesV2
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
  )) satisfies ConseillerCoordoneListData[]

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
  ] satisfies ConseillerCoordoneListData[]

  const conseillersCoordonnesIds = conseillersCoordonnes.map(({ id }) => id)

  const aggregatedData = await getArchivesV1PageDataWithCras({
    conseillerNumeriqueIds: conseillersCoordonnesIds,
  })

  const conseillersData = await Promise.all(
    conseillersCoordonnes
      // own coordo data is not needed here
      .filter(({ id }) => id !== coordinateurV1Id)
      .map(async (conseiller) => {
        const data = await getArchivesV1PageData({
          conseillerNumeriqueIds: [conseiller.id],
        })

        return {
          data,
          conseiller,
        }
      }),
  )

  // sort by conseiller.nom asc
  const sortedConseillersData = conseillersData.sort((a, b) =>
    a.conseiller.nom.localeCompare(b.conseiller.nom),
  )

  const communes = await getCrasV1Communes({
    conseillerNumeriqueIds: conseillersCoordonnesIds,
  })

  const communesData = await Promise.all(
    communes.map(async (commune) => {
      const data = await getArchivesV1PageData({
        codeCommune: commune.codeInsee,
        conseillerNumeriqueIds: conseillersCoordonnesIds,
      })
      return {
        commune,
        data,
      }
    }),
  )

  const sortedCommunesData = communesData.sort((a, b) =>
    a.commune.nom.localeCompare(b.commune.nom),
  )

  return {
    ownData,
    aggregatedData,
    conseillersData: sortedConseillersData,
    communesData: sortedCommunesData,
    coordinateurV1Id,
  }
}

export type ArchivesV1CoordinateurPageData = Awaited<
  ReturnType<typeof getArchivesV1CoordinateurPageData>
>
