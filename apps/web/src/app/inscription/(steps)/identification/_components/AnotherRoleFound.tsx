import Link from 'next/link'
import React from 'react'
import { InscriptionRole, inscriptionRolesToText } from './inscriptionRole'

const roleNextPageMap: Map<
  InscriptionRole,
  (lieuActiviteCount: number) => string
> = new Map([
  ['coordinateur', (_: number) => `coordinateur/accompagnement`],
  [
    'conseiller-numerique',
    (lieuActiviteCount: number) =>
      lieuActiviteCount > 0
        ? `conseiller-numerique/recapitulatif`
        : 'conseiller-numerique-lieux/verifier',
  ],
  ['mediateur', (_: number) => ''],
])

const nextPageFor =
  (roleFound: InscriptionRole) => (lieuActiviteCount: number) =>
    roleNextPageMap.get(roleFound)?.(lieuActiviteCount)

export const AnotherRoleFound = ({
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
    <div className="fr-background-contrast--info fr-p-3w fr-border-radius--8">
      <div className="fr-mb-2w">
        <img
          className="fr-mb-1w"
          alt=""
          src="/images/services/conseillers-numerique-logo.svg"
        />
        <h2 className="fr-h6 fr-mb-0">
          Profil de {inscriptionRolesToText[roleFound]} identifié
        </h2>
        <div>
          Nous avons identifié un profil de {inscriptionRolesToText[roleFound]}{' '}
          correspondant aux informations que vous avez renseignées.
        </div>
        <div className="fr-text--sm fr-text-mention--grey">
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
      <p className="fr-mb-1w fr-text--sm fr-text--medium">
        Si ce rôle ne correspond pas à votre situation actuelle, si vous ne
        faites plus partie du dispositif conseiller numérique :
      </p>
      <Link href="mailto:coop-numerique@anct.gouv.fr">
        <span role="img" className="ri-mail-line fr-mr-1w" aria-hidden />
        Veuillez contacter le support
      </Link>
    </div>
    <div className="fr-text--center">
      <Link
        className="fr-btn fr-btn--lg fr-btn--responsive fr-mb-3w"
        href={`/inscription/${nextPageFor(roleFound)(lieuActiviteCount)}`}
      >
        Continuer mon inscription
      </Link>
      <Link href="/" className="fr-link">
        Revenir plus tard
      </Link>
    </div>
  </div>
)
