-- DropForeignKey
ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_code_commune_fkey";

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN     "code_repartement" TEXT,
ADD COLUMN     "errors" JSONB,
ALTER COLUMN "code_commune" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_repartement_fkey" FOREIGN KEY ("code_repartement") REFERENCES "departements"("code") ON DELETE SET NULL ON UPDATE CASCADE;
