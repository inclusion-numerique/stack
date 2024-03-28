'use client'

import { useRouter } from 'next/navigation'
import DataSearchAndFilters from '@app/web/app/(with-navigation)/administration/DataSearchAndFilters'
import { createSearchCallback } from '@app/web/app/(with-navigation)/administration/createSearchCallback'
import type { AdministrationGouvernancesDataTableSearchParams } from '@app/web/app/(with-navigation)/administration/gouvernances/AdministrationGouvernancesDataTable'

const GouvernancesDataFilters = ({
  searchParams,
}: {
  searchParams: AdministrationGouvernancesDataTableSearchParams
}) => {
  const router = useRouter()

  const onSearch = createSearchCallback({
    searchParams,
    router,
    baseHref: '/administration/gouvernances',
  })

  return (
    <DataSearchAndFilters
      onSearch={onSearch}
      searchQuery={searchParams.recherche}
    />
  )
}

export default GouvernancesDataFilters
