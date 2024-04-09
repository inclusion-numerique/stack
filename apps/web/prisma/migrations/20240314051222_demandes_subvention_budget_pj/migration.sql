/*
  Warnings:

  - Made the column `piece_jointe_budget_key` on table `demande_de_subvention` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "demande_de_subvention" DROP CONSTRAINT "demande_de_subvention_piece_jointe_budget_key_fkey";

-- AlterTable
ALTER TABLE "demande_de_subvention" ALTER COLUMN "piece_jointe_budget_key" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "demande_de_subvention" ADD CONSTRAINT "demande_de_subvention_piece_jointe_budget_key_fkey" FOREIGN KEY ("piece_jointe_budget_key") REFERENCES "uploads"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
