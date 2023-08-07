/*
  Warnings:

  - A unique constraint covering the columns `[contact_structure_id]` on the table `formulaire_gouvernance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_politique_id]` on the table `formulaire_gouvernance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_technique_id]` on the table `formulaire_gouvernance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "intention_formulaire_gouvernance" AS ENUM ('porter', 'participer');

-- AlterTable
ALTER TABLE "formulaire_gouvernance" ADD COLUMN     "commune_code" TEXT,
ADD COLUMN     "contact_politique_id" UUID,
ADD COLUMN     "contact_structure_id" UUID,
ADD COLUMN     "contact_technique_id" UUID,
ADD COLUMN     "departement_code" TEXT,
ADD COLUMN     "epci_code" TEXT,
ADD COLUMN     "intention" "intention_formulaire_gouvernance",
ADD COLUMN     "nom_structure" TEXT,
ADD COLUMN     "region_code" TEXT,
ADD COLUMN     "schema_ou_gouvernance_locale" TEXT,
ADD COLUMN     "siret_structure" TEXT;

-- CreateTable
CREATE TABLE "contact_formulaire_gouvernance" (
    "id" UUID NOT NULL,
    "formulaire_gouvernance_id" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "fonction" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "contact_formulaire_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "epci_participante_formulaire_gouvernance" (
    "id" UUID NOT NULL,
    "formulaire_gouvernance_id" UUID NOT NULL,
    "epci_code" TEXT NOT NULL,
    "contact_id" UUID,

    CONSTRAINT "epci_participante_formulaire_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commune_participante_formulaire_gouvernance" (
    "id" UUID NOT NULL,
    "formulaire_gouvernance_id" UUID NOT NULL,
    "commune_code" TEXT,
    "contact_id" UUID,

    CONSTRAINT "commune_participante_formulaire_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structure_participante_formulaire_gouvernance" (
    "id" UUID NOT NULL,
    "formulaire_gouvernance_id" UUID NOT NULL,
    "nom_structure" TEXT NOT NULL,
    "contact_id" UUID,

    CONSTRAINT "structure_participante_formulaire_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "epci_participante_formulaire_gouvernance_contact_id_key" ON "epci_participante_formulaire_gouvernance"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "commune_participante_formulaire_gouvernance_contact_id_key" ON "commune_participante_formulaire_gouvernance"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "structure_participante_formulaire_gouvernance_contact_id_key" ON "structure_participante_formulaire_gouvernance"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "formulaire_gouvernance_contact_structure_id_key" ON "formulaire_gouvernance"("contact_structure_id");

-- CreateIndex
CREATE UNIQUE INDEX "formulaire_gouvernance_contact_politique_id_key" ON "formulaire_gouvernance"("contact_politique_id");

-- CreateIndex
CREATE UNIQUE INDEX "formulaire_gouvernance_contact_technique_id_key" ON "formulaire_gouvernance"("contact_technique_id");

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_region_code_fkey" FOREIGN KEY ("region_code") REFERENCES "regions"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_departement_code_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_contact_structure_id_fkey" FOREIGN KEY ("contact_structure_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_contact_politique_id_fkey" FOREIGN KEY ("contact_politique_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_contact_technique_id_fkey" FOREIGN KEY ("contact_technique_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "contact_formulaire_gouvernance" ADD CONSTRAINT "contact_formulaire_gouvernance_formulaire_gouvernance_id_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "epci_participante_formulaire_gouvernance" ADD CONSTRAINT "epci_participante_formulaire_gouvernance_formulaire_gouver_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "epci_participante_formulaire_gouvernance" ADD CONSTRAINT "epci_participante_formulaire_gouvernance_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "epci_participante_formulaire_gouvernance" ADD CONSTRAINT "epci_participante_formulaire_gouvernance_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD CONSTRAINT "commune_participante_formulaire_gouvernance_formulaire_gou_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD CONSTRAINT "commune_participante_formulaire_gouvernance_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structure_participante_formulaire_gouvernance" ADD CONSTRAINT "structure_participante_formulaire_gouvernance_formulaire_g_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structure_participante_formulaire_gouvernance" ADD CONSTRAINT "structure_participante_formulaire_gouvernance_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
