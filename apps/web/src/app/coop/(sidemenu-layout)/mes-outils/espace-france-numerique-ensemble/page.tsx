import React from 'react'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import pageData from '../_data/espace-france-numerique-ensemble.json'
import { OutilEspaceFranceNumeriqueEnsemble } from './OutilEspaceFranceNumeriqueEnsemble'

export const metadata = {
  title: metadataTitle(`${pageData.title} - Mes outils`),
}

const Page = async () => {
  const user = await getSessionUser()

  if (user?.mediateur?.id == null) {
    redirect('/connexion')
  }

  const employeStructure = await getStructureEmployeuseAddress(user.id)

  return (
    <OutilEspaceFranceNumeriqueEnsemble
      {...pageData}
      codeInsee={employeStructure?.structure.codeInsee}
    />
  )
}

export default Page
