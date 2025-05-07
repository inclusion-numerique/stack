'use client'

import type {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { createSearchCallback } from '@app/web/data-table/createSearchCallback'
import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

const DataSearchBar = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>({
  searchParams,
  baseHref,
  placeholder,
}: {
  searchParams: DataTableSearchParams<Configuration>
  baseHref: string
  placeholder?: string
}) => {
  const router = useRouter()

  const onSearch = createSearchCallback({
    searchParams,
    router,
    baseHref,
  })

  const searchBarRef = useRef<HTMLDivElement>(null)

  // Initialise input value
  // biome-ignore lint/correctness/useExhaustiveDependencies: this is only used to initialize the input value
  useEffect(
    () => {
      if (!searchParams.recherche) {
        return
      }
      const searchBarElement = searchBarRef.current
      if (!searchBarElement) return

      // Find the input element inside searchbar element , and set value to searchQuery

      const input = searchBarElement.querySelector('input')

      if (input) {
        input.value = searchParams.recherche
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <SearchBar
      className="fr-flex-grow-1"
      onButtonClick={onSearch}
      allowEmptySearch
      ref={searchBarRef}
      label={placeholder}
    />
  )
}

export default DataSearchBar
