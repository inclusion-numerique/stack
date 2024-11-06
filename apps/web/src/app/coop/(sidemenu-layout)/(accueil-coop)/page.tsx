import type { Metadata } from 'next'
import React from 'react'
import { getAuthenticatedMediateurOrCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { mediateurCoordonnesIdsFor } from '@app/web/mediateurs/mediateurCoordonnesIdsFor'
import { Accueil } from './Accueil'
import { getAccueilPageData } from './getAccueilPageData'

export const metadata: Metadata = {
  title: metadataTitle('Accueil'),
}

const Page = async () => {
  const user = await getAuthenticatedMediateurOrCoordinateur()

  const dashboardPageData = await getAccueilPageData({
    user,
    mediateurCoordonnesIds: mediateurCoordonnesIdsFor(user),
  })

  return (
    <Accueil
      {...user}
      {...dashboardPageData}
      isMediateur={user.mediateur?.id != null}
      isCoordinateur={user.coordinateur?.id != null}
    />
  )
}

export default Page
