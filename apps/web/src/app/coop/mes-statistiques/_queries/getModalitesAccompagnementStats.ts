import { prismaClient } from '@app/web/prismaClient'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  getActiviteFiltersSqlFragment,
  getCrasCollectifsFiltersWhereConditions,
  getCrasDemarchesAdministrativesFiltersWhereConditions,
  getCrasIndividuelFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import {
  AccompagnementLabel,
  QuantifiedShare,
  toTotalCount,
} from '../quantifiedShare'

export const getModalitesAccompagnementStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<
    (QuantifiedShare<AccompagnementLabel> & {
      participants?: number
    })[]
  >`
      WITH filtered_cras_collectifs AS (SELECT cras_collectifs.*
                                        FROM cras_collectifs
                                        WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                          AND suppression IS NULL
                                          AND ${getActiviteFiltersSqlFragment(
                                            getCrasCollectifsFiltersWhereConditions(
                                              activitesFilters,
                                            ),
                                          )}),
           individuels_total AS (SELECT COUNT(*)::integer as total
                                 FROM cras_individuels
                                 WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                   AND suppression IS NULL
                                   AND ${getActiviteFiltersSqlFragment(
                                     getCrasIndividuelFiltersWhereConditions(
                                       activitesFilters,
                                     ),
                                   )}),
           collectifs_total AS (SELECT COUNT(*)::integer as total
                                FROM filtered_cras_collectifs),
           demarches_total AS (SELECT COUNT(*)::integer as total
                               FROM cras_demarches_administratives
                               WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                 AND suppression IS NULL
                                 AND ${getActiviteFiltersSqlFragment(
                                   getCrasDemarchesAdministrativesFiltersWhereConditions(
                                     activitesFilters,
                                   ),
                                 )}),
           collectifs_participants AS (SELECT SUM(
                                                      (SELECT COUNT(*)
                                                       FROM participants_ateliers_collectifs participants
                                                       WHERE participants.cra_collectif_id = filtered_cras_collectifs.id) +
                                                      (SELECT COALESCE(SUM(participants_anonymes.total), 0)
                                                       FROM participants_anonymes_cras_collectifs participants_anonymes
                                                       WHERE participants_anonymes.id =
                                                             filtered_cras_collectifs.participants_anonymes_id)
                                              )::integer as total
                                       FROM filtered_cras_collectifs
                                       WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                         AND suppression IS NULL),
           total_accompagnements AS (SELECT (SELECT total FROM individuels_total) +
                                            (SELECT total FROM collectifs_total) +
                                            (SELECT total FROM demarches_total) AS total)
      SELECT 'modalitesAccompagnement'     AS category_type,
             'Accompagnements individuels' AS label,
             i.total                       AS count,
             0                             AS participants
      FROM individuels_total i,
           total_accompagnements t
      UNION ALL
      SELECT 'modalitesAccompagnement'                                         AS category_type,
             'Ateliers collectifs'                                             AS label,
             c.total                                                           AS count,
             COALESCE((SELECT total FROM collectifs_participants)::integer, 0) AS participants
      FROM collectifs_total c,
           total_accompagnements t
      UNION ALL
      SELECT 'modalitesAccompagnement'            AS category_type,
             'Aide aux démarches administratives' AS label,
             d.total                              AS count,
             0                                    AS participants
      FROM demarches_total d,
           total_accompagnements t
  `

export const getAccompagnementBeneficiaires = ({
  mediateurId,
  activitesFilters,
  beneficiaireStatsPageData,
  modalitesAccompagnement,
  participantsAnonymesPageData,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
  beneficiaireStatsPageData: Record<string, QuantifiedShare[]>
  modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
    participants?: number
  })[]
  participantsAnonymesPageData: Record<string, QuantifiedShare[]>
}) => ({
  accompagnements:
    modalitesAccompagnement[0].count +
    (modalitesAccompagnement[1]?.participants ?? 0) +
    modalitesAccompagnement[0].count,
  beneficiaires: beneficiaireStatsPageData.genresBeneficiaires.reduce(
    toTotalCount,
    0,
  ),
  anonymes: participantsAnonymesPageData.genresBeneficiaires.reduce(
    toTotalCount,
    0,
  ),
})
