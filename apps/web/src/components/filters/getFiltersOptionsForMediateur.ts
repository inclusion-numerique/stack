import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import { getFirstAndLastActiviteDate } from '@app/web/app/coop/mes-statistiques/_queries/getFirstAndLastActiviteDate'

export const getFiltersOptionsForMediateur = async ({
  mediateurIds,
  includeBeneficiaireId,
}: {
  mediateurIds: string[]
  includeBeneficiaireId?: string
}) => {
  const [
    { communesOptions, departementsOptions },
    initialBeneficiairesOptions,
    { lieuxActiviteOptions },
    activiteDates,
  ] = await Promise.all([
    getMediateurCommunesAndDepartementsOptions({
      mediateurIds,
    }),
    getInitialBeneficiairesOptionsForSearch({
      mediateurIds,
      includeBeneficiaireId,
    }),
    getInitialLieuxActiviteOptionsForSearch({
      mediateurIds,
    }),
    getFirstAndLastActiviteDate({ mediateurIds }),
  ])

  return {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  }
}
