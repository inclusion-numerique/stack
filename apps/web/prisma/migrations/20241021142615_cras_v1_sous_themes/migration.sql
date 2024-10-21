/*
  Warnings:

  - You are about to drop the column `sous_themes_accompagner_enfant` on the `cras_conseiller_numerique_v1` table. All the data in the column will be lost.
  - You are about to drop the column `sous_themes_equipements_informatiques` on the `cras_conseiller_numerique_v1` table. All the data in the column will be lost.
  - The `organismes` column on the `cras_conseiller_numerique_v1` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cras_conseiller_numerique_v1" DROP COLUMN "sous_themes_accompagner_enfant",
DROP COLUMN "sous_themes_equipements_informatiques",
ADD COLUMN     "annotation" TEXT,
ADD COLUMN     "sous_themes_accompagner" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "sous_themes_equipement_informatique" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "sous_themes_traitement_texte" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "organismes",
ADD COLUMN     "organismes" JSONB;
