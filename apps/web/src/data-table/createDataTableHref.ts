import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

export const createDataTableHref = <
  Configuration extends DataTableConfiguration = DataTableConfiguration,
>({
  baseHref,
  searchParams,
}: {
  baseHref: string
  searchParams: DataTableSearchParams<Configuration>
}) =>
  `${baseHref}?${new URLSearchParams(searchParams as Record<string, string>).toString()}`
