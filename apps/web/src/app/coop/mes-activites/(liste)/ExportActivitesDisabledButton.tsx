import Button from '@codegouvfr/react-dsfr/Button'

const ExportActivitesDisabledButton = () => (
  <Button
    type="button"
    iconPosition="right"
    iconId="fr-icon-download-line"
    disabled
    priority="tertiary"
  >
    Exporter
  </Button>
)

export default ExportActivitesDisabledButton
