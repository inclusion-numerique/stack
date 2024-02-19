import React from 'react'
import StatistiquesGouvernances from '@app/web/app/(with-navigation)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceNational } from '@app/web/app/(with-navigation)/gouvernances/getStatistiquesGouvernances'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { getListeGouvernanceNational } from '@app/web/app/(with-navigation)/gouvernances/getListeGouvernances'
import GouvernanceList from '@app/web/app/(with-navigation)/gouvernances/GouvernanceList'
import SetLastVisitedGouvernanceScope from '@app/web/components/SetLastVisitedGouvernanceScope'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'

export const generateMetadata = () => ({
  title: metadataTitle(`Gouvernance · National`),
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async () => {
  const { access } = await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { national: true }, user }),
    signinNextPath: `/gouvernances/national`,
    throwNotFound: false,
  })

  const statistiquesGouvernance = await getStatistiquesGouvernanceNational()
  const scopeTitle = await getGouvernanceScopeTitle({ national: true })
  const gouvernances = await getListeGouvernanceNational()

  // Publicly available data
  if (!access) {
    return (
      <>
        <div className="fr-container fr-container--narrow fr-pt-15v">
          <h1 className="fr-h3">Gouvernances</h1>
        </div>
        <div className="fr-container fr-container--narrow fr-mt-8v">
          <div className="fr-background-alt--blue-france fr-width-full fr-border-radius--8 fr-p-8v fr-h6 fr-text--center">
            Veuillez sélectionner un département pour accéder à la gouvernance
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="fr-container fr-pb-20v">
      <StatistiquesGouvernances
        national
        statistiquesGouvernance={statistiquesGouvernance}
        scopeTitle={scopeTitle}
      />
      <hr className="fr-separator-12v" />
      <GouvernanceList scope={{ national: true }} gouvernances={gouvernances} />
      <SetLastVisitedGouvernanceScope scope={{ national: true }} />
    </div>
  )
}

export default Page
