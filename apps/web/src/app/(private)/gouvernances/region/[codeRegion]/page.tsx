import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceRegion } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/region/generateRegionMetadata'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')
const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeRegion })

  const statistiquesGouvernance = await getStatistiquesGouvernanceRegion(
    codeRegion,
  )

  return (
    <div className="fr-container">
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
        statistiquesGouvernance={statistiquesGouvernance}
        codeRegion={codeRegion}
      />
    </div>
  )
}

export default Page
