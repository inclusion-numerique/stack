/*
  Warnings:

  - You are about to drop the column `participants` on the `cra_conseiller_numerique_par_departement` table. All the data in the column will be lost.
  - Added the required column `accompagnements` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usagers` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cra_conseiller_numerique_par_departement" RENAME COLUMN "participants" TO "accompagnements";
ALTER TABLE "cra_conseiller_numerique_par_departement" ADD COLUMN "usagers" INTEGER;
UPDATE "cra_conseiller_numerique_par_departement" SET "usagers" = 0;
ALTER TABLE "cra_conseiller_numerique_par_departement" ALTER COLUMN "usagers" SET NOT NULL;
