/*
  Warnings:

  - You are about to drop the column `beneficiaire_dotation_formation_enregistre` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiaire_dotation_formation_valide` on the `gouvernances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gouvernances" DROP COLUMN "beneficiaire_dotation_formation_enregistre",
DROP COLUMN "beneficiaire_dotation_formation_valide",
ADD COLUMN     "beneficiaire_dotation_formation_acceptee" TIMESTAMP(3),
ADD COLUMN     "beneficiaire_dotation_formation_valide_et_envoye" TIMESTAMP(3);
