import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { notFound } from 'next/navigation'
import { hasAccessToArchivesV1 } from '@app/web/app/coop/archives-v1/hasAccessToArchivesV1'
import { getArchivesV1PageData } from '@app/web/app/coop/archives-v1/getArchivesV1PageData'
import ArchivesV1PageContent from '@app/web/app/coop/archives-v1/ArchivesV1PageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ArchivesV1Page = async () => {
  const user = await getAuthenticatedMediateur()

  if (!hasAccessToArchivesV1(user)) {
    notFound()
    return null
  }

  const getCrasResult = await getArchivesV1PageData({ user })

  return <ArchivesV1PageContent data={getCrasResult} />
}

export default ArchivesV1Page
