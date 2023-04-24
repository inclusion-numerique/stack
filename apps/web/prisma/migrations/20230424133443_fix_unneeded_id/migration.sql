/*
  Warnings:

  - You are about to drop the column `userId` on the `Base` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Base" DROP CONSTRAINT "Base_userId_fkey";

-- AlterTable
ALTER TABLE "Base" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
