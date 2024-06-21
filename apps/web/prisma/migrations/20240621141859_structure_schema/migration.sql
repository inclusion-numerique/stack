/*
  Warnings:

  - You are about to drop the column `thematiques` on the `structures` table. All the data in the column will be lost.
  - You are about to drop the column `typesAccompagnement` on the `structures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "structures" DROP COLUMN "thematiques",
DROP COLUMN "typesAccompagnement",
ADD COLUMN     "dispositif_programmes_nationaux" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "frais_a_charge" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "modalites_acces" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "modalites_accompagnement" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "prise_en_charge_specifique" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "publics_specifiquement_adresses" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "services" TEXT[] DEFAULT ARRAY[]::TEXT[];
