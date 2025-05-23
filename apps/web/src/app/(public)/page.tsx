import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { fr } from '@codegouvfr/react-dsfr'

export const revalidate = 0

const HomePage = () => (
  <div className="fr-container">
    <h2 className={fr.cx('fr-mt-8v')}>
      Bienvenue sur {PublicWebAppConfig.projectTitle}
    </h2>
  </div>
)

export default HomePage
