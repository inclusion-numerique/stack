import { prismaClient } from '@app/web/prismaClient'
import {
  ActivitesDataTable,
  ActivitesDataTableSearchParams,
} from '@app/web/cra/ActivitesDataTable'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { ActivitesRawSqlConfiguration } from '@app/web/cra/ActivitesRawSqlConfiguration'
import { orderItemsByIndexedValues } from '@app/web/utils/orderItemsByIndexedValues'
import { getDataTableSortParams } from '@app/web/data-table/getDefaultDataTableSortParams'
import {
  crasDateSelect,
  crasLieuLabelSelect,
  crasNotDeletedCondition,
  crasParticipantsCountSelect,
  crasStructureIdSelect,
  crasTypeOrderSelect,
  crasTypeSelect,
  getActiviteFiltersSqlFragment,
  getCrasFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import { activiteListSelect } from '@app/web/cra/activitesQueries'

type SearchActiviteOptions = {
  mediateurId?: string
  beneficiaireId?: string
  searchParams?: ActivitesDataTableSearchParams
}

export const searchActivite = async (options: SearchActiviteOptions) => {
  const searchParams = options.searchParams ?? {}

  const pageSize = searchParams?.lignes
    ? Number.parseInt(searchParams.lignes, 10)
    : 10
  const page = searchParams?.page ? Number.parseInt(searchParams.page, 10) : 1

  console.log('SERACH ACTIVITE')
  const { sortBy, sortDirection } = getDataTableSortParams(
    searchParams,
    ActivitesDataTable,
  )

  const { take, skip } = takeAndSkipFromPage({
    page,
    pageSize,
  })

  const mediateurIdMatch = options?.mediateurId ?? '_any_'

  const orderByCondition =
    sortBy in ActivitesRawSqlConfiguration
      ? ActivitesRawSqlConfiguration[
          sortBy as keyof typeof ActivitesRawSqlConfiguration
        ].rawOrderBySql(sortDirection)
      : null

  console.log('SEARCH PARAMS', searchParams)

  const filterConditions = getCrasFiltersWhereConditions(searchParams)

  console.log('FILTER CONDITIONS', filterConditions)
  console.log(
    'FILTER FRAGMENT',
    getActiviteFiltersSqlFragment(filterConditions).text,
  )

  const filterFragment = getActiviteFiltersSqlFragment(filterConditions)

  const activiteIdsSearch = await prismaClient.$queryRaw<{ id: string }[]>`
      SELECT activite.id                    as id,
             ${crasDateSelect}              as date,
             ${crasParticipantsCountSelect} as participant_count,
             ${crasTypeSelect}              as type,
             ${crasTypeOrderSelect}         as type_order,
             ${crasLieuLabelSelect}         as lieu

      FROM activites_mediateurs activite
               LEFT JOIN cras_individuels cra_individuel ON activite.cra_individuel_id = cra_individuel.id
               LEFT JOIN cras_collectifs cra_collectif ON activite.cra_collectif_id = cra_collectif.id
               LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                         ON activite.cra_demarche_administrative_id = cra_demarche_administrative.id
               LEFT JOIN structures ON structures.id = ${crasStructureIdSelect}

      WHERE (activite.mediateur_id = ${mediateurIdMatch}::UUID OR ${mediateurIdMatch} = '_any_')
        AND ${crasNotDeletedCondition}
        AND ${filterFragment}
      ORDER BY ${orderByCondition},
               date DESC
      LIMIT ${take ?? 2_147_483_647} OFFSET ${skip ?? 0}
  `

  const searchResultIds = activiteIdsSearch.map(({ id }) => id)

  const activitesQueryResult = await prismaClient.activite.findMany({
    where: {
      id: {
        in: searchResultIds,
      },
    },
    select: activiteListSelect,
  })

  const orderedActivites = orderItemsByIndexedValues(
    activitesQueryResult,
    searchResultIds,
  )

  const countQueryResult = await prismaClient.$queryRaw<{ count: number }[]>`
      SELECT COUNT(activite.id)::INT as count
      FROM activites_mediateurs activite
               LEFT JOIN cras_individuels cra_individuel ON activite.cra_individuel_id = cra_individuel.id
               LEFT JOIN cras_collectifs cra_collectif ON activite.cra_collectif_id = cra_collectif.id
               LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                         ON activite.cra_demarche_administrative_id = cra_demarche_administrative.id
               LEFT JOIN structures ON structures.id = COALESCE(
              cra_individuel.lieu_activite_id,
              cra_collectif.lieu_activite_id,
              cra_demarche_administrative.lieu_activite_id
                                                       )
      WHERE (activite.mediateur_id = ${mediateurIdMatch}::UUID OR ${mediateurIdMatch} = '_any_')
        AND ${crasNotDeletedCondition}
        AND ${filterFragment}
  `

  const matchesCount = countQueryResult.at(0)?.count ?? 0

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  return {
    activites: orderedActivites,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchActiviteResult = Awaited<ReturnType<typeof searchActivite>>

export type SearchActiviteResultRow = SearchActiviteResult['activites'][number]
