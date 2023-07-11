/*
  Warnings:

  - You are about to drop the `_UserToUserOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToUserOrganization" DROP CONSTRAINT "_UserToUserOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserOrganization" DROP CONSTRAINT "_UserToUserOrganization_B_fkey";

-- DropTable
DROP TABLE "_UserToUserOrganization";

-- CreateTable
CREATE TABLE "_user_organizations" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_organizations_AB_unique" ON "_user_organizations"("A", "B");

-- CreateIndex
CREATE INDEX "_user_organizations_B_index" ON "_user_organizations"("B");

-- AddForeignKey
ALTER TABLE "_user_organizations" ADD CONSTRAINT "_user_organizations_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_organizations" ADD CONSTRAINT "_user_organizations_B_fkey" FOREIGN KEY ("B") REFERENCES "user_organizations"("mon_compte_pro_id") ON DELETE CASCADE ON UPDATE CASCADE;
