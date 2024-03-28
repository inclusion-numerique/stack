'use client'

import { useRouter } from 'next/navigation'
import DataSearchAndFilters from '@app/web/app/(with-navigation)/administration/DataSearchAndFilters'
import { createSearchCallback } from '@app/web/app/(with-navigation)/administration/createSearchCallback'
import { AdministrationBeneficiairesSubventionsDataTableSearchParams } from '@app/web/app/(with-navigation)/administration/beneficiaires-subventions/AdministrationBeneficiairesSubventionsDataTable'

const BeneficiairesSubventionsDataFilters = ({
  searchParams,
}: {
  searchParams: AdministrationBeneficiairesSubventionsDataTableSearchParams
}) => {
  const router = useRouter()

  const onSearch = createSearchCallback({
    searchParams,
    router,
    baseHref: '/administration/beneficiaires-subventions',
  })

  return (
    <DataSearchAndFilters
      onSearch={onSearch}
      searchQuery={searchParams.recherche}
    />
  )
}

export default BeneficiairesSubventionsDataFilters
