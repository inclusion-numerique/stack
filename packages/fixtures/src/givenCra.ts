import type { LieuAccompagnement, LieuAtelier, Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import type { ParticipantsAnonymesCraCollectifData } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

/**
 * Create a CRA individuel prisma data with associated entities
 */
export const givenCraIndividuel = <
  T extends Partial<Prisma.CraIndividuelUncheckedCreateInput> & {
    creeParMediateurId: string
    beneficiaireId: string
  },
>(
  data: T,
): {
  cra: Omit<T, 'id'> & {
    id: string
    duree: number
    date: string | Date
    lieuAccompagnement: LieuAccompagnement
  }
  activiteBeneficiaire: Prisma.ActiviteBeneficiaireUncheckedCreateInput
  activiteMediateur: Prisma.ActiviteMediateurUncheckedCreateInput
} => {
  const { id, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const lieuAccompagnement = rest.lieuAccompagnement ?? 'ADistance'

  const givenId = id ?? v4()

  const activiteBeneficiaire = {
    id: givenId,
    beneficiaireId: rest.beneficiaireId,
    craIndividuelId: givenId,
  } satisfies Prisma.ActiviteBeneficiaireUncheckedCreateInput

  const activiteMediateur = {
    id: givenId,
    mediateurId: rest.creeParMediateurId,
    craIndividuelId: givenId,
  } satisfies Prisma.ActiviteMediateurUncheckedCreateInput

  const cra = {
    id: givenId,
    ...rest,
    duree,
    date,
    lieuAccompagnement,
  } satisfies Omit<T, 'id'> & {
    id: string
    duree: number
    date: string | Date
    lieuAccompagnement: LieuAccompagnement
  }

  return {
    cra,
    activiteBeneficiaire,
    activiteMediateur,
  }
}

/**
 * Create a CRA demarche prisma data with associated entities
 */
export const givenCraDemarcheAdministrative = <
  T extends Partial<Prisma.CraDemarcheAdministrativeUncheckedCreateInput> & {
    creeParMediateurId: string
    beneficiaireId: string
  },
>(
  data: T,
): {
  cra: Omit<T, 'id'> & {
    id: string
    duree: number
    date: string | Date
    lieuAccompagnement: LieuAccompagnement
  }
  activiteBeneficiaire: Prisma.ActiviteBeneficiaireUncheckedCreateInput
  activiteMediateur: Prisma.ActiviteMediateurUncheckedCreateInput
} => {
  const { id, ...rest } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const lieuAccompagnement = rest.lieuAccompagnement ?? 'ADistance'

  const givenId = id ?? v4()

  const activiteBeneficiaire = {
    id: givenId,
    beneficiaireId: rest.beneficiaireId,
    craDemarcheAdministrativeId: givenId,
  } satisfies Prisma.ActiviteBeneficiaireUncheckedCreateInput

  const activiteMediateur = {
    id: givenId,
    mediateurId: rest.creeParMediateurId,
    craDemarcheAdministrativeId: givenId,
  } satisfies Prisma.ActiviteMediateurUncheckedCreateInput

  const cra = {
    id: givenId,
    ...rest,
    duree,
    date,
    lieuAccompagnement,
  } satisfies Omit<T, 'id'> & {
    id: string
    duree: number
    date: string | Date
    lieuAccompagnement: LieuAccompagnement
  }

  return {
    cra,
    activiteBeneficiaire,
    activiteMediateur,
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
  T extends Partial<Prisma.CraCollectifUncheckedCreateInput> & {
    creeParMediateurId: string
    beneficiaireIds: string[]
    participantsAnonymes: Partial<ParticipantsAnonymesCraCollectifData>
  },
>(
  data: T,
): {
  cra: Omit<T, 'id' | 'participantsAnonymes' | 'beneficiaireIds'> & {
    id: string
    duree: number
    lieuAtelier: LieuAtelier
    date: string | Date
  }
  participantsAnonymes: ParticipantsAnonymesCraCollectifData & { id: string }
  participants: Prisma.ParticipantAtelierCollectifUncheckedCreateInput[]
  activitesBeneficiaire: Prisma.ActiviteBeneficiaireUncheckedCreateInput[]
  activiteMediateur: Prisma.ActiviteMediateurUncheckedCreateInput
} => {
  const {
    id,
    beneficiaireIds,
    participantsAnonymes: participantsAnonymesParameter,
    ...rest
  } = data

  const duree = rest.duree ?? 90
  const date = rest.date ?? new Date().toISOString()
  const lieuAtelier = rest.lieuAtelier ?? 'Autre'

  const givenId = id ?? v4()
  const participantsAnonymesId = participantsAnonymesParameter.id ?? v4()
  const participantsAnonymes = {
    ...participantsAnonymesDefault,
    ...participantsAnonymesParameter,
    id: participantsAnonymesId,
  } satisfies ParticipantsAnonymesCraCollectifData & { id: string }

  const participants = beneficiaireIds.map(
    (beneficiaireId) =>
      ({
        id: mergeUuids(givenId, beneficiaireId),
        beneficiaireId,
        craCollectifId: givenId,
      }) satisfies Prisma.ParticipantAtelierCollectifUncheckedCreateInput,
  )

  const activitesBeneficiaire = beneficiaireIds.map((beneficiaireId) => ({
    id: mergeUuids(givenId, beneficiaireId),
    beneficiaireId,
    craCollectifId: givenId,
  }))

  const cra = {
    id: givenId,
    ...rest,
    participantsAnonymesId,
    duree,
    date,
    lieuAtelier,
  } satisfies Omit<T, 'id' | 'participantsAnonymes' | 'beneficiaireIds'> & {
    id: string
  }

  return {
    cra,
    participantsAnonymes,
    participants,
    activitesBeneficiaire,
    activiteMediateur: {
      id: givenId,
      craCollectifId: givenId,
      mediateurId: rest.creeParMediateurId,
    },
  }
}
