import { BeneficiairesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getBeneficiairesListPageData'
import BeneficiairesTable from '@app/web/app/coop/mes-activites/(liste)/BeneficiairesTable'
import DataSearchBar from '@app/web/data-table/DataSearchBar'

const MesActivitesListePage = ({
  data: { searchParams, searchResult },
}: {
  data: ActivitesListPageData
}) => (
  <div className="fr-border fr-border-radius--8 fr-p-8v">
    <DataSearchBar
      baseHref="/coop/mes-activites"
      searchParams={searchParams}
      placeholder="Rechercher parmi vos bénéficiaires enregistrés"
    />
    <hr className="fr-separator-8v" />
    <ActivitesTable
      data={searchResult}
      baseHref="/coop/mes-activites"
      searchParams={searchParams}
    />
  </div>
)

export default MesActivitesListePage
