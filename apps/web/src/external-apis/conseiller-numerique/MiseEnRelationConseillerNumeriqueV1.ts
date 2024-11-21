import { ObjectId } from 'mongodb'
import type { StructureConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/StructureConseillerNumerique'

export const MiseEnRelationV1MinimalProjection = {
  _id: 1,
  statut: 1,
  structureObj: 1,
  dateRecrutement: 1,
  dateDebutDeContrat: 1,
  dateFinDeContrat: 1,
  typeDeContrat: 1,
} as const

// Les statuts considérés comme "contract actif" pour nous sont uniquement :
//  - finalisee
//  - nouvelle_rupture
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
