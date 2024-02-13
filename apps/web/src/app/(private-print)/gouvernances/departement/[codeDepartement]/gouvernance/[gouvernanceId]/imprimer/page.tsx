import React from 'react'
import { notFound } from 'next/navigation'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departements/generateDepartementMetadata'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import GouvernancePrint from '@app/web/app/(private-print)/gouvernances/GouvernancePrint'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const gouvernance = await getGouvernanceForForm(gouvernanceId)
  const besoins = await getBesoinsEnIngenierieFinanciereForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  return (
    <GouvernancePrint
      besoins={besoins}
      gouvernance={gouvernance}
      scope={{ codeDepartement }}
    />
  )
}

export default Page
