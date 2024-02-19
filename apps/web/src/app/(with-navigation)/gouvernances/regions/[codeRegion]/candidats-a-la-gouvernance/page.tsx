import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { generateRegionMetadata } from '@app/web/app/(with-navigation)/gouvernances/regions/generateRegionMetadata'
import CandidatsGouvernances from '@app/web/app/(with-navigation)/gouvernances/CandidatsGouvernances'
import { getCandidatsGouvernanceRegion } from '@app/web/app/(with-navigation)/gouvernances/getCandidatsGouvernances'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateRegionMetadata(
  'Candidats à la gouvernance',
)

const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeRegion })

  const candidatsGouvernance = await getCandidatsGouvernanceRegion(codeRegion)
  const scopeTitle = await getGouvernanceScopeTitle({ codeRegion })

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Candidats à la gouvernance"
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
                href: gouvernanceHomePath({
                  codeRegion,
                }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--medium fr-pb-20v">
        <CandidatsGouvernances
          scopeTitle={scopeTitle}
          codeRegion={codeRegion}
          candidatsGouvernance={candidatsGouvernance}
        />
      </div>
    </>
  )
}

export default Page
