import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { Suspense } from 'react'
import ActivitesTable from '@app/web/app/coop/mes-activites/(liste)/ActivitesTable'
import type { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import { Spinner } from '@app/web/ui/Spinner'

const SuspensedContent = async ({
  data,
}: {
  data: Promise<ActivitesListPageData>
}) => {
  const { searchParams, searchResult } = await data
  return (
    <>
      <p className="fr-text--bold fr-text-title--blue-france fr-mb-6v">
        {searchResult.matchesCount} résultat
        {sPluriel(searchResult.matchesCount)}
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
