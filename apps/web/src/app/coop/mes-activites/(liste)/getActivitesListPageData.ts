import { searchBeneficiaire } from '@app/web/beneficiaire/searchBeneficiaire'
import {
  BeneficiairesDataTable,
  BeneficiairesDataTableSearchParams,
} from '@app/web/beneficiaire/BeneficiairesDataTable'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'

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
