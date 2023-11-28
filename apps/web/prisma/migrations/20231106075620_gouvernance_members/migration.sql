/*
  Warnings:

  - You are about to drop the `co_porteur_gouvernance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "co_porteur_gouvernance" DROP CONSTRAINT "co_porteur_gouvernance_departement_code_fkey";

-- DropForeignKey
ALTER TABLE "co_porteur_gouvernance" DROP CONSTRAINT "co_porteur_gouvernance_epci_code_fkey";

-- DropForeignKey
ALTER TABLE "co_porteur_gouvernance" DROP CONSTRAINT "co_porteur_gouvernance_formulaire_gouvernance_id_fkey";

-- DropForeignKey
ALTER TABLE "co_porteur_gouvernance" DROP CONSTRAINT "co_porteur_gouvernance_gouvernance_id_fkey";

-- DropForeignKey
ALTER TABLE "co_porteur_gouvernance" DROP CONSTRAINT "co_porteur_gouvernance_region_code_fkey";

-- DropForeignKey
ALTER TABLE "co_porteur_gouvernance" DROP CONSTRAINT "co_porteur_gouvernance_siret_fkey";

-- AlterTable
ALTER TABLE "membre_gouvernance" ADD COLUMN     "coporteur" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "co_porteur_gouvernance";
