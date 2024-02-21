import React from 'react'
import { notFound } from 'next/navigation'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import StatistiquesGouvernances from '@app/web/app/(with-navigation)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceDepartement } from '@app/web/app/(with-navigation)/gouvernances/getStatistiquesGouvernances'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { getListeGouvernanceDepartement } from '@app/web/app/(with-navigation)/gouvernances/getListeGouvernances'
import GouvernanceList from '@app/web/app/(with-navigation)/gouvernances/GouvernanceList'
import GouvernanceDetails from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/GouvernanceDetails'
import { getGouvernanceForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { getBesoinsEnIngenierieFinanciereForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getBesoinsIngenierieFinanciereForForm'
import NoGouvernancePublicView from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/NoGouvernancePublicView'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import { getSessionUser } from '@app/web/auth/getSessionUser'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const user = await getSessionUser()
  const writeAccess = await checkGouvernanceScopeWriteAccess({
    scope: { codeDepartement },
    user,
  })

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })
  const gouvernances = await getListeGouvernanceDepartement(codeDepartement)

  const publicView = !writeAccess

  // Publicly available data
  if (publicView) {
    const gouvernanceId = gouvernances.find(
      (item) => item.v2Enregistree !== null,
    )?.id

    if (!gouvernanceId) {
      return (
        <>
          <div className="fr-container fr-container--narrow fr-pt-15v">
            <h1 className="fr-h3">Gouvernance · {scopeTitle}</h1>
          </div>
          <NoGouvernancePublicView />
        </>
      )
    }

    const gouvernance = await getGouvernanceForForm(gouvernanceId)
    const besoins = await getBesoinsEnIngenierieFinanciereForForm(gouvernanceId)
    if (!gouvernance) {
      notFound()
    }
    return (
      <GouvernanceDetails
        gouvernance={gouvernance}
        besoins={besoins}
        publicView
        scope={{ codeDepartement }}
      />
    )
  }

  const statistiquesGouvernance =
    await getStatistiquesGouvernanceDepartement(codeDepartement)

  return (
    <div className="fr-container fr-pb-20v">
      <StatistiquesGouvernances
        codeDepartement={codeDepartement}
        statistiquesGouvernance={statistiquesGouvernance}
        scopeTitle={scopeTitle}
      />
      <hr className="fr-separator-12v" />
      <GouvernanceList
        scope={{ codeDepartement }}
        gouvernances={gouvernances}
      />
    </div>
  )
}

export default Page
