/*
  Warnings:

  - You are about to drop the column `conseiller_numerique_permanence_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - You are about to drop the column `conseiller_numerique_structure_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "structures_cartographie_nationale_conseiller_numerique_perm_idx";

-- DropIndex
DROP INDEX "structures_cartographie_nationale_conseiller_numerique_stru_idx";

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" DROP COLUMN "conseiller_numerique_permanence_id",
DROP COLUMN "conseiller_numerique_structure_id",
ADD COLUMN     "conseiller_numerique_permanences_id" TEXT[] DEFAULT ARRAY[]::TEXT[];
