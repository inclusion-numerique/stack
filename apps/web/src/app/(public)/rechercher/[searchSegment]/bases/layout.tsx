import React, { PropsWithChildren } from 'react'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import Menu from '@app/web/components/Search/Menu'
import Filters from '@app/web/components/Search/Filters/Filters'
import {
  departmentsOptions,
  getDepartmentName,
} from '@app/web/utils/departments'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BasesSearchLayout = ({
  children,
  params,
}: PropsWithChildren<{
  params: {
    searchSegment: string
  }
}>) => {
  const searchParams = searchParamsFromSegment(params.searchSegment)

  return (
    <>
      <Menu activeTab="bases" searchParams={searchParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        <Filters
          initialValues={searchParams.departements.map((departementCode) => ({
            category: 'departements',
            option: {
              value: departementCode,
              name: getDepartmentName(departementCode),
            },
          }))}
          className="fr-mb-6w"
          label="Affiner la recherche"
          searchParams={searchParams}
          tab="bases"
          categories={[
            {
              multiple: false,
              id: 'departements',
              label: 'Département',
              options: departmentsOptions,
            },
          ]}
        />
        {children}
      </div>
    </>
  )
}

export default BasesSearchLayout
