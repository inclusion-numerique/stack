import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialMediateursOptionsForSearch } from '@app/web/mediateurs/getInitialMediateursOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import { getFirstAndLastActiviteDate } from '@app/web/app/coop/mes-statistiques/_queries/getFirstAndLastActiviteDate'

export const getFiltersOptionsForMediateur = async ({
  mediateurId,
  mediateurIds,
  includeBeneficiaireId,
}: {
  mediateurId?: string
  mediateurIds: string[]
  includeBeneficiaireId?: string
}) => {
  const [
    { communesOptions, departementsOptions },
    initialBeneficiairesOptions,
    initialMediateursOptions,
    { lieuxActiviteOptions },
    activiteDates,
  ] = await Promise.all([
    getMediateurCommunesAndDepartementsOptions({ mediateurIds }),
    getInitialBeneficiairesOptionsForSearch({
      mediateurId,
      includeBeneficiaireId,
    }),
    getInitialMediateursOptionsForSearch({ mediateurId, mediateurIds }),
    getInitialLieuxActiviteOptionsForSearch({ mediateurIds }),
    getFirstAndLastActiviteDate({ mediateurIds }),
  ])

  return {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    initialMediateursOptions,
    lieuxActiviteOptions,
    activiteDates,
  }
}
