-- AlterTable
ALTER TABLE "coordinateurs" ADD COLUMN     "autres_conseillers_v1_coordonnes" TEXT[] DEFAULT ARRAY[]::TEXT[];
