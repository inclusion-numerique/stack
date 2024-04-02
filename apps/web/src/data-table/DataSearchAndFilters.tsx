import Button from '@codegouvfr/react-dsfr/Button'
import {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import DataSearchBar from '@app/web/data-table/DataSearchBar'
import DataFilters from '@app/web/data-table/DataFilter/DataFilters'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

/**
 * Server component orchestrating the render of search bar and filter client components
 */
const DataSearchAndFilters = async <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>({
  configuration,
  searchParams,
  baseHref,
  filterValues: _filterValues,
  data: _data, // needed for type inference
}: {
  configuration: Configuration
  searchParams: DataTableSearchParams<Configuration>
  baseHref: string
  data: Data[]
  filterValues: DataTableFilterValues<Configuration>
}) => {
  const filterConfigurations = configuration.columns
    .map((column) => column.filters)
    .filter(isDefinedAndNotNull)
    .flat()

  const filterValues: Record<string, string[]> = {}
  for (const filter of filterConfigurations) {
    const name = filter.name as keyof DataTableSearchParams<Configuration>
    const queryValue = searchParams[name]

    console.log('QUERY VALUE', queryValue)
    console.log('CONFIG FROM QUERY', filter)
    if (queryValue) {
      filterValues[name] =
        typeof filter.fromQuery === 'function'
          ? filter.fromQuery(queryValue)
          : []
    }
  }

  console.log('FILTERS', filterConfigurations)
  console.log('SEARCH PARAMS', searchParams)

  console.log('FILTER VALUES', filterValues)

  const filterComponents = await Promise.all(
    filterConfigurations.map(async (filterConfiguration) => {
      const options =
        'options' in filterConfiguration
          ? Array.isArray(filterConfiguration.options)
            ? filterConfiguration.options
            : typeof filterConfiguration.options === 'function'
              ? await filterConfiguration.options()
              : []
          : []

      return (
        <Button
          key={filterConfiguration.name}
          priority="secondary"
          type="button"
          iconPosition="right"
          iconId="fr-icon-arrow-down-s-line"
        >
          {filterConfiguration.title}
        </Button>
      )
    }),
  )

  return (
    <DataFilters
      initialyShown={Object.keys(filterValues).length > 0}
      searchParams={searchParams}
      baseHref={baseHref}
      filterComponents={filterComponents}
      filterValues={filterValues}
      searchBar={
        <DataSearchBar searchParams={searchParams} baseHref={baseHref} />
      }
    />
  )
}

export default DataSearchAndFilters
