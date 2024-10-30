
-- AlterTable
ALTER TABLE "conseillers_numeriques" ADD COLUMN     "cras_v1_date_debut" TIMESTAMP(3),
ADD COLUMN     "cras_v1_date_fin" TIMESTAMP(3),
ADD COLUMN     "dernier_import_cras_v1" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "cras_conseiller_numerique_v1" (
    "id" TEXT NOT NULL,
    "imported_at" TIMESTAMP(3) NOT NULL,
    "conseiller_numerique_id" TEXT NOT NULL,
    "canal" TEXT NOT NULL,
    "activite" TEXT NOT NULL,
    "nb_participants" INTEGER NOT NULL DEFAULT 0,
    "nb_participants_recurrents" INTEGER NOT NULL DEFAULT 0,
    "age_moins_12_ans" INTEGER NOT NULL DEFAULT 0,
    "age_de_12_a_18_ans" INTEGER NOT NULL DEFAULT 0,
    "age_de_18_a_35_ans" INTEGER NOT NULL DEFAULT 0,
    "age_de_35_a_60_ans" INTEGER NOT NULL DEFAULT 0,
    "age_plus_60_ans" INTEGER NOT NULL DEFAULT 0,
    "statut_etudiant" INTEGER NOT NULL DEFAULT 0,
    "statut_sans_emploi" INTEGER NOT NULL DEFAULT 0,
    "statut_en_emploi" INTEGER NOT NULL DEFAULT 0,
    "statut_retraite" INTEGER NOT NULL DEFAULT 0,
    "statut_heterogene" INTEGER NOT NULL DEFAULT 0,
    "themes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sous_themes_equipements_informatiques" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sous_themes_sante" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sous_themes_accompagner_enfant" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "duree" TEXT NOT NULL,
    "accompagnement_individuel" INTEGER NOT NULL DEFAULT 0,
    "accompagnement_atelier" INTEGER NOT NULL DEFAULT 0,
    "accompagnement_redirection" INTEGER NOT NULL DEFAULT 0,
    "code_postal" TEXT,
    "nom_commune" TEXT,
    "date_accompagnement" TIMESTAMP(3) NOT NULL,
    "code_commune" TEXT,
    "organismes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "structure_id" TEXT,
    "structure_id_pg" INTEGER,
    "structure_type" TEXT,
    "structure_statut" TEXT,
    "structure_nom" TEXT,
    "structure_siret" TEXT,
    "structure_code_postal" TEXT,
    "structure_nom_commune" TEXT,
    "structure_code_commune" TEXT,
    "structure_code_departement" TEXT,
    "structure_code_region" TEXT,

    CONSTRAINT "cras_conseiller_numerique_v1_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cras_conseiller_numerique_v1" ADD CONSTRAINT "cras_conseiller_numerique_v1_conseiller_numerique_id_fkey" FOREIGN KEY ("conseiller_numerique_id") REFERENCES "conseillers_numeriques"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
