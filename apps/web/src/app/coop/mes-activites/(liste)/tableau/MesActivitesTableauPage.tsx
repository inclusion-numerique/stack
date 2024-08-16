import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import ActivitesTable from '@app/web/app/coop/mes-activites/(liste)/ActivitesTable'
import type { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'

const MesActivitesTableauPage = ({
  data: { searchParams, searchResult },
}: {
  data: ActivitesListPageData
}) => (
  <>
    <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-py-4v wip-outline">
      🚧 filtres 🚧
    </div>
    <hr className="fr-separator-6v" />
    <p className="fr-text--bold fr-text-title--blue-france fr-mb-6v">
      {searchResult.matchesCount} résultat{sPluriel(searchResult.matchesCount)}
    </p>
    <ActivitesTable
      data={searchResult}
      baseHref="/coop/mes-activites/tableau"
      searchParams={searchParams}
    />
  </>
)

export default MesActivitesTableauPage
