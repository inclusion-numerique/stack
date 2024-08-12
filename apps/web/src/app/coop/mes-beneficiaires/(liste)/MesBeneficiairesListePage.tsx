import { BeneficiairesListPageData } from '@app/web/app/coop/mes-beneficiaires/(liste)/getBeneficiairesListPageData'
import BeneficiairesTable from '@app/web/app/coop/mes-beneficiaires/(liste)/BeneficiairesTable'
import DataSearchBar from '@app/web/data-table/DataSearchBar'

const MesBeneficiairesListePage = ({
  data: { searchParams, searchResult },
}: {
  data: BeneficiairesListPageData
}) => (
  <div className="fr-border fr-border-radius--8 fr-p-8v">
    <DataSearchBar
      baseHref="/coop/mes-beneficiaires"
      searchParams={searchParams}
      placeholder="Rechercher parmi vos bénéficiaires enregistrés"
    />
    <hr className="fr-separator-8v" />
    <BeneficiairesTable
      data={searchResult}
      baseHref="/coop/mes-beneficiaires"
      searchParams={searchParams}
    />
  </div>
)

export default MesBeneficiairesListePage
