-- AlterTable
ALTER TABLE "base_members" ADD COLUMN     "added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable

UPDATE "resource_contributors" SET "added" = now() WHERE "added" IS NULL;
ALTER TABLE "resource_contributors" ALTER COLUMN "added" SET NOT NULL,
ALTER COLUMN "added" SET DEFAULT CURRENT_TIMESTAMP;
