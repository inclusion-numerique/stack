/*
  Warnings:

  - Added the required column `duree_minutes` to the `cras_conseiller_numerique_v1` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cras_conseiller_numerique_v1" ADD COLUMN     "duree_minutes" INTEGER NOT NULL;
