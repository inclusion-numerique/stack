import { searchBeneficiaire } from '@app/web/beneficiaire/searchBeneficiaire'
import { BeneficiairesDataTableSearchParams } from '@app/web/beneficiaire/BeneficiairesDataTable'

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
    searchResult,
    searchParams,
    mediateurId,
  }
}

export type BeneficiairesListPageData = Exclude<
  Awaited<ReturnType<typeof getBeneficiairesListPageData>>,
  null
>
