/*
  Warnings:

  - The primary key for the `ifn_commune` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `errors` on the `ifn_commune` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ifn_commune` table. All the data in the column will be lost.
  - The primary key for the `ifn_epci` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `errors` on the `ifn_epci` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ifn_epci` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ifn_commune" DROP CONSTRAINT "ifn_commune_pkey",
DROP COLUMN "errors",
DROP COLUMN "id",
ADD CONSTRAINT "ifn_commune_pkey" PRIMARY KEY ("code_commune");

-- AlterTable
ALTER TABLE "ifn_epci" DROP CONSTRAINT "ifn_epci_pkey",
DROP COLUMN "errors",
DROP COLUMN "id",
ADD CONSTRAINT "ifn_epci_pkey" PRIMARY KEY ("code_epci");
