/*
  Warnings:

  - You are about to drop the column `aidants_connect_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - You are about to drop the column `conseiller_numerique_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "structures_cartographie_nationale_aidants_connect_id_idx";

-- DropIndex
DROP INDEX "structures_cartographie_nationale_conseiller_numerique_id_idx";

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" DROP COLUMN "aidants_connect_id",
DROP COLUMN "conseiller_numerique_id",
ADD COLUMN     "conseiller_numerique_permanence_id" TEXT,
ADD COLUMN     "conseiller_numerique_structure_id" TEXT;

-- CreateIndex
CREATE INDEX "structures_cartographie_nationale_conseiller_numerique_perm_idx" ON "structures_cartographie_nationale"("conseiller_numerique_permanence_id");

-- CreateIndex
CREATE INDEX "structures_cartographie_nationale_conseiller_numerique_stru_idx" ON "structures_cartographie_nationale"("conseiller_numerique_structure_id");
