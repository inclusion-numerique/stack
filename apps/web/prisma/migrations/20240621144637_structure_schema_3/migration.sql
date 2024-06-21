-- AlterTable
ALTER TABLE "structures" ADD COLUMN     "courriels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "telephone" TEXT;
