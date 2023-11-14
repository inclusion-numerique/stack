import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceRegion } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateRegionMetadata } from '@app/web/app/(private)/gouvernances/region/generateRegionMetadata'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'
import { getListeGouvernanceRegion } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import GouvernanceList from '@app/web/app/(private)/gouvernances/GouvernanceList'

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
  const scopeTitle = await getGouvernanceScopeTitle({ codeRegion })
  const gouvernances = await getListeGouvernanceRegion(codeRegion)

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
      <GouvernanceList scope={{ codeRegion }} gouvernances={gouvernances} />
    </div>
  )
}

export default Page
