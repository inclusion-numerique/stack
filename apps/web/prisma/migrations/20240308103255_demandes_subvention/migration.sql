-- CreateEnum
CREATE TYPE "besoin_subvention" AS ENUM ('faire_un_diagnostic_territorial');

-- CreateTable
CREATE TABLE "demande_de_subvention" (
    "id" UUID NOT NULL,
    "besoins" "besoin_subvention"[],
    "createur_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL,
    "validee_et_envoyee" TIMESTAMP(3),
    "demande_de_modification" TIMESTAMP(3),
    "rejetee" TIMESTAMP(3),
    "acceptee" TIMESTAMP(3),
    "feuille_de_route_id" UUID NOT NULL,
    "nom_action" TEXT NOT NULL,
    "contexte" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget_global" DECIMAL(10,2) NOT NULL,
    "piece_jointe_budget_key" TEXT,
    "subvention_demandee" DECIMAL(10,2) NOT NULL,
    "subvention_etp" DECIMAL(10,2),
    "subvention_prestation" DECIMAL(10,2),

    CONSTRAINT "demande_de_subvention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiaire_subvention" (
    "id" UUID NOT NULL,
    "demande_de_subvention_id" UUID NOT NULL,
    "membre_gouvernance_id" UUID NOT NULL,
    "subvention" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "beneficiaire_subvention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "demande_de_subvention_piece_jointe_budget_key_key" ON "demande_de_subvention"("piece_jointe_budget_key");

-- AddForeignKey
ALTER TABLE "demande_de_subvention" ADD CONSTRAINT "demande_de_subvention_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demande_de_subvention" ADD CONSTRAINT "demande_de_subvention_feuille_de_route_id_fkey" FOREIGN KEY ("feuille_de_route_id") REFERENCES "feuille_de_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demande_de_subvention" ADD CONSTRAINT "demande_de_subvention_piece_jointe_budget_key_fkey" FOREIGN KEY ("piece_jointe_budget_key") REFERENCES "uploads"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaire_subvention" ADD CONSTRAINT "beneficiaire_subvention_demande_de_subvention_id_fkey" FOREIGN KEY ("demande_de_subvention_id") REFERENCES "demande_de_subvention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaire_subvention" ADD CONSTRAINT "beneficiaire_subvention_membre_gouvernance_id_fkey" FOREIGN KEY ("membre_gouvernance_id") REFERENCES "membre_gouvernance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
