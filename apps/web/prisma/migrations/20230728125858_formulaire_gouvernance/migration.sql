/*
  Warnings:

  - The `gouvernance_signup_email_sent` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "formulaire_gouvernance_id" UUID,
DROP COLUMN "gouvernance_signup_email_sent",
ADD COLUMN     "gouvernance_signup_email_sent" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "formulaire_gouvernance" (
    "id" UUID NOT NULL,
    "gouvernance_persona" TEXT NOT NULL,
    "createur_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "formulaire_gouvernance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_formulaire_gouvernance_id_fkey" FOREIGN KEY ("formulaire_gouvernance_id") REFERENCES "formulaire_gouvernance"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "formulaire_gouvernance" ADD CONSTRAINT "formulaire_gouvernance_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
