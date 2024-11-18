/*
  Warnings:

  - Made the column `code_postal` on table `cras_conseiller_numerique_v1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nom_commune` on table `cras_conseiller_numerique_v1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code_commune` on table `cras_conseiller_numerique_v1` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cras_conseiller_numerique_v1" ALTER COLUMN "code_postal" SET NOT NULL,
ALTER COLUMN "nom_commune" SET NOT NULL,
ALTER COLUMN "code_commune" SET NOT NULL;
