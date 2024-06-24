import { Theme } from '@prisma/client'
import React from 'react'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import Webinaire from '@app/web/app/(public)/Webinaire'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ResourcesSearchResults from '@app/web/components/Search/ResourcesSearchResults'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  countSearchResults,
  executeResourcesSearch,
} from '@app/web/server/search/executeSearch'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import { categoryThemesOptions } from '@app/web/themes/themes'
import { getHomeCategoriesCount } from '../../(home)/_components/getHomeCategoriesCount'
import { ThematicHeader } from '../_components/ThematicHeader'
import { ThematicTags } from '../_components/ThematicTags'
import { createThematicLink } from '../_helpers/createThematicLink'

type UrlPaginationParams = {
  page?: string | string[] | null
  tri?: string | string[] | null
  thematiques?: string | string[] | null
}

const toArray = (thematiques?: string | string[] | null) => {
  if (thematiques == null) return []

  return Array.isArray(thematiques) ? thematiques : [thematiques]
}

const category = 'Numérique & environnement'
const thematic = categoryThemesOptions[category]

const allThematicValues = thematic.map(
  ({ value }: { value: string }) => value,
) as Theme[]

const NumeriqueEtEnvironnementPage = async ({
  params,
  searchParams: urlPaginationParams,
}: {
  params: {
    searchSegment: string
  }
  searchParams: UrlPaginationParams
}) => {
  const user = await getSessionUser()
  const categoriesCount = await getHomeCategoriesCount()

  const searchParams = {
    ...searchParamsFromSegment(params?.searchSegment),
    themes: (urlPaginationParams.thematiques == null
      ? allThematicValues
      : toArray(urlPaginationParams.thematiques)) as Theme[],
  }

  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const [{ resources, resourcesCount }] = await Promise.all([
    executeResourcesSearch(searchParams, paginationParams, user),
    countSearchResults(searchParams, user),
  ])

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container">
        <Breadcrumbs currentPage={category} />
        <div className="fr-container fr-container--medium">
          <ThematicHeader
            categoriesCount={categoriesCount}
            category={category}
          />
          <div className="fr-my-6w fr-text--center">
            <h2 className="fr-text--sm fr-text--uppercase">
              Découvrez Les {categoriesCount[1].themes.length} thématiques{' '}
              {category}
            </h2>
            <ThematicTags
              className="fr-tag--green-bourgeon"
              href="numerique-et-environnement"
              thematic={thematic}
              selected={toArray(urlPaginationParams.thematiques)}
              page={
                urlPaginationParams.page ? +urlPaginationParams.page : undefined
              }
            />
          </div>
          <main id={contentId}>
            <SearchResults
              paginationParams={paginationParams}
              count={resourcesCount}
              createPageLink={createThematicLink(
                'numerique-et-environnement',
                toArray(urlPaginationParams.thematiques),
              )}
            >
              <ResourcesSearchResults
                searchParams={searchParams}
                paginationParams={paginationParams}
                resources={resources}
                user={user}
                totalCount={resourcesCount}
              />
            </SearchResults>
          </main>
        </div>
      </div>
      <Webinaire />
    </>
  )
}

export default NumeriqueEtEnvironnementPage
