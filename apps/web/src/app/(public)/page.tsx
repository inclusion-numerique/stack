import { fr } from '@codegouvfr/react-dsfr'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

const HomePage = () => (
  <div className="fr-container">
    <h2 className={fr.cx('fr-mt-8v')}>
      Bienvenue sur {PublicWebAppConfig.projectTitle}
    </h2>
  </div>
)

export default HomePage
