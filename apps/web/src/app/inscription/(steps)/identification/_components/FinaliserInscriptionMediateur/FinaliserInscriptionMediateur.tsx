import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import { AnotherRoleFound } from '../AnotherRoleFound'
import { MediateurRoleFound } from './MediateurRoleFound'

export const FinaliserInscriptionMediateur = ({
  checkedProfilInscription,
  lieuActiviteCount,
}: {
  checkedProfilInscription: ProfileInscriptionSlug
  lieuActiviteCount: number
}) =>
  checkedProfilInscription === 'mediateur' ? (
    <MediateurRoleFound />
  ) : (
    <AnotherRoleFound
      roleFound={checkedProfilInscription}
      lieuActiviteCount={lieuActiviteCount}
    />
  )
