
-- Rename camelCase columns to snake_case
ALTER TABLE "besoins_en_ingenierie_financiere" RENAME COLUMN "priorisationEnregistree" TO "priorisation_enregistree";
ALTER TABLE "besoins_en_ingenierie_financiere" RENAME COLUMN "selectionEnregistree" TO "selection_enregistree";
ALTER TABLE "besoins_en_ingenierie_financiere" RENAME COLUMN "texteIntroductionLu" TO "texte_introduction_lu";

ALTER TABLE "gouvernances" DROP CONSTRAINT "gouvernances_departementCode_fkey";
ALTER TABLE "gouvernances" RENAME COLUMN "departementCode" TO "departement_code";
ALTER TABLE "gouvernances" RENAME COLUMN "noteDeContexte" TO "note_de_contexte";
ALTER TABLE "gouvernances" ADD CONSTRAINT "gouvernances_departement_code_fkey" FOREIGN KEY ("departement_code") REFERENCES "departements"("code") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "structures_aidants_connect" RENAME COLUMN "isActive" TO "is_active";
ALTER TABLE "structures_aidants_connect" RENAME COLUMN "totalDemarches" TO "total_demarches";
ALTER TABLE "structures_aidants_connect" RENAME COLUMN "usagersUniques" TO "usagers_uniques";

ALTER TABLE "structures_cartographie_nationale" RENAME COLUMN "labelAidantsConnect" TO "label_aidants_connect";
ALTER TABLE "structures_cartographie_nationale" RENAME COLUMN "labelConseillersNumerique" TO "label_conseillers_numerique";
ALTER TABLE "structures_cartographie_nationale" RENAME COLUMN "labelFranceServices" TO "label_france_services";
ALTER TABLE "structures_cartographie_nationale" RENAME COLUMN "sousTypePublic" TO "sous_type_public";


-- Rename UserRole enum to user_role

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('administrator', 'demo', 'prefecture_departement', 'prefecture_region', 'user');

ALTER TABLE "users" ADD COLUMN "new_role" "user_role" DEFAULT 'user';

-- Set value of new role from role
UPDATE "users"
SET "new_role" = 'administrator'
WHERE "role" = 'Administrator';

UPDATE "users"
SET "new_role" = 'demo'
WHERE "role" = 'Demo';

UPDATE "users"
SET "new_role" = 'prefecture_departement'
WHERE "role" = 'PrefectureDepartement';

UPDATE "users"
SET "new_role" = 'prefecture_region'
WHERE "role" = 'PrefectureRegion';

UPDATE "users"
SET "new_role" = 'user'
WHERE "role" = 'User';

ALTER TABLE "users"
    ALTER COLUMN "new_role" SET NOT NULL;

ALTER TABLE "users" DROP COLUMN "role";

ALTER TABLE "users" RENAME COLUMN "new_role" TO "role";

-- DropEnum
DROP TYPE "UserRole";

