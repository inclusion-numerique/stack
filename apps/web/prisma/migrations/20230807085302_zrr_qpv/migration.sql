/*
  Warnings:

  - Added the required column `qpv` to the `structures_cartographie_nationale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zrr` to the `structures_cartographie_nationale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN     "qpv" BOOLEAN,
ADD COLUMN     "zrr" BOOLEAN;

UPDATE "structures_cartographie_nationale" SET "qpv" = FALSE, "zrr" = FALSE;

ALTER TABLE "structures_cartographie_nationale" ALTER COLUMN "qpv" SET NOT NULL;
ALTER TABLE "structures_cartographie_nationale" ALTER COLUMN "zrr" SET NOT NULL;
