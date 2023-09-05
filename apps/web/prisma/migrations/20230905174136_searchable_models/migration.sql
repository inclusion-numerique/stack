/*

*/

-- AlterTable

-- Create column, then set searchable from "nom", then set not null
ALTER TABLE "communes" ADD COLUMN     "searchable" TEXT;
UPDATE "communes" SET searchable = nom;
ALTER TABLE "communes" ALTER COLUMN "searchable" SET NOT NULL;

-- AlterTable
ALTER TABLE "departements" ADD COLUMN     "searchable" TEXT;
UPDATE "departements" SET searchable = nom;
ALTER TABLE "departements" ALTER COLUMN "searchable" SET NOT NULL;

-- AlterTable
ALTER TABLE "epcis" ADD COLUMN     "searchable" TEXT;
UPDATE "epcis" SET searchable = nom;
ALTER TABLE "epcis" ALTER COLUMN "searchable" SET NOT NULL;

-- AlterTable
ALTER TABLE "regions" ADD COLUMN     "searchable" TEXT;
UPDATE "regions" SET searchable = nom;
ALTER TABLE "regions" ALTER COLUMN "searchable" SET NOT NULL;

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN     "searchable" TEXT;
UPDATE "structures_cartographie_nationale" SET searchable = nom;
ALTER TABLE "structures_cartographie_nationale" ALTER COLUMN "searchable" SET NOT NULL;
