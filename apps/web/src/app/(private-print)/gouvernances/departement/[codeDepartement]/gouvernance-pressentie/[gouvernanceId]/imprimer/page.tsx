import React from 'react'
import { notFound } from 'next/navigation'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { getGouvernancePressentieForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/getGouvernancePressentieForForm'
import GouvernancePrint from '@app/web/app/(private-print)/gouvernances/GouvernancePrint'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata(
  'Gouvernance pressentie',
)

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const gouvernance = await getGouvernancePressentieForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  return (
    <GouvernancePrint gouvernance={gouvernance} scope={{ codeDepartement }} />
  )
}

export default Page
