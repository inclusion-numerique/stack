import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import { getMesStatistiquesPageData } from './getMesStatistiquesPageData'
import { MesStatistiques } from './MesStatistiques'

export const metadata: Metadata = {
  title: metadataTitle('Mes statistiques'),
}

const MesStatistiquesPage = async () => {
  const user = await getAuthenticatedMediateur()
  const mesStatistiques = await getMesStatistiquesPageData(user.mediateur.id)
  const employeStructure = await getStructureEmployeuseAddress(user.id)

  return (
    <MesStatistiques
      {...mesStatistiques}
      codeInsee={employeStructure?.structure.codeInsee}
    />
  )
}

export default MesStatistiquesPage
