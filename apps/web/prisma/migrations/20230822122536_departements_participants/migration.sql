-- AlterTable
ALTER TABLE "commune_participante_formulaire_gouvernance" ADD COLUMN     "hors_territoire" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "contact_formulaire_gouvernance" ADD COLUMN     "departementParticipantFormulaireGouvernanceId" UUID;

-- AlterTable
ALTER TABLE "epci_participante_formulaire_gouvernance" ADD COLUMN     "hors_territoire" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "departement_participant_formulaire_gouvernance" (
    "id" UUID NOT NULL,
    "hors_territoire" BOOLEAN NOT NULL DEFAULT false,
    "formulaire_gouvernance_id" UUID NOT NULL,
    "departement_code" TEXT NOT NULL,
    "contact_id" UUID,

    CONSTRAINT "departement_participant_formulaire_gouvernance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departement_participant_formulaire_gouvernance_contact_id_key" ON "departement_participant_formulaire_gouvernance"("contact_id");

-- AddForeignKey
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_formulaire__fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_departement_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departement_participant_formulaire_gouvernance" ADD CONSTRAINT "departement_participant_formulaire_gouvernance_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact_formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
