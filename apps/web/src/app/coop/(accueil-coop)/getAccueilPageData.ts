import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getActivitesListPageData } from '../mes-activites/(liste)/getActivitesListPageData'
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

export const getAccueilPageData = async (mediateurId: string) => {
  const totalCountsStats7Days = await getTotalCountsStats({
    mediateurIds: [mediateurId],
    activitesFilters: activitesFiltersLastDays(7),
  })

  const totalCountsStats30Days = await getTotalCountsStats({
    mediateurIds: [mediateurId],
    activitesFilters: activitesFiltersLastDays(30),
  })

  const {
    searchResult: { activites },
  } = await getActivitesListPageData({
    mediateurId,
    searchParams: { lignes: '3' },
  })

  return {
    statistiques: {
      totalCountsStats7Days,
      totalCountsStats30Days,
    },
    activites,
  }
}

export type AccueilPageData = Awaited<ReturnType<typeof getAccueilPageData>>
