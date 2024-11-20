import { Genre, Prisma, StatutSocial, TrancheAge } from '@prisma/client'
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
import { createEnumCountSelect } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/createEnumCountSelect'
import { allocatePercentagesFromRecords } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/allocatePercentages'

export type BeneficiairesStatsRaw = {
  total_beneficiaires: number
  [key: `genre_${string}`]: number
  [key: `tranche_age_${string}`]: number
  [key: `statut_social_${string}`]: number
}

const EMPTY_BENEFICIAIRES_STATS = { total_beneficiaires: 0 }

export const getBeneficiaireStatsRaw = async ({
  mediateurIds,
  activitesFilters,
}: {
  mediateurIds: string[]
  activitesFilters: ActivitesFilters
}) => {
  if (mediateurIds.length === 0) return EMPTY_BENEFICIAIRES_STATS

  return prismaClient.$queryRaw<[BeneficiairesStatsRaw]>`
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
                                              AND activites.mediateur_id = ANY
                                                  (ARRAY [${Prisma.join(mediateurIds.map((id) => `${id}`))}]::UUID[])
                                              AND activites.suppression IS NULL
                                               LEFT JOIN structures ON structures.id = activites.structure_id
                                      WHERE ${getActiviteFiltersSqlFragment(
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
}

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
  coalesced_code_insee: string
  count_beneficiaires: number
}

export const getBeneficiairesCommunesRaw = async ({
  mediateurIds,
  activitesFilters,
}: {
  mediateurIds: string[]
  activitesFilters: ActivitesFilters
}) => {
  if (mediateurIds.length === 0) return []

  return prismaClient.$queryRaw<BeneficiairesCommunesRaw[]>`
      SELECT DISTINCT COALESCE(
                              beneficiaires.commune_code_insee,
                              CASE
                                  WHEN activites.type != 'collectif' THEN activites.lieu_code_insee
                                  END
                      )                                                                            AS coalesced_code_insee,
                      MIN(COALESCE(beneficiaires.commune, activites.lieu_commune))                 AS commune,
                      MIN(COALESCE(beneficiaires.commune_code_postal, activites.lieu_code_postal)) AS code_postal,
                      COUNT(DISTINCT beneficiaires.id) ::integer                                   AS count_beneficiaires
      FROM beneficiaires
               INNER JOIN accompagnements ON
          accompagnements.beneficiaire_id = beneficiaires.id
               INNER JOIN activites ON
          activites.id = accompagnements.activite_id
              AND activites.mediateur_id = ANY (ARRAY [${Prisma.join(mediateurIds.map((id) => `${id}`))}]::UUID[])
              AND activites.suppression IS NULL
               LEFT JOIN structures ON structures.id = activites.structure_id
      WHERE ${getActiviteFiltersSqlFragment(
        getActivitesFiltersWhereConditions(activitesFilters),
      )}
      GROUP BY coalesced_code_insee
  `.then((result) =>
    // Filter out null codeInsee for when there is no commune in beneficiaire or activite
    result.filter(({ coalesced_code_insee }) => !!coalesced_code_insee),
  )
}

export const normalizeBeneficiairesCommunesRaw = (
  rawCommunes: BeneficiairesCommunesRaw[],
) => {
  const sortedCommunes = rawCommunes.sort(
    (a, b) => a.count_beneficiaires - b.count_beneficiaires,
  )
  const normalizedCommunes = sortedCommunes.map(
    ({ commune, coalesced_code_insee, code_postal, count_beneficiaires }) => ({
      nom: commune,
      codeInsee: coalesced_code_insee,
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
  mediateurIds,
  activitesFilters,
}: {
  mediateurIds: string[]
  activitesFilters: ActivitesFilters
}) => {
  const statsRaw = await getBeneficiaireStatsRaw({
    mediateurIds,
    activitesFilters,
  })

  const rawCommunes = await getBeneficiairesCommunesRaw({
    mediateurIds,
    activitesFilters,
  })

  return {
    ...normalizeBeneficiairesStatsRaw(statsRaw),
    communes: normalizeBeneficiairesCommunesRaw(rawCommunes),
  }
}
