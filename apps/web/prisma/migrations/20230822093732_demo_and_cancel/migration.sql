-- AlterTable
ALTER TABLE "formulaire_gouvernance" ADD COLUMN     "annulation" TIMESTAMP(3),
ADD COLUMN     "demonstration" BOOLEAN NOT NULL DEFAULT false;
