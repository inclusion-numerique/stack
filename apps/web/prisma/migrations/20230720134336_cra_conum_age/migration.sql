/*
  Warnings:

  - Added the required column `age_12_a_18_ans` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age_18_a_35_ans` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age_35_a_60_ans` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age_moins_12_ans` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age_plus_60_ans` to the `cra_conseiller_numerique_par_departement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cra_conseiller_numerique_par_departement" ADD COLUMN     "age_12_a_18_ans" INTEGER NOT NULL,
ADD COLUMN     "age_18_a_35_ans" INTEGER NOT NULL,
ADD COLUMN     "age_35_a_60_ans" INTEGER NOT NULL,
ADD COLUMN     "age_moins_12_ans" INTEGER NOT NULL,
ADD COLUMN     "age_plus_60_ans" INTEGER NOT NULL;
