/*
  Warnings:

  - Added the required column `v1_conseiller_numerique_id` to the `cras_conseiller_numerique_v1` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cras_conseiller_numerique_v1" DROP CONSTRAINT "cras_conseiller_numerique_v1_conseiller_numerique_id_fkey";

-- AlterTable
ALTER TABLE "cras_conseiller_numerique_v1" ADD COLUMN     "v1_conseiller_numerique_id" TEXT NOT NULL,
ALTER COLUMN "conseiller_numerique_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cras_conseiller_numerique_v1" ADD CONSTRAINT "cras_conseiller_numerique_v1_conseiller_numerique_id_fkey" FOREIGN KEY ("conseiller_numerique_id") REFERENCES "conseillers_numeriques"("id") ON DELETE SET NULL ON UPDATE CASCADE;
