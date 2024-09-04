import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

export const getFiltersOptionsForMediateur = async ({
  mediateurId,
  includeBeneficiaireId,
}: {
  mediateurId: string
  includeBeneficiaireId?: string
}) => {
  const [
    { communesOptions, departementsOptions },
    initialBeneficiairesOptions,
    { lieuxActiviteOptions },
  ] = await Promise.all([
    getMediateurCommunesAndDepartementsOptions({
      mediateurId,
    }),
    getInitialBeneficiairesOptionsForSearch({
      mediateurId,
      includeBeneficiaireId,
    }),
    getInitialLieuxActiviteOptionsForSearch({
      mediateurId,
    }),
  ])

  return {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
  }
}
