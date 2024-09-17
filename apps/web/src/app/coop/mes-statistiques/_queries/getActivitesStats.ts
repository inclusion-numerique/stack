import {
  Materiel,
  Thematique,
  ThematiqueDemarcheAdministrative,
  TypeActivite,
  TypeLieu,
  TypeLieuAtelier,
} from '@prisma/client'
import { snakeCase } from 'change-case'
import { prismaClient } from '@app/web/prismaClient'
import {
  dureeAccompagnementLabels,
  dureeAccompagnementValues,
  dureeAcompagnementsIntegerValues,
  materielLabels,
  materielValues,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueDemarcheAdministrativeValues,
  thematiqueLabels,
  thematiqueValues,
  typeActiviteLabels,
  typeActiviteValues,
  typeLieuAtelierLabels,
  typeLieuAtelierValues,
  typeLieuLabels,
  typeLieuValues,
} from '@app/web/cra/cra'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  getActiviteFiltersSqlFragment,
  getActivitesFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import {
  createEnumArrayCountSelect,
  createEnumCountSelect,
  createIntArrayCountSelect,
} from '@app/web/app/coop/mes-statistiques/_queries/createEnumCountSelect'
import { allocatePercentagesFromRecords } from '@app/web/app/coop/mes-statistiques/_queries/allocatePercentages'

const accompagnementCategories = [
  'canauxAccompagnements',
  'dureesAccompagnements',
  'lieuxAccompagnements',
  'thematiquesAccompagnements',
  'thematiquesDemarchesAdministratives',
  'materielsAccompagnements',
] as const

export type AccompagnementCategory = (typeof accompagnementCategories)[number]

export type ActivitesStatsRaw = {
  total_activites: number
  [key: `type_${string}_count`]: number
  [key: `duree_${string}_count`]: number
  [key: `type_lieu_${string}_count`]: number
  [key: `type_lieu_atelier_${string}_count`]: number
  [key: `thematiques_${string}_count`]: number
  [key: `thematiques_demarche_${string}_count`]: number
  [key: `materiel_${string}_count`]: number
}

export const getActivitesStatsRaw = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<[ActivitesStatsRaw]>`
      SELECT COALESCE(COUNT(*), 0)::integer AS total_activites,
             -- Enum count selects for type, type_lieu, type_lieu_atelier, duree, thematiques, thematiques_demarche, materiel
             ${createEnumCountSelect({
               enumObj: TypeActivite,
               column: 'activites.type',
               as: 'type',
             })},
             ${createIntArrayCountSelect({
               values: dureeAcompagnementsIntegerValues,
               column: 'activites.duree',
               as: 'duree',
             })},
             ${createEnumCountSelect({
               enumObj: TypeLieu,
               column: 'activites.type_lieu',
               as: 'type_lieu',
             })},
             ${createEnumCountSelect({
               enumObj: TypeLieuAtelier,
               column: 'activites.type_lieu_atelier',
               as: 'type_lieu_atelier',
             })},
             ${createEnumArrayCountSelect({
               enumObj: Thematique,
               column: 'activites.thematiques',
               as: 'thematiques',
             })},
             ${createEnumArrayCountSelect({
               enumObj: ThematiqueDemarcheAdministrative,
               column: 'activites.thematiques_demarche',
               as: 'thematiques_demarche',
             })},
             ${createEnumArrayCountSelect({
               enumObj: Materiel,
               column: 'activites.materiel',
               as: 'materiel',
             })}
      FROM activites
        LEFT JOIN structures ON structures.id = activites.structure_id
      WHERE activites.mediateur_id = ${mediateurId}::UUID
        AND activites.suppression IS NULL
        AND ${getActiviteFiltersSqlFragment(
          getActivitesFiltersWhereConditions(activitesFilters),
        )}
  `.then((result) => result[0])

