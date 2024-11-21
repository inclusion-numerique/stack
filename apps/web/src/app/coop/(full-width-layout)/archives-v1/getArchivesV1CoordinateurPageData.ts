import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { getArchivesV1PageData } from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'

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

  const ownData = await getArchivesV1PageData({
    conseillerNumeriqueV1Id: coordinateurV1Id,
  })

  const conseillersData = await Promise.all(
    conseillers.map(async (conseiller) => {
      const data = await getArchivesV1PageData({
        conseillerNumeriqueV1Id: conseiller.id,
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

  return {
    ownData,
    conseillersData: sortedConseillersData,
  }
}

export type ArchivesV1CoordinateurPageData = Awaited<
  ReturnType<typeof getArchivesV1CoordinateurPageData>
>
