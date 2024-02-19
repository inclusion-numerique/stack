import React from 'react'
import CandidatsGouvernances from '@app/web/app/(with-navigation)/gouvernances/CandidatsGouvernances'
import { getCandidatsGouvernanceNational } from '@app/web/app/(with-navigation)/gouvernances/getCandidatsGouvernances'
import { gouvernanceHomePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import BackLink from '@app/web/components/BackLink'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = () => ({
  title: `Candidats à la gouvernance · National`,
})

const Page = async () => {
  await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { national: true }, user }),
    signinNextPath: `/gouvernances/national/candidats-a-la-gouvernance`,
  })
  const candidatsGouvernance = await getCandidatsGouvernanceNational()
  const scopeTitle = await getGouvernanceScopeTitle({ national: true })

  return (
    <>
      <div className="fr-container fr-container--medium fr-pt-15v">
        <BackLink
          href={gouvernanceHomePath({ national: true })}
          label="Retour à Gouvernance · National"
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
