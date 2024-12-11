import type { Metadata } from 'next'
import MesActivitesListeEmptyPage from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeEmptyPage'
import { getActivitesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesListPageData'
import MesActivitesListePage from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListePage'
import type { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import MesActivitesListeLayout from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeLayout'
import { validateActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { mediateurHasActivites } from '@app/web/cra/activitesQueries'
import MesActivitesListeHeader from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeHeader'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

export const metadata: Metadata = {
  title: metadataTitle('Mes activités'),
}

const MesActivitesPage = async ({
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
      initialBeneficiairesOptions,
      initialMediateursOptions,
      lieuxActiviteOptions,
      activiteDates,
    } = await getFiltersOptionsForMediateur({
      user,
      includeBeneficiaireId: searchParams.beneficiaire,
    })

    return (
      <MesActivitesListeLayout vue="liste">
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
        <MesActivitesListePage data={data} />
      </MesActivitesListeLayout>
    )
  }

  return (
    <MesActivitesListeLayout vue="liste">
      <MesActivitesListeEmptyPage />
    </MesActivitesListeLayout>
  )
}

export default MesActivitesPage
