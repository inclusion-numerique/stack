import React from 'react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import {
  getDemandesSubventionsForForm,
  getGouvernanceForForm,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import GouvernanceDetails from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import GouvernancesHeader from '@app/web/app/(with-navigation)/gouvernances/GouvernancesHeader'
import { getDepartementNameAndCode } from '@app/web/data/getDepartementNameAndCode'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  const gouvernance = await getGouvernanceForForm(gouvernanceId)
  const demandeDeSubvention = await getDemandesSubventionsForForm({
    gouvernanceId,
  })
  const departement = await getDepartementNameAndCode(codeDepartement)

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  if (!gouvernance || !demandeDeSubvention) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  return (
    <>
      <GouvernancesHeader departement={departement} />
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Détails"
          segments={[
            {
              label: 'Page d’accueil',
              linkProps: {
                href: '/',
              },
            },
            {
              label: `Gouvernance · ${scopeTitle}`,
              linkProps: {
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <GouvernanceDetails
        print={false}
        demandeDeSubvention={demandeDeSubvention}
        gouvernance={gouvernance}
        scope={{ codeDepartement }}
        publicView={false}
      />
    </>
  )
}

export default Page
