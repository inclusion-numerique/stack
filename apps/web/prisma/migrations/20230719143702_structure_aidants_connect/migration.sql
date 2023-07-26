/*
  Warnings:

  - Added the required column `aidants` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `argent` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etranger` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `famille` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `justice` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logement` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loisirs` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `papier` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDemarches` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transport` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travail` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usagersUniques` to the `structures_aidants_connect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "structures_aidants_connect" ADD COLUMN     "aidants" INTEGER NOT NULL,
ADD COLUMN     "argent" INTEGER NOT NULL,
ADD COLUMN     "errors" JSONB,
ADD COLUMN     "etranger" INTEGER NOT NULL,
ADD COLUMN     "famille" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "justice" INTEGER NOT NULL,
ADD COLUMN     "logement" INTEGER NOT NULL,
ADD COLUMN     "loisirs" INTEGER NOT NULL,
ADD COLUMN     "papier" INTEGER NOT NULL,
ADD COLUMN     "social" INTEGER NOT NULL,
ADD COLUMN     "totalDemarches" INTEGER NOT NULL,
ADD COLUMN     "transport" INTEGER NOT NULL,
ADD COLUMN     "travail" INTEGER NOT NULL,
ADD COLUMN     "usagersUniques" INTEGER NOT NULL;
