/*
  Warnings:

  - You are about to drop the column `cree_par_mediateur_id` on the `beneficiaires` table. All the data in the column will be lost.
  - Added the required column `mediateur_id` to the `beneficiaires` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "beneficiaires"
    DROP CONSTRAINT "beneficiaires_cree_par_mediateur_id_fkey";

-- AlterTable
ALTER TABLE "beneficiaires"
    ADD COLUMN "mediateur_id"     UUID,
    ADD COLUMN "pas_de_telephone" BOOLEAN;

-- Copy data from old column to new column
UPDATE "beneficiaires"
SET "mediateur_id" = "cree_par_mediateur_id";

-- Set not null constraint
ALTER TABLE "beneficiaires"
    ALTER COLUMN "mediateur_id" SET NOT NULL;

-- Drop old column
ALTER TABLE "beneficiaires"
    DROP COLUMN "cree_par_mediateur_id";

-- AddForeignKey
ALTER TABLE "beneficiaires"
    ADD CONSTRAINT "beneficiaires_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
