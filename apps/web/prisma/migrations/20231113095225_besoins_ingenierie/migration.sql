/*
  Warnings:

  - You are about to drop the column `besoin_accompagnement_juridique` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_accompagnement_juridique_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_appui_demande_subventions_complexes` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_appui_demande_subventions_complexes_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_appui_montage_fonds_financement_local` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_appui_montage_fonds_financement_local_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_appui_qualiopisation_structures_privees` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_appui_qualiopisation_structures_privees_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_formation_agents_publics` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_formation_agents_publics_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_formation_salaries_associatifs` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_formation_salaries_associatifs_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_montage_et_prise_de_participation` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_montage_et_prise_de_participation_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_outillage` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_outillage_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_rh` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_rh_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_strategie_fne_locale` on the `gouvernances` table. All the data in the column will be lost.
  - You are about to drop the column `besoin_strategie_fne_locale_precisions` on the `gouvernances` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[besoins_en_ingenierie_financiere_id]` on the table `gouvernances` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "gouvernances" DROP COLUMN "besoin_accompagnement_juridique",
DROP COLUMN "besoin_accompagnement_juridique_precisions",
DROP COLUMN "besoin_appui_demande_subventions_complexes",
DROP COLUMN "besoin_appui_demande_subventions_complexes_precisions",
DROP COLUMN "besoin_appui_montage_fonds_financement_local",
DROP COLUMN "besoin_appui_montage_fonds_financement_local_precisions",
DROP COLUMN "besoin_appui_qualiopisation_structures_privees",
DROP COLUMN "besoin_appui_qualiopisation_structures_privees_precisions",
DROP COLUMN "besoin_formation_agents_publics",
DROP COLUMN "besoin_formation_agents_publics_precisions",
DROP COLUMN "besoin_formation_salaries_associatifs",
DROP COLUMN "besoin_formation_salaries_associatifs_precisions",
DROP COLUMN "besoin_montage_et_prise_de_participation",
DROP COLUMN "besoin_montage_et_prise_de_participation_precisions",
DROP COLUMN "besoin_outillage",
DROP COLUMN "besoin_outillage_precisions",
DROP COLUMN "besoin_rh",
DROP COLUMN "besoin_rh_precisions",
DROP COLUMN "besoin_strategie_fne_locale",
DROP COLUMN "besoin_strategie_fne_locale_precisions",
ADD COLUMN     "besoins_en_ingenierie_financiere_id" UUID;

-- CreateTable
CREATE TABLE "besoins_en_ingenierie_financiere" (
    "id" UUID NOT NULL,
    "createur_id" UUID NOT NULL,
    "derniere_modification_par_id" UUID NOT NULL,
    "modification" TIMESTAMP(3) NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supression" TIMESTAMP(3),
    "texteIntroductionLu" TIMESTAMP(3),
    "faire_un_diagnostic_territorial" BOOLEAN NOT NULL DEFAULT false,
    "faire_un_diagnostic_territorial_etp" DOUBLE PRECISION,
    "faire_un_diagnostic_territorial_prestation" BOOLEAN NOT NULL DEFAULT false,
    "faire_un_diagnostic_territorial_prestation_priorite" INTEGER,
    "co_construire_la_feuille_de_route" BOOLEAN NOT NULL DEFAULT false,
    "co_construire_la_feuille_de_route_etp" DOUBLE PRECISION,
    "co_construire_la_feuille_de_route_prestation" BOOLEAN NOT NULL DEFAULT false,
    "co_construire_la_feuille_de_route_prestation_priorite" INTEGER,
    "rediger_la_feuille_de_route" BOOLEAN NOT NULL DEFAULT false,
    "rediger_la_feuille_de_route_etp" DOUBLE PRECISION,
    "rediger_la_feuille_de_route_prestation" BOOLEAN NOT NULL DEFAULT false,
    "rediger_la_feuille_de_route_prestation_priorite" INTEGER,
    "creer_un_vehicule_juridique" BOOLEAN NOT NULL DEFAULT false,
    "creer_un_vehicule_juridique_etp" DOUBLE PRECISION,
    "creer_un_vehicule_juridique_prestation" BOOLEAN NOT NULL DEFAULT false,
    "creer_un_vehicule_juridique_prestation_priorite" INTEGER,
    "formaliser_la_feuille_de_route_autre" BOOLEAN NOT NULL DEFAULT false,
    "formaliser_la_feuille_de_route_autre_precisions" TEXT,
    "formaliser_la_feuille_de_route_autre_etp" DOUBLE PRECISION,
    "formaliser_la_feuille_de_route_autre_prestation" BOOLEAN NOT NULL DEFAULT false,
    "formaliser_la_feuille_de_route_autre_prestation_priorite" INTEGER,
    "structurer_un_fonds_local" BOOLEAN NOT NULL DEFAULT false,
    "structurer_un_fonds_local_etp" DOUBLE PRECISION,
    "structurer_un_fonds_local_prestation" BOOLEAN NOT NULL DEFAULT false,
    "structurer_un_fonds_local_prestation_priorite" INTEGER,
    "monter_des_dossiers_de_subvention" BOOLEAN NOT NULL DEFAULT false,
    "monter_des_dossiers_de_subvention_etp" DOUBLE PRECISION,
    "monter_des_dossiers_de_subvention_prestation" BOOLEAN NOT NULL DEFAULT false,
    "monter_des_dossiers_de_subvention_prestation_priorite" INTEGER,
    "animer_et_mettre_en_oeuvre" BOOLEAN NOT NULL DEFAULT false,
    "animer_et_mettre_en_oeuvre_etp" DOUBLE PRECISION,
    "animer_et_mettre_en_oeuvre_prestation" BOOLEAN NOT NULL DEFAULT false,
    "animer_et_mettre_en_oeuvre_prestation_priorite" INTEGER,
    "financer_le_deploiement_autre" BOOLEAN NOT NULL DEFAULT false,
    "financer_le_deploiement_autre_precisions" TEXT,
    "financer_le_deploiement_autre_etp" DOUBLE PRECISION,
    "financer_le_deploiement_autre_prestation" BOOLEAN NOT NULL DEFAULT false,
    "financer_le_deploiement_autre_prestation_priorite" INTEGER,
    "structurer_une_filiere_de_reconditionnement" BOOLEAN NOT NULL DEFAULT false,
    "structurer_une_filiere_de_reconditionnement_etp" DOUBLE PRECISION,
    "structurer_une_filiere_de_reconditionnement_prestation" BOOLEAN NOT NULL DEFAULT false,
    "structurer_une_filiere_de_reconditionnement_prestation_priorite" INTEGER,
    "collecter_des_donnees_territoriales" BOOLEAN NOT NULL DEFAULT false,
    "collecter_des_donnees_territoriales_etp" DOUBLE PRECISION,
    "collecter_des_donnees_territoriales_prestation" BOOLEAN NOT NULL DEFAULT false,
    "collecter_des_donnees_territoriales_prestation_priorite" INTEGER,
    "sensibiliser_les_acteurs" BOOLEAN NOT NULL DEFAULT false,
    "sensibiliser_les_acteurs_etp" DOUBLE PRECISION,
    "sensibiliser_les_acteurs_prestation" BOOLEAN NOT NULL DEFAULT false,
    "sensibiliser_les_acteurs_prestation_priorite" INTEGER,
    "outiller_les_acteurs_autre" BOOLEAN NOT NULL DEFAULT false,
    "outiller_les_acteurs_autre_precisions" TEXT,
    "outiller_les_acteurs_autre_etp" DOUBLE PRECISION,
    "outiller_les_acteurs_autre_prestation" BOOLEAN NOT NULL DEFAULT false,
    "outiller_les_acteurs_autre_prestation_priorite" INTEGER,
    "former_les_agents_publics" BOOLEAN NOT NULL DEFAULT false,
    "former_les_agents_publics_nombre" DOUBLE PRECISION,
    "former_les_agents_publics_priorite" INTEGER,
    "former_les_salaries_associatifs" BOOLEAN NOT NULL DEFAULT false,
    "former_les_salaries_associatifs_nombre" DOUBLE PRECISION,
    "former_les_salaries_associatifs_priorite" INTEGER,
    "appuyer_la_certification_qualiopi" BOOLEAN NOT NULL DEFAULT false,
    "appuyer_la_certification_qualiopi_priorite" INTEGER,
    "former_les_professionnels_autre" BOOLEAN NOT NULL DEFAULT false,
    "former_les_professionnels_autre_precisions" TEXT,
    "former_les_professionnels_autre_priorite" INTEGER,
    "total_etp" DOUBLE PRECISION NOT NULL,
    "total_etp_priorite" INTEGER,

    CONSTRAINT "besoins_en_ingenierie_financiere_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gouvernances_besoins_en_ingenierie_financiere_id_key" ON "gouvernances"("besoins_en_ingenierie_financiere_id");

-- AddForeignKey
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_besoins_en_ingenierie_financiere_id_fkey" FOREIGN KEY ("besoins_en_ingenierie_financiere_id") REFERENCES "besoins_en_ingenierie_financiere"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "besoins_en_ingenierie_financiere" ADD CONSTRAINT "besoins_en_ingenierie_financiere_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "besoins_en_ingenierie_financiere" ADD CONSTRAINT "besoins_en_ingenierie_financiere_derniere_modification_par_fkey" FOREIGN KEY ("derniere_modification_par_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
