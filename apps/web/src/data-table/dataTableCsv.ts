import { stringify } from 'csv-stringify/sync'
import { DataTableConfiguration } from '@app/web/data-table/DataTableConfiguration'

export const generateDataTableCsv = <Data>({
  configuration,
  rows,
}: {
  rows: Data[]
  configuration: DataTableConfiguration<Data>
}) => {
  const csvHeaders = configuration.columns.flatMap(
    (column) => column.csvHeaders ?? [column.header as string],
  )
  const csvRows = rows.map((row) =>
    configuration.columns.flatMap((column) => {
      if (column.csvValues) {
        return column.csvValues(row)
      }
      return []
    }),
  )

  return stringify([csvHeaders, ...csvRows])
}
