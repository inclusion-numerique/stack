-- CreateEnum
CREATE TYPE "type_contrat" AS ENUM ('crte', 'sdaasap', 'sdin', 'sdun', 'autre');

-- CreateEnum
CREATE TYPE "type_comite" AS ENUM ('strategique', 'technique', 'consultatif', 'autre');

-- CreateEnum
CREATE TYPE "frequence_comite" AS ENUM ('mensuelle', 'trimestrielle', 'semestrielle', 'annuelle', 'autre');

-- AlterTable
ALTER TABLE "gouvernances" ADD COLUMN     "besoin_accompagnement_juridique" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_accompagnement_juridique_precisions" TEXT,
ADD COLUMN     "besoin_appui_demande_subventions_complexes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_appui_demande_subventions_complexes_precisions" TEXT,
ADD COLUMN     "besoin_appui_montage_fonds_financement_local" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_appui_montage_fonds_financement_local_precisions" TEXT,
ADD COLUMN     "besoin_appui_qualiopisation_structures_privees" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_appui_qualiopisation_structures_privees_precisions" TEXT,
ADD COLUMN     "besoin_formation_agents_publics" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_formation_agents_publics_precisions" TEXT,
ADD COLUMN     "besoin_formation_salaries_associatifs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_formation_salaries_associatifs_precisions" TEXT,
ADD COLUMN     "besoin_montage_et_prise_de_participation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_montage_et_prise_de_participation_precisions" TEXT,
ADD COLUMN     "besoin_outillage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_outillage_precisions" TEXT,
ADD COLUMN     "besoin_rh" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_rh_precisions" TEXT,
ADD COLUMN     "besoin_strategie_fne_locale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "besoin_strategie_fne_locale_precisions" TEXT;

-- AlterTable
ALTER TABLE "informations_siret" ADD COLUMN     "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nom" TEXT;

-- AlterTable
ALTER TABLE "organisations_recruteuses_coordinateurs" ADD COLUMN     "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "feuille_de_route" (
    "id" UUID NOT NULL,
    "gouvernance_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "contrat_preexistant" BOOLEAN NOT NULL DEFAULT false,
    "type_contrat" "type_contrat",
    "type_contrat_autre_description" TEXT,
    "porteur_region_code" TEXT,
    "porteur_departement_code" TEXT,
    "perimetre_epci_code" TEXT,
    "porteur_nom_structure" TEXT,
    "porteur_siret" TEXT,
    "perimetre_region_code" TEXT,
    "perimetre_departement_code" TEXT,

    CONSTRAINT "feuille_de_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perimetre_epci_feuille_de_route" (
    "id" UUID NOT NULL,
    "feuille_de_route_id" UUID NOT NULL,
    "epci_code" TEXT NOT NULL,

    CONSTRAINT "perimetre_epci_feuille_de_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membre_gouvernance" (
    "id" UUID NOT NULL,
    "gouvernance_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "region_code" TEXT,
    "departement_code" TEXT,
    "epci_code" TEXT,
    "nom_structure" TEXT,
    "siret" TEXT,

    CONSTRAINT "membre_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comite_gouvernance" (
    "id" UUID NOT NULL,
    "gouvernance_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "type_comite" NOT NULL,
    "type_autre_precisions" TEXT,
    "frequence" "frequence_comite" NOT NULL,
    "commentaire" TEXT,

    CONSTRAINT "comite_gouvernance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_gouvernance_id_fkey" FOREIGN KEY ("gouvernance_id") REFERENCES "gouvernances"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_porteur_region_code_fkey" FOREIGN KEY ("porteur_region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_porteur_departement_code_fkey" FOREIGN KEY ("porteur_departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_perimetre_epci_code_fkey" FOREIGN KEY ("perimetre_epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_porteur_siret_fkey" FOREIGN KEY ("porteur_siret") REFERENCES "informations_siret"("siret") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_perimetre_region_code_fkey" FOREIGN KEY ("perimetre_region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "feuille_de_route" ADD CONSTRAINT "feuille_de_route_perimetre_departement_code_fkey" FOREIGN KEY ("perimetre_departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "perimetre_epci_feuille_de_route" ADD CONSTRAINT "perimetre_epci_feuille_de_route_feuille_de_route_id_fkey" FOREIGN KEY ("feuille_de_route_id") REFERENCES "feuille_de_route"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "perimetre_epci_feuille_de_route" ADD CONSTRAINT "perimetre_epci_feuille_de_route_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_gouvernance_id_fkey" FOREIGN KEY ("gouvernance_id") REFERENCES "gouvernances"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_region_code_fkey" FOREIGN KEY ("region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_departement_code_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_siret_fkey" FOREIGN KEY ("siret") REFERENCES "informations_siret"("siret") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "comite_gouvernance" ADD CONSTRAINT "comite_gouvernance_gouvernance_id_fkey" FOREIGN KEY ("gouvernance_id") REFERENCES "gouvernances"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
