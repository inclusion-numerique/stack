/*
  Warnings:

  - The values [cras,archives_v1_cras] on the enum `api_client_scope` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "api_client_scope_new" AS ENUM ('statistiques', 'activites');
ALTER TABLE "api_clients" ALTER COLUMN "scopes" TYPE "api_client_scope_new"[] USING ("scopes"::text::"api_client_scope_new"[]);
ALTER TYPE "api_client_scope" RENAME TO "api_client_scope_old";
ALTER TYPE "api_client_scope_new" RENAME TO "api_client_scope";
DROP TYPE "api_client_scope_old";
COMMIT;
