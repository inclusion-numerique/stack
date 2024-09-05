import { Genre, StatutSocial, TrancheAge } from '@prisma/client'
import { snakeCase } from 'change-case'
import { prismaClient } from '@app/web/prismaClient'
import {
  genreLabels,
  genreValues,
  statutSocialLabels,
  statutSocialValues,
  trancheAgeLabels,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  getActiviteFiltersSqlFragment,
  getActivitesFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import { createEnumCountSelect } from '@app/web/app/coop/mes-statistiques/_queries/createEnumCountSelect'
import { allocatePercentagesFromRecords } from '@app/web/app/coop/mes-statistiques/_queries/allocatePercentages'
import { QuantifiedShare } from '../quantifiedShare'

const beneficiaireCategories = [
  'genresBeneficiaires',
  'statusBeneficiaires',
  'tranchesAgeBeneficiaires',
  'communesBeneficiaires',
] as const

type BeneficiaireCategory = (typeof beneficiaireCategories)[number]

export type BeneficiaireQuantifiedShare = QuantifiedShare & {
  category_type: BeneficiaireCategory
}

export type BeneficiairesStatsRaw = {
  total_beneficiaires: number
  [key: `genre_${string}`]: number
  [key: `tranche_age_${string}`]: number
  [key: `statut_social_${string}`]: number
}

export const sortEnumProportions = <
  Item extends {
    proportion: number
    value: TrancheAge | StatutSocial | Genre
  },
>(
  items: Item[],
) =>
  items.sort(
    // If the value is 'NonCommunique', it should be last
    (a, b) => {
      if (a.value === 'NonCommunique') return 1
      if (b.value === 'NonCommunique') return -1
      return b.proportion - a.proportion
    },
  )

export const getBeneficiaireStatsRaw = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<[BeneficiairesStatsRaw]>`
      WITH distinct_beneficiaires AS (SELECT DISTINCT beneficiaires.id,
                                                      beneficiaires.genre,
                                                      beneficiaires.statut_social,
                                                      beneficiaires.tranche_age,
                                                      beneficiaires.commune,
                                                      beneficiaires.commune_code_postal,
                                                      beneficiaires.commune_code_insee
                                      FROM beneficiaires
                                               INNER JOIN accompagnements ON accompagnements.beneficiaire_id = beneficiaires.id
                                               INNER JOIN activites ON
                                          activites.id = accompagnements.activite_id
                                              AND activites.mediateur_id = ${mediateurId}::UUID
                                              AND activites.suppression IS NULL
                                              AND ${getActiviteFiltersSqlFragment(
                                                getActivitesFiltersWhereConditions(
                                                  activitesFilters,
                                                ),
                                              )})
      SELECT COUNT(distinct_beneficiaires.id)::integer AS total_beneficiaires,

             -- Enum count selects for genre, statut_social, tranche_age
             ${createEnumCountSelect({
               enumObj: Genre,
               column: 'distinct_beneficiaires.genre',
               as: 'genre',
               defaultEnumValue: Genre.NonCommunique,
             })},
             ${createEnumCountSelect({
               enumObj: StatutSocial,
               column: 'distinct_beneficiaires.statut_social',
               as: 'statut_social',
               defaultEnumValue: StatutSocial.NonCommunique,
             })},
             ${createEnumCountSelect({
               enumObj: TrancheAge,
               column: 'distinct_beneficiaires.tranche_age',
               as: 'tranche_age',
               defaultEnumValue: TrancheAge.NonCommunique,
             })}
      FROM distinct_beneficiaires`.then((result) => result[0])

export const normalizeBeneficiairesStatsRaw = (
  stats: BeneficiairesStatsRaw,
) => {
  const genresData = genreValues.map((genre) => ({
    value: genre,
    label: genreLabels[genre],
    count: stats[`genre_${snakeCase(genre)}_count`],
  }))

  const trancheAgesData = trancheAgeValues.map((trancheAge) => ({
    value: trancheAge,
    label: trancheAgeLabels[trancheAge],
    count: stats[`tranche_age_${snakeCase(trancheAge)}_count`],
  }))

  const statutsSocialData = statutSocialValues.map((statutSocial) => ({
    value: statutSocial,
    label: statutSocialLabels[statutSocial],
    count: stats[`statut_social_${snakeCase(statutSocial)}_count`],
  }))

  return {
    total: stats.total_beneficiaires,
    genres: allocatePercentagesFromRecords(genresData, 'count', 'proportion'),
    trancheAges: allocatePercentagesFromRecords(
      trancheAgesData,
      'count',
      'proportion',
    ),
    statutsSocial: allocatePercentagesFromRecords(
      statutsSocialData,
      'count',
      'proportion',
    ),
  }
}

export type BeneficiairesCommunesRaw = {
  commune: string
  code_postal: string
  code_insee: string
  count_beneficiaires: number
}

export const getBeneficiairesCommunesRaw = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<BeneficiairesCommunesRaw[]>`
      SELECT DISTINCT COALESCE(beneficiaires.commune_code_insee, activites.lieu_code_insee)        AS code_insee,
                      MIN(COALESCE(beneficiaires.commune, activites.lieu_commune))                 AS commune,
                      MIN(COALESCE(beneficiaires.commune_code_postal, activites.lieu_code_postal)) AS code_postal,
                      COUNT(DISTINCT beneficiaires.id)::integer                                    AS count_beneficiaires
      FROM beneficiaires
               INNER JOIN accompagnements ON
          accompagnements.beneficiaire_id = beneficiaires.id
               INNER JOIN activites ON
          activites.id = accompagnements.activite_id
              AND activites.mediateur_id = ${mediateurId}::UUID
              AND activites.suppression IS NULL
              AND ${getActiviteFiltersSqlFragment(
                getActivitesFiltersWhereConditions(activitesFilters),
              )}
      GROUP BY code_insee
  `.then((result) =>
    // Filter out null codeInsee for when there is no commune in beneficiaire or activite
    result.filter(({ code_insee }) => !!code_insee),
  )

export const normalizeBeneficiairesCommunesRaw = (
  rawCommunes: BeneficiairesCommunesRaw[],
) => {
  const sortedCommunes = rawCommunes.sort(
    (a, b) => a.count_beneficiaires - b.count_beneficiaires,
  )
  const normalizedCommunes = sortedCommunes.map(
    ({ commune, code_insee, code_postal, count_beneficiaires }) => ({
      nom: commune,
      codeInsee: code_insee,
      codePostal: code_postal,
      count: count_beneficiaires,
      label: `${commune} · ${code_postal}`,
    }),
  )

  return allocatePercentagesFromRecords(
    normalizedCommunes,
    'count',
    'proportion',
  ).sort((a, b) => b.count - a.count)
}

export const getBeneficiaireStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) => {
  const statsRaw = await getBeneficiaireStatsRaw({
    mediateurId,
    activitesFilters,
  })

  const rawCommunes = await getBeneficiairesCommunesRaw({
    mediateurId,
    activitesFilters,
  })

  return {
    ...normalizeBeneficiairesStatsRaw(statsRaw),
    communes: normalizeBeneficiairesCommunesRaw(rawCommunes),
  }
}

export const EMPTY_BENEFICIAIRE_DATA: Record<
  BeneficiaireCategory,
  QuantifiedShare[]
> = {
  genresBeneficiaires: Object.values(genreLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  statusBeneficiaires: Object.values(statutSocialLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  tranchesAgeBeneficiaires: Object.values(trancheAgeLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  communesBeneficiaires: [],
}
