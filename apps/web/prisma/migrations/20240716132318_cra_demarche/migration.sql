/*
  Warnings:

  - You are about to drop the column `materiel` on the `cras_demarches_administratives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cras_demarches_administratives" DROP COLUMN "materiel",
ADD COLUMN     "autonomie" "autonomie",
ADD COLUMN     "precisions_demarche" TEXT;
