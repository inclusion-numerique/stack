-- DropForeignKey
ALTER TABLE "code_postaux" DROP CONSTRAINT "code_postaux_code_fkey";

-- DropForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" DROP CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey";

-- DropForeignKey
ALTER TABLE "communes" DROP CONSTRAINT "communes_code_departement_fkey";

-- DropForeignKey
ALTER TABLE "communes" DROP CONSTRAINT "communes_code_epci_fkey";

-- DropForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" DROP CONSTRAINT "conseillers_numeriques_en_permanence_conseiller_numerique__fkey";

-- DropForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" DROP CONSTRAINT "conseillers_numeriques_en_permanence_permanence_id_fkey";

-- DropForeignKey
ALTER TABLE "coordinateur_conseiller_numerique" DROP CONSTRAINT "coordinateur_conseiller_numerique_code_departement_fkey";

-- DropForeignKey
ALTER TABLE "cra_conseiller_numerique_par_departement" DROP CONSTRAINT "cra_conseiller_numerique_par_departement_code_repartement_fkey";

-- DropForeignKey
ALTER TABLE "departement_participant_formulaire_gouvernance" DROP CONSTRAINT "departement_participant_formulaire_gouvernance_departement_fkey";

-- DropForeignKey
ALTER TABLE "departements" DROP CONSTRAINT "departements_code_region_fkey";

-- DropForeignKey
ALTER TABLE "epci_participante_formulaire_gouvernance" DROP CONSTRAINT "epci_participante_formulaire_gouvernance_epci_code_fkey";

-- DropForeignKey
ALTER TABLE "formulaire_gouvernance" DROP CONSTRAINT "formulaire_gouvernance_commune_code_fkey";

-- DropForeignKey
ALTER TABLE "formulaire_gouvernance" DROP CONSTRAINT "formulaire_gouvernance_departement_code_fkey";

-- DropForeignKey
ALTER TABLE "formulaire_gouvernance" DROP CONSTRAINT "formulaire_gouvernance_epci_code_fkey";

-- DropForeignKey
ALTER TABLE "formulaire_gouvernance" DROP CONSTRAINT "formulaire_gouvernance_region_code_fkey";

-- DropForeignKey
ALTER TABLE "ifn_commune" DROP CONSTRAINT "ifn_commune_code_commune_fkey";

-- DropForeignKey
ALTER TABLE "ifn_epci" DROP CONSTRAINT "ifn_epci_code_epci_fkey";

-- DropForeignKey
ALTER TABLE "permanences_conseiller_numerique" DROP CONSTRAINT "permanences_conseiller_numerique_structure_cartographie_na_fkey";

-- DropForeignKey
ALTER TABLE "structures_aidants_connect" DROP CONSTRAINT "structures_aidants_connect_structure_cartographie_national_fkey";

-- DropForeignKey
ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_code_commune_fkey";

-- DropForeignKey
ALTER TABLE "structures_cartographie_nationale" DROP CONSTRAINT "structures_cartographie_nationale_code_repartement_fkey";

-- AddForeignKey
ALTER TABLE "departements" ADD CONSTRAINT "departements_code_region_fkey" FOREIGN KEY ("code_region") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_code_departement_fkey" FOREIGN KEY ("code_departement") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_code_epci_fkey" FOREIGN KEY ("code_epci") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "code_postaux" ADD CONSTRAINT "code_postaux_code_fkey" FOREIGN KEY ("code") REFERENCES "code_postal"("code") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_repartement_fkey" FOREIGN KEY ("code_repartement") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structures_aidants_connect" ADD CONSTRAINT "structures_aidants_connect_structure_cartographie_national_fkey" FOREIGN KEY ("structure_cartographie_nationale_id") REFERENCES "structures_cartographie_nationale"("id") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "permanences_conseiller_numerique" ADD CONSTRAINT "permanences_conseiller_numerique_structure_cartographie_na_fkey" FOREIGN KEY ("structure_cartographie_nationale_id") REFERENCES "structures_cartographie_nationale"("id") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" ADD CONSTRAINT "conseillers_numeriques_en_permanence_permanence_id_fkey" FOREIGN KEY ("permanence_id") REFERENCES "permanences_conseiller_numerique"("id") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" ADD CONSTRAINT "conseillers_numeriques_en_permanence_conseiller_numerique__fkey" FOREIGN KEY ("conseiller_numerique_id") REFERENCES "conseiller_numerique"("id") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "coordinateur_conseiller_numerique" ADD CONSTRAINT "coordinateur_conseiller_numerique_code_departement_fkey" FOREIGN KEY ("code_departement") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "cra_conseiller_numerique_par_departement" ADD CONSTRAINT "cra_conseiller_numerique_par_departement_code_repartement_fkey" FOREIGN KEY ("code_repartement") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "ifn_epci" ADD CONSTRAINT "ifn_epci_code_epci_fkey" FOREIGN KEY ("code_epci") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "ifn_commune" ADD CONSTRAINT "ifn_commune_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_region_code_fkey" FOREIGN KEY ("region_code") REFERENCES "regions"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_departement_code_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_departement_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "epci_participante_formulaire_gouvernance" ADD CONSTRAINT "epci_participante_formulaire_gouvernance_epci_code_fkey" FOREIGN KEY ("epci_code") REFERENCES "epcis"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE NO ACTION ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
