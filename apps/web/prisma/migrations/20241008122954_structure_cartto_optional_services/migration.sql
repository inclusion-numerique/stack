-- AlterEnum
ALTER TYPE "user_role" ADD VALUE 'support';

-- AlterTable
ALTER TABLE "structures_cartographie_nationale" ALTER COLUMN "services" DROP NOT NULL;
