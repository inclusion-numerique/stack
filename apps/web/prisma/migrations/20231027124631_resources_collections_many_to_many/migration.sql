/*
  Warnings:

  - You are about to drop the column `collectionId` on the `resources` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_collectionId_fkey";

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "collectionId";

-- CreateTable
CREATE TABLE "collection_resources" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "resource_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_resources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_resources_legacy_id_key" ON "collection_resources"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "collection_resources_resource_id_collection_id_key" ON "collection_resources"("resource_id", "collection_id");

-- AddForeignKey
ALTER TABLE "collection_resources" ADD CONSTRAINT "collection_resources_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_resources" ADD CONSTRAINT "collection_resources_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
