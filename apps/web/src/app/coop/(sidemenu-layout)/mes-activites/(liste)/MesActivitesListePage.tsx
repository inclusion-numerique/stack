import ActiviteMediateurCard from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ActiviteMediateurCard'
import type { ActivitesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesListPageData'
import { getActivitesResultCountLabel } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesResultCountLabel'
import { groupActivitesByDate } from '@app/web/cra/activitesQueries'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'
import { Spinner } from '@app/web/ui/Spinner'
import { formatActiviteDayDate } from '@app/web/utils/activiteDayDateFormat'
import { Fragment, Suspense } from 'react'

const pageSizeOptions = generatePageSizeSelectOptions([10, 20, 50, 100])

const SuspensedContent = async ({
  data,
}: {
  data: Promise<ActivitesListPageData>
}) => {
  const { searchParams, searchResult, isFiltered } = await data

  const activitesByDate = groupActivitesByDate(searchResult.activites)

  const baseHref = '/coop/mes-activites'
  return (
    <>
      <p className="fr-text--bold fr-text--lg fr-mb-6v">
        {getActivitesResultCountLabel({ isFiltered, searchResult })}
      </p>
      {activitesByDate.map(({ date, activites }) => (
        <Fragment key={new Date(date).toISOString()}>
          <h3 className="fr-text--xs fr-text-mention--grey fr-text--bold fr-text--uppercase fr-my-4v">
            {formatActiviteDayDate(date)}
          </h3>
          {activites.map((activite) => (
            <ActiviteMediateurCard key={activite.id} activite={activite} />
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

const MesActivitesListePage = ({
  data,
}: {
  data: Promise<ActivitesListPageData>
}) => (
  <>
    <hr className="fr-separator-6v" />
    <Suspense fallback={<Spinner />}>
      <SuspensedContent data={data} />
    </Suspense>
  </>
)

export default MesActivitesListePage
