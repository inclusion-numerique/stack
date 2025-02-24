import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ProfileInscriptionSlug,
  allProfileInscriptionLabels,
  profileInscriptionFromSlug,
} from '@app/web/inscription/profilInscription'
import React from 'react'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionConseillerNumerique = ({
  checkedProfilInscription,
  lieuActiviteCount,
  user,
  proConnectIdTokenHint,
}: {
  checkedProfilInscription: ProfileInscriptionSlug
  lieuActiviteCount: number
  user: Pick<SessionUser, 'email' | 'id'>
  proConnectIdTokenHint: string | null
}) => {
  switch (checkedProfilInscription) {
    case 'coordinateur-conseiller-numerique': {
      return (
        <AnotherRoleFound
          roleFound={checkedProfilInscription}
          lieuActiviteCount={lieuActiviteCount}
        />
      )
    }
    case 'mediateur': {
      return (
        <RoleNotFound
          proConnectIdTokenHint={proConnectIdTokenHint}
          user={user}
          roleNotFound="conseiller-numerique"
        />
      )
    }
    case 'coordinateur': {
      return (
        <RoleNotFound
          proConnectIdTokenHint={proConnectIdTokenHint}
          user={user}
          roleNotFound="conseiller-numerique"
        />
      )
    }
    default: {
      return (
        <RoleFound
          role={checkedProfilInscription}
          lieuActiviteCount={lieuActiviteCount}
        >
          <RoleInscriptionNotice
            roleInscription={allProfileInscriptionLabels[
              profileInscriptionFromSlug[checkedProfilInscription]
            ].toLocaleLowerCase()}
          />
        </RoleFound>
      )
    }
  }
}
