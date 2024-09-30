-- AlterTable
ALTER TABLE "structures" ADD COLUMN     "autres_formations_labels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "formations_labels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "structure_parente" TEXT;
