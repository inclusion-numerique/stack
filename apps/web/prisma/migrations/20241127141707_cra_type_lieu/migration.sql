/*
  Warnings:

  - You are about to drop the column `type_lieu_atelier` on the `activites` table. All the data in the column will be lost.

*/
-- Assign all old "type_lieu_atelier" values to "type_lieu"

UPDATE "activites"
SET "type_lieu" = "type_lieu_atelier"::TEXT::type_lieu
WHERE "type_lieu_atelier" IS NOT NULL
  AND "type_lieu" IS NULL;

-- AlterTable
ALTER TABLE "activites"
    DROP COLUMN "type_lieu_atelier";

-- DropEnum
DROP TYPE "type_lieu_atelier";
