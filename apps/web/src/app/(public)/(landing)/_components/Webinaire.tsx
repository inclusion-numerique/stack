import Link from 'next/link'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const Webinaire = () => (
  <div className="fr-background-action-low--blue-france fr-py-6w">
    <div className="fr-container">
      <div className="fr-flex-md fr-flex-gap-4v">
        <div className="fr-col-lg-6">
          <h2 className="fr-mb-1w fr-text-title--blue-france">
            Participez au prochain webinaire
          </h2>
          <p>
            Vous souhaitez en savoir plus sur La Coop de la médiation
            numérique ?
            <br />
            Nous organisons régulièrement des présentations de l’outil & des
            prochaines évolutions.
          </p>
          <Link
            href="https://tally.so/r/nr0ayL"
            target="_blank"
            rel="noreferrer"
            title="Accéder à l'inscription au prochain webinaire - nouvel onglet"
            className="fr-btn fr-btn--responsive-sm"
          >
            S’incrire au prochain webinaire
          </Link>
        </div>
        <div className="fr-border-right fr-border--blue-france fr-mx-md-10w" />
        <div className="fr-border-bottom fr-border--blue-france fr-my-3w fr-hidden-md" />
        <div>
          <h2 className="fr-mb-1w fr-text-title--blue-france">
            Nous contacter
          </h2>
          <p>
            En cas de questions, de suggestions, de propositions, n’hésitez pas
            à nous contacter à l’adresse suivante :
          </p>
          <div className="fr-text--lg fr-text-label--blue-france">
            <span className="ri-mail-line fr-mr-1w" aria-hidden="true" />
            <Link href={`mailto:${PublicWebAppConfig.contactEmail}`}>
              {PublicWebAppConfig.contactEmail}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Webinaire
