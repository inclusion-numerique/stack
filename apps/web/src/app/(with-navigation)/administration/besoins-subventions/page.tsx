import React from 'react'
import AdministrationDataPage from '@app/web/app/(with-navigation)/administration/AdministrationDataPage'
import { numberToEuros } from '@app/web/utils/formatNumber'
import {
  getAdministrationBesoinsSubventionsData,
  getAdministrationBesoinsSubventionsMetadata,
} from '@app/web/app/(with-navigation)/administration/besoins-subventions/getAdministrationBesoinsSubventions'
import { applyDataTableSearch } from '@app/web/data-table/applyDataTableSearch'
import { applyDataTableFilters } from '@app/web/data-table/applyDataTableFilters'
import { applyDataTableOrdering } from '@app/web/data-table/applyDataTableOrdering'
import {
  AdministrationBesoinsSubventionsDataTable,
  AdministrationBesoinsSubventionsDataTableSearchParams,
} from '@app/web/app/(with-navigation)/administration/besoins-subventions/AdministrationBesoinsSubventionsDataTable'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationBesoinsSubventionsDataTableSearchParams
}) => {
  const allData = await getAdministrationBesoinsSubventionsData()

  const searchedData = applyDataTableSearch(
    searchParams.recherche,
    allData,
    AdministrationBesoinsSubventionsDataTable,
  )
  const { filteredData, filterValues } = applyDataTableFilters(
    searchParams,
    searchedData,
    AdministrationBesoinsSubventionsDataTable,
  )

  const data = applyDataTableOrdering(
    searchParams,
    filteredData,
    AdministrationBesoinsSubventionsDataTable,
  )

  const { categories } = getAdministrationBesoinsSubventionsMetadata(
    searchParams.recherche,
    data,
  )

  return (
    <AdministrationDataPage
      title="Subventions demandées par besoin"
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          {categories.map(({ label, actions, montant }) => (
            <li key={label}>
              {label}&nbsp;:&nbsp;
              <b>
                {numberToEuros(montant)} pour {actions} actions
              </b>
            </li>
          ))}
        </ul>
      }
      filterValues={filterValues}
      data={data}
      baseHref="/administration/besoins-subventions"
      dataTableConfiguration={AdministrationBesoinsSubventionsDataTable}
      searchParams={searchParams}
    />
  )
}

export default Page
