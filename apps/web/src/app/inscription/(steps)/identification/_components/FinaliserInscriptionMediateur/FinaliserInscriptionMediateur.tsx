import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { MediateurRoleFound } from './MediateurRoleFound'

export const FinaliserInscriptionMediateur = ({
  inscriptionRole,
  lieuActiviteCount,
}: {
  inscriptionRole: ProfileInscriptionSlug
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
