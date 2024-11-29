-- CreateIndex
CREATE INDEX "activites_structure_id_idx" ON "activites"("structure_id");

-- CreateIndex
CREATE INDEX "activites_mediateur_id_idx" ON "activites"("mediateur_id");

-- CreateIndex
CREATE INDEX "beneficiaires_mediateur_id_idx" ON "beneficiaires"("mediateur_id");

-- CreateIndex
CREATE INDEX "mediateurs_coordonnes_mediateur_id_idx" ON "mediateurs_coordonnes"("mediateur_id");

-- CreateIndex
CREATE INDEX "mediateurs_coordonnes_coordinateur_id_idx" ON "mediateurs_coordonnes"("coordinateur_id");

-- CreateIndex
CREATE INDEX "mediateurs_en_activite_mediateur_id_idx" ON "mediateurs_en_activite"("mediateur_id");

-- CreateIndex
CREATE INDEX "mediateurs_en_activite_structure_id_idx" ON "mediateurs_en_activite"("structure_id");
