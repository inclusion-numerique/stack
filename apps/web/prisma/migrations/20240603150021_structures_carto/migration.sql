/*
  Warnings:

  - The values [mise_a_jour_data_inclusion_structures] on the enum `mutation_name` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lieu_activite_id` on the `mediateurs_en_activite` table. All the data in the column will be lost.
  - You are about to drop the column `antenne` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `code_insee` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `code_postal` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `commune` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `courriel` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `creation_import` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `date_maj` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `horaires_ouverture` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `id_data_inclusion` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `labels_autres` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `labels_nationaux` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `lien_source` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `modification_import` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `rna` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `siret` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `suppression_import` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the `lieux_activites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mediateurs_employes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organisations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_cartographie_nationale]` on the table `structures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `structure_id` to the `mediateurs_en_activite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "mutation_name_new" AS ENUM ('creer_mediateur', 'modifier_mediateur', 'supprimer_mediateur', 'creer_coordinateur', 'modifier_coordinateur', 'supprimer_coordinateur', 'creer_mediateur_coordonne', 'supprimer_mediateur_coordonne', 'creer_structure', 'modifier_structure', 'mise_a_jour_structures_cartographie_nationale');
ALTER TABLE "mutations" ALTER COLUMN "nom" TYPE "mutation_name_new" USING ("nom"::text::"mutation_name_new");
ALTER TYPE "mutation_name" RENAME TO "mutation_name_old";
ALTER TYPE "mutation_name_new" RENAME TO "mutation_name";
DROP TYPE "mutation_name_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "lieux_activites" DROP CONSTRAINT "lieux_activites_structure_id_fkey";

-- DropForeignKey
ALTER TABLE "mediateurs_employes" DROP CONSTRAINT "mediateurs_employes_mediateur_id_fkey";

-- DropForeignKey
ALTER TABLE "mediateurs_employes" DROP CONSTRAINT "mediateurs_employes_organisation_id_fkey";

-- DropForeignKey
ALTER TABLE "mediateurs_en_activite" DROP CONSTRAINT "mediateurs_en_activite_lieu_activite_id_fkey";

-- DropForeignKey
ALTER TABLE "organisations" DROP CONSTRAINT "organisations_structure_id_fkey";

-- DropIndex
DROP INDEX "structures_id_data_inclusion_key";

-- AlterTable
ALTER TABLE "mediateurs_en_activite" DROP COLUMN "lieu_activite_id",
ADD COLUMN     "structure_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "structures" DROP COLUMN "antenne",
DROP COLUMN "code_insee",
DROP COLUMN "code_postal",
DROP COLUMN "commune",
DROP COLUMN "courriel",
DROP COLUMN "creation_import",
DROP COLUMN "date_maj",
DROP COLUMN "horaires_ouverture",
DROP COLUMN "id_data_inclusion",
DROP COLUMN "labels_autres",
DROP COLUMN "labels_nationaux",
DROP COLUMN "latitude",
DROP COLUMN "lien_source",
DROP COLUMN "longitude",
DROP COLUMN "modification_import",
DROP COLUMN "rna",
DROP COLUMN "siret",
DROP COLUMN "source",
DROP COLUMN "suppression_import",
DROP COLUMN "telephone",
ADD COLUMN     "horaires" TEXT,
ADD COLUMN     "id_cartographie_nationale" TEXT,
ADD COLUMN     "siret_ou_rna" TEXT,
ADD COLUMN     "typesAccompagnement" TEXT[],
ADD COLUMN     "visible_pour_cartographie_nationale" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "lieux_activites";

-- DropTable
DROP TABLE "mediateurs_employes";

-- DropTable
DROP TABLE "organisations";

-- CreateTable
CREATE TABLE "structures_cartographie_nationale" (
    "id" TEXT NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),
    "creation_import" TIMESTAMP(3),
    "modification_import" TIMESTAMP(3),
    "suppression_import" TIMESTAMP(3),
    "pivot" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "code_postal" VARCHAR(5) NOT NULL,
    "code_insee" VARCHAR(5),
    "adresse" TEXT NOT NULL,
    "complement_adresse" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "typologie" TEXT,
    "telephone" VARCHAR(20),
    "courriels" TEXT,
    "site_web" TEXT,
    "horaires" TEXT,
    "presentation_resume" TEXT,
    "presentation_detail" TEXT,
    "source" TEXT,
    "itinerance" TEXT,
    "structure_parente" TEXT,
    "date_maj" DATE NOT NULL,
    "services" TEXT NOT NULL,
    "publics_specifiquement_adresses" TEXT,
    "prise_en_charge_specifique" TEXT,
    "frais_a_charge" TEXT,
    "dispositif_programmes_nationaux" TEXT,
    "formations_labels" TEXT,
    "autres_formations_labels" TEXT,
    "modalites_acces" TEXT,
    "modalites_accompagnement" TEXT,
    "fiche_acces_libre" TEXT,
    "prise_rdv" TEXT,

    CONSTRAINT "structures_cartographie_nationale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employes_structures" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "structure_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "employes_structures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "structures_id_cartographie_nationale_key" ON "structures"("id_cartographie_nationale");

-- AddForeignKey
ALTER TABLE "structures" ADD CONSTRAINT "structures_id_cartographie_nationale_fkey" FOREIGN KEY ("id_cartographie_nationale") REFERENCES "structures_cartographie_nationale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employes_structures" ADD CONSTRAINT "employes_structures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employes_structures" ADD CONSTRAINT "employes_structures_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_en_activite" ADD CONSTRAINT "mediateurs_en_activite_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
