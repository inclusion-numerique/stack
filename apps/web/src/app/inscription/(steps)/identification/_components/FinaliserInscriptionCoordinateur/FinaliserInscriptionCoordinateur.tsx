import type { SessionUser } from '@app/web/auth/sessionUser'
import { AnotherRoleFound } from '../AnotherRoleFound'
import type { InscriptionRole } from '../inscriptionRole'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionCoordinateur = ({
  inscriptionRole,
  lieuActiviteCount,
  user,
}: {
  inscriptionRole: InscriptionRole
  lieuActiviteCount: number
  user: Pick<SessionUser, 'email' | 'id' | 'usurper'>
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
      return <RoleNotFound roleNotFound="coordinateur" user={user} />
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
