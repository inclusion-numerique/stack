/*
  Warnings:

  - A unique constraint covering the columns `[creation,id]` on the table `activites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created_at]` on the table `cras_conseiller_numerique_v1` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "activites_creation_id_idx" ON "activites"("creation" DESC, "id" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "activites_creation_id_key" ON "activites"("creation", "id");

-- CreateIndex
CREATE UNIQUE INDEX "cras_conseiller_numerique_v1_created_at_key" ON "cras_conseiller_numerique_v1"("created_at");

-- CreateIndex
CREATE INDEX "cras_conseiller_numerique_v1_created_at_idx" ON "cras_conseiller_numerique_v1"("created_at" DESC);
