-- AlterTable
ALTER TABLE "structures" ADD COLUMN     "creation_import" TIMESTAMP(3),
ADD COLUMN     "modification_import" TIMESTAMP(3),
ADD COLUMN     "suppression_import" TIMESTAMP(3);
