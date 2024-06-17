-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN     "aidants_connect_id" TEXT,
ADD COLUMN     "conseiller_numerique_id" TEXT,
ADD COLUMN     "coop_ids" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "structures_cartographie_nationale_conseiller_numerique_id_idx" ON "structures_cartographie_nationale"("conseiller_numerique_id");

-- CreateIndex
CREATE INDEX "structures_cartographie_nationale_aidants_connect_id_idx" ON "structures_cartographie_nationale"("aidants_connect_id");
