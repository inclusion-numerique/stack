-- CreateTable
CREATE TABLE "invitations_equipes" (
    "email" TEXT NOT NULL,
    "coordinateurId" UUID NOT NULL,
    "mediateurId" UUID,
    "creation" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "acceptee" TIMESTAMP(3),
    "refusee" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "invitations_equipes_email_coordinateurId_key" ON "invitations_equipes"("email", "coordinateurId");

-- AddForeignKey
ALTER TABLE "invitations_equipes" ADD CONSTRAINT "invitations_equipes_mediateurId_fkey" FOREIGN KEY ("mediateurId") REFERENCES "mediateurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations_equipes" ADD CONSTRAINT "invitations_equipes_coordinateurId_fkey" FOREIGN KEY ("coordinateurId") REFERENCES "coordinateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
