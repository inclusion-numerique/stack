/*
  Warnings:

  - Added the required column `code_postal` to the `structures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commune` to the `structures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "structures" ADD COLUMN     "code_insee" VARCHAR(5),
ADD COLUMN     "code_postal" VARCHAR(5) NOT NULL,
ADD COLUMN     "commune" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
