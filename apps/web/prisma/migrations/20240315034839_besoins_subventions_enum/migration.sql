/*
  Warnings:

  - The values [faire_un_diagnostic_territorial] on the enum `besoin_subvention` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "besoin_subvention_new" AS ENUM ('etablir_un_diagnostic_territorial', 'co_construire_la_feuille_de_route', 'rediger_la_feuille_de_route', 'appui_juridique', 'structurer_un_fonds', 'monter_dossiers_de_subvention', 'animer_la_gouvernance', 'structurer_une_filiere_de_reconditionnement', 'collecter_des_donnees_territoriales', 'sensibiliser_les_acteurs_aux_outils_existants', 'appuyer_la_certification_qualiopi');
ALTER TABLE "demande_de_subvention" ALTER COLUMN "besoins" TYPE "besoin_subvention_new"[] USING ("besoins"::text::"besoin_subvention_new"[]);
ALTER TYPE "besoin_subvention" RENAME TO "besoin_subvention_old";
ALTER TYPE "besoin_subvention_new" RENAME TO "besoin_subvention";
DROP TYPE "besoin_subvention_old";
COMMIT;
