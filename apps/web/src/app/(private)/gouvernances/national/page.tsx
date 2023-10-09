import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceNational } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getListeGouvernanceNational } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import GouvernanceCard from '@app/web/app/(private)/gouvernances/GouvernanceCard'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'

export const generateMetadata = () => ({
  title: `Gouvernance - National`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const statistiquesGouvernance = await getStatistiquesGouvernanceNational()
  const gouvernances = await getListeGouvernanceNational()
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
      <h3 className="fr-mb-12v">
        Gouvernances et porteurs pressentis des feuilles de route locales France
        Numérique Ensemble au niveau national
      </h3>
      {gouvernances.length === 0 && (
        <p>Aucune gouvernance pressentie n’a été remontée pour le moment</p>
      )}
      {gouvernances.map((gouvernance) => (
        <GouvernanceCard
          key={gouvernance.id}
          gouvernance={gouvernance}
          scope={{ national: true }}
        />
      ))}
    </div>
  )
}

export default Page
