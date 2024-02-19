import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import { getGouvernanceForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import GouvernanceForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceForm'
import { gouvernanceFormSectionSideMenuItems } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceFormSections'
import { getMembresOptions } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getMembresOptions'
import { getPerimetreEpciOptions } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getPerimetreEpciOptions'
import { getGouvernanceFormDefaultValues } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceFormDefaultValues'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import BackLink from '@app/web/components/BackLink'
import { canEditGouvernancePressentie } from '@app/web/security/securityRules'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getSessionUser } from '@app/web/auth/getSessionUser'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  const user = await getSessionUser()
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
              label: `Gouvernance · ${scopeTitle}`,
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
              className="fr-pb-30v"
              codeRegion={gouvernance.departement.codeRegion}
              codeDepartement={codeDepartement}
              defaultValues={defaultValues}
              membreOptions={membreOptions}
              perimetreEpciOptions={perimetreEpciOptions}
              v2Enregistree={!!gouvernance.v2Enregistree}
              priorisationBesoinsEnregistree={
                !!gouvernance.besoinsEnIngenierieFinanciere
                  ?.priorisationEnregistree
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
