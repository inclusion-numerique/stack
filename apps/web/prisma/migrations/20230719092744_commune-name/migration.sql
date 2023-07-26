/*
  Warnings:

  - You are about to drop the column `article` on the `communes` table. All the data in the column will be lost.
  - You are about to drop the column `nom_commune_complet` on the `communes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "communes" DROP COLUMN "article",
DROP COLUMN "nom_commune_complet";
