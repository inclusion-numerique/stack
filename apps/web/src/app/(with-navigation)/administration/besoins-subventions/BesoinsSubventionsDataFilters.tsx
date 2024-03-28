'use client'

import { useRouter } from 'next/navigation'
import DataSearchAndFilters from '@app/web/app/(with-navigation)/administration/DataSearchAndFilters'
import { createSearchCallback } from '@app/web/app/(with-navigation)/administration/createSearchCallback'
import { AdministrationBesoinsSubventionsDataTableSearchParams } from '@app/web/app/(with-navigation)/administration/besoins-subventions/AdministrationBesoinsSubventionsDataTable'

const BesoinsSubventionsDataFilters = ({
  searchParams,
}: {
  searchParams: AdministrationBesoinsSubventionsDataTableSearchParams
}) => {
  const router = useRouter()

  const onSearch = createSearchCallback({
    searchParams,
    router,
    baseHref: '/administration/besoins-subventions',
  })

  return (
    <DataSearchAndFilters
      searchQuery={searchParams.recherche}
      onSearch={onSearch}
    />
  )
}

export default BesoinsSubventionsDataFilters
