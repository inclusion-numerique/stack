/*
  Warnings:

  - You are about to drop the column `code_postal` on the `communes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "communes_code_postal_idx";

-- AlterTable
ALTER TABLE "communes" DROP COLUMN "code_postal";

-- CreateTable
CREATE TABLE "codes_postaux" (
    "code" TEXT NOT NULL,
    "code_commune" TEXT NOT NULL,

    CONSTRAINT "codes_postaux_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE INDEX "codes_postaux_code_commune_idx" ON "codes_postaux"("code_commune");

-- CreateIndex
CREATE INDEX "communes_code_epci_idx" ON "communes"("code_epci");

-- AddForeignKey
ALTER TABLE "codes_postaux" ADD CONSTRAINT "codes_postaux_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
