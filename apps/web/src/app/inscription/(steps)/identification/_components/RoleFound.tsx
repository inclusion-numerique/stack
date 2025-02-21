import { type ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const roleNextPageMap: Map<
  ProfileInscriptionSlug,
  (lieuActiviteCount: number) => string
> = new Map([
  ['coordinateur', (_: number) => 'coordinateur/accompagnement'],
  [
    'coordinateur-conseiller-numerique',
    (_: number) => 'coordinateur/accompagnement',
  ],
  [
    'conseiller-numerique',
    (lieuActiviteCount: number) =>
      lieuActiviteCount > 0
        ? `conseiller-numerique/recapitulatif`
        : 'conseiller-numerique-lieux/verifier',
  ],
  ['mediateur', (_: number) => 'mediateur/structure-employeuse'],
])

const nextPageFor =
  (roleFound: ProfileInscriptionSlug) => (lieuActiviteCount: number) =>
    roleNextPageMap.get(roleFound)?.(lieuActiviteCount)

export const RoleFound = ({
  role,
  lieuActiviteCount = 0,
  children,
}: {
  role: ProfileInscriptionSlug
  lieuActiviteCount?: number
  children: ReactNode
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
    {children}
    <div className="fr-text--center">
      <Link
        className="fr-width-full fr-display-block fr-mb-3w fr-btn fr-btn--lg"
        href={`/inscription/${nextPageFor(role)(lieuActiviteCount)}`}
      >
        Continuer
      </Link>
      <Link href="/" className="fr-link ">
        Revenir plus tard
      </Link>
    </div>
  </div>
)
