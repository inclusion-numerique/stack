import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'

const HomePage = () => (
  <div className="fr-container">
    <h2 className={fr.cx('fr-mt-8v')}>Bien le bonjour</h2>
    <Alert
      severity="info"
      title="Stack"
      description="Ceci est une page de démonstration"
    />
  </div>
)

export default HomePage
