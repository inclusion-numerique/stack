import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import CandidatsGouvernances from '@app/web/app/(private-with-navigation)/gouvernances/CandidatsGouvernances'
import { getCandidatsGouvernanceNational } from '@app/web/app/(private-with-navigation)/gouvernances/getCandidatsGouvernances'
import { gouvernanceHomePath } from '@app/web/app/(private-with-navigation)/gouvernances/gouvernancePaths'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private-with-navigation)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { getGouvernanceScopeTitle } from '@app/web/app/(private-with-navigation)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = () => ({
  title: `Candidats à la gouvernance - National`,
})

const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const candidatsGouvernance = await getCandidatsGouvernanceNational()
  const scopeTitle = await getGouvernanceScopeTitle({ national: true })

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
                  national: true,
                }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--medium fr-pb-20v">
        <CandidatsGouvernances
          scopeTitle={scopeTitle}
          national
          candidatsGouvernance={candidatsGouvernance}
        />
      </div>
    </>
  )
}

export default Page
