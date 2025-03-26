import { getFirstAndLastActiviteDate } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getFirstAndLastActiviteDate'
import { getMediateurCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getMediateurCommunesOptions'
import { getMediateursLieuxActiviteOptions } from '@app/web/app/lieu-activite/getMediateursLieuxActiviteOptions'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialMediateursOptionsForSearch } from '@app/web/mediateurs/getInitialMediateursOptionsForSearch'
import type { UserDisplayName, UserProfile } from '@app/web/utils/user'

export const getFiltersOptionsForMediateur = async ({
  user,
  mediateurCoordonnesIds,
  includeBeneficiaireIds,
}: {
  user: UserDisplayName & UserProfile
  mediateurCoordonnesIds?: string[]
  includeBeneficiaireIds?: string[]
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
      includeBeneficiaireIds,
    }),
    getInitialMediateursOptionsForSearch({
      mediateurId: user.mediateur?.id,
      coordinateurId: user.coordinateur?.id,
      mediateurCoordonnesIds,
    }),
    getMediateursLieuxActiviteOptions({ mediateurIds }),
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
