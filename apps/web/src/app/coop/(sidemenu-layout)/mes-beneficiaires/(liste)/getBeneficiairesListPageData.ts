import { searchBeneficiaire } from '@app/web/beneficiaire/searchBeneficiaire'
import { BeneficiairesDataTableSearchParams } from '@app/web/beneficiaire/BeneficiairesDataTable'
import { isEmptySearchParams } from '@app/web/data-table/isEmptySearchParams'

export const getBeneficiairesListPageData = async ({
  mediateurId,
  searchParams,
}: {
  mediateurId: string
  searchParams: BeneficiairesDataTableSearchParams
}) => {
  const searchResult = await searchBeneficiaire({
    mediateurId,
    searchParams,
  })

  return {
    isFiltered: !isEmptySearchParams(searchParams),
    searchResult,
    searchParams,
    mediateurId,
  }
}

export type BeneficiairesListPageData = Exclude<
  Awaited<ReturnType<typeof getBeneficiairesListPageData>>,
  null
>
