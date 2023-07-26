/*
  Warnings:

  - A unique constraint covering the columns `[code_repartement]` on the table `cra_conseiller_numerique_par_departement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN "code_postal" TEXT;
UPDATE structures_cartographie_nationale SET code_postal = '';
ALTER TABLE structures_cartographie_nationale ALTER COLUMN code_postal SET NOT NULL;

-- CreateTable
CREATE TABLE "coordinateur_conseiller_numerique" (
    "id" TEXT NOT NULL,
    "code_departement" TEXT NOT NULL,
    "conseillers_numeriques_coordonnees" INTEGER NOT NULL,
    "structures_coordonnees" INTEGER NOT NULL,

    CONSTRAINT "coordinateur_conseiller_numerique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cra_conseiller_numerique_par_departement_code_repartement_key" ON "cra_conseiller_numerique_par_departement"("code_repartement");

-- AddForeignKey
ALTER TABLE "coordinateur_conseiller_numerique" ADD CONSTRAINT "coordinateur_conseiller_numerique_code_departement_fkey" FOREIGN KEY ("code_departement") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- Add deferable to constraints

ALTER TABLE "cra_conseiller_numerique_par_departement" DROP CONSTRAINT "cra_conseiller_numerique_par_departement_code_repartement_fkey";
ALTER TABLE "cra_conseiller_numerique_par_departement" ADD CONSTRAINT "cra_conseiller_numerique_par_departement_code_repartement_fkey" FOREIGN KEY ("code_repartement") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;


ALTER TABLE "ifn_epci" DROP CONSTRAINT "ifn_epci_code_epci_fkey";
ALTER TABLE "ifn_epci" ADD CONSTRAINT "ifn_epci_code_epci_fkey" FOREIGN KEY ("code_epci") REFERENCES "epcis"("code") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "ifn_commune" DROP CONSTRAINT "ifn_commune_code_commune_fkey";
ALTER TABLE "ifn_commune" ADD CONSTRAINT "ifn_commune_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;


ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_code_commune_fkey";
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_code_repartement_fkey";
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_repartement_fkey" FOREIGN KEY ("code_repartement") REFERENCES "departements"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
