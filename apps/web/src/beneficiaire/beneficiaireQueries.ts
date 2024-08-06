import {
  Autonomie,
  NiveauAtelier,
  Prisma,
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'
import { pascalCase } from 'change-case'
import { prismaClient } from '@app/web/prismaClient'
import {
  thematiqueAccompagnementLabels,
  thematiqueDemarcheAdministrativeLabels,
} from '@app/web/cra/cra'

export const beneficiaireCrasCountSelect = {
  _count: {
    select: {
      crasDemarchesAdministratives: {
        where: { suppression: null },
      },
      crasIndividuels: {
        where: { suppression: null },
      },
      participationsAteliersCollectifs: {
        where: {
          craCollectif: {
            suppression: null,
          },
        },
      },
    },
  },
} satisfies Prisma.BeneficiaireSelect

export const beneficiaireCrasCounts = (beneficiaire: {
  _count: {
    crasDemarchesAdministratives: number
    crasIndividuels: number
    participationsAteliersCollectifs: number
  }
}) => ({
  craDemarchesAdministrativesCount:
    beneficiaire._count.crasDemarchesAdministratives,
  craIndividuelsCount: beneficiaire._count.crasIndividuels,
  participationsAteliersCollectifsCount:
    beneficiaire._count.participationsAteliersCollectifs,
  totalCrasCount:
    beneficiaire._count.crasDemarchesAdministratives +
    beneficiaire._count.crasIndividuels +
    beneficiaire._count.participationsAteliersCollectifs,
})

export type ThematiqueAccompagnementCount = {
  thematique: ThematiqueAccompagnement
  count: number
  enumValue: string
  label: string
}

export type ThematiqueDemarcheAdministrativeCount = {
  thematique: ThematiqueDemarcheAdministrative
  count: number
  enumValue: string
  label: string
}

export type CraThematiqueCount =
  | ThematiqueAccompagnementCount
  | ThematiqueDemarcheAdministrativeCount

export type CountThematiquesResult = CraThematiqueCount[]

export const countThematiques = async ({
  beneficiaireId,
}: {
  beneficiaireId: string
}): Promise<CountThematiquesResult> => {
  const [
    thematiquesIndividuelCounts,
    thematiquesAdministratifCounts,
    thematiquesCollectifCounts,
  ] = await Promise.all([
    prismaClient.$queryRaw<{ thematique: string; count: bigint }[]>`
        SELECT unnest(cras_individuels.thematiques_accompagnement) AS thematique,
               count(*)                                            AS count
        FROM cras_individuels
        WHERE cras_individuels.beneficiaire_id = ${beneficiaireId}::UUID
          AND cras_individuels.suppression IS NULL
        GROUP BY thematique
        ORDER BY thematique ASC
    `,
    prismaClient.$queryRaw<{ thematique: string; count: bigint }[]>`
        SELECT unnest(cras_demarches_administratives.thematiques_accompagnement) AS thematique,
               count(*)                                                          AS count
        FROM cras_demarches_administratives
        WHERE cras_demarches_administratives.beneficiaire_id = ${beneficiaireId}::UUID
          AND cras_demarches_administratives.suppression IS NULL
        GROUP BY thematique
        ORDER BY thematique ASC
    `,
    prismaClient.$queryRaw<{ thematique: string; count: bigint }[]>`
        SELECT unnest(cras_collectifs.thematiques_accompagnement) AS thematique,
               count(*)                                           AS count
        FROM cras_collectifs
                 INNER JOIN participants_ateliers_collectifs
                            ON participants_ateliers_collectifs.beneficiaire_id = ${beneficiaireId}::UUID
                                AND participants_ateliers_collectifs.cra_collectif_id = cras_collectifs.id
        WHERE cras_collectifs.suppression IS NULL
        GROUP BY thematique
        ORDER BY thematique ASC
    `,
  ])

  const crasIndividuels = thematiquesIndividuelCounts.map((queryResult) => {
    const count = Number(queryResult.count)
    const thematique = pascalCase(
      queryResult.thematique,
    ) as ThematiqueAccompagnement

    return {
      thematique,
      enumValue: queryResult.thematique,
      label: thematiqueAccompagnementLabels[thematique],
      count,
    }
  })
  const crasDemarchesAdministratives = thematiquesAdministratifCounts.map(
    (queryResult) => {
      const count = Number(queryResult.count)
      const thematique = pascalCase(
        queryResult.thematique,
      ) as ThematiqueDemarcheAdministrative

      return {
        thematique,
        enumValue: queryResult.thematique,
        label: thematiqueDemarcheAdministrativeLabels[thematique],
        count,
      }
    },
  )
  const crasCollectifs = thematiquesCollectifCounts.map((queryResult) => {
    const count = Number(queryResult.count)
    const thematique = pascalCase(
      queryResult.thematique,
    ) as ThematiqueAccompagnement

    return {
      thematique,
      enumValue: queryResult.thematique,
      label: thematiqueAccompagnementLabels[thematique],
      count,
    }
  })

  // Now we have to merge the counts crasCollectifs and crasIndividuels and add the counts
  // Then concatenate the crasDemarchesAdministratives counts
  // To have the total of all thematique counts

  // Consolidate counts into a single list of counts by merging crasIndividuels and crasCollectifs
  const mergedCounts = [...crasIndividuels, ...crasCollectifs].reduce<
    CraThematiqueCount[]
  >((accumulator, item) => {
    const existing = accumulator.find(
      (entry) => entry.enumValue === item.enumValue,
    )
    if (existing) {
      existing.count += item.count
    } else {
      accumulator.push({ ...item })
    }
    return accumulator
  }, [])

  // Concatenate crasDemarchesAdministratives counts to the merged counts
  const total = [...mergedCounts, ...crasDemarchesAdministratives].sort(
    (a, b) => a.label.localeCompare(b.label),
  )

  return total
}

export type BeneficiaireActivite =
  | {
      id: string
      type: 'individuel'
      date: string | Date
      autonomie: Autonomie | null
      thematiques: ThematiqueAccompagnement[]
    }
  | {
      id: string
      type: 'collectif'
      date: string | Date
      titreAtelier: string | null
      niveau: NiveauAtelier | null
      thematiques: ThematiqueAccompagnement[]
    }
  | {
      id: string
      type: 'demarche'
      date: string | Date
      autonomie: Autonomie | null
      thematiques: ThematiqueDemarcheAdministrative[]
    }

export type BeneficiaireActiviteByDate = {
  date: string | Date
  activites: BeneficiaireActivite[]
}

export const getBeneficiaireActivites = async ({
  beneficiaireId,
}: {
  beneficiaireId: string
}): Promise<{
  all: BeneficiaireActivite[]
  byDate: BeneficiaireActiviteByDate[]
}> => {
  const crasIndividuels = await prismaClient.craIndividuel.findMany({
    where: {
      beneficiaireId,
      suppression: null,
    },
    select: {
      id: true,
      date: true,
      autonomie: true,
      thematiques: true,
    },
    orderBy: {
      creation: 'desc',
    },
  })

  const crasDemarchesAdministratives =
    await prismaClient.craDemarcheAdministrative.findMany({
      where: {
        beneficiaireId,
        suppression: null,
      },
      select: {
        id: true,
        date: true,
        autonomie: true,
        thematiques: true,
      },
      orderBy: {
        creation: 'desc',
      },
    })

  const crasCollectifs = await prismaClient.craCollectif.findMany({
    where: {
      participants: {
        some: {
          beneficiaireId,
        },
      },
      suppression: null,
    },
    select: {
      id: true,
      date: true,
      niveau: true,
      thematiques: true,
      titreAtelier: true,
    },
    orderBy: {
      creation: 'desc',
    },
  })

  const activites = [
    ...crasIndividuels.map((cra) => ({
      id: cra.id,
      type: 'individuel' as const,
      date: cra.date,
      autonomie: cra.autonomie,
      thematiques: cra.thematiques,
    })),
    ...crasDemarchesAdministratives.map((cra) => ({
      id: cra.id,
      type: 'demarche' as const,
      date: cra.date,
      autonomie: cra.autonomie,
      thematiques: cra.thematiques,
    })),
    ...crasCollectifs.map((cra) => ({
      id: cra.id,
      type: 'collectif' as const,
      date: cra.date,
      titreAtelier: cra.titreAtelier,
      niveau: cra.niveau,
      thematiques: cra.thematiques,
    })),
  ].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ) satisfies BeneficiaireActivite[]

  const activitesByDate = activites.reduce<
    Record<string, BeneficiaireActiviteByDate>
  >((accumulator, activity) => {
    const date = new Date(activity.date).toISOString().slice(0, 10)
    if (!accumulator[date]) {
      accumulator[date] = {
        date,
        activites: [],
      }
    }
    accumulator[date].activites.push(activity)
    return accumulator
  }, {})

  return {
    all: activites,
    byDate: Object.values(activitesByDate),
  }
}
