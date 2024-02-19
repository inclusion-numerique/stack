import React from 'react'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import GouvernanceDetails from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = () => ({
  title: `Gouvernance - National`,
})

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
