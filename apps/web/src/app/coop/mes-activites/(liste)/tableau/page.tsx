import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import MesActivitesListeEmptyPage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeEmptyPage'
import { getActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import type { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import MesActivitesListeLayout from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesTableauPage from '@app/web/app/coop/mes-activites/(liste)/tableau/MesActivitesTableauPage'
import { validateActivitesFilters } from '@app/web/cra/ActivitesFilters'
import ActivitesFilterTags from '@app/web/app/coop/mes-activites/(liste)/ActivitesFilterTags'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { mediateurHasActivites } from '@app/web/cra/activitesQueries'

const MesActivitesVueTableauPage = async ({
  searchParams: rawSearchParams = {},
}: {
  searchParams?: ActivitesDataTableSearchParams
}) => {
  const user = await getAuthenticatedMediateur()

  const hasActivites = await mediateurHasActivites({
    mediateurId: user.mediateur.id,
  })

  if (hasActivites) {
    const searchParams = validateActivitesFilters(rawSearchParams)
    const data = getActivitesListPageData({
      mediateurId: user.mediateur.id,
      searchParams,
    })

    const {
      communesOptions,
      departementsOptions,
      initialMediateursOptions,
      initialBeneficiairesOptions,
      lieuxActiviteOptions,
      activiteDates,
    } = await getFiltersOptionsForMediateur({
      user,
      includeBeneficiaireId: searchParams.beneficiaire,
    })

    return (
      <MesActivitesListeLayout vue="tableau">
        <ActivitesFilterTags
          defaultFilters={searchParams}
          initialMediateursOptions={initialMediateursOptions}
          initialBeneficiairesOptions={initialBeneficiairesOptions}
          lieuxActiviteOptions={lieuxActiviteOptions}
          communesOptions={communesOptions}
          departementsOptions={departementsOptions}
          minDate={activiteDates.first}
        />
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
