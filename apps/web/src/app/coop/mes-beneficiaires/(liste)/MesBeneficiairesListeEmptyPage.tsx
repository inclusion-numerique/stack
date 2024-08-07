import Button from '@codegouvfr/react-dsfr/Button'

const MesBeneficiairesListeEmptyPage = () => (
  <div className="fr-border-radius--8 fr-p-12v fr-background-alt--blue-france fr-align-items-center">
    <h2 className="fr-h6 fr-mb-2v fr-text--center">
      Vous n’avez pas enregistré de bénéficiaire
    </h2>
    <p className="fr-text--center wip-outline fr-mb-8v">
      Vous pouvez créer un·e bénéficiaire afin de réaliser un suivi de ses
      accompagnements. Vous retrouverez la liste de vos bénéficiaires sur cette
      page.
      <br />
      <br />
      Vous pouvez également{' '}
    </p>
    <div className="fr-flex fr-justify-content-center fr-width-full">
      <Button
        iconId="fr-icon-download-line"
        priority="tertiary"
        className="wip-outline"
        linkProps={{
          href: '/coop/mes-beneficiaires/importer',
        }}
      >
        Importer des bénéficiaires
      </Button>
    </div>
  </div>
)

export default MesBeneficiairesListeEmptyPage
