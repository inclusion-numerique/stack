-- CreateEnum
CREATE TYPE "profil_inscription" AS ENUM ('conseiller-numerique', 'mediateur', 'coordinateur-conseiller-numerique');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "inscription_validee" TIMESTAMP(3),
ADD COLUMN     "lieux_activite_renseignes" TIMESTAMP(3),
ADD COLUMN     "profil_inscription" "profil_inscription",
ADD COLUMN     "structure_employeuse_renseignee" TIMESTAMP(3);
