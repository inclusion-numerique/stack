import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import { getGouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { canEditGouvernancePressentie } from '@app/web/security/securityRules'
import {
  getPorteurCode,
  GouvernancePressentieData,
} from '@app/web/gouvernance/GouvernancePressentie'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'
import GouvernanceForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/GouvernanceForm'
import { gouvernanceFormSectionSideMenuItems } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import { getMembresOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'

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

  const membreOptions = await getMembresOptions({
    codeDepartement,
    gouvernanceId,
  })

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  const {
    id,
    departement,
    v1Perimetre,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    v1PorteurSiretInformations,
    v1PorteurRegion,
    v1PorteurDepartement,
    v1PorteurEpci,
  } = gouvernance

  const v1PorteurCode = v1PorteurRegion
    ? getPorteurCode('region', v1PorteurRegion.code)
    : v1PorteurDepartement
    ? getPorteurCode('departement', v1PorteurDepartement.code)
    : v1PorteurEpci
    ? getPorteurCode('epci', v1PorteurEpci.code)
    : undefined

  const gouvernancePressentie: DefaultValues<GouvernancePressentieData> = {
    id,
    departementCode: departement.code,
    noteDeContexte,
    v1PorteurSiret: v1PorteurSiretInformations?.siret ?? undefined,
    v1Perimetre,
    v1PorteurCode: v1PorteurCode ?? '',
    siretsRecruteursCoordinateurs:
      organisationsRecruteusesCoordinateurs.length === 0
        ? [{ siret: '' }]
        : organisationsRecruteusesCoordinateurs.map(
            ({ siretInformations: { siret } }) => ({ siret }),
          ),
  }

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
          <div className="fr-col-3">
            <NavigationSideMenu
              items={gouvernanceFormSectionSideMenuItems}
              burgerMenuButtonText="Sections"
              contentId="gouvernance-form"
              sticky
            />
          </div>
          <div className="fr-col-6">
            <BackLink href={gouvernanceHomePath({ codeDepartement })} />

            <GouvernanceForm
              gouvernance={gouvernancePressentie}
              membreOptions={membreOptions}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
