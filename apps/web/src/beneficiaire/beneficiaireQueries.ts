import {
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
      activites: true,
    },
  },
} satisfies Prisma.BeneficiaireSelect

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
