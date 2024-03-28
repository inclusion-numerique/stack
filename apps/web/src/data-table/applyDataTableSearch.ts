import {
  DataTableConfiguration,
  DataTableRow,
} from '@app/web/data-table/DataTableConfiguration'

export const getSearchTokens = (searchQuery?: string) =>
  searchQuery
    ?.replaceAll(/[\u0300-\u036F]/g, '')
    .normalize('NFD')
    .split(' ')
    .map((token) => token.toLowerCase().trim())
    .filter(Boolean)

export const applyDataTableSearch = <Data extends DataTableRow>(
  search: string | undefined,
  data: Data[],
  configuration: DataTableConfiguration<Data>,
) => {
  const toSearchableString = configuration.rowInMemorySearchableString

  if (!toSearchableString || !search?.trim()) {
    return data
  }

  const searchTokens = getSearchTokens(search)
  if (!searchTokens?.length) {
    return data
  }

  return data.filter((row) => {
    const searchableString = toSearchableString(row)
    return searchTokens.some((token) => searchableString.includes(token))
  })
}
