-- AlterTable
ALTER TABLE "bases" ADD COLUMN     "base" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'contact@contact.fr',
ADD COLUMN     "email_is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT;
