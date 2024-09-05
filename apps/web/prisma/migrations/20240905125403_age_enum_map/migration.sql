/*
  Warnings:

  - The values [mineur,18-24,25-39,40-59,60-69,70+] on the enum `tranche_age` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "tranche_age_new" AS ENUM ('dix_huit_vingt_quatre', 'vingt_cinq_trente_neuf', 'quarante_cinquante_neuf', 'soixante_soixante_neuf', 'soixante_dix_plus', 'non_communique');
ALTER TABLE "beneficiaires" ALTER COLUMN "tranche_age" TYPE "tranche_age_new" USING ("tranche_age"::text::"tranche_age_new");
ALTER TYPE "tranche_age" RENAME TO "tranche_age_old";
ALTER TYPE "tranche_age_new" RENAME TO "tranche_age";
DROP TYPE "tranche_age_old";
COMMIT;
