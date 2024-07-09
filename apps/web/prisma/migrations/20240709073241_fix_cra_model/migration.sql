/*
  Warnings:

  - You are about to drop the column `va_poursuivre_parcours_accompagnement` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `va_poursuivre_parcours_accompagnement` on the `cras_individuels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "beneficiaires" ADD COLUMN     "va_poursuivre_parcours_accompagnement" BOOLEAN;

-- AlterTable
ALTER TABLE "cras_demarches_administratives" DROP COLUMN "va_poursuivre_parcours_accompagnement";

-- AlterTable
ALTER TABLE "cras_individuels" DROP COLUMN "va_poursuivre_parcours_accompagnement";
