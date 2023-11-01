import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import GouvernancePressentieForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/GouvernancePressentieForm'
import { getPorteurOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getPorteurOptions'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata(
  'Gouvernance pressentie',
)

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const optionsCollectivitesPorteur = await getPorteurOptions(codeDepartement)
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

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
          gouvernancePressentie={{
            departementCode: codeDepartement,
          }}
          optionsCollectivitesPorteur={optionsCollectivitesPorteur}
        />
      </div>
    </>
  )
}

export default Page
