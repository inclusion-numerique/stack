import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import {
  ActivitesDataTable,
  ActivitesDataTableSearchParams,
} from '@app/web/cra/ActivitesDataTable'
import { searchActivite } from '@app/web/cra/searchActivite'

export const getActivitesListPageData = async ({
  mediateurId,
  searchParams,
}: {
  mediateurId: string
  searchParams: ActivitesDataTableSearchParams
}) => {
  const orderBy = getDataTableOrderBy(searchParams, ActivitesDataTable)
  const perPage = searchParams.lignes ?? 10

  const searchResult = await searchActivite({
    mediateurId,
    orderBy,
    query: searchParams.recherche,
    ...takeAndSkipFromPage({
      page: searchParams.page,
      pageSize: perPage,
    }),
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
