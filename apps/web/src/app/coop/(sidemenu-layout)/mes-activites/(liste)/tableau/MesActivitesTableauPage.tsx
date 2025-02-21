import ActivitesTable from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ActivitesTable'
import type { ActivitesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesListPageData'
import { getActivitesResultCountLabel } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesResultCountLabel'
import { Spinner } from '@app/web/ui/Spinner'
import { Suspense } from 'react'

const SuspensedContent = async ({
  data,
}: {
  data: Promise<ActivitesListPageData>
}) => {
  const { searchParams, searchResult, isFiltered } = await data

  return (
    <>
      <p className="fr-text--bold fr-text--lg fr-mb-6v">
        {getActivitesResultCountLabel({ isFiltered, searchResult })}
      </p>
      <ActivitesTable
        data={searchResult}
        baseHref="/coop/mes-activites/tableau"
        searchParams={searchParams}
      />
    </>
  )
}

const MesActivitesTableauPage = ({
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

export default MesActivitesTableauPage
