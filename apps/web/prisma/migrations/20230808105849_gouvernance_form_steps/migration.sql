-- AlterTable
ALTER TABLE "formulaire_gouvernance" ADD COLUMN     "confirme_et_envoye" TIMESTAMP(3),
ADD COLUMN     "etape_contacts" TIMESTAMP(3),
ADD COLUMN     "etape_informations_participant" TIMESTAMP(3),
ADD COLUMN     "etape_perimetre" TIMESTAMP(3),
ADD COLUMN     "etape_structures" TIMESTAMP(3);
