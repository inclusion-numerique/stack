import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

export type CreateDataTableHrefParams<
  Configuration extends DataTableConfiguration = DataTableConfiguration,
> = {
  baseHref: string
  searchParams: DataTableSearchParams<Configuration>
}

export const createDataTableHref = <
  Configuration extends DataTableConfiguration = DataTableConfiguration,
>({
  baseHref,
  searchParams,
}: CreateDataTableHrefParams<Configuration>) => {
  // Fix a race condition bug where one of the value can be of type Symbol and crash the URLSearchParams
  const searchParamsAsStringEntries: [string, string][] = Object.entries(
    searchParams,
  )
    .filter(([_key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => [key, (value as string | number).toString()])

  return `${baseHref}?${new URLSearchParams(Object.fromEntries(searchParamsAsStringEntries)).toString()}`
}
