/*
  Warnings:

  - The values [mineur] on the enum `tranche_age` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
-- Step 1: Create the new enum type without 'mineur'
CREATE TYPE "tranche_age_new" AS ENUM (
    'moins_de_douze',
    'douze_dix_huit',
    'dix_huit_vingt_quatre',
    'vingt_cinq_trente_neuf',
    'quarante_cinquante_neuf',
    'soixante_soixante_neuf',
    'soixante_dix_plus',
    'non_communique'
    );

-- Step 2: Alter the table column to use the new enum type with a custom mapping
ALTER TABLE "beneficiaires"
    ALTER COLUMN "tranche_age"
        TYPE "tranche_age_new"
        USING (
        CASE
            WHEN "tranche_age" = 'mineur' THEN 'douze_dix_huit'
            ELSE "tranche_age"::text
            END
        )::"tranche_age_new";

-- Step 3: Rename the old enum type and the new enum type to finalize the change
ALTER TYPE "tranche_age" RENAME TO "tranche_age_old";
ALTER TYPE "tranche_age_new" RENAME TO "tranche_age";

-- Step 4: Drop the old enum type as it's no longer needed
DROP TYPE "tranche_age_old";

COMMIT;
