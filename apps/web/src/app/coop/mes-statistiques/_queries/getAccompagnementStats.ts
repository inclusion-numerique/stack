import { prismaClient } from '@app/web/prismaClient'
import {
  materielLabels,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  thematiqueShortLabels,
  typeLieuAtelierLabels,
  typeLieuLabels,
} from '@app/web/cra/cra'
import { QuantifiedShare, QuantifiedShareToProcess } from '../quantifiedShare'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { createEnumLabelCaseSelect } from '@app/web/app/coop/mes-statistiques/_queries/createEnumLabelCaseSelect'
import { Thematique } from '@prisma/client'
import {
  getActiviteFiltersSqlFragment,
  getCrasCollectifsFiltersWhereConditions,
  getCrasDemarchesAdministrativesFiltersWhereConditions,
  getCrasIndividuelFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'

const accompagnementCategories = [
  'canauxAccompagnements',
  'dureesAccompagnements',
  'lieuxAccompagnements',
  'thematiquesAccompagnements',
  'thematiquesDemarchesAdministratives',
  'materielsAccompagnements',
] as const

export type AccompagnementCategory = (typeof accompagnementCategories)[number]

export type AccompagnementQuantifiedShare =
  QuantifiedShareToProcess<AccompagnementCategory>

export const getAccompagnementCollectifsStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<AccompagnementQuantifiedShare[]>`
      WITH filtered_cras_collectifs AS (SELECT cras_collectifs.*
                                        FROM cras_collectifs
                                            LEFT JOIN structures ON structures.id = cras_collectifs.lieu_activite_id
                                            LEFT JOIN participants_ateliers_collectifs ON participants_ateliers_collectifs.cra_collectif_id = cras_collectifs.id
                                        WHERE cras_collectifs.cree_par_mediateur_id = ${mediateurId}::UUID
                                          AND cras_collectifs.suppression IS NULL
                                          AND ${getActiviteFiltersSqlFragment(
                                            getCrasCollectifsFiltersWhereConditions(
                                              activitesFilters,
                                            ),
                                          )}
                                    ),
       categorized_data AS (SELECT 'canauxAccompagnements' AS category_type,
                                       CASE
                                           WHEN "lieuAtelier" = 'lieu_activite' THEN 'Lieu d’activité'
                                           WHEN "lieuAtelier" = 'autre' THEN 'Autre lieu'
                                           ELSE 'Non communiqué'
                                           END                 AS category,
                                       COUNT(*)::integer       AS count
                                FROM filtered_cras_collectifs
                                GROUP BY category
                                UNION ALL
                                SELECT 'dureesAccompagnements' AS category_type,
                                       "duree"::text           AS category,
                                       COUNT(*)::integer       AS count
                                FROM filtered_cras_collectifs
                                WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                  AND suppression IS NULL
                                GROUP BY category
                                UNION ALL
                                SELECT 'lieuxAccompagnements'                       AS category_type,
                                       COALESCE("structures".nom, 'Non communiqué') AS category,
                                       COUNT(*)::integer                            AS count
                                FROM filtered_cras_collectifs
                                         LEFT JOIN structures
                                                   ON filtered_cras_collectifs.lieu_activite_id = structures.id
                                GROUP BY category
                                UNION ALL
                                SELECT 'thematiquesAccompagnements' AS category_type,
                                       ${createEnumLabelCaseSelect({
                                         enumObj: Thematique,
                                         labels: thematiqueShortLabels,
                                         column: 'thematique',
                                       })}                          AS category,
                                       COUNT(*)::integer            AS count
                                FROM filtered_cras_collectifs,
                                     UNNEST(thematiques_accompagnement) AS thematique
                                GROUP BY thematique
                                UNION ALL
                                SELECT 'materielsAccompagnements' AS category_type,
                                       CASE
                                           WHEN mat = 'ordinateur' THEN 'Ordinateur'
                                           WHEN mat = 'telephone' THEN 'Téléphone'
                                           WHEN mat = 'tablette' THEN 'Tablette'
                                           WHEN mat = 'autre' THEN 'Autre'
                                           WHEN mat = 'aucun' THEN 'Aucun'
                                           ELSE 'Non communiqué'
                                           END                    AS category,
                                       COUNT(*)::integer          AS count
                                FROM filtered_cras_collectifs,
                                     UNNEST(materiel) AS mat
                                GROUP BY mat)
      SELECT category_type,
             category AS label,
             count
      FROM categorized_data;
  `

export const getAccompagnementDemarchesStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) => prismaClient.$queryRaw<AccompagnementQuantifiedShare[]>`
      WITH filtered_cras_demarches_administratives AS (SELECT cras_demarches_administratives.*
                                                       FROM cras_demarches_administratives
                                                            LEFT JOIN structures
                                                                      ON structures.id = cras_demarches_administratives.lieu_activite_id
                                                       WHERE cras_demarches_administratives.cree_par_mediateur_id = ${mediateurId}::UUID
                                                         AND cras_demarches_administratives.suppression IS NULL 
                                                         AND ${getActiviteFiltersSqlFragment(
                                                           getCrasDemarchesAdministrativesFiltersWhereConditions(
                                                             activitesFilters,
                                                           ),
                                                         )}
                                                      ),
           categorized_data AS (SELECT 'canauxAccompagnements' AS category_type,
                                       CASE
                                           WHEN "lieuAccompagnement" = 'lieu_activite' THEN 'Lieu d’activité'
                                           WHEN "lieuAccompagnement" = 'domicile' THEN 'À domicile'
                                           WHEN "lieuAccompagnement" = 'a_distance' THEN 'À distance'
                                           ELSE 'Non communiqué'
                                           END                 AS category,
                                       COUNT(*)::integer       AS count
                                FROM filtered_cras_demarches_administratives
                                GROUP BY category
                                UNION ALL
                                SELECT 'dureesAccompagnements' AS category_type,
                                       "duree"::text           AS category,
                                       COUNT(*)::integer       AS count
                                FROM filtered_cras_demarches_administratives
                                GROUP BY category
                                UNION ALL
                                SELECT 'lieuxAccompagnements'                       AS category_type,
                                       COALESCE("structures".nom, 'Non communiqué') AS category,
                                       COUNT(*)::integer                            AS count
                                FROM filtered_cras_demarches_administratives
                                         LEFT JOIN structures 
                                                   ON lieu_activite_id = structures.id
                                GROUP BY category
                                UNION ALL
                                SELECT 'thematiquesDemarchesAdministratives' AS category_type,
                                       CASE
                                           WHEN thematique = 'papiers_elections_citoyennete'
                                               THEN 'Papiers - Élections Citoyenneté'
                                           WHEN thematique = 'famille_scolarite' THEN 'Famille - Scolarité'
                                           WHEN thematique = 'social_sante' THEN 'Social - Santé'
                                           WHEN thematique = 'travail_formation' THEN 'Travail - Formation'
                                           WHEN thematique = 'logement' THEN 'Logement'
                                           WHEN thematique = 'transports_mobilite' THEN 'Transports - Mobilité'
                                           WHEN thematique = 'argent_impots' THEN 'Argent - Impôts'
                                           WHEN thematique = 'justice' THEN 'Justice'
                                           WHEN thematique = 'etrangers_europe' THEN 'Étrangers - Europe'
                                           WHEN thematique = 'loisirs_sports_culture' THEN 'Loisirs - Sports Culture'
                                           ELSE 'Non communiqué'
                                           END                               AS category,
                                       COUNT(*)::integer                     AS count
                                FROM filtered_cras_demarches_administratives,
                                     UNNEST(thematiques_accompagnement) AS thematique
                                GROUP BY thematique)
      SELECT category_type,
             category AS label,
             count
      FROM categorized_data;
  `

export const getAccompagnementIndividuelsStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<AccompagnementQuantifiedShare[]>`
        WITH filtered_cras_individuels AS (
        SELECT cras_individuels.* 
        FROM cras_individuels
             LEFT JOIN structures ON structures.id = cras_individuels.lieu_activite_id
        WHERE cras_individuels.cree_par_mediateur_id = ${mediateurId}::UUID
          AND cras_individuels.suppression IS NULL
          AND ${getActiviteFiltersSqlFragment(
            getCrasIndividuelFiltersWhereConditions(activitesFilters),
          )}
      ),
       categorized_data AS (SELECT 'canauxAccompagnements' AS category_type,
                                       CASE
                                           WHEN "lieuAccompagnement" = 'lieu_activite' THEN 'Lieu d’activité'
                                           WHEN "lieuAccompagnement" = 'domicile' THEN 'À domicile'
                                           WHEN "lieuAccompagnement" = 'a_distance' THEN 'À distance'
                                           ELSE 'Non communiqué'
                                           END                 AS category,
                                       COUNT(*)::integer       AS count
                                FROM filtered_cras_individuels
                                GROUP BY category
                                UNION ALL
                                SELECT 'dureesAccompagnements' AS category_type,
                                       "duree"::text           AS category,
                                       COUNT(*)::integer       AS count
                                FROM filtered_cras_individuels
                                GROUP BY category
                                UNION ALL
                                SELECT 'lieuxAccompagnements'                       AS category_type,
                                       COALESCE("structures".nom, 'Non communiqué') AS category,
                                       COUNT(*)::integer                            AS count
                                FROM filtered_cras_individuels
                                         LEFT JOIN structures
                                                   ON filtered_cras_individuels.lieu_activite_id = structures.id
                                GROUP BY category
                                UNION ALL
                                SELECT 'thematiquesAccompagnements' AS category_type,
                                       CASE
                                           WHEN thematique = 'prendre_en_main_du_materiel'
                                               THEN 'Prendre en main du matériel'
                                           WHEN thematique = 'navigation_sur_internet' THEN 'Navigation sur internet'
                                           WHEN thematique = 'email' THEN 'Email'
                                           WHEN thematique = 'bureautique' THEN 'Bureautique'
                                           WHEN thematique = 'reseaux_sociaux' THEN 'Réseaux sociaux'
                                           WHEN thematique = 'sante' THEN 'Santé'
                                           WHEN thematique = 'banque_et_achats_en_ligne'
                                               THEN 'Banques et achats en ligne'
                                           WHEN thematique = 'entrepreneuriat' THEN 'Entrepreneuriat'
                                           WHEN thematique = 'insertion_professionnelle'
                                               THEN 'Insertion professionnelle'
                                           WHEN thematique = 'securite_numerique' THEN 'Sécurité numérique'
                                           WHEN thematique = 'parentalite' THEN 'Parentalité'
                                           WHEN thematique = 'scolarite_et_numerique' THEN 'Scolarité et numérique'
                                           WHEN thematique = 'creer_avec_le_numerique' THEN 'Créer avec le numérique'
                                           WHEN thematique = 'culture_numerique' THEN 'Culture numérique'
                                           ELSE 'Non communiqué'
                                           END                      AS category,
                                       COUNT(*)::integer            AS count
                                FROM filtered_cras_individuels,
                                     UNNEST(thematiques_accompagnement) AS thematique
                                WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                  AND suppression IS NULL
                                GROUP BY thematique
                                UNION ALL
                                SELECT 'materielsAccompagnements' AS category_type,
                                       CASE
                                           WHEN mat = 'ordinateur' THEN 'Ordinateur'
                                           WHEN mat = 'telephone' THEN 'Téléphone'
                                           WHEN mat = 'tablette' THEN 'Tablette'
                                           WHEN mat = 'autre' THEN 'Autre matériel'
                                           WHEN mat = 'aucun' THEN 'Pas de matériel'
                                           ELSE 'Non communiqué'
                                           END                    AS category,
                                       COUNT(*)::integer          AS count
                                FROM filtered_cras_individuels,
                                     UNNEST(materiel) AS mat
                                WHERE cree_par_mediateur_id = ${mediateurId}::UUID
                                  AND suppression IS NULL
                                GROUP BY mat)
      SELECT category_type,
             category AS label,
             count
      FROM categorized_data;
  `

export const EMPTY_ACCOMPAGNEMENT_DATA: Record<
  AccompagnementCategory,
  QuantifiedShare[]
> = {
  thematiquesAccompagnements: Object.values(thematiqueLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  thematiquesDemarchesAdministratives: Object.values(
    thematiqueDemarcheAdministrativeLabels,
  ).map((label) => ({ label, count: 0, proportion: 0 })),
  materielsAccompagnements: Object.values(materielLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  canauxAccompagnements: [
    ...new Set([
      ...Object.values(typeLieuLabels),
      ...Object.values(typeLieuAtelierLabels),
    ]),
  ].map((label) => ({ label, count: 0, proportion: 0 })),
  dureesAccompagnements: [
    { label: '30', count: 0, proportion: 0 },
    { label: '60', count: 0, proportion: 0 },
    { label: '90', count: 0, proportion: 0 },
    { label: '120', count: 0, proportion: 0 },
  ],
  lieuxAccompagnements: [],
}
