/*
  Warnings:

  - You are about to drop the column `beneficiaire_dotation_formation_acceptee` on the `gouvernances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gouvernances" DROP COLUMN "beneficiaire_dotation_formation_acceptee",
ADD COLUMN     "beneficiaire_dotation_formation_accepte" TIMESTAMP(3);
