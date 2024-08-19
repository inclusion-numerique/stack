import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Helpers for activite detail modals and activité lists that merge data from all types of Cras
 */

const accompagnementIndividuelBeneficiaireSelect = {
  id: true,
  prenom: true,
  nom: true,
  trancheAge: true,
  statutSocial: true,
  genre: true,
  commune: true,
  communeCodePostal: true,
  vaPoursuivreParcoursAccompagnement: true,
  _count: {
    select: {
      activites: true,
    },
  },
} satisfies Prisma.BeneficiaireSelect

export const craIndividuelForActiviteSelect = {
  id: true,
  date: true,
  autonomie: true,
  thematiques: true,
  duree: true,
  materiel: true,
  notes: true,
  lieuAccompagnement: true,
  lieuActivite: {
    select: { id: true, commune: true, codePostal: true, nom: true },
  },
  lieuAccompagnementDomicileCommune: true,
  lieuAccompagnementDomicileCodeInsee: true,
  lieuAccompagnementDomicileCodePostal: true,
  orienteVersStructure: true,
  structureDeRedirection: true,
  beneficiaire: {
    select: {
      ...accompagnementIndividuelBeneficiaireSelect,
    },
  },
} satisfies Prisma.CraIndividuelSelect

export const getCrasIndividuelForActivite = ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId?: string
  mediateurId?: string
}) =>
  prismaClient.craIndividuel.findMany({
    where: {
      beneficiaireId,
      creeParMediateurId: mediateurId,
      suppression: null,
    },
    select: craIndividuelForActiviteSelect,
    orderBy: {
      creation: 'desc',
    },
  })

export type CraIndividuelForActivite = Awaited<
  ReturnType<typeof getCrasIndividuelForActivite>
>[number]

export const craDemarcheForActiviteSelect = {
  id: true,
  date: true,
  autonomie: true,
  thematiques: true,
  duree: true,
  notes: true,
  lieuAccompagnement: true,
  precisionsDemarche: true,
  lieuActivite: {
    select: { id: true, commune: true, codePostal: true, nom: true },
  },
  lieuAccompagnementDomicileCommune: true,
  lieuAccompagnementDomicileCodeInsee: true,
  lieuAccompagnementDomicileCodePostal: true,
  structureDeRedirection: true,
  degreDeFinalisation: true,
  beneficiaire: {
    select: {
      ...accompagnementIndividuelBeneficiaireSelect,
    },
  },
} satisfies Prisma.CraDemarcheAdministrativeSelect

export const getCrasDemarcheAdministrativeForActivite = ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId?: string
  mediateurId?: string
}) =>
  prismaClient.craDemarcheAdministrative.findMany({
    where: {
      beneficiaireId,
      creeParMediateurId: mediateurId,
      suppression: null,
    },
    select: craDemarcheForActiviteSelect,
    orderBy: {
      creation: 'desc',
    },
  })

export type CraDemarcheAdministrativeForActivite = Awaited<
  ReturnType<typeof getCrasDemarcheAdministrativeForActivite>
>[number]

export const craCollectifForActiviteSelect = {
  id: true,
  date: true,
  niveau: true,
  thematiques: true,
  titreAtelier: true,
  duree: true,
  notes: true,
  lieuAtelier: true,
  lieuActivite: {
    select: { id: true, commune: true, codePostal: true, nom: true },
  },
  lieuAccompagnementAutreCommune: true,
  lieuAccompagnementAutreCodeInsee: true,
  lieuAccompagnementAutreCodePostal: true,
  participants: {
    select: {
      beneficiaire: {
        select: {
          id: true,
          prenom: true,
          nom: true,
        },
      },
    },
  },
  participantsAnonymes: true,
} satisfies Prisma.CraCollectifSelect

export const getCrasCollectifForActivite = ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId?: string
  mediateurId?: string
}) =>
  prismaClient.craCollectif.findMany({
    where: {
      creeParMediateurId: mediateurId,
      ...(mediateurId ? { participants: { some: { beneficiaireId } } } : {}),
      suppression: null,
    },
    select: craCollectifForActiviteSelect,
    orderBy: {
      creation: 'desc',
    },
  })

export type CraCollectifForActivite = Awaited<
  ReturnType<typeof getCrasCollectifForActivite>
>[number]

export type ActiviteIndividuelle = {
  type: 'individuel'
  cra: CraIndividuelForActivite
}

export type ActiviteCollective = {
  type: 'collectif'
  cra: CraCollectifForActivite
}

export type ActiviteDemarcheAdministrative = {
  type: 'demarche'
  cra: CraDemarcheAdministrativeForActivite
}

export type Activite =
  | ActiviteIndividuelle
  | ActiviteCollective
  | ActiviteDemarcheAdministrative

export const getActivites = async ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId?: string
  mediateurId?: string
}): Promise<Activite[]> => {
  const [crasIndividuels, crasDemarchesAdministratives, crasCollectifs] =
    await Promise.all([
      getCrasIndividuelForActivite({ beneficiaireId, mediateurId }),
      getCrasDemarcheAdministrativeForActivite({ beneficiaireId, mediateurId }),
      getCrasCollectifForActivite({ beneficiaireId, mediateurId }),
    ])

  return [
    ...crasIndividuels.map(
      (cra) =>
        ({
          type: 'individuel' as const,
          cra,
        }) satisfies ActiviteIndividuelle,
    ),
    ...crasDemarchesAdministratives.map(
      (cra) =>
        ({
          type: 'demarche' as const,
          cra,
        }) satisfies ActiviteDemarcheAdministrative,
    ),
    ...crasCollectifs.map(
      (cra) =>
        ({
          type: 'collectif' as const,
          cra,
        }) satisfies ActiviteCollective,
    ),
  ].sort((a, b) => b.cra.date.getTime() - a.cra.date.getTime())
}

export type ActivitesByDate = {
  date: string
  activites: Activite[]
}

export const groupActivitesByDate = (
  activites: Activite[],
): ActivitesByDate[] => {
  const byDateRecord = activites.reduce<Record<string, Activite[]>>(
    (accumulator, activity) => {
      const date = new Date(activity.cra.date).toISOString().slice(0, 10)
      if (!accumulator[date]) {
        accumulator[date] = []
      }
      accumulator[date].push(activity)
      return accumulator
    },
    {},
  )

  return Object.entries(byDateRecord).map(([date, groupedActivites]) => ({
    date,
    activites: groupedActivites,
  }))
}

export const activitesMediateurWithCrasSelect = {
  id: true,
  mediateurId: true,
  craIndividuel: { select: craIndividuelForActiviteSelect },
  craDemarcheAdministrative: { select: craDemarcheForActiviteSelect },
  craCollectif: { select: craCollectifForActiviteSelect },
} satisfies Prisma.ActiviteMediateurSelect
