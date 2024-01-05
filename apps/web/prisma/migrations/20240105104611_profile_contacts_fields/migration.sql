-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT;
