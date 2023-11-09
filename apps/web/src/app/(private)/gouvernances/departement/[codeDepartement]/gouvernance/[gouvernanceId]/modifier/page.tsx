import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { canEditGouvernancePressentie } from '@app/web/security/securityRules'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'
import GouvernanceForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/GouvernanceForm'
import { gouvernanceFormSectionSideMenuItems } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import { getMembresOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'
import { getPerimetreEpciOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getPerimetreEpciOptions'
import { getGouvernanceFormDefaultValues } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormDefaultValues'

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
  const user = await checkUserAccessToGouvernanceScopeOrNavigate({
    codeDepartement,
  })

  if (
    !canEditGouvernancePressentie(user, { departementCode: codeDepartement })
  ) {
    notFound()
  }

  const gouvernance = await getGouvernanceForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  const [membreOptions, scopeTitle, perimetreEpciOptions] = await Promise.all([
    getMembresOptions({
      codeDepartement,
      gouvernanceId,
    }),
    getGouvernanceScopeTitle({ codeDepartement }),
    getPerimetreEpciOptions(codeDepartement),
  ])

  const defaultValues = getGouvernanceFormDefaultValues(gouvernance)

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Compléter une gouvernance"
          segments={[
            {
              label: "Page d'accueil",
              linkProps: {
                href: '/',
              },
            },
            {
              label: `Gouvernance - ${scopeTitle}`,
              linkProps: {
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-pb-10v fr-mb-20v">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-mb-8v">
            <NavigationSideMenu
              items={gouvernanceFormSectionSideMenuItems}
              burgerMenuButtonText="Sections"
              contentId="gouvernance-form"
              sticky
            />
          </div>
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-7 fr-col-xl-6">
            <BackLink href={gouvernanceHomePath({ codeDepartement })} />

            <GouvernanceForm
              codeRegion={gouvernance.departement.codeRegion}
              codeDepartement={codeDepartement}
              defaultValues={defaultValues}
              membreOptions={membreOptions}
              perimetreEpciOptions={perimetreEpciOptions}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
