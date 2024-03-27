'use client'

import { useRouter } from 'next/navigation'
import DataSearchAndFilters from '@app/web/app/(with-navigation)/administration/DataSearchAndFilters'
import { AdministrationGouvernanceListSearchParams } from '@app/web/app/(with-navigation)/administration/gouvernances/getAdministrationGouvernancesList'
import { createSearchCallback } from '@app/web/app/(with-navigation)/administration/createSearchCallback'

const GouvernancesDataFilters = ({
  searchParams,
}: {
  searchParams: AdministrationGouvernanceListSearchParams
}) => {
  const router = useRouter()

  const onSearch = createSearchCallback({
    searchParams,
    router,
    baseHref: '/administration/gouvernances',
  })

  return (
    <DataSearchAndFilters
      searchQuery={searchParams.recherche}
      onSearch={onSearch}
    />
  )
}

export default GouvernancesDataFilters
