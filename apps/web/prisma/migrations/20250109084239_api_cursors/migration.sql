/*
  Warnings:

  - A unique constraint covering the columns `[creation,id]` on the table `structures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created,id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "api_client_scope" ADD VALUE 'structures';
ALTER TYPE "api_client_scope" ADD VALUE 'utilisateurs';

-- CreateIndex
CREATE INDEX "structures_creation_id_idx" ON "structures"("creation" DESC, "id" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "structures_creation_id_key" ON "structures"("creation", "id");

-- CreateIndex
CREATE INDEX "users_created_id_idx" ON "users"("created" DESC, "id" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "users_created_id_key" ON "users"("created", "id");
