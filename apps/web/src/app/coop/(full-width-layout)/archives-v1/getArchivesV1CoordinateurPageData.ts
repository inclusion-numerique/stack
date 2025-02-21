import { getCrasV1Communes } from '@app/web/app/coop/(full-width-layout)/archives-v1/crasConseillerNumeriqueV1Queries'
import {
  getArchivesV1PageData,
  getArchivesV1PageDataWithCras,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { getCoordinateurConseillersCoordonnesV1 } from '@app/web/external-apis/conseiller-numerique/getCoordinateurConseillersCoordonnesV1'

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

  const { conseillersV1Coordonnes, conseillersV1CoordonnesIds, coordinateur } =
    await getCoordinateurConseillersCoordonnesV1({
      coordinateur: {
        conseillerNumeriqueId: coordinateurV1Id,
      },
    })

  const conseillersV1CoordonnesIdsWithCoordinateur = [
    ...conseillersV1CoordonnesIds,
    coordinateur.id,
  ]

  const aggregatedData = await getArchivesV1PageDataWithCras({
    conseillerNumeriqueIds: conseillersV1CoordonnesIdsWithCoordinateur,
  })

  const conseillersData = await Promise.all(
    conseillersV1Coordonnes.map(async (conseiller) => {
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
    conseillerNumeriqueIds: conseillersV1CoordonnesIdsWithCoordinateur,
  })

  const communesData = await Promise.all(
    communes.map(async (commune) => {
      const data = await getArchivesV1PageData({
        codeCommune: commune.codeInsee,
        conseillerNumeriqueIds: conseillersV1CoordonnesIdsWithCoordinateur,
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
