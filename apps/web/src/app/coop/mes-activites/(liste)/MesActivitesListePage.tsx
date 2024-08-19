import { Fragment } from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import { groupActivitesByDate } from '@app/web/cra/activitesQueries'
import { formatActiviteDayDate } from '@app/web/utils/activiteDayDateFormat'
import ActiviteMediateurCard from '@app/web/app/coop/mes-activites/(liste)/ActiviteMediateurCard'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'

const pageSizeOptions = generatePageSizeSelectOptions([10, 20, 50, 100])

const MesActivitesListePage = ({
  data: { searchParams, searchResult },
}: {
  data: ActivitesListPageData
}) => {
  const activitesByDate = groupActivitesByDate(searchResult.activites)

  const baseHref = '/coop/mes-activites'
  return (
    <>
      <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-py-4v wip-outline">
        🚧 filtres 🚧
      </div>
      <hr className="fr-separator-6v" />
      <p className="fr-text--bold fr-text-title--blue-france fr-mb-6v">
        {searchResult.matchesCount} résultat
        {sPluriel(searchResult.matchesCount)}
      </p>
      {activitesByDate.map(({ date, activites }) => (
        <Fragment key={new Date(date).toISOString()}>
          <h3 className="fr-text--xs fr-text-mention--grey fr-text--bold fr-text--uppercase fr-my-4v">
            {formatActiviteDayDate(date)}
          </h3>
          {activites.map((activite) => (
            <ActiviteMediateurCard key={activite.cra.id} activite={activite} />
          ))}
        </Fragment>
      ))}
      <PaginationNavWithPageSizeSelect
        className="fr-mt-12v"
        totalPages={searchResult.totalPages}
        baseHref={baseHref}
        searchParams={searchParams}
        defaultPageSize={10}
        pageSizeOptions={pageSizeOptions}
      />
    </>
  )
}

export default MesActivitesListePage
