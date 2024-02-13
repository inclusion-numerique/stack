import React from 'react'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import GouvernanceDetails from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'
import { generateRegionMetadata } from '@app/web/app/(private)/gouvernances/regions/generateRegionMetadata'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'

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
    <GouvernanceDetails
      besoins={besoins}
      gouvernance={gouvernance}
      scope={{ codeRegion }}
    />
  )
}

export default Page
