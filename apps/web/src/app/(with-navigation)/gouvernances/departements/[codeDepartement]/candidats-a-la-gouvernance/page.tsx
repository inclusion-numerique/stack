import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import CandidatsGouvernances from '@app/web/app/(with-navigation)/gouvernances/CandidatsGouvernances'
import { getCandidatsGouvernanceDepartement } from '@app/web/app/(with-navigation)/gouvernances/getCandidatsGouvernances'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import BackLink from '@app/web/components/BackLink'

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/candidats-a-la-gouvernance`,
  })

  const candidatsGouvernance =
    await getCandidatsGouvernanceDepartement(codeDepartement)
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  return (
    <>
      <div className="fr-container fr-container--medium fr-pt-15v">
        <BackLink
          href={gouvernanceHomePath({ codeDepartement })}
          label={`Retour à Gouvernance · ${scopeTitle}`}
        />
      </div>
      <div className="fr-container fr-container--medium fr-pb-20v">
        <CandidatsGouvernances
          codeDepartement={codeDepartement}
          candidatsGouvernance={candidatsGouvernance}
          scopeTitle={scopeTitle}
        />
      </div>
    </>
  )
}

export default Page
