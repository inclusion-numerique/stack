import { ObjectId } from 'mongodb'
import type { StructureConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/StructureConseillerNumerique'

export type StatutMiseEnRelationV1 =
  | 'finalisee'
  | 'finalisee_rupture'
  | 'interessee'
  | 'nonInteressee'
  | 'nouvelle'
  | 'nouvelle_rupture'
  | 'recrutee'
  | 'renouvellement_initiee'
  | 'terminee'

export type MiseEnRelationConseillerNumeriqueV1MinimalProjection = {
  _id: ObjectId
  statut: StatutMiseEnRelationV1
  structureObj: StructureConseillerNumerique
  dateRecrutement: Date | null
  dateDebutDeContrat: Date | null
  dateFinDeContrat: Date | null
  typeDeContrat: string // 'CDD' or other values
}
