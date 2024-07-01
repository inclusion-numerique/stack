-- CreateEnum
CREATE TYPE "genre" AS ENUM ('masculin', 'feminin', 'non_communique');

-- CreateEnum
CREATE TYPE "tranche_age" AS ENUM ('mineur', '18-24', '25-39', '40-59', '60-69', '70+', 'non_communique');

-- CreateEnum
CREATE TYPE "statut_social" AS ENUM ('scolarise', 'sans_emploi', 'en_emploi', 'retraite', 'non_communique');

-- CreateEnum
CREATE TYPE "lieu_accompagnement" AS ENUM ('lieu_activite', 'domicile', 'a_distance');

-- CreateEnum
CREATE TYPE "materiel" AS ENUM ('ordinateur', 'telephone', 'tablette', 'autre', 'aucun');

-- CreateEnum
CREATE TYPE "thematique_accompagnement" AS ENUM ('prendre_en_main_du_materiel', 'navigation_sur_internet', 'email', 'bureautique', 'reseaux_sociaux', 'sante', 'banque_et_achats_en_ligne', 'entrepreneuriat', 'insertion_professionnelle', 'securite_numerique', 'parentalite', 'scoalarite_et_numerique', 'creer_avec_le_numerique', 'culture_numerique');

-- CreateEnum
CREATE TYPE "autonomie" AS ENUM ('entierement_accompagne', 'partiellement_autonome', 'autonome');

-- CreateEnum
CREATE TYPE "poursuite_accompagnement" AS ENUM ('accompagnement_individuel', 'atelier_collectif', 'autre_structure');

-- CreateTable
CREATE TABLE "beneficiaires" (
    "id" UUID NOT NULL,
    "cree_par_mediateur_id" UUID,
    "prenom" TEXT,
    "nom" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "date_naissance" DATE,
    "annee_naissance" INTEGER,
    "adresse" TEXT,
    "code_commune" VARCHAR(5),
    "genre" "genre",
    "trancheAge" "tranche_age",
    "statutSocial" "statut_social",
    "notes" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "beneficiaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cras_individuels" (
    "id" UUID NOT NULL,
    "cree_par_mediateur_id" UUID NOT NULL,
    "beneficiaire_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "duree" INTEGER NOT NULL,
    "lieuAccompagnement" "lieu_accompagnement" NOT NULL,
    "lieu_activite_id" UUID,
    "code_commune_domicile" VARCHAR(5),
    "materiel" "materiel"[] DEFAULT ARRAY[]::"materiel"[],
    "thematiques_accompagnement" "thematique_accompagnement"[] DEFAULT ARRAY[]::"thematique_accompagnement"[],
    "autonomie" "autonomie",
    "poursuite_accompagnement" "poursuite_accompagnement"[] DEFAULT ARRAY[]::"poursuite_accompagnement"[],
    "poursuite_accompagnement_structure_id" UUID,
    "notes" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "cras_individuels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "beneficiaires" ADD CONSTRAINT "beneficiaires_cree_par_mediateur_id_fkey" FOREIGN KEY ("cree_par_mediateur_id") REFERENCES "mediateurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_individuels" ADD CONSTRAINT "cras_individuels_cree_par_mediateur_id_fkey" FOREIGN KEY ("cree_par_mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_individuels" ADD CONSTRAINT "cras_individuels_beneficiaire_id_fkey" FOREIGN KEY ("beneficiaire_id") REFERENCES "beneficiaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_individuels" ADD CONSTRAINT "cras_individuels_lieu_activite_id_fkey" FOREIGN KEY ("lieu_activite_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_individuels" ADD CONSTRAINT "cras_individuels_poursuite_accompagnement_structure_id_fkey" FOREIGN KEY ("poursuite_accompagnement_structure_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
