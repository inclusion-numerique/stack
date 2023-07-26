/*
  Warnings:

  - You are about to drop the column `permanence_conseiller_numerique_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - You are about to drop the column `source_data` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - You are about to drop the column `structure_aidants_connect_id` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - You are about to drop the column `thematiques` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - You are about to drop the column `typologie` on the `structures_cartographie_nationale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[structure_cartographie_nationale_id]` on the table `permanences_conseiller_numerique` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[structure_cartographie_nationale_id]` on the table `structures_aidants_connect` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `structures_cartographie_nationale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_permanence_conseiller_nu_fkey";

-- DropForeignKey
ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_structure_aidants_connec_fkey";

-- DropIndex
DROP INDEX "structures_cartographie_nationale_permanence_conseiller_num_key";

-- DropIndex
DROP INDEX "structures_cartographie_nationale_structure_aidants_connect_key";

-- AlterTable
ALTER TABLE "permanences_conseiller_numerique" ADD COLUMN     "structure_cartographie_nationale_id" TEXT;

-- AlterTable
ALTER TABLE "structures_aidants_connect" ADD COLUMN     "structure_cartographie_nationale_id" TEXT;

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" DROP COLUMN "permanence_conseiller_numerique_id",
DROP COLUMN "source_data",
DROP COLUMN "structure_aidants_connect_id",
DROP COLUMN "thematiques",
DROP COLUMN "typologie",
ADD COLUMN     "sousTypePublic" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "permanences_conseiller_numerique_structure_cartographie_nat_key" ON "permanences_conseiller_numerique"("structure_cartographie_nationale_id");

-- CreateIndex
CREATE INDEX "permanences_conseiller_numerique_structure_cartographie_nat_idx" ON "permanences_conseiller_numerique"("structure_cartographie_nationale_id");

-- CreateIndex
CREATE UNIQUE INDEX "structures_aidants_connect_structure_cartographie_nationale_key" ON "structures_aidants_connect"("structure_cartographie_nationale_id");

-- CreateIndex
CREATE INDEX "structures_aidants_connect_structure_cartographie_nationale_idx" ON "structures_aidants_connect"("structure_cartographie_nationale_id");

-- AddForeignKey
ALTER TABLE "structures_aidants_connect" ADD CONSTRAINT "structures_aidants_connect_structure_cartographie_national_fkey" FOREIGN KEY ("structure_cartographie_nationale_id") REFERENCES "structures_cartographie_nationale"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "permanences_conseiller_numerique" ADD CONSTRAINT "permanences_conseiller_numerique_structure_cartographie_na_fkey" FOREIGN KEY ("structure_cartographie_nationale_id") REFERENCES "structures_cartographie_nationale"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
