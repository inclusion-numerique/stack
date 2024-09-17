import Link from 'next/link'
import { InscriptionRole, inscriptionRolesToText } from './inscriptionRole'

const nextPageFor =
  (roleFound: InscriptionRole) => (lieuActiviteCount: number) =>
    roleFound === 'coordinateur' ||
    (roleFound === 'conseiller-numerique' && lieuActiviteCount > 0)
      ? `${roleFound}/recapitulatif`
      : 'conseiller-numerique-lieux/verifier'

export const RoleFound = ({
  roleFound,
  lieuActiviteCount,
}: {
  roleFound: InscriptionRole
  lieuActiviteCount: number
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-12v">
    <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">
      Finaliser votre inscription pour accéder à votre espace
    </h1>
    <div className="fr-background-contrast--info fr-p-3w fr-border-radius--8 fr-flex fr-align-items-center fr-flex-gap-4v">
      <img alt="" src="/images/services/conseillers-numerique-logo.svg" />
      <div>
        <h2 className="fr-h6 fr-mb-0">
          Vous avez été identifié en tant que{' '}
          {inscriptionRolesToText[roleFound]}
        </h2>
        <div className="fr-text--sm fr-mb-0 fr-text-mention--grey">
          Source :{' '}
          <Link
            href="https://conseiller-numerique.gouv.fr"
            target="_blank"
            rel="noreferrer"
          >
            conseiller-numerique.gouv.fr
          </Link>
        </div>
      </div>
    </div>
    <div className="fr-text--center">
      <Link
        className="fr-width-full fr-display-block fr-mb-3w fr-btn fr-btn--lg"
        href={`/inscription/${nextPageFor(roleFound)(lieuActiviteCount)}`}
      >
        Continuer
      </Link>
      <Link href="/" className="fr-link ">
        Revenir plus tard
      </Link>
    </div>
  </div>
)
