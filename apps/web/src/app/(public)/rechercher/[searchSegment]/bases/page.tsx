import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import {
  countSearchResults,
  executeBasesSearch,
} from '@app/web/server/search/executeSearch'
import Bases from '@app/web/components/Search/Bases'
import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BasesSearchResultPage = async ({
  params,
  searchParams: urlPaginationParams,
}: {
  params: { searchSegment: string }
  searchParams: UrlPaginationParams
}) => {
  const user = await getSessionUser()
  const searchParams = searchParamsFromSegment(params?.searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const [{ bases, basesCount }, tabCounts] = await Promise.all([
    executeBasesSearch(searchParams, paginationParams, user),
    countSearchResults(searchParams, user),
  ])

  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        tab="bases"
        searchParams={searchParams}
        paginationParams={paginationParams}
        count={basesCount}
      >
        <Bases
          user={user}
          bases={bases}
          searchParams={searchParams}
          totalCount={basesCount}
        />
      </SearchResults>
    </>
  )
}

export default BasesSearchResultPage
