import Button from '@codegouvfr/react-dsfr/Button'
import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

export const revalidate = 0

const HomePage = () => (
  <div className="fr-container fr-container--narrow">
    <div className="fr-my-32v fr-p-12v fr-width-full fr-background-alt--blue-france fr-border-radius--8">
      <h1 className="fr-text-title--blue-france fr-mb-12v">
        Site vitrine de la coop de la médiation numérique
      </h1>
      <p>Accéder à la coop :</p>
      <ul className="fr-btns-group fr-btns-group--icon-right">
        <li>
          <Button
            linkProps={{
              href: `/connexion?suivant=/inscription?profil=${profileInscriptionSlugs.ConseillerNumerique}`,
            }}
            iconId="fr-icon-arrow-right-line"
          >
            Je suis conseiller numérique
          </Button>
        </li>
        <li>
          <Button
            linkProps={{
              href: `/connexion?suivant=/inscription?profil=${profileInscriptionSlugs.Mediateur}`,
            }}
            iconId="fr-icon-arrow-right-line"
          >
            Je suis médiateur numérique
          </Button>
        </li>
        <li>
          <Button
            linkProps={{
              href: `/connexion?suivant=/inscription?profil=${profileInscriptionSlugs.Coordinateur}`,
            }}
            iconId="fr-icon-arrow-right-line"
          >
            Je suis coordinateur de conseillers numériques
          </Button>
        </li>
      </ul>
    </div>
  </div>
)

export default HomePage
