import React from 'react'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import espaceFranceNumeriqueEnsemblePageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/espaceFranceNumeriqueEnsemblePageData'
import { OutilEspaceFranceNumeriqueEnsemble } from './OutilEspaceFranceNumeriqueEnsemble'

export const metadata = {
  title: metadataTitle(
    `${espaceFranceNumeriqueEnsemblePageData.title} - Mes outils`,
  ),
}

const Page = async () => {
  const user = await getSessionUser()

  if (user?.mediateur?.id == null) {
    redirect('/connexion')
  }

  const employeStructure = await getStructureEmployeuseAddress(user.id)

  return (
    <OutilEspaceFranceNumeriqueEnsemble
      {...espaceFranceNumeriqueEnsemblePageData}
      codeInsee={employeStructure?.structure.codeInsee}
    />
  )
}

export default Page
