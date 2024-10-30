import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
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

export const RoleFound = ({
  roleFound,
  lieuActiviteCount,
}: {
  roleFound: InscriptionRole
  lieuActiviteCount: number
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-12v">
    <div className="fr-text--center">
      <Image
        width={94}
        height={88}
        src="/images/illustrations/landing-page/contexte/identifier.svg"
        alt=""
      />
      <h1 className="fr-h3 fr-mb-0 fr-mt-3w fr-text-title--blue-france">
        Finaliser votre inscription pour accéder à votre espace
      </h1>
    </div>
    <RoleInscriptionNotice
      roleInscription={inscriptionRolesToText[roleFound]}
    />
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
