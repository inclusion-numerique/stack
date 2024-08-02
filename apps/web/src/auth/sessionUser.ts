import type {
  ConseillerNumerique,
  Coordinateur,
  EmployeStructure,
  Mediateur,
  User,
  Structure,
} from '@prisma/client'

// Serializable user interface
export type SessionUser = Pick<
  User,
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'name'
  | 'email'
  | 'phone'
  | 'role'
  | 'isFixture'
  | 'profilInscription'
> & {
  emailVerified: string | null
  created: string | null
  updated: string | null
  inscriptionValidee: string | null
  structureEmployeuseRenseignee: string | null
  checkConseillerNumeriqueInscription: string | null
  lieuxActiviteRenseignes: string | null
  usurper: { id: string } | null
  emplois: (Pick<EmployeStructure, 'id'> & {
    structure: Pick<Structure, 'nom'>
  })[]
  mediateur:
    | (Pick<Mediateur, 'id'> & {
        conseillerNumerique: Pick<ConseillerNumerique, 'id'> | null
        _count: { enActivite: number }
      })
    | null
  coordinateur: Pick<Coordinateur, 'id'> | null
}
