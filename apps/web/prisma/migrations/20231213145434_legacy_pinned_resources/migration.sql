/*
  Warnings:

  - You are about to drop the column `is_legacy_pinned_resources` on the `collections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legacy_pinned_resources_id]` on the table `collection_resources` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legacy_pinned_resources_base_id]` on the table `collections` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "collection_resources" ADD COLUMN     "legacy_pinned_resources_id" INTEGER;

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "is_legacy_pinned_resources",
ADD COLUMN     "legacy_pinned_resources_base_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "collection_resources_legacy_pinned_resources_id_key" ON "collection_resources"("legacy_pinned_resources_id");

-- CreateIndex
CREATE UNIQUE INDEX "collections_legacy_pinned_resources_base_id_key" ON "collections"("legacy_pinned_resources_base_id");
