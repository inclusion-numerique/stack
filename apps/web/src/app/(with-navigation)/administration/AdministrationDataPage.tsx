import React, { ReactNode } from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import DownloadCsvDataButton from '@app/web/app/(with-navigation)/administration/DownloadCsvDataButton'
import { numberToString } from '@app/web/utils/formatNumber'
import DataTable from '@app/web/data-table/DataTable'
import {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { generateDataTableCsv } from '@app/web/data-table/dataTableCsv'
import DataSearchAndFilters from '@app/web/data-table/DataSearchAndFilters'

const AdministrationDataPage = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>({
  title,
  infoContents,
  searchParams,
  baseHref,
  data,
  dataTableConfiguration,
  searchAndFilters = true,
  filterValues,
}: {
  title: ReactNode
  infoContents?: ReactNode
  baseHref: string
  data: Data[]
  dataTableConfiguration: Configuration
  filterValues: DataTableFilterValues<Configuration>
  searchParams: DataTableSearchParams<Configuration>
  searchAndFilters?: boolean
}) => {
  const hasCsv =
    !!dataTableConfiguration?.csvFilename &&
    !!dataTableConfiguration?.columns.some(
      (column) => column.csvHeaders && column.csvHeaders.length > 0,
    )

  const csvData = hasCsv
    ? generateDataTableCsv({
        configuration: dataTableConfiguration,
        rows: data,
      })
    : ''

  const csvFilename =
    typeof dataTableConfiguration.csvFilename === 'function'
      ? dataTableConfiguration.csvFilename()
      : dataTableConfiguration.csvFilename ?? ''

  return (
    <div className="fr-width-full">
      <Breadcrumb
        className="fr-mb-4v"
        currentPageLabel={title}
        segments={[
          {
            label: 'Page d’accueil',
            linkProps: {
              href: '/',
            },
          },
          {
            label: 'Administration',
            linkProps: {
              href: '/administration',
            },
          },
        ]}
      />
      <h1 className="fr-h2 fr-text-title--blue-france fr-mb-8v">{title}</h1>
      {searchAndFilters && (
        <DataSearchAndFilters
          data={data}
          searchParams={searchParams}
          baseHref={baseHref}
          configuration={dataTableConfiguration}
          filterValues={filterValues}
        />
      )}
      <div className="fr-flex fr-justify-content-space-between fr-align-items-start fr-flex-gap-4v fr-text--sm fr-mt-8v fr-mb-4v">
        <div>{infoContents}</div>
        <div>
          <p className="fr-mb-1v fr-text--sm fr-text--bold fr-text--right">
            {data.length > 0 ? numberToString(data.length) : 'Aucun'} résultat
            {sPluriel(data.length)}
          </p>
          {hasCsv && (
            <DownloadCsvDataButton
              csvFilename={csvFilename}
              csvData={csvData}
            />
          )}
        </div>
      </div>
      {!!dataTableConfiguration && (
        <DataTable
          className="fr-table--nowrap"
          rows={data}
          configuration={dataTableConfiguration}
          searchParams={searchParams}
          baseHref={baseHref}
        />
      )}
    </div>
  )
}

export default AdministrationDataPage
