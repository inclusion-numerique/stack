import type {
  ConseillerNumerique,
  Coordinateur,
  EmployeStructure,
  Mediateur,
  Structure,
  User,
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
  | 'checkedProfilInscription'
  | 'acceptationCgu'
> & {
  emailVerified: string | null
  created: string | null
  updated: string | null
  hasSeenOnboarding: string | null
  inscriptionValidee: string | null
  structureEmployeuseRenseignee: string | null
  lieuxActiviteRenseignes: string | null
  usurper: { id: string } | null
  emplois: (Pick<EmployeStructure, 'id'> & {
    structure: Pick<Structure, 'nom'>
  })[]
  mediateur:
    | (Pick<Mediateur, 'id'> & {
        coordinations: {
          coordinateur: {
            id: string
            user: { name: string | null }
            mediateursCoordonnes: {
              id: string
            }[]
          }
        }[]
        conseillerNumerique: Pick<ConseillerNumerique, 'id'> | null
        _count: { enActivite: number }
      })
    | null
  coordinateur:
    | (Pick<Coordinateur, 'id' | 'conseillerNumeriqueId'> & {
        mediateursCoordonnes: { mediateurId: string }[]
      })
    | null
}
