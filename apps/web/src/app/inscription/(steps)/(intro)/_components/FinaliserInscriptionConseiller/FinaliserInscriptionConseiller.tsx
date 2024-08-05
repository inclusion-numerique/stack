import { AnotherRoleFound } from '../AnotherRoleFound'
import { InscriptionRole } from '../inscriptionRole'
import { RoleFound } from '../RoleFound'
import { RoleNotFound } from '../RoleNotFound'

export const FinaliserInscriptionConseiller = ({
  inscriptionRole,
  email,
  lieuActiviteCount,
}: {
  inscriptionRole: InscriptionRole
  email: string
  lieuActiviteCount: number
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
      return <RoleNotFound email={email} roleNotFound="conseiller-numerique" />
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
