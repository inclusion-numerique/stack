/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `structures_cartographie_nationale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `structures_cartographie_nationale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ADD COLUMN "hash" TEXT;

UPDATE "structures_cartographie_nationale" SET "hash" = "id";

/* Add not null constraint to hash */
ALTER TABLE "structures_cartographie_nationale" ALTER COLUMN "hash" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "structures_cartographie_nationale_hash_key" ON "structures_cartographie_nationale"("hash");
