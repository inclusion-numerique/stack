-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN     "coop_id" TEXT;

-- CreateIndex
CREATE INDEX "structures_cartographie_nationale_coop_id_idx" ON "structures_cartographie_nationale"("coop_id");
