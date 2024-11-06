import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionCoordinateur = ({
  inscriptionRole,
  lieuActiviteCount,
  user,
  proConnectIdTokenHint,
}: {
  inscriptionRole: ProfileInscriptionSlug
  lieuActiviteCount: number
  user: Pick<SessionUser, 'email' | 'id' | 'usurper'>
  proConnectIdTokenHint: string | null
}) => {
  switch (inscriptionRole) {
    case 'conseiller-numerique': {
      return (
        <AnotherRoleFound
          roleFound={inscriptionRole}
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
          roleFound={inscriptionRole}
          lieuActiviteCount={lieuActiviteCount}
        />
      )
    }
  }
}
