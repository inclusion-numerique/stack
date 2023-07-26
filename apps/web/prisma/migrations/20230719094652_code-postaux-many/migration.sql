/*
  Warnings:

  - You are about to drop the `codes_postaux` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "codes_postaux" DROP CONSTRAINT "codes_postaux_code_commune_fkey";

-- DropTable
DROP TABLE "codes_postaux";

-- CreateTable
CREATE TABLE "code_postaux" (
    "code" TEXT NOT NULL,
    "code_commune" TEXT NOT NULL,

    CONSTRAINT "code_postaux_pkey" PRIMARY KEY ("code","code_commune")
);

-- CreateTable
CREATE TABLE "code_postal" (
    "code" TEXT NOT NULL,

    CONSTRAINT "code_postal_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "code_postaux_code_key" ON "code_postaux"("code");

-- CreateIndex
CREATE UNIQUE INDEX "code_postaux_code_commune_key" ON "code_postaux"("code_commune");

-- AddForeignKey
ALTER TABLE "code_postaux" ADD CONSTRAINT "code_postaux_code_fkey" FOREIGN KEY ("code") REFERENCES "code_postal"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "code_postaux" ADD CONSTRAINT "code_postaux_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;
