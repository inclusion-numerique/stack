import UploadBeneficiaireFileForm from '@app/web/app/coop/mes-beneficiaires/importer/UploadBeneficiaireFileForm'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

const ImporterPage = () => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs
      parents={[
        {
          label: `Mes bénéficiaires`,
          linkProps: { href: '/coop/mes-beneficiaires' },
        },
      ]}
      currentPage="Importer des bénéficiaires"
    />
    <UploadBeneficiaireFileForm />
  </CoopPageContainer>
)

export default ImporterPage
