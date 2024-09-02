-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "profil_inscription" AS ENUM ('conseiller-numerique', 'mediateur', 'coordinateur-conseiller-numerique');

-- CreateEnum
CREATE TYPE "genre" AS ENUM ('masculin', 'feminin', 'non_communique');

-- CreateEnum
CREATE TYPE "tranche_age" AS ENUM ('mineur', '18-24', '25-39', '40-59', '60-69', '70+', 'non_communique');

-- CreateEnum
CREATE TYPE "statut_social" AS ENUM ('scolarise', 'sans_emploi', 'en_emploi', 'retraite', 'non_communique');

-- CreateEnum
CREATE TYPE "type_activite" AS ENUM ('individuel', 'demarche', 'collectif');

-- CreateEnum
CREATE TYPE "type_lieu" AS ENUM ('lieu_activite', 'domicile', 'a_distance');

-- CreateEnum
CREATE TYPE "materiel" AS ENUM ('ordinateur', 'telephone', 'tablette', 'autre', 'aucun');

-- CreateEnum
CREATE TYPE "thematique" AS ENUM ('prendre_en_main_du_materiel', 'navigation_sur_internet', 'email', 'bureautique', 'reseaux_sociaux', 'sante', 'banque_et_achats_en_ligne', 'entrepreneuriat', 'insertion_professionnelle', 'securite_numerique', 'parentalite', 'scolarite_et_numerique', 'creer_avec_le_numerique', 'culture_numerique');

-- CreateEnum
CREATE TYPE "autonomie" AS ENUM ('entierement_accompagne', 'partiellement_autonome', 'autonome');

-- CreateEnum
CREATE TYPE "structure_de_redirection" AS ENUM ('operateur_ou_organisme_en_charge', 'aide_aux_demarches_administratives', 'administration', 'mediation_numerique', 'autre');

-- CreateEnum
CREATE TYPE "type_lieu_atelier" AS ENUM ('lieu_activite', 'autre');

-- CreateEnum
CREATE TYPE "niveau_atelier" AS ENUM ('debutant', 'intermediaire', 'avance');

-- CreateEnum
CREATE TYPE "thematique_demarche_administrative" AS ENUM ('papiers_elections_citoyennete', 'famille_scolarite', 'social_sante', 'travail_formation', 'logement', 'transports_mobilite', 'argent_impots', 'justice', 'etrangers_europe', 'loisirs_sports_culture');

-- CreateEnum
CREATE TYPE "degre_de_finalisation_demarche" AS ENUM ('finalisee', 'a_finaliser_en_autonomie', 'doit_revenir', 'oriente_vers_structure');

