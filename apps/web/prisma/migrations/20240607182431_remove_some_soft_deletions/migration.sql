/*
  Warnings:

  - You are about to drop the column `suppression` on the `coordinateurs` table. All the data in the column will be lost.
  - You are about to drop the column `suppression` on the `mediateurs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coordinateurs" DROP COLUMN "suppression";

-- AlterTable
ALTER TABLE "mediateurs" DROP COLUMN "suppression";
