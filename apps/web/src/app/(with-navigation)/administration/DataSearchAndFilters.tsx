'use client'

import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'
import Button from '@codegouvfr/react-dsfr/Button'
import { useEffect, useRef, useState } from 'react'
import { DataFilters } from '@app/web/app/(with-navigation)/administration/DataFilter'

const DataSearchAndFilters = ({
  onSearch,
  filters,
  searchQuery,
}: {
  filters?: DataFilters
  onSearch: (searchQuery: string) => void | Promise<void>
  searchQuery?: string
}) => {
  const [showFilters, setShowFilters] = useState(
    !!filters && filters.some((filter) => !!filter.values?.length),
  )

  const searchBarRef = useRef<HTMLDivElement>(null)

  // Initialise input value
  useEffect(
    () => {
      if (!searchQuery) {
        return
      }
      const searchBarElement = searchBarRef.current
      if (!searchBarElement) return

      // Find the input element inside searchbar element , and set value to searchQuery

      const input = searchBarElement.querySelector('input')

      if (input) {
        input.value = searchQuery
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <div className="fr-border--slim-grey fr-p-4v fr-p-md-8v">
      <div className="fr-width-full fr-flex">
        <SearchBar
          className="fr-flex-grow-1"
          onButtonClick={onSearch}
          allowEmptySearch
          ref={searchBarRef}
        />
        {!!filters && (
          <Button
            type="button"
            iconId={
              showFilters ? 'fr-icon-arrow-up-line' : 'fr-icon-arrow-down-line'
            }
            onClick={() => setShowFilters(!showFilters)}
          >
            Voir les filtres
          </Button>
        )}
      </div>
      {!!filters && showFilters && (
        <div className="fr-width-full fr-mt-4v fr-mt-md-8v">FILTERS</div>
      )}
    </div>
  )
}

export default DataSearchAndFilters
