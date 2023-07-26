-- DropForeignKey
ALTER TABLE "ifn_commune" DROP CONSTRAINT "ifn_commune_code_commune_fkey";

-- DropForeignKey
ALTER TABLE "ifn_epci" DROP CONSTRAINT "ifn_epci_code_epci_fkey";

-- AddForeignKey
ALTER TABLE "ifn_epci" ADD CONSTRAINT "ifn_epci_code_epci_fkey" FOREIGN KEY ("code_epci") REFERENCES "epcis"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ifn_commune" ADD CONSTRAINT "ifn_commune_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE CASCADE ON UPDATE CASCADE;
