/*
  Warnings:

  - You are about to drop the column `hash` on the `structures_cartographie_nationale` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "structures_cartographie_nationale_hash_key";

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" DROP COLUMN "hash";
