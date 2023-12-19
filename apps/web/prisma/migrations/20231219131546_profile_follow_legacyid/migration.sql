/*
  Warnings:

  - A unique constraint covering the columns `[legacy_id]` on the table `ProfileFollow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProfileFollow" ADD COLUMN     "legacy_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ProfileFollow_legacy_id_key" ON "ProfileFollow"("legacy_id");
