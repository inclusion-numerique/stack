import type { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import { searchActivite } from '@app/web/cra/searchActivite'
import { getFirstAndLastActiviteDate } from '@app/web/app/coop/mes-statistiques/_queries/getFirstAndLastActiviteDate'

export const getActivitesListPageData = async ({
  mediateurId,
  searchParams,
}: {
  mediateurId: string
  searchParams: ActivitesDataTableSearchParams
}) => {
  const [searchResult, activiteDates] = await Promise.all([
    searchActivite({
      mediateurId,
      searchParams,
    }),
    getFirstAndLastActiviteDate({ mediateurIds: [mediateurId] }),
  ])

  return {
    searchResult,
    searchParams,
    mediateurId,
    activiteDates,
  }
}

export type ActivitesListPageData = Exclude<
  Awaited<ReturnType<typeof getActivitesListPageData>>,
  null
>
