import React from 'react'
import { notFound } from 'next/navigation'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernancePressentieForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/getGouvernancePressentieForForm'
import GouvernancePrint from '@app/web/app/(private-print)/gouvernances/GouvernancePrint'
import { generateRegionMetadata } from '@app/web/app/(private)/gouvernances/region/generateRegionMetadata'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateRegionMetadata('Gouvernance pressentie')

const Page = async ({
  params: { codeRegion, gouvernanceId },
}: {
  params: { codeRegion: string; gouvernanceId: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeRegion })

  const gouvernance = await getGouvernancePressentieForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.codeRegion !== codeRegion) {
    notFound()
  }

  return <GouvernancePrint gouvernance={gouvernance} scope={{ codeRegion }} />
}

export default Page
