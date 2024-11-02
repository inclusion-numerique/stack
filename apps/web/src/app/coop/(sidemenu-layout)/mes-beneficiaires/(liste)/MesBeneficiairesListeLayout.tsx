import Button from '@codegouvfr/react-dsfr/Button'
import { PropsWithChildren } from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'

const MesBeneficiairesListeLayout = ({ children }: PropsWithChildren) => (
  <CoopPageContainer size={794}>
    <CoopBreadcrumbs currentPage="Mes bénéficiaires" />
    <div className="fr-mt-6v fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center">
      <h1 className="fr-h2 fr-text-title--blue-france fr-mb-0">
        Mes bénéficiaires
      </h1>
      <Button
        iconId="fr-icon-user-add-line"
        linkProps={{
          href: '/coop/mes-beneficiaires/nouveau',
        }}
      >
        Créer un bénéficiaire
      </Button>
    </div>
    {children}
  </CoopPageContainer>
)

export default MesBeneficiairesListeLayout
