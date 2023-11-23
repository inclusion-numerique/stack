import React from 'react'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateRegionMetadata } from '@app/web/app/(private)/gouvernances/region/generateRegionMetadata'
import GouvernanceDetails from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/GouvernanceDetails'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateRegionMetadata('Gouvernance')

const Page = async ({
  params: { gouvernanceId },
}: {
  params: { gouvernanceId: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const gouvernance = await getGouvernanceForForm(gouvernanceId)
  const besoins = await getBesoinsEnIngenierieFinanciereForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }

  return (
    <GouvernanceDetails
      besoins={besoins}
      gouvernance={gouvernance}
      scope={{ national: true }}
    />
  )
}

export default Page
