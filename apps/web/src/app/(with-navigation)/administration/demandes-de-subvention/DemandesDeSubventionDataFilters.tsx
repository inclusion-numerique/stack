'use client'

import { useRouter } from 'next/navigation'
import DataSearchAndFilters from '@app/web/app/(with-navigation)/administration/DataSearchAndFilters'
import { AdministrationDemandesDeSubventionsSearchParams } from '@app/web/app/(with-navigation)/administration/demandes-de-subvention/getAdministrationDemandesDeSubventionsList'
import { createSearchCallback } from '@app/web/app/(with-navigation)/administration/createSearchCallback'

const DemandesDeSubventionDataFilters = ({
  searchParams,
}: {
  searchParams: AdministrationDemandesDeSubventionsSearchParams
}) => {
  const router = useRouter()

  const onSearch = createSearchCallback({
    searchParams,
    router,
    baseHref: '/administration/demandes-de-subvention',
  })

  return (
    <DataSearchAndFilters
      onSearch={onSearch}
      searchQuery={searchParams.recherche}
    />
  )
}

export default DemandesDeSubventionDataFilters
