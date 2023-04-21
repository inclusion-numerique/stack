import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { ExampleClientComponent } from '@app/web/app/(public)/ExampleClientComponent'

const HomePage = () => (
  <>
    <h2 className={fr.cx('fr-mt-8v')}>Bien le bonjour</h2>
    <Alert
      severity="info"
      title="Stack"
      description="Ceci est une page de démonstration"
    />
    <ExampleClientComponent />
  </>
)

export default HomePage
