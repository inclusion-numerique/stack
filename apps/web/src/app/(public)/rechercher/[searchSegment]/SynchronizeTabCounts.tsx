'use client'

import { useEffect } from 'react'
import { SearchResultCounts } from '@app/web/server/search/executeSearch'
import { useSynchronizeTabCounts } from '@app/web/app/(public)/rechercher/useSearchCounts'

const SynchronizeTabCounts = ({
  tabCounts,
}: {
  tabCounts: SearchResultCounts
}) => {
  const synchronizeTabCounts = useSynchronizeTabCounts()

  useEffect(() => {
    synchronizeTabCounts(tabCounts)
  }, [tabCounts, synchronizeTabCounts])

  return null
}

export default SynchronizeTabCounts
