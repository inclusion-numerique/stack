import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import CandidatsGouvernances from '@app/web/app/(private)/gouvernances/CandidatsGouvernances'
import { getCandidatsGouvernanceDepartement } from '@app/web/app/(private)/gouvernances/getCandidatsGouvernances'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata(
  'Candidats à la gouvernance',
)

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const candidatsGouvernance = await getCandidatsGouvernanceDepartement(
    codeDepartement,
  )

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
              label: 'Gouvernance',
              linkProps: {
                href: gouvernanceHomePath({
                  codeDepartement,
                }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--medium fr-pb-20v">
        <CandidatsGouvernances
          codeDepartement={codeDepartement}
          candidatsGouvernance={candidatsGouvernance}
        />
      </div>
    </>
  )
}

export default Page
