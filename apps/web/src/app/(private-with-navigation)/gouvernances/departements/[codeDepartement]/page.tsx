import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { generateDepartementMetadata } from '@app/web/app/(private-with-navigation)/gouvernances/departements/generateDepartementMetadata'
import StatistiquesGouvernances from '@app/web/app/(private-with-navigation)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceDepartement } from '@app/web/app/(private-with-navigation)/gouvernances/getStatistiquesGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private-with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(private-with-navigation)/gouvernances/gouvernanceScopeTitle'
import { getListeGouvernanceDepartement } from '@app/web/app/(private-with-navigation)/gouvernances/getListeGouvernances'
import GouvernanceList from '@app/web/app/(private-with-navigation)/gouvernances/GouvernanceList'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const statistiquesGouvernance =
    await getStatistiquesGouvernanceDepartement(codeDepartement)

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })
  const gouvernances = await getListeGouvernanceDepartement(codeDepartement)

  return (
    <div className="fr-container fr-pb-20v">
      <Breadcrumb
        currentPageLabel={`Gouvernance - ${scopeTitle}`}
        segments={[
          {
            label: "Page d'accueil",
            linkProps: {
              href: '/',
            },
          },
        ]}
      />
      <StatistiquesGouvernances
        codeDepartement={codeDepartement}
        statistiquesGouvernance={statistiquesGouvernance}
        scopeTitle={scopeTitle}
      />
      <hr className="fr-separator-12v" />
      <GouvernanceList
        scope={{ codeDepartement }}
        gouvernances={gouvernances}
      />
    </div>
  )
}

export default Page
