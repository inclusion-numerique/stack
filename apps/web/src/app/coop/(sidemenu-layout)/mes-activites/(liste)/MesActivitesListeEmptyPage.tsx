import { CreateCraModalDefinition } from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModalDefinition'
import Button from '@codegouvfr/react-dsfr/Button'

const MesActivitesListeEmptyPage = () => (
  <>
    <hr className="fr-separator-6v" />

    <div className="fr-border-radius--8 fr-p-12v fr-background-alt--blue-france fr-align-items-center">
      <h2 className="fr-h6 fr-mb-2v fr-text--center">
        Vous n’avez pas encore enregistré d’activité
      </h2>
      <p className="fr-text--center fr-mb-8v">
        Cette page vous permet de retrouver l’historique de l’ensemble des
        activités que vous enregistrez. Vous pouvez enregistrer votre première
        activité en cliquant sur ‘Enregistrer une activité’.
      </p>
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
  </>
)

export default MesActivitesListeEmptyPage
