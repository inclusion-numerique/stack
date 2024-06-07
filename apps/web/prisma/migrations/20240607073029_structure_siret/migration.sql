/*
  Warnings:

  - You are about to drop the column `siret_ou_rna` on the `structures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "structures" DROP COLUMN "siret_ou_rna",
ADD COLUMN     "rna" TEXT,
ADD COLUMN     "siret" TEXT;
