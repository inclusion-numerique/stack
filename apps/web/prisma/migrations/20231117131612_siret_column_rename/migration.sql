/*
  Warnings:

  - You are about to drop the column `verifie` on the `informations_siret` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "informations_siret" DROP COLUMN "verifie",
ADD COLUMN     "verification" TIMESTAMP(3);
