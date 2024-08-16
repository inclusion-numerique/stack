import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShareToProcess } from '../quantifiedShare'

const accompagnementCategories = [
  'canauxAccompagnements',
  'dureesAccompagnements',
  'lieuxAccompagnements',
  'thematiquesAccompagnements',
  'materielsAccompagnements',
] as const

export type AccompagnementCategory = (typeof accompagnementCategories)[number]

export type AccompagnementQuantifiedShare =
  QuantifiedShareToProcess<AccompagnementCategory>

export const getAccompagnementCollectifsStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<AccompagnementQuantifiedShare[]>`
      WITH
          categorized_data AS (
              SELECT
                  'canauxAccompagnements' AS category_type,
                  CASE
                      WHEN "lieuAtelier" = 'lieu_activite' THEN 'Lieu d’activité'
                      WHEN "lieuAtelier" = 'autre' THEN 'Autre'
                      ELSE 'Non communiqué'
                      END AS category,
                  COUNT(*)::integer AS count
              FROM "coop-mediation-numerique".public.cras_collectifs
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
              GROUP BY category
              UNION ALL
              SELECT
                  'dureesAccompagnements' AS category_type,
                  CASE
                      WHEN "duree" >= 60 THEN
                          CONCAT(FLOOR("duree" / 60), 'h', LPAD(("duree" % 60)::text, 2, '0'))
                      ELSE
                          CONCAT("duree", ' min')
                      END AS category,
                  COUNT(*)::integer AS count
              FROM "coop-mediation-numerique".public.cras_collectifs
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
              GROUP BY category
              UNION ALL
              SELECT 'lieuxAccompagnements' AS category_type,
                     COALESCE("structures".nom, 'Non communiqué') AS category,
                     COUNT(*)::integer AS count
              FROM "coop-mediation-numerique".public.cras_collectifs
                       LEFT JOIN "coop-mediation-numerique".public.structures structures
                                 ON lieu_activite_id = structures.id
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND cras_collectifs.suppression IS NULL
              GROUP BY category
              UNION ALL
              SELECT
                  'thematiquesAccompagnements' AS category_type,
                  CASE
                      WHEN thematique = 'prendre_en_main_du_materiel' THEN 'Prendre en main du matériel'
                      WHEN thematique = 'navigation_sur_internet' THEN 'Navigation sur internet'
                      WHEN thematique = 'email' THEN 'Email'
                      WHEN thematique = 'bureautique' THEN 'Bureautique'
                      WHEN thematique = 'reseaux_sociaux' THEN 'Réseaux sociaux'
                      WHEN thematique = 'sante' THEN 'Santé'
                      WHEN thematique = 'banque_et_achats_en_ligne' THEN 'Banques et achats en ligne'
                      WHEN thematique = 'entrepreneuriat' THEN 'Entrepreneuriat'
                      WHEN thematique = 'insertion_professionnelle' THEN 'Insertion professionnelle'
                      WHEN thematique = 'securite_numerique' THEN 'Sécurité numérique'
                      WHEN thematique = 'parentalite' THEN 'Parentalité'
                      WHEN thematique = 'scolarite_et_numerique' THEN 'Scolarité et numérique'
                      WHEN thematique = 'creer_avec_le_numerique' THEN 'Créer avec le numérique'
                      WHEN thematique = 'culture_numerique' THEN 'Culture numérique'
                      ELSE 'Non communiqué'
                      END AS category,
                  COUNT(*)::integer AS count
              FROM "coop-mediation-numerique".public.cras_collectifs,
                   UNNEST(thematiques_accompagnement) AS thematique
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
              GROUP BY thematique
              UNION ALL
              SELECT
                  'materielsAccompagnements' AS category_type,
                  CASE
                      WHEN mat = 'ordinateur' THEN 'Ordinateur'
                      WHEN mat = 'telephone' THEN 'Téléphone'
                      WHEN mat = 'tablette' THEN 'Tablette'
                      WHEN mat = 'autre' THEN 'Autre'
                      WHEN mat = 'aucun' THEN 'Aucun'
                      ELSE 'Non communiqué'
                      END AS category,
                  COUNT(*)::integer AS count
              FROM "coop-mediation-numerique".public.cras_collectifs,
                   UNNEST(materiel) AS mat
              WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
              GROUP BY mat
          )
      SELECT
          category_type,
          category AS label,
          count
      FROM categorized_data;
  `

export const getAccompagnementDemarchesStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<AccompagnementQuantifiedShare[]>`
      WITH
           categorized_data AS (
               SELECT
                   'canauxAccompagnements' AS category_type,
                   CASE
                       WHEN "lieuAccompagnement" = 'lieu_activite' THEN 'Lieu d’activité'
                       WHEN "lieuAccompagnement"  = 'domicile' THEN 'Domicile'
                       WHEN "lieuAccompagnement"  = 'a_distance' THEN 'À distance'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_demarches_administratives
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'dureesAccompagnements' AS category_type,
                   CASE
                       WHEN "duree" >= 60 THEN
                           CONCAT(FLOOR("duree" / 60), 'h', LPAD(("duree" % 60)::text, 2, '0'))
                       ELSE
                           CONCAT("duree", ' min')
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_demarches_administratives
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT 'lieuxAccompagnements' AS category_type,
                   COALESCE("structures".nom, 'Non communiqué') AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_demarches_administratives
                   LEFT JOIN "coop-mediation-numerique".public.structures structures
                       ON lieu_activite_id = structures.id
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND cras_demarches_administratives.suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'thematiquesAccompagnements' AS category_type,
                   CASE
                       WHEN thematique = 'papiers_elections_citoyennete' THEN 'Papiers élections et citoyenneté'
                       WHEN thematique = 'famille_scolarite' THEN 'Famille et scolarité'
                       WHEN thematique = 'social_sante' THEN 'Social et santé'
                       WHEN thematique = 'travail_formation' THEN 'Travail et formation'
                       WHEN thematique = 'logement' THEN 'Logement'
                       WHEN thematique = 'transports_mobilite' THEN 'Transports et mobilité'
                       WHEN thematique = 'argent_impots' THEN 'Agent impôts'
                       WHEN thematique = 'justice' THEN 'Justice'
                       WHEN thematique = 'etrangers_europe' THEN 'Étrangers et europe'
                       WHEN thematique = 'loisirs_sports_culture' THEN 'Loisirs, sports et culture'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_demarches_administratives,
                    UNNEST(thematiques_accompagnement) AS thematique
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY thematique
           )
      SELECT
          category_type,
          category AS label,
          count
      FROM categorized_data;
  `

export const getAccompagnementIndividuelsStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<AccompagnementQuantifiedShare[]>`
      WITH
           categorized_data AS (
               SELECT
                   'canauxAccompagnements' AS category_type,
                   CASE
                       WHEN "lieuAccompagnement" = 'lieu_activite' THEN 'Lieu d’activité'
                       WHEN "lieuAccompagnement" = 'domicile' THEN 'Domicile'
                       WHEN "lieuAccompagnement" = 'a_distance' THEN 'À distance'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_individuels
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'dureesAccompagnements' AS category_type,
                   CASE
                       WHEN "duree" >= 60 THEN
                           CONCAT(FLOOR("duree" / 60), 'h', LPAD(("duree" % 60)::text, 2, '0'))
                       ELSE
                           CONCAT("duree", ' min')
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_individuels
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT 'lieuxAccompagnements' AS category_type,
                   COALESCE("structures".nom, 'Non communiqué') AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_individuels
                   LEFT JOIN "coop-mediation-numerique".public.structures structures
                       ON lieu_activite_id = structures.id
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND cras_individuels.suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'thematiquesAccompagnements' AS category_type,
                   CASE
                       WHEN thematique = 'prendre_en_main_du_materiel' THEN 'Prendre en main du matériel'
                       WHEN thematique = 'navigation_sur_internet' THEN 'Navigation sur internet'
                       WHEN thematique = 'email' THEN 'Email'
                       WHEN thematique = 'bureautique' THEN 'Bureautique'
                       WHEN thematique = 'reseaux_sociaux' THEN 'Réseaux sociaux'
                       WHEN thematique = 'sante' THEN 'Santé'
                       WHEN thematique = 'banque_et_achats_en_ligne' THEN 'Banques et achats en ligne'
                       WHEN thematique = 'entrepreneuriat' THEN 'Entrepreneuriat'
                       WHEN thematique = 'insertion_professionnelle' THEN 'Insertion professionnelle'
                       WHEN thematique = 'securite_numerique' THEN 'Sécurité numérique'
                       WHEN thematique = 'parentalite' THEN 'Parentalité'
                       WHEN thematique = 'scolarite_et_numerique' THEN 'Scolarité et numérique'
                       WHEN thematique = 'creer_avec_le_numerique' THEN 'Créer avec le numérique'
                       WHEN thematique = 'culture_numerique' THEN 'Culture numérique'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_individuels,
                    UNNEST(thematiques_accompagnement) AS thematique
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY thematique
               UNION ALL
               SELECT
                   'materielsAccompagnements' AS category_type,
                   CASE
                       WHEN mat = 'ordinateur' THEN 'Ordinateur'
                       WHEN mat = 'telephone' THEN 'Téléphone'
                       WHEN mat = 'tablette' THEN 'Tablette'
                       WHEN mat = 'autre' THEN 'Autre'
                       WHEN mat = 'aucun' THEN 'Aucun'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.cras_individuels,
                    UNNEST(materiel) AS mat
               WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY mat
           )
      SELECT
          category_type,
          category AS label,
          count
      FROM categorized_data;
  `
