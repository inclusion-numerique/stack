-- CreateIndex
CREATE INDEX "accompagnements_beneficiaire_id_idx" ON "accompagnements"("beneficiaire_id");

-- CreateIndex
CREATE INDEX "accompagnements_activite_id_idx" ON "accompagnements"("activite_id");

-- CreateIndex
CREATE INDEX "coordinateurs_user_id_idx" ON "coordinateurs"("user_id");

-- CreateIndex
CREATE INDEX "employes_structures_user_id_idx" ON "employes_structures"("user_id");

-- CreateIndex
CREATE INDEX "employes_structures_structure_id_idx" ON "employes_structures"("structure_id");

-- CreateIndex
CREATE INDEX "mutations_user_id_idx" ON "mutations"("user_id");

-- CreateIndex
CREATE INDEX "rdv_accounts_user_id_idx" ON "rdv_accounts"("user_id");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "structures_id_cartographie_nationale_idx" ON "structures"("id_cartographie_nationale");
