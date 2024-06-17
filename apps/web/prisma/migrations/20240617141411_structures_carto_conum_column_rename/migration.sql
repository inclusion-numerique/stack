/*
  Warnings:

  - You are about to drop the column `conseiller_numerique_permanences_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "structures_cartographie_nationale" DROP COLUMN "conseiller_numerique_permanences_id",
ADD COLUMN     "conseiller_numerique_permanence_ids" TEXT[] DEFAULT ARRAY[]::TEXT[];
