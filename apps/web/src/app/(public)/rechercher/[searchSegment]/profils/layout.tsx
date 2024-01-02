import React, { PropsWithChildren } from 'react'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import SearchMenu from '@app/web/components/Search/SearchMenu'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ProfilesSearchLayout = ({
  children,
  params,
}: PropsWithChildren<{
  params: {
    searchSegment: string
  }
}>) => {
  const searchParams = searchParamsFromSegment(params.searchSegment)

  return (
    <>
      <SearchMenu activeTab="profils" searchParams={searchParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        {children}
      </div>
    </>
  )
}

export default ProfilesSearchLayout
