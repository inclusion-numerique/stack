import type { Metadata } from 'next'
import React from 'react'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { Accueil } from './Accueil'
import { getAccueilPageData } from './getAccueilPageData'

export const metadata: Metadata = {
  title: metadataTitle('Accueil'),
}

const Page = async () => {
  const user = await getAuthenticatedMediateur()

  const dashboardPageData = await getAccueilPageData(user.mediateur.id)

  return <Accueil {...user} {...dashboardPageData} />
}

export default Page
