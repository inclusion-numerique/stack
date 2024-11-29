import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import {
  getArchivesV1PageData,
  getArchivesV1PageDataWithCras,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'
import { getCrasV1Communes } from '@app/web/app/coop/(full-width-layout)/archives-v1/crasConseillerNumeriqueV1Queries'
import { getConseillerCoordonnesIds } from '@app/web/v1/v1CraQueries'

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

  const conseillers = v1Data.conseillersCoordonnes ?? []

  const ownData = await getArchivesV1PageDataWithCras({
    conseillerNumeriqueIds: [coordinateurV1Id],
  })

  const conseillersCoordonnesIds = await getConseillerCoordonnesIds({
    coordinateurV1Id,
    includeCoordinateur: true,
  })
  const aggregatedData = await getArchivesV1PageDataWithCras({
    conseillerNumeriqueIds: conseillersCoordonnesIds,
  })

  const conseillersData = await Promise.all(
    conseillers.map(async (conseiller) => {
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
    conseillerNumeriqueIds: [
      coordinateurV1Id,
      ...conseillers.map(({ id }) => id),
    ],
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
