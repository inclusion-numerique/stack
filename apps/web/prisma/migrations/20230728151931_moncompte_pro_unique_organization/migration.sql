/*
  Warnings:

  - The primary key for the `user_organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_user_organizations" DROP CONSTRAINT "_user_organizations_B_fkey";

-- AlterTable
ALTER TABLE "_user_organizations" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_organizations" DROP CONSTRAINT "user_organizations_pkey",
ALTER COLUMN "mon_compte_pro_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_organizations_pkey" PRIMARY KEY ("mon_compte_pro_id");

-- AddForeignKey
ALTER TABLE "_user_organizations" ADD CONSTRAINT "_user_organizations_B_fkey" FOREIGN KEY ("B") REFERENCES "user_organizations"("mon_compte_pro_id") ON DELETE CASCADE ON UPDATE CASCADE;
