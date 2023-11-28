-- Rename Columns
ALTER TABLE "gouvernances" RENAME COLUMN "perimetre" TO "v1_perimetre";
ALTER TABLE "gouvernances" RENAME COLUMN "porteur_departement_code" TO "v1_porteur_departement_code";
ALTER TABLE "gouvernances" RENAME COLUMN "porteur_epci_code" TO "v1_porteur_epci_code";
ALTER TABLE "gouvernances" RENAME COLUMN "porteur_region_code" TO "v1_porteur_region_code";
ALTER TABLE "gouvernances" RENAME COLUMN "porteur_siret" TO "v1_porteur_siret";

-- Add new column v2_enregistree
ALTER TABLE "gouvernances" ADD COLUMN "v2_enregistree" TIMESTAMP(3);

-- Rename ForeignKey Constraints
ALTER TABLE "gouvernances" DROP CONSTRAINT "gouvernances_porteur_departement_code_fkey";
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_v1_porteur_departement_code_fkey" FOREIGN KEY ("v1_porteur_departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "gouvernances" DROP CONSTRAINT "gouvernances_porteur_epci_code_fkey";
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_v1_porteur_epci_code_fkey" FOREIGN KEY ("v1_porteur_epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "gouvernances" DROP CONSTRAINT "gouvernances_porteur_region_code_fkey";
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_v1_porteur_region_code_fkey" FOREIGN KEY ("v1_porteur_region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "gouvernances" DROP CONSTRAINT "gouvernances_porteur_siret_fkey";
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_v1_porteur_siret_fkey" FOREIGN KEY ("v1_porteur_siret") REFERENCES "informations_siret"("siret") ON DELETE NO ACTION ON UPDATE CASCADE;
