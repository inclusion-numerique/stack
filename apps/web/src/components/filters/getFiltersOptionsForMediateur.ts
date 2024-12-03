import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialMediateursOptionsForSearch } from '@app/web/mediateurs/getInitialMediateursOptionsForSearch'
import { getLieuxActiviteOptions } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import { getFirstAndLastActiviteDate } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getFirstAndLastActiviteDate'
import type { UserDisplayName, UserProfile } from '@app/web/utils/user'

export const getFiltersOptionsForMediateur = async ({
  user,
  mediateurCoordonnesIds,
  includeBeneficiaireId,
}: {
  user: UserDisplayName & UserProfile
  mediateurCoordonnesIds?: string[]
  includeBeneficiaireId?: string
}) => {
  const mediateurIds = [
    ...(user.mediateur?.id ? [user.mediateur.id] : []),
    ...(mediateurCoordonnesIds ?? []),
  ]

  const [
    { communesOptions, departementsOptions },
    initialBeneficiairesOptions,
    initialMediateursOptions,
    lieuxActiviteOptions,
    activiteDates,
  ] = await Promise.all([
    getMediateurCommunesAndDepartementsOptions({ mediateurIds }),
    getInitialBeneficiairesOptionsForSearch({
      mediateurId: user.mediateur?.id,
      includeBeneficiaireId,
    }),
    getInitialMediateursOptionsForSearch({
      mediateurId: user.mediateur?.id,
      coordinateurId: user.coordinateur?.id,
      mediateurCoordonnesIds,
    }),
    getLieuxActiviteOptions({ mediateurIds }),
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
