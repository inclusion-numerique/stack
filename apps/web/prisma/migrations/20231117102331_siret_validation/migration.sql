-- CreateEnum
CREATE TYPE "information_siret_status" AS ENUM ('pending', 'valid', 'invalid');

-- AlterTable
ALTER TABLE "informations_siret" ADD COLUMN     "activite_principale_code" TEXT,
ADD COLUMN     "activite_principale_libelle" TEXT,
ADD COLUMN     "activite_principale_nomenclature" TEXT,
ADD COLUMN     "erreur_verification" TEXT,
ADD COLUMN     "forme_juridique_code" TEXT,
ADD COLUMN     "forme_juridique_libelle" TEXT,
ADD COLUMN     "siren" TEXT,
ADD COLUMN     "status" "information_siret_status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "verifie" TIMESTAMP(3);