export const normalizeActivitesStatsRaw = (stats: ActivitesStatsRaw) => {
  const typeActivitesData = typeActiviteValues.map((typeActivite) => ({
    value: typeActivite,
    label: typeActiviteLabels[typeActivite],
    count: stats[`type_${snakeCase(typeActivite)}_count`],
  }))

  const dureesData = dureeAccompagnementValues.map((duree) => ({
    value: duree,
    label: dureeAccompagnementLabels[duree],
    count: stats[`duree_${duree}_count`],
  }))

  const typeLieuData = typeLieuValues.map((typeLieu) => ({
    value: typeLieu,
    label: typeLieuLabels[typeLieu],
    count: stats[`type_lieu_${snakeCase(typeLieu)}_count`],
  }))

  const typeLieuAtelierData = typeLieuAtelierValues.map((typeLieuAtelier) => ({
    value: typeLieuAtelier,
    label: typeLieuAtelierLabels[typeLieuAtelier],
    count: stats[`type_lieu_atelier_${snakeCase(typeLieuAtelier)}_count`],
  }))

  const mergedTypeLieuData = [...typeLieuData, ...typeLieuAtelierData].reduce<
    {
      value: TypeLieu | TypeLieuAtelier
      label: string
      count: number
    }[]
  >((accumulator, item) => {
    const existingItem = accumulator.find(({ value }) => value === item.value)
    if (existingItem) {
      existingItem.count += item.count
    } else {
      accumulator.push(item)
    }
    return accumulator
  }, [])

  const thematiquesData = thematiqueValues.map((thematique) => ({
    value: thematique,
    label: thematiqueLabels[thematique],
    count: stats[`thematiques_${snakeCase(thematique)}_count`],
  }))

  const thematiquesDemarchesData = thematiqueDemarcheAdministrativeValues.map(
    (thematiqueDemarcheAdministrative) => ({
      value: thematiqueDemarcheAdministrative,
      label:
        thematiqueDemarcheAdministrativeLabels[
          thematiqueDemarcheAdministrative
        ],
      count:
        stats[
          `thematiques_demarche_${snakeCase(thematiqueDemarcheAdministrative)}_count`
        ],
    }),
  )

  const materielsData = materielValues.map((materiel) => ({
    value: materiel,
    label: materielLabels[materiel],
    count: stats[`materiel_${snakeCase(materiel)}_count`],
  }))

  return {
    total: stats.total_activites,
    typeActivites: allocatePercentagesFromRecords(
      typeActivitesData,
      'count',
      'proportion',
    ),
    durees: allocatePercentagesFromRecords(dureesData, 'count', 'proportion'),
    typeLieu: allocatePercentagesFromRecords(
      typeLieuData,
      'count',
      'proportion',
    ),
    typeLieuAtelier: allocatePercentagesFromRecords(
      typeLieuAtelierData,
      'count',
      'proportion',
    ),
    mergedTypeLieu: allocatePercentagesFromRecords(
      mergedTypeLieuData,
      'count',
      'proportion',
    ),
    thematiques: allocatePercentagesFromRecords(
      thematiquesData,
      'count',
      'proportion',
    ),
    thematiquesDemarches: allocatePercentagesFromRecords(
      thematiquesDemarchesData,
      'count',
      'proportion',
    ),
    materiels: allocatePercentagesFromRecords(
      materielsData,
      'count',
      'proportion',
    ),
  }
}

export const getActivitesStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) => {
  const statsRaw = await getActivitesStatsRaw({
    mediateurId,
    activitesFilters,
  })

  return normalizeActivitesStatsRaw(statsRaw)
}

export type ActivitesStructuresStatsRaw = {
  id: string
  nom: string
  commune: string
  code_postal: string
  code_insee: string
  count: number
}

export const getActivitesStructuresStatsRaw = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) => prismaClient.$queryRaw<ActivitesStructuresStatsRaw[]>`
    SELECT structures.id,
           structures.nom,
           structures.commune,
           structures.code_postal,
           structures.code_insee,
           COALESCE(COUNT(*), 0)::int AS count
    FROM structures
             INNER JOIN activites ON activites.structure_id = structures.id
        AND activites.suppression IS NULL
        AND activites.mediateur_id = ${mediateurId}::UUID
        AND ${getActiviteFiltersSqlFragment(
          getActivitesFiltersWhereConditions(activitesFilters),
        )}
    GROUP BY structures.id`

export const getActivitesStructuresStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) => {
  const statsRaw = await getActivitesStructuresStatsRaw({
    mediateurId,
    activitesFilters,
  })
  const sortedStructures = statsRaw.sort((a, b) => a.count - b.count)
  const normalizedStructures = sortedStructures.map(
    ({ id, nom, commune, code_postal, code_insee, count }) => ({
      id,
      nom,
      commune,
      codePostal: code_postal,
      codeInsee: code_insee,
      count,
      label: nom,
    }),
  )

  return allocatePercentagesFromRecords(
    normalizedStructures,
    'count',
    'proportion',
  )
}
