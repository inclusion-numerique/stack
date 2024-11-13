import type { ConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Document'
import type { MiseEnRelationConseillerNumeriqueV1MinimalProjection } from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'
import type { PermanenceConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/PermanenceConseillerNumerique'

export type ConseillerNumeriqueV1Data = {
  conseiller: ConseillerNumeriqueV1
  miseEnRelations: MiseEnRelationConseillerNumeriqueV1MinimalProjection[]
  // Si le conseiller est conventionné, c'est la première mise en relation qui correspond au critères de contrat actif
  // Si il n'y a pas de mise en relation active, on considère que le conseiller n’est pas / plus en contrat
  miseEnRelationActive: MiseEnRelationConseillerNumeriqueV1MinimalProjection | null
  permanences: PermanenceConseillerNumerique[]
  conseillersCoordonnes: ConseillerNumeriqueV1[] | null // null if not a coordinateur
}
