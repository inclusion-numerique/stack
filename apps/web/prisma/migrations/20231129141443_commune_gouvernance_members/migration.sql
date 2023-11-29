-- AlterTable
ALTER TABLE "membre_gouvernance" ADD COLUMN     "commune_code" TEXT;

-- AddForeignKey
ALTER TABLE "membre_gouvernance" ADD CONSTRAINT "membre_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
