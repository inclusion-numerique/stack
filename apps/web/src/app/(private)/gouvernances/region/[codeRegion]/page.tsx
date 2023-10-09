import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceRegion } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import GouvernanceCard from '@app/web/app/(private)/gouvernances/GouvernanceCard'
import { getListeGouvernanceRegion } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import { generateRegionMetadata } from '@app/web/app/(private)/gouvernances/region/generateRegionMetadata'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateRegionMetadata('Gouvernance')
const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeRegion })

  const statistiquesGouvernance =
    await getStatistiquesGouvernanceRegion(codeRegion)
  const gouvernances = await getListeGouvernanceRegion(codeRegion)
  const scopeTitle = await getGouvernanceScopeTitle({ codeRegion })

  return (
    <div className="fr-container fr-mb-20v">
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
        statistiquesGouvernance={statistiquesGouvernance}
        codeRegion={codeRegion}
        scopeTitle={scopeTitle}
      />
      <hr className="fr-separator-12v" />
      <h3 className="fr-mb-12v">
        Gouvernances et porteurs pressentis des feuilles de route locales France
        Numérique Ensemble au sein de votre région
      </h3>
      {gouvernances.length === 0 && (
        <p>Aucune gouvernance pressentie n’a été remontée pour le moment</p>
      )}
      {gouvernances.map((gouvernance) => (
        <GouvernanceCard
          key={gouvernance.id}
          gouvernance={gouvernance}
          scope={{ codeRegion }}
        />
      ))}
    </div>
  )
}

export default Page
