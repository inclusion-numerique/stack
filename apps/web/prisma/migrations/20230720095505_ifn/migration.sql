/*
  Warnings:

  - You are about to drop the column `structure_cartographie_nationale_id` on the `conseiller_numerique` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conseiller_numerique" DROP CONSTRAINT "conseiller_numerique_structure_cartographie_nationale_id_fkey";

-- DropIndex
DROP INDEX "conseiller_numerique_structure_cartographie_nationale_id_idx";

-- DropIndex
DROP INDEX "conseiller_numerique_structure_cartographie_nationale_id_key";

-- AlterTable
ALTER TABLE "conseiller_numerique" DROP COLUMN "structure_cartographie_nationale_id";

-- CreateTable
CREATE TABLE "ifn_epci" (
    "id" TEXT NOT NULL,
    "code_epci" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "no_4g_coverage_rate" DOUBLE PRECISION NOT NULL,
    "no_thd_coverage_rate" DOUBLE PRECISION NOT NULL,
    "poverty_rate" DOUBLE PRECISION NOT NULL,
    "older_65_rate" DOUBLE PRECISION NOT NULL,
    "nscol15p_rate" DOUBLE PRECISION NOT NULL,
    "errors" JSONB,

    CONSTRAINT "ifn_epci_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ifn_commune" (
    "id" TEXT NOT NULL,
    "code_commune" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "no_4g_coverage_rate" DOUBLE PRECISION NOT NULL,
    "no_thd_coverage_rate" DOUBLE PRECISION NOT NULL,
    "poverty_rate" DOUBLE PRECISION NOT NULL,
    "older_65_rate" DOUBLE PRECISION NOT NULL,
    "nscol15p_rate" DOUBLE PRECISION NOT NULL,
    "errors" JSONB,

    CONSTRAINT "ifn_commune_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ifn_epci_code_epci_key" ON "ifn_epci"("code_epci");

-- CreateIndex
CREATE UNIQUE INDEX "ifn_commune_code_commune_key" ON "ifn_commune"("code_commune");

-- AddForeignKey
ALTER TABLE "ifn_epci" ADD CONSTRAINT "ifn_epci_code_epci_fkey" FOREIGN KEY ("code_epci") REFERENCES "epcis"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "ifn_commune" ADD CONSTRAINT "ifn_commune_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
