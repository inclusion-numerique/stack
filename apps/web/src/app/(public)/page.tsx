import ClosableAlert from '@stack/ui/components/ClosableAlert'
import Button from '@codegouvfr/react-dsfr/Button'

const HomePage = () => (
  <div className="fr-container">
    <h2>Yo</h2>
    <Button>Bonjour</Button>
    <ClosableAlert type="info" description="Une desc" title="Bonjour" />
  </div>
)

export default HomePage
