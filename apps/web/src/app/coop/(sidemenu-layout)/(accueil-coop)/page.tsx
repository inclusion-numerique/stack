import type { Metadata } from 'next'
import React from 'react'
import { getAuthenticatedMediateurOrCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { Accueil } from './Accueil'
import { getAccueilPageDataFor } from './getAccueilPageDataFor'

export const metadata: Metadata = {
  title: metadataTitle('Accueil'),
}

const Page = async () => {
  const user = await getAuthenticatedMediateurOrCoordinateur()

  const dashboardPageData = await getAccueilPageDataFor(user)

  return (
    <Accueil
      {...user}
      {...dashboardPageData}
      isMediateur={user.mediateur?.id != null}
      isCoordinateur={user.coordinateur?.id != null}
      isCoNum={user.mediateur?.conseillerNumerique != null}
    />
  )
}

export default Page
