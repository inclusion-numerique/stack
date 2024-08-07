import { searchBeneficiaire } from '@app/web/beneficiaire/searchBeneficiaire'
import {
  BeneficiairesDataTable,
  BeneficiairesDataTableSearchParams,
} from '@app/web/beneficiaire/BeneficiairesDataTable'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'

export const getBeneficiairesListPageData = async ({
  mediateurId,
  searchParams,
}: {
  mediateurId: string
  searchParams: BeneficiairesDataTableSearchParams
}) => {
  const orderBy = getDataTableOrderBy(searchParams, BeneficiairesDataTable)
  const perPage = searchParams.lignes ?? 10

  const searchResult = await searchBeneficiaire({
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

export type BeneficiairesListPageData = Exclude<
  Awaited<ReturnType<typeof getBeneficiairesListPageData>>,
  null
>
