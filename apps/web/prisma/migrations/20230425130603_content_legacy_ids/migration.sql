/*
  Warnings:

  - You are about to drop the column `legacyId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `legacyResourceId` on the `Content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legacyContentId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legacySectionId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Content_legacyId_legacyResourceId_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "legacyId",
DROP COLUMN "legacyResourceId",
ADD COLUMN     "legacyContentId" INTEGER,
ADD COLUMN     "legacySectionId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Content_legacyContentId_key" ON "Content"("legacyContentId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_legacySectionId_key" ON "Content"("legacySectionId");
