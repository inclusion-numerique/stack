import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getArchivesV1PageData } from '@app/web/app/coop/(sidemenu-layout)/archives-v1/getArchivesV1PageData'
import ArchivesV1PageContent from '@app/web/app/coop/(sidemenu-layout)/archives-v1/ArchivesV1PageContent'
import { isAuthenticatedConseillerNumerique } from '@app/web/auth/getAuthenticatedConseillerNumerique'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ArchivesV1Page = async () => {
  const user = await getAuthenticatedMediateur()

  if (!isAuthenticatedConseillerNumerique(user)) {
    notFound()
    return null
  }

  const getCrasResult = await getArchivesV1PageData({
    conseillerNumeriqueId: user.mediateur.conseillerNumerique.id,
  })

  return <ArchivesV1PageContent data={getCrasResult} />
}

export default ArchivesV1Page
