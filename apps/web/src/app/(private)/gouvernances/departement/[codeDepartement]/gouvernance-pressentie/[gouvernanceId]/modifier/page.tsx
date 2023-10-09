import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import GouvernancePressentieForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/GouvernancePressentieForm'
import { getPorteurOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/getPorteurOptions'
import { getGouvernancePressentieForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/getGouvernancePressentieForForm'
import { canEditGouvernancePressentie } from '@app/web/security/securityRules'
import {
  getPorteurCode,
  GouvernancePressentieData,
} from '@app/web/gouvernance/GouvernancePressentie'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'

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

  const gouvernance = await getGouvernancePressentieForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  const optionsCollectivitesPorteur = await getPorteurOptions(codeDepartement)
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  const {
    id,
    departement,
    perimetre,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    porteurSiretInformations,
    porteurRegion,
    porteurDepartement,
    porteurEpci,
  } = gouvernance

  const porteurCode = porteurRegion
    ? getPorteurCode('region', porteurRegion.code)
    : porteurDepartement
    ? getPorteurCode('departement', porteurDepartement.code)
    : porteurEpci
    ? getPorteurCode('epci', porteurEpci.code)
    : undefined

  const gouvernancePressentie: DefaultValues<GouvernancePressentieData> = {
    id,
    departementCode: departement.code,
    noteDeContexte,
    porteurSiret: porteurSiretInformations?.siret ?? undefined,
    perimetre,
    porteurCode: porteurCode ?? '',
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
          currentPageLabel="Ajouter une gouvernance pressentie"
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
      <div className="fr-container fr-container--narrow fr-pb-10v fr-mb-20v">
        <BackLink href={gouvernanceHomePath({ codeDepartement })} />
        <GouvernancePressentieForm
          className="fr-mt-8v"
          gouvernancePressentie={gouvernancePressentie}
          optionsCollectivitesPorteur={optionsCollectivitesPorteur}
        />
      </div>
    </>
  )
}

export default Page
