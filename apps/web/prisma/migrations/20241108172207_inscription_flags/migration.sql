/*
  Warnings:

  - You are about to drop the column `check_conseiller_numerique_inscription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `check_coordinateur_inscription` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_pg]` on the table `conseillers_numeriques` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[conseiller_numerique_id_pg]` on the table `coordinateurs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "conseillers_numeriques" ADD COLUMN     "id_pg" INTEGER;

-- AlterTable
ALTER TABLE "coordinateurs" ADD COLUMN     "conseiller_numerique_id_pg" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "check_conseiller_numerique_inscription",
DROP COLUMN "check_coordinateur_inscription",
ADD COLUMN     "checked_profil_inscription" "profil_inscription",
ADD COLUMN     "donnees_conseiller_numerique_v1_importees" TIMESTAMP(3),
ADD COLUMN     "donnees_coordinateur_conseiller_numerique_v1_importees" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "conseillers_numeriques_id_pg_key" ON "conseillers_numeriques"("id_pg");

-- CreateIndex
CREATE UNIQUE INDEX "coordinateurs_conseiller_numerique_id_pg_key" ON "coordinateurs"("conseiller_numerique_id_pg");
