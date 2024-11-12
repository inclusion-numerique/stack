import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionCoordinateur = ({
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
    case 'conseiller-numerique': {
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
          roleNotFound="coordinateur"
          user={user}
          proConnectIdTokenHint={proConnectIdTokenHint}
        />
      )
    }
    default: {
      return (
        <RoleFound
          roleFound={checkedProfilInscription}
          lieuActiviteCount={lieuActiviteCount}
        />
      )
    }
  }
}
