/*
  Warnings:

  - You are about to drop the column `code_commune` on the `beneficiaires` table. All the data in the column will be lost.
  - You are about to drop the column `autonomie` on the `cras_collectifs` table. All the data in the column will be lost.
  - You are about to drop the column `code_commune_domicile` on the `cras_collectifs` table. All the data in the column will be lost.
  - You are about to drop the column `lieuAccompagnement` on the `cras_collectifs` table. All the data in the column will be lost.
  - You are about to drop the column `participantsAnonymesCraCollectifId` on the `cras_collectifs` table. All the data in the column will be lost.
  - You are about to drop the column `autonomie` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `code_commune_domicile` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `poursuite_accompagnement` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `poursuite_accompagnement_structure_id` on the `cras_demarches_administratives` table. All the data in the column will be lost.
  - You are about to drop the column `code_commune_domicile` on the `cras_individuels` table. All the data in the column will be lost.
  - You are about to drop the column `poursuite_accompagnement` on the `cras_individuels` table. All the data in the column will be lost.
  - You are about to drop the column `poursuite_accompagnement_structure_id` on the `cras_individuels` table. All the data in the column will be lost.
  - Added the required column `lieuAtelier` to the `cras_collectifs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "structure_de_redirection" AS ENUM ('aide_aux_demarches_administratives', 'administration', 'mediation_numerique', 'autre');

-- CreateEnum
CREATE TYPE "lieu_atelier" AS ENUM ('lieu_activite', 'autre');

-- CreateEnum
CREATE TYPE "niveau_atelier" AS ENUM ('debutant', 'intermediaire', 'avance');

-- CreateEnum
CREATE TYPE "degre_de_finalisation_demarche" AS ENUM ('finalisee', 'a_finaliser_en_autonomie', 'doit_revenir', 'oriente_vers_structure');

-- DropForeignKey
ALTER TABLE "cras_demarches_administratives" DROP CONSTRAINT "cras_demarches_administratives_poursuite_accompagnement_st_fkey";

-- DropForeignKey
ALTER TABLE "cras_individuels" DROP CONSTRAINT "cras_individuels_poursuite_accompagnement_structure_id_fkey";

-- AlterTable
ALTER TABLE "beneficiaires" DROP COLUMN "code_commune",
ADD COLUMN     "commune" TEXT,
ADD COLUMN     "commune_code_insee" TEXT,
ADD COLUMN     "commune_code_postal" TEXT;

-- AlterTable
ALTER TABLE "cras_collectifs" DROP COLUMN "autonomie",
DROP COLUMN "code_commune_domicile",
DROP COLUMN "lieuAccompagnement",
DROP COLUMN "participantsAnonymesCraCollectifId",
ADD COLUMN     "lieuAtelier" "lieu_atelier" NOT NULL,
ADD COLUMN     "lieu_accompagnement_autre_code_insee" TEXT,
ADD COLUMN     "lieu_accompagnement_autre_code_postal" TEXT,
ADD COLUMN     "lieu_accompagnement_autre_commune" TEXT,
ADD COLUMN     "niveau" "niveau_atelier",
ADD COLUMN     "titre_atelier" TEXT;

-- AlterTable
ALTER TABLE "cras_demarches_administratives" DROP COLUMN "autonomie",
DROP COLUMN "code_commune_domicile",
DROP COLUMN "poursuite_accompagnement",
DROP COLUMN "poursuite_accompagnement_structure_id",
ADD COLUMN     "degreDeFinalisation" "degre_de_finalisation_demarche",
ADD COLUMN     "lieu_accompagnement_domicile_code_insee" TEXT,
ADD COLUMN     "lieu_accompagnement_domicile_code_postal" TEXT,
ADD COLUMN     "lieu_accompagnement_domicile_commune" TEXT,
ADD COLUMN     "oriente_vers_structure" BOOLEAN,
ADD COLUMN     "structureDeRedirection" "structure_de_redirection",
ADD COLUMN     "va_poursuivre_parcours_accompagnement" BOOLEAN;

-- AlterTable
ALTER TABLE "cras_individuels" DROP COLUMN "code_commune_domicile",
DROP COLUMN "poursuite_accompagnement",
DROP COLUMN "poursuite_accompagnement_structure_id",
ADD COLUMN     "lieu_accompagnement_domicile_code_insee" TEXT,
ADD COLUMN     "lieu_accompagnement_domicile_code_postal" TEXT,
ADD COLUMN     "lieu_accompagnement_domicile_commune" TEXT,
ADD COLUMN     "oriente_vers_structure" BOOLEAN,
ADD COLUMN     "structureDeRedirection" "structure_de_redirection",
ADD COLUMN     "va_poursuivre_parcours_accompagnement" BOOLEAN;

-- DropEnum
DROP TYPE "poursuite_accompagnement";

-- CreateTable
CREATE TABLE "activites" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "cra_individuel_id" UUID,
    "cra_collectif_id" UUID,
    "cra_demarche_administrative_id" UUID,

    CONSTRAINT "activites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activites_cra_individuel_id_key" ON "activites"("cra_individuel_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_cra_collectif_id_key" ON "activites"("cra_collectif_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_cra_demarche_administrative_id_key" ON "activites"("cra_demarche_administrative_id");

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_cra_individuel_id_fkey" FOREIGN KEY ("cra_individuel_id") REFERENCES "cras_individuels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_cra_collectif_id_fkey" FOREIGN KEY ("cra_collectif_id") REFERENCES "cras_collectifs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_cra_demarche_administrative_id_fkey" FOREIGN KEY ("cra_demarche_administrative_id") REFERENCES "cras_demarches_administratives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
