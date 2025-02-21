import { getMesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { mediateurCoordonnesIdsFor } from '@app/web/mediateurs/mediateurCoordonnesIdsFor'
import type { BuildStatistiquesWorksheetInput } from '@app/web/worksheet/statistiques/buildStatistiquesWorksheet'

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
