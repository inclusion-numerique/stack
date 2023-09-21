import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceNational } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import WorkInProgressNotice from '@app/web/components/WorkInProgressNotice'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'

export const generateMetadata = () => ({
  title: `Gouvernance - National`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const statistiquesGouvernance = await getStatistiquesGouvernanceNational()

  return (
    <div className="fr-container fr-pb-20v">
      <Breadcrumb
        currentPageLabel="Gouvernance"
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
      />
      <hr className="fr-separator-12v" />
      <h3 className="fr-mb-12v">
        Gouvernances et porteurs pressentis des feuilles de route locales France
        Numérique Ensemble au niveau national
      </h3>
      <WorkInProgressNotice />
    </div>
  )
}

export default Page
