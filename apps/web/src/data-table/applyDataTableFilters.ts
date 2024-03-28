import {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

export const applyDataTableFilters = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>(
  _searchParams: DataTableSearchParams<Configuration>,
  data: Data[],
  _configuration: Configuration,
) => data
