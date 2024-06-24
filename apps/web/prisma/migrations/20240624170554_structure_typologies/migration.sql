/*
  Warnings:

  - You are about to drop the column `typologie` on the `structures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "structures" DROP COLUMN "typologie",
ADD COLUMN     "typologies" TEXT[] DEFAULT ARRAY[]::TEXT[];
