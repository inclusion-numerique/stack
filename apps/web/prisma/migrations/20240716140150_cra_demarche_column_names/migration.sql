/*
  Warnings:

  - You are about to drop the column `degreDeFinalisation` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `oriente_vers_structure` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `structureDeRedirection` on the `cras_demarches_administratives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cras_demarches_administratives" DROP COLUMN "degreDeFinalisation",
DROP COLUMN "oriente_vers_structure",
DROP COLUMN "structureDeRedirection",
ADD COLUMN     "degre_de_finalisation" "degre_de_finalisation_demarche",
ADD COLUMN     "structure_de_redirection" "structure_de_redirection";
