import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionConseiller = ({
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
    case 'coordinateur': {
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
