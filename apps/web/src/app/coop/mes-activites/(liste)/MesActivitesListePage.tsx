import ActivitesTable from '@app/web/app/coop/mes-activites/(liste)/ActivitesTable'
import type { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'

const MesActivitesListePage = ({
  data: { searchParams, searchResult },
}: {
  data: ActivitesListPageData
}) => (
  <ActivitesTable
    data={searchResult}
    baseHref="/coop/mes-activites"
    searchParams={searchParams}
  />
)

export default MesActivitesListePage
