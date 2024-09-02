-- AlterTable
ALTER TABLE "beneficiaires" ADD COLUMN     "anonyme" BOOLEAN NOT NULL DEFAULT false;

UPDATE "beneficiaires"
SET "anonyme" = TRUE
WHERE "prenom" IS NULL AND "nom" IS NULL;
