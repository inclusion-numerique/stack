import type { DataTableFilter } from '@app/web/data-table/DataTableConfiguration'

const DataFilter = ({ filter }: { filter: DataTableFilter<DataRow> }) => (
  <>{filter.name}</>
)

export default DataFilter
