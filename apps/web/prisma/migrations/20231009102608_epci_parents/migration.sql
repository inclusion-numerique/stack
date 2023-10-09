-- AlterTable
ALTER TABLE "epcis" ADD COLUMN     "epci_parent_code" TEXT;

-- AddForeignKey
ALTER TABLE "epcis" ADD CONSTRAINT "epcis_epci_parent_code_fkey" FOREIGN KEY ("epci_parent_code") REFERENCES "epcis"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
