import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { prismaActiviteToActiviteModel } from '@app/web/cra/prismaActiviteToActiviteModel'
import {
  ActivitesDataTable,
  ActivitesDataTableSearchParams,
} from '@app/web/cra/ActivitesDataTable'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { ActivitesRawSqlConfiguration } from '@app/web/cra/ActivitesRawSqlConfiguration'
import { activitesMediateurWithCrasSelect } from '@app/web/cra/activitesQueries'
import { orderItemsByIndexedValues } from '@app/web/utils/orderItemsByIndexedValues'
import { getDataTableSortParams } from '@app/web/data-table/getDefaultDataTableSortParams'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'

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

const activiteDateSelect = Prisma.raw(
  'COALESCE(cra_individuel.date, cra_collectif.date, cra_demarche_administrative.date)',
)

const participantsCountSelect = Prisma.raw(
  '(SELECT COUNT(*) FROM participants_ateliers_collectifs participants WHERE participants.cra_collectif_id = cra_collectif.id) + (SELECT COALESCE(SUM(participants_anonymes.total), 0) FROM participants_anonymes_cras_collectifs participants_anonymes WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)',
)

const typeSelect = Prisma.raw(
  `CASE
                 WHEN cra_individuel.id IS NOT NULL THEN 'individuel'
                 WHEN cra_demarche_administrative.id IS NOT NULL THEN 'demarche'
                 ELSE 'collectif'
                 END`,
)

const typeOrderSelect = Prisma.raw(
  `CASE
                 WHEN cra_individuel.id IS NOT NULL THEN 1
                 WHEN cra_demarche_administrative.id IS NOT NULL THEN 2
                 ELSE 3
                 END`,
)

const lieuLabelSelect =
  Prisma.raw(`COALESCE(structure.nom, cra_individuel.lieu_accompagnement_domicile_commune,
                      cra_collectif.lieu_accompagnement_autre_commune,
                      cra_demarche_administrative.lieu_accompagnement_domicile_commune, 'À distance')`)

const lieuActiviteIdSelect = Prisma.raw(`COALESCE(
              cra_individuel.lieu_activite_id,
              cra_collectif.lieu_activite_id,
              cra_demarche_administrative.lieu_activite_id) `)

const notDeletedCondition = Prisma.raw(`AND (
          (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
              OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
              OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
          )`)

const communeCodeInseeSelect = Prisma.raw(`COALESCE(
                structure.code_insee, 
                cra_individuel.lieu_accompagnement_domicile_code_insee,
                cra_collectif.lieu_accompagnement_autre_code_insee,
                cra_demarche_administrative.lieu_accompagnement_domicile_code_insee)`)

export const getFiltersWhereConditions = ({
  du,
  au,
  beneficiaire,
  commune,
  departement,
  lieu,
  type,
}: ActivitesFilters) => ({
  du: Prisma.raw(
    du ? `AND ${activiteDateSelect.text} >= '${du}'::timestamp` : '',
  ),
  au: Prisma.raw(
    au ? `AND ${activiteDateSelect.text} <= '${au}'::timestamp` : '',
  ),
  type: Prisma.raw(type ? `AND ${typeSelect.text} = '${type}'` : ''),
  lieu: Prisma.raw(
    lieu ? `AND ${lieuActiviteIdSelect.text} = '${lieu}'::UUID` : '',
  ),
  commune: Prisma.raw(
    commune ? `AND ${communeCodeInseeSelect.text} = '${commune}'` : '',
  ),
  departement: Prisma.raw(
    departement
      ? `AND ${communeCodeInseeSelect.text} LIKE '${departement}%'`
      : '',
  ),
  beneficiaire: Prisma.raw(
    beneficiaire
      ? `AND (
       cra_individuel.beneficiaire_id = '${beneficiaire}'::UUID
       OR (
        EXISTS (
          SELECT 1
          FROM participants_ateliers_collectifs participants
          WHERE participants.beneficiaire_id = '${beneficiaire}'::UUID
            AND participants.cra_collectif_id = cra_collectif.id
        )
       )
       OR cra_demarche_administrative.beneficiaire_id = '${beneficiaire}'::UUID
    )`
      : '',
  ),
})

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

  const filterConditions = getFiltersWhereConditions(searchParams)

  const activiteIdsSearch = await prismaClient.$queryRaw<{ id: string }[]>`
      SELECT activite.id                as id,
             ${activiteDateSelect}      as date,
             ${participantsCountSelect} as participant_count,
             ${typeSelect}              as type,
             ${typeOrderSelect}         as type_order,
             ${lieuLabelSelect}         as lieu

      FROM activites_mediateurs activite
               LEFT JOIN cras_individuels cra_individuel ON activite.cra_individuel_id = cra_individuel.id
               LEFT JOIN cras_collectifs cra_collectif ON activite.cra_collectif_id = cra_collectif.id
               LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                         ON activite.cra_demarche_administrative_id = cra_demarche_administrative.id
               LEFT JOIN structures structure ON structure.id = ${lieuActiviteIdSelect}

      WHERE (activite.mediateur_id = ${mediateurIdMatch}::UUID OR ${mediateurIdMatch} = '_any_')
          ${notDeletedCondition} ${filterConditions.du} ${filterConditions.au} ${filterConditions.type} ${filterConditions.lieu} ${filterConditions.commune} ${filterConditions.departement} ${filterConditions.beneficiaire}
      ORDER BY ${orderByCondition},
          date DESC
      LIMIT ${take ?? 2_147_483_647} OFFSET ${skip ?? 0}
  `

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

  const countQueryResult = await prismaClient.$queryRaw<{ count: number }[]>`
      SELECT COUNT(activite.id)::INT as count
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
          ${notDeletedCondition} ${filterConditions.du} ${filterConditions.au} ${filterConditions.type} ${filterConditions.lieu} ${filterConditions.commune} ${filterConditions.departement} ${filterConditions.beneficiaire}
  `

  const matchesCount = countQueryResult.at(0)?.count ?? 0

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
