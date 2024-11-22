import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getArchivesV1PageDataWithCras } from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'
import ArchivesV1PageContent from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1PageContent'
import { isAuthenticatedConseillerNumerique } from '@app/web/auth/getAuthenticatedConseillerNumerique'
import ArchivesV1CoordinateurPageContent from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1CoordinateurPageContent'
import { getArchivesV1CoordinateurPageData } from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1CoordinateurPageData'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ArchivesV1Page = async () => {
  const user = await getAuthenticatedMediateur()

  if (!isAuthenticatedConseillerNumerique(user)) {
    notFound()
    return null
  }

  const coordinateurV1Id = user.coordinateur?.conseillerNumeriqueId

  if (coordinateurV1Id) {
    const archivesV1CoordinateurPageData =
      await getArchivesV1CoordinateurPageData({
        coordinateurV1Id,
      })

    return (
      <ArchivesV1CoordinateurPageContent
        data={archivesV1CoordinateurPageData}
      />
    )
  }

  const conseillerNumeriqueId = user.mediateur.conseillerNumerique.id

  const archivesV1PageData = await getArchivesV1PageDataWithCras({
    conseillerNumeriqueIds: [conseillerNumeriqueId],
  })

  return (
    <ArchivesV1PageContent
      data={archivesV1PageData}
      conseillerNumeriqueV1Id={conseillerNumeriqueId}
    />
  )
}

export default ArchivesV1Page
