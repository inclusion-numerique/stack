-- CreateTable
CREATE TABLE "invitations_equipes" (
    "email" TEXT NOT NULL,
    "coordinateur_id" UUID NOT NULL,
    "mediateur_id" UUID,
    "creation" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "acceptee" TIMESTAMP(3),
    "refusee" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "invitations_equipes_mediateur_id_key" ON "invitations_equipes"("mediateur_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_equipes_email_coordinateur_id_key" ON "invitations_equipes"("email", "coordinateur_id");

-- AddForeignKey
ALTER TABLE "invitations_equipes" ADD CONSTRAINT "invitations_equipes_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations_equipes" ADD CONSTRAINT "invitations_equipes_coordinateur_id_fkey" FOREIGN KEY ("coordinateur_id") REFERENCES "coordinateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
