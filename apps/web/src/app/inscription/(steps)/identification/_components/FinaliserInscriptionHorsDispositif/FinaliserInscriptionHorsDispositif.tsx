import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import React from 'react'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { RoleFound } from '../RoleFound'

export const FinaliserInscriptionHorsDispositif = ({
  checkedProfilInscription,
  intendedProfilInscription,
  lieuActiviteCount,
}: {
  checkedProfilInscription: ProfileInscriptionSlug
  intendedProfilInscription: ProfileInscriptionSlug
  lieuActiviteCount: number
}) =>
  checkedProfilInscription === 'mediateur' ? (
    <RoleFound role={intendedProfilInscription}>
      <div className="fr-text--center">
        <p>
          La Coop de la médiation numérique s’adresse aux médiateurs numériques
          professionnels.
        </p>
        <p className="fr-mb-0">
          Afin de finaliser votre inscription, nous allons vous demander de{' '}
          <strong>
            renseigner votre structure employeuse
            {intendedProfilInscription === 'mediateur' &&
              ' ainsi que vos lieux d’activités'}
            .
          </strong>
        </p>
      </div>
    </RoleFound>
  ) : (
    <AnotherRoleFound
      roleFound={checkedProfilInscription}
      lieuActiviteCount={lieuActiviteCount}
    />
  )
