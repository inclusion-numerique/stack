import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceNational } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'
import GouvernanceList from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/GouvernanceList'

export const generateMetadata = () => ({
  title: `Gouvernance - National`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const statistiquesGouvernance = await getStatistiquesGouvernanceNational()
  const scopeTitle = await getGouvernanceScopeTitle({ national: true })

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
        national
        statistiquesGouvernance={statistiquesGouvernance}
        scopeTitle={scopeTitle}
      />
      <hr className="fr-separator-12v" />
      <GouvernanceList scope={{ national: true }} />
    </div>
  )
}

export default Page
