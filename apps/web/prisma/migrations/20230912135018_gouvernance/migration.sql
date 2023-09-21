-- CreateEnum
CREATE TYPE "perimetre_gouvernance" AS ENUM ('epci', 'departement', 'region', 'autre');

-- CreateTable
CREATE TABLE "Gouvernance" (
    "id" UUID NOT NULL,
    "createur_id" UUID NOT NULL,
    "derniere_modification_par_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supression" TIMESTAMP(3),
    "departementCode" TEXT NOT NULL,
    "perimetre" "perimetre_gouvernance" NOT NULL,
    "noteDeContexte" TEXT NOT NULL,
    "porteur_region_code" TEXT,
    "porteur_departement_code" TEXT,
    "porteur_epci_code" TEXT,
    "porteur_siret" TEXT,

    CONSTRAINT "Gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganisationRecruteuseCoordinateurs" (
    "id" UUID NOT NULL,
    "gouvernance_id" UUID NOT NULL,
    "siret" TEXT NOT NULL,

    CONSTRAINT "OrganisationRecruteuseCoordinateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformationsSiret" (
    "siret" TEXT NOT NULL,

    CONSTRAINT "InformationsSiret_pkey" PRIMARY KEY ("siret")
);

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_derniere_modification_par_id_fkey" FOREIGN KEY ("derniere_modification_par_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_departementCode_fkey" FOREIGN KEY ("departementCode") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_porteur_region_code_fkey" FOREIGN KEY ("porteur_region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_porteur_departement_code_fkey" FOREIGN KEY ("porteur_departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_porteur_epci_code_fkey" FOREIGN KEY ("porteur_epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "Gouvernance" ADD CONSTRAINT "Gouvernance_porteur_siret_fkey" FOREIGN KEY ("porteur_siret") REFERENCES "InformationsSiret"("siret") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "OrganisationRecruteuseCoordinateurs" ADD CONSTRAINT "OrganisationRecruteuseCoordinateurs_gouvernance_id_fkey" FOREIGN KEY ("gouvernance_id") REFERENCES "Gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "OrganisationRecruteuseCoordinateurs" ADD CONSTRAINT "OrganisationRecruteuseCoordinateurs_siret_fkey" FOREIGN KEY ("siret") REFERENCES "InformationsSiret"("siret") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
