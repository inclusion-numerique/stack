import React from 'react'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(private-with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(private-with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'
import { generateRegionMetadata } from '@app/web/app/(private-with-navigation)/gouvernances/regions/generateRegionMetadata'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private-with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import GouvernancePrint from '@app/web/app/(private-print)/gouvernances/GouvernancePrint'

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
