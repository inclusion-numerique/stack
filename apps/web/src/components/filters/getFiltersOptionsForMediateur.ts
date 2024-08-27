import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import { AccompagnementType } from '@app/web/cra/cra'

export const getFiltersOptionsForMediateur = async ({
  mediateurId,
  lieuxActivitesWithMostActiviteType,
}: {
  mediateurId: string
  lieuxActivitesWithMostActiviteType?: AccompagnementType
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
      withMost: lieuxActivitesWithMostActiviteType ?? 'individuel',
    }),
  ])

  return {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
  }
}
