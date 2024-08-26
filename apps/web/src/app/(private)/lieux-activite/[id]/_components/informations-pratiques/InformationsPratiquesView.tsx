import Link from 'next/link'
import { OpeningHours } from './OpeningHours'

export const InformationsPratiquesView = ({
  lieuItinerant,
  siteWeb,
  ficheAccesLibre,
  priseRdv,
  horaires,
}: {
  lieuItinerant?: boolean | null
  siteWeb?: string | null
  ficheAccesLibre?: string | null
  priseRdv?: string | null
  horaires?: string | null
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-6v">
    <div>
      <span className="fr-text-mention--grey">Site internet du lieu</span>
      <div data-testid="informations-pratiques-site-web">
        {siteWeb ? (
          <Link
            className="fr-link"
            href={siteWeb}
            target="_blank"
            rel="noreferrer"
          >
            {siteWeb}
          </Link>
        ) : (
          <span className="fr-text--medium">Non renseigné</span>
        )}
      </div>
    </div>
    {lieuItinerant && (
      <div data-testid="informations-pratiques-lieu-itinerant">
        <span
          className="fr-icon-bus-line ri-lg fr-text-label--blue-france fr-mr-1w"
          aria-hidden
        />
        <span className="fr-text-mention--grey">Lieu itinérant</span>
      </div>
    )}
    <div>
      <span className="fr-text-mention--grey">Accessibilité</span>
      <div data-testid="informations-pratiques-accessibilite">
        {ficheAccesLibre ? (
          <Link
            className="fr-link"
            href={ficheAccesLibre}
            target="_blank"
            rel="noreferrer"
          >
            Retrouvez les informations d’accessibilité via ce lien
          </Link>
        ) : (
          <span className="fr-text--medium">Non renseignée</span>
        )}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">
        Prise de rendez-vous en ligne{' '}
      </span>
      <div data-testid="informations-pratiques-prise-rdv">
        {priseRdv ? (
          <Link
            className="fr-link"
            href={priseRdv}
            target="_blank"
            rel="noreferrer"
          >
            Prenez rendez-vous en ligne via ce lien
          </Link>
        ) : (
          <span className="fr-text--medium">Non renseignée</span>
        )}
      </div>
    </div>
    <div>
      <span className="fr-text-mention--grey">
        Horaires d’ouverture du lieu
      </span>
      <div data-testid="informations-pratiques-horaires">
        {horaires ? (
          <OpeningHours className="fr-mt-1w" horaires={horaires} />
        ) : (
          <div className="fr-text--medium">Non renseigné</div>
        )}
      </div>
    </div>
  </div>
)
