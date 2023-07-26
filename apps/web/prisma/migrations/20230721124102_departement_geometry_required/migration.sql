/*
  Warnings:

  - Made the column `geometry` on table `departements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bounds` on table `departements` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "departements" ALTER COLUMN "geometry" SET NOT NULL,
ALTER COLUMN "bounds" SET NOT NULL;
