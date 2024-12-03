/*
  Warnings:

  - Made the column `type_lieu` on table `activites` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "activites" ALTER COLUMN "type_lieu" SET NOT NULL;
