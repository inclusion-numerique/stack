/*
  Warnings:

  - Made the column `commune_code` on table `commune_participante_formulaire_gouvernance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" DROP CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey";

-- AlterTable
ALTER TABLE "commune_participante_formulaire_gouvernance" ALTER COLUMN "commune_code" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