-- CreateEnum
CREATE TYPE "mutation_name" AS ENUM ('creer_mediateur', 'modifier_mediateur', 'supprimer_mediateur', 'creer_coordinateur', 'modifier_coordinateur', 'supprimer_coordinateur', 'creer_mediateur_coordonne', 'supprimer_mediateur_coordonne', 'creer_activite', 'modifier_activite', 'supprimer_activite', 'creer_beneficiaire', 'modifier_beneficiaire', 'supprimer_beneficiaire', 'creer_structure', 'modifier_structure', 'mise_a_jour_structures_cartographie_nationale');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "usurper_id" UUID,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "name" TEXT,
    "role" "user_roles" NOT NULL DEFAULT 'user',
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "email_verified" TIMESTAMP(3),
    "image_id" UUID,
    "location" TEXT,
    "title" TEXT,
    "description" TEXT,
    "is_fixture" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),
    "last_login" TIMESTAMP(3),
    "profil_inscription" "profil_inscription",
    "check_conseiller_numerique_inscription" TIMESTAMP(3),
    "structure_employeuse_renseignee" TIMESTAMP(3),
    "lieux_activite_renseignes" TIMESTAMP(3),
    "inscription_validee" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "token" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "alt_text" TEXT,
    "blur_url" TEXT,
    "original_height" INTEGER,
    "original_width" INTEGER,
    "crop_height" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "crop_width" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "crop_top" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "crop_left" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "height" INTEGER,
    "width" INTEGER,
    "upload_key" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "key" TEXT NOT NULL,
    "legacy_key" TEXT,
    "mime_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "uploaded_by_id" UUID,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "job_executions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "started" TIMESTAMP(3) NOT NULL,
    "completed" TIMESTAMP(3),
    "errored" TIMESTAMP(3),
    "duration" INTEGER,
    "data" JSONB,
    "result" JSONB,
    "error" TEXT,

    CONSTRAINT "job_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediateurs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mediateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conseillers_numeriques" (
    "id" TEXT NOT NULL,
    "mediateur_id" UUID NOT NULL,

    CONSTRAINT "conseillers_numeriques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinateurs" (
    "id" UUID NOT NULL,
    "conseiller_numerique_id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coordinateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediateurs_coordonnes" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "coordinateur_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "mediateurs_coordonnes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structures" (
    "id" UUID NOT NULL,
    "id_cartographie_nationale" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "code_postal" VARCHAR(5) NOT NULL,
    "code_insee" VARCHAR(5),
    "complement_adresse" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "siret" TEXT,
    "rna" TEXT,
    "visible_pour_cartographie_nationale" BOOLEAN NOT NULL DEFAULT false,
    "typologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "presentation_resume" TEXT,
    "presentation_detail" TEXT,
    "site_web" TEXT,
    "telephone" TEXT,
    "courriels" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fiche_acces_libre" TEXT,
    "horaires" TEXT,
    "services" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publics_specifiquement_adresses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "prise_en_charge_specifique" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "frais_a_charge" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dispositif_programmes_nationaux" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "itinerance" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "modalites_acces" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "modalites_accompagnement" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structures_cartographie_nationale" (
    "id" TEXT NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),
    "creation_import" TIMESTAMP(3),
    "modification_import" TIMESTAMP(3),
    "suppression_import" TIMESTAMP(3),
    "conseiller_numerique_permanence_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "coop_id" TEXT,
    "coop_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pivot" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "code_postal" VARCHAR(5) NOT NULL,
    "code_insee" VARCHAR(5),
    "adresse" TEXT NOT NULL,
    "complement_adresse" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "typologie" TEXT,
    "telephone" VARCHAR(20),
    "courriels" TEXT,
    "site_web" TEXT,
    "horaires" TEXT,
    "presentation_resume" TEXT,
    "presentation_detail" TEXT,
    "source" TEXT,
    "itinerance" TEXT,
    "structure_parente" TEXT,
    "date_maj" DATE NOT NULL,
    "services" TEXT NOT NULL,
    "publics_specifiquement_adresses" TEXT,
    "prise_en_charge_specifique" TEXT,
    "frais_a_charge" TEXT,
    "dispositif_programmes_nationaux" TEXT,
    "formations_labels" TEXT,
    "autres_formations_labels" TEXT,
    "modalites_acces" TEXT,
    "modalites_accompagnement" TEXT,
    "fiche_acces_libre" TEXT,
    "prise_rdv" TEXT,

    CONSTRAINT "structures_cartographie_nationale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employes_structures" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "structure_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "employes_structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediateurs_en_activite" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "structure_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "mediateurs_en_activite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiaires" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "anonyme" BOOLEAN NOT NULL DEFAULT false,
    "attributionsAleatoires" BOOLEAN NOT NULL DEFAULT false,
    "prenom" TEXT,
    "nom" TEXT,
    "telephone" TEXT,
    "pas_de_telephone" BOOLEAN,
    "email" TEXT,
    "annee_naissance" INTEGER,
    "adresse" TEXT,
    "commune" TEXT,
    "commune_code_postal" TEXT,
    "commune_code_insee" TEXT,
    "va_poursuivre_parcours_accompagnement" BOOLEAN,
    "genre" "genre",
    "tranche_age" "tranche_age",
    "statut_social" "statut_social",
    "notes" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "beneficiaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activites" (
    "id" UUID NOT NULL,
    "type" "type_activite" NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "duree" INTEGER NOT NULL,
    "notes" TEXT,
    "structure_id" UUID,
    "lieu_code_postal" TEXT,
    "lieu_commune" TEXT,
    "lieu_code_insee" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),
    "type_lieu" "type_lieu",
    "autonomie" "autonomie",
    "structure_de_redirection" "structure_de_redirection",
    "materiel" "materiel"[] DEFAULT ARRAY[]::"materiel"[],
    "thematiques" "thematique"[] DEFAULT ARRAY[]::"thematique"[],
    "oriente_vers_structure" BOOLEAN,
    "thematiques_demarche" "thematique_demarche_administrative"[] DEFAULT ARRAY[]::"thematique_demarche_administrative"[],
    "precisions_demarche" TEXT,
    "degre_de_finalisation" "degre_de_finalisation_demarche",
    "titre_atelier" TEXT,
    "type_lieu_atelier" "type_lieu_atelier",
    "niveau" "niveau_atelier",

    CONSTRAINT "activites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accompagnements" (
    "id" UUID NOT NULL,
    "beneficiaire_id" UUID NOT NULL,
    "activite_id" UUID NOT NULL,

    CONSTRAINT "accompagnements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mutations" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "nom" "mutation_name" NOT NULL,
    "duration" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mutations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_usurper_id_key" ON "sessions"("usurper_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_image_id_key" ON "users"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "images_legacy_id_key" ON "images"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_upload_key_key" ON "images"("upload_key");

-- CreateIndex
CREATE UNIQUE INDEX "uploads_legacy_key_key" ON "uploads"("legacy_key");

-- CreateIndex
CREATE UNIQUE INDEX "mediateurs_user_id_key" ON "mediateurs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "conseillers_numeriques_mediateur_id_key" ON "conseillers_numeriques"("mediateur_id");

-- CreateIndex
CREATE UNIQUE INDEX "coordinateurs_conseiller_numerique_id_key" ON "coordinateurs"("conseiller_numerique_id");

-- CreateIndex
CREATE UNIQUE INDEX "coordinateurs_user_id_key" ON "coordinateurs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "structures_id_cartographie_nationale_key" ON "structures"("id_cartographie_nationale");

-- CreateIndex
CREATE INDEX "structures_cartographie_nationale_coop_id_idx" ON "structures_cartographie_nationale"("coop_id");

-- CreateIndex
CREATE UNIQUE INDEX "accompagnements_beneficiaire_id_activite_id_key" ON "accompagnements"("beneficiaire_id", "activite_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_usurper_id_fkey" FOREIGN KEY ("usurper_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_upload_key_fkey" FOREIGN KEY ("upload_key") REFERENCES "uploads"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs" ADD CONSTRAINT "mediateurs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conseillers_numeriques" ADD CONSTRAINT "conseillers_numeriques_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinateurs" ADD CONSTRAINT "coordinateurs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_coordonnes" ADD CONSTRAINT "mediateurs_coordonnes_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_coordonnes" ADD CONSTRAINT "mediateurs_coordonnes_coordinateur_id_fkey" FOREIGN KEY ("coordinateur_id") REFERENCES "coordinateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structures" ADD CONSTRAINT "structures_id_cartographie_nationale_fkey" FOREIGN KEY ("id_cartographie_nationale") REFERENCES "structures_cartographie_nationale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employes_structures" ADD CONSTRAINT "employes_structures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employes_structures" ADD CONSTRAINT "employes_structures_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_en_activite" ADD CONSTRAINT "mediateurs_en_activite_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_en_activite" ADD CONSTRAINT "mediateurs_en_activite_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaires" ADD CONSTRAINT "beneficiaires_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activites" ADD CONSTRAINT "activites_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accompagnements" ADD CONSTRAINT "accompagnements_beneficiaire_id_fkey" FOREIGN KEY ("beneficiaire_id") REFERENCES "beneficiaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accompagnements" ADD CONSTRAINT "accompagnements_activite_id_fkey" FOREIGN KEY ("activite_id") REFERENCES "activites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutations" ADD CONSTRAINT "mutations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
