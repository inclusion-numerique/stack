-- AlterEnum
ALTER TYPE "ContentType" ADD VALUE 'ResourceLink';

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "linkedContentId" UUID,
ADD COLUMN     "linkedResourceId" UUID;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_linkedResourceId_fkey" FOREIGN KEY ("linkedResourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_linkedContentId_fkey" FOREIGN KEY ("linkedContentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
