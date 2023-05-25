-- AlterEnum
ALTER TYPE "ResourceEventType" ADD VALUE 'ImageEdited';

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "blur_url" TEXT,
ADD COLUMN     "original_heigth" INTEGER,
ADD COLUMN     "original_width" INTEGER;
