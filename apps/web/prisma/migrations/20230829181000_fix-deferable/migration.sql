-- REMOVE THEN RECREATE AS DEFERABLE

ALTER TABLE "commune_participante_formulaire_gouvernance" DROP CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey";
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD CONSTRAINT "commune_participante_formulaire_gouvernance_commune_code_fkey" FOREIGN KEY ("commune_code") REFERENCES "communes"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "departement_participant_formulaire_gouvernance" DROP CONSTRAINT "departement_participant_formulaire_gouvernance_formulaire__fkey";
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_formulaire__fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "departement_participant_formulaire_gouvernance" DROP CONSTRAINT "departement_participant_formulaire_gouvernance_departement_fkey";
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_departement_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "departement_participant_formulaire_gouvernance" DROP CONSTRAINT "departement_participant_formulaire_gouvernance_contact_id_fkey";
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

