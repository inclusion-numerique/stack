import React from 'react'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import GouvernancePrint from '@app/web/app/(private-print)/gouvernances/GouvernancePrint'
import { generateRegionMetadata } from '@app/web/app/(private)/gouvernances/region/generateRegionMetadata'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateRegionMetadata('Gouvernance')

const Page = async ({
  params: { codeRegion, gouvernanceId },
}: {
  params: { codeRegion: string; gouvernanceId: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeRegion })

  const gouvernance = await getGouvernanceForForm(gouvernanceId)
  const besoins = await getBesoinsEnIngenierieFinanciereForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.codeRegion !== codeRegion) {
    notFound()
  }

  return (
    <GouvernancePrint
      besoins={besoins}
      gouvernance={gouvernance}
      scope={{ codeRegion }}
    />
  )
}

export default Page
