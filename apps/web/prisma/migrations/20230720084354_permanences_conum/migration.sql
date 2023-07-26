-- AlterTable
ALTER TABLE "permanences_conseiller_numerique" ADD COLUMN     "errors" JSONB;

-- CreateTable
CREATE TABLE "conseillers_numeriques_en_permanence" (
    "permanence_id" TEXT NOT NULL,
    "conseiller_numerique_id" TEXT NOT NULL,
    "permanenceConseillerNumeriqueId" TEXT NOT NULL,

    CONSTRAINT "conseillers_numeriques_en_permanence_pkey" PRIMARY KEY ("permanence_id","conseiller_numerique_id")
);

-- CreateTable
CREATE TABLE "conseiller_numerique" (
    "id" TEXT NOT NULL,
    "structure_cartographie_nationale_id" TEXT,

    CONSTRAINT "conseiller_numerique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conseiller_numerique_structure_cartographie_nationale_id_key" ON "conseiller_numerique"("structure_cartographie_nationale_id");

-- CreateIndex
CREATE INDEX "conseiller_numerique_structure_cartographie_nationale_id_idx" ON "conseiller_numerique"("structure_cartographie_nationale_id");

-- AddForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" ADD CONSTRAINT "conseillers_numeriques_en_permanence_permanenceConseillerN_fkey" FOREIGN KEY ("permanenceConseillerNumeriqueId") REFERENCES "permanences_conseiller_numerique"("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "conseillers_numeriques_en_permanence" ADD CONSTRAINT "conseillers_numeriques_en_permanence_conseiller_numerique__fkey" FOREIGN KEY ("conseiller_numerique_id") REFERENCES "conseiller_numerique"("id") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "conseiller_numerique" ADD CONSTRAINT "conseiller_numerique_structure_cartographie_nationale_id_fkey" FOREIGN KEY ("structure_cartographie_nationale_id") REFERENCES "structures_cartographie_nationale"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
