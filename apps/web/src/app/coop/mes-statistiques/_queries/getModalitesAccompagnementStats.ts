import { prismaClient } from '@app/web/prismaClient'
import {
  AccompagnementLabel,
  QuantifiedShare,
  toTotalCount,
} from '../quantifiedShare'

export const getModalitesAccompagnementStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<
    (QuantifiedShare<AccompagnementLabel> & {
      participants?: number
    })[]
  >`
      WITH
          individuels_total AS (
              SELECT COUNT(*)::integer as total
              FROM cras_individuels
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
          ),
          collectifs_total AS (
              SELECT COUNT(*)::integer as total
              FROM cras_collectifs
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
          ),
          demarches_total AS (
              SELECT COUNT(*)::integer as total
              FROM cras_demarches_administratives
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
          ),
          collectifs_participants AS (
              SELECT SUM(
                (SELECT COUNT(*)
                FROM participants_ateliers_collectifs participants
                WHERE participants.cra_collectif_id = cras_collectifs.id) +
                (SELECT COALESCE(SUM(participants_anonymes.total), 0)
                FROM participants_anonymes_cras_collectifs participants_anonymes
                WHERE participants_anonymes.id = cras_collectifs.participants_anonymes_id)
              )::integer as total
              FROM cras_collectifs
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
          ),
          total_accompagnements AS (
              SELECT
                  (SELECT total FROM individuels_total) +
                  (SELECT total FROM collectifs_total) +
                  (SELECT total FROM demarches_total) AS total
          ),
          accompagnement_stats AS (
              SELECT
                  'modalitesAccompagnement' AS category_type,
                  'Accompagnements individuels' AS label,
                  i.total AS count,
                  NULL::integer AS participants
              FROM individuels_total i, total_accompagnements t
              UNION ALL
              SELECT
                  'modalitesAccompagnement' AS category_type,
                  'Ateliers collectifs' AS label,
                  c.total AS count,
                  (SELECT total FROM collectifs_participants) AS participants
              FROM collectifs_total c, total_accompagnements t
              UNION ALL
              SELECT
                  'modalitesAccompagnement' AS category_type,
                  'Aide aux démarches administratives' AS label,
                  d.total AS count,
                  NULL::integer AS participants
              FROM demarches_total d, total_accompagnements t
          )
      SELECT * FROM accompagnement_stats;
  `

export const getAccompagnementBeneficiaires = (
  modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
    participants?: number
  })[],

  beneficiaireStatsPageData: Record<string, QuantifiedShare[]>,

  participantsAnonymesPageData: Record<string, QuantifiedShare[]>,
) => ({
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
