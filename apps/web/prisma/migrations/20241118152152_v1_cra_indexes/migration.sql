/*
  Warnings:

  - You are about to drop the column `cras_v1_date_debut` on the `conseillers_numeriques` table. All the data in the column will be lost.
  - You are about to drop the column `cras_v1_date_fin` on the `conseillers_numeriques` table. All the data in the column will be lost.
  - You are about to drop the column `dernier_import_cras_v1` on the `conseillers_numeriques` table. All the data in the column will be lost.
  - You are about to drop the column `conseiller_numerique_id` on the `cras_conseiller_numerique_v1` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cras_conseiller_numerique_v1" DROP CONSTRAINT "cras_conseiller_numerique_v1_conseiller_numerique_id_fkey";

-- DropIndex
DROP INDEX "cras_conseiller_numerique_v1_conseiller_numerique_id_idx";

-- AlterTable
ALTER TABLE "conseillers_numeriques" DROP COLUMN "cras_v1_date_debut",
DROP COLUMN "cras_v1_date_fin",
DROP COLUMN "dernier_import_cras_v1";

-- AlterTable
ALTER TABLE "cras_conseiller_numerique_v1" DROP COLUMN "conseiller_numerique_id";

-- CreateIndex
CREATE INDEX "cras_conseiller_numerique_v1_date_accompagnement_idx" ON "cras_conseiller_numerique_v1"("date_accompagnement" ASC);

-- CreateIndex
CREATE INDEX "cras_conseiller_numerique_v1_code_commune_idx" ON "cras_conseiller_numerique_v1"("code_commune");
