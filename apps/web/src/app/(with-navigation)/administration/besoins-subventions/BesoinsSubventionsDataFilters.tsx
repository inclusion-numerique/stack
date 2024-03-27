'use client'

import { useRouter } from 'next/navigation'
import DataSearchAndFilters from '@app/web/app/(with-navigation)/administration/DataSearchAndFilters'
import { createSearchCallback } from '@app/web/app/(with-navigation)/administration/createSearchCallback'
import { AdministrationBesoinsSubventionsListSearchParams } from '@app/web/app/(with-navigation)/administration/besoins-subventions/getAdministrationBesoinsSubventions'

const BesoinsSubventionsDataFilters = ({
  searchParams,
}: {
  searchParams: AdministrationBesoinsSubventionsListSearchParams
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
