/*
  Warnings:

  - You are about to drop the column `permanenceConseillerNumeriqueId` on the `conseillers_numeriques_en_permanence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" DROP CONSTRAINT "conseillers_numeriques_en_permanence_permanenceConseillerN_fkey";

-- AlterTable
ALTER TABLE "conseillers_numeriques_en_permanence" DROP COLUMN "permanenceConseillerNumeriqueId";

-- CreateIndex
CREATE INDEX "conseillers_numeriques_en_permanence_conseiller_numerique_i_idx" ON "conseillers_numeriques_en_permanence"("conseiller_numerique_id");

-- CreateIndex
CREATE INDEX "conseillers_numeriques_en_permanence_permanence_id_idx" ON "conseillers_numeriques_en_permanence"("permanence_id");

-- AddForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" ADD CONSTRAINT "conseillers_numeriques_en_permanence_permanence_id_fkey" FOREIGN KEY ("permanence_id") REFERENCES "permanences_conseiller_numerique"("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
