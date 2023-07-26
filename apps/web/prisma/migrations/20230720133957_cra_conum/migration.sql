-- CreateTable
CREATE TABLE "cra_conseiller_numerique_par_departement" (
    "code_repartement" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "statut_etudiant" INTEGER NOT NULL,
    "statut_sans_emploi" INTEGER NOT NULL,
    "statut_en_emploi" INTEGER NOT NULL,
    "statut_retraite" INTEGER NOT NULL,
    "statut_heterogene" INTEGER NOT NULL,
    "accompagnement_individuel" INTEGER NOT NULL,
    "accompagnement_atelier" INTEGER NOT NULL,
    "accompagnement_redirection" INTEGER NOT NULL,
    "activite_collectif" INTEGER NOT NULL,
    "activite_ponctuel" INTEGER NOT NULL,
    "activite_individuel" INTEGER NOT NULL,
    "theme_autre" INTEGER NOT NULL,
    "theme_equipement_informatique" INTEGER NOT NULL,
    "theme_demarche_en_ligne" INTEGER NOT NULL,
    "theme_smartphone" INTEGER NOT NULL,
    "theme_courriel" INTEGER NOT NULL,
    "theme_internet" INTEGER NOT NULL,
    "theme_vocabulaire" INTEGER NOT NULL,
    "theme_traitement_texte" INTEGER NOT NULL,
    "theme_contenus_numeriques" INTEGER NOT NULL,
    "theme_trouver_emploi" INTEGER NOT NULL,
    "theme_echanger" INTEGER NOT NULL,
    "theme_tpe_pme" INTEGER NOT NULL,
    "theme_accompagner_enfant" INTEGER NOT NULL,
    "theme_securite" INTEGER NOT NULL,
    "theme_fraude_et_harcelement" INTEGER NOT NULL,
    "theme_sante" INTEGER NOT NULL,
    "theme_diagnostic" INTEGER NOT NULL,
    "theme_budget" INTEGER NOT NULL,
    "theme_scolaire" INTEGER NOT NULL,

    CONSTRAINT "cra_conseiller_numerique_par_departement_pkey" PRIMARY KEY ("code_repartement")
);

-- AddForeignKey
ALTER TABLE "cra_conseiller_numerique_par_departement" ADD CONSTRAINT "cra_conseiller_numerique_par_departement_code_repartement_fkey" FOREIGN KEY ("code_repartement") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
