/*
  Warnings:

  - You are about to drop the column `perimetre_epci_code` on the `feuille_de_route` table. All the data in the column will be lost.
  - You are about to drop the column `porteur_departement_code` on the `feuille_de_route` table. All the data in the column will be lost.
  - You are about to drop the column `porteur_nom_structure` on the `feuille_de_route` table. All the data in the column will be lost.
  - You are about to drop the column `porteur_region_code` on the `feuille_de_route` table. All the data in the column will be lost.
  - You are about to drop the column `porteur_siret` on the `feuille_de_route` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[feuille_de_route_id,epci_code]` on the table `perimetre_epci_feuille_de_route` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formulaire_gouvernance_id` to the `membre_gouvernance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role_membre_feuille_de_route" AS ENUM ('porteur');

-- DropForeignKey
ALTER TABLE "feuille_de_route" DROP CONSTRAINT "feuille_de_route_perimetre_epci_code_fkey";

-- DropForeignKey
ALTER TABLE "feuille_de_route" DROP CONSTRAINT "feuille_de_route_porteur_departement_code_fkey";

-- DropForeignKey
ALTER TABLE "feuille_de_route" DROP CONSTRAINT "feuille_de_route_porteur_region_code_fkey";

-- DropForeignKey
ALTER TABLE "feuille_de_route" DROP CONSTRAINT "feuille_de_route_porteur_siret_fkey";

-- AlterTable
ALTER TABLE "feuille_de_route" DROP COLUMN "perimetre_epci_code",
DROP COLUMN "porteur_departement_code",
DROP COLUMN "porteur_nom_structure",
DROP COLUMN "porteur_region_code",
DROP COLUMN "porteur_siret";

-- AlterTable
ALTER TABLE "gouvernances" ADD COLUMN     "pas_de_co_porteurs" BOOLEAN,
ADD COLUMN     "sous_prefet_referent_email" TEXT,
ADD COLUMN     "sous_prefet_referent_nom" TEXT,
ADD COLUMN     "sous_prefet_referent_prenom" TEXT;

-- AlterTable
ALTER TABLE "membre_gouvernance" ADD COLUMN     "formulaire_gouvernance_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "co_porteur_gouvernance" (
    "id" UUID NOT NULL,
    "gouvernance_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "region_code" TEXT,
    "departement_code" TEXT,
    "epci_code" TEXT,
    "nom_structure" TEXT,
    "siret" TEXT,
    "formulaire_gouvernance_id" UUID NOT NULL,

    CONSTRAINT "co_porteur_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membre_feuille_de_route" (
    "id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feuille_de_route_id" UUID NOT NULL,
    "membre_id" UUID NOT NULL,
    "role" "role_membre_feuille_de_route" NOT NULL,

    CONSTRAINT "membre_feuille_de_route_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "membre_feuille_de_route_feuille_de_route_id_membre_id_key" ON "membre_feuille_de_route"("feuille_de_route_id", "membre_id");

-- CreateIndex
CREATE UNIQUE INDEX "perimetre_epci_feuille_de_route_feuille_de_route_id_epci_co_key" ON "perimetre_epci_feuille_de_route"("feuille_de_route_id", "epci_code");

-- AddForeignKey
ALTER TABLE "co_porteur_gouvernance" ADD CONSTRAINT "co_porteur_gouvernance_gouvernance_id_fkey" FOREIGN KEY ("gouvernance_id") REFERENCES "gouvernances"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "co_porteur_gouvernance" ADD CONSTRAINT "co_porteur_gouvernance_region_code_fkey" FOREIGN KEY ("region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "co_porteur_gouvernance" ADD CONSTRAINT "co_porteur_gouvernance_departement_code_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "co_porteur_gouvernance" ADD CONSTRAINT "co_porteur_gouvernance_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "co_porteur_gouvernance" ADD CONSTRAINT "co_porteur_gouvernance_siret_fkey" FOREIGN KEY ("siret") REFERENCES "informations_siret"("siret") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "co_porteur_gouvernance" ADD CONSTRAINT "co_porteur_gouvernance_formulaire_gouvernance_id_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_feuille_de_route" ADD CONSTRAINT "membre_feuille_de_route_feuille_de_route_id_fkey" FOREIGN KEY ("feuille_de_route_id") REFERENCES "feuille_de_route"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_feuille_de_route" ADD CONSTRAINT "membre_feuille_de_route_membre_id_fkey" FOREIGN KEY ("membre_id") REFERENCES "membre_gouvernance"("id") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_formulaire_gouvernance_id_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
