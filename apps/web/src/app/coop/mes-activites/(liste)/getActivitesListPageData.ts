import type { ActivitesDataTableSearchParams } from '@app/web/cra/ActivitesDataTable'
import { searchActivite } from '@app/web/cra/searchActivite'

export const getActivitesListPageData = async ({
  mediateurId,
  searchParams,
}: {
  mediateurId: string
  searchParams: ActivitesDataTableSearchParams
}) => {
  const searchResult = await searchActivite({
    mediateurId,
    searchParams,
  })

  return {
    searchResult,
    searchParams,
    mediateurId,
  }
}

export type ActivitesListPageData = Exclude<
  Awaited<ReturnType<typeof getActivitesListPageData>>,
  null
>
