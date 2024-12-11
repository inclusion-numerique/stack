import type { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import { validateActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { mediateurHasActivites } from '@app/web/cra/activitesQueries'
import { getActivitesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesListPageData'
import MesActivitesListeLayout from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesTableauPage from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/tableau/MesActivitesTableauPage'
import MesActivitesListeEmptyPage from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeEmptyPage'
import MesActivitesListeHeader from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeHeader'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

const MesActivitesVueTableauPage = async ({
  searchParams: rawSearchParams = {},
}: {
  searchParams?: ActivitesDataTableSearchParams
}) => {
  const user = await authenticateMediateur()

  const hasActivites = await mediateurHasActivites({
    mediateurId: user.mediateur.id,
  })

  if (hasActivites) {
    const searchParams = validateActivitesFilters(rawSearchParams)
    const data = getActivitesListPageData({
      mediateurId: user.mediateur.id,
      searchParams,
    })

    const searchResultMatchesCount = data.then(
      ({ searchResult: { matchesCount } }) => matchesCount,
    )

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
        <MesActivitesListeHeader
          searchResultMatchesCount={searchResultMatchesCount}
          defaultFilters={searchParams}
          initialBeneficiairesOptions={initialBeneficiairesOptions}
          initialMediateursOptions={initialMediateursOptions}
          communesOptions={communesOptions}
          departementsOptions={departementsOptions}
          lieuxActiviteOptions={lieuxActiviteOptions}
          activiteDates={activiteDates}
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
