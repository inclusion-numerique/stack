import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import {
  type ProfileInscriptionSlug,
  allProfileInscriptionLabels,
  profileInscriptionFromSlug,
} from '@app/web/inscription/profilInscription'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const roleNextPageMap: Map<
  ProfileInscriptionSlug,
  (lieuActiviteCount: number) => string
> = new Map([
  ['coordinateur', () => `coordinateur/accompagnement`],
  ['coordinateur-conseiller-numerique', () => `coordinateur/accompagnement`],
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
  (roleFound: ProfileInscriptionSlug) => (lieuActiviteCount: number) =>
    roleNextPageMap.get(roleFound)?.(lieuActiviteCount)

export const AnotherRoleFound = ({
  roleFound,
  lieuActiviteCount,
}: {
  roleFound: ProfileInscriptionSlug
  lieuActiviteCount: number
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-12v">
    <div className="fr-text--center">
      <Image
        className="fr-mb-6v"
        width={94}
        height={88}
        src="/images/illustrations/landing-page/contexte/identifier.svg"
        alt=""
      />
      <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">
        Finaliser votre inscription pour accéder à votre espace
      </h1>
    </div>
    <div className="fr-background-contrast--info fr-p-3w fr-border-radius--8">
      <div className="fr-mb-2w">
        <img
          className="fr-mb-1w"
          alt=""
          src="/images/illustrations/role/conseillers-numerique.svg"
        />
        <h2 className="fr-h6 fr-mb-0">
          Profil de{' '}
          {allProfileInscriptionLabels[
            profileInscriptionFromSlug[roleFound]
          ].toLocaleLowerCase()}{' '}
          identifié
        </h2>
        <div>
          Nous avons identifié un profil de{' '}
          {allProfileInscriptionLabels[
            profileInscriptionFromSlug[roleFound]
          ].toLocaleLowerCase()}{' '}
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
        faites plus partie du dispositif conseiller numérique&nbsp;:
      </p>
      <Link href={`mailto:${PublicWebAppConfig.contactEmail}`}>
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
