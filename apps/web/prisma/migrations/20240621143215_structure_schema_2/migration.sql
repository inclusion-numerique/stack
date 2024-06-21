/*
  Warnings:

  - You are about to drop the column `accessibilite` on the `structures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "structures" DROP COLUMN "accessibilite",
ADD COLUMN     "fiche_acces_libre" TEXT,
ADD COLUMN     "itinerance" TEXT[] DEFAULT ARRAY[]::TEXT[];
