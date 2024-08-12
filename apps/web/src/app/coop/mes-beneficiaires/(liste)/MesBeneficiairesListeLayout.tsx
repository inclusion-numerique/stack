import Button from '@codegouvfr/react-dsfr/Button'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { PropsWithChildren } from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'

const MesBeneficiairesListeLayout = ({
  children,
  beneficiairesCount,
}: PropsWithChildren<{
  beneficiairesCount: number
}>) => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Mes bénéficiaires" />
    <div className="fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center">
      <h1 className="fr-text-title--blue-france fr-mb-0">Mes bénéficiaires</h1>
      <Button
        iconId="fr-icon-user-add-line"
        linkProps={{
          href: '/coop/mes-beneficiaires/nouveau',
        }}
      >
        Créer un bénéficiaire
      </Button>
    </div>
    <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-mb-8v">
      <p className="fr-mb-0">
        <span className="fr-text--bold">{beneficiairesCount}</span> bénéficiaire
        {sPluriel(beneficiairesCount)}
      </p>
      <Button
        iconId="fr-icon-download-line"
        priority="tertiary no outline"
        className="wip-outline"
        size="small"
        linkProps={{
          href: '/coop/mes-beneficiaires/importer',
        }}
      >
        Importer des bénéficiaires
      </Button>
    </div>
    {children}
  </CoopPageContainer>
)

export default MesBeneficiairesListeLayout
