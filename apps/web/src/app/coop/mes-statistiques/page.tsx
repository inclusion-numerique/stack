import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import {
  type ActivitesFilters,
  validateActivitesFilters,
} from '@app/web/cra/ActivitesFilters'
import { getMesStatistiquesPageData } from './getMesStatistiquesPageData'
import { MesStatistiques } from './MesStatistiques'

export const metadata: Metadata = {
  title: metadataTitle('Mes statistiques'),
}

const MesStatistiquesPage = async ({
  searchParams = {},
}: {
  searchParams?: ActivitesFilters
}) => {
  const user = await getAuthenticatedMediateur()
  const mesStatistiques = await getMesStatistiquesPageData({
    mediateurId: user.mediateur.id,
    activitesFilters: validateActivitesFilters(searchParams),
  })
  const employeStructure = await getStructureEmployeuseAddress(user.id)

  return (
    <MesStatistiques
      {...mesStatistiques}
      codeInsee={employeStructure?.structure.codeInsee}
    />
  )
}

export default MesStatistiquesPage
