-- CreateEnum
CREATE TYPE "api_client_scope" AS ENUM ('statistiques', 'cras', 'archives_v1_cras');

-- CreateTable
CREATE TABLE "api_clients" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_until" TIMESTAMP(3),
    "scopes" "api_client_scope"[],
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_clients_name_key" ON "api_clients"("name");
