-- AlterTable
ALTER TABLE "beneficiaires" ADD COLUMN     "already_assisted" BOOLEAN;

UPDATE "beneficiaires" SET "already_assisted"  = false WHERE "anonyme" = true;
