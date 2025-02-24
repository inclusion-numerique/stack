import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateMediateurOrCoordinateur } from '@app/web/auth/authenticateUser'
import type { Metadata } from 'next'
import React from 'react'
import { Accueil } from './Accueil'
import { getAccueilPageDataFor } from './getAccueilPageDataFor'

export const metadata: Metadata = {
  title: metadataTitle('Accueil'),
}

const Page = async () => {
  const user = await authenticateMediateurOrCoordinateur()

  const dashboardPageData = await getAccueilPageDataFor(user)

  return (
    <Accueil
      {...user}
      {...dashboardPageData}
      isMediateur={user.mediateur?.id != null}
      isCoordinateur={user.coordinateur?.id != null}
      isCoordinateurCoNum={user.coordinateur?.conseillerNumeriqueId != null}
      isCoNum={user.mediateur?.conseillerNumerique != null}
    />
  )
}

export default Page
