import { getActivitesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesListPageData'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { countMediateursCoordonnesBy } from '@app/web/mediateurs/countMediateursCoordonnesBy'
import { UserDisplayName, UserProfile } from '@app/web/utils/user'
import { getTotalCountsStats } from '../mes-statistiques/_queries/getTotalCountsStats'

const activitesFiltersLastDays = (daysCount: number) => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - daysCount)
  const activitesFilters: ActivitesFilters = {
    du: currentDate.toISOString().split('T')[0],
    au: new Date().toISOString().split('T')[0],
  }
  return activitesFilters
}

const EMPTY_STATISTIQUES = {
  totalCountsStats7Days: {
    beneficiaires: { total: 0, suivis: 0, anonymes: 0 },
    activites: {
      individuels: { total: 0, proportion: 0 },
      collectifs: { total: 0, proportion: 0, participants: 0 },
      demarches: { total: 0, proportion: 0 },
    },
  },
  totalCountsStats30Days: {
    beneficiaires: { total: 0, suivis: 0, anonymes: 0 },
    activites: {
      individuels: { total: 0, proportion: 0 },
      collectifs: { total: 0, proportion: 0, participants: 0 },
      demarches: { total: 0, proportion: 0 },
    },
  },
}
export const getAccueilPageDataFor = async (
  user: UserDisplayName & UserProfile,
) => {
  const mediateurs = await countMediateursCoordonnesBy(user.coordinateur)

  if (user.mediateur?.id != null) {
    const totalCountsStats7Days = await getTotalCountsStats({
      user,
      mediateurIds: [user.mediateur.id],
      activitesFilters: activitesFiltersLastDays(7),
    })

    const totalCountsStats30Days = await getTotalCountsStats({
      user,
      mediateurIds: [user.mediateur.id],
      activitesFilters: activitesFiltersLastDays(30),
    })

    const {
      searchResult: { activites },
    } = await getActivitesListPageData({
      mediateurId: user.mediateur.id,
      searchParams: { lignes: '3' },
    })

    return {
      mediateurs,
      statistiques: {
        totalCountsStats7Days,
        totalCountsStats30Days,
      },
      activites,
    }
  }

  return {
    mediateurs,
    statistiques: EMPTY_STATISTIQUES,
    activites: [],
  }
}

export type AccueilPageData = Awaited<ReturnType<typeof getAccueilPageDataFor>>
