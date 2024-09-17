import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import type { WorksheetUser } from '@app/web/worksheet/buildWorksheetHelpers'
import { getMesStatistiquesPageData } from '@app/web/app/coop/mes-statistiques/getMesStatistiquesPageData'
import type { BuildStatistiquesWorksheetInput } from '@app/web/worksheet/statistiques/buildStatistiquesWorksheet'

export const getStatistiquesWorksheetInput = async ({
  user,
  filters,
}: {
  user: WorksheetUser & { mediateur: { id: string } }
  filters: ActivitesFilters
}): Promise<BuildStatistiquesWorksheetInput> => {
  const statistiques = await getMesStatistiquesPageData({
    mediateurId: user.mediateur.id,
    activitesFilters: filters,
  })

  const {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
  } = await getFiltersOptionsForMediateur({
    mediateurId: user.mediateur.id,
    includeBeneficiaireId: filters.beneficiaire,
  })

  const activitesFiltersLabels = generateActivitesFiltersLabels(filters, {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
    beneficiairesOptions: initialBeneficiairesOptions,
  })

  return {
    statistiques,
    user,
    mediateur: user,
    filters: activitesFiltersLabels,
  }
}
