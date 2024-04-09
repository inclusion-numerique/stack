/*
  Warnings:

  - A unique constraint covering the columns `[beneficiaire_dotation_formation_id]` on the table `gouvernances` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "gouvernances" ADD COLUMN     "beneficiaire_dotation_formation_enregistre" TIMESTAMP(3),
ADD COLUMN     "beneficiaire_dotation_formation_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "gouvernances_beneficiaire_dotation_formation_id_key" ON "gouvernances"("beneficiaire_dotation_formation_id");

-- AddForeignKey
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_beneficiaire_dotation_formation_id_fkey" FOREIGN KEY ("beneficiaire_dotation_formation_id") REFERENCES "membre_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
