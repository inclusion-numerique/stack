import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { prismaActiviteToActiviteModel } from '@app/web/cra/prismaActiviteToActiviteModel'
import {
  ActivitesDataTable,
  ActivitesDataTableSearchParams,
} from '@app/web/cra/ActivitesDataTable'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { ActivitesRawSqlConfiguration } from '@app/web/cra/ActivitesRawSqlConfiguration'
import { activitesMediateurWithCrasSelect } from '@app/web/cra/activitesQueries'
import { orderItemsByIndexedValues } from '@app/web/utils/orderItemsByIndexedValues'
import { getDataTableSortParams } from '@app/web/data-table/getDefaultDataTableSortParams'

type SearchActiviteOptions = {
  mediateurId?: string
  searchParams?: ActivitesDataTableSearchParams
}

// List activites not anonymous
export const activitesListWhere = ({ mediateurId }: { mediateurId?: string }) =>
  ({
    mediateurId,
    OR: [
      {
        craIndividuel: {
          suppression: null,
        },
      },
      {
        craCollectif: {
          suppression: null,
        },
      },
      {
        craDemarcheAdministrative: {
          suppression: null,
        },
      },
    ],
  }) satisfies Prisma.ActiviteMediateurWhereInput

export const searchActivite = async (options: SearchActiviteOptions) => {
  const searchParams = options.searchParams ?? {}

  const orderBy = getDataTableOrderBy(searchParams, ActivitesDataTable)
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

  const matchesWhere = {
    ...activitesListWhere({
      mediateurId: options?.mediateurId,
    }),
  } satisfies Prisma.ActiviteMediateurWhereInput

  const mediateurIdMatch = options?.mediateurId ?? '_any_'

  const orderByCondition =
    sortBy in ActivitesRawSqlConfiguration
      ? ActivitesRawSqlConfiguration[
          sortBy as keyof typeof ActivitesRawSqlConfiguration
        ].rawOrderBySql(sortDirection)
      : null

  console.log({
    searchParams,
    orderBy,
    pageSize,
    page,
    sortBy,
    take,
    skip,
    sortDirection,
    orderByCondition,
  })

  const activiteIdsSearch = await prismaClient.$queryRaw<{ id: string }[]>`
      SELECT activite.id                                                                              as id,
             COALESCE(cra_individuel.date, cra_collectif.date, cra_demarche_administrative.date)      as date,
             (
                 (SELECT COUNT(*)
                  FROM participants_ateliers_collectifs participants
                  WHERE participants.cra_collectif_id = cra_collectif.id) +
                 (SELECT COALESCE(SUM(participants_anonymes.total), 0)
                  FROM participants_anonymes_cras_collectifs participants_anonymes
                  WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)
                 )                                                                                    as participant_count,
             CASE
                 WHEN cra_individuel.id IS NOT NULL THEN 'individuel'
                 WHEN cra_demarche_administrative.id IS NOT NULL THEN 'demarche'
                 ELSE 'collectif'
                 END                                                                                  as type,
             CASE
                 WHEN cra_individuel.id IS NOT NULL THEN 1
                 WHEN cra_demarche_administrative.id IS NOT NULL THEN 2
                 ELSE 3
                 END                                                                                  as type_order,
             COALESCE(structure.nom, cra_individuel.lieu_accompagnement_domicile_commune,
                      cra_collectif.lieu_accompagnement_autre_commune,
                      cra_demarche_administrative.lieu_accompagnement_domicile_commune, 'À distance') as lieu

      /* TODO a string "type": that is 'individuel' if cra_individuel.id is not null, 'collectif' if cra_collectif.id is not null, 'demarche' if cra_demarche_administrative.id is not null */
      /* TODO a number type_order that is 1 if 'individuel', 2 if 'demarche', 3 if 'collectif' */
      FROM activites_mediateurs activite
               LEFT JOIN cras_individuels cra_individuel ON activite.cra_individuel_id = cra_individuel.id
               LEFT JOIN cras_collectifs cra_collectif ON activite.cra_collectif_id = cra_collectif.id
               LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                         ON activite.cra_demarche_administrative_id = cra_demarche_administrative.id
               LEFT JOIN structures structure ON structure.id = COALESCE(
              cra_individuel.lieu_activite_id,
              cra_collectif.lieu_activite_id,
              cra_demarche_administrative.lieu_activite_id
                                                                )
      WHERE (activite.mediateur_id = ${mediateurIdMatch}::UUID OR ${mediateurIdMatch} = '_any_')
        AND (
          (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
              OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
              OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
          )
      ORDER BY ${orderByCondition},
               date DESC
      LIMIT ${take ?? 2_147_483_647} OFFSET ${skip ?? 0}
  `

  console.log('IDS SEARCH RESULT', activiteIdsSearch)

  // TODO this will NOT work with prisma as we need to coalesce fields for ordering
  // TODO FIRST Do a raw sql query to fetch the ids of the activities
  // Then do a prisma query with the select to fetch correct date types, and "id IN..." clause

  const searchResultIds = activiteIdsSearch.map(({ id }) => id)

  const activitesQueryResult = await prismaClient.activiteMediateur.findMany({
    where: {
      id: {
        in: searchResultIds,
      },
    },
    select: activitesMediateurWithCrasSelect,
  })

  const orderedActivites = orderItemsByIndexedValues(
    activitesQueryResult,
    searchResultIds,
  )

  const matchesCount = await prismaClient.activiteMediateur.count({
    where: matchesWhere,
  })

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  const activites = orderedActivites.map(prismaActiviteToActiviteModel)

  return {
    activites,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchActiviteResult = Awaited<ReturnType<typeof searchActivite>>

export type SearchActiviteResultRow = SearchActiviteResult['activites'][number]
