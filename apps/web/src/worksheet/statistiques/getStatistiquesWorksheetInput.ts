import { SessionUser } from '@app/web/auth/sessionUser'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { getMesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import type { BuildStatistiquesWorksheetInput } from '@app/web/worksheet/statistiques/buildStatistiquesWorksheet'

const mediateurCoordonnesIdsFor = (user: SessionUser) =>
  (user.coordinateur?.mediateursCoordonnes ?? []).map(
    ({ mediateurId }) => mediateurId,
  )

export const getStatistiquesWorksheetInput = async ({
  user,
  filters,
}: {
  user: SessionUser
  filters: ActivitesFilters
}): Promise<BuildStatistiquesWorksheetInput> => {
  const mediateurCoordonnesIds = mediateurCoordonnesIdsFor(user)

  const statistiques = await getMesStatistiquesPageData({
    user,
    mediateurCoordonnesIds,
    activitesFilters: filters,
  })

  const {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    initialMediateursOptions,
    lieuxActiviteOptions,
  } = await getFiltersOptionsForMediateur({
    user,
    mediateurCoordonnesIds,
    includeBeneficiaireId: filters.beneficiaire,
  })

  const activitesFiltersLabels = generateActivitesFiltersLabels(filters, {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
    beneficiairesOptions: initialBeneficiairesOptions,
    mediateursOptions: initialMediateursOptions,
  })

  return {
    statistiques,
    user,
    mediateur: user,
    filters: activitesFiltersLabels,
  }
}
