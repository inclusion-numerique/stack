/*
  Warnings:

  - A unique constraint covering the columns `[conseiller_numerique_id]` on the table `coordinateurs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siret]` on the table `structures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rna]` on the table `structures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conseiller_numerique_id` to the `coordinateurs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresse` to the `structures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `antenne` to the `structures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_postal` to the `structures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commune` to the `structures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_maj` to the `structures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `structures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coordinateurs" ADD COLUMN     "conseiller_numerique_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "structures" ADD COLUMN     "accessibilite" TEXT,
ADD COLUMN     "adresse" TEXT NOT NULL,
ADD COLUMN     "antenne" BOOLEAN NOT NULL,
ADD COLUMN     "code_insee" VARCHAR(5),
ADD COLUMN     "code_postal" VARCHAR(5) NOT NULL,
ADD COLUMN     "commune" TEXT NOT NULL,
ADD COLUMN     "complement_adresse" TEXT,
ADD COLUMN     "courriel" TEXT,
ADD COLUMN     "date_maj" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horaires_ouverture" TEXT,
ADD COLUMN     "labels_autres" TEXT[],
ADD COLUMN     "labels_nationaux" TEXT[],
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "lien_source" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "presentation_detail" TEXT,
ADD COLUMN     "presentation_resume" TEXT,
ADD COLUMN     "rna" VARCHAR(10),
ADD COLUMN     "siret" VARCHAR(14),
ADD COLUMN     "site_web" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "thematiques" TEXT[],
ADD COLUMN     "typologie" TEXT;

-- CreateTable
CREATE TABLE "mediateurs_en_activite" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "lieu_activite_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "mediateurs_en_activite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coordinateurs_conseiller_numerique_id_key" ON "coordinateurs"("conseiller_numerique_id");

-- CreateIndex
CREATE UNIQUE INDEX "structures_siret_key" ON "structures"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "structures_rna_key" ON "structures"("rna");

-- AddForeignKey
ALTER TABLE "mediateurs_en_activite" ADD CONSTRAINT "mediateurs_en_activite_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_en_activite" ADD CONSTRAINT "mediateurs_en_activite_lieu_activite_id_fkey" FOREIGN KEY ("lieu_activite_id") REFERENCES "lieux_activites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
