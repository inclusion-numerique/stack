import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionConseiller = ({
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
    case 'coordinateur': {
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
          proConnectIdTokenHint={proConnectIdTokenHint}
          user={user}
          roleNotFound="conseiller-numerique"
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
