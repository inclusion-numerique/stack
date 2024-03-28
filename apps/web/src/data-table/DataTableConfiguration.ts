import { ReactNode } from 'react'
import { SelectInputOption } from '@app/ui/components/Form/utils/options'
import { SortDirection } from '@app/web/app/(with-navigation)/administration/SortLink'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableRow = any

export type DataTableFilter<
  DataRow extends DataTableRow = DataTableRow,
  FilterName extends string = string,
  V extends string = string,
  Where = never,
> = {
  name: FilterName
  title: ReactNode
  options?: SelectInputOption[]
  toQuery?: (value: V[]) => string
  fromQuery?: (query?: string) => V[]
  applyInMemory?: (row: DataRow, value: V[]) => boolean
  applyWhereCondition?: (query: string, value: V[]) => Where
}

export type DataTableColumn<
  DataRow extends DataTableRow = DataTableRow,
  ColumnName extends string = string,
> = {
  name: ColumnName
  header: ReactNode
  cellAsTh?: boolean
  cellClassName?: string
  headerClassName?: string
  csvHeaders?: string[]
  csvValues?: (row: DataRow) => (string | number | null | undefined)[]
  defaultSortable?: boolean
  sortable?: (a: DataRow, b: DataRow) => number
  cell?: (row: DataRow) => ReactNode
  filters?: DataTableFilter<DataRow>[]
}

export type DataTableConfiguration<
  DataRow extends DataTableRow = DataTableRow,
> = {
  csvFilename?: string | (() => string)
  columns: DataTableColumn<DataRow>[]
  rowKey: (row: DataRow) => string
  rowInMemorySearchableString?: (row: DataRow) => string
  defaultSortableInMemory?: (a: DataRow, b: DataRow) => number
}

type SortableColumn<Configuration extends DataTableConfiguration> = Extract<
  Configuration['columns'][number],
  { sortable: Required<DataTableColumn['sortable']> }
>

export type DataTableSearchParams<
  Configuration extends DataTableConfiguration = DataTableConfiguration,
> = {
  recherche?: string
  tri?: SortableColumn<Configuration>['name']
  ordre?: SortDirection
}
