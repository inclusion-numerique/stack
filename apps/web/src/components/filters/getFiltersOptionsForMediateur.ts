import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

export const getFiltersOptionsForMediateur = async ({
  mediateurId,
}: {
  mediateurId: string
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
