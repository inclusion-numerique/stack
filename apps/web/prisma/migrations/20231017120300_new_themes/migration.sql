-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "theme" ADD VALUE 'ecoconception_de_services_numeriques';
ALTER TYPE "theme" ADD VALUE 'usages_responsables_du_numerique';
ALTER TYPE "theme" ADD VALUE 'numerique_au_service_de_l_environnement';
ALTER TYPE "theme" ADD VALUE 'territoires_connectes_et_durables';
