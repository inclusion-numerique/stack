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
  activiteAccompagnementsCountSelect,
  activitesBeneficiaireInnerJoin,
  crasLieuLabelSelect,
  crasTypeOrderSelect,
  getActiviteFiltersSqlFragment,
  getActivitesFiltersWhereConditions,
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

  const filterConditions = getActivitesFiltersWhereConditions(searchParams)

  const filterFragment = getActiviteFiltersSqlFragment(filterConditions)

  const activiteIdsSearch = await prismaClient.$queryRaw<{ id: string }[]>`
      SELECT activites.id                          as id,
             activites.date                        as date,
             ${activiteAccompagnementsCountSelect} as participant_count,
             activites.type                as type,
             ${crasTypeOrderSelect}                as type_order,
             ${crasLieuLabelSelect}                as lieu

      FROM activites
               ${activitesBeneficiaireInnerJoin(options.beneficiaireId)}
               LEFT JOIN structures ON activites.structure_id = structures.id

      WHERE (activites.mediateur_id = ${mediateurIdMatch}::UUID OR ${mediateurIdMatch} = '_any_')
        AND activites.suppression IS NULL
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
      SELECT COUNT(activites.id)::INT as count
      FROM activites
               ${activitesBeneficiaireInnerJoin(options.beneficiaireId)}
               LEFT JOIN structures ON activites.structure_id = structures.id
      WHERE (activites.mediateur_id = ${mediateurIdMatch}::UUID OR ${mediateurIdMatch} = '_any_')
        AND activites.suppression IS NULL
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
