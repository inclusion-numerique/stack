import type { Prisma, TypeLieu, TypeLieuAtelier } from '@prisma/client'
import { v4 } from 'uuid'
import type { ParticipantsAnonymesCraCollectifData } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'
import {
  createBeneficiairesForParticipantsAnonymes,
} from '@app/web/beneficiaire/createBeneficiairesForParticipantsAnonymes'

/**
 * Create a CRA individuel prisma data with associated entities
 */
export const givenCraIndividuel = <
  T extends Partial<Prisma.ActiviteUncheckedCreateInput> & {
    mediateurId: string
    beneficiaireId: string
  },
>(
  data: T,
): {
  activite: Omit<T, 'id' | 'beneficiaireId'> & {
    id: string
    duree: number
    type: 'Individuel'
    date: string | Date
    typeLieu: TypeLieu
  }
  accompagnements: Prisma.AccompagnementUncheckedCreateInput[]
} => {
  const { id, beneficiaireId, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const typeLieu: TypeLieu = rest.typeLieu ?? 'ADistance'

  const givenId = id ?? v4()

  const activite = {
    ...rest,
    id: givenId,
    type: 'Individuel',
    duree,
    date,
    typeLieu,
  } satisfies Omit<T, 'id' | 'beneficiaireId'> & {
    id: string
    duree: number
    date: string | Date
    typeLieu: TypeLieu
  }

  const accompagnements = [
    {
      id: givenId,
      beneficiaireId,
      activiteId: givenId,
    },
  ] satisfies Prisma.AccompagnementUncheckedCreateInput[]

  return {
    activite,
    accompagnements,
  }
}

/**
 * Create a CRA demarche prisma data with associated entities
 */
export const givenCraDemarcheAdministrative = <
  T extends Partial<Prisma.ActiviteUncheckedCreateInput> & {
    mediateurId: string
    beneficiaireId: string
  },
>(
  data: T,
): {
  activite: Omit<T, 'id' | 'beneficiaireId'> & {
    id: string
    type: 'Demarche'
    duree: number
    date: string | Date
    typeLieu: TypeLieu
  }
  accompagnements: Prisma.AccompagnementUncheckedCreateInput[]
} => {
  const { id, beneficiaireId, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const typeLieu: TypeLieu = rest.typeLieu ?? 'ADistance'

  const givenId = id ?? v4()

  const activite = {
    ...rest,
    id: givenId,
    type: 'Demarche',
    duree,
    date,
    typeLieu,
  } satisfies Omit<T, 'id' | 'beneficiaireId'> & {
    id: string
    duree: number
    date: string | Date
    typeLieu: TypeLieu
  }

  const accompagnements = [
    {
      id: givenId,
      beneficiaireId,
      activiteId: givenId,
    },
  ] satisfies Prisma.AccompagnementUncheckedCreateInput[]

  return {
    activite,
    accompagnements,
  }
}

/**
 * We use deterministic related entity ids for easier upsert / merging logic
 * Use first half of a and second half of b uuid v4
 */
const mergeUuids = (a: string, b: string): string =>
  a.slice(0, 16) + b.slice(16)

/**
 * Create a CRA collectif prisma data with associated entities
 */
export const givenCraCollectif = <
  T extends Partial<Prisma.ActiviteUncheckedCreateInput> & {
    mediateurId: string
    beneficiaireIds: string[]
    participantsAnonymes: ParticipantsAnonymesCraCollectifData
  },
>(
  data: T,
): {
  activite: Omit<T, 'id' | 'participantsAnonymes' | 'beneficiaireIds'> & {
    id: string
    type: 'Collectif'
    duree: number
    typeLieuAtelier: TypeLieuAtelier
    date: string | Date
  }
  accompagnements: Prisma.AccompagnementUncheckedCreateInput[]
  beneficiairesAnonymes: Prisma.BeneficiaireUncheckedCreateInput[]
} => {
  const { id, beneficiaireIds, participantsAnonymes, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const typeLieuAtelier: TypeLieuAtelier = rest.typeLieuAtelier ?? 'Autre'

  const givenId = id ?? v4()

  const accompagnements = beneficiaireIds.map(
    (beneficiaireId) =>
      ({
        id: mergeUuids(givenId, beneficiaireId),
        beneficiaireId,
        activiteId: givenId,
      }) satisfies Prisma.AccompagnementUncheckedCreateInput,
  )

  // Create beneficiaires anonymes based on participantsAnonymes counters
  const beneficiairesAnonymes = createBeneficiairesForParticipantsAnonymes({
    participantsAnonymes,
    rootUuid: givenId,
    mediateurId: rest.mediateurId,
  })

  for (const beneficiaireAnonyme of beneficiairesAnonymes) {
    accompagnements.push({
      id: mergeUuids(givenId, beneficiaireAnonyme.id),
      beneficiaireId: beneficiaireAnonyme.id,
      activiteId: givenId,
    })
  }

  const activite = {
    ...rest,
    id: givenId,
    type: 'Collectif',
    duree,
    date,
    typeLieuAtelier,
  } satisfies Omit<T, 'id' | 'participantsAnonymes' | 'beneficiaireIds'> & {
    id: string
  }

  return {
    activite,
    accompagnements,
    beneficiairesAnonymes,
  }
}
