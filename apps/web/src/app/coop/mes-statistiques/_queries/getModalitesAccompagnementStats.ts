import { prismaClient } from '@app/web/prismaClient'
import {
  AccompagnementLabel,
  QuantifiedShare,
  toTotalCount,
} from '../quantifiedShare'
import { BeneficiaireQuantifiedShare } from './getBeneficiaireStats'

export const getModalitesAccompagnementStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<
    (QuantifiedShare<AccompagnementLabel> & {
      participants?: number
    })[]
  >`
      WITH
      individuels_total AS (
          SELECT COUNT(*)::integer as total
          FROM "coop-mediation-numerique".public.cras_individuels
          WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
      ),
      collectifs_total AS (
          SELECT COUNT(*)::integer as total
          FROM "coop-mediation-numerique".public.cras_collectifs
          WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
      ),
      demarches_total AS (
          SELECT COUNT(*)::integer as total
          FROM "coop-mediation-numerique".public.cras_demarches_administratives
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
              ROUND(i.total * 100.0 / t.total)::integer AS proportion
          FROM individuels_total i, total_accompagnements t
          UNION ALL
          SELECT 
              'modalitesAccompagnement' AS category_type,
              'Ateliers collectifs' AS label,
              c.total AS count,
              ROUND(c.total * 100.0 / t.total)::integer AS proportion
          FROM collectifs_total c, total_accompagnements t
          UNION ALL
          SELECT 
              'modalitesAccompagnement' AS category_type,
              'Aide aux démarches administratives' AS label,
              d.total AS count,
              ROUND(d.total * 100.0 / t.total)::integer AS proportion
          FROM demarches_total d, total_accompagnements t
      )
      SELECT * FROM accompagnement_stats;
  `

export const toModalitesWithParticipantsCount =
  (
    participantsAteliersCount: number,
    beneficiairesAnonymesStats: BeneficiaireQuantifiedShare[],
  ) =>
  (modaliteAccompagnement: QuantifiedShare<AccompagnementLabel>) =>
    modaliteAccompagnement.label === 'Ateliers collectifs'
      ? {
          ...modaliteAccompagnement,
          participants:
            participantsAteliersCount +
            beneficiairesAnonymesStats.reduce(
              (total, { category_type, count }) =>
                category_type === 'genresBeneficiaires' ? total + count : total,
              0,
            ),
        }
      : modaliteAccompagnement

export const getAccompagnementBeneficiaires = (
  modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
    participants?: number
  })[],

  beneficiaireStatsPageData: Record<string, QuantifiedShare[]>,

  participantsAnonymesPageData: Record<string, QuantifiedShare[]>,
) => ({
  accompagnements: modalitesAccompagnement.reduce(toTotalCount, 0),
  beneficiaires: beneficiaireStatsPageData.genresBeneficiaires.reduce(
    toTotalCount,
    0,
  ),
  anonymes: participantsAnonymesPageData.genresBeneficiaires.reduce(
    toTotalCount,
    0,
  ),
})
