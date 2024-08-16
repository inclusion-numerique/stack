import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import MesActivitesListeEmptyPage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeEmptyPage'
import { getActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import { activitesListWhere } from '@app/web/cra/searchActivite'
import { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import MesActivitesListeLayout from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesTableauPage from '@app/web/app/coop/mes-activites/(liste)/tableau/MesActivitesTableauPage'

const MesActivitesVueTableauPage = async ({
  searchParams = {},
}: {
  searchParams?: ActivitesDataTableSearchParams
}) => {
  const user = await getAuthenticatedMediateur()

  const hasActivites = await prismaClient.activiteMediateur.count({
    where: activitesListWhere({ mediateurId: user.mediateur.id }),
    take: 1,
  })

  if (hasActivites) {
    const data = await getActivitesListPageData({
      mediateurId: user.mediateur.id,
      searchParams,
    })

    return (
      <MesActivitesListeLayout vue="tableau">
        <MesActivitesTableauPage data={data} />
      </MesActivitesListeLayout>
    )
  }

  return (
    <MesActivitesListeLayout vue="tableau">
      <MesActivitesListeEmptyPage />
    </MesActivitesListeLayout>
  )
}

export default MesActivitesVueTableauPage
