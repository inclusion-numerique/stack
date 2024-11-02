import Button from '@codegouvfr/react-dsfr/Button'
import { BeneficiairesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/(liste)/getBeneficiairesListPageData'
import BeneficiairesTable from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/(liste)/BeneficiairesTable'
import DataSearchBar from '@app/web/data-table/DataSearchBar'
import { getBeneficiairesResultCountLabel } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/(liste)/getBeneficiairesResultCountLabel'

const MesBeneficiairesListePage = ({
  data: { searchParams, searchResult, isFiltered },
}: {
  data: BeneficiairesListPageData
}) => (
  <>
    <div className="fr-flex fr-mt-8v fr-flex-gap-12v">
      <DataSearchBar
        baseHref="/coop/mes-beneficiaires"
        searchParams={searchParams}
        placeholder="Rechercher parmi vos bénéficiaires enregistrés"
      />
      <Button
        iconId="fr-icon-upload-line"
        priority="secondary"
        size="small"
        linkProps={{
          href: '/coop/mes-beneficiaires/importer',
        }}
      >
        Importer
      </Button>
    </div>
    <hr className="fr-separator-4v" />
    <p className="fr-text--bold fr-text--lg fr-my-6v">
      {getBeneficiairesResultCountLabel({ isFiltered, searchResult })}
    </p>
    <BeneficiairesTable
      data={searchResult}
      baseHref="/coop/mes-beneficiaires"
      searchParams={searchParams}
    />
  </>
)

export default MesBeneficiairesListePage
