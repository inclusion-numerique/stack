import Button from '@codegouvfr/react-dsfr/Button'
import { CreateCraModalDefinition } from '@app/web/app/coop/mes-activites/CreateCraModalDefinition'

const MesActivitesListeEmptyPage = () => (
  <div className="fr-border-radius--8 fr-p-12v fr-background-alt--blue-france fr-align-items-center">
    <h2 className="fr-h6 fr-mb-2v fr-text--center">
      Vous n’avez pas enregistré d’activité
    </h2>
    <p className="fr-text--center wip-outline fr-mb-8v">TODO</p>
    <div className="fr-flex fr-justify-content-center fr-width-full">
      <Button
        type="button"
        {...CreateCraModalDefinition.buttonProps}
        iconId="fr-icon-add-line"
      >
        Enregistrer une activité
      </Button>
    </div>
  </div>
)

export default MesActivitesListeEmptyPage
