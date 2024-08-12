/*
  Warnings:

  - You are about to drop the `activites` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[beneficiaire_id,cra_collectif_id]` on the table `participants_ateliers_collectifs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "activites" DROP CONSTRAINT "activites_cra_collectif_id_fkey";

-- DropForeignKey
ALTER TABLE "activites" DROP CONSTRAINT "activites_cra_demarche_administrative_id_fkey";

-- DropForeignKey
ALTER TABLE "activites" DROP CONSTRAINT "activites_cra_individuel_id_fkey";

-- DropForeignKey
ALTER TABLE "activites" DROP CONSTRAINT "activites_mediateur_id_fkey";

-- DropTable
DROP TABLE "activites";

-- CreateTable
CREATE TABLE "activites_mediateurs" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "cra_individuel_id" UUID,
    "cra_collectif_id" UUID,
    "cra_demarche_administrative_id" UUID,

    CONSTRAINT "activites_mediateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activites_beneficiaires" (
    "id" UUID NOT NULL,
    "beneficiaire_id" UUID NOT NULL,
    "cra_individuel_id" UUID,
    "cra_collectif_id" UUID,
    "cra_demarche_administrative_id" UUID,

    CONSTRAINT "activites_beneficiaires_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activites_mediateurs_cra_individuel_id_key" ON "activites_mediateurs"("cra_individuel_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_mediateurs_cra_collectif_id_key" ON "activites_mediateurs"("cra_collectif_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_mediateurs_cra_demarche_administrative_id_key" ON "activites_mediateurs"("cra_demarche_administrative_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_beneficiaires_cra_individuel_id_key" ON "activites_beneficiaires"("cra_individuel_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_beneficiaires_cra_demarche_administrative_id_key" ON "activites_beneficiaires"("cra_demarche_administrative_id");

-- CreateIndex
CREATE UNIQUE INDEX "activites_beneficiaires_beneficiaire_id_cra_collectif_id_key" ON "activites_beneficiaires"("beneficiaire_id", "cra_collectif_id");

-- CreateIndex
CREATE UNIQUE INDEX "participants_ateliers_collectifs_beneficiaire_id_cra_collec_key" ON "participants_ateliers_collectifs"("beneficiaire_id", "cra_collectif_id");

-- AddForeignKey
ALTER TABLE "activites_mediateurs" ADD CONSTRAINT "activites_mediateurs_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_mediateurs" ADD CONSTRAINT "activites_mediateurs_cra_individuel_id_fkey" FOREIGN KEY ("cra_individuel_id") REFERENCES "cras_individuels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_mediateurs" ADD CONSTRAINT "activites_mediateurs_cra_collectif_id_fkey" FOREIGN KEY ("cra_collectif_id") REFERENCES "cras_collectifs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_mediateurs" ADD CONSTRAINT "activites_mediateurs_cra_demarche_administrative_id_fkey" FOREIGN KEY ("cra_demarche_administrative_id") REFERENCES "cras_demarches_administratives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_beneficiaires" ADD CONSTRAINT "activites_beneficiaires_beneficiaire_id_fkey" FOREIGN KEY ("beneficiaire_id") REFERENCES "beneficiaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_beneficiaires" ADD CONSTRAINT "activites_beneficiaires_cra_individuel_id_fkey" FOREIGN KEY ("cra_individuel_id") REFERENCES "cras_individuels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_beneficiaires" ADD CONSTRAINT "activites_beneficiaires_cra_collectif_id_fkey" FOREIGN KEY ("cra_collectif_id") REFERENCES "cras_collectifs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites_beneficiaires" ADD CONSTRAINT "activites_beneficiaires_cra_demarche_administrative_id_fkey" FOREIGN KEY ("cra_demarche_administrative_id") REFERENCES "cras_demarches_administratives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
