/*
  Warnings:

  - Added the required column `comment` to the `resource_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resource_reports" ADD COLUMN     "comment" TEXT NOT NULL;
