import React from 'react'
import { notFound } from 'next/navigation'
import {
  getDemandesSubventionsForForm,
  getGouvernanceForForm,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import GouvernancePrint from '@app/web/app/(print)/gouvernances/GouvernancePrint'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/gouvernance/${gouvernanceId}/imprimer`,
  })
  const gouvernance = await getGouvernanceForForm(gouvernanceId)
  const demandeDeSubvention = await getDemandesSubventionsForForm({
    gouvernanceId,
  })
  if (!gouvernance || !demandeDeSubvention) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }
  const besoins = await getBesoinsEnIngenierieFinanciereForForm(gouvernanceId)

  return (
    <GouvernancePrint
      besoins={besoins}
      demandeDeSubvention={demandeDeSubvention}
      gouvernance={gouvernance}
      scope={{ codeDepartement }}
    />
  )
}

export default Page
