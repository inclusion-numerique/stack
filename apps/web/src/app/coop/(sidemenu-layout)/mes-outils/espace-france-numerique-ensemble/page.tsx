import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import espaceFranceNumeriqueEnsemblePageData from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_data/espaceFranceNumeriqueEnsemblePageData'
import { authenticateMediateurOrCoordinateur } from '@app/web/auth/authenticateUser'
import { OutilEspaceFranceNumeriqueEnsemble } from './OutilEspaceFranceNumeriqueEnsemble'

export const metadata = {
  title: metadataTitle(
    `${espaceFranceNumeriqueEnsemblePageData.title} - Mes outils`,
  ),
}

const Page = async () => {
  const user = await authenticateMediateurOrCoordinateur()

  const employeStructure = await getStructureEmployeuseAddress(user.id)

  return (
    <OutilEspaceFranceNumeriqueEnsemble
      {...espaceFranceNumeriqueEnsemblePageData}
      codeInsee={employeStructure?.structure.codeInsee}
    />
  )
}

export default Page
