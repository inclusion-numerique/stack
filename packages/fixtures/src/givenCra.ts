import { LieuAccompagnement, LieuAtelier, Prisma } from '@prisma/client'
import { v4 } from 'uuid'

export const givenCraIndividuel = <
  T extends Partial<Prisma.CraIndividuelUncheckedCreateInput> & {
    creeParMediateurId: string
    beneficiaireId: string
  },
>(
  data: T,
): Omit<T, 'id'> & {
  id: string
  duree: number
  date: string | Date
  lieuAccompagnement: LieuAccompagnement
} => {
  const { id, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const lieuAccompagnement =
    rest.lieuAccompagnement ?? LieuAccompagnement.ADistance

  const givenId = id ?? v4()

  return {
    id: givenId,
    ...rest,
    duree,
    date,
    lieuAccompagnement,
  } satisfies Prisma.CraIndividuelUncheckedCreateInput
}

export const givenCraDemarcheAdministrative = <
  T extends Partial<Prisma.CraDemarcheAdministrativeUncheckedCreateInput> & {
    creeParMediateurId: string
    beneficiaireId: string
  },
>(
  data: T,
): Omit<T, 'id'> & {
  id: string
  duree: number
  date: string | Date
  lieuAccompagnement: LieuAccompagnement
} => {
  const { id, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const lieuAccompagnement =
    rest.lieuAccompagnement ?? LieuAccompagnement.ADistance

  const givenId = id ?? v4()

  return {
    id: givenId,
    ...rest,
    duree,
    date,
    lieuAccompagnement,
  } satisfies Prisma.CraDemarcheAdministrativeUncheckedCreateInput
}

export const givenCraCollectif = <
  T extends Partial<Prisma.CraCollectifUncheckedCreateInput> & {
    creeParMediateurId: string
    beneficiaireId: string
    participantsAnonymesId: string
  },
>(
  data: T,
): Omit<T, 'id'> & {
  id: string
} => {
  const { id, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const lieuAtelier = rest.lieuAtelier ?? LieuAtelier.Autre

  const givenId = id ?? v4()

  return {
    id: givenId,
    ...rest,
    duree,
    date,
    lieuAtelier,
  } satisfies Prisma.CraCollectifUncheckedCreateInput
}
