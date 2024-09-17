import { AnotherRoleFound } from '../AnotherRoleFound'
import { InscriptionRole } from '../inscriptionRole'
import { MediateurRoleFound } from './MediateurRoleFound'

export const FinaliserInscriptionMediateur = ({
  inscriptionRole,
  lieuActiviteCount,
}: {
  inscriptionRole: InscriptionRole
  lieuActiviteCount: number
}) =>
  inscriptionRole === 'mediateur' ? (
    <MediateurRoleFound />
  ) : (
    <AnotherRoleFound
      roleFound={inscriptionRole}
      lieuActiviteCount={lieuActiviteCount}
    />
  )
