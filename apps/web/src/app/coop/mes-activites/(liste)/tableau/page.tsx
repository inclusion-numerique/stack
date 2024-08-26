import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import MesActivitesListeEmptyPage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeEmptyPage'
import { getActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import { activitesListWhere } from '@app/web/cra/searchActivite'
import { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import MesActivitesListeLayout from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesTableauPage from '@app/web/app/coop/mes-activites/(liste)/tableau/MesActivitesTableauPage'
import { validateActivitesFilters } from '@app/web/cra/ActivitesFilters'
import ActivitesFilterTags from '@app/web/app/coop/mes-activites/(liste)/ActivitesFilterTags'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

const MesActivitesVueTableauPage = async ({
  searchParams: rawSearchParams = {},
}: {
  searchParams?: ActivitesDataTableSearchParams
}) => {
  const user = await getAuthenticatedMediateur()

  const hasActivites = await prismaClient.activiteMediateur.count({
    where: activitesListWhere({ mediateurId: user.mediateur.id }),
    take: 1,
  })

  if (hasActivites) {
    const searchParams = validateActivitesFilters(rawSearchParams)
    const data = getActivitesListPageData({
      mediateurId: user.mediateur.id,
      searchParams,
    })

    const [
      { communesOptions, departementsOptions },
      initialBeneficiairesOptions,
      { lieuxActiviteOptions },
    ] = await Promise.all([
      getMediateurCommunesAndDepartementsOptions({
        mediateurId: user.mediateur.id,
      }),
      getInitialBeneficiairesOptionsForSearch({
        mediateurId: user.mediateur.id,
      }),
      getInitialLieuxActiviteOptionsForSearch({
        withMost: 'individuel',
        mediateurId: user.mediateur.id,
      }),
    ])

    return (
      <MesActivitesListeLayout vue="tableau">
        <ActivitesFilterTags
          defaultFilters={searchParams}
          initialBeneficiairesOptions={initialBeneficiairesOptions}
          lieuxActiviteOptions={lieuxActiviteOptions}
          communesOptions={communesOptions}
          departementsOptions={departementsOptions}
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
