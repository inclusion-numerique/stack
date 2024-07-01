-- CreateEnum
CREATE TYPE "thematique_demarche_administrative" AS ENUM ('papiers_elections_citoyennete', 'famille_scolarite', 'social_sante', 'travail_formation', 'logement', 'transports_mobilite', 'argent_impots', 'justice', 'etrangers_europe', 'loisirs_sports_culture');

-- CreateTable
CREATE TABLE "participants_ateliers_collectifs" (
    "id" UUID NOT NULL,
    "cra_collectif_id" UUID NOT NULL,
    "beneficiaire_id" UUID NOT NULL,

    CONSTRAINT "participants_ateliers_collectifs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cras_collectifs" (
    "id" UUID NOT NULL,
    "cree_par_mediateur_id" UUID NOT NULL,
    "participants_anonymes_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "duree" INTEGER NOT NULL,
    "lieuAccompagnement" "lieu_accompagnement" NOT NULL,
    "lieu_activite_id" UUID,
    "code_commune_domicile" VARCHAR(5),
    "materiel" "materiel"[] DEFAULT ARRAY[]::"materiel"[],
    "thematiques_accompagnement" "thematique_accompagnement"[] DEFAULT ARRAY[]::"thematique_accompagnement"[],
    "autonomie" "autonomie",
    "notes" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),
    "participantsAnonymesCraCollectifId" UUID NOT NULL,

    CONSTRAINT "cras_collectifs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants_anonymes_cras_collectifs" (
    "id" UUID NOT NULL,
    "total" INTEGER NOT NULL,
    "genre_feminin" INTEGER NOT NULL,
    "genre_masculin" INTEGER NOT NULL,
    "genre_non_communique" INTEGER NOT NULL,
    "tranche_age_mineur" INTEGER NOT NULL,
    "tranche_age_18_24" INTEGER NOT NULL,
    "tranche_age_25_39" INTEGER NOT NULL,
    "tranche_age_40_59" INTEGER NOT NULL,
    "tranche_age_60_69" INTEGER NOT NULL,
    "tranche_age_70_plus" INTEGER NOT NULL,
    "tranche_age_non_communique" INTEGER NOT NULL,
    "statut_social_scolarise" INTEGER NOT NULL,
    "statut_social_sans_emploi" INTEGER NOT NULL,
    "statut_social_en_emploi" INTEGER NOT NULL,
    "statut_social_retraite" INTEGER NOT NULL,
    "statut_social_non_communique" INTEGER NOT NULL,

    CONSTRAINT "participants_anonymes_cras_collectifs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cras_demarches_administratives" (
    "id" UUID NOT NULL,
    "cree_par_mediateur_id" UUID NOT NULL,
    "beneficiaire_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "duree" INTEGER NOT NULL,
    "lieuAccompagnement" "lieu_accompagnement" NOT NULL,
    "lieu_activite_id" UUID,
    "code_commune_domicile" VARCHAR(5),
    "materiel" "materiel"[] DEFAULT ARRAY[]::"materiel"[],
    "thematiques_accompagnement" "thematique_demarche_administrative"[] DEFAULT ARRAY[]::"thematique_demarche_administrative"[],
    "autonomie" "autonomie",
    "poursuite_accompagnement" "poursuite_accompagnement"[] DEFAULT ARRAY[]::"poursuite_accompagnement"[],
    "poursuite_accompagnement_structure_id" UUID,
    "notes" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "cras_demarches_administratives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cras_collectifs_participants_anonymes_id_key" ON "cras_collectifs"("participants_anonymes_id");

-- AddForeignKey
ALTER TABLE "participants_ateliers_collectifs" ADD CONSTRAINT "participants_ateliers_collectifs_cra_collectif_id_fkey" FOREIGN KEY ("cra_collectif_id") REFERENCES "cras_collectifs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants_ateliers_collectifs" ADD CONSTRAINT "participants_ateliers_collectifs_beneficiaire_id_fkey" FOREIGN KEY ("beneficiaire_id") REFERENCES "beneficiaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_collectifs" ADD CONSTRAINT "cras_collectifs_cree_par_mediateur_id_fkey" FOREIGN KEY ("cree_par_mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_collectifs" ADD CONSTRAINT "cras_collectifs_participants_anonymes_id_fkey" FOREIGN KEY ("participants_anonymes_id") REFERENCES "participants_anonymes_cras_collectifs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_collectifs" ADD CONSTRAINT "cras_collectifs_lieu_activite_id_fkey" FOREIGN KEY ("lieu_activite_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_demarches_administratives" ADD CONSTRAINT "cras_demarches_administratives_cree_par_mediateur_id_fkey" FOREIGN KEY ("cree_par_mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_demarches_administratives" ADD CONSTRAINT "cras_demarches_administratives_beneficiaire_id_fkey" FOREIGN KEY ("beneficiaire_id") REFERENCES "beneficiaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_demarches_administratives" ADD CONSTRAINT "cras_demarches_administratives_lieu_activite_id_fkey" FOREIGN KEY ("lieu_activite_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cras_demarches_administratives" ADD CONSTRAINT "cras_demarches_administratives_poursuite_accompagnement_st_fkey" FOREIGN KEY ("poursuite_accompagnement_structure_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
