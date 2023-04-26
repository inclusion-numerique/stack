/*
  Warnings:

  - You are about to drop the column `linkedContentId` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_linkedContentId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "linkedContentId",
ADD COLUMN     "legacyLinkedResourceId" INTEGER;
