/*
  Warnings:

  - A unique constraint covering the columns `[legacyId,legacyResourceId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Content_legacyId_key";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "legacyResourceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Content_legacyId_legacyResourceId_key" ON "Content"("legacyId", "legacyResourceId");
