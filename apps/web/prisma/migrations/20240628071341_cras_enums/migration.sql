/*
  Warnings:

  - The values [scoalarite_et_numerique] on the enum `thematique_accompagnement` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "thematique_accompagnement_new" AS ENUM ('prendre_en_main_du_materiel', 'navigation_sur_internet', 'email', 'bureautique', 'reseaux_sociaux', 'sante', 'banque_et_achats_en_ligne', 'entrepreneuriat', 'insertion_professionnelle', 'securite_numerique', 'parentalite', 'scolarite_et_numerique', 'creer_avec_le_numerique', 'culture_numerique');
ALTER TABLE "cras_individuels" ALTER COLUMN "thematiques_accompagnement" DROP DEFAULT;
ALTER TABLE "cras_individuels" ALTER COLUMN "thematiques_accompagnement" TYPE "thematique_accompagnement_new"[] USING ("thematiques_accompagnement"::text::"thematique_accompagnement_new"[]);
ALTER TYPE "thematique_accompagnement" RENAME TO "thematique_accompagnement_old";
ALTER TYPE "thematique_accompagnement_new" RENAME TO "thematique_accompagnement";
DROP TYPE "thematique_accompagnement_old";
ALTER TABLE "cras_individuels" ALTER COLUMN "thematiques_accompagnement" SET DEFAULT ARRAY[]::"thematique_accompagnement"[];
COMMIT;
