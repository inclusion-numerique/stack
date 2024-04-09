/*
  Warnings:

  - Added the required column `derniere_modification_par_id` to the `demande_de_subvention` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "demande_de_subvention" ADD COLUMN     "derniere_modification_par_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "demande_de_subvention" ADD CONSTRAINT "demande_de_subvention_derniere_modification_par_id_fkey" FOREIGN KEY ("derniere_modification_par_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
