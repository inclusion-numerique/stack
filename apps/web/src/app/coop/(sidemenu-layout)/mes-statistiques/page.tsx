import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import {
  type ActivitesFilters,
  validateActivitesFilters,
} from '@app/web/cra/ActivitesFilters'
import { mediateurCoordonnesIdsFor } from '@app/web/mediateurs/mediateurCoordonnesIdsFor'
import { authenticateMediateurOrCoordinateur } from '@app/web/auth/authenticateUser'
import { getMesStatistiquesPageData } from './getMesStatistiquesPageData'
import { MesStatistiques } from './MesStatistiques'

export const metadata: Metadata = {
  title: metadataTitle('Mes statistiques'),
}
const MesStatistiquesPage = async ({
  searchParams = {},
}: {
  searchParams?: ActivitesFilters & {
    graphique_fin?: string
  }
}) => {
  const user = await authenticateMediateurOrCoordinateur()

  const mesStatistiques = await getMesStatistiquesPageData({
    user,
    mediateurCoordonnesIds: mediateurCoordonnesIdsFor(user),
    activitesFilters: validateActivitesFilters(searchParams),
    graphOptions: {
      fin: searchParams.graphique_fin
        ? new Date(searchParams.graphique_fin)
        : undefined,
    },
  })

  const employeStructure = await getStructureEmployeuseAddress(user.id)

  return (
    <MesStatistiques
      user={user}
      {...mesStatistiques}
      codeInsee={employeStructure?.structure.codeInsee}
    />
  )
}

export default MesStatistiquesPage
