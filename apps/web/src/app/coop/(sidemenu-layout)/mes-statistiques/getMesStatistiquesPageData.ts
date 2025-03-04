import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import {
  getActivitesStats,
  getActivitesStructuresStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { prismaClient } from '@app/web/prismaClient'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { UserDisplayName, UserProfile } from '@app/web/utils/user'
import { getBeneficiaireStatsWithCommunes } from './_queries/getBeneficiaireStats'
import { getTotalCountsStats } from './_queries/getTotalCountsStats'

export type MesStatistiquesGraphOptions = {
  fin?: Date
}

const toMediateurId = ({ mediateurId }: { mediateurId: string }) => mediateurId

export const getMesStatistiquesPageData = async ({
  user,
  activitesFilters,
  graphOptions = {},
}: {
  user: UserDisplayName & UserProfile
  activitesFilters: ActivitesFilters
  graphOptions?: MesStatistiquesGraphOptions
}) => {
  const mediateurCoordonnes =
    user.coordinateur == null
      ? []
      : await prismaClient.mediateurCoordonne.findMany({
          where: { coordinateurId: user.coordinateur.id },
          select: { mediateurId: true },
        })

  const mediateurCoordonnesIds = mediateurCoordonnes.map(toMediateurId)

  const mediateurIds = [
    ...(user.mediateur?.id ? [user.mediateur.id] : []),
    ...(mediateurCoordonnesIds ?? []),
  ]

  const [
    accompagnementsParJour,
    accompagnementsParMois,
    beneficiaires,
    activites,
    structures,
    totalCounts,
  ] = await Promise.all([
    getAccompagnementsCountByDay({
      user,
      mediateurIds,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getAccompagnementsCountByMonth({
      user,
      mediateurIds,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getBeneficiaireStatsWithCommunes({ user, mediateurIds, activitesFilters }),
    getActivitesStats({ user, mediateurIds, activitesFilters }),
    getActivitesStructuresStats({ user, mediateurIds, activitesFilters }),
    getTotalCountsStats({ user, mediateurIds, activitesFilters }),
  ])

  const {
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  } = await getFiltersOptionsForMediateur({
    user,
    mediateurCoordonnesIds,
    includeBeneficiaireIds: activitesFilters.beneficiaires,
  })

  return {
    totalCounts,
    accompagnementsParMois,
    accompagnementsParJour,
    beneficiaires,
    activites,
    structures,
    activitesFilters,
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  }
}

export type MesStatistiquesPageData = Awaited<
  ReturnType<typeof getMesStatistiquesPageData>
>
